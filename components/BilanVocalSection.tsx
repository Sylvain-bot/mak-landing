"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA_SIGNUP_URL } from "@/lib/claims";

const RAW_TEXT =
  "le patient présente une gonalgie droite apparue lors d'un faux mouvement en pivot · douleur mécanique · EVA à 6/10 · aggravée à l'accroupissement et dans les escaliers · épanchement rotulien · j'note que le McMurray est positif côté médial · le Lachman est négatif · le tiroir antérieur aussi · appui monopodal 15 secondes · squat douloureux · ";

const FORMATTED_TEXT =
  "Gonalgie mécanique droite · EVA 6/10 (7/10 à J0) · Épanchement rotulien positif · McMurray+ médial · Lachman– · Déficit fonctionnel objectivé · Suspicion lésion méniscale médiale · ";

const WAVEFORM_HEIGHTS = [10, 22, 16, 30, 14, 26, 8, 20, 28, 12, 24, 18, 30, 10, 22];

function WaveformPill() {
  return (
    <div
      className="relative z-20 flex items-center gap-[3px] px-5 py-3 rounded-full"
      style={{
        background: "white",
        border: "2px solid #3899aa",
        boxShadow: "0 4px 30px rgba(56,153,170,0.35), 0 0 0 6px rgba(56,153,170,0.08)",
      }}
    >
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <div
          key={i}
          style={{
            width: "3px",
            borderRadius: "2px",
            background: "#3899aa",
            height: `${h}px`,
            animation: `bilan-wave ${0.5 + i * 0.06}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.04}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bilan-wave {
          from { transform: scaleY(0.3); opacity: 0.5; }
          to   { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function EncoderStrip() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ height: "88px", border: "1px solid rgba(56,153,170,0.2)" }}
    >
      {/* Left half — raw speech scrolls LEFT (enters encoder) */}
      <div
        className="absolute inset-y-0 left-0"
        style={{ width: "50%", background: "#f8fafc", overflow: "hidden" }}
      >
        <div
          className="flex items-center h-full"
          style={{
            whiteSpace: "nowrap",
            animation: "bilan-scroll-right 2s linear infinite",
            willChange: "transform",
          }}
        >
          <span className="text-[13px] text-[#94a3b8] pr-8">
            {RAW_TEXT}{RAW_TEXT}{RAW_TEXT}
          </span>
        </div>
        {/* Fade right edge toward center */}
        <div
          className="absolute inset-y-0 right-0 w-16 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, #f8fafc)" }}
        />
      </div>

      {/* Right half — formatted text scrolls RIGHT (exits encoder) */}
      <div
        className="absolute inset-y-0 right-0"
        style={{ width: "50%", background: "#3899aa", overflow: "hidden" }}
      >
        {/* Fade left edge from center */}
        <div
          className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #3899aa, transparent)" }}
        />
        <div
          className="flex items-center h-full"
          style={{
            whiteSpace: "nowrap",
            animation: "bilan-scroll-right 5s linear infinite",
            willChange: "transform",
          }}
        >
          <span className="text-[13px] font-semibold text-white pr-8">
            {FORMATTED_TEXT}{FORMATTED_TEXT}{FORMATTED_TEXT}
          </span>
        </div>
      </div>

      {/* Center: waveform encoder pill */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <WaveformPill />
      </div>

      <style>{`
        @keyframes bilan-scroll-right {
          from { transform: translateX(-33.33%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Tu lances l'enregistrement",
    desc: "En un tap, ta séance entière est captée — tu te concentres sur ton patient, pas sur tes notes",
  },
  {
    n: "02",
    title: "Transcription et structuration NGAP automatiques",
    desc: "Anamnèse, examen clinique, diagnostic kiné, objectifs, traitement — tout structuré en quelques secondes",
  },
  {
    n: "03",
    title: "Tu exportes le PDF en 1 clic",
    desc: "Bilan complet, daté et signable — prêt à archiver dans le dossier patient ou à transmettre",
  },
];

export function BilanVocalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#0f172a", borderTop: "1px solid rgba(56,153,170,0.15)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(56,153,170,0.15)",
                color: "#3899aa",
                border: "1px solid rgba(56,153,170,0.4)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] animate-pulse" />
              NOUVEAU · Module Bilans
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Enregistre ta séance.{" "}
            <span style={{ color: "#3899aa" }}>
              Ton bilan NGAP est prêt en quelques secondes.
            </span>
          </h2>
          <p className="text-white/55 text-base max-w-2xl leading-relaxed">
            Plus besoin de tout noter. Tu lances l'enregistrement, tu te concentres sur ton patient.
            Mon Assistant Kiné retranscrit et structure un bilan clinique complet, conforme NGAP — prêt à exporter en PDF.
          </p>
        </motion.div>

        {/* Encoder animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex justify-between text-[11px] font-mono mb-2 px-1">
            <span className="text-[#64748b]">Ce que tu dis</span>
            <span style={{ color: "#3899aa" }}>Ce que ça génère</span>
          </div>
          <EncoderStrip />
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: phone mockup avec vidéo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="flex justify-center lg:justify-start"
          >
            {/* Composition : PDFs au premier plan + téléphone petit en bas */}
            <div className="relative w-full" style={{ aspectRatio: "1 / 1.2" }}>

              {/* PDF 2 — derrière, décalé à droite, qui dépasse */}
              <div
                className="absolute rounded-lg overflow-hidden"
                style={{
                  width: "52%",
                  bottom: "8%",
                  left: "30%",
                  transform: "rotate(6deg)",
                  transformOrigin: "bottom center",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  zIndex: 1,
                  opacity: 0.85,
                }}
              >
                <Image src="/pdffinal2.png" alt="Bilan NGAP page 2" width={440} height={622} className="w-full block" />
              </div>

              {/* PDF 1 — au premier plan, légèrement incliné à gauche */}
              <div
                className="absolute rounded-lg overflow-hidden"
                style={{
                  width: "58%",
                  bottom: "8%",
                  left: "8%",
                  transform: "rotate(-3deg)",
                  transformOrigin: "bottom center",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 20px 56px rgba(0,0,0,0.65)",
                  zIndex: 2,
                }}
              >
                <Image src="/pdffinal1.png" alt="Bilan NGAP page 1" width={440} height={622} className="w-full block" />
              </div>

              {/* Téléphone — petit, centré en bas */}
              <div className="absolute" style={{ zIndex: 3, left: "50%", transform: "translateX(-50%)", bottom: 0, width: "26%" }}>
                <div
                  className="relative rounded-[1.8rem] p-[4px]"
                  style={{
                    background: "#1e293b",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="rounded-[1.4rem] overflow-hidden" style={{ background: "#fff" }}>
                    <video
                      src="/bongifbilan.mp4"
                      autoPlay
                      muted
                      playsInline
                      loop
                      preload="auto"
                      style={{ width: "100%", display: "block", mixBlendMode: "multiply" }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right: steps + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-start gap-3">
                  <span className="text-xs font-bold font-mono shrink-0 mt-0.5" style={{ color: "#3899aa" }}>{s.n}</span>
                  <div>
                    <p className="text-sm font-semibold text-white leading-snug">{s.title}</p>
                    <p className="text-xs text-white/45 leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={CTA_SIGNUP_URL}
              className="inline-flex items-center gap-1.5 px-5 h-11 rounded-xl text-sm font-bold text-white w-fit transition-all hover:brightness-110 mt-2"
              style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
            >
              Essayer le module Bilans <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
