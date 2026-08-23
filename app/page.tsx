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
import { FamiSection } from "@/components/FamiSection";
import { VideotransmissionSection } from "@/components/VideotransmissionSection";
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

      {/* SECTION 2 — Témoignages carousel */}
      <TestimonialsCarousel />

      {/* SECTION 3 — Outils : problème / solution / comment ça marche */}
      <ToolsShowcase />

      {/* SECTION 4 — Avant / Après */}
      <section className="py-20 sm:py-28 px-4 sm:px-6" style={{ background: "#0f172a" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
              Avant / Après
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Une journée au cabinet.{" "}
              <span style={{ color: "#3899aa" }}>Deux versions.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-0 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* Avant */}
            <div className="p-8 sm:p-10 relative" style={{ background: "rgba(239,68,68,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-red-400">Sans MAK</p>
              </div>
              <p className="text-white/70 leading-relaxed text-sm">
                Tu rentres du cabinet avec ton sac de dossiers en retard. Tu rédiges tes bilans après le
                repas, pendant que ta famille passe la soirée sans toi. Un cas compliqué te trotte encore
                dans la tête — et tu n&apos;as personne à qui le poser.
              </p>
              <div className="mt-6 space-y-2">
                {["Bilans rédigés le soir ou le week-end", "Questions cliniques sans réponse immédiate", "Charge mentale qui déborde sur la vie perso"].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-red-300/70">
                    <span className="mt-0.5 shrink-0">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Après */}
            <div className="p-8 sm:p-10 relative" style={{ background: "rgba(56,153,170,0.08)" }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#3899aa]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#3899aa]">Avec MAK</p>
              </div>
              <p className="text-white/70 leading-relaxed text-sm">
                Tu dictes ton bilan entre deux patients — il est prêt avant que tu aies raccroché ta blouse.
                Le cas compliqué ? Tu poses la question au Copilote, réponse sourcée en 30 secondes,
                comme à un confrère de confiance. Tes soirées t&apos;appartiennent.
              </p>
              <div className="mt-6 space-y-2">
                {["Bilan dicté en 3 minutes, entre deux patients", "Questions cliniques répondues avec les sources", "La tête libre pour soigner — et pour vivre"].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-[#3899aa]">
                    <span className="mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Multi-device */}
      <MultiDevice />

      {/* SECTION 5 — Ce qui est inclus (à déplacer/supprimer selon besoins) */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{ background: "white", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-8 sm:gap-14 items-start">
            <div>
              <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
                Ce qui est inclus
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-snug">
                Un abonnement.<br />Tout ce qu&apos;il faut au cabinet.
              </h2>
            </div>
            <ul className="space-y-3.5">
              {[
                "Bilans kinésithérapiques conformes NGAP — dictée vocale, mise en forme automatique, export PDF en 1 clic",
                "Module administratif — courriers médecins, relances et comptes-rendus depuis tes templates ou rédigés par l'IA",
                "Suivi patient à domicile — programme d'exercices sur WhatsApp avec vidéos, zéro relance manuelle",
                "Copilote clinique — 56 000+ ressources dont le Cleland, drapeaux rouges vérifiés, réponse sourcée en 30 secondes",
                "Vidéotransmission sécurisée — consultations à distance, suivi post-op, coordination de soins (éligible aide FAMI)",
                "Données hébergées en Europe, jamais utilisées pour entraîner des modèles IA tiers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#475569] leading-snug">
                  <span className="text-[#3899aa] font-bold mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Vidéotransmission (nouveauté) */}
      <VideotransmissionSection />

      {/* SECTION 7 — FAMI */}
      <FamiSection />

      {/* SECTION 7 — Pricing */}
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
