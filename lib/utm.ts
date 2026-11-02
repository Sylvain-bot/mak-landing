// Attribution des pubs : UTM + fbclid mémorisés en sessionStorage pendant la visite,
// relus par les formulaires (ex. LeadMagnetForm) et ajoutés aux liens vers /signup de l'app.
// Le fbclid est un identifiant publicitaire Meta : il n'est gardé et transmis que si le visiteur
// a accepté « Publicité » (d=1 dans mak_consent). Les UTM sont transmis dans tous les cas.
// Tout est côté client : sur le serveur, les fonctions ne touchent ni window ni sessionStorage.

import { getConsent } from "@/lib/consent";

export const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid"] as const;
type TrackingKey = (typeof TRACKING_KEYS)[number];
export type TrackingParams = Partial<Record<TrackingKey, string>>;

const isBrowser = () => typeof window !== "undefined";
const adsAllowed = () => getConsent()?.ads === true;
const allowed = (key: TrackingKey) => key !== "fbclid" || adsAllowed();

function readUrlParams(): TrackingParams {
  const out: TrackingParams = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of TRACKING_KEYS) {
    const value = params.get(key)?.trim();
    if (value && allowed(key)) out[key] = value;
  }
  return out;
}

function readStoredParams(): TrackingParams {
  const out: TrackingParams = {};
  for (const key of TRACKING_KEYS) {
    const value = sessionStorage.getItem(key);
    if (value && allowed(key)) out[key] = value;
  }
  return out;
}

// Une nouvelle source (utm_source ou fbclid dans l'URL) = nouvelle attribution : on repart de zéro
// pour ne pas mélanger deux campagnes.
const isNewAttribution = (fromUrl: TrackingParams) => Boolean(fromUrl.utm_source || fromUrl.fbclid);

// À chaque arrivée sur une page : nouvelle source → les anciens paramètres sont remplacés en bloc ;
// sinon chaque paramètre présent met à jour le sien. Une valeur vide n'efface jamais une valeur existante.
// Sans accord « Publicité », un fbclid déjà mémorisé est effacé (consentement retiré en cours de visite).
// À rappeler après chaque changement de consentement.
export function storeUtmFromUrl() {
  if (!isBrowser()) return;
  try {
    if (!adsAllowed()) sessionStorage.removeItem("fbclid");
    const fromUrl = readUrlParams();
    if (isNewAttribution(fromUrl)) for (const key of TRACKING_KEYS) sessionStorage.removeItem(key);
    for (const [key, value] of Object.entries(fromUrl)) sessionStorage.setItem(key, value);
  } catch {}
}

// Paramètres de la visite : mémorisés, complétés par ceux de l'URL courante (au cas où la capture
// n'a pas encore eu lieu, ex. clic avant le premier effet). Objet vide côté serveur.
export function getTrackingParams(): TrackingParams {
  if (!isBrowser()) return {};
  try {
    const fromUrl = readUrlParams();
    return isNewAttribution(fromUrl) ? fromUrl : { ...readStoredParams(), ...fromUrl };
  } catch {
    return {};
  }
}

export function getStoredUtmSource(): string | null {
  return getTrackingParams().utm_source ?? null;
}

// Ajoute les paramètres de la visite à un lien d'inscription, sans remplacer ceux déjà présents
// dans le lien. Côté serveur (ou sans paramètre mémorisé), le lien est rendu tel quel.
export function withTrackingParams(url: string): string {
  const tracking = getTrackingParams();
  const entries = Object.entries(tracking);
  if (!entries.length) return url;
  try {
    const u = new URL(url, window.location.origin);
    for (const [key, value] of entries) {
      if (!u.searchParams.has(key)) u.searchParams.set(key, value);
    }
    return u.toString();
  } catch {
    return url;
  }
}
