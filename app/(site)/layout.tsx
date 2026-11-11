import { Suspense } from "react";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { ChatBotGate } from "@/components/ChatBotGate";
import { PostHogProvider } from "@/components/PostHogProvider";
import { MetaPixel } from "@/components/MetaPixel";
import { CookieBanner } from "@/components/CookieBanner";
import { UtmCapture } from "@/components/UtmCapture";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { AnonPageStat } from "@/components/AnonPageStat";

// Pages publiques uniquement. Les traceurs (PostHog, pixel Meta) ne se chargent
// qu'après consentement : voir lib/consent.ts.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      {children}
      <ExitIntentPopup />
      <ChatBotGate />
      <Suspense fallback={null}>
        <UtmCapture />
      </Suspense>
      <MetaPixel />
      <AnonPageStat />
      <CookieBanner />
      <RevealOnScroll />
    </PostHogProvider>
  );
}
