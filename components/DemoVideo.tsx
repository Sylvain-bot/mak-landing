"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ExternalLink, Play } from "lucide-react";
import Link from "next/link";

export function DemoVideo() {
  const videoRef = useRef<HTMLDivElement>(null);
  const inView = useInView(videoRef, { once: true });

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: "#0d1424", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Aurora orbs */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,153,170,0.12) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,153,170,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[#5bc4d6] text-sm font-semibold mb-6"
            style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}
          >
            <Play className="w-3.5 h-3.5 fill-[#5bc4d6]" />
            Démo live
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Vois MAK en action en 3 minutes
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            De la question clinique au bilan complet — découvre comment des kinés
            gagnent 2h par semaine dès le premier jour.
          </p>
        </ScrollReveal>

        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8"
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              paddingBottom: "56.25%",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/NQh0eORWvkc?rel=0&modestbranding=1"
              title="Mon Assistant Kiné — Démo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>

        <ScrollReveal delay={0.3}>
          <Link
            href="https://www.monassistantkine.fr/replay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-medium underline underline-offset-4 decoration-white/20 hover:decoration-white/50 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le replay complet sur monassistantkine.fr
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
