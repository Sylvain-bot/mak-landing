import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Copilote IA Kiné — Clinique & Bibliographique | Mon Assistant Kiné",
  description: "Pose ta question comme à un confrère. Le copilote IA détecte automatiquement si elle est clinique ou bibliographique — drapeaux rouges, hypothèses, 56 000+ études en 30 secondes.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites/aide-decision-clinique" },
  openGraph: {
    title: "Copilote IA Kiné | Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/fonctionnalites/aide-decision-clinique",
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
  "offers": { "@type": "Offer", "price": "19", "priceCurrency": "EUR" },
  "description": "Copilote IA pour kinésithérapeutes : aide à la décision clinique et recherche bibliographique EBP unifiées en un seul module intelligent.",
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const CAPABILITIES = [
  {
    icon: "🎯",
    label: "Aide à la décision clinique",
    desc: "Hypothèses diagnostiques, tests cliniques (Cleland), drapeaux rouges — pour les cas complexes ou les doutes en séance",
  },
  {
    icon: "📚",
    label: "Recherche bibliographique EBP",
    desc: "56 000+ études PubMed & PEDro — résumé clinique pratique en 30 secondes, sources citées et cliquables",
  },
  {
    icon: "🔀",
    label: "Détection automatique du besoin",
    desc: "Tu poses ta question en langage libre — l'IA identifie si elle est clinique, bibliographique ou pratique et mobilise l'expertise adaptée",
  },
  {
    icon: "💬",
    label: "Questions pratiques du quotidien",
    desc: "Posologie, anatomie, conseils patients, rappels de protocole — le Copilote répond aussi aux questions simples, sans changer d'outil.",
  },
  {
    icon: "🇪🇺",
    label: "IA européenne — Mistral",
    desc: "Propulsé par Mistral, technologie française de rang mondial. Données hébergées en Europe, conformité RGPD.",
  },
];

const USE_CASES = [
  { type: "Clinique", ex: "Patient 35 ans, douleur latérale 5e métatarse après un match de football — fracture de stress ou entorse ?" },
  { type: "Clinique", ex: "Patient 68 ans, lombalgie nouvelle sous anticoagulants avec légère fièvre — quel drapeau rouge investiguer ?" },
  { type: "Clinique", ex: "Patient 45 ans, cervicalgie irradiant C6-C7, aucune amélioration après 4 séances — réévaluer le diagnostic ?" },
  { type: "Bibliographique", ex: "\"Efficacité de la thérapie manuelle sur la cervicalgie chronique\"" },
  { type: "Bibliographique", ex: "\"Protocole de rééducation LCA post-op — semaine 6\"" },
  { type: "Bibliographique", ex: "\"Ondes de choc tendinopathie d'Achille — niveau de preuve 2024\"" },
  { type: "Pratique", ex: "Quelle est la durée recommandée d'immobilisation après une entorse cheville grade 2 ?" },
  { type: "Pratique", ex: "Comment expliquer simplement une tendinopathie à un patient ?" },
];

const STATS = [
  { icon: "📚", value: "56 000+", label: "études cliniques intégrées (PubMed, PEDro)" },
  { icon: "⚡", value: "30 secondes", label: "temps moyen de réponse" },
  { icon: "🇪🇺", value: "Mistral", label: "IA européenne, données hébergées en Europe" },
  { icon: "🔗", value: "Sources citées", label: "accès direct à l'étude originale" },
];

const FAQ = [
  {
    q: "Comment l'IA sait-elle si ma question est clinique ou bibliographique ?",
    a: "Elle analyse le contexte de ta question en temps réel. Une question sur des symptômes, des tests ou un drapeau rouge déclenche l'expertise clinique. Une question sur l'efficacité d'un protocole ou une pathologie déclenche la recherche bibliographique. Tu n'as rien à sélectionner.",
  },
  {
    q: "C'est un diagnostic différentiel automatisé ?",
    a: "Non. MAK propose des hypothèses et des tests — pas un diagnostic. La démarche diagnostique reste ta responsabilité en tant que praticien. MAK est un second regard, pas un remplaçant.",
  },
  {
    q: "Les sources bibliographiques sont vérifiables ?",
    a: "Oui. Chaque source est citée avec un lien direct vers l'article original sur PubMed ou PEDro. MAK ne cite que des sources réelles — pas d'hallucinations comme avec les LLM généralistes.",
  },
  {
    q: "Pourquoi Mistral plutôt qu'une IA américaine ?",
    a: "Mistral est un modèle de rang mondial, fondé en France, dont les données sont hébergées en Europe. Pour des professionnels de santé traitant des données cliniques sensibles, c'est une garantie supplémentaire de conformité RGPD et de souveraineté des données.",
  },
  {
    q: "Je peux lui poser des questions simples, pas forcément cliniques ?",
    a: "Oui. Le Copilote gère aussi les questions pratiques du quotidien : posologie, durée d'immobilisation, anatomie, comment expliquer un diagnostic à un patient. Tu n'as pas à changer d'outil — pose ta question en langage naturel, l'IA s'adapte.",
  },
  {
    q: "Je peux l'utiliser en cours de séance ?",
    a: "Oui. L'interface est rapide — tu décris le tableau en 2 minutes et obtiens une orientation structurée en quelques secondes. Conçu pour s'intégrer dans le rythme réel du cabinet.",
  },
];

export default function CopiloteIAKinePage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ background: "#eef7f6", border: "1px solid #d4ecea", color: "#3899aa" }}>
            🇪🇺 Propulsé par Mistral — IA européenne
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Ton copilote IA kiné.<br />
            <span className="text-[#3899aa]">Clinique, bibliographique et pratique.</span>
          </h1>
          <p className="text-lg text-[#475569] mb-8 max-w-2xl mx-auto leading-relaxed">
            Pose ta question comme tu le ferais à un confrère. L&apos;IA identifie automatiquement si elle est clinique, bibliographique ou pratique — et mobilise l&apos;expertise adaptée en quelques secondes.
          </p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#3899aa]/25"
          >
            Essayer gratuitement <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Problème */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Le problème</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">En libéral, tu cherches seul — et ça prend du temps.</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            Un tableau clinique complexe ? Tu cherches dans ta tête, dans tes cours, sur internet. Une question bibliographique ? Tu ouvres PubMed, tu tapes une requête en anglais, tu lis des abstracts, tu traduis mentalement en langage clinique pratique. Facilement 30 minutes pour une réponse partielle.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Résultat : on arrête de chercher. On fait confiance à ce qu&apos;on sait déjà. Et la pratique stagne.
          </p>
        </div>
      </section>

      {/* Capacités */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">La solution</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-3">Un copilote qui comprend le contexte.</h2>
          <p className="text-[#475569] mb-10 leading-relaxed">
            Tu poses ta question en langage naturel. Le copilote détecte le besoin et mobilise l&apos;expertise adéquate — sans que tu aies à naviguer entre des modules séparés.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {CAPABILITIES.map((c) => (
              <div key={c.label} className="flex gap-4 items-start p-6 rounded-2xl" style={{ background: "#f0f9fa", border: "1px solid #d4ecea" }}>
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div>
                  <div className="font-semibold text-[#0f172a] mb-1.5">{c.label}</div>
                  <div className="text-sm text-[#475569] leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot */}
      <section className="py-10 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #d4ecea", boxShadow: "0 4px 24px rgba(56,153,170,0.08)" }}>
            <Image
              src="/copilote-ia-kine.png"
              alt="Capture d'écran du Copilote IA Kiné de Mon Assistant Kiné — aide à la décision clinique et recherche bibliographique"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.value} className="bg-white rounded-2xl p-5 text-center" style={{ border: "1px solid #d4ecea" }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-bold text-[#3899aa] text-sm mb-1">{s.value}</div>
                <div className="text-xs text-[#94a3b8] leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas d'usage */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Quelques exemples de questions</h2>
          <div className="space-y-3">
            {USE_CASES.map((uc, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4" style={{ border: "1px solid #d4ecea" }}>
                <span className="text-xs font-semibold px-2 py-1 rounded-full shrink-0 mt-0.5"
                  style={uc.type === "Clinique"
                    ? { background: "#eef7f6", color: "#3899aa", border: "1px solid #d4ecea" }
                    : uc.type === "Bibliographique"
                    ? { background: "#f0fdf4", color: "#15803d", border: "1px solid #86efac" }
                    : { background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe" }
                  }>
                  {uc.type}
                </span>
                <span className="text-[#475569] text-sm italic">{uc.ex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Différenciation Mistral */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Pourquoi Mistral</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Une IA européenne pour des données de santé.</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            MAK est propulsé par Mistral — le modèle de langage fondé en France, de rang mondial, dont les infrastructures sont hébergées en Europe. Pour des professionnels de santé qui manipulent des données cliniques sensibles, c&apos;est une garantie concrète : conformité RGPD, souveraineté des données, aucune fuite vers des serveurs hors UE.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Contrairement aux LLM généralistes comme ChatGPT, MAK ne cite que des sources réelles et vérifiables. Les hallucinations — inventer une étude qui n&apos;existe pas — ne sont pas acceptables en contexte clinique. Chaque référence bibliographique est cliquable et pointe vers l&apos;article original sur PubMed ou PEDro.
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Essayer le copilote IA gratuitement</h2>
          <p className="text-white/80 mb-8">Sans carte bancaire · Accès immédiat · IA européenne</p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
          >
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
