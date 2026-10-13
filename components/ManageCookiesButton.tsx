"use client";

import { openConsentManager } from "@/lib/consent";

export function ManageCookiesButton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <button type="button" onClick={openConsentManager} className={className} style={style}>
      Gérer mes cookies
    </button>
  );
}
