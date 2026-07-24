"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import {
  CTA_SIGNUP_URL,
  CTA_MAIN,
  PRICE_PIONNIER,
  PRICE_DECOUVERTE,
  PRICE_PRATIQUE,
  PRICE_EXPERT,
  PRICE_PIONNIER_ANNUAL,
  PRICE_PRATIQUE_ANNUAL,
  PRICE_EXPERT_ANNUAL,
  FAMI_AMOUNT,
  FAMI_NET_PIONNIER,
  FAMI_NET_PRATIQUE,
  FAMI_NET_EXPERT,
} from "@/lib/claims";

const PLANS_MONTHLY = [
  {
    name: "Découverte",
    price: PRICE_DECOUVERTE,
    description: "Pour découvrir l'IA au cabinet sans engagement",
    features: ["1 programme max", "Copilote IA Kiné — usage découverte"],
    fami: null,
  },
  {
    name: "Pratique",
    price: PRICE_PRATIQUE,
    description: "Pour les kinés qui veulent aller plus loin",
    features: [
      "5 programmes max",
      "Copilote IA Kiné — usage standard",
      "Bilan kiné",
      "Suivi patient WhatsApp",
      "Vidéotransmission sécurisée",
    ],
    fami: null,
  },
  {
    name: "Expert",
    price: PRICE_EXPERT,
    description: "Accès complet, tous modules",
    features: ["Programmes illimités", "Accès complet tous modules", "Vidéotransmission sécurisée"],
    fami: null,
  },
];

const PLANS_ANNUAL = [
  {
    name: "Pionnier",
    price: PRICE_PIONNIER_ANNUAL,
    description: "Pour les 100 premiers kinés — accès complet garanti",
    features: [
      "Programmes illimités",
      "Copilote IA Kiné — usage illimité",
      "Module Administratif",
      "Bilan kiné",
      "Suivi patient WhatsApp",
      "Vidéotransmission sécurisée",
      "Communauté privée fondateurs",
    ],
    fami: FAMI_NET_PIONNIER,
    highlight: true,
  },
  {
    name: "Pratique",
    price: PRICE_PRATIQUE_ANNUAL,
    description: "Pour les kinés qui veulent aller plus loin",
    features: [
      "5 programmes max",
      "Copilote IA Kiné — usage standard",
      "Bilan kiné",
      "Suivi patient WhatsApp",
      "Vidéotransmission sécurisée",
    ],
    fami: FAMI_NET_PRATIQUE,
    highlight: false,
  },
  {
    name: "Expert",
    price: PRICE_EXPERT_ANNUAL,
    description: "Accès complet, tous modules",
    features: ["Programmes illimités", "Accès complet tous modules", "Vidéotransmission sécurisée"],
    fami: FAMI_NET_EXPERT,
    highlight: false,
  },
];

