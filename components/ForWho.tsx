"use client";

import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle2, XCircle } from "lucide-react";

const YES_ITEMS = [
  "Gagner 2h+ par semaine sur l'administratif",
  "Affiner ton raisonnement clinique",
  "Rédiger des bilans conformes rapidement",
  "Accéder à la recherche scientifique sans perdre du temps",
  "Travailler mieux, pas plus",
];

const NO_ITEMS = [
  "Cherches une solution gratuite",
  "Refuses les outils numériques par principe",
  "N'as pas besoin d'optimiser ta pratique",
];

export function ForWho() {
  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: "#080f1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-[#5bc4d6] text-sm font-semibold uppercase tracking-widest mb-4">
            Pour qui
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Est-ce fait pour toi ?
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ScrollReveal delay={0.1}>
            <div
              className="rounded-2xl p-6 sm:p-8 h-full"
              style={{ background: "rgba(56,153,170,0.08)", border: "1px solid rgba(56,153,170,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(56,153,170,0.15)", border: "1px solid rgba(56,153,170,0.25)" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5bc4d6]" />
                </div>
                <h3 className="text-lg font-bold text-white">Oui, si tu veux :</h3>
              </div>
              <ul className="space-y-4">
                {YES_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-[#3899aa] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div
              className="rounded-2xl p-6 sm:p-8 h-full"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <XCircle className="w-4 h-4 text-white/30" />
                </div>
                <h3 className="text-lg font-bold text-white/50">Non, si tu :</h3>
              </div>
              <ul className="space-y-4">
                {NO_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/30">
                    <XCircle className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
