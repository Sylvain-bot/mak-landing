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
      className="py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: "#0d1424", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-[#5bc4d6] text-sm font-semibold uppercase tracking-widest mb-4">
            Tarifs
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Accès simple — Opérationnel en 3 étapes
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.08}>
              <div
                className="rounded-2xl p-6 flex flex-col relative"
                style={plan.highlighted
                  ? { background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.3)", boxShadow: "0 8px 32px rgba(56,153,170,0.12)" }
                  : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
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

                <div className="mb-5 mt-2">
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ color: plan.highlighted ? "#5bc4d6" : "white" }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}€</span>
                    <span className="text-white/40 text-sm">/mois</span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={cn("flex items-start gap-2 text-xs", plan.highlighted ? "text-white/65" : "text-white/45")}>
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: plan.highlighted ? "#3899aa" : "rgba(56,153,170,0.45)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://monassistantkine.vercel.app/signup"
                  className="w-full text-center block py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={plan.highlighted
                    ? { background: "#3899aa", color: "white", boxShadow: "0 4px 16px rgba(56,153,170,0.3)" }
                    : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }
                  }
                >
                  {plan.highlighted ? "Créer mon compte et choisir ma formule →" : "Commencer"}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.35} className="mt-6 text-center">
          <p className="text-white/25 text-xs">
            Sans engagement. Résiliable à tout moment.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
