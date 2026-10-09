"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { storeUtmFromUrl } from "@/lib/utm";

// Monté dans le layout racine : mémorise utm_source / utm_medium / utm_campaign à chaque navigation
export function UtmCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    storeUtmFromUrl();
  }, [pathname, searchParams]);

  return null;
}
