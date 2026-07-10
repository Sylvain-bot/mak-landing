"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";
import { CTA_SIGNUP_URL, COMPLIANCE_CLAIM } from "@/lib/claims";

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
  // Counting animation only makes sense for large numbers (≥100 distinct steps)
  const shouldCount = target >= 100;
  const count = useCountUp(target, 2000, active && shouldCount);
  const displayed = shouldCount ? count : target;
  const display = frenchFormat ? displayed.toLocaleString("fr-FR") : displayed.toString();
  return (
    <motion.div
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-3xl md:text-4xl font-bold text-[#0f172a] tabular-nums">
        {display}<span className="text-[#3899aa]">{suffix}</span>
      </div>
      <p className="mt-1.5 text-xs text-[#94a3b8] max-w-[150px] mx-auto leading-snug">{label}</p>
    </motion.div>
  );
}

const TRUST = ["Sans carte bancaire", COMPLIANCE_CLAIM, "5 min de prise en main"];

function AppScreenshot() {
  return (
    <div
      className="relative flex justify-center"
      style={{
        WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, black 35%, transparent 75%)",
        maskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, black 35%, transparent 75%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(56,153,170,0.18) 0%, transparent 70%)" }}
      />
      <video
        src="/test-hero4.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ width: "65%" }}
      />
    </div>
  );
}

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true });
  const ph = usePostHog();

  return (
    <section className="relative overflow-hidden bg-white pt-16 sm:pt-24 pb-0 px-4 sm:px-6">
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
                Offre Pionnier — 100 places · Conçu par 2 kinés D.E.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-[#0f172a] mb-5"
            >
              Récupère{" "}
              <span className="bg-gradient-to-r from-[#3899aa] to-[#2a7a8a] bg-clip-text text-transparent">
                45 minutes par jour
              </span>
              <br />
              au cabinet.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base text-[#475569] mb-8 leading-relaxed"
            >
              Bilans NGAP dictés en 3 minutes, courriers en 2 minutes,
              suivi patient sur WhatsApp — et un copilote clinique sourcé
              ({" "}<span className="text-[#0f172a] font-semibold">56 000+ études, Cleland inclus</span>)
              {" "}quand tu as un doute. Un seul outil, conçu par des kinés libéraux.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col gap-3 mb-7 w-full sm:max-w-sm"
            >
              <Link
                href={CTA_SIGNUP_URL}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full justify-center bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-6 text-base gap-2 shadow-lg shadow-[#3899aa]/25 transition-all hover:scale-[1.03] hover:shadow-[#3899aa]/40 whitespace-normal h-auto min-h-[48px] py-3 text-center"
                )}
                onClick={() => ph?.capture("cta_signup_click", { location: "hero" })}
              >
                Tester sur mon prochain bilan — gratuit, sans CB
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#demo"
                className="w-full inline-flex items-center justify-center h-12 px-6 text-base font-medium rounded-lg border border-[#d4ecea] bg-white text-[#3899aa] hover:bg-[#eef7f6] hover:border-[#3899aa]/40 transition-all"
                onClick={() => ph?.capture("cta_demo_click", { location: "hero" })}
              >
                Voir la démo (2 min)
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

          {/* Right — screenshot avec lightbox */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <AppScreenshot />
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
                target={3} suffix=" min" label="Bilan NGAP complet"
                active={inView}
              />
              <StatItem
                target={2} suffix=" min" label="Courrier ou document admin"
                active={inView}
                className="sm:border-l sm:border-[#d4ecea] sm:pl-7"
              />
              <StatItem
                target={4} suffix="h/sem" label="récupérées en moyenne"
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
