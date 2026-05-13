"use client";

import { ScrollReveal } from "./ScrollReveal";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amandine S.",
    role: "Kiné libérale, Toulouse",
    module: "IA Clinique",
    quote: "En 30 secondes j'avais une orientation clinique structurée, avec les points à vérifier en bilan.",
  },
  {
    name: "Pierre L.",
    role: "Kiné libéral, Quimper",
    module: "Bibliographie",
    quote: "Le module biblio à lui seul vaut l'abonnement.",
  },
  {
    name: "Marion D.",
    role: "Kiné libérale, Biot",
    module: "Bilans",
    quote: "Je le génère en 3-4 minutes pendant la consultation. Mes soirées m'appartiennent à nouveau.",
  },
  {
    name: "Clément B.",
    role: "Kiné libéral, Lyon",
    module: "Chatbot patient",
    quote: "Mes patients se sentent mieux suivis et je vois la différence sur l'observance.",
  },
];

const ROW_1 = TESTIMONIALS;
const ROW_2 = [...TESTIMONIALS.slice(2), ...TESTIMONIALS.slice(0, 2)];

const AVATAR_COLORS = [
  { bg: "#eef7f6", color: "#3899aa" },
  { bg: "#eff6ff", color: "#3b82f6" },
  { bg: "#fef3c7", color: "#d97706" },
  { bg: "#fce7f3", color: "#db2777" },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#3899aa] text-[#3899aa]" />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

type Testimonial = (typeof TESTIMONIALS)[0];

function TestimonialCard({ t, colorIndex }: { t: Testimonial; colorIndex: number }) {
  const palette = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];
  return (
    <div
      className="flex-shrink-0 w-[320px] rounded-2xl p-5 flex flex-col gap-3.5 bg-white transition-all duration-300 hover:-translate-y-1 cursor-default"
      style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 12px rgba(56,153,170,0.06)" }}
    >
      <div className="flex items-center justify-between">
        <Stars />
        <span
          className="text-xs text-[#3899aa] font-medium px-2.5 py-1 rounded-full"
          style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
        >
          {t.module}
        </span>
      </div>
      <p className="text-[#475569] text-sm leading-relaxed italic flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: palette.bg, color: palette.color }}
        >
          {getInitials(t.name)}
        </div>
        <div>
          <p className="text-[#0f172a] text-sm font-semibold">{t.name}</p>
          <p className="text-[#94a3b8] text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  speed = 38,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  speed?: number;
}) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={direction === "left" ? "marquee-left-third" : "marquee-right-third"}
        style={{ display: "flex", gap: "1rem", width: "fit-content", animationDuration: `${speed}s` }}
      >
        {tripled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} colorIndex={i % items.length} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden" style={{ borderTop: "1px solid #d4ecea" }}>
      <style>{`
        @keyframes marquee-left-third {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right-third {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .marquee-left-third  { animation: marquee-left-third  38s linear infinite; }
        .marquee-right-third { animation: marquee-right-third 38s linear infinite; }
        .marquee-left-third:hover,
        .marquee-right-third:hover { animation-play-state: paused; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <ScrollReveal className="text-center">
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
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW_1} direction="left" speed={42} />
        <MarqueeRow items={ROW_2} direction="right" speed={36} />
      </div>
    </section>
  );
}
