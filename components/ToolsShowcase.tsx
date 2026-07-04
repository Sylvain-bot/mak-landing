"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Step = { num: string; title: string; desc: string };
type Example = {
  question: string;
  answer: { title: string; body: string; sources: string[] };
};
type Tool = {
  id: string;
  icon: string;
  label: string;
  badge: string;
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
        title: "Deux drapeaux rouges → suspicion SPA inflammatoire",
        body: "Douleurs nocturnes + raideur matinale > 1h = critères ASAS pour spondylarthropathie inflammatoire (sensibilité ~80 %, Rudwaleit 2010). À faire : orienter vers rhumatologue pour IRM rachidienne ± bilan biologique (CRP, HLA-B27). Ne pas poursuivre la kiné comme seul traitement avant diagnostic confirmé.",
        sources: ["📚 Rudwaleit (2010) Ann Rheum Dis", "📚 Critères ASAS 2009", "🚩 2 drapeaux rouges"],
      },
    },
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
                      background: "#0f172a",
                      color: "white",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
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
                    ? { background: "rgba(56,153,170,0.25)", color: "#3899aa" }
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
              style={{ background: "#fef9f0", borderBottom: "1px solid #fde68a" }}
            >
              <span className="text-base mt-0.5 shrink-0">⚠️</span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d97706] mb-1 font-mono">
                  Le problème
                </p>
                <p className="text-sm text-[#92400e] leading-relaxed">{tool.problem}</p>
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
                    <div
                      className="rounded-xl p-4"
                      style={{ background: "white", border: "1px solid #d4ecea" }}
                    >
                      <p className="text-sm font-bold text-[#0f172a] mb-2">
                        {tool.example.answer.title}
                      </p>
                      <p className="text-xs text-[#475569] leading-relaxed mb-3">
                        {tool.example.answer.body}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.example.answer.sources.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                            style={{ background: "#eef7f6", color: "#3899aa" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom row */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <span
                  className="inline-flex items-baseline gap-1.5 text-sm font-bold px-4 py-2 rounded-full"
                  style={{ background: "#eef7f6", color: "#3899aa" }}
                >
                  {tool.stat.value}
                  <span className="text-xs font-normal text-[#64748b]">{tool.stat.label}</span>
                </span>
                <Link
                  href={tool.link}
                  className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: "#3899aa" }}
                >
                  En savoir plus
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Contrats gratuits callout */}
        <div
          className="mt-4 flex items-center gap-3 rounded-2xl px-5 py-3.5 flex-wrap"
          style={{ background: "#f0fdf4", border: "1px dashed #86efac" }}
        >
          <span className="text-xl shrink-0">📑</span>
          <p className="text-sm text-[#15803d] flex-1 min-w-0">
            <span className="font-semibold">Contrats de remplacement</span>
            <span className="text-[#166534] font-normal">
              {" "}
              · Rédaction, signature électronique, déclaration Ordre en 1 clic.{" "}
            </span>
            <Link
              href="/fonctionnalites/contrats-remplacement"
              className="font-semibold hover:underline"
            >
              100 % gratuit →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
