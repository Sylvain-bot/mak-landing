/**
 * Consentement cookies — format partagé entre le site vitrine (www) et l'app (app.monassistantkine.fr).
 *
 * Cookie : mak_consent
 *   Valeur   : v1.a<0|1>.d<0|1>.<timestamp_unix>
 *              - v1        version du format / de la bannière. Si elle change, le consentement est redemandé.
 *              - a<0|1>    « Mesure d'audience » (PostHog)          — 1 = accepté, 0 = refusé
 *              - d<0|1>    « Publicité » (pixel Meta)                — 1 = accepté, 0 = refusé
 *              - timestamp date du choix, en secondes Unix (UTC)
 *              Exemple : v1.a1.d0.1760000000  → audience acceptée, publicité refusée
 *   Domaine  : .monassistantkine.fr (partagé www + app). Hors de ce domaine (localhost, previews Vercel),
 *              le cookie est posé sur l'hôte courant.
 *   Attributs: path=/ ; SameSite=Lax ; Secure (en HTTPS) ; Max-Age = 6 mois (183 jours)
 *   Validité : un cookie absent, illisible, d'une autre version ou daté de plus de 6 mois
 *              est traité comme « pas de choix » → la bannière s'affiche et rien n'est chargé.
 *
 * Événements navigateur (window) :
 *   - "mak:consent"       émis après chaque enregistrement, detail = { analytics, ads }
 *   - "mak:open-consent"  demande de réouverture de la bannière (lien « Gérer mes cookies »)
 */

export const CONSENT_COOKIE = "mak_consent";
export const CONSENT_VERSION = "v1";
export const CONSENT_MAX_AGE_SECONDS = 183 * 24 * 60 * 60;
export const CONSENT_EVENT = "mak:consent";
export const OPEN_CONSENT_EVENT = "mak:open-consent";

const SHARED_DOMAIN = "monassistantkine.fr";
const PRODUCTION_HOST = "www.monassistantkine.fr";

export type Consent = { analytics: boolean; ads: boolean };

export function parseConsent(raw: string | null | undefined, nowSeconds = Date.now() / 1000): Consent | null {
  if (!raw) return null;
  const m = /^v1\.a([01])\.d([01])\.(\d{9,11})$/.exec(decodeURIComponent(raw).trim());
  if (!m) return null;
  const ts = Number(m[3]);
  if (nowSeconds - ts > CONSENT_MAX_AGE_SECONDS || ts - nowSeconds > 24 * 60 * 60) return null;
  return { analytics: m[1] === "1", ads: m[2] === "1" };
}

export function serializeConsent(c: Consent, nowSeconds = Math.floor(Date.now() / 1000)): string {
  return `${CONSENT_VERSION}.a${c.analytics ? 1 : 0}.d${c.ads ? 1 : 0}.${nowSeconds}`;
}

function readCookie(name: string): string | null {
  try {
    const found = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
    return found ? found.slice(name.length + 1) : null;
  } catch {
    return null;
  }
}

function cookieDomainAttr(): string {
  const host = window.location.hostname;
  return host === SHARED_DOMAIN || host.endsWith("." + SHARED_DOMAIN) ? `; Domain=.${SHARED_DOMAIN}` : "";
}

/** Valeur brute du cookie mak_consent (null si absent ou côté serveur). */
export function readConsentCookie(): string | null {
  if (typeof document === "undefined") return null;
  return readCookie(CONSENT_COOKIE);
}

/** Choix valide en cours, ou null si l'utilisateur doit être (re)consulté. */
export function getConsent(): Consent | null {
  return parseConsent(readConsentCookie());
}

export function saveConsent(c: Consent) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${serializeConsent(c)}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax` +
    cookieDomainAttr() +
    secure;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }));
}

export function openConsentManager() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

/**
 * Garde-fou : traceurs actifs uniquement sur le domaine de production.
 * NEXT_PUBLIC_TRACKING_FORCE_ENABLE=1 force l'activation (tests en local ou en preview).
 */
export function isTrackingHost(): boolean {
  if (process.env.NEXT_PUBLIC_TRACKING_FORCE_ENABLE === "1") return true;
  return typeof window !== "undefined" && window.location.hostname === PRODUCTION_HOST;
}

/** Supprime les cookies dont le nom commence par `prefix`, sur l'hôte courant et sur le domaine partagé. */
export function deleteCookiesByPrefix(prefix: string) {
  const host = window.location.hostname;
  const domains = ["", `; Domain=${host}`, `; Domain=.${host}`, `; Domain=.${SHARED_DOMAIN}`];
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (!name.startsWith(prefix)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0${d}`;
    }
  }
}
