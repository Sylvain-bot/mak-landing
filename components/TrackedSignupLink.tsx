"use client";

import posthog from "posthog-js";
import { SignupLink } from "@/components/SignupLink";

// Lien « Essayer » : suit le clic (PostHog, si consentement) avec son emplacement.
// Passe par SignupLink, qui ajoute les UTM et le fbclid de la visite.
export function TrackedSignupLink({
  location,
  href,
  className,
  style,
  children,
}: {
  location: string;
  /** Lien d'inscription particulier (ex. offre réservée à une page) ; par défaut, l'inscription standard. */
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <SignupLink
      href={href || undefined}
      className={className}
      style={style}
      onClick={() => {
        try {
          if (posthog.__loaded) posthog.capture("cta_signup_click", { location });
        } catch {}
      }}
    >
      {children}
    </SignupLink>
  );
}
