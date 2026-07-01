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
  "N'es pas prêt à investir dans tes outils professionnels",
  "Refuses les outils numériques par principe",
  "N'as pas besoin d'optimiser ta pratique",
];

export function ForWho() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">
            Pour qui
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight">
            Est-ce fait pour toi ?
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ScrollReveal delay={0.1}>
            <div
              className="rounded-2xl p-6 sm:p-8 h-full"
              style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "white", border: "1px solid #d4ecea" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#3899aa]" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a]">Oui, si tu veux :</h3>
              </div>
              <ul className="space-y-3.5">
                {YES_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#3899aa] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div
              className="rounded-2xl p-6 sm:p-8 h-full bg-white"
              style={{ border: "1px solid #e5f2f4" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  <XCircle className="w-4 h-4 text-[#94a3b8]" />
                </div>
                <h3 className="text-base font-bold text-[#94a3b8]">Non, si tu :</h3>
              </div>
              <ul className="space-y-3.5">
                {NO_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                    <XCircle className="w-4 h-4 text-[#cbd5e1] shrink-0 mt-0.5" />
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
