"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Step = { num: string; title: string; desc: string };
type Hypothesis = { label: string; desc: string };
type Example = {
  question: string;
  answer: {
    opening: string;
    hypotheses?: Hypothesis[];
    actions?: string[];
    conduite?: string[];
    warning?: string;
  };
};
type Tool = {
  id: string;
  icon: string;
  label: string;
  badge: string;
  badgeGreen?: boolean;
  problem: string;
  solution: string;
  steps: Step[];
  stat: { value: string; label: string };
  link: string;
  example: Example | null;
};

const TOOLS: Tool[] = [
  {
    id: "bilans",
    icon: "📋",
    label: "Bilans",
    badge: "3 min",
    problem:
      "18 à 25 minutes par bilan NGAP. Multiplié par 8 bilans par semaine — c'est 3 heures de paperasse hebdomadaire, après les séances.",
    solution:
      "Tu dictes ou tu tapes tes notes en vrac. Mon Assistant Kiné structure au format NGAP en quelques secondes.",
    steps: [
      {
        num: "01",
        title: "Tu dictes entre deux patients",
        desc: "ou tu tapes tes notes brutes — sans te soucier de la mise en forme",
      },
      {
        num: "02",
        title: "Structuration NGAP automatique",
        desc: "terminologie exacte, format CPAM, cohérence clinique vérifiée",
      },
      {
        num: "03",
        title: "Tu relis, tu exportes",
        desc: "PDF ou envoi mail direct en 1 clic — Chrono : 3 minutes",
      },
    ],
    stat: { value: "3 min", label: "au lieu de 20 min" },
    link: "/fonctionnalites/documentation-bilan-kine",
    example: null,
  },
  {
    id: "copilote",
    icon: "🧠",
    label: "Copilote",
    badge: "30 sec",
    problem:
      "Un doute clinique entre deux patients. PubMed est inaccessible, ChatGPT invente des sources, et le Cleland est au bureau.",
    solution:
      "56 000+ ressources EBP dont le Cleland. Pose ta question, obtiens une réponse sourcée en 30 secondes.",
    steps: [
      {
        num: "01",
        title: "Tu poses ta question naturellement",
        desc: "symptôme, drapeau rouge, protocole, bibliographie — en langage naturel",
      },
      {
        num: "02",
        title: "Mon Assistant Kiné mobilise la bibliographie EBP",
        desc: "spécialisée kinésithérapie, zéro source inventée",
      },
      {
        num: "03",
        title: "Réponse structurée, sources cliquables",
        desc: "lien direct vers PubMed, drapeaux rouges signalés, tests suggérés",
      },
    ],
    stat: { value: "30 sec", label: "réponse sourcée" },
    link: "/fonctionnalites/aide-decision-clinique",
    example: {
      question:
        "Lombalgique chronique 55 ans — douleurs nocturnes + raideur matinale > 1h depuis 2 semaines. Est-ce que je dois m'inquiéter ?",
      answer: {
        opening:
          "Drapeaux rouges majeurs : douleurs nocturnes + raideur matinale > 1h chez un patient de 55 ans → suspicion forte de pathologie inflammatoire ou systémique.",
        hypotheses: [
          {
            label: "Pelvispondylite (spondylarthrite ankylosante)",
            desc: "Raideur matinale > 1h + amélioration avec l'activité physique. Début possible après 45 ans.",
          },
          {
            label: "Infection discale / spondylodiscite",
            desc: "À évoquer si fièvre, AEG, immunodépression, geste invasif récent.",
          },
          {
            label: "Métastases vertébrales",
            desc: "ATCD néoplasique ? Perte de poids inexpliquée ? Douleur continue non mécanique.",
          },
        ],
        actions: [
          "Interroger sur : fièvre, frissons, perte de poids, ATCD de cancer, immunodépression, symptômes vésico-sphinctériens",
          "Examen neurologique : déficit moteur ou sensitif des membres inférieurs, signe de la queue de cheval",
          "Si suspicion infectieuse ou neurologique → adresser en urgence",
        ],
        conduite: [
          "Si douleurs uniquement nocturnes, sans autre signe → bilan biologique (NFS, CRP, VS) + radio bassin face + RDV rhumatologue",
          "Si fièvre ou AEG → urgences",
          "Si déficit neuro → urgences immédiates",
        ],
        warning:
          "Ne pas attendre : ces signes ne relèvent pas d'une prise en charge kiné en première intention. Référer sans délai.",
      },
    },
  },
  {
    id: "suivi",
    icon: "📱",
    label: "Suivi patient",
    badge: "Observance ↑",
    problem:
      "Entre les séances, tu n'as aucune visibilité. Et tes patients n'ont aucune structure pour faire leurs exercices à domicile.",
    solution:
      "Programme personnalisé sur WhatsApp avec vidéos. Le patient valide ses séances, tu suis la compliance en temps réel.",
    steps: [
      {
        num: "01",
        title: "Tu prescris depuis la bibliothèque",
        desc: "exercices avec vidéos démonstratives, séries, fréquences — tout paramétrable",
      },
      {
        num: "02",
        title: "Le patient reçoit sur WhatsApp",
        desc: "sans appli à installer — sur le canal qu'il utilise déjà",
      },
      {
        num: "03",
        title: "Tu suis tout sur ton dashboard",
        desc: "séances validées, douleur ressentie, signalements — en temps réel",
      },
    ],
    stat: { value: "↑", label: "Meilleure observance" },
    link: "/fonctionnalites/suivi-patient",
    example: null,
  },
  {
    id: "admin",
    icon: "📨",
    label: "Admin",
    badge: "2 min",
    problem:
      "Courriers médecins, relances, comptes-rendus. Chaque document prend 10 à 15 minutes à rédiger. Et tu recommences à chaque fois.",
    solution:
      "Depuis tes templates ou générés par l'IA en 2 mots. Tu relis, tu envoies directement depuis l'app.",
    steps: [
      {
        num: "01",
        title: "Tu choisis ou décris le document",
        desc: "bibliothèque de templates ou description libre : \"courrier médecin pour lombalgie discale\"",
      },
      {
        num: "02",
        title: "L'IA génère avec ton style",
        desc: "depuis ton template ou de zéro — avec ton en-tête et ta signature",
      },
      {
        num: "03",
        title: "Envoi direct depuis l'app",
        desc: "au bon destinataire, sans copier-coller — Chrono : 2 minutes",
      },
    ],
    stat: { value: "2 min", label: "par document" },
    link: "/fonctionnalites/gestion-administrative",
    example: null,
  },
  {
    id: "contrats",
    icon: "📑",
    label: "Contrats",
    badge: "Gratuit",
    badgeGreen: true,
    problem:
      "Un remplacement = un contrat à rédiger, faire signer, et déclarer à l'Ordre. Sans outil dédié, c'est des allers-retours par mail et une démarche entièrement manuelle.",
    solution:
      "Rédaction, signature électronique et déclaration Ordre en 4 étapes. Entièrement gratuit, même sans abonnement.",
    steps: [
      {
        num: "01",
        title: "Tu crées le contrat en 2 minutes",
        desc: "tes infos (numéro Ordre, adresse, coordonnées) pré-remplies à chaque fois",
      },
      {
        num: "02",
        title: "Ton remplaçant signe par lien",
        desc: "il reçoit un lien direct — sans compte Mon Assistant Kiné requis",
      },
      {
        num: "03",
        title: "Déclaration Ordre en 1 clic",
        desc: "conformité automatique, contrat archivé, PDF exportable",
      },
    ],
    stat: { value: "100 %", label: "Gratuit pour tous les kinés" },
    link: "/fonctionnalites/contrats-remplacement",
    example: null,
  },
];

