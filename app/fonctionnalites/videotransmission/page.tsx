import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CTA_SIGNUP_URL } from "@/lib/claims";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Vidéotransmission sécurisée pour kinés | Éligible FAMI | Mon Assistant Kiné",
  description: "Réalisez vos téléconsultations de kinésithérapie depuis Mon Assistant Kiné. Module de vidéotransmission sécurisée éligible à l'aide FAMI de votre CPAM — jusqu'à 350 €/an.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites/videotransmission" },
  openGraph: {
    title: "Vidéotransmission pour kinésithérapeutes — Éligible aide FAMI | Mon Assistant Kiné",
    description: "Téléconsultations sécurisées intégrées à Mon Assistant Kiné. Éligible à l'aide FAMI (350 €/an versés par ta CPAM).",
    url: "https://www.monassistantkine.fr/fonctionnalites/videotransmission",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Mon Assistant Kiné — Module Vidéotransmission",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "url": "https://www.monassistantkine.fr",
  "offers": { "@type": "Offer", "price": "29", "priceCurrency": "EUR" },
  "description": "Module de vidéotransmission sécurisée pour kinésithérapeutes libéraux. Téléconsultations intégrées, bilan généré automatiquement, éligible à l'aide FAMI CPAM.",
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const STEPS = [
  {
    n: "01",
    title: "Lance la session depuis Mon Assistant Kiné",
    body: "Depuis ton espace, initie une session vidéo en un clic. Le patient reçoit un lien par SMS ou WhatsApp — aucun téléchargement, aucun compte à créer de son côté. La connexion est chiffrée de bout en bout.",
  },
  {
    n: "02",
    title: "Conduis ta consultation comme en présentiel",
    body: "L'interface intègre tes outils cliniques : accès à ton dossier patient, prise de notes en temps réel, dictée vocale. Tu peux partager des exercices ou des documents pendant la session.",
  },
  {
    n: "03",
    title: "Le compte-rendu est généré automatiquement",
    body: "À la fin de la session, Mon Assistant Kiné génère un compte-rendu structuré basé sur tes notes. Export PDF en 1 clic, envoi direct au médecin référent. Traçabilité complète dans le dossier patient.",
  },
];

const STATS = [
  { icon: "🔒", value: "Chiffré E2E", label: "données sécurisées, RGPD" },
  { icon: "📱", value: "Zéro install", label: "côté patient, lien direct" },
  { icon: "★", value: "Éligible FAMI", label: "350 €/an versés par ta CPAM" },
  { icon: "📄", value: "CR automatique", label: "généré à la fin de la session" },
];

const FAQ_ITEMS = [
  {
    q: "Le module vidéo est-il inclus dans tous les abonnements ?",
    a: "Le module vidéotransmission est disponible à partir de l'abonnement Pratique (29 €/mois). Il n'est pas inclus dans l'offre Découverte — c'est pour cela que l'offre Découverte n'est pas éligible à l'aide FAMI.",
  },
  {
    q: "En quoi ce module me rend-il éligible au FAMI ?",
    a: "Le Forfait d'Aide à la Modernisation et à l'Informatisation (FAMI) de l'Assurance Maladie comprend un critère d'équipement en solution de vidéotransmission sécurisée. S'équiper de Mon Assistant Kiné avec le module vidéo remplit ce critère. Tu déclares cet équipement chaque année sur Amelipro (janvier–mars) et ta CPAM te verse jusqu'à 350 €/an.",
  },
  {
    q: "Le patient doit-il s'inscrire quelque part ?",
    a: "Non. Le patient reçoit un lien par SMS ou WhatsApp et rejoint la session directement depuis son navigateur. Aucun téléchargement, aucun compte à créer.",
  },
  {
    q: "Les données de la téléconsultation sont-elles sécurisées ?",
    a: "Oui. La connexion vidéo est chiffrée de bout en bout. Les données ne sont pas stockées après la session (sauf le compte-rendu texte que tu as validé). Mon Assistant Kiné respecte le RGPD et les recommandations de la CNIL pour le traitement des données de santé.",
  },
];

export default function VideotransmissionPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="bg-white pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-bold"
            style={{ background: "#fef9ec", border: "1px solid #f0d080", color: "#92680a" }}>
            <span>★</span>
            <span>Nouveau · Éligible aide FAMI 350 €/an</span>
          </div>
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">Fonctionnalité</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Vidéotransmission sécurisée<br />
            <span className="text-[#3899aa]">intégrée à ton cabinet kiné.</span>
          </h1>
          <p className="text-lg text-[#475569] mb-8 max-w-2xl mx-auto leading-relaxed">
            Suivi post-opératoire, rééducation à distance, coordination de soins —
            directement depuis Mon Assistant Kiné. Sans installation pour le patient.
            Et ce module te rend{" "}
            <strong className="text-[#0f172a]">éligible à 350 €/an versés par ta CPAM</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={CTA_SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#3899aa]/25"
            >
              Essayer 14 jours <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#fami"
              className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-[#d4ecea] text-[#3899aa] font-medium hover:bg-[#eef7f6] transition-all"
            >
              Comprendre l&apos;aide FAMI →
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshot */}
      <section className="pb-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #d4ecea", boxShadow: "0 8px 40px rgba(56,153,170,0.1)" }}
          >
            <Image
              src="/videotransmission-kine.png"
              alt="Interface du module vidéotransmission de Mon Assistant Kiné — téléconsultation kinésithérapie"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
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

      {/* Comment ça marche */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-10">
            Une téléconsultation kiné en 3 étapes
          </h2>
          <div className="space-y-8">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-6 items-start">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#eef7f6] border border-[#d4ecea] flex items-center justify-center text-sm font-bold text-[#3899aa]">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-2">{s.title}</h3>
                  <p className="text-[#475569] leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloc FAMI dédié */}
      <section id="fami" className="py-20 px-4 sm:px-6" style={{ background: "#0f2229" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-bold"
            style={{ background: "rgba(232,176,77,0.15)", border: "1px solid rgba(232,176,77,0.4)", color: "#e8b04d" }}>
            <span>★</span>
            <span>Aide FAMI — Assurance Maladie</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 leading-snug">
            Ce module te rend éligible à<br />
            <span style={{ color: "#e8b04d" }}>350 €/an versés par ta CPAM.</span>
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Le Forfait d&apos;Aide à la Modernisation et à l&apos;Informatisation (FAMI) de l&apos;Assurance
            Maladie inclut un critère d&apos;équipement en{" "}
            <strong className="text-white/90">solution de vidéotransmission sécurisée</strong>.
            S&apos;abonner à Mon Assistant Kiné avec le module vidéo remplit ce critère. Tu déclares
            chaque année sur Amelipro (janvier–mars) et ta CPAM te verse jusqu&apos;à 350 €/an —
            sans avance de frais, sans dossier complexe.
          </p>

          {/* Calcul Pionnier annuel */}
          <div className="rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,176,77,0.25)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Exemple — Offre Pionnier annuel</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Abonnement Pionnier/an</span>
                <span className="text-white">199 €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Aide FAMI versée par ta CPAM</span>
                <span style={{ color: "#e8b04d" }}>+ 350 €</span>
              </div>
            </div>
            <div className="border-t pt-3" style={{ borderColor: "rgba(232,176,77,0.2)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">Tu gagnes</span>
                <span className="text-2xl font-bold" style={{ color: "#e8b04d" }}>+ 151 €/an</span>
              </div>
              <p className="text-xs text-white/40 mt-1">net chaque année, garanti à vie sur l&apos;Offre Pionnier</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={CTA_SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-lg text-sm font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "#e8b04d", color: "#0f2229" }}
            >
              Essayer 14 jours <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center justify-center h-12 px-6 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ border: "1px solid rgba(232,176,77,0.4)", color: "#e8b04d" }}
            >
              Voir les tarifs éligibles
            </Link>
          </div>

          <p className="text-white/30 text-xs mt-6 max-w-md mx-auto">
            Le FAMI est soumis à conditions. Les critères exacts varient selon les conventions
            et avenants en vigueur. Renseigne-toi auprès de ta CPAM ou de ton syndicat.
          </p>
        </div>
      </section>

      {/* Inclus dans les offres */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Tarifs</p>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Inclus dans quels abonnements ?</h2>
          <div className="space-y-3">
            {[
              {
                name: "Découverte · 9 €/mois",
                included: false,
                note: "Non éligible FAMI — module vidéo non inclus",
                color: "#94a3b8",
              },
              {
                name: "Pratique · 29 €/mois",
                included: true,
                note: "★ Module vidéo inclus · Éligible FAMI · Gratuit après aide CPAM",
                color: "#3899aa",
              },
              {
                name: "Expert · 49 €/mois",
                included: true,
                note: "★ Module vidéo inclus · Éligible FAMI · 19,83 €/mois réel après aide",
                color: "#3899aa",
              },
              {
                name: "Pionnier · 19 €/mois",
                included: true,
                note: "★ Module vidéo inclus · Éligible FAMI · Tu gagnes 122 €/an net",
                color: "#3899aa",
              },
            ].map((plan) => (
              <div key={plan.name}
                className="flex items-center gap-4 rounded-xl px-5 py-4"
                style={{ background: plan.included ? "#eef7f6" : "#f8fafc", border: `1px solid ${plan.included ? "#d4ecea" : "#e2e8f0"}` }}>
                <CheckCircle2
                  className="w-5 h-5 shrink-0"
                  style={{ color: plan.included ? "#3899aa" : "#cbd5e1" }}
                />
                <div>
                  <p className="text-sm font-semibold text-[#0f172a]">{plan.name}</p>
                  <p className="text-xs" style={{ color: plan.color }}>{plan.note}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/tarifs" className="text-sm font-semibold text-[#3899aa] underline hover:opacity-80">
              Voir tous les tarifs →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Essayer la vidéotransmission — 14 jours gratuits
          </h2>
          <p className="text-white/80 mb-8">
            Module inclus dès l&apos;offre Pratique · Accès immédiat
          </p>
          <Link
            href={CTA_SIGNUP_URL}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
          >
            Commencer — 14 jours d&apos;essai gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
