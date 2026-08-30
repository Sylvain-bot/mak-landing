"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA_SIGNUP_URL } from "@/lib/claims";

const ROWS = [
  { id: "bilans",     emoji: "📋", label: "Bilans rédigés",               unit: "/ sem.",  saved: 15, default: 1, max: 60 },
  { id: "recherches", emoji: "🧠", label: "Recherches cliniques",          unit: "/ sem.",  saved: 30, default: 1, max: 20 },
  { id: "courriers",  emoji: "📨", label: "Courriers au médecin",          unit: "/ sem.",  saved: 10, default: 1, max: 20 },
  { id: "contrats",   emoji: "📑", label: "Contrats de remplacement",      unit: "/ mois", saved: 15, default: 1, max: 10, perMonth: true },
  { id: "suivis",     emoji: "💬", label: "Patients avec suivi actif",     unit: "/ sem.",  saved: 30, default: 1, max: 40 },
];

function roundQ(min: number) {
  return Math.round(min / 15) * 15;
}

function fmt(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m.toString().padStart(2, "0")}min`;
}

function fmtDays(totalMinutes: number): string {
  return `${Math.round(totalMinutes / 480)} jours`;
}

function Stepper({ value, onChange, max }: { value: number; onChange: (v: number) => void; max: number }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-6 h-6 rounded-md flex items-center justify-center text-sm font-bold select-none transition-colors"
        style={{ background: "#eef7f6", color: "#3899aa", border: "1px solid #d4ecea" }}
      >−</button>
      <span className="w-8 text-center text-sm font-bold tabular-nums text-[#0f172a]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-6 h-6 rounded-md flex items-center justify-center text-sm font-bold select-none transition-colors"
        style={{ background: "#eef7f6", color: "#3899aa", border: "1px solid #d4ecea" }}
      >+</button>
    </div>
  );
}

export function TimeCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(ROWS.map((r) => [r.id, r.default]))
  );

  const totalMinPerWeek = ROWS.reduce((acc, row) => {
    const v = values[row.id] ?? 0;
    return acc + (row.perMonth ? (v * row.saved) / 4 : v * row.saved);
  }, 0);

  const minPerMonth = totalMinPerWeek * 4;
  const minPerYear  = totalMinPerWeek * 48;

  return (
    <section
      ref={ref}
      className="py-14 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <p className="text-[#3899aa] text-[11px] font-semibold uppercase tracking-widest mb-1.5 font-mono">
            Calcule ton gain
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
            Combien de temps récupères-tu chaque semaine ?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.07 }}
          className="rounded-xl overflow-hidden mb-4"
          style={{ border: "1px solid #d4ecea", background: "white" }}
        >
          {ROWS.map((row, i) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
              style={{ borderBottom: i < ROWS.length - 1 ? "1px solid #f0f9fa" : "none" }}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-base shrink-0">{row.emoji}</span>
                <span className="text-sm text-[#475569] leading-snug truncate">{row.label}</span>
                <span className="text-[11px] text-[#94a3b8] shrink-0 hidden sm:inline">{row.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#94a3b8] shrink-0 sm:hidden">{row.unit}</span>
                <Stepper
                  value={values[row.id] ?? row.default}
                  onChange={(v) => setValues((prev) => ({ ...prev, [row.id]: v }))}
                  max={row.max}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Résultat */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.13 }}
          className="rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ background: "#0f172a", border: "1px solid rgba(56,153,170,0.25)" }}
        >
          <div className="flex gap-5 flex-1">
            {[
              { label: "/ semaine", display: fmt(roundQ(totalMinPerWeek)) },
              { label: "/ mois",    display: fmt(minPerMonth) },
              { label: "/ an",      display: fmtDays(minPerYear) },
            ].map(({ label, display }) => (
              <div key={label} className="text-center">
                <motion.p
                  key={display}
                  initial={{ scale: 1.1, color: "#3899aa" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-bold tabular-nums"
                >
                  {display}
                </motion.p>
                <p className="text-white/40 text-[11px] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <Link
            href={CTA_SIGNUP_URL}
            className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-lg text-xs font-bold text-white shrink-0 transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)" }}
          >
            Essayer <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <p className="text-[11px] text-[#94a3b8] text-center mt-2">
          Estimations basées sur les retours de kinés libéraux · Résultats individuels variables
        </p>
      </div>
    </section>
  );
}