export function ToolsShowcase() {
  const [active, setActive] = useState(0);
  const tool = TOOLS[active];

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
            Ce que ça fait concrètement
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight">
            Choisis ton problème. Vois la solution.
          </h2>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TOOLS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                i === active
                  ? {
                      background: t.badgeGreen ? "#15803d" : "#0f172a",
                      color: "white",
                      boxShadow: t.badgeGreen
                        ? "0 4px 16px rgba(21,128,61,0.25)"
                        : "0 4px 16px rgba(0,0,0,0.15)",
                    }
                  : {
                      background: "white",
                      color: "#64748b",
                      border: "1px solid #d4ecea",
                    }
              }
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-mono"
                style={
                  i === active
                    ? t.badgeGreen
                      ? { background: "rgba(255,255,255,0.2)", color: "#bbf7d0" }
                      : { background: "rgba(56,153,170,0.25)", color: "#3899aa" }
                    : t.badgeGreen
                    ? { background: "#dcfce7", color: "#15803d" }
                    : { background: "#f0f9fa", color: "#94a3b8" }
                }
              >
                {t.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 16px rgba(56,153,170,0.07)" }}
          >
            {/* Problem band */}
            <div
              className="px-6 sm:px-8 py-5 flex items-start gap-4"
              style={{
                background: tool.badgeGreen ? "#f0fdf4" : "#fef9f0",
                borderBottom: `1px solid ${tool.badgeGreen ? "#86efac" : "#fde68a"}`,
              }}
            >
              <span className="text-base mt-0.5 shrink-0">
                {tool.badgeGreen ? "💡" : "⚠️"}
              </span>
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest mb-1 font-mono"
                  style={{ color: tool.badgeGreen ? "#15803d" : "#d97706" }}
                >
                  {tool.badgeGreen ? "Le cas d'usage" : "Le problème"}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: tool.badgeGreen ? "#166534" : "#92400e" }}
                >
                  {tool.problem}
                </p>
              </div>
            </div>

            {/* Solution body */}
            <div className="px-6 sm:px-8 py-7">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3899aa] mb-1.5 font-mono">
                Avec Mon Assistant Kiné
              </p>
              <p className="text-base font-semibold text-[#0f172a] mb-6 leading-snug">
                {tool.solution}
              </p>

              {/* Steps */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {tool.steps.map((step) => (
                  <div
                    key={step.num}
                    className="flex flex-col gap-2 p-4 rounded-xl"
                    style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}
                  >
                    <span className="text-xs font-bold font-mono" style={{ color: "#3899aa" }}>
                      {step.num}
                    </span>
                    <p className="text-sm font-semibold text-[#0f172a] leading-snug">
                      {step.title}
                    </p>
                    <p className="text-xs text-[#64748b] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Example — copilote uniquement */}
              {tool.example && (
                <div
                  className="rounded-xl overflow-hidden mb-7"
                  style={{ border: "1px solid #d4ecea" }}
                >
                  {/* Header */}
                  <div
                    className="px-5 py-2.5 flex items-center gap-2"
                    style={{ background: "#0f172a" }}
                  >
                    <span
                      className="text-[10px] font-mono font-semibold uppercase tracking-widest"
                      style={{ color: "#3899aa" }}
                    >
                      Exemple réel
                    </span>
                    <span className="text-[10px] text-[#475569] font-mono">
                      — ce que ça change en pratique
                    </span>
                  </div>

                  <div className="p-5" style={{ background: "#f8fafc" }}>
                    {/* Question */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ background: "#eef7f6", color: "#3899aa" }}
                      >
                        Q
                      </div>
                      <p className="text-sm text-[#475569] italic leading-relaxed">
                        &ldquo;{tool.example.question}&rdquo;
                      </p>
                    </div>

                    {/* Answer */}
                    <div
                      className="rounded-xl p-4"
                      style={{ background: "white", border: "1px solid #d4ecea" }}
                    >
                      {/* Opening line */}
                      <p className="text-sm font-bold text-[#0f172a] mb-3 leading-snug">
                        {tool.example.answer.opening}
                      </p>

                      {/* Hypotheses */}
                      {tool.example.answer.hypotheses && (
                        <div className="mb-3">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-2 font-mono">
                            Hypothèses prioritaires
                          </p>
                          <ul className="space-y-1.5">
                            {tool.example.answer.hypotheses.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs leading-relaxed">
                                <span
                                  className="shrink-0 font-bold mt-0.5"
                                  style={{ color: i === 0 ? "#ef4444" : i === 1 ? "#f97316" : "#f59e0b" }}
                                >
                                  {i + 1}.
                                </span>
                                <span>
                                  <span className="font-semibold text-[#0f172a]">{h.label}</span>
                                  <span className="text-[#64748b]"> — {h.desc}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Actions */}
                      {tool.example.answer.actions && (
                        <div className="mb-3">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-2 font-mono">
                            À faire immédiatement
                          </p>
                          <ul className="space-y-1">
                            {tool.example.answer.actions.map((a, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-[#475569] leading-relaxed">
                                <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-[#3899aa]" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Conduite */}
                      {tool.example.answer.conduite && (
                        <div className="mb-3">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-2 font-mono">
                            Conduite
                          </p>
                          <ul className="space-y-1">
                            {tool.example.answer.conduite.map((c, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-[#475569] leading-relaxed">
                                <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-[#94a3b8]" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Warning */}
                      {tool.example.answer.warning && (
                        <div
                          className="rounded-lg px-3 py-2 text-xs font-semibold leading-relaxed"
                          style={{ background: "#fef2f2", color: "#dc2626" }}
                        >
                          ⚠️ {tool.example.answer.warning}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom row */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <span
                  className="inline-flex items-baseline gap-1.5 text-sm font-bold px-4 py-2 rounded-full"
                  style={
                    tool.badgeGreen
                      ? { background: "#dcfce7", color: "#15803d" }
                      : { background: "#eef7f6", color: "#3899aa" }
                  }
                >
                  {tool.stat.value}
                  <span className="text-xs font-normal" style={{ color: tool.badgeGreen ? "#166534" : "#64748b" }}>
                    {tool.stat.label}
                  </span>
                </span>
                <Link
                  href={tool.link}
                  className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: tool.badgeGreen ? "#15803d" : "#3899aa" }}
                >
                  En savoir plus
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
