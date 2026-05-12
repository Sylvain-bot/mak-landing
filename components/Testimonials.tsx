"use client";

import { ScrollReveal } from "./ScrollReveal";
import { Star } from "lucide-react";

// ─── Real beta-tester testimonials only ───────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Amandine S.",
    role: "Kiné libérale, Toulouse",
    module: "IA Clinique",
    quote:
      "En 30 secondes j'avais une orientation clinique structurée, avec les points à vérifier en bilan.",
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
    quote:
      "Je le génère en 3-4 minutes pendant la consultation. Mes soirées m'appartiennent à nouveau.",
  },
  {
    name: "Clément B.",
    role: "Kiné libéral, Lyon",
    module: "Chatbot patient",
    quote:
      "Mes patients se sentent mieux suivis et je vois la différence sur l'observance.",
  },
];

// Row 1 — T1, T2, T3, T4 | Row 2 — T3, T4, T1, T2 (offset for visual variety)
const ROW_1 = TESTIMONIALS;
const ROW_2 = [...TESTIMONIALS.slice(2), ...TESTIMONIALS.slice(0, 2)];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  { bg: "rgba(56,153,170,0.2)", color: "#5bc4d6" },
  { bg: "rgba(59,130,246,0.2)", color: "#93c5fd" },
  { bg: "rgba(217,119,6,0.2)", color: "#fbbf24" },
  { bg: "rgba(219,39,119,0.2)", color: "#f9a8d4" },
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

// ─── Card ─────────────────────────────────────────────────────────────────────

type Testimonial = (typeof TESTIMONIALS)[0];

function TestimonialCard({ t, colorIndex }: { t: Testimonial; colorIndex: number }) {
  const palette = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];
  return (
    <div className="flex-shrink-0 w-[340px] rounded-2xl border border-white/10 bg-white/8 backdrop-blur-sm p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/12 hover:border-white/20 cursor-default">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="text-xs text-[#5bc4d6] font-medium bg-[#5bc4d6]/10 border border-[#5bc4d6]/20 px-2.5 py-1 rounded-full">
          {t.module}
        </span>
      </div>
      <p className="text-white/80 text-sm leading-relaxed italic flex-1">
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
          <p className="text-white text-sm font-semibold">{t.name}</p>
          <p className="text-white/40 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  items,
  direction,
  speed = 38,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  speed?: number;
}) {
  // Triple for safe coverage on wide screens, animate by -33.3%
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={direction === "left" ? "marquee-left-third" : "marquee-right-third"}
        style={{
          display: "flex",
          gap: "1rem",
          width: "fit-content",
          animationDuration: `${speed}s`,
        }}
      >
        {tripled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} colorIndex={i % items.length} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#0f172a] overflow-hidden">
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

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        <ScrollReveal className="text-center">
          <p className="text-[#5bc4d6] text-sm font-semibold uppercase tracking-widest mb-4">
            Témoignages
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ce que disent les kinés bêta-testeurs
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Retours de kinésithérapeutes libéraux en exercice.
          </p>
        </ScrollReveal>
      </div>

      {/* Infinite marquee — two rows */}
      <div className="flex flex-col gap-4">
        <MarqueeRow items={ROW_1} direction="left" speed={42} />
        <MarqueeRow items={ROW_2} direction="right" speed={36} />
      </div>
    </section>
  );
}
