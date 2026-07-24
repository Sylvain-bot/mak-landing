import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";
import {
  CTA_SIGNUP_URL,
  CTA_MAIN,
  COMPLIANCE_CLAIM,
  PRICE_PIONNIER,
  PRICE_DECOUVERTE,
  PRICE_PRATIQUE,
  PRICE_EXPERT,
} from "@/lib/claims";


export const metadata: Metadata = {
  title: "Tarifs Mon Assistant Kiné — À partir de 9€/mois",
  description: "Offre Pionnier : accès complet à vie à 19€/mois pour les 100 premiers kinés. Plans standards à partir de 9€/mois. Sans engagement, résiliable à tout moment.",
  alternates: { canonical: "https://www.monassistantkine.fr/tarifs" },
  openGraph: {
    title: "Tarifs Mon Assistant Kiné | À partir de 9€/mois",
    description: "Offre Pionnier réservée aux 100 premiers : accès complet à vie à 19€/mois. Sans engagement.",
    url: "https://www.monassistantkine.fr/tarifs",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Mon Assistant Kiné",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "url": "https://www.monassistantkine.fr",
  "offers": [
    { "@type": "Offer", "name": "Découverte", "price": PRICE_DECOUVERTE, "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Pionnier", "price": PRICE_PIONNIER, "priceCurrency": "EUR", "description": "Prix bloqué à vie pour les 100 premiers" },
    { "@type": "Offer", "name": "Pratique", "price": PRICE_PRATIQUE, "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Expert", "price": PRICE_EXPERT, "priceCurrency": "EUR" },
  ],
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const PIONNIER_FEATURES = [
  "Programmes illimités",
  "Copilote IA Kiné — usage illimité",
  "Module Administratif",
  "Bilan kiné conforme NGAP",
  "Suivi patient WhatsApp",
  "Communauté privée fondateurs",
  "Badge Pionnier exclusif",
];

const PLANS_STANDARD = [
  {
    name: "Découverte",
    price: PRICE_DECOUVERTE,
    description: "Pour découvrir l'IA au cabinet sans engagement",
    features: ["1 programme max", "Copilote IA Kiné — usage découverte"],
  },
  {
    name: "Pratique",
    price: PRICE_PRATIQUE,
    description: "Pour les kinés qui veulent aller plus loin",
    features: ["5 programmes max", "Copilote IA Kiné — usage standard", "Bilan kiné", "Suivi patient WhatsApp"],
  },
  {
    name: "Expert",
    price: PRICE_EXPERT,
    description: "Accès complet, tous modules",
    features: ["Programmes illimités", "Accès complet tous modules"],
  },
];

const INCLUDED = [
  { icon: "📋", label: "Bilans NGAP conformes", desc: "Générés en 3 minutes" },
  { icon: "📚", label: "56 000+ ressources EBP", desc: "PubMed, PEDro, Cleland" },
  { icon: "💬", label: "Suivi patient WhatsApp", desc: "Sans appli à installer" },
  { icon: "📨", label: "Gestion administrative", desc: "Templates + envoi direct" },
  { icon: "🧠", label: "Aide à la décision", desc: "Hypothèses + drapeaux rouges" },
];

const FAQ_ITEMS = [
  {
    q: "L'offre Pionnier est-elle vraiment à vie ?",
    a: "Oui. Les 100 premiers inscrits bénéficient du tarif 19€/mois garanti à vie, même lorsque Mon Assistant Kiné évoluera vers des tarifs supérieurs. C'est notre façon de remercier les kinés qui nous font confiance dès le départ.",
  },
  {
    q: "Que se passe-t-il après les 100 premiers ?",
    a: "Les inscrits Pionnier gardent leur tarif 19€/mois à vie — il ne bougera jamais. Les kinés qui s'inscrivent après passent sur la grille standard (Découverte 9€ / Pratique 29€ / Expert 49€).",
  },
  {
    q: "Comment fonctionne l'essai gratuit ?",
    a: "Tu bénéficies de 14 jours d'essai complet, sans carte bancaire. Fais des bilans, utilise le copilote, explore toutes les fonctionnalités — et fais-toi ton avis avant de choisir. À l'issue des 14 jours, tu choisis ta formule ou tu ne paies rien.",
    // TODO-FONDATEUR: préciser les limites exactes de l'essai (nombre de bilans/questions offerts) pour affichage transparent
  },
  {
    q: "Comment fonctionne l'aide FAMI avec Mon Assistant Kiné ?",
    a: "Mon Assistant Kiné inclut un module de vidéotransmission sécurisée qui rend ton cabinet éligible à un indicateur du FAMI (Forfait d'Aide à la Modernisation et à l'Informatisation de la CNAM). Concrètement : tu t'abonnes et utilises la vidéotransmission en 2026, tu déclares sur Amelipro en janvier-mars 2027, tu touches jusqu'à 350 €/an de ta CPAM au printemps 2027. Cette aide est indépendante du mode de paiement choisi (mensuel ou annuel).",
  },
  {
    q: "Si je m'abonne en fin d'année, suis-je éligible au FAMI tout de suite ?",
    a: "Pas pour l'année en cours. L'éligibilité se base sur l'année d'équipement : un abonnement souscrit en décembre 2026 ne représente pas une année complète d'équipement 2026. Tu pourras déclarer au titre de 2027 (en janvier-mars 2028) et toucher l'aide au printemps 2028. Mieux vaut s'abonner tôt dans l'année pour que l'équipement soit effectif sur toute la période.",
  },
  {
    q: "Quelle est la différence entre l'offre mensuelle et l'offre annuelle ?",
    a: "C'est exactement la même app avec les mêmes modules (bilans, copilote, suivi patient, admin, vidéotransmission, contrats). La différence est uniquement le rythme de facturation : le mensuel est sans engagement, résiliable à tout moment ; l'annuel engage sur 12 mois payés en une fois, à un tarif inférieur. Le FAMI s'applique dans les deux cas.",
  },
  {
    q: "Y a-t-il un engagement de durée ?",
    a: "Pour les formules mensuelles : aucun engagement, résiliable à tout moment. Pour les formules annuelles : engagement de 12 mois, paiement en une fois.",
  },
  {
    q: "Puis-je changer de formule en cours de route ?",
    a: "Oui. Tu peux monter ou descendre de formule à tout moment. Le changement prend effet à la prochaine période de facturation.",
  },
  {
    q: "Mon Assistant Kiné remplace-t-il mon logiciel de gestion de cabinet ?",
    a: "Non. Mon Assistant Kiné complète ton logiciel de gestion (agenda, facturation, télétransmission) — il ne le remplace pas. Mon Assistant Kiné couvre la partie clinique, documentaire et le suivi entre séances.",
  },
  {
    q: "Les données de mes patients sont-elles sécurisées ?",
    a: `Oui. ${COMPLIANCE_CLAIM}. Les données patients ne sont jamais utilisées pour entraîner des modèles IA tiers.`,
  },
  {
    q: "Comment vous contacter ?",
    a: "Par mail à sylvain@monassistantkine.fr. Sylvain répond personnellement et rapidement.",
  },
];

export default function TarifsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">Tarifs</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Simple, transparent.<br />
            <span className="text-[#3899aa]">Sans surprise.</span>
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Choisis la formule adaptée à ta pratique. Sans engagement, résiliable à tout moment.
          </p>
        </div>
      </section>

      {/* Grille tarifaire avec toggle mensuel / annuel */}
      <Pricing />

      {/* Ce qui est inclus */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8 text-center">Ce que tu obtiens avec Mon Assistant Kiné</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {INCLUDED.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 text-center" style={{ border: "1px solid #d4ecea" }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-[#0f172a] text-sm mb-1">{item.label}</div>
                <div className="text-xs text-[#94a3b8] leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#475569] mt-6">
            Conçu par des kinésithérapeutes libéraux praticiens.{" "}
            <Link href="/equipe" className="text-[#3899aa] hover:underline">Découvrir l&apos;équipe →</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="rounded-2xl p-6" style={{ background: "#f0f9fa", border: "1px solid #d4ecea" }}>
                <h3 className="font-semibold text-[#0f172a] mb-2">{item.q}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#3899aa" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Essayer Mon Assistant Kiné — 14 jours gratuits</h2>
          <p className="text-white/80 mb-4">14 jours d&apos;essai · Sans carte bancaire · Sans engagement</p>
          <Link
            href={CTA_SIGNUP_URL}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02] mb-4"
          >
            {CTA_MAIN} <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-white/60 mt-4">
            Une question ?{" "}
            <a href="mailto:sylvain@monassistantkine.fr" className="underline hover:text-white">
              sylvain@monassistantkine.fr
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
