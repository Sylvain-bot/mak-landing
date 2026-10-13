"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CONSENT_EVENT, parseConsent, readConsentCookie, type Consent } from "@/lib/consent";

const SERVER = "__server__";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/**
 * ready = false pendant le rendu serveur et l'hydratation (le cookie n'est pas encore lu).
 * consent = null tant qu'il n'y a pas de choix valide.
 */
export function useConsentState(): { ready: boolean; consent: Consent | null } {
  const raw = useSyncExternalStore(subscribe, () => readConsentCookie() ?? "", () => SERVER);
  return useMemo(
    () => (raw === SERVER ? { ready: false, consent: null } : { ready: true, consent: parseConsent(raw) }),
    [raw]
  );
}

export function useConsent(): Consent | null {
  return useConsentState().consent;
}
