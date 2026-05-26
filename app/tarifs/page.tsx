import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs Mon Assistant Kiné 2025 — À partir de 9€/mois",
  description: "Découvrez les formules Mon Assistant Kiné : Déclic 9€, Pratique 29€, Pionnier 19€ (offre limitée 100 kinés), Expert 49€. Sans engagement, résiliable à tout moment.",
  alternates: { canonical: "https://www.monassistantkine.fr/tarifs" },
  openGraph: {
    title: "Tarifs Mon Assistant Kiné | À partir de 9€/mois",
    description: "Offre Pionnier réservée aux 100 premiers : accès complet à vie à 19€/mois. Sans engagement.",
    url: "https://www.monassistantkine.fr/tarifs",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Mon Assistant Kiné",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "url": "https://www.monassistantkine.fr",
  "offers": [
    {
      "@type": "Offer",
      "name": "Déclic",
      "price": "9",
      "priceCurrency": "EUR",
      "description": "Pour découvrir l'IA au cabinet sans engagement — 1 programme max, Gestion patients, IA Conversationnelle",
    },
    {
      "@type": "Offer",
      "name": "Pionnier",
      "price": "19",
      "priceCurrency": "EUR",
      "description": "Prix bloqué à vie pour les 100 premiers — Programmes illimités, tous modules IA, Communauté privée fondateurs, Badge Pionnier",
    },
    {
      "@type": "Offer",
      "name": "Pratique",
      "price": "29",
      "priceCurrency": "EUR",
      "description": "Pour les kinés qui veulent aller plus loin — 5 programmes max, IA Conversationnelle, IA Bibliographique, IA Clinique, Bilan kiné",
    },
    {
      "@type": "Offer",
      "name": "Expert",
      "price": "49",
      "priceCurrency": "EUR",
      "description": "Accès complet, tous modules, programmes illimités",
    },
  ],
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const PLANS = [
  {
    name: "Déclic",
    price: "9",
    description: "Pour découvrir l'IA au cabinet sans engagement",
    features: ["1 programme max", "Gestion patients", "IA Conversationnelle"],
    highlighted: false,
    badge: null,
    cta: "Commencer",
  },
  {
    name: "Pratique",
    price: "29",
    description: "Pour les kinés qui veulent aller plus loin",
    features: [
      "5 programmes max",
      "IA Conversationnelle",
      "IA Bibliographique",
      "IA Clinique",
      "Bilan kiné",
    ],
    highlighted: false,
    badge: null,
    cta: "Commencer",
  },
  {
    name: "Pionnier",
    price: "19",
    description: "Prix bloqué à vie. Accès complet fondateurs.",
    features: [
      "Programmes illimités",
      "IA Conversationnelle",
      "IA Bibliographique",
      "IA Clinique",
      "IA Administrative",
      "Bilan kiné",
      "Communauté privée fondateurs",
      "Badge Pionnier exclusif",
    ],
    highlighted: true,
    badge: "Réservé aux 100 premiers",
    cta: "Rejoindre les fondateurs →",
  },
  {
    name: "Expert",
    price: "49",
    description: "Accès complet, tous modules",
    features: ["Programmes illimités", "Accès complet tous modules"],
    highlighted: false,
    badge: null,
    cta: "Commencer",
  },
];

const INCLUDED = [
  { icon: "📋", label: "Bilans NGAP conformes", desc: "Générés en 3 minutes" },
  { icon: "📚", label: "56 000+ ressources EBP", desc: "PubMed, PEDro, Cleland" },
  { icon: "💬", label: "Suivi patient WhatsApp", desc: "Sans appli à installer" },
  { icon: "📨", label: "Gestion administrative", desc: "Templates + envoi direct" },
  { icon: "🧠", label: "Aide à la décision", desc: "Hypothèses + drapeaux rouges" },
];

const FAQ = [
  {
    q: "L'offre Pionnier est-elle vraiment à vie ?",
    a: "Oui. Les 100 premiers inscrits bénéficient du tarif 19€/mois garanti à vie, même lorsque MAK évoluera vers des tarifs supérieurs. C'est notre façon de remercier les kinés qui nous font confiance dès le départ.",
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
    q: "MAK remplace-t-il mon logiciel de gestion de cabinet ?",
    a: "Non. MAK complète ton logiciel de gestion (agenda, facturation, télétransmission) — il ne le remplace pas. MAK couvre la partie clinique, documentaire et le suivi entre séances.",
  },
  {
    q: "Les données de mes patients sont-elles sécurisées ?",
    a: "Oui. MAK est conçu dans le respect du RGPD. Les données patients ne sont jamais utilisées pour entraîner des modèles IA tiers. Hébergement en Europe.",
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

      {/* Offre Pionnier highlight */}
      <section className="py-6 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-5 flex items-center gap-4" style={{ background: "#eef7f6", border: "1px solid #3899aa" }}>
            <span className="text-2xl shrink-0">⚡</span>
            <div>
              <p className="font-bold text-[#0f172a] text-sm">Offre Pionnier — places limitées</p>
              <p className="text-[#475569] text-sm">Rejoins les 100 premiers kinés et bloque ton tarif à 19€/mois à vie. Accès complet à tous les modules MAK, dès maintenant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 flex flex-col relative bg-white"
                style={plan.highlighted
                  ? { border: "2px solid #3899aa", boxShadow: "0 8px 28px rgba(56,153,170,0.15)" }
                  : { border: "1px solid #d4ecea", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
                }
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-semibold">
                      <Zap className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5 mt-2">
                  <h2
                    className="text-sm font-bold mb-1"
                    style={{ color: plan.highlighted ? "#3899aa" : "#0f172a" }}
                  >
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-[#0f172a]">{plan.price}€</span>
                    <span className="text-[#94a3b8] text-sm">/mois</span>
                  </div>
                  <p className="text-[#94a3b8] text-xs leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#475569]">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: plan.highlighted ? "#3899aa" : "#d4ecea" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://monassistantkine.vercel.app/signup"
                  className="w-full text-center block py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={plan.highlighted
                    ? { background: "#3899aa", color: "#fff" }
                    : { border: "1px solid #d4ecea", color: "#64748b" }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-[#94a3b8] text-xs text-center mt-6">Sans engagement · Résiliable à tout moment</p>
        </div>
      </section>

      {/* Ce qui est inclus dans tous les plans */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8 text-center">Ce que tu obtiens avec MAK</h2>
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
            {FAQ.map((item) => (
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
          <p className="text-white/80 mb-8">Sans carte bancaire · Accès immédiat · Sans engagement</p>
          <Link
            href="https://monassistantkine.vercel.app/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
          >
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-white/60 mt-3">
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
