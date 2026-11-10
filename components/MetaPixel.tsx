"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { deleteCookiesByPrefix, getConsent, isTrackingHost } from "@/lib/consent";
import { useConsent } from "@/lib/useConsent";

const PIXEL_ID = "1366387265244975";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { loaded?: boolean };
    _fbq?: unknown;
  }
}

let initialized = false;
// Dernier chemin envoyé à Meta : le site est une application monopage, les changements de page
// internes ne rechargent pas le pixel, on envoie donc un PageView à chaque nouveau chemin.
let lastTrackedPath: string | null = null;

// Pages qui déclenchent aussi un ViewContent. Meta masque le chemin des adresses pour ce site
// (catégorie santé) : les audiences « a vu la page tarifs » reposent sur cet événement, pas sur l'URL.
const VIEW_CONTENT_PAGES: Record<string, string> = { "/tarifs": "tarifs" };

function trackPage(path: string) {
  if (!window.fbq || path === lastTrackedPath) return;
  lastTrackedPath = path;
  window.fbq("track", "PageView");
  const content = VIEW_CONTENT_PAGES[path];
  if (content) window.fbq("track", "ViewContent", { content_name: content });
}

function loadPixel() {
  if (!window.fbq) {
    // Snippet officiel Meta, chargé uniquement après consentement « Publicité »
    /* eslint-disable */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode!.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
  }
  window.fbq!("consent", "grant");
  if (!initialized) {
    window.fbq!("init", PIXEL_ID);
    initialized = true;
  }
  trackPage(window.location.pathname);
}

export function MetaPixel() {
  const consent = useConsent();
  const pathname = usePathname();

  useEffect(() => {
    if (!isTrackingHost() || !consent) return;
    if (consent.ads) {
      loadPixel();
    } else if (window.fbq) {
      // Retrait du consentement : plus aucun envoi sur cette page, cookies Meta supprimés.
      // Aux visites suivantes, le script n'est plus chargé.
      window.fbq("consent", "revoke");
      deleteCookiesByPrefix("_fb");
    }
  }, [consent]);

  // Changement de page interne : nouveau PageView (et ViewContent sur les pages listées)
  useEffect(() => {
    if (!isTrackingHost() || !consent?.ads || !initialized) return;
    trackPage(pathname);
  }, [pathname, consent]);

  return null;
}

/** Envoie un événement Meta uniquement si le consentement « Publicité » est donné et le pixel chargé. */
export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  try {
    if (!getConsent()?.ads || typeof window.fbq !== "function") return;
    window.fbq("track", event, params);
  } catch {}
}
