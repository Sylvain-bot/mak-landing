"use client";

import Link from "next/link";
import posthog from "posthog-js";

// Lien interne qui envoie un événement PostHog au clic (si le consentement « Mesure d'audience » est donné).
export function TrackedLink({
  href,
  event,
  properties,
  className,
  children,
}: {
  href: string;
  event: string;
  properties?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          if (posthog.__loaded) posthog.capture(event, properties);
        } catch {}
      }}
    >
      {children}
    </Link>
  );
}
