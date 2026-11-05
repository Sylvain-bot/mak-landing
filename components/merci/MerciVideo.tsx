"use client";

import { useRef } from "react";
import posthog from "posthog-js";
import { PlayCircle } from "lucide-react";

// Vidéo de la page merci du guide FAMI. Tant que `src` est vide, un cadre réservé
// s'affiche à la place (même taille), pour juger la page avant le tournage.
// Lecture suivie dans PostHog (si consentement) : démarrage et fin.
export function MerciVideo({ src, poster, ratio }: { src: string; poster?: string; ratio: "16/9" | "9/16" }) {
  const started = useRef(false);
  const vertical = ratio === "9/16";
  const frame = `relative mx-auto w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0f172a] ${vertical ? "max-w-[380px]" : ""}`;
  const capture = (event: string) => {
    try {
      if (posthog.__loaded) posthog.capture(event, { page: "guide-fami-merci" });
    } catch {}
  };

  if (!src) {
    return (
      <div className={frame} style={{ aspectRatio: ratio, boxShadow: "0 24px 60px rgba(15,23,42,0.25)" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
          <PlayCircle className="size-16 text-white/80" strokeWidth={1.4} aria-hidden />
          <p className="text-white/70 text-sm">Vidéo à venir</p>
        </div>
      </div>
    );
  }

  return (
    <div className={frame} style={{ aspectRatio: ratio, boxShadow: "0 24px 60px rgba(15,23,42,0.25)" }}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        onPlay={() => {
          if (started.current) return;
          started.current = true;
          capture("merci_video_play");
        }}
        onEnded={() => capture("merci_video_complete")}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
