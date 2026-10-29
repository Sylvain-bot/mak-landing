"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { MODULES, MODULE_GROUPS, ALL_FEATURES_HREF, FAMI_HREF } from "@/lib/modules";
import { CTA_LOGIN_URL } from "@/lib/claims";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";
import { primaryCtaClass, primaryCtaStyle } from "@/lib/ctaStyles";

const linkClass =
  "px-3 py-2 text-sm font-medium text-[#334155] hover:text-[#236f7d] rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50";

function ModuleList({ onNavigate, compact }: { onNavigate?: () => void; compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-col gap-6" : "grid grid-cols-2 gap-x-6 gap-y-2"}>
      {MODULE_GROUPS.map((g) => (
        <div key={g.id}>
          <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#475569]">{g.label}</p>
          <ul className="flex flex-col">
            {MODULES.filter((m) => m.group === g.id).map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  onClick={onNavigate}
                  className="block px-3 py-2.5 rounded-xl hover:bg-[#f0f9fa] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
                >
                  <span className="block text-sm font-semibold text-[#0f172a]">{m.name}</span>
                  <span className="block text-[13px] text-[#475569] leading-snug mt-0.5">{m.pitch}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [featOpen, setFeatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const featRef = useRef<HTMLDivElement>(null);
  const hoverOpenedAt = useRef(0);
  const panelId = useId();
  const mobileId = useId();

  // Ferme les menus à chaque changement de page
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setFeatOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (featRef.current && !featRef.current.contains(e.target as Node)) setFeatOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setFeatOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Bloque le défilement de la page sous le panneau mobile
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
    <header className="fixed top-3 inset-x-3 sm:inset-x-6 z-50">
      {/* En-tête flottant arrondi */}
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 rounded-2xl bg-white/90 backdrop-blur-md"
        style={{ border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}
      >
        <Link href="/" className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50" aria-label="Mon Assistant Kiné, accueil">
          <Image src="/logo-mak.webp" alt="Mon Assistant Kiné" width={120} height={36} className="h-8 w-auto object-contain" priority />
        </Link>

        {/* Ordinateur */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          <div
            ref={featRef}
            className="relative"
            onMouseEnter={() => {
              hoverOpenedAt.current = Date.now();
              setFeatOpen(true);
            }}
            onMouseLeave={() => setFeatOpen(false)}
          >
            <button
              type="button"
              className={`${linkClass} inline-flex items-center gap-1`}
              aria-expanded={featOpen}
              aria-controls={panelId}
              onClick={() => {
                // Survol puis clic immédiat : on garde le menu ouvert au lieu de le refermer
                if (Date.now() - hoverOpenedAt.current < 600) return setFeatOpen(true);
                setFeatOpen((o) => !o);
              }}
            >
              Fonctionnalités
              <ChevronDown className={`size-4 transition-transform ${featOpen ? "rotate-180" : ""}`} aria-hidden />
            </button>
            {featOpen && (
              <div id={panelId} className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[620px]">
                <div className="rounded-2xl bg-white p-3 shadow-xl" style={{ border: "1px solid #e2eef0" }}>
                  <ModuleList onNavigate={() => setFeatOpen(false)} />
                  <Link
                    href={ALL_FEATURES_HREF}
                    onClick={() => setFeatOpen(false)}
                    className="mt-2 flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-[#236f7d] hover:bg-[#f0f9fa] outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
                    style={{ borderTop: "1px solid #e2eef0" }}
                  >
                    Voir toutes les fonctionnalités <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href={FAMI_HREF} className={linkClass}>Aide FAMI</Link>
          <Link href="/tarifs" className={linkClass}>Tarifs</Link>
          <Link href="/blog" className={linkClass}>Blog</Link>
          <Link href="/equipe" className={linkClass}>L&apos;équipe</Link>
          <a href={CTA_LOGIN_URL} className={linkClass}>Connexion</a>
          <TrackedSignupLink location="header" className={`${primaryCtaClass} ml-2 h-10 px-5 text-sm`} style={primaryCtaStyle}>
            Essayer
          </TrackedSignupLink>
        </nav>

        {/* Mobile : « Essayer » toujours visible */}
        <div className="flex lg:hidden items-center gap-2">
          <TrackedSignupLink location="header-mobile" className={`${primaryCtaClass} h-10 px-4 text-sm`} style={primaryCtaStyle}>
            Essayer
          </TrackedSignupLink>
          <button
            type="button"
            className="size-10 inline-flex items-center justify-center rounded-lg text-[#0f172a] outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

    </header>

      {/* Hors de <header> : son backdrop-filter piégerait le position: fixed du panneau */}
      {mobileOpen && (
        <nav
          id={mobileId}
          aria-label="Menu"
          className="lg:hidden fixed inset-x-0 top-[84px] bottom-0 z-50 overflow-y-auto bg-white px-4 pt-4 pb-10"
        >
          <p className="px-3 mb-3 text-base font-bold text-[#0f172a]">Fonctionnalités</p>
          <ModuleList compact onNavigate={() => setMobileOpen(false)} />
          <Link
            href={ALL_FEATURES_HREF}
            className="mt-3 flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-[#236f7d] bg-[#f0f9fa]"
          >
            Voir toutes les fonctionnalités <ArrowRight className="size-4" aria-hidden />
          </Link>
          <div className="mt-6 pt-4 flex flex-col" style={{ borderTop: "1px solid #e2eef0" }}>
            <Link href={FAMI_HREF} className="px-3 py-3 text-base font-medium text-[#0f172a]">Aide FAMI</Link>
            <Link href="/tarifs" className="px-3 py-3 text-base font-medium text-[#0f172a]">Tarifs</Link>
            <Link href="/blog" className="px-3 py-3 text-base font-medium text-[#0f172a]">Blog</Link>
            <Link href="/equipe" className="px-3 py-3 text-base font-medium text-[#0f172a]">L&apos;équipe</Link>
            <a href={CTA_LOGIN_URL} className="px-3 py-3 text-base font-medium text-[#0f172a]">Connexion</a>
          </div>
        </nav>
      )}
    </>
  );
}
