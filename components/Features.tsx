"use client";

import { ScrollReveal } from "./ScrollReveal";
import Link from "next/link";

const FEATURES = [
  {
    icon: "🧠",
    tag: "Copilote clinique",
    title: "Un doute clinique → réponse sourcée en 30 secondes",
    bullets: [
      "56 000+ ressources EBP dont le Cleland",
      "Drapeaux rouges détectés automatiquement",
      "Tests cliniques suggérés et cotés",
    ],
    href: "/fonctionnalites/aide-decision-clinique",
    primary: true,
  },
  {
    icon: "📋",
    tag: "Bilans kinésithérapiques",
    title: "Bilan NGAP dicté ou tapé, structuré en 3 minutes",
    bullets: [
      "Dictée vocale ou saisie libre",
      "Mise en forme NGAP automatique",
      "Export PDF ou envoi mail en 1 clic",
    ],
    href: "/fonctionnalites/documentation-bilan-kine",
  },
  {
    icon: "📨",
    tag: "Documents administratifs",
    title: "Courriers et comptes-rendus en 2 minutes",
    bullets: [
      "Templates pour tous tes documents courants",
      "L'IA rédige si tu n'as pas de template",
      "Envoi direct depuis MAK",
    ],
    href: "/fonctionnalites/gestion-administrative",
  },
  {
    icon: "📱",
    tag: "Suivi patient à domicile",
    title: "Programme d'exercices sur WhatsApp, compliance suivie en temps réel",
    bullets: [
      "Prescription d'exercices avec vidéos démonstratives",
      "Patient reçoit tout sur WhatsApp — sans appli à installer",
      "Chatbot guidé par ton protocole entre les séances",
      "Dashboard : séances validées, douleur, signalements",
    ],
    href: "/fonctionnalites/suivi-patient",
  },
];

export function Features() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-10">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
            Au-delà du copilote
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight max-w-lg">
            Un outil. Tout ce qu&apos;il faut au cabinet.
          </h2>
          <p className="mt-4 text-base sm:text-lg font-semibold text-[#3899aa] max-w-2xl">
            Pose ta question comme à un confrère — réponse sourcée en 30 secondes.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.tag} delay={i * 0.07}>
              <div
                className="rounded-2xl p-5 flex flex-col h-full"
                style={
                  f.primary
                    ? { background: "#0f172a", border: "1px solid #0f172a" }
                    : { background: "white", border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
                }
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest mb-3 block font-mono"
                  style={{ color: f.primary ? "#9DB5AB" : "#94a3b8" }}
                >
                  {f.tag}
                </span>

                <div className="text-2xl mb-3">{f.icon}</div>

                <h3
                  className="text-sm font-bold mb-4 leading-snug flex-1"
                  style={{ color: f.primary ? "white" : "#0f172a" }}
                >
                  {f.title}
                </h3>

                <ul className="space-y-2 mb-5">
                  {f.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[11px] leading-snug"
                      style={{ color: f.primary ? "#9DB5AB" : "#64748b" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                        style={{ background: f.primary ? "#3899aa" : "#94a3b8" }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={f.href}
                  className="mt-auto text-xs font-semibold transition-colors"
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
              <span className="text-sm font-semibold text-[#15803d]">
                Contrats de remplacement — 100 % gratuit
              </span>
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
