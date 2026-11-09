"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { PlayCircle, Volume2 } from "lucide-react";

// Vidéo de la page merci du guide FAMI, façon page de vente :
// elle démarre seule, sans le son, sous-titres affichés (accroche l'œil) ; un bouton « activer le son »
// la relance depuis le début avec le son et les contrôles. Si le navigateur bloque la lecture
// automatique (économie d'énergie, préférences), le même bouton la lance.
// Tant que `src` est vide, un cadre « Vidéo à venir » réserve la place.
// Tant que le son n'est pas activé, la vidéo se met en pause quand elle sort de l'écran (elle ne distrait
// pas pendant la lecture de l'offre, économise les données mobiles) et reprend quand elle revient.
// Suivi PostHog (si consentement) : son activé, fin de lecture.
export function MerciVideo({
  src,
  captions,
  poster,
  ratio,
}: {
  src: string;
  /** Sous-titres WebVTT (.vtt), affichés par défaut */
  captions?: string;
  poster?: string;
  ratio: "16/9" | "9/16";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [withSound, setWithSound] = useState(false);
  const soundOn = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (soundOn.current) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  const vertical = ratio === "9/16";
  const frame = `relative mx-auto w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0f172a] ${vertical ? "max-w-[380px]" : ""}`;
  const frameStyle = { aspectRatio: ratio, boxShadow: "0 24px 60px rgba(15,23,42,0.25)" };
  const capture = (event: string) => {
    try {
      if (posthog.__loaded) posthog.capture(event, { page: "guide-fami-merci" });
    } catch {}
  };

  if (!src) {
    return (
      <div className={frame} style={frameStyle}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
          <PlayCircle className="size-16 text-white/80" strokeWidth={1.4} aria-hidden />
          <p className="text-white/70 text-sm">Vidéo à venir</p>
        </div>
      </div>
    );
  }

  function turnSoundOn() {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.loop = false;
    soundOn.current = true;
    setWithSound(true);
    v.play().catch(() => {});
    capture("merci_video_sound_on");
  }

  return (
    <div className={frame} style={frameStyle}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        controls={withSound}
        onEnded={() => capture("merci_video_complete")}
      >
        <source src={src} type="video/mp4" />
        {captions && <track kind="subtitles" src={captions} srcLang="fr" label="Français" default />}
      </video>
      {!withSound && (
        <button
          type="button"
          onClick={turnSoundOn}
          className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors outline-none focus-visible:ring-4 focus-visible:ring-[#e8b04d]/70 cursor-pointer"
          aria-label="Activer le son et lancer la vidéo depuis le début"
        >
          <span className="relative inline-flex">
            {/* Halo qui pulse autour du bouton (le bouton reste opaque et lisible) */}
            <span aria-hidden className="absolute inset-0 rounded-2xl motion-safe:animate-ping" style={{ background: "rgba(232,176,77,0.45)" }} />
            <span
              className="relative inline-flex items-center gap-2.5 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 text-base sm:text-lg font-bold text-[#0f172a]"
              style={{ background: "#e8b04d", boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}
            >
              <Volume2 className="size-6" aria-hidden /> Clique pour activer le son
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
