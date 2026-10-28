"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fondu léger des sections au défilement (éléments marqués data-reveal).
// Le contenu reste visible sans JavaScript : le masquage initial ne s'applique
// qu'une fois la classe « reveal-ready » posée ici. Désactivé si moins d'animations est demandé.
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    // Ce qui est déjà à l'écran s'affiche tout de suite, sans fondu.
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("is-visible");
      else io.observe(el);
    }
    document.documentElement.classList.add("reveal-ready");
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
