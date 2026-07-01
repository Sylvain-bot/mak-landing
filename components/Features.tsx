"use client";

import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🧠",
    tag: "Le cœur de MAK",
    title: "Copilote clinique",
    desc: "Une question, une réponse sourcée en 30 secondes — 56 000+ ressources dont le Cleland.",
    bullets: [
      "Détection automatique des drapeaux rouges",
      "Tests cliniques suggérés",
      "🇪🇺 IA européenne — données hébergées en Europe",
    ],
    href: "/fonctionnalites/aide-decision-clinique",
    primary: true,
    quote: "Ça rassure de se savoir sur la bonne voie.",
    quoteAuthor: "Constance, kiné libérale",
  },
  {
    icon: "📋",
    tag: "Bilans",
    title: "Bilans en 3 min",
    desc: "Dictée → bilan structuré conforme NGAP, drapeaux rouges inclus.",
    bullets: [
      "Structure conforme, édité avant fin de séance",
      "Export PDF ou mail en 1 clic",
    ],
    href: "/fonctionnalites/documentation-bilan-kine",
    quote: "Dicter en direct et voir la rédaction se faire toute seule, je trouve ça incroyable.",
    quoteAuthor: "Constance, kiné libérale",
  },
  {
    icon: "📨",
    tag: "Module Administratif",
    title: "Moins de paperasse",
    desc: "Courriers, relances, comptes-rendus — générés depuis tes templates ou par l'IA.",
    bullets: [
      "Templates pour tous tes documents",
      "Envoi direct depuis MAK",
    ],
    href: "/fonctionnalites/gestion-administrative",
  },
  {
    icon: "💬",
    tag: "Chatbot patient",
    title: "Réponds une fois, pas dix",
    desc: "Les questions récurrentes entre les séances trouvent réponse sans mobiliser ton temps.",
    bullets: [
      "Réponses calées sur ton protocole",
      "Réduction des messages hors séance",
    ],
    href: "/fonctionnalites/suivi-patient",
    quote: "Une meilleure continuité des soins — et je ne suis plus dérangée le samedi soir.",
    quoteAuthor: "Constance, kiné libérale",
  },
];

export function Features() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Au-delà du copilote</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Un seul outil pour tout ton quotidien de cabinet.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.07}>
              <div
                className="rounded-2xl p-5 flex flex-col h-full"
                style={f.primary
                  ? { background: "#0f172a", border: "1px solid #0f172a" }
                  : { background: "white", border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
                }
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest mb-3 block"
                  style={{ color: f.primary ? "#9DB5AB" : "#94a3b8" }}
                >
                  {f.tag}
                </span>

                <div className="text-2xl mb-3">{f.icon}</div>

                <h3
                  className="text-sm font-bold mb-1.5"
                  style={{ color: f.primary ? "white" : "#0f172a" }}
                >
                  {f.title}
                </h3>

                <p
                  className="text-xs leading-relaxed mb-3 flex-1"
                  style={{ color: f.primary ? "#CBD8CF" : "#475569" }}
                >
                  {f.desc}
                </p>

                <ul className="space-y-1.5 mb-4">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[11px]" style={{ color: f.primary ? "#9DB5AB" : "#64748b" }}>
                      <CheckCircle2
                        className="w-3 h-3 shrink-0 mt-0.5"
                        style={{ color: f.primary ? "#9DB5AB" : "#3899aa" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {f.quote && (
                  <div
                    className="mt-auto pt-3 border-t"
                    style={{ borderColor: f.primary ? "rgba(255,255,255,0.12)" : "#e5f2f4" }}
                  >
                    <p
                      className="text-xs italic leading-relaxed mb-1"
                      style={{ color: f.primary ? "#B7C9BC" : "#94a3b8" }}
                    >
                      &ldquo;{f.quote}&rdquo;
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: f.primary ? "#6B9080" : "#cbd5e1" }}
                    >
                      — {f.quoteAuthor}
                    </p>
                  </div>
                )}

                <Link
                  href={f.href}
                  className="mt-3 text-xs font-semibold transition-colors"
                  style={{ color: f.primary ? "#9DB5AB" : "#3899aa" }}
                >
                  En savoir plus →
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Contrats encart discret */}
        <ScrollReveal delay={0.28}>
          <div
            className="rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{ background: "#f0fdf4", border: "1px dashed #86efac" }}
          >
            <span className="text-xl shrink-0">📑</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-[#15803d]">Contrats de remplacement — 100 % gratuit</span>
              <span className="text-xs text-[#166534]">
                {" "}· Rédaction, signature électronique, déclaration Ordre en 1 clic. Offert à tous les kinés, même sans abonnement.
              </span>
            </div>
            <Link
              href="/fonctionnalites/contrats-remplacement"
              className="text-xs font-semibold text-[#15803d] hover:text-[#14532d] whitespace-nowrap transition-colors shrink-0"
            >
              En savoir plus →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
