"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// ─── Counter hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTs: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function StatItem({
  target, suffix, label, frenchFormat, active, className,
}: {
  target: number; suffix: string; label: string;
  frenchFormat?: boolean; active: boolean; className?: string;
}) {
  const count = useCountUp(target, 2000, active);
  const display = frenchFormat ? count.toLocaleString("fr-FR") : count.toString();
  return (
    <div className={cn("text-center", className)}>
      <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">
        {display}<span className="text-[#5bc4d6]">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-white/40 max-w-[150px] mx-auto leading-snug">{label}</p>
    </div>
  );
}

// ─── Floating badge ───────────────────────────────────────────────────────────

function FloatingBadge({
  delay, floatY = 10, floatDuration = 5, className, children,
}: {
  delay: number; floatY?: number; floatDuration?: number;
  className?: string; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: [0, -floatY, 0] }}
      transition={{
        opacity: { delay, duration: 0.5, ease: "easeOut" },
        scale:   { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        y: {
          delay: delay + 0.6,
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        },
      }}
      className={cn(
        "flex items-center gap-2 rounded-2xl px-3.5 py-2.5 z-20 backdrop-blur-md",
        className
      )}
      style={{
        background: "rgba(13,20,36,0.82)",
        border: "1px solid rgba(56,153,170,0.35)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const TRUST = ["Sans carte bancaire", "Accès immédiat", "5 min de prise en main"];

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true });

  return (
    <section className="relative overflow-hidden bg-[#080f1a] pt-24 pb-0 px-4 sm:px-6">
      <style>{`
        @keyframes hero-zoom {
          0%, 100% { transform: scale(1);     transform-origin: 58% 42%; }
          40%       { transform: scale(1.14); transform-origin: 58% 42%; }
          60%       { transform: scale(1.14); transform-origin: 58% 42%; }
        }
        .hero-gif { animation: hero-zoom 14s ease-in-out infinite; }

        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(40px, -30px) scale(1.1); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-30px, 40px) scale(1.08); }
        }
        .aurora-1 { animation: aurora-1 12s ease-in-out infinite; }
        .aurora-2 { animation: aurora-2 15s ease-in-out infinite; }
      `}</style>

      {/* ── Background layers ── */}

      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(56,153,170,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      {/* Aurora — teal, top centre */}
      <div
        aria-hidden
        className="aurora-1 absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 20%, rgba(56,153,170,0.22) 0%, transparent 70%)",
          filter: "blur(1px)",
        }}
      />
      {/* Aurora — purple, top right */}
      <div
        aria-hidden
        className="aurora-2 absolute -top-20 -right-40 w-[700px] h-[600px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      {/* Aurora — bottom left */}
      <div
        aria-hidden
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(56,153,170,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Centered text ── */}
        <div className="text-center max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3899aa]/30 bg-[#3899aa]/10 text-[#5bc4d6] text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5bc4d6] animate-pulse" />
              Offre fondateurs — 100 premières inscriptions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] text-white mb-6"
          >
            Tes bilans en{" "}
            <span className="bg-gradient-to-r from-[#3899aa] via-[#5bc4d6] to-[#3899aa] bg-clip-text text-transparent">
              3 minutes.
            </span>
            <br />
            Tes drapeaux rouges{" "}
            <span className="bg-gradient-to-r from-[#5bc4d6] to-[#3899aa] bg-clip-text text-transparent">
              détectés.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-white/55 mb-9 leading-relaxed"
          >
            Mon Assistant Kiné assiste ton raisonnement clinique, génère tes bilans
            et accompagne tes patients —{" "}
            <span className="text-white/90 font-semibold">
              conçu par des kinés, pour des kinés.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-7"
          >
            <Link
              href="https://monassistantkine.vercel.app/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 text-base gap-2 shadow-xl shadow-[#3899aa]/40 transition-all hover:scale-[1.03] hover:shadow-[#3899aa]/60"
              )}
            >
              Créer mon compte gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.monassistantkine.fr/replay"
              className="inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-lg border border-white/12 bg-white/6 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all gap-2 backdrop-blur-sm"
            >
              Voir la démo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-x-5 gap-y-2 justify-center"
          >
            {TRUST.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-white/45">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Browser mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 52, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-14 max-w-5xl mx-auto"
        >
          {/* Diffuse glow beneath window */}
          <div
            aria-hidden
            className="absolute -inset-2 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,153,170,0.25) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          {/* Gradient border wrapper */}
          <div
            className="rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, rgba(56,153,170,0.7) 0%, rgba(56,153,170,0.15) 40%, rgba(56,153,170,0.05) 100%)",
            }}
          >
            <div className="rounded-[15px] overflow-hidden bg-[#0d1424]">

              {/* Chrome bar — dark */}
              <div
                className="px-4 py-3 flex items-center gap-2.5"
                style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div
                  className="flex-1 mx-3 rounded-md px-4 py-1.5 text-sm text-white/35 truncate"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  app.monassistantkine.fr
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400/80 font-semibold">Live</span>
                </div>
              </div>

              {/* GIF with slow zoom into modal area */}
              <div className="overflow-hidden w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/gif%20hero.gif"
                  alt="Recherche bibliographique IA — Mon Assistant Kiné"
                  className="w-full h-auto block hero-gif"
                />
              </div>
            </div>
          </div>

          {/* Badge — top right */}
          <FloatingBadge delay={1.1} floatY={8} floatDuration={4.8} className="absolute -top-5 right-4 sm:right-0 sm:-translate-x-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-white whitespace-nowrap">56 000+ études intégrées</span>
          </FloatingBadge>

          {/* Badge — right side, middle-upper */}
          <FloatingBadge delay={1.3} floatY={12} floatDuration={5.6} className="absolute top-[22%] -right-3 sm:-right-12">
            <span className="text-sm">🔬</span>
            <span className="text-xs font-semibold text-white whitespace-nowrap">Sources vérifiables</span>
          </FloatingBadge>

          {/* Badge — right side, middle-lower */}
          <FloatingBadge delay={1.6} floatY={9} floatDuration={6.2} className="absolute top-[52%] -right-3 sm:-right-14">
            <span className="text-sm">📈</span>
            <div>
              <p className="text-[10px] text-white/40 leading-none mb-0.5">Base de données</p>
              <p className="text-xs font-semibold text-white">enrichie en continu</p>
            </div>
          </FloatingBadge>

          {/* Badge — left side, middle */}
          <FloatingBadge delay={1.4} floatY={11} floatDuration={5.1} className="absolute top-[35%] -left-3 sm:-left-14">
            <span className="text-sm">📚</span>
            <div>
              <p className="text-[10px] text-white/40 leading-none mb-0.5">Recherche biblio</p>
              <p className="text-xs font-bold text-[#5bc4d6]">PubMed · Cleland · Guidelines</p>
            </div>
          </FloatingBadge>

          {/* Badge — bottom left */}
          <FloatingBadge delay={1.8} floatY={7} floatDuration={4.5} className="absolute -bottom-5 left-4 sm:left-0 sm:translate-x-8">
            <span className="text-base">⚡</span>
            <div>
              <p className="text-[10px] text-white/40 leading-none">Résultat en</p>
              <p className="text-xs font-bold text-[#5bc4d6]">30 sec chrono</p>
            </div>
          </FloatingBadge>
        </motion.div>

        {/* ── Stats card ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="mt-14 pb-16"
        >
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <StatItem
                target={56000} suffix="+" label="études scientifiques intégrées"
                frenchFormat active={inView}
              />
              <StatItem
                target={3} suffix=" min" label="pour un bilan complet"
                active={inView}
                className="sm:border-l sm:border-white/10 sm:pl-8"
              />
              <StatItem
                target={5} suffix=" min" label="pour prendre l'app en main"
                active={inView}
                className="sm:border-l sm:border-white/10 sm:pl-8"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
