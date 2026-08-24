import type { Metadata } from "next";
import { COMPLIANCE_CLAIM } from "@/lib/claims";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { MultiDevice } from "@/components/MultiDevice";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homepageSchema } from "@/lib/schemas/homepage.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mon Assistant Kiné | L'IA pour kinésithérapeutes — Bilans en 3 min, copilote clinique",
  description: "Un copilote sourcé (56 000+ études) qui répond en 30 secondes, des bilans NGAP en 3 minutes, le suivi patient automatisé. Conçu par deux kinés libéraux. 14 jours d'essai.",
  alternates: {
    canonical: "https://www.monassistantkine.fr",
  },
  openGraph: {
    title: "Mon Assistant Kiné | L'IA pour kinésithérapeutes",
    description: "Un copilote clinique sourcé qui répond en 30 secondes, des bilans en 3 minutes. Conçu par deux kinés libéraux.",
    url: "https://www.monassistantkine.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Mon Assistant Kiné",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default async function Home() {
  return (
    <main>
      <JsonLd data={homepageSchema} />

      <Navbar />

      {/* SECTION 1 — Hero */}
      <Hero />

      {/* SECTION 2 — Témoignages ticker */}
      <TestimonialsCarousel />

      {/* SECTION 3 — Avant / Après */}
      <section className="py-24 sm:py-32 px-4 sm:px-6" style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-5 font-mono">
              Avant / Après
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-4">
              La même journée.{" "}
              <span style={{ color: "#3899aa" }}>Deux versions.</span>
            </h2>
            <p className="text-[#64748b] text-lg max-w-xl mx-auto leading-relaxed">
              La plupart des kinés se reconnaissent dans la colonne de gauche.<br />
              MAK, c&apos;est la colonne de droite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Avant */}
            <div className="rounded-2xl p-7 sm:p-9" style={{ background: "#fff5f5", border: "1px solid #fca5a5" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-red-400">Le pilote automatique</p>
              </div>
              <p className="text-[#475569] leading-relaxed text-sm mb-6">
                Tu soignes bien — mais honnêtement, tu fonctionnes en routine. Les articles scientifiques
                s&apos;accumulent dans tes onglets sans que tu les lises vraiment. Tu refais les mêmes
                techniques depuis des années. Tes bilans sont rédigés le soir. Tes patients, tu les suis
                comme tu peux. Ce n&apos;est pas ce que tu imaginais en sortant de l&apos;école.
              </p>
              <div className="space-y-2.5">
                {[
                  "Les mêmes techniques depuis des années, sans mise à jour",
                  "La littérature scientifique que tu n'as plus le temps de lire",
                  "Suivi patient entre les séances : bricolage ou rien",
                  "Bilans rédigés le soir — la charge mentale qui déborde",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-red-500/80">
                    <span className="mt-0.5 shrink-0 font-bold">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Après */}
            <div className="rounded-2xl p-7 sm:p-9" style={{ background: "#eef7f6", border: "1px solid #3899aa" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#3899aa]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#3899aa]">Le kiné que tu voulais être</p>
              </div>
              <p className="text-[#475569] leading-relaxed text-sm mb-6">
                Tu poses ta question clinique au Copilote — réponse en 30 secondes, sources citées parmi
                56 000+ études. Tes patients reçoivent leur programme de rééducation sur WhatsApp et sont
                accompagnés par le chatbot que tu as programmé pour eux. Tu pratiques avec la rigueur que
                tu voulais avoir. Ton bilan est mis au propre directement pendant la séance. Tes soirées
                t&apos;appartiennent à nouveau.
              </p>
              <div className="space-y-2.5">
                {[
                  "Toujours à jour scientifiquement, sans y passer des heures",
                  "Bilan mis au propre pendant la séance, en temps réel",
                  "Patients suivis entre les séances, chatbot WhatsApp programmé pour eux",
                  "La fierté de pratiquer comme tu l'avais imaginé",
                  "Communauté privée de pionniers — tu participes à l'évolution de l'outil",
                  "★ Abonnement annuel qui peut te rapporter de l'argent (aide FAMI*)",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[#2a7a8a] font-medium">
                    <span className="mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-[#94a3b8] text-center mt-6">
            *Aide FAMI versée par ta CPAM (jusqu&apos;à 350 €/an) — sous réserve des conditions du cahier des charges CNAM.{" "}
            <a href="#fami-section" className="underline hover:text-[#3899aa] transition-colors">En savoir plus →</a>
          </p>
        </div>
      </section>

      {/* SECTION 4 — Outils : problème / solution / comment ça marche */}
      <ToolsShowcase />

      {/* SECTION 5 — Multi-device */}
      <MultiDevice />

      {/* SECTION 6 — Pricing + FAMI */}
      <Pricing />

      {/* SECTION 7 — FAQ */}
      <FAQ />

      {/* SECTION 8 — CTA final */}
      <CtaFinal />

      {/* Sécurité & conformité */}
      <section className="py-10 px-4 sm:px-6" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-base font-semibold text-[#0f172a] mb-2">Sécurité &amp; conformité</h3>
          <p className="text-sm text-[#64748b] leading-relaxed">
            Mon Assistant Kiné est conçu dans le respect des obligations RGPD applicables aux
            professionnels de santé. Les données patients ne sont jamais utilisées pour entraîner
            des modèles IA tiers. {COMPLIANCE_CLAIM}.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
