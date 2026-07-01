"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClarityRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      (window as any).clarity?.("set", "page_path", pathname);
    } catch (_) {}
  }, [pathname]);

  return null;
}
