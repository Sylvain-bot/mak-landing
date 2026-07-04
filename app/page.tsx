import type { Metadata } from "next";
import { COMPLIANCE_CLAIM } from "@/lib/claims";
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
  title: "Mon Assistant Kiné — Récupère 45 min/jour au cabinet | IA pour Kinésithérapeutes",
  description: "Bilans NGAP en 3 min, admin en 2 min, suivi patient WhatsApp, copilote clinique sourcé (56 000+ études). Conçu par des kinés libéraux. Essai gratuit, sans CB.",
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
      <Navbar />

      {/* SECTION 1 — Hero (2 colonnes : texte + ChatDemo) */}
      <Hero />

      {/* SECTION 2 — Témoignages */}
      <section
        className="py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: "white", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <div className="text-center mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">Ils ont récupéré leurs soirées</h2>
          </div>

          {/* Marion — principal (gain de temps chiffré) */}
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
                Je rédige mes bilans directement pendant les séances. Mes soirées m&apos;appartiennent à nouveau.
              </blockquote>
              <p className="text-sm text-[#94a3b8]">Marion D. — Kinésithérapeute libérale, Biot</p>
            </div>
          </div>

          {/* Constance — secondaire (copilote) */}
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
                Je discute avec l&apos;IA de certains cas et ça m&apos;aide dans mes réflexions — ça rassure de se savoir sur la bonne voie.
              </blockquote>
              <p className="text-xs text-[#94a3b8]">Constance — Kinésithérapeute libérale</p>
            </div>
          </div>

          {/* Amandine — discret */}
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
        id="demo"
        className="py-14 sm:py-20 px-4 sm:px-6"
        style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-2 font-mono">
              Démo en 2 minutes
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a]">
              Vois Mon Assistant Kiné en action
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

      {/* SECTION 4 — Stat clé : 2h synthèse biblio */}
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
                de synthèse bibliographique
              </div>
            </div>
            <div>
              <p className="text-lg sm:text-xl leading-relaxed mb-4" style={{ color: "#94a3b8" }}>
                C&apos;est ce qu&apos;il faut pour produire une vraie synthèse de la littérature sur un thème clinique — pas une recherche Google, mais un état des lieux des données exploitable en pratique.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                Mon Assistant Kiné le fait à la demande, en quelques secondes. 56 000+ ressources mobilisées, résultat structuré, sources citées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Comment ça marche (3 étapes — centré sur le bilan) */}
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
              Ton prochain bilan, en 3 étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Tu dictes ton bilan entre deux patients",
                desc: "Ou tu tapes tes notes en vrac — sans te soucier de la mise en forme. Mon Assistant Kiné comprend les deux.",
              },
              {
                num: "02",
                title: "Mon Assistant Kiné structure au format NGAP",
                desc: "Terminologie exacte, structure attendue par la CPAM, cohérence clinique vérifiée. Rien à reformater.",
              },
              {
                num: "03",
                title: "Tu relis, tu ajustes, tu exportes",
                desc: "Chrono : 3 minutes. PDF prêt, envoi en 1 clic. Le patient est à peine rhabillé.",
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

          <p className="mt-10 text-sm text-[#94a3b8] text-center">
            Et ça marche pareil pour tes courriers, ton suivi patient et tes questions cliniques.
          </p>
        </div>
      </section>

      {/* SECTION 5 — Grille de fonctionnalités condensée (3 cartes + Contrats) */}
      <Features />

      {/* SECTION 5b — Copilote clinique — différenciateur */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "#0f172a" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-10 sm:gap-16 items-center">
            <div>
              <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
                Le bonus qui n&apos;existe nulle part ailleurs
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                Et quand tu as un doute : pose ta question comme à un confrère.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
                Réponse sourcée en 30 secondes. Pas une réponse généraliste — une orientation clinique
                appuyée sur <span className="text-white font-semibold">56 000+ études dont le Cleland</span>,
                avec les drapeaux rouges vérifiés et les tests suggérés.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Conçu exclusivement pour la kinésithérapie. Zéro hallucination — chaque source est cliquable
                et pointe vers l&apos;article original sur PubMed.
              </p>
            </div>
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(56,153,170,0.06)", border: "1px solid rgba(56,153,170,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🧠</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest font-mono" style={{ color: "#3899aa" }}>
                    Copilote clinique
                  </p>
                  <p className="text-sm font-bold text-white">Mon Assistant Kiné (MAK)</p>
                </div>
              </div>
              <div
                className="rounded-xl p-4 mb-3 text-sm leading-relaxed"
                style={{ background: "rgba(56,153,170,0.15)", color: "rgba(255,255,255,0.85)" }}
              >
                &ldquo;Patient 52 ans, cervicalgie droite irradiant vers l&apos;épaule — que dois-je vérifier en priorité ?&rdquo;
              </div>
              <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: "#1e293b", color: "#94a3b8" }}>
                <p className="text-white font-semibold mb-2">Priorité : écarter une radiculopathie C6 active</p>
                <p className="mb-3">Spurling (sensibilité 94 % selon Cleland 2013), distraction cervicale, testing neurologique C6. Signes médullaires à surveiller.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(56,153,170,0.2)", color: "#3899aa" }}>📚 Cleland (2013)</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(56,153,170,0.2)", color: "#3899aa" }}>📚 HAS 2022</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}>🚩 Drapeau rouge vérifié</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Ce qui est inclus */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
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

      {/* SECTION 7 — Pricing (2 offres + lien /tarifs) */}
      <Pricing />

      {/* SECTION 7 — FAQ condensée */}
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
