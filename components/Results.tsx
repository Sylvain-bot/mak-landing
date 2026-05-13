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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl p-6 sm:p-7 flex flex-col gap-4 cursor-default group bg-white"
      style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300"
        style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
      >
        {metric.icon}
      </div>

      <div>
        <div
          className="text-4xl sm:text-5xl font-bold tabular-nums leading-none mb-1.5"
          style={metric.highlight
            ? { background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
            : { color: "#0f172a" }
          }
        >
          {metric.value}
        </div>
        <p className="text-[#64748b] text-sm font-medium">{metric.label}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-[#94a3b8] w-14 shrink-0 font-medium">Avant</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(239,68,68,0.1)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(239,68,68,0.5)" }}
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 + 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-[#94a3b8] w-20 shrink-0 text-right">{metric.before}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-[#3899aa] w-14 shrink-0 font-medium">Après</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#eef7f6" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #3899aa, #5bc4d6)" }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${Math.max(metric.afterRatio, 3)}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: index * 0.12 + 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs text-[#3899aa] w-20 shrink-0 text-right font-semibold">{metric.value}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Results() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Résultats</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Ce que tu récupères concrètement
          </h2>
          <p className="text-[#475569] text-base max-w-xl mx-auto">
            Chaque minute économisée est une minute rendue à tes patients — ou à toi.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {METRICS.map((m, i) => <MetricCard key={m.label} metric={m} index={i} />)}
        </div>

        <ScrollReveal delay={0.4}>
          <div
            className="rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "white", border: "1px solid #d4ecea" }}
            >
              <Clock className="w-5 h-5 text-[#3899aa]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[#0f172a] font-bold text-base">100h récupérées par an.</p>
              <p className="text-[#64748b] text-sm mt-0.5">Avec Mon Assistant Kiné, des kinés gagnent 2h par semaine dès le premier jour.</p>
            </div>
            <div className="flex items-center gap-2 text-[#3899aa] text-sm font-semibold shrink-0">
              <span>Voir comment</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
