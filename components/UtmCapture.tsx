"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { storeUtmFromUrl } from "@/lib/utm";
import { CONSENT_EVENT } from "@/lib/consent";

// Monté dans le layout du site : mémorise les UTM et le fbclid de l'URL à chaque navigation (voir lib/utm.ts)
export function UtmCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    storeUtmFromUrl();
  }, [pathname, searchParams]);

  // Le fbclid dépend du consentement « Publicité » : on le garde ou l'efface dès que le choix change
  useEffect(() => {
    window.addEventListener(CONSENT_EVENT, storeUtmFromUrl);
    return () => window.removeEventListener(CONSENT_EVENT, storeUtmFromUrl);
  }, []);

  return null;
}
