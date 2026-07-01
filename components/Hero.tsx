"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function useCountUp(target: number, duration: number, active: boolean): number {
  // Démarre à la valeur finale : le HTML SSR et le premier rendu client
  // affichent toujours le chiffre réel (vu par Google et sans JS).
  // L'animation 0 → target ne se déclenche qu'après montage, côté client.
  const [count, setCount] = useState(target);
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (!active || hasAnimated.current) return;
    hasAnimated.current = true;
    setCount(0);
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
      <div className="text-3xl md:text-4xl font-bold text-[#0f172a] tabular-nums">
        {display}<span className="text-[#3899aa]">{suffix}</span>
      </div>
      <p className="mt-1.5 text-xs text-[#94a3b8] max-w-[150px] mx-auto leading-snug">{label}</p>
    </div>
  );
}

const TRUST = ["Sans carte bancaire", "Accès immédiat", "5 min de prise en main"];

// GIF = 9.6s, 7 bulles → 1 bulle toutes les 1.37s
// Toutes restent visibles jusqu'à la fin du cycle, puis reset ensemble
const GIF_MS = 9600;
const BUBBLES = [
  { icon: "🎙️", label: "Dicte ou écris tes notes",            pos: "top-[35%] -left-3 sm:-left-14" },
  { icon: "⚡",  label: "Généré en quelques secondes",          pos: "-top-5 right-4 sm:right-0 sm:-translate-x-8" },
  { icon: "✅",  label: "Conforme NGAP",                        pos: "top-[22%] -right-3 sm:-right-12" },
  { icon: "🎨",  label: "Templates entièrement personnalisables", pos: "top-[52%] -right-3 sm:-right-16", twoLine: true },
  { icon: "📄",  label: "Export PDF en un clic",                pos: "-bottom-5 left-4 sm:left-0 sm:translate-x-8" },
  { icon: "📚",  label: "56 000+ ressources dont Cleland",      pos: "top-[65%] -left-3 sm:-left-14", twoLine: true },
  { icon: "🚩",  label: "Détection des red flags",              pos: "-top-5 left-4 sm:left-0 sm:translate-x-8" },
];

