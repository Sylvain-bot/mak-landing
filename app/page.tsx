import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { DemoVideo } from "@/components/DemoVideo";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { Results } from "@/components/Results";
import { Founders } from "@/components/Founders";
import { ForWho } from "@/components/ForWho";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homepageSchema } from "@/lib/schemas/homepage.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mon Assistant Kiné | Bilans en 3 min — IA pour Kinésithérapeutes",
  description: "Gagnez 2h/semaine : bilans en 3 minutes, drapeaux rouges détectés, 56 000+ études intégrées. Essayez Mon Assistant Kiné gratuitement.",
  alternates: {
    canonical: "https://www.monassistantkine.fr",
  },
  openGraph: {
    title: "Mon Assistant Kiné | IA pour Kinésithérapeutes",
    description: "Gagnez 2h/semaine grâce à l'IA : bilans en 3 min, drapeaux rouges détectés.",
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
      <Hero />

      {/* Témoignages — Constance (principal) + Amandine (secondaire) */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: "white", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {/* Constance — grand format */}
          <div
            className="rounded-2xl p-8 sm:p-10 flex gap-5 sm:gap-8 items-start"
            style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 20px rgba(56,153,170,0.07)" }}
          >
            <div
              className="text-5xl sm:text-6xl font-bold leading-none shrink-0 select-none"
              style={{ color: "#d4ecea", fontFamily: "Georgia, serif" }}
            >
              &ldquo;
            </div>
            <div>
              <blockquote className="text-lg sm:text-xl font-semibold text-[#0f172a] leading-relaxed mb-3">
                Je discute avec l&apos;IA de certains cas et ça m&apos;aide dans mes réflexions — ça rassure de se savoir sur la bonne voie.
              </blockquote>
              <p className="text-sm text-[#94a3b8]">Constance — Kinésithérapeute libérale</p>
            </div>
          </div>

          {/* Amandine — format secondaire discret */}
          <div
            className="rounded-2xl p-6 sm:p-7 flex gap-5 items-start"
            style={{ border: "1px dashed #d4ecea" }}
          >
            <div
              className="text-3xl font-bold leading-none shrink-0 select-none"
              style={{ color: "#d4ecea", fontFamily: "Georgia, serif" }}
            >
              &ldquo;
            </div>
            <div>
              <blockquote className="text-base text-[#475569] leading-relaxed mb-2">
                J&apos;avais un doute sur une prise en charge cervicale. En 30 secondes j&apos;avais une orientation structurée.
              </blockquote>
              <p className="text-xs text-[#94a3b8]">Amandine S. — Kinésithérapeute libérale, Toulouse</p>
            </div>
          </div>
        </div>
      </section>

      <SocialProof />
      <DemoVideo />
      <Problem />

      {/* Comment ça marche */}
      <section
        id="comment"
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">
              Comment ça marche
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight">
              Trois étapes. Pas de formation nécessaire.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Tu poses ta question",
                desc: "Comme tu le ferais à un confrère — un doute clinique, une question biblio, un cas atypique.",
              },
              {
                num: "02",
                title: "MAK mobilise les sources",
                desc: "56 000+ ressources EBP dont le Cleland, drapeaux rouges vérifiés, tests cliniques suggérés.",
              },
              {
                num: "03",
                title: "Tu obtiens une orientation",
                desc: "Pas un pavé à trier — une réponse structurée et actionnable, en 30 secondes.",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <span
                  className="text-sm font-bold"
                  style={{ fontFamily: "monospace", color: "#3899aa" }}
                >
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-[#0f172a] leading-tight">{step.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />
      <Results />
      <Founders />
      <ForWho />
      <Pricing />
      <FAQ />
      <CtaFinal />

      <section className="py-10 px-4 sm:px-6" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-base font-semibold text-[#0f172a] mb-2">Sécurité &amp; conformité</h3>
          <p className="text-sm text-[#64748b] leading-relaxed">
            Mon Assistant Kiné est conçu dans le respect des obligations RGPD applicables aux
            professionnels de santé. Les données patients ne sont jamais utilisées pour entraîner
            des modèles IA tiers. Hébergement en Europe.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
