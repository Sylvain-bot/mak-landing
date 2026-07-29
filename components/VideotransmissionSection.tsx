"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { CTA_SIGNUP_URL } from "@/lib/claims";

const POINTS = [
  {
    icon: "📹",
    title: "Consultation vidéo sécurisée",
    body: "Suivi post-opératoire, bilan initial à domicile, renouvellement d'ordonnance — directement depuis Mon Assistant Kiné, sans installation côté patient.",
  },
  {
    icon: "📋",
    title: "Bilan et compte-rendu en 1 clic",
    body: "Le compte-rendu de téléconsultation est généré automatiquement à l'issue de la session. Export PDF, envoi au médecin référent.",
  },
  {
    icon: "★",
    title: "Rend éligible à l'aide FAMI · 350 €/an",
    body: "S'équiper d'une solution de vidéotransmission sécurisée est l'un des critères FAMI. Avec ce module, ta CPAM peut te verser jusqu'à 350 €/an.",
    gold: true,
  },
];

export function VideotransmissionSection() {
  return (
    <section
      id="videotransmission"
      className="py-20 sm:py-24 px-4 sm:px-6"
      style={{ background: "white", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — texte */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold"
              style={{ background: "#fef9ec", border: "1px solid #f0d080", color: "#92680a" }}>
              <span>★</span>
              <span>Nouveau · Module Vidéotransmission</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-4">
              Consultations à distance,{" "}
              <span className="text-[#3899aa]">intégrées à ton cabinet.</span>
            </h2>

            <p className="text-[#475569] leading-relaxed mb-8">
              Suivi post-opératoire, bilan initial à domicile, téléconsultation de renouvellement —
              le module vidéotransmission de Mon Assistant Kiné est conçu pour les kinés libéraux.
              Sécurisé, simple pour le patient, et{" "}
              <strong className="text-[#0f172a]">éligible à l&apos;aide FAMI de ta CPAM</strong>.
            </p>

            <ul className="space-y-5 mb-8">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-4 items-start">
                  <span
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold"
                    style={p.gold
                      ? { background: "#fef9ec", border: "1px solid #f0d080", color: "#92680a" }
                      : { background: "#eef7f6", border: "1px solid #d4ecea", color: "#3899aa" }
                    }
                  >
                    {p.icon}
                  </span>
                  <div>
                    <p
                      className="font-semibold text-sm mb-0.5"
                      style={{ color: p.gold ? "#92680a" : "#0f172a" }}
                    >
                      {p.title}
                    </p>
                    <p className="text-sm text-[#64748b] leading-relaxed">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/fonctionnalites/videotransmission"
                className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-lg text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: "#3899aa", boxShadow: "0 4px 16px rgba(56,153,170,0.25)" }}
              >
                Découvrir le module <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={CTA_SIGNUP_URL}
                className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-lg text-sm font-semibold transition-all hover:bg-[#eef7f6]"
                style={{ border: "1px solid #d4ecea", color: "#3899aa" }}
              >
                Essayer 14 jours — gratuit
              </Link>
            </div>
          </ScrollReveal>

          {/* Right — screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #d4ecea", boxShadow: "0 8px 40px rgba(56,153,170,0.1)" }}
            >
              <Image
                src="/videotransmission-kine.png"
                alt="Module vidéotransmission sécurisée de Mon Assistant Kiné — consultation kinésithérapie à distance"
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>

            {/* Badge FAMI sous l'image */}
            <div
              className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ background: "#0f2229", border: "1px solid rgba(232,176,77,0.3)" }}
            >
              <span className="text-lg shrink-0">★</span>
              <div>
                <p className="text-xs font-bold" style={{ color: "#e8b04d" }}>
                  Ce module rend éligible à l&apos;aide FAMI
                </p>
                <p className="text-xs text-white/60">
                  Ta CPAM peut te verser jusqu&apos;à 350 €/an — sans avance de frais.{" "}
                  <a href="#fami-section" className="underline hover:opacity-90" style={{ color: "#e8b04d" }}>
                    Comment ça marche →
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
