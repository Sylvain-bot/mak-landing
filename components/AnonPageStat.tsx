"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { anonStat, campagneDeLUrl } from "@/lib/anonStat";

// Compte chaque page vue, de façon anonyme (voir lib/anonStat.ts), avec la campagne de l'URL si elle y est.
export function AnonPageStat() {
  const pathname = usePathname();
  useEffect(() => {
    anonStat("visite", campagneDeLUrl());
  }, [pathname]);
  return null;
}
