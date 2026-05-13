"use client";

import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Déclic",
    price: "9",
    description: "Pour découvrir l'IA au cabinet sans engagement",
    features: ["1 programme max", "Gestion patients", "IA Conversationnelle"],
    highlighted: false,
    badge: null,
  },
  {
    name: "Pratique",
    price: "29",
    description: "Pour les kinés qui veulent aller plus loin",
    features: [
      "5 programmes max",
      "IA Conversationnelle",
      "IA Bibliographique",
      "IA Clinique",
      "Bilan kiné",
    ],
    highlighted: false,
    badge: null,
  },
  {
    name: "Pionnier",
    price: "19",
    description: "Prix bloqué à vie. Accès complet fondateurs.",
    features: [
      "Programmes illimités",
      "IA Conversationnelle",
      "IA Bibliographique",
      "IA Clinique",
      "IA Administrative",
      "Bilan kiné",
      "Communauté privée fondateurs",
      "Badge Pionnier exclusif",
    ],
    highlighted: true,
    badge: "Réservé aux 100 premiers",
  },
  {
    name: "Expert",
    price: "49",
    description: "Accès complet, tous modules",
    features: ["Programmes illimités", "Accès complet tous modules"],
    highlighted: false,
    badge: null,
  },
];

export function Pricing() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">
            Tarifs
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Accès simple — Opérationnel en 3 étapes
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.08}>
              <div
                className="rounded-2xl p-5 flex flex-col relative bg-white"
                style={plan.highlighted
                  ? { border: "1px solid rgba(56,153,170,0.35)", boxShadow: "0 8px 28px rgba(56,153,170,0.12)" }
                  : { border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
                }
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-semibold">
                      <Zap className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4 mt-2">
                  <h3
                    className={cn("text-sm font-bold mb-1", plan.highlighted ? "text-[#3899aa]" : "text-[#0f172a]")}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-3xl font-bold text-[#0f172a]">{plan.price}€</span>
                    <span className="text-[#94a3b8] text-xs">/mois</span>
                  </div>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#475569]">
                      <CheckCircle2
                        className={cn("w-3.5 h-3.5 shrink-0 mt-0.5", plan.highlighted ? "text-[#3899aa]" : "text-[#d4ecea]")}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://monassistantkine.vercel.app/signup"
                  className={cn(
                    "w-full text-center block py-2.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]",
                    plan.highlighted
                      ? "bg-[#3899aa] text-white hover:bg-[#2d8a9a] shadow-sm shadow-[#3899aa]/25"
                      : "border border-[#d4ecea] text-[#64748b] hover:bg-[#eef7f6] hover:text-[#3899aa] hover:border-[#3899aa]/40"
                  )}
                >
                  {plan.highlighted ? "Créer mon compte et choisir ma formule →" : "Commencer"}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.35} className="mt-5 text-center">
          <p className="text-[#94a3b8] text-xs">
            Sans engagement. Résiliable à tout moment.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
