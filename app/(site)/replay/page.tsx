"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const YT_ID = "i4jnfqxYzwQ";

const TIMELINE = [
  { time: "00:00", text: "Introduction — pourquoi Mon Assistant Kiné a été créé" },
  { time: "03:30", text: "Le problème : la paperasse qui ronge le temps de soin" },
  { time: "06:00", text: "Démo live des modules — bilans, aide clinique, EBP, chatbot patient" },
  { time: "28:30", text: "Questions / Réponses en direct" },
  { time: "35:30", text: "Témoignage d'un bêta-testeur" },
  { time: "44:00", text: "L'offre Pionnier — détails et inscription" },
];

export default function ReplayPage() {
  const [ytLoaded, setYtLoaded] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-white pt-28 pb-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[#3899aa] text-xs font-semibold mb-5"
              style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#3899aa"><path d="M8 5v14l11-7z"/></svg>
              Live de Lancement — Replay
            </div>

            {/* Bandeau évolution */}
            <div
              className="flex items-start gap-3 text-left rounded-2xl px-5 py-4 mb-8"
              style={{ background: "#fef9f0", border: "1px solid #fde68a" }}
            >
              <span className="text-xl shrink-0">🚀</span>
              <div>
                <p className="text-sm font-bold text-[#92400e] mb-1">L&apos;app a évolué depuis ce live !</p>
                <p className="text-xs text-[#a16207] leading-relaxed">
                  Grâce aux retours des premiers utilisateurs, Mon Assistant Kiné a été considérablement amélioré depuis ce replay. Les fonctionnalités présentées sont toujours là — mais l&apos;expérience est aujourd&apos;hui bien meilleure.
                </p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight mb-4">
              Replay — Live de Lancement<br />
              <span className="text-[#3899aa]">Mon Assistant Kiné</span>
            </h1>
            <p className="text-base text-[#475569] max-w-xl mx-auto leading-relaxed">
              Tu as manqué le live ? Regarde le replay et découvre l&apos;offre Pionnier réservée aux 100 premiers abonnés.
            </p>
          </div>
        </section>

        {/* Vidéo */}
        <section className="py-10 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
          <div className="max-w-3xl mx-auto">
            <div
              onClick={() => setYtLoaded(true)}
              className="relative rounded-2xl overflow-hidden cursor-pointer mb-3"
              style={{
                aspectRatio: "16/9",
                border: "1px solid #d4ecea",
                boxShadow: "0 8px 40px rgba(56,153,170,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                background: "#0f172a",
              }}
            >
              {ytLoaded ? (
                <iframe
                  src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Replay Mon Assistant Kiné"
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <>
                  <Image
                    src={`https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`}
                    alt="Replay Mon Assistant Kiné"
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: "rgba(15,23,42,0.25)" }} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(56,153,170,0.95)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-3 right-3 text-[11px] font-semibold px-2 py-1 rounded-md"
                    style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
                  >
                    49:00
                  </div>
                </>
              )}
            </div>
            <p className="text-xs text-[#94a3b8] text-center mb-10">Clique pour lancer · Replay complet · 49 minutes</p>

            {/* Timeline */}
            <div
              className="rounded-2xl p-6 mb-10"
              style={{ background: "white", border: "1px solid #d4ecea" }}
            >
              <p className="text-[10px] font-semibold text-[#3899aa] uppercase tracking-widest mb-5 font-mono">
                Timeline du replay
              </p>
              <div className="flex flex-col divide-y" style={{ borderColor: "#f0f9fa" }}>
                {TIMELINE.map((item) => (
                  <div key={item.time} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <span
                      className="text-xs font-bold shrink-0 px-2 py-0.5 rounded-md mt-0.5"
                      style={{ background: "#eef7f6", color: "#3899aa", border: "1px solid #d4ecea" }}
                    >
                      {item.time}
                    </span>
                    <span className="text-sm text-[#475569] leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="rounded-2xl p-7 text-center"
              style={{ background: "#0f172a", border: "2px solid #3899aa" }}
            >
              <p className="text-white font-bold text-xl mb-1">Prêt à rejoindre les pionniers ?</p>
              <p className="text-white/60 text-sm mb-6">19€/mois · À vie · Limité aux 100 premiers</p>
              <Link
                href="https://app.monassistantkine.fr/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 20px rgba(56,153,170,0.35)" }}
              >
                Rejoindre l&apos;offre Pionnier — 19€/mois
              </Link>
              <p className="text-white/40 text-xs mt-3">Sans engagement · Résiliable à tout moment</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
