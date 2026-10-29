"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Mic } from "lucide-react";

// Démonstration animée de « Ta séance, sans clavier » : le vrai enregistrement d'écran de l'app
// joue dans un téléphone, les étapes s'allument au même rythme, ce que dit le kiné apparaît
// à gauche et les pages du bilan sortent à droite. Tout est piloté par le temps de la vidéo.

const DURATION = 17.7; // durée de videos/demo-bilan.*
// Phases de la vidéo montée (secondes) : prêt → enregistrement → rédaction → bilan
const STEP_RANGES: [number, number][] = [
  [0, 1.6],
  [1.6, 8.65],
  [8.65, DURATION],
];
const BILAN_AT = 12.4;
// Phrases cohérentes avec le bilan affiché (pdffinal1/2)
const SPOKEN = [
  { at: 2.4, text: "Douleur au genou droit depuis trois semaines, après un faux mouvement en pivot." },
  { at: 4.4, text: "Flexion à 125° à droite, 140° à gauche." },
  { at: 6.4, text: "McMurray positif en médial, Lachman négatif." },
];

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function HowItWorksDemo({ steps }: { steps: string[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false
  );

  // Lecture seulement quand la scène est visible ; temps suivi image par image pour des transitions fluides
  useEffect(() => {
    const v = videoRef.current;
    const stage = stageRef.current;
    if (!v || !stage || reduced) return;
    let raf = 0;
    const tick = () => {
      setT(v.currentTime);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().catch(() => {});
          raf = requestAnimationFrame(tick);
        } else {
          v.pause();
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(stage);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Sans animation : on montre l'état final (toutes les étapes, phrases et bilan)
  const time = reduced ? DURATION : t;
  const showBilan = time >= BILAN_AT;

  return (
    <>
      <ol className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-6">
        {steps.map((s, i) => {
          const [from, to] = STEP_RANGES[i];
          const active = !reduced && time >= from && time < to;
          const progress = reduced ? 1 : Math.min(1, Math.max(0, (time - from) / (to - from)));
          return (
            <li
              key={s}
              className="relative overflow-hidden rounded-2xl md:rounded-3xl px-4 py-3.5 md:p-9 flex flex-row md:flex-col items-center md:items-start gap-3.5 md:gap-5 transition-[box-shadow,background-color] duration-500"
              style={{
                background: active ? "#e6f3f5" : "#f2f9fa",
                boxShadow: active ? "inset 0 0 0 2px #2a8494" : "inset 0 0 0 2px transparent",
              }}
            >
              <span
                className="shrink-0 size-9 md:size-12 rounded-full inline-flex items-center justify-center text-base md:text-lg font-bold text-white"
                style={{ background: "#237584" }}
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="text-base md:text-xl font-semibold text-[#0f172a] leading-snug">{s}</p>
              {/* Avancement de l'étape, au rythme de la démonstration */}
              <span aria-hidden className="absolute left-0 bottom-0 h-1 bg-[#2a8494]" style={{ width: `${progress * 100}%` }} />
            </li>
          );
        })}
      </ol>

      <div
        ref={stageRef}
        className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-10"
      >
        {/* Ce que dit le kiné */}
        <div className="order-2 lg:order-1 flex flex-col gap-3 lg:items-end">
          <p className="text-xs sm:text-sm font-semibold text-[#64748b] lg:text-right">Ce que tu dis</p>
          {SPOKEN.map(({ at, text }) => {
            const on = time >= at;
            return (
              <div
                key={at}
                className="flex items-start gap-2.5 max-w-sm rounded-2xl rounded-tr-sm bg-white px-4 py-3 text-[15px] leading-snug text-[#334155] transition-all duration-500"
                style={{
                  boxShadow: "0 6px 20px rgba(15,23,42,0.08)",
                  border: "1px solid #e2e8f0",
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : "translateY(10px)",
                }}
              >
                <Mic className="mt-0.5 size-4 shrink-0 text-[#c8102e]" aria-hidden />
                <span>« {text} »</span>
              </div>
            );
          })}
        </div>

        {/* Le téléphone : vrai enregistrement d'écran de l'app */}
        <div className="order-1 lg:order-2 justify-self-center">
          <div
            className="relative w-[230px] sm:w-[260px] rounded-[2.6rem] bg-[#0f172a] p-[9px]"
            style={{ boxShadow: "0 30px 60px rgba(15,23,42,0.25)" }}
          >
            {/* Barre d'état au-dessus de l'écran de l'app, pour que l'encoche ne masque rien */}
            <div className="relative overflow-hidden rounded-[2.1rem] bg-white pt-[30px]">
              <span aria-hidden className="absolute top-[9px] left-1/2 -translate-x-1/2 h-[16px] w-[66px] rounded-full bg-[#0f172a]" />
              <div className="relative" style={{ aspectRatio: "540 / 1124" }}>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload={reduced ? "none" : "metadata"}
                poster="/images/demo-bilan-poster.webp"
                aria-label="Démonstration : le téléphone enregistre la séance, puis le bilan rédigé s'affiche"
                className="absolute inset-0 size-full object-cover"
              >
                <source src="/videos/demo-bilan.webm" type="video/webm" />
                <source src="/videos/demo-bilan.mp4" type="video/mp4" />
              </video>
              </div>
            </div>
          </div>
        </div>

        {/* Ce que Mon Assistant Kiné rédige */}
        <div className="order-3 flex flex-col gap-3 lg:items-start">
          <p className="text-xs sm:text-sm font-semibold text-[#236f7d]">Ce que Mon Assistant Kiné rédige</p>
          <div className="relative h-[250px] sm:h-[300px] w-full max-w-sm">
            {["/images/pdffinal2.webp", "/images/pdffinal1.webp"].map((src, i) => (
              <div
                key={src}
                className="absolute top-0 w-[175px] sm:w-[210px] rounded-lg overflow-hidden bg-white transition-all duration-700 ease-out"
                style={{
                  left: i === 0 ? "38%" : "0%",
                  boxShadow: "0 14px 34px rgba(15,23,42,0.16)",
                  border: "1px solid #e2e8f0",
                  opacity: showBilan ? 1 : 0,
                  transform: showBilan
                    ? `translateX(0) rotate(${i === 0 ? 4 : -2}deg)`
                    : "translateX(-40px) rotate(0deg)",
                  transitionDelay: showBilan ? `${i === 0 ? 250 : 0}ms` : "0ms",
                }}
              >
                <Image src={src} alt={i === 1 ? "Page 1 du bilan kiné généré" : "Page 2 du bilan kiné généré"} width={594} height={838} className="w-full h-auto" />
              </div>
            ))}
          </div>
          <p
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#236f7d] transition-opacity duration-500"
            style={{ border: "1px solid #cfe6ea", opacity: showBilan ? 1 : 0 }}
          >
            <Check className="size-4" aria-hidden /> Bilan structuré, prêt à vérifier
          </p>
        </div>
      </div>
    </>
  );
}
