"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight, Clock } from "lucide-react";

const METRICS = [
  { value: "3 min", label: "par bilan complet", before: "20 min", afterRatio: 15, icon: "📋" },
  { value: "30 sec", label: "pour une recherche biblio", before: "1-2h sur PubMed", afterRatio: 4, icon: "📚" },
  { value: "+2h", label: "par semaine dégagées", before: "Perdues en admin", afterRatio: 0, icon: "⏱️", highlight: true },
];

function MetricCard({ metric, index }: { metric: typeof METRICS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="rounded-2xl p-7 sm:p-8 flex flex-col gap-5 cursor-default group"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
        style={{ background: "rgba(56,153,170,0.12)", border: "1px solid rgba(56,153,170,0.2)" }}
      >
        {metric.icon}
      </div>

      <div>
        <div
          className="text-5xl sm:text-6xl font-bold tabular-nums leading-none mb-2"
          style={metric.highlight
            ? { background: "linear-gradient(135deg, #5bc4d6 0%, #3899aa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
            : { color: "white" }
          }
        >
          {metric.value}
        </div>
        <p className="text-white/50 text-base font-medium">{metric.label}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-white/30 w-14 shrink-0 font-medium">Avant</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(239,68,68,0.15)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(239,68,68,0.6)" }}
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 + 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-white/30 w-20 shrink-0 text-right">{metric.before}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-[#5bc4d6] w-14 shrink-0 font-medium">MAK</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(56,153,170,0.12)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #3899aa, #5bc4d6)" }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${Math.max(metric.afterRatio, 3)}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 + 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-[#5bc4d6] w-20 shrink-0 text-right font-semibold">{metric.value}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Results() {
  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: "#0d1424", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-[#5bc4d6] text-sm font-semibold uppercase tracking-widest mb-4">Résultats</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ce que tu récupères concrètement
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Chaque minute économisée est une minute rendue à tes patients — ou à toi.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {METRICS.map((m, i) => <MetricCard key={m.label} metric={m} index={i} />)}
        </div>

        <ScrollReveal delay={0.4}>
          <div
            className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            style={{ background: "rgba(56,153,170,0.08)", border: "1px solid rgba(56,153,170,0.2)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(56,153,170,0.15)", border: "1px solid rgba(56,153,170,0.25)" }}
            >
              <Clock className="w-6 h-6 text-[#5bc4d6]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-bold text-lg">100h récupérées par an.</p>
              <p className="text-white/45 text-sm mt-0.5">Des kinés MAK gagnent 2h par semaine dès le premier jour d&apos;utilisation.</p>
            </div>
            <div className="flex items-center gap-2 text-[#5bc4d6] text-sm font-semibold shrink-0">
              <span>Voir comment</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
