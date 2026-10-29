"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getConsent, saveConsent, OPEN_CONSENT_EVENT, type Consent } from "@/lib/consent";
import { useConsentState } from "@/lib/useConsent";


const choiceBtn =
  "flex-1 min-w-[140px] h-11 px-4 rounded-xl text-sm font-semibold text-white transition-colors outline-none focus-visible:ring-3 focus-visible:ring-[#3899aa]/40 focus-visible:ring-offset-2";
const choiceStyle = { background: "#2a7a8a" };

function Toggle({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3" style={{ borderTop: "1px solid #e2eef0" }}>
      <div className="min-w-0">
        <p id={`${id}-label`} className="text-sm font-semibold text-[#0f172a]">{label}</p>
        <p id={`${id}-desc`} className="text-xs text-[#475569] leading-relaxed mt-0.5">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
        className="relative shrink-0 w-11 h-6 rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-[#3899aa]/40"
        style={{ background: checked ? "#2a7a8a" : "#cbd5e1" }}
      >
        <span
          aria-hidden
          className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
        />
        <span className="sr-only">{checked ? "Activé" : "Désactivé"}</span>
      </button>
    </div>
  );
}

export function CookieBanner() {
  const { ready, consent } = useConsentState();
  // "auto" : visible tant qu'il n'y a pas de choix valide ; "custom" : panneau détaillé ouvert
  const [mode, setMode] = useState<"auto" | "custom">("auto");
  const [draft, setDraft] = useState<Consent>({ analytics: false, ads: false });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const view = mode === "custom" ? "custom" : ready && !consent ? "simple" : "hidden";

  useEffect(() => {
    const open = () => {
      setDraft(getConsent() ?? { analytics: false, ads: false });
      setMode("custom");
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  useEffect(() => {
    if (view !== "hidden") titleRef.current?.focus({ preventScroll: true });
  }, [view]);

  function choose(c: Consent) {
    saveConsent(c);
    setMode("auto");
  }

  if (view === "hidden") return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed z-[70] bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-[440px] rounded-2xl bg-white p-5 sm:p-6 shadow-2xl"
      style={{ border: "1px solid #d4ecea", maxHeight: "calc(100svh - 24px)", overflowY: "auto" }}
    >
      <h2
        id="cookie-banner-title"
        ref={titleRef}
        tabIndex={-1}
        className="text-base font-bold text-[#0f172a] mb-2 outline-none"
      >
        Cookies
      </h2>
      <p className="text-[13px] text-[#475569] leading-relaxed">
        Avec ton accord, on utilise <strong>PostHog</strong>{" "}(mesure d&apos;audience, données hébergées dans
        l&apos;UE) pour comprendre comment le site est utilisé, et le <strong>pixel Meta</strong>{" "}(publicité)
        pour mesurer l&apos;efficacité de nos publicités Facebook et Instagram. Rien n&apos;est activé sans ton
        accord, et tu peux changer d&apos;avis à tout moment via « Gérer mes cookies » en bas de page.{" "}
        <Link href="/politique-confidentialite#cookies" className="underline text-[#2a7a8a]">
          Politique de confidentialité
        </Link>
      </p>

      {view === "custom" && (
        <div className="mt-4">
          <Toggle
            id="consent-analytics"
            label="Mesure d'audience"
            description="PostHog : pages vues, clics et enregistrement anonymisé des sessions (saisies masquées)."
            checked={draft.analytics}
            onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
          />
          <Toggle
            id="consent-ads"
            label="Publicité"
            description="Pixel Meta : mesure des visites et inscriptions issues de nos publicités Facebook et Instagram."
            checked={draft.ads}
            onChange={(v) => setDraft((d) => ({ ...d, ads: v }))}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2.5 mt-4">
        <button type="button" className={choiceBtn} style={choiceStyle} onClick={() => choose({ analytics: false, ads: false })}>
          Tout refuser
        </button>
        <button type="button" className={choiceBtn} style={choiceStyle} onClick={() => choose({ analytics: true, ads: true })}>
          Tout accepter
        </button>
      </div>

      {view === "custom" ? (
        <button
          type="button"
          onClick={() => choose(draft)}
          className="w-full h-10 mt-2.5 rounded-xl text-sm font-semibold text-[#2a7a8a] transition-colors hover:bg-[#f0f9fa] outline-none focus-visible:ring-3 focus-visible:ring-[#3899aa]/40"
          style={{ border: "1.5px solid #3899aa" }}
        >
          Enregistrer mes choix
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setDraft({ analytics: false, ads: false });
            setMode("custom");
          }}
          className="mt-3 text-xs text-[#475569] underline hover:text-[#2a7a8a] outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/40 rounded"
        >
          Personnaliser
        </button>
      )}
    </div>
  );
}