const BADGE_STYLE = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(56,153,170,0.2)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
  backdropFilter: "blur(8px)",
};

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true });

  // Bulles : apparaissent une par une et restent, puis reset ensemble avec le GIF
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const SLOT = GIF_MS / BUBBLES.length; // ~1371ms
    const PAUSE = 450; // pause avant le redémarrage
    let timers: ReturnType<typeof setTimeout>[] = [];

    function cycle() {
      timers.forEach(clearTimeout);
      timers = [];
      BUBBLES.forEach((_, i) => {
        timers.push(setTimeout(() => setVisible(i + 1), i * SLOT));
      });
      timers.push(setTimeout(() => {
        setVisible(0);
        timers.push(setTimeout(cycle, PAUSE));
      }, GIF_MS));
    }

    const init = setTimeout(cycle, 900); // attendre que le hero soit visible
    return () => { clearTimeout(init); timers.forEach(clearTimeout); };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-0 px-4 sm:px-6">
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

      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(56,153,170,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      {/* Aurora — very light teal */}
      <div
        aria-hidden
        className="aurora-1 absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 20%, rgba(56,153,170,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="aurora-2 absolute -top-20 -right-40 w-[700px] h-[600px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 30%, rgba(56,153,170,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Centered text */}
        <div className="text-center max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4ecea] bg-[#eef7f6] text-[#3899aa] text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] animate-pulse" />
              Offre Pionnier — Pour les 100 premiers · Lancé le 22/04/2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#0f172a] mb-4"
          >
            L&apos;assistant IA des kinésithérapeutes —
            <br />
            <span className="bg-gradient-to-r from-[#3899aa] to-[#2a7a8a] bg-clip-text text-transparent">
              Bilans en 3 minutes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-sm text-[#64748b] mb-5 leading-relaxed max-w-2xl mx-auto"
          >
            Mon Assistant Kiné est un assistant IA conçu exclusivement pour les kinésithérapeutes
            libéraux. Il génère des bilans cliniques en 3 minutes, détecte les drapeaux rouges en
            temps réel et donne accès à plus de 56 000 ressources scientifiques validées, dont le
            Cleland. Développé par deux kinésithérapeutes praticiens.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg text-[#475569] mb-8 leading-relaxed"
          >
            Mon Assistant Kiné assiste ton raisonnement clinique, génère tes bilans
            et accompagne tes patients —{" "}
            <span className="text-[#0f172a] font-semibold">
              conçu par des kinés, pour des kinés.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          >
            <Link
              href="https://monassistantkine.vercel.app/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 text-base gap-2 shadow-lg shadow-[#3899aa]/25 transition-all hover:scale-[1.03] hover:shadow-[#3899aa]/40"
              )}
            >
              Créer mon compte gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-lg border border-[#d4ecea] bg-white text-[#3899aa] hover:bg-[#eef7f6] hover:border-[#3899aa]/40 transition-all gap-2"
            >
              Voir la démo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-x-5 gap-y-2 justify-center"
          >
            {TRUST.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-[#64748b]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Pionnier offer bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-7 w-full max-w-md mx-auto rounded-2xl px-5 py-4"
            style={{ background: "#f0f9fa", border: "1px solid #d4ecea" }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0f172a]">Offre Pionnier</span>
                <span className="text-xs text-[#94a3b8] font-medium">· lancé le 22/04/2026</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#3899aa]">19€</span>
                <span className="text-xs text-[#94a3b8] line-through ml-1.5">49€</span>
                <span className="text-xs text-[#64748b]">/mois</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#64748b]">Pour les <strong className="text-[#0f172a]">100 premiers</strong> inscrits</span>
              <span className="text-xs text-[#3899aa] font-semibold">Tarif garanti à vie →</span>
            </div>
          </motion.div>
        </div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 52, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-14 max-w-5xl mx-auto"
        >
          {/* Subtle glow */}
          <div
            aria-hidden
            className="absolute -inset-2 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,153,170,0.12) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          {/* Gradient border wrapper */}
          <div
            className="rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, #3899aa 0%, rgba(56,153,170,0.3) 50%, rgba(56,153,170,0.1) 100%)",
            }}
          >
            <div className="rounded-[15px] overflow-hidden bg-white">

              {/* Chrome bar — light */}
              <div
                className="px-4 py-3 flex items-center gap-2.5"
                style={{ background: "#f4f4f5", borderBottom: "1px solid #e4e4e5" }}
              >
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c941]" />
                </div>
                <div
                  className="flex-1 mx-3 rounded-md px-4 py-1.5 text-sm text-[#3899aa] font-medium truncate"
                  style={{ background: "white", border: "1px solid #e4e4e5" }}
                >
                  app.monassistantkine.fr
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-600 font-semibold">Live</span>
                </div>
              </div>

              {/* GIF */}
              <div className="overflow-hidden w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bilan-kine-ia-3-minutes.gif"
                  alt="Génération de bilan en 3 minutes — Mon Assistant Kiné"
                  className="w-full h-auto block hero-gif"
                />
              </div>
            </div>
          </div>

          {/* Bulles — restent en place une fois apparues, reset ensemble avec le GIF */}
          {BUBBLES.map((b, i) => (
            <motion.div
              key={b.label}
              animate={{
                opacity: i < visible ? 1 : 0,
                scale:   i < visible ? 1 : 0.82,
                y:       i < visible ? 0 : 8,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute flex items-center gap-2 rounded-2xl px-3.5 py-2.5 z-20 pointer-events-none",
                b.pos
              )}
              style={BADGE_STYLE}
            >
              <span className="text-sm shrink-0">{b.icon}</span>
              {b.twoLine ? (
                <div>
                  <p className="text-[10px] text-[#94a3b8] leading-none mb-0.5">
                    {b.label.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="text-xs font-semibold text-[#0f172a]">
                    {b.label.split(" ").slice(2).join(" ")}
                  </p>
                </div>
              ) : (
                <span className="text-xs font-semibold text-[#0f172a] whitespace-nowrap">{b.label}</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats card */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="mt-14 pb-16"
        >
          <div
            className="rounded-2xl p-7 sm:p-9"
            style={{ background: "#f0f9fa", border: "1px solid #d4ecea" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
              <StatItem
                target={56000} suffix="+" label="études scientifiques intégrées"
                frenchFormat active={inView}
              />
              <StatItem
                target={3} suffix=" min" label="pour un bilan complet"
                active={inView}
                className="sm:border-l sm:border-[#d4ecea] sm:pl-7"
              />
              <StatItem
                target={5} suffix=" min" label="pour prendre l'app en main"
                active={inView}
                className="sm:border-l sm:border-[#d4ecea] sm:pl-7"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
