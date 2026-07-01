"use client";

import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

export function CtaFinal() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal delay={0.1}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-4 leading-tight">
            La prochaine fois que tu as un doute,{" "}
            <span className="bg-gradient-to-r from-[#3899aa] to-[#2a7a8a] bg-clip-text text-transparent">
              tu auras une réponse.
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-[#475569] text-base mb-8 leading-relaxed">
            Accès immédiat. Sans carte bancaire. 5 minutes pour prendre MAK en main.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link
            href="https://monassistantkine.vercel.app/signup"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-10 h-12 text-base gap-2 transition-all hover:scale-[1.02] inline-flex items-center shadow-lg shadow-[#3899aa]/20"
            )}
          >
            Créer mon compte gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mt-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[#64748b]">
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
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Conçu par deux kinés libéraux", "RGPD", "HDS · Hébergé en France"].map((badge) => (
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
