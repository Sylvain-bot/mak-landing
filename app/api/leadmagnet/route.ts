import { NextRequest, NextResponse, after } from "next/server";
import { notifyTelegram } from "@/lib/telegram";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_TIMEOUT_MS = 8000;

// Rate limit en mémoire : 5 requêtes / 10 min par IP (réinitialisé à chaque nouvelle instance serverless)
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function cleanSource(raw: unknown) {
  const source = String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 50);
  return source || "inconnu";
}

// Campagne ou id de pub : texte court, sans caractères spéciaux (les id de pub Meta sont numériques)
function cleanTag(raw: unknown) {
  return String(raw ?? "")
    .replace(/[^\p{L}\p{N} _.\-|]/gu, "")
    .trim()
    .slice(0, 100);
}

function todayParis() {
  // en-CA → format YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Honeypot rempli → on fait semblant que tout va bien
  if (typeof body.website === "string" && body.website.trim() !== "") {
    console.warn("[leadmagnet] honeypot rempli, inscription ignorée");
    return NextResponse.json({ ok: true });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const prenom = String(body.prenom ?? "").trim().slice(0, 50);
  if (!email || email.length > 254 || !EMAIL_RE.test(email) || !prenom) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listId = Number(process.env.BREVO_LEADMAGNET_LIST_ID);
  if (!apiKey || !listId) {
    console.error("[leadmagnet] BREVO_API_KEY ou BREVO_LEADMAGNET_LIST_ID manquant");
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const attributes: Record<string, string> = {
    PRENOM: prenom,
    LEADMAGNET: "fami-2027",
    LM_SOURCE: cleanSource(body.source),
    LM_DATE: todayParis(),
  };
  // Attribution par pub (attributs Brevo LM_CAMPAIGN / LM_AD), seulement si présents dans la visite
  const campaign = cleanTag(body.campaign);
  const ad = cleanTag(body.ad);
  const attribution: Record<string, string> = {};
  if (campaign) attribution.LM_CAMPAIGN = campaign;
  if (ad) attribution.LM_AD = ad;

  const send = (attrs: Record<string, string>) =>
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, attributes: attrs, listIds: [listId], updateEnabled: true }),
      signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
    });

  try {
    let res = await send({ ...attributes, ...attribution });
    // Attributs d'attribution pas encore créés dans Brevo : on n'empêche pas l'inscription, on renvoie sans eux
    if (res.status === 400 && Object.keys(attribution).length) {
      const detail = await res.text().catch(() => "");
      console.warn(`[leadmagnet] attribution ignorée (Brevo 400) : ${detail}`);
      res = await send(attributes);
    }

    // 201 = création, 204 = mise à jour
    if (res.ok) {
      const provenance = campaign ? `Pub : ${campaign}${ad ? ` (pub ${ad})` : ""}` : `Source : ${attributes.LM_SOURCE}`;
      const dejaVu = res.status === 204 ? " (contact déjà connu)" : "";
      after(() =>
        notifyTelegram(`📘 Guide FAMI téléchargé${dejaVu}\nPrénom : ${prenom}\n${provenance}`)
      );
      return NextResponse.json({ ok: true });
    }

    const detail = await res.text().catch(() => "");
    console.error(`[leadmagnet] Brevo ${res.status}: ${detail}`);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  } catch (err) {
    console.error("[leadmagnet] Appel Brevo échoué:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
