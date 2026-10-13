"use client";

import { useEffect } from "react";
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
    window.fbq!("track", "PageView");
    initialized = true;
  }
}

export function MetaPixel() {
  const consent = useConsent();

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

  return null;
}

/** Envoie un événement Meta uniquement si le consentement « Publicité » est donné et le pixel chargé. */
export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  try {
    if (!getConsent()?.ads || typeof window.fbq !== "function") return;
    window.fbq("track", event, params);
  } catch {}
}
