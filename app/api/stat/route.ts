import { NextRequest, NextResponse } from "next/server";

// Statistiques anonymes (voir lib/anonStat.ts) : on accepte une courte liste d'événements et de champs,
// on les nettoie, puis on les transmet à PostHog sans identifiant de personne, sans IP et sans géolocalisation.
// Tous les événements partagent le même identifiant fixe : PostHog ne peut pas reconstituer un visiteur.

const PH_KEY = "phc_mJyjJSbaWpvMQoRLJkW3w7oseJig87Kvz4P5u5ona2Qr";
const PH_CAPTURE = "https://eu.i.posthog.com/capture/";

const EVENTS = new Set([
  "visite",
  "bandeau_affiche",
  "bandeau_choix",
  "formulaire_vu",
  "formulaire_commence",
  "formulaire_erreur",
  "formulaire_envoye",
]);
const CHOIX = new Set(["tout_accepter", "tout_refuser", "personnalise"]);
const ERREURS = new Set(["prenom", "email", "prenom_email", "trop_de_tentatives", "serveur", "reseau"]);

const clean = (v: unknown, max = 100) =>
  typeof v === "string" ? v.replace(/[^\p{L}\p{N}\p{Pd} _.\/|{}]/gu, "").slice(0, max) || undefined : undefined;

// Limite simple contre les envois en rafale (par instance serverless)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 60;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "inconnu";
  if (limited(ip)) return new NextResponse(null, { status: 204 });

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const event = typeof b.event === "string" && EVENTS.has(b.event) ? b.event : null;
  if (!event) return new NextResponse(null, { status: 400 });

  const properties: Record<string, unknown> = {
    $process_person_profile: false,
    $geoip_disable: true,
    $ip: null,
    anonyme: true,
    chemin: clean(b.path, 80),
    utm_source: clean(b.utm_source, 40),
    utm_campaign: clean(b.utm_campaign),
    utm_content: clean(b.utm_content, 40),
  };
  if (event === "bandeau_choix") {
    properties.choix = typeof b.choix === "string" && CHOIX.has(b.choix) ? b.choix : undefined;
    properties.mesure = b.mesure === true;
    properties.publicite = b.publicite === true;
  }
  if (event === "formulaire_erreur") {
    properties.erreur = typeof b.erreur === "string" && ERREURS.has(b.erreur) ? b.erreur : "autre";
  }

  try {
    await fetch(PH_CAPTURE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: PH_KEY, event: `anon_${event}`, distinct_id: "visiteur-anonyme", properties }),
      signal: AbortSignal.timeout(3000),
    });
  } catch {}
  return new NextResponse(null, { status: 204 });
}
