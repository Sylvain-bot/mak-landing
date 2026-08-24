"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CTA_SIGNUP_URL,
  CTA_MAIN,
  PRICE_PIONNIER,
  PRICE_PIONNIER_ANNUAL,
  FAMI_AMOUNT,
} from "@/lib/claims";

const PIONNIER_FEATURES = [
  "Bilans NGAP dictés et mis en forme",
  "Copilote clinique — 56 000+ études, Cleland inclus",
  "Suivi patient WhatsApp + chatbot entre les séances",
  "Module Administratif — courriers, templates",
  "Vidéotransmission sécurisée",
  "Communauté privée fondateurs",
  "Badge Pionnier exclusif",
];

const STEPS = [
  {
    n: "1",
    title: "Tu t'abonnes en 2026",
    body: "Tu accèdes au module vidéotransmission sécurisée dès le premier jour.",
  },
  {
    n: "2",
    title: "Tu l'utilises normalement",
    body: "Consultations à distance, suivi post-op, coordination de soins — comme d'habitude.",
  },
  {
    n: "3",
    title: "Tu déclares sur Amelipro (janv.–mars 2027)",
    body: "Une case à cocher, au titre de l'année 2026. 5 minutes, une fois par an.",
  },
  {
    n: "4",
    title: "Ta CPAM te verse 350 € (printemps 2027)",
    body: "Versement direct. Pas de remboursement à demander, pas de facture.",
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#0f172a" }}
    >
      {/* Glow */}
      <div className="absolute left-0 right-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="mx-auto max-w-4xl h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,153,170,0.4), transparent)" }} />
      </div>

      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">Tarif</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Simple et transparent.<br />
            <span style={{ color: "#3899aa" }}>Et possiblement gratuit.</span>
          </h2>
          <p className="text-white/50 text-sm mb-6">Tant qu&apos;il reste des places, une seule offre : tout inclus, prix bloqué à vie.</p>

          <div className="inline-flex items-center rounded-xl p-1" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                !annual ? "bg-white text-[#0f172a] shadow-sm" : "text-white/50 hover:text-white/70"
              )}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
                annual ? "bg-white text-[#0f172a] shadow-sm" : "text-white/50 hover:text-white/70"
              )}
            >
              Annuel
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(232,176,77,0.2)", color: "#e8b04d", border: "1px solid rgba(232,176,77,0.4)" }}
              >
                FAMI −350€
              </span>
            </button>
          </div>
        </ScrollReveal>

        {!annual ? (
          /* ── MENSUEL ── */
          <ScrollReveal>
            <div
              className="rounded-2xl p-7 sm:p-10 relative overflow-hidden"
              style={{ border: "2px solid #3899aa", boxShadow: "0 8px 40px rgba(56,153,170,0.2)", background: "rgba(56,153,170,0.05)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(56,153,170,0.15) 0%, transparent 70%)" }} />

              <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-bold">
                      <Zap className="w-3 h-3" />
                      100 places · Pionnier
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Tout inclus. {PRICE_PIONNIER}€/mois à vie.
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    Accès complet à tous les modules, prix garanti à vie, sans engagement.
                    Quand les 100 places sont prises, cette offre disparaît définitivement.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {PIONNIER_FEATURES.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/80 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 text-center w-full lg:w-auto">
                  <div className="inline-block rounded-2xl px-8 py-6 mb-3"
                    style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}>
                    <div className="text-5xl font-bold text-white">{PRICE_PIONNIER}€</div>
                    <div className="text-white/40 text-sm">/mois · à vie</div>
                    <div className="text-[#3899aa] text-xs font-semibold mt-1">100 places · tarif bloqué à vie</div>
                  </div>
                  <button
                    onClick={() => setAnnual(true)}
                    className="block w-full text-xs mb-4 hover:opacity-90 transition-opacity"
                    style={{ color: "#e8b04d" }}
                  >
                    ★ Passe à l&apos;annuel → gagne 151€ net avec le FAMI
                  </button>
                  <Link
                    href={CTA_SIGNUP_URL}
                    className="block w-full text-center px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
                  >
                    {CTA_MAIN}
                  </Link>
                  <p className="text-white/30 text-xs mt-2">Sans engagement · Résiliable à tout moment</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* ── ANNUEL ── */
          <>
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* Carte Pionnier annuelle */}
                <div
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{ border: "2px solid #3899aa", boxShadow: "0 8px 40px rgba(56,153,170,0.2)", background: "rgba(56,153,170,0.05)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-bold">
                      <Zap className="w-3 h-3" />
                      Pionnier annuel
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-white">{PRICE_PIONNIER_ANNUAL}€</span>
                    <span className="text-white/40 text-sm">/an</span>
                  </div>
                  <p className="text-[#3899aa] text-xs font-semibold mb-4">Prix garanti à vie · 100 places</p>
                  <ul className="space-y-2 mb-6">
                    {PIONNIER_FEATURES.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/80 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={CTA_SIGNUP_URL}
                    className="block w-full text-center px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
                  >
                    {CTA_MAIN}
                  </Link>
                  <p className="text-white/30 text-xs mt-2 text-center">Engagement 12 mois · Paiement en une fois</p>
                </div>

                {/* Reçu FAMI */}
                <div className="flex flex-col gap-4">
                  <div
                    className="rounded-2xl p-6 flex-1"
                    style={{ background: "rgba(232,176,77,0.06)", border: "1px solid rgba(232,176,77,0.25)" }}
                  >
                    <p className="text-[#e8b04d] text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
                      Avec l&apos;aide FAMI*
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60">Tu paies</span>
                        <span className="text-white font-semibold">{PRICE_PIONNIER_ANNUAL} €</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/60">Ta CPAM te verse</span>
                        <span className="font-semibold" style={{ color: "#e8b04d" }}>+ {FAMI_AMOUNT} €</span>
                      </div>
                      <div className="h-px" style={{ background: "rgba(232,176,77,0.2)" }} />
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold text-sm">Tu gagnes</span>
                        <span className="text-2xl font-bold" style={{ color: "#e8b04d" }}>+ 151 €</span>
                      </div>
                    </div>
                    <p className="text-white/30 text-xs leading-relaxed">
                      La seule façon de perdre de l&apos;argent avec Mon Assistant Kiné, c&apos;est de ne pas s&apos;abonner.
                    </p>
                  </div>

                  <div
                    className="rounded-2xl p-5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 font-mono">Comment ça marche</p>
                    <div className="space-y-3">
                      {STEPS.map((step) => (
                        <div key={step.n} className="flex gap-3">
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono"
                            style={{ background: "rgba(56,153,170,0.2)", color: "#3899aa", border: "1px solid rgba(56,153,170,0.3)" }}
                          >
                            {step.n}
                          </span>
                          <div>
                            <p className="text-white text-xs font-semibold leading-snug">{step.title}</p>
                            <p className="text-white/40 text-xs leading-relaxed">{step.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p id="fami-disclaimer" className="text-white/25 text-xs text-center max-w-xl mx-auto leading-relaxed mb-6">
                *L&apos;aide FAMI ({FAMI_AMOUNT} €/an) est versée par ta CPAM après déclaration sur Amelipro
                (janv.-mars de l&apos;année suivante). Son versement dépend de ta CPAM et du respect des
                conditions CNAM — Mon Assistant Kiné ne peut pas le garantir.{" "}
                <a href="/tarifs#faq" className="underline hover:text-white/50">Questions fréquentes →</a>
              </p>
            </ScrollReveal>
          </>
        )}

        {/* Bandeau contrats gratuits */}
        <ScrollReveal delay={0.15} className="mt-6">
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={{ background: "rgba(21,128,61,0.1)", border: "1px solid rgba(134,239,172,0.25)" }}>
            <span className="text-xl shrink-0">📑</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-green-300">Module Contrats de remplacement — 100 % gratuit</span>
              <span className="text-xs text-green-400/70"> · Signature électronique, déclaration Ordre en 1 clic, archivage. Offert à tous les kinés, même sans abonnement.</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: "rgba(21,128,61,0.2)", border: "1px solid rgba(134,239,172,0.3)", color: "#86efac" }}>
              Gratuit
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
