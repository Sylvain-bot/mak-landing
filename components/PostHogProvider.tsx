"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { deleteCookiesByPrefix, isTrackingHost } from "@/lib/consent";
import { useConsent } from "@/lib/useConsent";

const PH_KEY = "phc_mJyjJSbaWpvMQoRLJkW3w7oseJig87Kvz4P5u5ona2Qr";
const PH_HOST = "https://eu.i.posthog.com";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();
  const prev = useRef<string>("");

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? "?" + searchParams.toString() : "");
    if (url === prev.current) return;
    prev.current = url;
    if (ph.__loaded && !ph.has_opted_out_capturing()) {
      ph.capture("$pageview", { $current_url: window.location.href });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

/** Efface tout ce que PostHog a stocké dans le navigateur (cookies ph_*, localStorage, sessionStorage). */
function clearPostHogStorage() {
  deleteCookiesByPrefix("ph_");
  for (const store of [localStorage, sessionStorage]) {
    try {
      for (const key of Object.keys(store)) {
        if (key.startsWith("ph_") || key.includes("posthog")) store.removeItem(key);
      }
    } catch {}
  }
}

// PostHog n'est initialisé qu'avec le consentement « Mesure d'audience » (a=1).
// Sans consentement : aucun script réseau, aucun cookie, aucun stockage.
function ConsentGate() {
  const consent = useConsent();

  useEffect(() => {
    if (!isTrackingHost() || !consent) return;

    if (consent.analytics) {
      if (!posthog.__loaded) {
        posthog.init(PH_KEY, {
          api_host: PH_HOST,
          ui_host: "https://eu.posthog.com",
          capture_pageview: false, // géré manuellement (PageViewTracker + loaded)
          capture_pageleave: true,
          person_profiles: "identified_only",
          cookie_expiration: 365,
          session_recording: {
            maskAllInputs: true,
            maskTextSelector: "[data-ph-mask]",
          },
          loaded: (ph) => {
            // Un refus antérieur est mémorisé par PostHog : le consentement actuel le remplace.
            if (ph.has_opted_out_capturing()) ph.opt_in_capturing();
            ph.capture("$pageview", { $current_url: window.location.href });
          },
        });
      } else if (posthog.has_opted_out_capturing()) {
        posthog.set_config({ disable_persistence: false });
        posthog.opt_in_capturing();
        posthog.startSessionRecording();
      }
    } else if (posthog.__loaded) {
      // Retrait du consentement (a passe de 1 à 0)
      posthog.stopSessionRecording();
      posthog.opt_out_capturing();
      posthog.set_config({ disable_persistence: true });
      clearPostHogStorage();
    }
  }, [consent]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <ConsentGate />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
