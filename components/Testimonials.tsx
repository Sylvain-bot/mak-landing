"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amandine S.",
    role: "Kiné libérale, Toulouse",
    module: "IA Clinique",
    quote: "En 30 secondes j'avais une orientation clinique structurée, avec les points à vérifier en bilan.",
    avatar: { bg: "#eef7f6", color: "#3899aa" },
  },
  {
    name: "Pierre L.",
    role: "Kiné libéral, Quimper",
    module: "Bibliographie",
    quote: "Le module biblio à lui seul vaut l'abonnement.",
    avatar: { bg: "#eff6ff", color: "#3b82f6" },
  },
  {
    name: "Marion D.",
    role: "Kiné libérale, Biot",
    module: "Bilans",
    quote: "Je le génère en 3-4 minutes pendant la consultation. Mes soirées m'appartiennent à nouveau.",
    avatar: { bg: "#fef3c7", color: "#d97706" },
  },
  {
    name: "Clément B.",
    role: "Kiné libéral, Lyon",
    module: "Chatbot patient",
    quote: "Mes patients se sentent mieux suivis et je vois la différence sur l'observance.",
    avatar: { bg: "#fce7f3", color: "#db2777" },
  },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = useCallback(() => {
    const index = current === 0 ? TESTIMONIALS.length - 1 : current - 1;
    goTo(index, -1);
  }, [current, goTo]);

  const next = useCallback(() => {
    const index = current === TESTIMONIALS.length - 1 ? 0 : current + 1;
    goTo(index, 1);
  }, [current, goTo]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => {
        setDirection(1);
        return c === TESTIMONIALS.length - 1 ? 0 : c + 1;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-2xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">
            Témoignages
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Ce que disent les kinés bêta-testeurs
          </h2>
          <p className="text-[#475569] text-base max-w-xl mx-auto">
            Retours de kinésithérapeutes libéraux en exercice.
          </p>
        </ScrollReveal>

        {/* Card */}
        <div className="relative">
          <div
            className="rounded-2xl p-8 sm:p-10 overflow-hidden"
            style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 20px rgba(56,153,170,0.07)" }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                {/* Stars + module */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#3899aa] text-[#3899aa]" />
                    ))}
                  </div>
                  <span
                    className="text-xs text-[#3899aa] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
                  >
                    {t.module}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-[#0f172a] text-lg sm:text-xl leading-relaxed font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: t.avatar.bg, color: t.avatar.color }}
                  >
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="text-[#0f172a] font-semibold text-sm">{t.name}</p>
                    <p className="text-[#94a3b8] text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all hover:bg-[#eef7f6] hover:border-[#3899aa]/40"
            style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5 text-[#475569]" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full flex items-center justify-center bg-white transition-all hover:bg-[#eef7f6] hover:border-[#3899aa]/40"
            style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-[#475569]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "1.5rem" : "0.375rem",
                background: i === current ? "#3899aa" : "#d4ecea",
              }}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
