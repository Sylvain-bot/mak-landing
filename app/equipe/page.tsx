import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { FOUNDER_1_NAME, FOUNDER_1_LINKEDIN, FOUNDER_2_NAME, FOUNDER_2_LINKEDIN } from "@/lib/schemas/bio.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "L'équipe | Mon Assistant Kiné — Créé par des kinés, pour des kinés",
  description: "Mon Assistant Kiné est fondé par deux kinésithérapeutes libéraux praticiens. Parce qu'un bon outil clinique ne peut être conçu que de l'intérieur.",
  alternates: { canonical: "https://www.monassistantkine.fr/equipe" },
  openGraph: {
    title: "L'équipe — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/equipe",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.monassistantkine.fr/#organization",
  "name": "Mon Assistant Kiné",
  "url": "https://www.monassistantkine.fr",
  "foundingDate": "2024",
  "description": "Outil IA conçu par des kinésithérapeutes libéraux pour les kinésithérapeutes libéraux",
  "founder": [
    { "@type": "Person", "name": FOUNDER_1_NAME, "jobTitle": "Kinésithérapeute libéral, Co-fondateur", "sameAs": FOUNDER_1_LINKEDIN },
    { "@type": "Person", "name": FOUNDER_2_NAME, "jobTitle": "Kinésithérapeute libéral, Co-fondateur", "sameAs": FOUNDER_2_LINKEDIN },
  ],
};

const WONT_DO = [
  "Vendre vos données de santé",
  "Construire un outil qui prétend remplacer le raisonnement clinique",
  "Ajouter des fonctionnalités gadgets qui n'ont pas été testées au cabinet",
];

const WILL_DO = [
  "Construire MAK avec les retours des kinés utilisateurs",
  "Maintenir les données patients en sécurité, conformément au RGPD",
  "Rester honnêtes sur ce que l'IA peut et ne peut pas faire",
];

export default function EquipePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">L&apos;équipe</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Créé par des kinés.<br />
            <span className="text-[#3899aa]">Pour des kinés.</span>
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Mon Assistant Kiné n&apos;est pas né dans une startup tech. Il est né d&apos;un problème réel, vécu au cabinet, par deux kinésithérapeutes libéraux qui en avaient assez de passer leurs soirées sur la paperasse.
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Notre histoire</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            En 2024, deux kinésithérapeutes libéraux se posent la même question : pourquoi n&apos;existe-t-il pas d&apos;outil IA vraiment conçu pour notre pratique ?
          </p>
          <p className="text-[#475569] leading-relaxed mb-4">
            Pas un outil générique qu&apos;on adapte. Un outil qui connaît la structure d&apos;un bilan NGAP, qui est connecté à PubMed et PEDro, qui comprend les contraintes du libéral français.
          </p>
          <p className="text-[#475569] leading-relaxed font-medium">
            Ils décident de le construire.
          </p>
        </div>
      </section>

      {/* L'équipe fondatrice */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-10">L&apos;équipe fondatrice</h2>
          <div className="space-y-6">
            <div className="rounded-2xl p-8" style={{ border: "1px solid #d4ecea" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a]">{FOUNDER_1_NAME}</h3>
                  <p className="text-[#3899aa] font-medium text-sm">Co-fondateur · Kinésithérapeute D.E.</p>
                </div>
                {FOUNDER_1_LINKEDIN && (
                  <a href={FOUNDER_1_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-xs text-[#3899aa] font-semibold hover:underline">
                    LinkedIn →
                  </a>
                )}
              </div>
              <p className="text-[#475569] leading-relaxed mb-4">
                Kinésithérapeute libéral depuis 14 ans, installé en Normandie. Diplômé universitaire en kinésithérapie du sport. MAK est né d&apos;une frustration partagée : passer trop de temps à documenter, pas assez de temps à soigner.
              </p>
              <blockquote className="border-l-4 border-[#3899aa] pl-4 italic text-[#475569] text-sm">
                &ldquo;On a créé l&apos;outil qu&apos;on aurait voulu avoir dès notre première année d&apos;installation. Un assistant qui connaît notre métier.&rdquo;
              </blockquote>
            </div>

            <div className="rounded-2xl p-8" style={{ border: "1px solid #d4ecea" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0f172a]">{FOUNDER_2_NAME}</h3>
                  <p className="text-[#3899aa] font-medium text-sm">Co-fondateur · Kinésithérapeute D.E.</p>
                </div>
                {FOUNDER_2_LINKEDIN && (
                  <a href={FOUNDER_2_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-xs text-[#3899aa] font-semibold hover:underline">
                    LinkedIn →
                  </a>
                )}
              </div>
              <p className="text-[#475569] leading-relaxed mb-4">
                Kinésithérapeute libéral, Valentin pilote le développement produit de MAK. Son ancrage dans la pratique clinique quotidienne guide chaque décision produit : si ce n&apos;est pas utile au cabinet, ça n&apos;entre pas dans MAK.
              </p>
              <blockquote className="border-l-4 border-[#3899aa] pl-4 italic text-[#475569] text-sm">
                &ldquo;On ne construit pas des features. On résout des problèmes réels que nos collègues kinés rencontrent chaque jour.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Notre engagement */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-8">Notre approche clinique &amp; notre engagement</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #d4ecea" }}>
              <h3 className="font-bold text-[#0f172a] mb-4">Ce qu&apos;on ne fera jamais :</h3>
              <ul className="space-y-3">
                {WONT_DO.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                    <span className="text-[#ef4444] font-bold shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #d4ecea" }}>
              <h3 className="font-bold text-[#0f172a] mb-4">Ce qu&apos;on s&apos;engage à faire :</h3>
              <ul className="space-y-3">
                {WILL_DO.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#475569]">
                    <span className="text-[#3899aa] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & CTA */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Une question ? Une idée ?</h2>
          <p className="text-[#475569] mb-2">Vous êtes kiné et vous voulez contribuer à l&apos;évolution de MAK ?</p>
          <a href="mailto:contact@monassistantkine.fr" className="text-[#3899aa] font-semibold hover:underline block mb-8">
            contact@monassistantkine.fr
          </a>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base transition-all hover:scale-[1.02]"
          >
            Rejoindre Mon Assistant Kiné gratuitement <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-[#94a3b8] mt-3">Ou découvrez <Link href="/tarifs" className="text-[#3899aa] hover:underline">nos formules →</Link></p>
        </div>
      </section>

      <Footer />
    </>
  );
}
