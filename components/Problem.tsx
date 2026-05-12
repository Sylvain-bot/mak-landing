"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const PAINS = [
  {
    icon: "📋",
    accentColor: "#ef4444",
    accentBg: "rgba(239,68,68,0.1)",
    accentBorder: "rgba(239,68,68,0.2)",
    title: "Bilans chronophages",
    desc: "20 minutes en moyenne pour un bilan complet et conforme. Souvent le soir, après les séances.",
    stat: "20 min / bilan",
  },
  {
    icon: "📚",
    accentColor: "#f97316",
    accentBg: "rgba(249,115,22,0.1)",
    accentBorder: "rgba(249,115,22,0.2)",
    title: "Recherche fastidieuse",
    desc: "Des heures sur PubMed pour des réponses souvent incomplètes ou inexploitables en clinique.",
    stat: "1-2h / recherche",
  },
  {
    icon: "🧠",
    accentColor: "#a78bfa",
    accentBg: "rgba(167,139,250,0.1)",
    accentBorder: "rgba(167,139,250,0.2)",
    title: "Décisions complexes",
    desc: "Sans filet de sécurité pour valider son raisonnement clinique face aux cas difficiles.",
    stat: "Risque de manqués",
  },
  {
    icon: "💬",
    accentColor: "#60a5fa",
    accentBg: "rgba(96,165,250,0.1)",
    accentBorder: "rgba(96,165,250,0.2)",
    title: "Questions répétitives",
    desc: "Les patients posent les mêmes questions entre les séances. Du temps perdu, de l'énergie dispersée.",
    stat: "Énergie dispersée",
  },
];

export function Problem() {
  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Le métier de kiné est de plus en plus exigeant.
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Ce n&apos;est pas un manque de compétence.{" "}
            <span className="text-white/85 font-medium">
              C&apos;est un manque d&apos;outils adaptés.
            </span>
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-2xl p-6 sm:p-7 cursor-default"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border transition-transform duration-300 group-hover:scale-110"
                  style={{ background: p.accentBg, borderColor: p.accentBorder }}
                >
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 border"
                      style={{ color: p.accentColor, background: p.accentBg, borderColor: p.accentBorder }}
                    >
                      {p.stat}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
              <div
                className="mt-5 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                style={{ background: `linear-gradient(90deg, ${p.accentColor}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div
            className="rounded-2xl p-7 sm:p-8 text-center relative overflow-hidden"
            style={{ background: "rgba(56,153,170,0.08)", border: "1px solid rgba(56,153,170,0.2)" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{ background: "linear-gradient(180deg, #3899aa, #2a7a8a)" }}
            />
            <p className="text-white/85 text-base sm:text-lg leading-relaxed">
              Résultat :{" "}
              <span className="font-bold text-white">2h perdues par semaine.</span>{" "}
              C&apos;est{" "}
              <span className="text-[#5bc4d6] font-bold">100h par an</span>{" "}
              que tu ne passes pas à soigner.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
