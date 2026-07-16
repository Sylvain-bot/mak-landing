"use client";

import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap } from "lucide-react";
import { CTA_SIGNUP_URL, CTA_MAIN, COMPLIANCE_CLAIM } from "@/lib/claims";

export function CtaFinal() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal delay={0.1}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-4 leading-tight">
            Récupère{" "}
            <span className="bg-gradient-to-r from-[#3899aa] to-[#2a7a8a] bg-clip-text text-transparent">
              45 minutes par jour.
            </span>
            <br />
            <span className="text-[#94a3b8]">Dès ton prochain bilan.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-[#475569] text-base mb-8 leading-relaxed">
            14 jours d&apos;essai gratuit. Sans carte bancaire. 5 minutes pour prendre Mon Assistant Kiné en main.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex justify-center">
            <Link
              href={CTA_SIGNUP_URL}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 text-base gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-[#3899aa]/20 whitespace-normal h-auto min-h-[48px] py-3 text-center justify-center"
              )}
            >
              {CTA_MAIN}
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mt-4 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[#64748b]">
            {["14 jours d'essai gratuit", "Sans carte bancaire", "Places limitées aux 100 premiers"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                  {item}
                </span>
              )
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Conçu par deux kinés libéraux D.E.", COMPLIANCE_CLAIM].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#64748b] bg-white"
                style={{ border: "1px solid #d4ecea" }}
              >
                <Shield className="w-3 h-3 text-[#3899aa]" />
                {badge}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
