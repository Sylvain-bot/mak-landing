"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import Link from "next/link";
import { CTA_SIGNUP_URL } from "@/lib/claims";

const FEATURES = [
  { icon: "📋", label: "Bilans cliniques NGAP en 3 minutes", new: false },
  { icon: "📨", label: "Gestion administrative (courriers, relances)", new: false },
  { icon: "💬", label: "Suivi patient WhatsApp + programme d'exercices", new: false },
  { icon: "🧠", label: "Copilote clinique (56 000+ études, Cleland inclus)", new: false },
  { icon: "📑", label: "Contrats de remplacement — 100 % gratuit", new: false },
  { icon: "📹", label: "Vidéotransmission sécurisée", new: true },
];

const STEPS = [
  {
    n: "1",
    title: "Tu t'abonnes en 2026",
    body: "Tu accèdes au module vidéotransmission sécurisée dès le premier jour.",
  },
  {
    n: "2",
    title: "Tu l'utilises normalement",
    body: "Consultations à distance, suivi post-op, bilan initial à domicile — comme d'habitude.",
  },
  {
    n: "3",
    title: "Tu déclares sur Amelipro (janv. – mars 2027)",
    body: "Une case à cocher sur Amelipro, au titre de l'année 2026. 5 minutes, une fois par an. Mon Assistant Kiné te fournit l'attestation d'équipement à joindre à ta déclaration.",
  },
  {
    n: "4",
    title: "Tu touches l'aide au printemps 2027",
    body: "350 € versés directement par ta CPAM. Pas de remboursement à demander, pas de facture.",
  },
];

const ANNUAL_TIERS = [
  { name: "Pionnier", price: "199", display: "+151 €", label: "tu gagnes", gold: true, highlight: true },
  { name: "Pratique", price: "299", display: "+51 €", label: "tu gagnes", gold: true, highlight: false },
  { name: "Expert", price: "499", display: "149 €", label: "coût net", gold: false, highlight: false },
];

