"use client";

import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap } from "lucide-react";

const TRUST = [
  "Conçu par deux kinés libéraux",
  "Données chiffrées",
  "RGPD",
  "HDS",
];

export function CtaFinal() {
  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#080f1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(56,153,170,0.18) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 30% 0%, rgba(56,153,170,0.07) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <ScrollReveal className="mb-7">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[#5bc4d6] text-sm font-medium"
            style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Tarif pionnier — Réservé aux 100 premiers inscrits
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Ton prochain bilan en{" "}
            <span style={{ background: "linear-gradient(135deg, #5bc4d6 0%, #3899aa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              3 minutes.
            </span>
            <br />
            Ton premier drapeau rouge{" "}
            <span className="text-white/40">détecté dès ce soir.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-white/50 text-lg mb-9">
            Accès immédiat. Sans carte bancaire. Prise en main en 5 minutes.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link
            href="https://monassistantkine.vercel.app/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-10 h-14 text-base gap-2 transition-all hover:scale-[1.02] inline-flex items-center shadow-lg shadow-[#3899aa]/30"
            )}
          >
            Créer mon compte gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mt-5 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/40">
            {["Sans engagement", "Sans carte bancaire", "Places limitées aux 100 premiers"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                  {item}
                </span>
              )
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/40"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Shield className="w-3 h-3 text-[#5bc4d6]" />
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
