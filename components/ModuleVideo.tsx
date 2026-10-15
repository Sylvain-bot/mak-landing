"use client";

import { useEffect, useRef } from "react";

// Vidéo de démo d'un module (reprise de l'ancienne page d'accueil) : sans cadre ni fond,
// fondue dans la page, chargée et lue seulement quand elle est visible.
export function ModuleVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "100px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="w-full h-auto block"
        style={{ mixBlendMode: "multiply" }}
      />
    </div>
  );
}