export function FamiSection() {
  return (
    <section
      id="fami-section"
      className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#0f2229" }}
    >
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(56,153,170,0.12) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(232,176,77,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Eyebrow */}
        <ScrollReveal className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest"
            style={{ background: "rgba(232,176,77,0.15)", border: "1px solid rgba(232,176,77,0.4)", color: "#e8b04d" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8b04d] animate-pulse" />
            Nouveau · Aide Assurance Maladie
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Cette année, Mon Assistant Kiné<br />
            <span style={{ color: "#e8b04d" }}>peut te coûter moins que zéro.</span>
          </h2>
          <p className="text-white/60 text-lg">Et ce n&apos;est même pas la meilleure partie.</p>
        </ScrollReveal>

        {/* Deux colonnes : stack de valeur + reçu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">

          {/* Colonne gauche — valeur */}
          <ScrollReveal delay={0.1}>
            <div
              className="rounded-2xl p-6 h-full"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-5 font-mono">
                Ce que tu obtiens
              </p>
              <ul className="space-y-4">
                {FEATURES.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-white/85 leading-snug">{f.label}</span>
                      {f.new && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: "rgba(232,176,77,0.2)", border: "1px solid rgba(232,176,77,0.4)", color: "#e8b04d" }}
                        >
                          Nouveau
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 rounded-xl p-4"
                style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}
              >
                <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Comment la CNAM rémunère ta modernisation</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  La CNAM dispose d&apos;un forfait annuel pour aider les kinés libéraux à se moderniser.
                  S&apos;équiper d&apos;une solution de <strong className="text-white/90">vidéotransmission sécurisée</strong>{" "}est
                  l&apos;un des critères éligibles. Tu le déclares chaque année en janvier-mars sur Amelipro —
                  ta <strong className="text-[#e8b04d]">CPAM te verse jusqu&apos;à 350 €</strong>,
                  sans avance de frais, sans dossier complexe.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Colonne droite — reçu + tiers */}
          <ScrollReveal delay={0.18}>
            <div className="space-y-5 h-full flex flex-col">

              {/* Reçu Pionnier */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(232,176,77,0.06)", border: "1px solid rgba(232,176,77,0.25)" }}
              >
                <p className="text-[#e8b04d] text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
                  Exemple — Offre Pionnier annuelle
                </p>
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Tu paies (abonnement annuel)</span>
                    <span className="text-white font-semibold">199 €</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Ta CPAM te verse (aide FAMI)*</span>
                    <span className="font-semibold" style={{ color: "#e8b04d" }}>+ 350 €</span>
                  </div>
                  <div className="h-px" style={{ background: "rgba(232,176,77,0.2)" }} />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm">Tu gagnes</span>
                    <span className="text-2xl font-bold" style={{ color: "#e8b04d" }}>+ 151 €</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs">
                  Ta CPAM te verse 151 € de plus que le coût de ton abonnement.
                </p>
              </div>

              {/* Les 3 tiers annuels */}
              <div
                className="rounded-2xl p-5 flex-1"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
                  Toutes les offres annuelles
                </p>
                <div className="space-y-3">
                  {ANNUAL_TIERS.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center justify-between rounded-xl px-4 py-3"
                      style={t.highlight
                        ? { background: "rgba(56,153,170,0.15)", border: "1px solid rgba(56,153,170,0.3)" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }
                      }
                    >
                      <div>
                        <span className="text-white text-sm font-semibold">{t.name}</span>
                        <span className="text-white/40 text-xs ml-2">{t.price} €/an</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold" style={{ color: t.gold ? "#e8b04d" : "#94a3b8" }}>
                          {t.display}*
                        </span>
                        <span className="text-white/30 text-xs ml-1">{t.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Hormozi callout */}
        <ScrollReveal delay={0.05} className="mb-10">
          <div
            className="rounded-2xl px-6 py-6 text-center"
            style={{ background: "rgba(232,176,77,0.05)", border: "1px solid rgba(232,176,77,0.2)" }}
          >
            <p className="text-white text-xl sm:text-2xl font-bold leading-snug mb-1">
              La seule façon de perdre de l&apos;argent avec Mon Assistant Kiné,
            </p>
            <p className="text-xl sm:text-2xl font-bold" style={{ color: "#e8b04d" }}>
              c&apos;est de ne pas s&apos;abonner.
            </p>
            <p className="text-white/40 text-sm mt-3 leading-relaxed">
              Offre Pionnier à 199 €/an · Ta CPAM te verse 350 € · Tu gagnes 151 € net — chaque année.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 étapes */}
        <ScrollReveal delay={0.1} className="mb-12">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6 text-center font-mono">
            Comment ça marche
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-5 relative"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mb-4 font-mono"
                  style={{ background: "rgba(56,153,170,0.2)", color: "#3899aa", border: "1px solid rgba(56,153,170,0.3)" }}
                >
                  {step.n}
                </div>
                <h3 className="text-white text-sm font-semibold mb-2 leading-snug">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.15} className="text-center">
          <Link
            href={CTA_SIGNUP_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110 mb-4"
            style={{
              background: "linear-gradient(135deg, #3899aa, #2a7a8a)",
              boxShadow: "0 4px 24px rgba(56,153,170,0.35)",
            }}
          >
            Essayer 14 jours — sans carte bancaire →
          </Link>
          <p className="text-white/30 text-xs max-w-xl mx-auto leading-relaxed">
            *L&apos;éligibilité au FAMI dépend de ta CPAM et du respect des conditions du cahier des charges CNAM.
            L&apos;aide est déclarée chaque année en janvier-mars sur Amelipro, au titre de l&apos;année précédente
            (abonnement 2026 → déclaration janv.-mars 2027 → versement printemps 2027).
            Mon Assistant Kiné ne peut pas garantir le versement. Renseigne-toi auprès de ta CPAM.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
