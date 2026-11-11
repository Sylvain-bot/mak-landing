import { NextRequest, NextResponse } from "next/server";

const BREVO_LIST_ID = 3;

// Abonné direct (formulaire du site) : NL_SOURCE et NL_DATE le distinguent des inscrits de l'app
// qui arrivent dans la newsletter après leur séquence de 28 jours. Si ces attributs n'existent pas
// encore dans Brevo, l'inscription se fait sans eux.
function todayParis() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export async function POST(req: NextRequest) {
  let email: string;
  let source = "site";
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    source = String(body.source ?? "site").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) || "site";
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
  }

  const send = (attributes?: Record<string, string>) =>
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        ...(attributes ? { attributes } : {}),
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

  let res = await send({ NL_SOURCE: source, NL_DATE: todayParis() });
  if (res.status === 400) {
    const detail = await res.clone().text().catch(() => "");
    if (!detail.includes("DUPLICATE_PARAMETER")) {
      console.warn(`[newsletter] attributs NL_SOURCE/NL_DATE ignorés (Brevo 400) : ${detail}`);
      res = await send();
    }
  }

  if (res.ok || res.status === 204) {
    return NextResponse.json({ ok: true });
  }

  const data = await res.json().catch(() => ({}));
  // 400 avec code DUPLICATE_PARAMETER = déjà inscrit → on traite comme succès
  if (data?.code === "DUPLICATE_PARAMETER") {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Erreur Brevo" }, { status: 502 });
}
