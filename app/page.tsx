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
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homepageSchema } from "@/lib/schemas/homepage.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mon Assistant Kiné — Récupère 45 min/jour au cabinet | IA pour Kinésithérapeutes",
  description: "Bilans NGAP en 3 min, admin en 2 min, suivi patient WhatsApp, copilote clinique sourcé (56 000+ études). Conçu par des kinés libéraux. 14 jours d'essai gratuit, sans CB.",
  alternates: {
    canonical: "https://www.monassistantkine.fr",
  },
  openGraph: {
    title: "Mon Assistant Kiné — Récupère 45 min/jour au cabinet",
    description: "Bilans NGAP en 3 min, admin en 2 min, suivi patient WhatsApp, copilote clinique sourcé. Conçu par des kinés libéraux.",
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

      {/* Announcement banner — FAMI */}
      <div
        className="w-full py-2.5 px-4 text-center text-sm"
        style={{ background: "#0f2229" }}
      >
        <span style={{ color: "#e8b04d" }} className="font-bold">★ Nouveau · FAMI :</span>{" "}
        <span className="text-white/75">Votre CPAM peut vous verser jusqu&apos;à 350 €/an grâce à Mon Assistant Kiné.</span>{" "}
        <a
          href="#fami-section"
          className="font-semibold underline hover:opacity-90 transition-opacity"
          style={{ color: "#e8b04d" }}
        >
          Comment ça marche →
        </a>
      </div>

      <Navbar />

      {/* SECTION 1 — Hero */}
      <Hero />

      {/* SECTION 2 — Témoignages carousel */}
      <TestimonialsCarousel />

      {/* SECTION 3 — Outils : problème / solution / comment ça marche */}
      <ToolsShowcase />

      {/* SECTION 4 — Multi-device */}
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
                "Vidéotransmission sécurisée — consultations à distance, suivi post-op, bilan initial à domicile (rend éligible au FAMI)",
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

      {/* SECTION 6 — FAMI */}
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
