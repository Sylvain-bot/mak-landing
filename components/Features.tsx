"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { CheckCircle2, X, ZoomIn } from "lucide-react";
import Image from "next/image";

const FEATURES = [
  {
    id: "clinique",
    icon: "🧠",
    tab: "IA Clinique",
    title: "IA Clinique",
    subtitle: "Ton filet de sécurité clinique, en temps réel",
    bullets: [
      "Détection automatique des drapeaux rouges",
      "Orientation clinique basée sur les sources de la kinésithérapie",
      "Suggère les tests à ne pas manquer",
      "Ne remplace pas ton expertise — la complète",
    ],
    quote: "J'avais un doute sur une prise en charge cervicale. En 30 secondes j'avais une orientation structurée.",
    author: "Amandine S., kiné libérale",
    screenshot: "/clinique.png",
  },
  {
    id: "biblio",
    icon: "📚",
    tab: "Bibliographie",
    title: "IA Bibliographique",
    subtitle: "56 000+ études. Résultat en 30 secondes.",
    bullets: [
      "56 000+ études intégrées",
      "Base enrichie automatiquement à chaque recherche",
      "Résultats formatés pour la pratique clinique",
      "Sources vérifiables en un clic",
    ],
    quote: "Le module biblio à lui seul vaut l'abonnement.",
    author: "Pierre L., kiné libéral",
    screenshot: "/biblio.png",
  },
  {
    id: "bilans",
    icon: "📋",
    tab: "Bilans",
    title: "Bilans & administratif",
    subtitle: "Un bilan complet et conforme en 3 minutes",
    bullets: [
      "Structure conforme aux exigences professionnelles",
      "Bilan édité avant même la fin de la séance",
      "Export PDF ou mail en un clic",
      "Modifiable à tout moment",
    ],
    quote: "Je le génère en 3-4 minutes pendant la consultation. Mes soirées m'appartiennent.",
    author: "Marion D., kiné libérale",
    screenshot: "/bilan.png",
  },
  {
    id: "chatbot",
    icon: "💬",
    tab: "Chatbot patient",
    title: "Chatbot patient",
    subtitle: "Tes patients accompagnés entre les séances",
    bullets: [
      "Réponses calées sur ton protocole de rééducation",
      "Continuité cabinet / domicile",
      "Réduction des messages hors séance",
      "Meilleure adhésion aux exercices",
    ],
    quote: "Mes patients se sentent mieux suivis et je vois la différence sur l'observance.",
    author: "Clément B., kiné libéral",
    screenshot: "/chatbot.png",
  },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
      style={{ background: "rgba(4,8,18,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 340 }}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-2.5 flex items-center gap-2.5" style={{ background: "#0d1424", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 mx-2 rounded-md px-3 py-1 text-xs truncate" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
            app.monassistantkine.fr
          </div>
        </div>
        <Image src={src} alt={alt} width={1440} height={810} className="w-full h-auto block" />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        aria-label="Fermer"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

// ─── Browser frame ─────────────────────────────────────────────────────────────

function BrowserFrame({ screenshot, title, onZoom }: { screenshot: string; title: string; onZoom: () => void }) {
  return (
    <div
      className="rounded-2xl overflow-hidden group cursor-zoom-in"
      style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      onClick={onZoom}
    >
      <div className="px-4 py-2.5 flex items-center gap-2.5" style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 mx-2 rounded-md px-3 py-1 text-xs truncate" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }}>
          app.monassistantkine.fr
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "#5bc4d6" }}>
          <ZoomIn className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">Agrandir</span>
        </div>
      </div>
      <div className="relative" style={{ aspectRatio: "16/9", background: "#0d1424" }}>
        <Image
          src={screenshot}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl px-4 py-2 flex items-center gap-2 shadow-xl"
            style={{ background: "rgba(13,20,36,0.9)", border: "1px solid rgba(56,153,170,0.3)" }}
          >
            <ZoomIn className="w-4 h-4 text-[#5bc4d6]" />
            <span className="text-sm font-medium text-white">Voir en plein écran</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

export function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const handleTab = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const feature = FEATURES[activeTab];

  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6"
      style={{ background: "#080f1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <AnimatePresence>
        {lightbox && (
          <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[#5bc4d6] text-sm font-semibold uppercase tracking-widest mb-4">Fonctionnalités</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Ce que Mon Assistant Kiné fait concrètement pour toi
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Chaque module résout un problème réel du cabinet.{" "}
            <span className="text-white/80 font-medium">Pas du gadget — de la pratique.</span>
          </p>
        </ScrollReveal>

        <ScrollReveal className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => handleTab(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={activeTab === i
                  ? { background: "#3899aa", color: "white", boxShadow: "0 4px 16px rgba(56,153,170,0.3)" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                <span>{f.icon}</span>
                {f.tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={feature.id}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 30, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -30, opacity: 0 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col"
              >
                <div className="text-4xl mb-5">{feature.icon}</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-[#5bc4d6] font-medium mb-6">{feature.subtitle}</p>
                <ul className="space-y-3 mb-8">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-white/55">
                      <CheckCircle2 className="w-5 h-5 text-[#3899aa] shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="pl-4" style={{ borderLeft: "2px solid #3899aa" }}>
                  <p className="text-white/45 italic text-sm leading-relaxed mb-1.5">
                    &ldquo;{feature.quote}&rdquo;
                  </p>
                  <p className="text-xs text-white/25">— {feature.author}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={feature.id + "-screen"}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 40, opacity: 0, scale: 0.97 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (d: number) => ({ x: d * -40, opacity: 0, scale: 0.97 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <BrowserFrame
                  screenshot={feature.screenshot}
                  title={feature.title}
                  onZoom={() => setLightbox({ src: feature.screenshot, alt: feature.title })}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-5">
              {FEATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleTab(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: activeTab === i ? "1.5rem" : "0.375rem", background: activeTab === i ? "#3899aa" : "rgba(255,255,255,0.15)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
