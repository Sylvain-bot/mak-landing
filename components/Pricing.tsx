"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Découverte",
    price: "9",
    description: "Pour découvrir l'IA au cabinet sans engagement",
    features: [
      "1 programme max",
      "Copilote IA Kiné — usage découverte",
    ],
    highlighted: false,
    badge: null,
  },
  {
    name: "Pionnier",
    price: "19",
    priceStruck: "49",
    description: "Prix bloqué à vie. Accès complet fondateurs.",
    features: [
      "Programmes illimités",
      "Copilote IA Kiné — usage illimité",
      "Module Administratif",
      "Bilan kiné",
      "Communauté privée fondateurs",
      "Badge Pionnier exclusif",
    ],
    highlighted: true,
    badge: "Réservé aux 100 premiers",
  },
];

export function Pricing() {
  const [spots, setSpots] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/pioneer")
      .then((r) => r.json())
      .then((d) => setSpots(d.spots))
      .catch(() => {});
  }, []);

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">
            Tarifs
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Simple, transparent. Sans surprise.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-6">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className="rounded-2xl p-6 flex flex-col relative bg-white h-full"
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
                  <h3 className="text-sm font-bold mb-1" style={{ color: plan.highlighted ? "#3899aa" : "#0f172a" }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-3xl font-bold text-[#0f172a]">{plan.price}€</span>
                    {plan.priceStruck && (
                      <span className="text-[#94a3b8] text-xs line-through">{plan.priceStruck}€</span>
                    )}
                    <span className="text-[#94a3b8] text-xs">/mois</span>
                  </div>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{plan.description}</p>
                  {plan.highlighted && spots !== null && (
                    <p className="text-xs font-semibold text-[#3899aa] mt-2">
                      {spots} place{spots > 1 ? "s" : ""} restante{spots > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#475569]">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: plan.highlighted ? "#3899aa" : "#d4ecea" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://monassistantkine.vercel.app/signup"
                  className="w-full text-center block py-2.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
                  style={plan.highlighted
                    ? { background: "#3899aa", color: "white" }
                    : { border: "1px solid #d4ecea", color: "#64748b" }
                  }
                >
                  {plan.highlighted ? "Créer mon compte et choisir ma formule →" : "Commencer"}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25} className="text-center mb-6">
          <p className="text-[#94a3b8] text-xs mb-1">Sans engagement. Résiliable à tout moment.</p>
          <Link
            href="/tarifs"
            className="text-xs text-[#64748b] hover:text-[#3899aa] underline underline-offset-4 decoration-[#d4ecea] hover:decoration-[#3899aa]/40 transition-all"
          >
            Voir toutes les formules (Pratique 29€/mois · Expert 49€/mois) →
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
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
