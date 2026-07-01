"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Star } from "lucide-react";
import { FOUNDER_1_NAME, FOUNDER_1_LINKEDIN, FOUNDER_2_NAME, FOUNDER_2_LINKEDIN } from "@/lib/schemas/bio.schema";

const YT_ID = "NQh0eORWvkc";

const FEATS = [
  { icon: "📋", label: "Bilans en 3 minutes", detail: "Dicte tes notes, l'IA structure un bilan conforme et exportable" },
  { icon: "🧠", label: "IA clinique & bibliographique", detail: "56 000+ études intégrées — drapeaux rouges, raisonnement structuré, recherche EBP en 30 sec" },
  { icon: "💬", label: "Chatbot patient", detail: "Tes patients accompagnés entre les séances, sans SMS à gérer" },
];

const AVATARS = [
  { initials: "ML", bg: "#cde9ef", color: "#1d6e7e" },
  { initials: "JP", bg: "#d0ede8", color: "#1a6b5a" },
  { initials: "SR", bg: "#dbd5f5", color: "#5b3fa8" },
  { initials: "CM", bg: "#fde5cc", color: "#b8520a" },
];

const TESTIMONIALS = [
  {
    initials: "MD", bg: "#d0ede8", color: "#1a6b5a",
    name: "Marion D.", role: "Kiné libérale · Biot",
    quote: "Je remplissais mes bilans le soir, ça prenait 20 minutes chacun. Maintenant je le génère en 3-4 minutes pendant la consultation. Mes soirées m'appartiennent à nouveau.",
  },
  {
    initials: "PL", bg: "#eff6ff", color: "#3b82f6",
    name: "Pierre L.", role: "Kiné du sport · Quimper",
    quote: "Le module biblio à lui seul vaut l'abonnement. En 30 secondes j'ai ce qu'il me fallait chercher 2h sur PubMed.",
  },
  {
    initials: "CB", bg: "#fce7f3", color: "#db2777",
    name: "Clément B.", role: "Kiné libéral · Lyon",
    quote: "Mes patients se sentent mieux suivis entre les séances. Je vois la différence sur l'observance.",
  },
];

