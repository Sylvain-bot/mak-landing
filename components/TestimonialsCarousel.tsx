"use client";

const TESTIMONIALS = [
  {
    quote: "Je rédige mes bilans directement pendant les séances. Mes soirées m'appartiennent à nouveau.",
    author: "Marion D.",
    location: "Biot",
    tag: "Bilans",
  },
  {
    quote: "Avec le suivi patient, j'ai une bien meilleure observance. Mes patients font vraiment leurs exercices entre les séances.",
    author: "Clément B.",
    location: "Lyon",
    tag: "Suivi patient",
  },
  {
    quote: "Le Copilote, c'est vraiment un game changer. Une simple question peut changer ma pratique.",
    author: "Pierre L.",
    location: "Quimper",
    tag: "Copilote",
  },
  {
    quote: "Je discute avec l'IA de certains cas et ça m'aide dans mes réflexions — ça rassure de se savoir sur la bonne voie.",
    author: "Constance",
    location: "Kinésithérapeute libérale",
    tag: "Copilote",
  },
  {
    quote: "J'avais un doute sur une prise en charge cervicale. En 30 secondes j'avais une orientation structurée.",
    author: "Amandine S.",
    location: "Toulouse",
    tag: "Copilote",
  },
];

const DOUBLED = [...TESTIMONIALS, ...TESTIMONIALS];

const Star = () => (
  <svg width="11" height="11" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export function TestimonialsCarousel() {
  return (
    <div
      className="py-5 overflow-hidden"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
      aria-label="Témoignages kinésithérapeutes"
    >
      <div className="mak-ticker-track flex gap-6 w-max">
        {DOUBLED.map((t, i) => (
          <div
            key={i}
            aria-hidden={i >= TESTIMONIALS.length}
            className="shrink-0 rounded-xl px-4 py-3"
            style={{
              background: "#f8fcfd",
              border: "1px solid #d4ecea",
              maxWidth: "300px",
            }}
          >
            <div className="flex items-center gap-1 mb-1.5">
              {[...Array(5)].map((_, j) => <Star key={j} />)}
              <span
                className="text-[10px] font-semibold ml-2 px-1.5 py-0.5 rounded-full"
                style={{ background: "#eef7f6", color: "#3899aa" }}
              >
                {t.tag}
              </span>
            </div>
            <p className="text-sm text-[#0f172a] leading-snug mb-1.5">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-xs text-[#94a3b8]">
              {t.author} · {t.location}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .mak-ticker-track {
          animation: mak-ticker 40s linear infinite;
        }
        .mak-ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes mak-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mak-ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
