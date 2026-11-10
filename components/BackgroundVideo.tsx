"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Vidéo de fond décorative en boucle muette : lue seulement quand elle est à l'écran,
// jamais si l'utilisateur a demandé moins d'animations (le poster reste affiché).
// Performance mobile : sous `minWidth`, la vidéo n'est pas créée du tout (ni vidéo ni poster téléchargés :
// l'image placée dessous suffit), et le poster n'est chargé qu'à l'approche de l'écran.
function subscribeResize(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

export function BackgroundVideo({
  src,
  poster,
  className,
  minWidth = 0,
}: {
  src: string;
  poster: string;
  className?: string;
  /** Largeur d'écran minimale (px) pour afficher la vidéo ; en dessous, rien n'est chargé. */
  minWidth?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const wideEnough = useSyncExternalStore(
    subscribeResize,
    () => !minWidth || window.matchMedia(`(min-width: ${minWidth}px)`).matches,
    () => false
  );

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Poster chargé un peu avant d'arriver à l'écran
    const nearIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          nearIo.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    nearIo.observe(v);
    if (reduced) return () => nearIo.disconnect();
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
    return () => {
      nearIo.disconnect();
      io.disconnect();
    };
  }, [wideEnough]);

  if (!wideEnough) return null;

  return (
    <video ref={ref} muted loop playsInline preload="none" poster={near ? poster : undefined} aria-hidden className={className}>
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