const FOOTER_LINKS = [
  { label: "CGU", href: "/cgu" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

export default function BioPage() {
  const [ytLoaded, setYtLoaded] = useState(false);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)", color: "#2a7a8a" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3899aa] animate-pulse inline-block" />
            Offre Pionnier · Pour les 100 premiers · 19€/mois
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
            Gagne <em className="not-italic text-[#3899aa]">2h par semaine</em><br />au cabinet.
          </h1>
          <p className="text-lg text-[#475569] mb-2 leading-relaxed">
            Pour des patients en plus, du sport, du temps en famille... ou juste souffler.
          </p>
          <p className="text-base text-[#94a3b8] mb-8">
            Soigne. Mon Assistant Kiné s&apos;occupe du reste.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex">
              {AVATARS.map((av, i) => (
                <div
                  key={av.initials}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold"
                  style={{ background: av.bg, color: av.color, marginLeft: i === 0 ? 0 : -8 }}
                >
                  {av.initials}
                </div>
              ))}
            </div>
            <span className="text-sm text-[#94a3b8]">
              <strong className="text-[#0f172a]">200+ kinés</strong> suivent le projet · conçu par des kinés libéraux
            </span>
          </div>

          {/* Offer card */}
          <div className="rounded-2xl p-5 mb-6 text-left" style={{ background: "#f0f9fa", border: "1px solid #d4ecea" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#0f172a]">
                Offre Pionnier
                <span className="text-xs text-[#94a3b8] font-normal ml-2">· lancé le 22/04/2026</span>
              </span>
              <div>
                <span className="text-2xl font-bold text-[#3899aa]">19€</span>
                <span className="text-xs text-[#94a3b8] line-through ml-1.5">49€</span>
                <span className="text-xs text-[#94a3b8]">/mois</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94a3b8]">Pour les <strong className="text-[#0f172a]">100 premiers</strong> inscrits</span>
              <span className="text-xs text-[#3899aa] font-semibold">Tarif garanti à vie</span>
            </div>
          </div>

          <Link
            href="https://monassistantkine.vercel.app/signup"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#3899aa]/25 mb-3"
            onClick={() => { try { (window as any).clarity?.("set", "cta_clicked", "true"); } catch(e) {} }}
          >
            Créer mon compte gratuitement <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-[#94a3b8]">
            Sans carte bancaire · Accès immédiat · Annulable à tout moment
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 text-center">Fonctionnalités</p>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8 text-center">Ce que MAK fait pour toi</h2>
          <div className="flex flex-col gap-3">
            {FEATS.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-4 bg-white rounded-2xl p-5"
                style={{ border: "1px solid #d4ecea", boxShadow: "0 1px 4px rgba(56,153,170,0.06)" }}
              >
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-[#0f172a]">{f.label}</div>
                  <div className="text-xs text-[#94a3b8] mt-1 leading-relaxed">{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module contrats */}
      <section className="py-16 px-4 sm:px-6 bg-white" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-6" style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d" }}
              >
                100 % Gratuit
              </span>
              <span className="text-sm font-bold text-[#0f172a]">Module contrats de remplacement</span>
            </div>
            <div className="space-y-2.5 mb-5">
              {[
                { icon: "✍️", text: "Contrat pré-rempli avec tes infos en 2 minutes" },
                { icon: "🖊️", text: "Signature électronique des deux côtés, horodatée" },
                { icon: "✅", text: "Déclaration à l'Ordre générée en 1 clic" },
                { icon: "📁", text: "Tous tes contrats archivés, accessibles à vie" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span className="text-sm text-[#166534] leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#15803d] italic mb-4">
              Offert à toute la communauté des kinés libéraux — abonné ou non.
            </p>
            <Link
              href="https://monassistantkine.vercel.app/signup"
              className="block text-center bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold py-3 rounded-lg transition-all hover:scale-[1.02]"
            >
              Accéder au module — c&apos;est gratuit →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 text-center">Témoignages</p>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8 text-center">Ce que disent les kinés bêta-testeurs</h2>
          <div className="space-y-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-5"
                style={{ border: "1px solid #d4ecea", borderLeft: "3px solid #3899aa", boxShadow: "0 1px 6px rgba(56,153,170,0.07)" }}
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#3899aa] text-[#3899aa]" />
                  ))}
                </div>
                <p className="text-sm text-[#475569] italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: t.bg, color: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0f172a]">{t.name}</div>
                    <div className="text-xs text-[#94a3b8]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-16 px-4 sm:px-6 bg-white" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest text-center mb-6">
            Voir l&apos;app en situation réelle
          </p>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer relative"
            style={{
              aspectRatio: "16/9",
              border: "1px solid #d4ecea",
              boxShadow: "0 4px 24px rgba(56,153,170,0.08)",
              background: "#0f172a",
            }}
            onClick={() => setYtLoaded(true)}
          >
            {ytLoaded ? (
              <iframe
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Démo Mon Assistant Kiné"
                className="absolute inset-0 w-full h-full border-none"
              />
            ) : (
              <>
                <Image
                  src={`https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg`}
                  alt="Démo Mon Assistant Kiné"
                  fill
                  sizes="(max-width: 672px) 100vw, 672px"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: "rgba(56,153,170,0.92)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
          <p className="text-xs text-[#94a3b8] text-center mt-3">
            Démo complète · 2 minutes pour comprendre comment ça marche
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 text-center">Équipe</p>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8 text-center">L&apos;équipe fondatrice</h2>
          <div className="space-y-3">
            {[
              { name: FOUNDER_1_NAME, linkedin: FOUNDER_1_LINKEDIN },
              { name: FOUNDER_2_NAME, linkedin: FOUNDER_2_LINKEDIN },
            ].map((f) => (
              <div
                key={f.name}
                className="flex items-center justify-between bg-white rounded-2xl p-5"
                style={{ border: "1px solid #d4ecea", boxShadow: "0 1px 4px rgba(56,153,170,0.06)" }}
              >
                <div>
                  <div className="text-sm font-semibold text-[#0f172a]">{f.name}</div>
                  <div className="text-xs text-[#94a3b8] mt-0.5">Kinésithérapeute D.E. — Co-fondateur</div>
                </div>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#3899aa] font-semibold hover:underline shrink-0 ml-4"
                >
                  LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#3899aa" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Essayer Mon Assistant Kiné gratuitement</h2>
          <p className="text-white/80 text-sm mb-6">Sans carte bancaire · Accès immédiat · Sans engagement</p>
          <Link
            href="https://monassistantkine.vercel.app/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02] mb-4"
            onClick={() => { try { (window as any).clarity?.("set", "cta_clicked", "true"); } catch(e) {} }}
          >
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-white/70">
            Déjà un compte ?{" "}
            <Link href="https://monassistantkine.vercel.app/login" className="text-white font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </section>

      {/* Legal footer */}
      <section className="py-8 px-4 sm:px-6 bg-white" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-6 flex-wrap mb-3">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-[#94a3b8] hover:text-[#64748b] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[#94a3b8]">© 2026 Mon Assistant Kiné</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
