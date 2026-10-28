"use client";

import { useEffect, useRef, useState } from "react";

// Boucle animée du hero (générée avec HeyGen à partir de la photo, montée en aller-retour).
// Posée par-dessus la photo : elle n'apparaît qu'une fois lancée, la photo reste l'image LCP.
// Chargée seulement sur grand écran et si l'utilisateur n'a pas demandé moins d'animations.
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!window.matchMedia("(min-width: 1280px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.preload = "auto";
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setPlaying(true)}
      className={`${className ?? ""} transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
    >
      <source src="/videos/hero-entretien-v2.webm" type="video/webm" />
      <source src="/videos/hero-entretien-v2.mp4" type="video/mp4" />
    </video>
  );
}
