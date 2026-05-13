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
      className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[#3899aa] text-sm font-semibold mb-5"
            style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
          >
            <Play className="w-3.5 h-3.5 fill-[#3899aa]" />
            Démo live
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Vois Mon Assistant Kiné en action en 3 minutes
          </h2>
          <p className="text-[#475569] text-base mb-9 max-w-2xl mx-auto">
            De la question clinique au bilan complet — découvre comment des kinés
            gagnent 2h par semaine dès le premier jour.
          </p>
        </ScrollReveal>

        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-7"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              paddingBottom: "56.25%",
              border: "1px solid #d4ecea",
              boxShadow: "0 8px 40px rgba(56,153,170,0.1), 0 2px 8px rgba(0,0,0,0.06)",
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
            className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-[#3899aa] text-sm font-medium underline underline-offset-4 decoration-[#d4ecea] hover:decoration-[#3899aa]/40 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Voir le replay complet sur monassistantkine.fr
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
