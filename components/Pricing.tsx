"use client";

import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { CheckCircle2, Zap, Shield } from "lucide-react";
import Link from "next/link";
import {
  CTA_SIGNUP_URL,
  CTA_MAIN,
  GUARANTEE_TEXT,
  PRICE_PIONNIER,
  PRICE_DECOUVERTE,
  PRICE_PRATIQUE,
  PRICE_EXPERT,
} from "@/lib/claims";

const PLANS_STANDARD = [
  {
    name: "Découverte",
    price: PRICE_DECOUVERTE,
    description: "Pour découvrir l'IA au cabinet sans engagement",
    features: ["1 programme max", "Copilote IA Kiné — usage découverte"],
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
    ],
  },
  {
    name: "Expert",
    price: PRICE_EXPERT,
    description: "Accès complet, tous modules",
    features: ["Programmes illimités", "Accès complet tous modules"],
  },
];

const PIONNIER_FEATURES = [
  "Programmes illimités",
  "Copilote IA Kiné — usage illimité",
  "Module Administratif",
  "Bilan kiné",
  "Suivi patient WhatsApp",
  "Communauté privée fondateurs",
  "Badge Pionnier exclusif",
];

export function Pricing() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Tarifs</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Simple, transparent. Sans surprise.
          </h2>
        </ScrollReveal>

        {/* Étage 1 — Offre Pionnier */}
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
                {/* Garantie */}
                <div className="flex items-start gap-2 p-3 rounded-xl mb-4"
                  style={{ background: "rgba(56,153,170,0.12)", border: "1px solid rgba(56,153,170,0.25)" }}>
                  <Shield className="w-4 h-4 text-[#3899aa] shrink-0 mt-0.5" />
                  <p className="text-white/70 text-xs leading-relaxed">{GUARANTEE_TEXT}</p>
                </div>
              </div>

              <div className="shrink-0 text-center lg:text-right">
                <div className="inline-block rounded-2xl p-6 mb-4"
                  style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}>
                  <div className="text-5xl font-bold text-white">{PRICE_PIONNIER}€</div>
                  <div className="text-white/50 text-sm">/mois · à vie</div>
                  <div className="text-[#3899aa] text-xs font-semibold mt-1">au lieu de 49€/mois</div>
                </div>
                <Link
                  href={CTA_SIGNUP_URL}
                  className="block w-full text-center py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
                >
                  {CTA_MAIN}
                </Link>
                <p className="text-white/40 text-xs mt-2">Sans engagement · Résiliable à tout moment</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Étage 2 — Grille standard */}
        <ScrollReveal delay={0.1}>
          <p className="text-[#64748b] text-sm font-semibold text-center mb-5">
            Les tarifs après les 100 premiers :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            {PLANS_STANDARD.map((plan, i) => (
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

        <ScrollReveal delay={0.3} className="mt-5">
          <p className="text-[#94a3b8] text-xs text-center mb-3">
            Sans engagement. Résiliable à tout moment.
          </p>
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
