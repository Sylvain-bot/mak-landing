import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
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

      {/* SECTION 1 — Hero (2 colonnes : texte + ChatDemo) */}
      <Hero />

      {/* SECTION 2 — Témoignages : Constance (grand) + Amandine (discret dashed) */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: "white", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {/* Constance — principal */}
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

          {/* Amandine — secondaire */}
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

      {/* SECTION 3 — Vidéo démo (< 2 min) */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-2 font-mono">
              Démo en 2 minutes
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
              Vois MAK en action
            </h2>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #d4ecea", boxShadow: "0 4px 24px rgba(56,153,170,0.08)" }}
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/ZrA7d4CvRRE"
                title="Mon Assistant Kiné — Démo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Stat clé : 2h */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "#0f172a" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-12 items-center">
            <div className="shrink-0">
              <div
                className="text-7xl sm:text-9xl font-bold leading-none tabular-nums"
                style={{ color: "white", fontFamily: "monospace" }}
              >
                2h
              </div>
              <div className="text-xs font-mono mt-2" style={{ color: "#3899aa" }}>
                par recherche PubMed
              </div>
            </div>
            <div>
              <p className="text-lg sm:text-xl leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                C&apos;est pourquoi la plupart des kinés ont arrêté de chercher. Pas par manque de rigueur — parce que 2h pour une réponse incertaine en anglais, ce n&apos;est pas tenable en libéral.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                MAK fait la même chose en 30 secondes. Tu redeviens un kiné qui consulte les données — sans y sacrifier ta soirée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Comment ça marche (3 étapes) */}
      <section
        id="comment"
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 max-w-xl">
            <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3 font-mono">
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
              <div key={step.num} className="flex flex-col gap-4 pt-1.5">
                <span
                  className="text-sm font-bold font-mono"
                  style={{ color: "#3899aa" }}
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

      {/* SECTION 5 — Grille de fonctionnalités condensée (4 cartes + Contrats) */}
      <Features />

      {/* SECTION 6 — Pricing (2 offres + lien /tarifs) */}
      <Pricing />

      {/* SECTION 7 — FAQ condensée */}
      <FAQ />

      {/* SECTION 8 — CTA final */}
      <CtaFinal />

      <Footer />
    </main>
  );
}
