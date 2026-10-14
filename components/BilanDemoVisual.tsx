"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Animation du module Bilans (reprise telle quelle de l'ancienne section Bilan) :
// la dictée qui défile et devient du texte structuré, puis le téléphone pendant l'écoute
// devant les deux pages du bilan rédigé.

const RAW_TEXT =
  "le patient présente une gonalgie droite apparue lors d'un faux mouvement en pivot · douleur mécanique · EVA à 6/10 · aggravée à l'accroupissement et dans les escaliers · épanchement rotulien · j'note que le McMurray est positif côté médial · le Lachman est négatif · le tiroir antérieur aussi · appui monopodal 15 secondes · squat douloureux · ";

const FORMATTED_TEXT =
  "Gonalgie mécanique droite · EVA 6/10 (7/10 à J0) · Épanchement rotulien positif · McMurray+ médial · Lachman– · Déficit fonctionnel objectivé · Suspicion lésion méniscale médiale · ";

const WAVEFORM_HEIGHTS = [10, 22, 16, 30, 14, 26, 8, 20, 28, 12, 24, 18, 30, 10, 22];

const MOTION_CSS = `
  @keyframes bilan-wave {
    from { transform: scaleY(0.3); opacity: 0.5; }
    to   { transform: scaleY(1);   opacity: 1; }
  }
  @keyframes bilan-scroll-right {
    from { transform: translateX(-33.33%); }
    to   { transform: translateX(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .bilan-anim { animation: none !important; }
  }
`;

function WaveformPill() {
  return (
    <div
      className="relative z-20 flex items-center gap-[3px] px-5 py-3 rounded-full"
      style={{
        background: "white",
        border: "2px solid #3899aa",
        boxShadow: "0 4px 30px rgba(56,153,170,0.35), 0 0 0 6px rgba(56,153,170,0.08)",
      }}
    >
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="bilan-anim"
          style={{
            width: "3px",
            borderRadius: "2px",
            background: "#3899aa",
            height: `${h}px`,
            animation: `bilan-wave ${0.5 + i * 0.06}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

export function EncoderStrip() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ height: "88px", border: "1px solid rgba(56,153,170,0.2)" }}
      aria-hidden
    >
      <div className="absolute inset-y-0 left-0" style={{ width: "50%", background: "#f8fafc", overflow: "hidden" }}>
        <div
          className="flex items-center h-full bilan-anim"
          style={{ whiteSpace: "nowrap", animation: "bilan-scroll-right 2s linear infinite", willChange: "transform" }}
        >
          <span className="text-[13px] text-[#64748b] pr-8">
            {RAW_TEXT}
            {RAW_TEXT}
            {RAW_TEXT}
          </span>
        </div>
        <div
          className="absolute inset-y-0 right-0 w-16 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, #f8fafc)" }}
        />
      </div>

      <div className="absolute inset-y-0 right-0" style={{ width: "50%", background: "#3899aa", overflow: "hidden" }}>
        <div
          className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #3899aa, transparent)" }}
        />
        <div
          className="flex items-center h-full bilan-anim"
          style={{ whiteSpace: "nowrap", animation: "bilan-scroll-right 5s linear infinite", willChange: "transform" }}
        >
          <span className="text-[13px] font-semibold text-white pr-8">
            {FORMATTED_TEXT}
            {FORMATTED_TEXT}
            {FORMATTED_TEXT}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <WaveformPill />
      </div>
      <style>{MOTION_CSS}</style>
    </div>
  );
}

/** Téléphone pendant l'écoute devant les deux pages du bilan rédigé, sans fond (pour fond clair). */
export function BilanComposition({ priority = false }: { priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // La vidéo (1,6 Mo) ne se charge et ne joue que lorsqu'elle est visible,
  // et jamais si l'utilisateur a demandé moins d'animations.
  useEffect(() => {
    const v = videoRef.current;
    const el = ref.current;
    if (!v || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
      <div
        className="absolute rounded-lg overflow-hidden"
        style={{
          width: "52%",
          bottom: "8%",
          left: "30%",
          transform: "rotate(6deg)",
          transformOrigin: "bottom center",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 24px rgba(15,23,42,0.10)",
          zIndex: 1,
          opacity: 0.85,
        }}
      >
        <Image src="/pdffinal2.png" alt="" width={440} height={622} sizes="(min-width: 1024px) 260px, 45vw" className="w-full block" />
      </div>

      <div
        className="absolute rounded-lg overflow-hidden"
        style={{
          width: "58%",
          bottom: "8%",
          left: "8%",
          transform: "rotate(-3deg)",
          transformOrigin: "bottom center",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 48px rgba(15,23,42,0.18)",
          zIndex: 2,
        }}
      >
        <Image
          src="/pdffinal1.png"
          alt="Bilan kiné rédigé par MAK, page 1"
          width={440}
          height={622}
          sizes="(min-width: 1024px) 290px, 50vw"
          className="w-full block"
          priority={priority}
        />
      </div>

      <div className="absolute" style={{ zIndex: 3, left: "50%", transform: "translateX(-50%)", bottom: 0, width: "26%" }}>
        <div
          className="relative rounded-[1.8rem] p-[4px]"
          style={{ background: "#1e293b", boxShadow: "0 24px 48px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)" }}
        >
          <div className="rounded-[1.4rem] overflow-hidden" style={{ background: "#fff" }}>
            <video
              ref={videoRef}
              src="/bongifbilan.mp4"
              muted
              playsInline
              loop
              preload="none"
              aria-label="Écoute de la séance en cours dans l'application"
              style={{ width: "100%", display: "block", mixBlendMode: "multiply", aspectRatio: "9 / 19" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
