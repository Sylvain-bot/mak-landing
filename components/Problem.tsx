"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const PAINS = [
  {
    icon: "📋",
    accentColor: "#ef4444",
    accentBg: "rgba(239,68,68,0.08)",
    accentBorder: "rgba(239,68,68,0.18)",
    title: "Bilans chronophages",
    desc: "20 minutes en moyenne pour un bilan complet et conforme. Souvent le soir, après les séances.",
    stat: "20 min / bilan",
  },
  {
    icon: "📚",
    accentColor: "#f97316",
    accentBg: "rgba(249,115,22,0.08)",
    accentBorder: "rgba(249,115,22,0.18)",
    title: "Recherche fastidieuse",
    desc: "Des heures sur PubMed pour des réponses souvent incomplètes ou inexploitables en clinique.",
    stat: "1-2h / recherche",
  },
  {
    icon: "🧠",
    accentColor: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.08)",
    accentBorder: "rgba(139,92,246,0.18)",
    title: "Décisions complexes",
    desc: "Sans filet de sécurité pour valider son raisonnement clinique face aux cas difficiles.",
    stat: "Risque de manqués",
  },
  {
    icon: "💬",
    accentColor: "#3b82f6",
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.18)",
    title: "Questions répétitives",
    desc: "Les patients posent les mêmes questions entre les séances. Du temps perdu, de l'énergie dispersée.",
    stat: "Énergie dispersée",
  },
];

export function Problem() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Le métier de kiné est de plus en plus exigeant.
          </h2>
          <p className="text-base text-[#475569] max-w-2xl mx-auto">
            Ce n&apos;est pas un manque de compétence.{" "}
            <span className="text-[#0f172a] font-medium">
              C&apos;est un manque d&apos;outils adaptés.
            </span>
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group rounded-2xl p-6 cursor-default bg-white"
              style={{ border: "1px solid #e5f2f4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.accentBg, borderColor: p.accentBorder }}
                >
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-[#0f172a]">{p.title}</h3>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 border"
                      style={{ color: p.accentColor, background: p.accentBg, borderColor: p.accentBorder }}
                    >
                      {p.stat}
                    </span>
                  </div>
                  <p className="text-[#64748b] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
              <div
                className="mt-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                style={{ background: `linear-gradient(90deg, ${p.accentColor}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div
            className="rounded-2xl p-6 sm:p-7 text-center relative overflow-hidden"
            style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{ background: "linear-gradient(180deg, #3899aa, #2a7a8a)" }}
            />
            <p className="text-[#475569] text-base leading-relaxed">
              Résultat :{" "}
              <span className="font-bold text-[#0f172a]">2h perdues par semaine.</span>{" "}
              C&apos;est{" "}
              <span className="text-[#3899aa] font-bold">100h par an</span>{" "}
              que tu ne passes pas à soigner.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
