import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Suivi patient et programme d'exercices à domicile | Mon Assistant Kiné",
  description: "Créez des programmes d'exercices personnalisés envoyés sur WhatsApp avec vidéos. Le patient valide ses séances, vous suivez tout sur votre dashboard. Chatbot guidé par votre protocole.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites/suivi-patient" },
  openGraph: {
    title: "Suivi patient à domicile | Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/fonctionnalites/suivi-patient",
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
  "description": "Suivi patient kinésithérapie à domicile : programmes WhatsApp, chatbot guidé, dashboard compliance.",
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const STEPS = [
  {
    icon: "📋",
    title: "Crée le programme en quelques minutes",
    body: "Définis les exercices depuis la bibliothèque Mon Assistant Kiné ou crées-en de nouveaux. Pour chaque exercice : séries, répétitions, fréquences, consignes personnalisées. Mon Assistant Kiné génère le programme complet avec des vidéos démonstratives associées automatiquement.",
  },
  {
    icon: "📱",
    title: "Le patient reçoit tout sur WhatsApp",
    body: "Pas d'application à télécharger. Pas de compte à créer. Le patient reçoit son programme directement sur WhatsApp — l'outil qu'il utilise déjà.",
  },
  {
    icon: "🤖",
    title: "Le chatbot répond à ta place — selon ton protocole",
    body: "Le patient a une question ? Le chatbot Mon Assistant Kiné répond en respectant strictement le protocole de soin que tu as défini. Pas d'improvisation, pas d'informations contradictoires.",
  },
  {
    icon: "📊",
    title: "Tu suis tout sur ton dashboard",
    body: "Séances validées, niveau de douleur déclaré, niveau de difficulté perçu, signalements du patient. Tout est visible en temps réel. Tu interviens quand c'est nécessaire.",
  },
];

const STATS = [
  { icon: "📱", value: "Via WhatsApp", label: "aucune installation requise pour le patient" },
  { icon: "🎥", value: "Vidéos incluses", label: "chaque exercice illustré" },
  { icon: "🤖", value: "Chatbot guidé", label: "répond selon ton protocole, jamais au-delà" },
  { icon: "📊", value: "Dashboard temps réel", label: "douleur, compliance, signalements" },
];

const FAQ = [
  {
    q: "Le patient doit-il créer un compte ?",
    a: "Non. Tout passe par WhatsApp. Le patient n'a besoin que de son téléphone.",
  },
  {
    q: "Je peux personnaliser les vidéos ?",
    a: "Mon Assistant Kiné intègre une bibliothèque de vidéos démonstratives associées automatiquement à chaque exercice. Tu peux créer tes propres exercices avec tes propres vidéos depuis ton espace.",
  },
  {
    q: "Le chatbot peut-il donner des informations médicales au patient ?",
    a: "Non. Le chatbot répond uniquement dans le cadre du protocole que tu as défini. Il ne sort jamais de ce cadre.",
  },
];

export default function SuiviPatientPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">Fonctionnalité</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Tes patients continuent leur rééducation à domicile.<br />
            <span className="text-[#3899aa]">Tu gardes le contrôle.</span>
          </h1>
          <p className="text-lg text-[#475569] mb-8 max-w-2xl mx-auto leading-relaxed">
            Programme d&apos;exercices personnalisé envoyé sur WhatsApp. Le patient suit, valide, pose ses questions. Tu vois tout. Sans appel, sans SMS, sans improvisation.
          </p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#3899aa]/25"
          >
            Essayer 14 jours — sans CB <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Problème */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Le problème</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Entre deux séances, que fait ton patient ?</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            Il oublie les exercices. Il les fait mal. Il a une question mais n&apos;ose pas appeler. Ou il appelle au mauvais moment.
          </p>
          <p className="text-[#475569] leading-relaxed">
            La rééducation ne se passe pas qu&apos;au cabinet. Mais jusqu&apos;ici, tout ce qui se passait entre les séances t&apos;échappait complètement.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">La solution</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-10">Le fil conducteur entre le cabinet et le domicile.</h2>
          <div className="space-y-6">
            {STEPS.map((s) => (
              <div key={s.title} className="flex gap-5 items-start p-6 rounded-2xl" style={{ border: "1px solid #d4ecea" }}>
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-2">{s.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{s.body}</p>
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
              src="/chatbot.png"
              alt="Capture d'écran du suivi patient WhatsApp et programme d'exercices de Mon Assistant Kiné"
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

      {/* Différenciation */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Pourquoi Mon Assistant Kiné</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Pas un simple envoi de PDF. Un vrai outil de suivi.</h2>
          <p className="text-[#475569] leading-relaxed">
            Envoyer un PDF d&apos;exercices par mail, tout le monde peut le faire. Ce que Mon Assistant Kiné apporte en plus : la validation des séances, le suivi de la douleur, le chatbot guidé par ton protocole, et le dashboard qui te donne une vue complète de la compliance de chaque patient. La rééducation à domicile devient traçable, interactive, et contrôlée.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-6" style={{ border: "1px solid #d4ecea" }}>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Essayer le suivi patient — 14 jours gratuits</h2>
          <p className="text-white/80 mb-8">14 jours d&apos;essai · Sans carte bancaire · Accès immédiat</p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
          >
            Commencer — 14 jours d&apos;essai gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
