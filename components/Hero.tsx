"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function useCountUp(target: number, duration: number, active: boolean): number {
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

const TRUST = ["Sans carte bancaire", "HDS · Hébergé en France", "5 min de prise en main"];

function ChatDemo() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid #d4ecea",
        boxShadow: "0 8px 40px rgba(56,153,170,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Chrome bar */}
      <div
        className="px-4 py-2.5 flex items-center gap-2.5"
        style={{ background: "#f4f4f5", borderBottom: "1px solid #e4e4e5" }}
      >
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c941]" />
        </div>
        <div
          className="flex-1 mx-2 rounded-md px-3 py-1 text-xs text-[#3899aa] font-medium truncate"
          style={{ background: "white", border: "1px solid #e4e4e5" }}
        >
          app.monassistantkine.fr — Copilote clinique
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-600 font-semibold">Live</span>
        </div>
      </div>

      {/* Chat content */}
      <div className="p-5 flex flex-col gap-4 bg-white">
        {/* User question */}
        <div className="flex justify-end">
          <div
            className="max-w-[88%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
            style={{ background: "#0f172a", color: "white" }}
          >
            &ldquo;Doute sur une prise en charge cervicale — patient avec ATCD hernie C5-C6 2019, EVA 6. Dois-je orienter ?&rdquo;
          </div>
        </div>

        {/* AI answer */}
        <div
          className="rounded-2xl rounded-tl-sm p-4"
          style={{ background: "#f0f9fa", border: "1px solid #d4ecea" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
              Orientation clinique
            </span>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "#eef7f6", border: "1px solid #d4ecea", color: "#3899aa" }}
            >
              30 sec
            </span>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2 text-xs font-semibold" style={{ color: "#ef4444" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              ATCD hernie C5-C6 — à réévaluer avant mobilisation forcée
            </div>
            <div className="flex items-start gap-2 text-xs text-[#475569]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] mt-1.5 shrink-0" />
              3 tests cliniques suggérés pour objectiver la radiculopathie
            </div>
            <div className="flex items-start gap-2 text-xs text-[#475569]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] mt-1.5 shrink-0" />
              Orientation médicale recommandée si aggravation sous 2 séances
            </div>
          </div>
          <div
            className="mt-3 pt-3 flex items-center gap-1.5 text-xs text-[#64748b]"
            style={{ borderTop: "1px dashed #d4ecea" }}
          >
            Basé sur{" "}
            <span className="font-semibold text-[#3899aa]">56 000+ sources EBP</span>
            {" "}— dont Cleland, 4<sup>e</sup> éd.
          </div>
        </div>
      </div>

      <div
        className="px-5 py-3 text-center text-xs text-[#94a3b8]"
        style={{ background: "#f8fafc", borderTop: "1px solid #d4ecea" }}
      >
        D&apos;un doute clinique à une orientation structurée en{" "}
        <strong className="text-[#0f172a]">30 secondes</strong>, sources incluses.
      </div>
    </div>
  );
}

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true });

  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-0 px-4 sm:px-6">
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
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 20%, rgba(56,153,170,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* 2-column hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-10">

          {/* Left — text */}
          <div>
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
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-[#0f172a] mb-5"
            >
              Pose ta question<br />comme à un confrère.<br />
              <span className="bg-gradient-to-r from-[#3899aa] to-[#2a7a8a] bg-clip-text text-transparent">
                Réponse sourcée en 30 secondes.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base text-[#475569] mb-8 leading-relaxed"
            >
              Doute clinique, question bibliographique, drapeau rouge à vérifier — MAK mobilise{" "}
              <span className="text-[#0f172a] font-semibold">56 000+ ressources dont le Cleland</span>{" "}
              et te donne une orientation actionnable, pas un pavé à trier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-3 mb-7"
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
                href="#comment"
                className="inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-lg border border-[#d4ecea] bg-white text-[#3899aa] hover:bg-[#eef7f6] hover:border-[#3899aa]/40 transition-all"
              >
                Voir comment ça marche
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {TRUST.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-[#64748b]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — chat demo */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChatDemo />
          </motion.div>
        </div>

        {/* Stats card */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="pb-16"
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
