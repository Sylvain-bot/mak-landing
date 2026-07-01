"use client";

import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🧠",
    title: "Copilote IA Kiné",
    subtitle: "Ta réponse clinique en 30 secondes",
    bullets: [
      "Pose ta question comme à un confrère",
      "Détection automatique des drapeaux rouges",
      "56 000+ ressources scientifiques (Cleland, EBP)",
      "🇪🇺 IA européenne — données hébergées en Europe",
    ],
    href: "/fonctionnalites/aide-decision-clinique",
    highlight: true,
  },
  {
    icon: "📋",
    title: "Bilans NGAP",
    subtitle: "Un bilan complet en 3 minutes",
    bullets: [
      "Structure conforme, édité avant fin de séance",
      "Export PDF ou mail en 1 clic",
      "Modifiable à tout moment",
    ],
    href: "/fonctionnalites/documentation-bilan-kine",
    quote: "Dicter en direct et voir la rédaction se faire toute seule, je trouve ça incroyable.",
    quoteAuthor: "Constance, kiné libérale",
  },
  {
    icon: "📨",
    title: "Module Administratif",
    subtitle: "Courriers et relances en 2 minutes",
    bullets: [
      "Templates pour tous tes documents courants",
      "L'IA rédige en langage naturel si tu n'as pas de template",
      "Envoi direct depuis MAK avec ton en-tête",
    ],
    href: "/fonctionnalites/gestion-administrative",
  },
  {
    icon: "💬",
    title: "Chatbot patient",
    subtitle: "Tes patients accompagnés entre les séances",
    bullets: [
      "Réponses calées sur ton protocole de rééducation",
      "Continuité cabinet / domicile",
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
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Fonctionnalités</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Ce que Mon Assistant Kiné fait concrètement pour toi
          </h2>
          <p className="text-base text-[#475569] max-w-2xl mx-auto">
            Chaque module résout un problème réel du cabinet.{" "}
            <span className="text-[#0f172a] font-medium">Pas du gadget — de la pratique.</span>
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.07}>
              <div
                className="rounded-2xl p-6 flex flex-col h-full bg-white"
                style={f.highlight
                  ? { border: "1px solid rgba(56,153,170,0.35)", boxShadow: "0 8px 28px rgba(56,153,170,0.12)" }
                  : { border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
                }
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#0f172a]">{f.title}</h3>
                    <p className="text-xs font-medium" style={{ color: "#3899aa" }}>{f.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-2 mt-3 flex-1">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-xs text-[#475569]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#3899aa]" />
                      {b}
                    </li>
                  ))}
                </ul>

                {f.quote && (
                  <div className="mt-4 pl-3" style={{ borderLeft: "2px solid #d4ecea" }}>
                    <p className="text-[#94a3b8] italic text-xs leading-relaxed mb-0.5">&ldquo;{f.quote}&rdquo;</p>
                    <p className="text-[10px] text-[#cbd5e1]">— {f.quoteAuthor}</p>
                  </div>
                )}

                <Link
                  href={f.href}
                  className="mt-4 text-xs font-semibold text-[#3899aa] hover:text-[#2d8a9a] transition-colors"
                >
                  En savoir plus →
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Encart Contrats discret */}
        <ScrollReveal delay={0.28}>
          <div
            className="rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{ background: "#f0fdf4", border: "1px solid #86efac" }}
          >
            <span className="text-xl shrink-0">📑</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-[#15803d]">Contrats de remplacement — 100 % gratuit</span>
              <span className="text-xs text-[#166534]">
                {" "}· Signature électronique, déclaration Ordre en 1 clic, archivage. Offert à tous les kinés, même sans abonnement.
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
