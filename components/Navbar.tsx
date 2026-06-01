"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const FEATURES = [
  { href: "/fonctionnalites/documentation-bilan-kine", icon: "📋", label: "Bilans NGAP", badge: null },
  { href: "/fonctionnalites/recherche-bibliographique", icon: "📚", label: "Recherche EBP", badge: null },
  { href: "/fonctionnalites/aide-decision-clinique", icon: "🧠", label: "Aide clinique", badge: null },
  { href: "/fonctionnalites/suivi-patient", icon: "💬", label: "Suivi patient", badge: null },
  { href: "/fonctionnalites/gestion-administrative", icon: "📨", label: "Administratif", badge: null },
  { href: "/fonctionnalites/contrats-remplacement", icon: "📑", label: "Contrats de remplacement", badge: "Gratuit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [featOpen, setFeatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFeatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || mobileOpen ? "rgba(255,255,255,0.96)" : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || mobileOpen ? "1px solid #d4ecea" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo-mak.webp"
              alt="Mon Assistant Kiné"
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {/* Fonctionnalités dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setFeatOpen(true)}
              onMouseLeave={() => setFeatOpen(false)}
            >
              <button
                onClick={() => setFeatOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#475569] hover:text-[#3899aa] transition-colors rounded-lg hover:bg-[#eef7f6]"
              >
                Fonctionnalités
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", featOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {featOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl py-2 overflow-hidden"
                    style={{ border: "1px solid #d4ecea", boxShadow: "0 8px 32px rgba(56,153,170,0.12)" }}
                  >
                    {FEATURES.map((f) => (
                      <Link
                        key={f.href}
                        href={f.href}
                        onClick={() => setFeatOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#475569] hover:text-[#3899aa] hover:bg-[#eef7f6] transition-colors"
                      >
                        <span className="text-base shrink-0">{f.icon}</span>
                        <span className="flex-1">{f.label}</span>
                        {f.badge && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: "#dcfce7", color: "#15803d" }}>
                            {f.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/tarifs" className="px-3 py-2 text-sm font-medium text-[#475569] hover:text-[#3899aa] transition-colors rounded-lg hover:bg-[#eef7f6]">
              Tarifs
            </Link>
            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-[#475569] hover:text-[#3899aa] transition-colors rounded-lg hover:bg-[#eef7f6]">
              Blog
            </Link>
            <Link href="/comparatif-outils-ia-kine" className="px-3 py-2 text-sm font-medium text-[#475569] hover:text-[#3899aa] transition-colors rounded-lg hover:bg-[#eef7f6]">
              Comparatif
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="https://monassistantkine.vercel.app/login"
              className="hidden md:inline-flex px-3 py-2 text-sm font-medium text-[#475569] hover:text-[#3899aa] transition-colors rounded-lg hover:bg-[#eef7f6]"
            >
              Se connecter
            </Link>
            <Link
              href="https://monassistantkine.vercel.app/signup"
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden md:inline-flex bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-medium shadow-sm shadow-[#3899aa]/20 transition-all hover:scale-[1.03]"
              )}
            >
              Créer mon compte
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#eef7f6] hover:text-[#3899aa] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#d4ecea] md:hidden overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest px-3 pb-1">
                Fonctionnalités
              </p>
              {FEATURES.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#475569] hover:text-[#3899aa] hover:bg-[#eef7f6] rounded-xl transition-colors"
                >
                  <span className="text-base shrink-0">{f.icon}</span>
                  <span className="flex-1">{f.label}</span>
                  {f.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: "#dcfce7", color: "#15803d" }}>
                      {f.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="border-t border-[#d4ecea] mt-2 pt-2 space-y-1">
                <Link href="/tarifs" onClick={() => setMobileOpen(false)} className="flex items-center px-3 py-2.5 text-sm font-medium text-[#475569] hover:text-[#3899aa] hover:bg-[#eef7f6] rounded-xl transition-colors">
                  Tarifs
                </Link>
                <Link href="/blog" onClick={() => setMobileOpen(false)} className="flex items-center px-3 py-2.5 text-sm font-medium text-[#475569] hover:text-[#3899aa] hover:bg-[#eef7f6] rounded-xl transition-colors">
                  Blog
                </Link>
                <Link href="/comparatif-outils-ia-kine" onClick={() => setMobileOpen(false)} className="flex items-center px-3 py-2.5 text-sm font-medium text-[#475569] hover:text-[#3899aa] hover:bg-[#eef7f6] rounded-xl transition-colors">
                  Comparatif
                </Link>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="https://monassistantkine.vercel.app/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-3 rounded-xl border border-[#d4ecea] text-[#475569] font-medium text-sm hover:bg-[#eef7f6] transition-all"
                >
                  Se connecter
                </Link>
                <Link
                  href="https://monassistantkine.vercel.app/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-3 rounded-xl bg-[#3899aa] text-white font-semibold text-sm hover:bg-[#2d8a9a] transition-all"
                >
                  Créer mon compte
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
