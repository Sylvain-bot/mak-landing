"use client";

import { useSyncExternalStore } from "react";
import { CTA_SIGNUP_URL } from "@/lib/claims";
import { withTrackingParams } from "@/lib/utm";
import { CONSENT_EVENT } from "@/lib/consent";

// Le lien est recalculé quand le consentement change (le fbclid en dépend)
const subscribeConsent = (cb: () => void) => {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
};

// Lien unique vers l'inscription de l'app : ajoute les UTM et le fbclid de la visite.
// Rendu serveur et hydratation avec le lien nu (pas d'écart d'hydratation), puis lien complété côté client.
// Au clic, le lien est recalculé juste avant la navigation, au cas où la capture serait arrivée après le rendu.
export function SignupLink({
  href = CTA_SIGNUP_URL,
  onClick,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const trackedHref = useSyncExternalStore(
    subscribeConsent,
    () => withTrackingParams(href),
    () => href
  );

  return (
    <a
      {...rest}
      href={trackedHref}
      onClick={(e) => {
        e.currentTarget.href = withTrackingParams(href);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
