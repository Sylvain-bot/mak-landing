"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PH_KEY = "phc_mJyjJSbaWpvMQoRLJkW3w7oseJig87Kvz4P5u5ona2Qr";
const PH_HOST = "https://eu.i.posthog.com";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();
  const prev = useRef<string>("");

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? "?" + searchParams.toString() : "");
    if (url === prev.current) return;
    prev.current = url;
    ph.capture("$pageview", { $current_url: window.location.href });
  }, [pathname, searchParams, ph]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(PH_KEY, {
      api_host: PH_HOST,
      ui_host: "https://eu.posthog.com",
      capture_pageview: false, // géré manuellement via PageViewTracker
      capture_pageleave: true,
      person_profiles: "identified_only",
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-ph-mask]",
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