const PIONNIER_FEATURES = [
  "Programmes illimités",
  "Copilote IA Kiné — usage illimité",
  "Module Administratif",
  "Bilan kiné",
  "Suivi patient WhatsApp",
  "Vidéotransmission sécurisée",
  "Communauté privée fondateurs",
  "Badge Pionnier exclusif",
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-8">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Tarifs</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Simple, transparent. Sans surprise.
          </h2>

          {/* Toggle mensuel / annuel */}
          <div className="inline-flex items-center rounded-xl p-1 mt-5" style={{ background: "#e2eef0", border: "1px solid #d4ecea" }}>
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                !annual ? "bg-white text-[#0f172a] shadow-sm" : "text-[#64748b] hover:text-[#475569]"
              )}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
                annual ? "bg-white text-[#0f172a] shadow-sm" : "text-[#64748b] hover:text-[#475569]"
              )}
            >
              Annuel
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(232,176,77,0.15)", color: "#92680a", border: "1px solid rgba(232,176,77,0.4)" }}
              >
                FAMI −350€
              </span>
            </button>
          </div>
        </ScrollReveal>

        {!annual ? (
          /* ── MENSUEL ── */
          <>
            {/* Offre Pionnier mensuelle */}
            <ScrollReveal className="mb-8">
              <div
                className="rounded-2xl p-7 sm:p-9 relative overflow-hidden"
                style={{ background: "#0f172a", border: "2px solid #3899aa", boxShadow: "0 8px 40px rgba(56,153,170,0.2)" }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(56,153,170,0.18) 0%, transparent 70%)" }} />

                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-bold">
                        <Zap className="w-3 h-3" />
                        Les 100 premiers seulement
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      Les 100 premiers kinés verrouillent tout à {PRICE_PIONNIER}€/mois. À vie.
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      Accès complet à tous les modules, prix garanti à vie, sans engagement, badge fondateur.
                      Quand les 100 places sont prises, cette offre disparaît définitivement.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                      {PIONNIER_FEATURES.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-white/85 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="shrink-0 text-center lg:text-right">
                    <div className="inline-block rounded-2xl p-6 mb-4"
                      style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}>
                      <div className="text-5xl font-bold text-white">{PRICE_PIONNIER}€</div>
                      <div className="text-white/50 text-sm">/mois · à vie</div>
                      <div className="text-[#3899aa] text-xs font-semibold mt-1">au lieu de 49€/mois</div>
                    </div>
                    <p className="text-xs mb-3 mt-1" style={{ color: "rgba(232,176,77,0.75)" }}>
                      ★ Éligible aide FAMI 350 €/an —{" "}
                      <button
                        onClick={() => setAnnual(true)}
                        className="underline hover:opacity-90 transition-opacity"
                        style={{ color: "#e8b04d" }}
                      >
                        voir l&apos;annuel
                      </button>
                    </p>
                    <Link
                      href={CTA_SIGNUP_URL}
                      className="block w-full text-center px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110 whitespace-normal"
                      style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
                    >
                      {CTA_MAIN}
                    </Link>
                    <p className="text-white/40 text-xs mt-2">Sans engagement · Résiliable à tout moment</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Grille standard mensuelle */}
            <ScrollReveal delay={0.1}>
              <p className="text-[#64748b] text-sm font-semibold text-center mb-5">
                Les tarifs après les 100 premiers :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                {PLANS_MONTHLY.map((plan, i) => (
                  <ScrollReveal key={plan.name} delay={i * 0.06}>
                    <div
                      className="rounded-2xl p-5 flex flex-col bg-white"
                      style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                    >
                      <div className="mb-4">
                        <h3 className="text-sm font-bold text-[#0f172a] mb-1">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-1.5">
                          <span className="text-3xl font-bold text-[#0f172a]">{plan.price}€</span>
                          <span className="text-[#94a3b8] text-xs">/mois</span>
                        </div>
                        <p className="text-[#94a3b8] text-xs leading-relaxed">{plan.description}</p>
                      </div>
                      <ul className="space-y-2 mb-6 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-[#475569]">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#d4ecea]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={CTA_SIGNUP_URL}
                        className="w-full text-center block py-2.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02] border border-[#d4ecea] text-[#64748b] hover:bg-[#eef7f6] hover:text-[#3899aa] hover:border-[#3899aa]/40"
                      >
                        Commencer
                      </Link>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="mt-5">
              <div
                className="flex items-start gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(232,176,77,0.06)", border: "1px solid rgba(232,176,77,0.25)" }}
              >
                <span style={{ color: "#e8b04d", fontSize: "0.85rem", marginTop: "1px" }}>★</span>
                <p className="text-xs leading-relaxed" style={{ color: "#92680a" }}>
                  <strong>Toutes ces formules sont éligibles à l&apos;aide FAMI.</strong>{" "}
                  Votre CPAM peut vous verser jusqu&apos;à 350 €/an — sans calcul sur le mensuel,
                  mais l&apos;annuel vous permet de visualiser le gain net.{" "}
                  <button
                    onClick={() => setAnnual(true)}
                    className="underline font-semibold hover:opacity-80 transition-opacity"
                  >
                    Voir les offres annuelles →
                  </button>
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="mt-3">
              <p className="text-[#94a3b8] text-xs text-center mb-3">
                Sans engagement. Résiliable à tout moment.
              </p>
            </ScrollReveal>
          </>
        ) : (
          /* ── ANNUEL ── */
          <>
            <ScrollReveal className="mb-4">
              <div
                className="rounded-2xl px-5 py-3.5 flex items-start gap-3 mb-6"
                style={{ background: "rgba(232,176,77,0.08)", border: "1px solid rgba(232,176,77,0.3)" }}
              >
                <span className="text-lg shrink-0">💡</span>
                <p className="text-sm" style={{ color: "#92680a" }}>
                  <strong>Avec le FAMI :</strong> les kinés équipés d&apos;une solution de vidéotransmission sécurisée
                  peuvent toucher jusqu&apos;à <strong>{FAMI_AMOUNT} €/an</strong> de l&apos;Assurance Maladie.
                  Les nets ci-dessous tiennent compte de cette aide.{" "}
                  <a href="#fami-disclaimer" className="underline opacity-70">Voir conditions*</a>
                </p>
              </div>
            </ScrollReveal>

            {/* Grille annuelle — 3 tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {PLANS_ANNUAL.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 0.07}>
                  <div
                    className={cn("rounded-2xl p-6 flex flex-col h-full", plan.highlight ? "" : "bg-white")}
                    style={plan.highlight
                      ? { background: "#0f172a", border: "2px solid #3899aa", boxShadow: "0 8px 30px rgba(56,153,170,0.2)" }
                      : { border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
                    }
                  >
                    {plan.highlight && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full w-fit mb-3"
                        style={{ background: "rgba(56,153,170,0.2)", color: "#3899aa", border: "1px solid rgba(56,153,170,0.3)" }}>
                        <Zap className="w-2.5 h-2.5" /> 100 premiers
                      </span>
                    )}
                    <h3 className={cn("text-base font-bold mb-1", plan.highlight ? "text-white" : "text-[#0f172a]")}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className={cn("text-4xl font-bold", plan.highlight ? "text-white" : "text-[#0f172a]")}>
                        {plan.price}€
                      </span>
                      <span className={cn("text-xs", plan.highlight ? "text-white/50" : "text-[#94a3b8]")}>/an</span>
                    </div>
                    <p className={cn("text-xs mb-4", plan.highlight ? "text-white/50" : "text-[#94a3b8]")}>
                      {plan.description}
                    </p>

                    {/* FAMI net badge */}
                    {plan.fami && (
                      <div
                        className="rounded-lg px-3 py-2 mb-4 flex items-center justify-between"
                        style={plan.highlight
                          ? { background: "rgba(232,176,77,0.12)", border: "1px solid rgba(232,176,77,0.3)" }
                          : { background: "#fef9f0", border: "1px solid #fde68a" }
                        }
                      >
                        <span className="text-[11px] text-[#92680a] font-medium">Net avec FAMI*</span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: plan.fami.startsWith("−") || plan.fami.startsWith("-") ? "#e8b04d" : "#64748b" }}
                        >
                          {plan.fami} €/an
                        </span>
                      </div>
                    )}

                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className={cn("flex items-start gap-2 text-xs", plan.highlight ? "text-white/80" : "text-[#475569]")}>
                          <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", plan.highlight ? "text-[#3899aa]" : "text-[#d4ecea]")} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={CTA_SIGNUP_URL}
                      className={cn(
                        "w-full text-center block py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]",
                        plan.highlight
                          ? "text-white hover:brightness-110"
                          : "border border-[#d4ecea] text-[#64748b] hover:bg-[#eef7f6] hover:text-[#3899aa] hover:border-[#3899aa]/40"
                      )}
                      style={plan.highlight
                        ? { background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.3)" }
                        : undefined
                      }
                    >
                      {plan.highlight ? CTA_MAIN : "Commencer"}
                    </Link>
                    <p className={cn("text-[10px] text-center mt-2", plan.highlight ? "text-white/30" : "text-[#94a3b8]")}>
                      Engagement 12 mois · Paiement en une fois
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.25}>
              <p id="fami-disclaimer" className="text-[#94a3b8] text-xs text-center max-w-2xl mx-auto leading-relaxed">
                *L&apos;aide FAMI ({FAMI_AMOUNT} €/an) est versée par votre CPAM après déclaration sur Amelipro
                (janvier-mars de l&apos;année suivante). Son versement dépend de votre CPAM et du respect
                des conditions du cahier des charges CNAM — Mon Assistant Kiné ne peut pas le garantir.
              </p>
            </ScrollReveal>
          </>
        )}

        {/* Bandeau contrats gratuits — toujours visible */}
        <ScrollReveal delay={0.3} className="mt-6">
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
            <span className="text-xl shrink-0">📑</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-[#15803d]">Module Contrats de remplacement — 100 % gratuit</span>
              <span className="text-xs text-[#166534]"> · Signature électronique, déclaration Ordre en 1 clic, archivage. Offert à tous les kinés, même sans abonnement.</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d" }}>
              Gratuit
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
