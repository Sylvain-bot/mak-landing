"use client";

import { useEffect, useRef } from "react";

// Vidéo de fond décorative en boucle muette : lue seulement quand elle est à l'écran,
// jamais si l'utilisateur a demandé moins d'animations (le poster reste affiché).
export function BackgroundVideo({
  src,
  poster,
  className,
  minWidth = 0,
}: {
  src: string;
  poster: string;
  className?: string;
  /** Largeur d'écran minimale (px) pour lancer la vidéo ; en dessous, le poster reste affiché. */
  minWidth?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (minWidth && !window.matchMedia(`(min-width: ${minWidth}px)`).matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.preload = "auto";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [minWidth]);

  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-hidden className={className}>
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
