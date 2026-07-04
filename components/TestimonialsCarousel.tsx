"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Je rédige mes bilans directement pendant les séances. Mes soirées m'appartiennent à nouveau.",
    author: "Marion D.",
    location: "Biot",
    tag: "Bilans kiné",
  },
  {
    quote: "Avec le suivi patient, j'ai une bien meilleure observance à domicile. Mes patients font vraiment leurs exercices entre les séances.",
    author: "Clément B.",
    location: "Lyon",
    tag: "Suivi patient",
  },
  {
    quote: "Le module copilote, c'est vraiment un game changer. Une simple question peut changer ma pratique.",
    author: "Pierre L.",
    location: "Quimper",
    tag: "Copilote clinique",
  },
  {
    quote: "Je discute avec l'IA de certains cas et ça m'aide dans mes réflexions — ça rassure de se savoir sur la bonne voie.",
    author: "Constance",
    location: "Kinésithérapeute libérale",
    tag: "Copilote clinique",
  },
  {
    quote: "J'avais un doute sur une prise en charge cervicale. En 30 secondes j'avais une orientation structurée.",
    author: "Amandine S.",
    location: "Toulouse",
    tag: "Copilote clinique",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  function goTo(idx: number) {
    setDir(idx >= current ? 1 : -1);
    setCurrent(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }

  const t = TESTIMONIALS[current];

  return (
    <section
      className="py-14 sm:py-20 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
            Témoignages
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
            Ils en parlent mieux que nous
          </h2>
        </div>

        <div className="relative overflow-hidden" style={{ minHeight: "220px" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-7 sm:p-10"
              style={{
                border: "1px solid #d4ecea",
                boxShadow: "0 2px 20px rgba(56,153,170,0.07)",
                background: "white",
              }}
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                {/* 5 étoiles */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="17" height="17" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Tag module */}
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: "#eef7f6", color: "#3899aa", border: "1px solid #d4ecea" }}
                >
                  {t.tag}
                </span>
              </div>

              <blockquote className="text-lg font-semibold text-[#0f172a] leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-[#94a3b8]">
                {t.author} — {t.location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots / progress pills */}
        <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Témoignages">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "22px" : "8px",
                height: "8px",
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
