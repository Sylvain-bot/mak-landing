"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "L'IA est-elle fiable pour la clinique ?",
    a: "Mon Assistant Kiné s'appuie sur une base spécifique à la kinésithérapie — plus de 56 000 études dont les références Cleland et les guidelines internationales. Ce n'est pas une IA généraliste : c'est un outil calibré pour ta pratique.",
  },
  {
    q: "Est-ce que l'abonnement est vraiment rentable ?",
    a: "Un kiné libéral passe environ 45 minutes par jour sur la documentation. À 19€/mois, MAK coûte moins qu'une seule séance remboursée — et te rend environ 16 heures par mois. Fais le calcul avec ton taux horaire : c'est l'abonnement le plus rentable de ton cabinet.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui. Toutes les données sont chiffrées et hébergées en France. Le service est conforme RGPD — les données de santé de tes patients ne quittent pas le territoire français et ne sont jamais utilisées pour entraîner des modèles IA tiers.",
  },
  {
    q: "Dois-je installer un logiciel ?",
    a: "Non. Mon Assistant Kiné est 100% en ligne, accessible depuis ton navigateur, que ce soit sur ordi ou tablette. Rien à télécharger, rien à configurer.",
  },
  {
    q: "Comment vous contacter ?",
    a: "Directement par mail : sylvain@monassistantkine.fr. Je réponds personnellement et rapidement.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.04}>
      <div style={{ borderBottom: "1px solid #e5f2f4" }}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 py-4 text-left group"
        >
          <span className="text-[#475569] group-hover:text-[#0f172a] transition-colors text-sm font-medium leading-snug">
            {q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="shrink-0"
          >
            <ChevronDown className="w-4 h-4 text-[#94a3b8] group-hover:text-[#64748b] transition-colors" />
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
              <p className="text-[#64748b] text-sm leading-relaxed pb-4 pr-8">{a}</p>
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
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] leading-tight">
            Questions fréquentes
          </h2>
        </ScrollReveal>

        <div
          className="rounded-2xl px-6 sm:px-8 bg-white"
          style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 12px rgba(56,153,170,0.06)" }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
