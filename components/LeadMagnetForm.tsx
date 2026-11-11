"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { Loader2 } from "lucide-react";
import { getStoredUtmSource, getTrackingParams } from "@/lib/utm";
import { LEADMAGNET_CONTACT_EMAIL } from "@/lib/guideFami";
import { trackMetaEvent } from "@/components/MetaPixel";
import { PRIVACY_POLICY_URL } from "@/lib/claims";
import { anonStat, campagneDeLUrl } from "@/lib/anonStat";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full h-11 px-4 rounded-xl text-base sm:text-sm text-[#0f172a] placeholder:text-[#94a3b8] bg-[#f8fcfc] border-[1.5px] border-[#d4ecea] outline-none transition-colors focus:border-[#3899aa] focus-visible:ring-3 focus-visible:ring-[#3899aa]/25 aria-invalid:border-red-400 disabled:opacity-60";

type FieldErrors = { prenom?: string; email?: string };

export function LeadMagnetForm({ source }: { source: string }) {
  const id = useId();
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);

  // Statistiques anonymes du formulaire (voir lib/anonStat.ts) : vu à l'écran, commencé, erreur, envoyé
  useEffect(() => {
    const f = formRef.current;
    if (!f || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          anonStat("formulaire_vu", campagneDeLUrl());
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(f);
    return () => io.disconnect();
  }, []);
  const onStart = () => {
    if (started.current) return;
    started.current = true;
    anonStat("formulaire_commence", campagneDeLUrl());
  };

  const prenomErrId = `${id}-prenom-err`;
  const emailErrId = `${id}-email-err`;
  const formErrId = `${id}-form-err`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setFormError(null);

    const errors: FieldErrors = {};
    if (!prenom.trim()) errors.prenom = "Indique ton prénom.";
    if (!EMAIL_RE.test(email.trim())) errors.email = "Cette adresse email ne semble pas valide.";
    setFieldErrors(errors);
    if (errors.prenom || errors.email) {
      anonStat("formulaire_erreur", { erreur: errors.prenom && errors.email ? "prenom_email" : errors.prenom ? "prenom" : "email", ...campagneDeLUrl() });
      return;
    }

    const finalSource = getStoredUtmSource() || source;
    // Campagne et pub d'origine (utm_campaign / utm_content = id de la pub Meta) pour suivre le tunnel par pub
    const { utm_campaign: campaign, utm_content: ad } = getTrackingParams();
    setLoading(true);
    try {
      const res = await fetch("/api/leadmagnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, prenom, source: finalSource, campaign, ad, website }),
      });

      if (res.ok) {
        // Meta : uniquement avec le consentement « Publicité » (d=1)
        trackMetaEvent("Lead", { content_name: "guide-fami-2027" });
        try {
          if (posthog.__loaded) posthog.capture("leadmagnet_submit", { source: finalSource, leadmagnet: "fami-2027" });
        } catch {}
        anonStat("formulaire_envoye", campagneDeLUrl());
        router.push("/guide-fami/merci");
        return;
      }

      anonStat("formulaire_erreur", { erreur: res.status === 429 ? "trop_de_tentatives" : "serveur", ...campagneDeLUrl() });
      setFormError(
        res.status === 429
          ? "Trop de tentatives, réessaie dans quelques minutes."
          : "generic"
      );
    } catch {
      anonStat("formulaire_erreur", { erreur: "reseau", ...campagneDeLUrl() });
      setFormError("generic");
    }
    setLoading(false);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} onFocusCapture={onStart} noValidate className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-prenom`} className="text-sm font-medium text-[#0f172a]">
          Prénom
        </label>
        <input
          id={`${id}-prenom`}
          name="prenom"
          type="text"
          autoComplete="given-name"
          required
          maxLength={50}
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          disabled={loading}
          aria-invalid={!!fieldErrors.prenom}
          aria-describedby={fieldErrors.prenom ? prenomErrId : undefined}
          className={inputClass}
        />
        {fieldErrors.prenom && (
          <p id={prenomErrId} className="text-xs text-red-500">{fieldErrors.prenom}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-email`} className="text-sm font-medium text-[#0f172a]">
          Email professionnel
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="ton@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={
            [fieldErrors.email && emailErrId, formError && formErrId].filter(Boolean).join(" ") || undefined
          }
          className={inputClass}
        />
        {fieldErrors.email && (
          <p id={emailErrId} className="text-xs text-red-500">{fieldErrors.email}</p>
        )}
      </div>

      {/* Honeypot anti-spam : hors écran, invisible aux lecteurs d'écran */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        {/* Nom et libellé neutres pour que l'autofill du navigateur ne le remplisse pas */}
        <label htmlFor={`${id}-mak-hp`}>Ne pas remplir</label>
        <input
          id={`${id}-mak-hp`}
          name="mak_hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 mt-1 rounded-xl font-semibold text-sm text-white inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 outline-none focus-visible:ring-3 focus-visible:ring-[#3899aa]/40 focus-visible:ring-offset-2"
        style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 14px rgba(56,153,170,0.3)" }}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Envoi…
          </>
        ) : (
          "Recevoir le guide gratuit"
        )}
      </button>

      {formError && (
        <p id={formErrId} role="alert" className="text-xs text-red-500 text-center">
          {formError === "generic" ? (
            <>
              Oups, ça n&apos;a pas marché. Réessaie ou écris-nous à{" "}
              <a href={`mailto:${LEADMAGNET_CONTACT_EMAIL}`} className="underline">
                {LEADMAGNET_CONTACT_EMAIL}
              </a>
            </>
          ) : (
            formError
          )}
        </p>
      )}

      <p className="text-[11px] text-[#94a3b8] text-center leading-relaxed">
        Tu recevras le guide par email, puis quelques conseils FAMI. Désinscription en 1 clic.
        Tes données ne sont jamais revendues.{" "}
        <Link href={PRIVACY_POLICY_URL} className="underline hover:text-[#3899aa] transition-colors">
          Politique de confidentialité
        </Link>
      </p>
    </form>
  );
}
