"use client";

import posthog from "posthog-js";
import { SignupLink } from "@/components/SignupLink";

// Lien « Essayer » : suit le clic (PostHog, si consentement) avec son emplacement.
// Passe par SignupLink, qui ajoute les UTM et le fbclid de la visite.
export function TrackedSignupLink({
  location,
  className,
  style,
  children,
}: {
  location: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <SignupLink
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
