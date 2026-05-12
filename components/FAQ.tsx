"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Est-ce que l'abonnement est vraiment rentable ?",
    a: "Calcul rapide : MAK te dégage +2h à 3h par semaine. À 35-50€ de l'heure, c'est 270 à 680€ récupérés chaque mois. L'abonnement se rembourse à la première séance supplémentaire.",
  },
  {
    q: "Pourquoi un abonnement et pas une licence ?",
    a: "L'abonnement finance les mises à jour continues et l'enrichissement de la base d'études — qui s'alimente chaque semaine. Une licence figée ne peut pas faire ça.",
  },
  {
    q: "L'IA est-elle fiable pour la clinique ?",
    a: "MAK s'appuie sur une base spécifique à la kinésithérapie — plus de 56 000 études dont les références Cleland et les guidelines internationales. Ce n'est pas une IA généraliste : c'est un outil calibré pour ta pratique.",
  },
  {
    q: "Dois-je installer un logiciel ?",
    a: "Non. MAK est 100% en ligne, accessible depuis ton navigateur, que ce soit sur ordi ou tablette. Rien à télécharger, rien à configurer.",
  },
  {
    q: "Dois-je être à l'aise avec l'informatique ?",
    a: "Si tu sais écrire une phrase, tu sais utiliser MAK. L'interface est volontairement simple. La prise en main prend moins de 5 minutes.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui. Toutes les données sont chiffrées, hébergées en France, et le service est conforme RGPD et HDS (Hébergeur de Données de Santé). Tes données patient ne quittent jamais le territoire français.",
  },
  {
    q: "De nouvelles fonctionnalités seront-elles ajoutées ?",
    a: "Oui, en continu. L'évolution du produit est directement guidée par les retours terrain des kinés qui l'utilisent. Les Pionniers ont un accès prioritaire aux nouvelles fonctionnalités et participent aux décisions produit.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.04}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        >
          <span className="text-white/60 group-hover:text-white/90 transition-colors text-sm sm:text-base font-medium leading-snug">
            {q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-white/25 group-hover:text-white/50 transition-colors" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-white/45 text-sm leading-relaxed pb-5 pr-8">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export function FAQ() {
  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#5bc4d6] text-sm font-semibold uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Questions fréquentes
          </h2>
        </ScrollReveal>

        <div
          className="rounded-2xl px-6 sm:px-8"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
