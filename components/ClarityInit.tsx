"use client";

import { useEffect } from "react";

export default function ClarityInit() {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w["clarity"] = w["clarity"] || function (...args: unknown[]) {
        (w["clarity"].q = w["clarity"].q || []).push(args);
      };
      const t = document.createElement("script");
      t.async = true;
      t.src = "https://www.clarity.ms/tag/x05aesrw1w";
      const y = document.getElementsByTagName("script")[0];
      if (y && y.parentNode) {
        y.parentNode.insertBefore(t, y);
      } else {
        document.head.appendChild(t);
      }
    } catch (_) {}
  }, []);

  return null;
}
