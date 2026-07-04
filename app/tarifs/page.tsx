import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Zap, ArrowRight } from "lucide-react";
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
    a: "Crée ton compte gratuitement, sans carte bancaire : fais un bilan complet, pose tes questions au copilote, et fais-toi ton avis avant de choisir.",
    // TODO-FONDATEUR: préciser les limites exactes de l'essai (nombre de bilans/questions offerts) pour affichage transparent
  },
  {
    q: "Y a-t-il un engagement de durée ?",
    a: "Aucun. Toutes les formules sont sans engagement et résiliables à tout moment depuis ton espace personnel.",
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

      {/* Étage 1 — Offre Pionnier */}
      <section className="py-10 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-7 sm:p-9 relative overflow-hidden"
            style={{ background: "#0f172a", border: "2px solid #3899aa", boxShadow: "0 8px 40px rgba(56,153,170,0.2)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(56,153,170,0.18) 0%, transparent 70%)" }} />

            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-bold">
                    <Zap className="w-3 h-3" />
                    Les 100 premiers seulement
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Les 100 premiers kinés verrouillent tout à {PRICE_PIONNIER}€/mois. À vie.
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Accès complet à tous les modules, prix garanti à vie, sans engagement, badge fondateur.
                  Quand les 100 places sont prises, cette offre disparaît définitivement.
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                  {PIONNIER_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-white/85 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0 text-center">
                <div className="inline-block rounded-2xl p-6 mb-4"
                  style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}>
                  <div className="text-5xl font-bold text-white">{PRICE_PIONNIER}€</div>
                  <div className="text-white/50 text-sm">/mois · à vie</div>
                  <div className="text-[#3899aa] text-xs font-semibold mt-1">au lieu de 49€/mois</div>
                </div>
                <Link
                  href={CTA_SIGNUP_URL}
                  className="block w-full text-center py-3.5 px-6 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
                >
                  {CTA_MAIN}
                </Link>
                <p className="text-white/40 text-xs mt-2">Sans engagement · Résiliable à tout moment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Étage 2 — Grille standard */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#64748b] text-sm font-semibold text-center mb-7">Les tarifs après les 100 premiers :</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
            {PLANS_STANDARD.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 flex flex-col bg-white"
                style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div className="mb-5">
                  <h2 className="text-sm font-bold text-[#0f172a] mb-1">{plan.name}</h2>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-[#0f172a]">{plan.price}€</span>
                    <span className="text-[#94a3b8] text-sm">/mois</span>
                  </div>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#d4ecea]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={CTA_SIGNUP_URL}
                  className="w-full text-center block py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] border border-[#d4ecea] text-[#64748b] hover:bg-[#eef7f6] hover:text-[#3899aa]"
                >
                  Commencer
                </Link>
              </div>
            ))}
          </div>
          <p className="text-[#94a3b8] text-xs text-center mt-6">Sans engagement · Résiliable à tout moment</p>

          {/* Bandeau contrats gratuits */}
          <div className="flex items-center gap-4 rounded-2xl px-6 py-4 mt-6" style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
            <span className="text-2xl shrink-0">📑</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#15803d]">Module Contrats de remplacement — 100 % gratuit</p>
              <p className="text-xs text-[#166534] mt-0.5 leading-relaxed">
                Signature électronique, invitation par lien, déclaration Ordre en 1 clic, archivage automatique.
                Offert à toute la communauté des kinés libéraux — abonné ou non, sans limite de durée.
              </p>
            </div>
            <Link href="/fonctionnalites/contrats-remplacement" className="shrink-0 text-xs font-semibold text-[#15803d] hover:text-[#166534] transition-colors whitespace-nowrap">
              En savoir plus →
            </Link>
          </div>
        </div>
      </section>

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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Essayer Mon Assistant Kiné gratuitement</h2>
          <p className="text-white/80 mb-4">Sans carte bancaire · Accès immédiat · Sans engagement</p>
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
