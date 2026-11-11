// Statistiques anonymes, sans consentement : on compte des événements (une page vue, un choix dans le bandeau,
// une étape du formulaire), sans aucun identifiant. Rien n'est lu ni écrit sur l'appareil du visiteur (pas de
// cookie, pas de stockage local) et rien ne permet de relier deux événements à une même personne.
// Le serveur (/api/stat) ne garde que des champs connus et les transmet à PostHog sans adresse IP ni personne.
// Sert à mesurer le tunnel en entier, y compris pour les visiteurs qui refusent les cookies.

import { isTrackingHost } from "@/lib/consent";

export type AnonEvent =
  | "visite"
  | "bandeau_affiche"
  | "bandeau_choix"
  | "formulaire_vu"
  | "formulaire_commence"
  | "formulaire_erreur"
  | "formulaire_envoye";

export function anonStat(event: AnonEvent, props: Record<string, string | boolean | undefined> = {}) {
  try {
    if (typeof window === "undefined" || !isTrackingHost()) return;
    const body = JSON.stringify({ event, path: window.location.pathname, ...props });
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.("/api/stat", blob)) return;
    fetch("/api/stat", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
  } catch {}
}

/** Paramètres de campagne de l'URL courante (lus, jamais stockés), pour savoir d'où vient une visite. */
export function campagneDeLUrl(): Record<string, string | undefined> {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
      utm_content: p.get("utm_content") || undefined,
    };
  } catch {
    return {};
  }
}
