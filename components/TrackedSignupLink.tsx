"use client";

import posthog from "posthog-js";
import { CTA_SIGNUP_URL } from "@/lib/claims";

// Lien « Essayer » : suit le clic (PostHog, si consentement) avec son emplacement.
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
    <a
      href={CTA_SIGNUP_URL}
      className={className}
      style={style}
      onClick={() => {
        try {
          if (posthog.__loaded) posthog.capture("cta_signup_click", { location });
        } catch {}
      }}
    >
      {children}
    </a>
  );
}

