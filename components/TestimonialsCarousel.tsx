"use client";

// Témoignages réels d'utilisateurs (noms publiés avec leur accord).
// Les kinés qui ne souhaitent pas être nommés apparaissent comme « Kiné libéral · utilisateur Pionnier ».
const TESTIMONIALS: { quote: string; author: string; location?: string; tag?: string }[] = [
  {
    quote: "Je ne pense plus pouvoir me passer de l'app maintenant.",
    author: "Constance",
  },
  {
    quote: "Je rédige mes bilans directement pendant les séances. Mes soirées m'appartiennent à nouveau.",
    author: "Marion D.",
    location: "Biot",
    tag: "Bilans",
  },
  {
    quote: "J'ai vraiment pris du plaisir à faire mes bilans.",
    author: "Kiné libéral",
    location: "utilisateur Pionnier",
    tag: "Bilans",
  },
  {
    quote: "Avec le suivi patient, j'ai une bien meilleure observance. Mes patients font vraiment leurs exercices entre les séances.",
    author: "Clément B.",
    location: "Lyon",
    tag: "Suivi patient",
  },
  {
    quote: "Ça change mon quotidien et celui de mes patients.",
    author: "Kiné libéral",
    location: "utilisateur Pionnier",
  },
  {
    quote: "Le Copilote, c'est vraiment un game changer. Une simple question peut changer ma pratique.",
    author: "Pierre L.",
    location: "Quimper",
    tag: "Copilote",
  },
  {
    quote: "C'est que le début, mais l'app est déjà très agréable à utiliser.",
    author: "Kiné libéral",
    location: "utilisateur Pionnier",
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
  <svg width="12" height="12" viewBox="0 0 20 20" fill="#f59e0b" aria-hidden>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export function TestimonialsCarousel() {
  return (
    <div className="mak-ticker overflow-hidden py-2" role="region" aria-label="Témoignages de kinésithérapeutes">
      <ul className="mak-ticker-track flex gap-4 sm:gap-5 w-max">
        {DOUBLED.map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= TESTIMONIALS.length}
            className="shrink-0 w-[280px] sm:w-[340px] rounded-2xl bg-white px-5 py-4 sm:px-6 sm:py-5 flex flex-col"
            style={{ border: "1px solid #d4ecea" }}
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, j) => (
                <Star key={j} />
              ))}
              {t.tag && (
                <span className="text-[11px] font-semibold ml-2 px-2 py-0.5 rounded-full" style={{ background: "#eef7f6", color: "#236f7d" }}>
                  {t.tag}
                </span>
              )}
            </div>
            <p className="text-[15px] sm:text-base text-[#0f172a] leading-snug flex-1">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-3 text-sm text-[#64748b]">
              <span className="font-semibold text-[#334155]">{t.author}</span>
              {t.location && <> · {t.location}</>}
            </p>
          </li>
        ))}
      </ul>

      <style>{`
        .mak-ticker-track { animation: mak-ticker 55s linear infinite; }
        .mak-ticker:hover .mak-ticker-track,
        .mak-ticker:focus-within .mak-ticker-track { animation-play-state: paused; }
        @keyframes mak-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* Moins d'animations demandé : bande immobile, défilable à la main */
        @media (prefers-reduced-motion: reduce) {
          .mak-ticker { overflow-x: auto; }
          .mak-ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
