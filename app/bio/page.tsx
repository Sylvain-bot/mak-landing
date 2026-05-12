"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLS = [
  { icon: "📋", label: "Bilan" },
  { icon: "📁", label: "Admin" },
  { icon: "🔬", label: "Recherche" },
  { icon: "🩺", label: "Aide clinique" },
  { icon: "📈", label: "Suivi patient" },
];

const FOOTER_LINKS = [
  { label: "CGU", href: "https://monassistantkine.vercel.app/legal/cgu" },
  {
    label: "Politique de confidentialité",
    href: "https://monassistantkine.vercel.app/legal/privacy",
  },
  {
    label: "Mentions légales",
    href: "https://monassistantkine.vercel.app/legal/mentions",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BioPage() {
  const videoRef = useRef<HTMLDivElement>(null);
  const videoInView = useInView(videoRef, { once: true });

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(56,153,170,0.12) 0%, transparent 100%)",
        }}
      />

      {/* ── Header ── */}
      <header className="relative z-10 pt-10 pb-6 flex flex-col items-center gap-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/logo-mak.webp"
            alt="Mon Assistant Kiné"
            width={150}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/35 bg-primary/10 text-primary text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Accès gratuit · Sans carte bancaire
          </span>
        </motion.div>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-6 pb-10">
        <div className="max-w-2xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-4"
          >
            Gagne{" "}
            <span className="bg-gradient-to-r from-[#3899aa] to-[#72d6e6] bg-clip-text text-transparent">
              2h par semaine
            </span>{" "}
            au cabinet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
            className="text-lg sm:text-xl text-white/50 mb-9"
          >
            Soigne.{" "}
            <span className="text-white/78">
              Mon Assistant Kiné s&apos;occupe du reste.
            </span>
          </motion.p>

          {/* Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {PILLS.map((pill, i) => (
              <motion.span
                key={pill.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.42 + i * 0.08, ease: "easeOut" }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-sm text-white/60 font-medium"
              >
                <span>{pill.icon}</span>
                {pill.label}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video ── */}
      <section className="relative z-10 px-4 sm:px-6 pb-10 flex justify-center">
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={videoInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          <div
            className="relative rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{
              paddingBottom: "56.25%",
              boxShadow:
                "0 0 60px rgba(56,153,170,0.1), 0 25px 60px rgba(0,0,0,0.55)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/NQh0eORWvkc?rel=0&modestbranding=1"
              title="Mon Assistant Kiné — Présentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-4 sm:px-6 pb-14 flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
          className="flex flex-col items-center gap-3"
        >
          <Link
            href="https://monassistantkine.vercel.app/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-primary hover:bg-primary/90 text-white font-semibold px-10 h-14 text-base gap-2 transition-all hover:scale-[1.02] inline-flex items-center"
            )}
            style={{ boxShadow: "0 0 45px rgba(56,153,170,0.35)" }}
          >
            Créer mon compte gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-sm text-white/32">
            Sans carte bancaire · Accès immédiat
          </p>

          <Link
            href="https://monassistantkine.vercel.app/login"
            className="text-sm text-white/32 hover:text-white/55 transition-colors underline underline-offset-4 decoration-white/20"
          >
            Déjà un compte ? Se connecter
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 mt-auto py-6 px-4 border-t border-white/[0.05]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-white/25">
          <span>© 2026 Mon Assistant Kiné</span>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-white/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
