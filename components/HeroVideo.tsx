"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// Boucles animées du hero. « entretien » : générée avec HeyGen depuis la photo, bouton micro animé ensuite.
// « bilan » : vidéo de test (?hero=bilan), retournée en miroir pour garder le kiné côté photo.
const VARIANTS = {
  entretien: { src: "/videos/hero-entretien-v3", poster: "/images/hero-poster-v3.webp", position: "92% center" },
  bilan: { src: "/videos/hero-bilan-test", poster: "/images/hero-poster-bilan-test.webp", position: "100% center" },
} as const;

// Posée par-dessus la photo (image LCP) avec la première image de la boucle en poster.
// Lecture seulement sur grand écran et si l'utilisateur n'a pas demandé moins d'animations.
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const variant: keyof typeof VARIANTS = useSyncExternalStore(
    noSubscribe,
    () => (new URLSearchParams(window.location.search).get("hero") === "bilan" ? "bilan" : "entretien"),
    () => "entretien"
  );

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!window.matchMedia("(min-width: 1280px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.load();
    v.play().catch(() => {});
  }, [variant]);

  const { src, poster, position } = VARIANTS[variant];
  return (
    <video
      key={variant}
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden
      className={className}
      style={{ objectPosition: position }}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
