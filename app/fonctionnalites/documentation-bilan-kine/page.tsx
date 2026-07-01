import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Documentation bilan kiné automatisée | Mon Assistant Kiné",
  description: "Générez vos bilans kinésithérapiques conformes NGAP en quelques minutes. Saisie libre, templates personnalisables, export PDF ou envoi mail en un clic. Essai gratuit.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites/documentation-bilan-kine" },
  openGraph: {
    title: "Documentation bilan kiné automatisée | Mon Assistant Kiné",
    description: "Générez vos bilans kinésithérapiques conformes NGAP en quelques minutes.",
    url: "https://www.monassistantkine.fr/fonctionnalites/documentation-bilan-kine",
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
  "description": "Génère des bilans kinésithérapiques conformes NGAP en 2 minutes grâce à l'IA.",
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const STATS = [
  { icon: "⏱", value: "2 minutes", label: "temps moyen pour un bilan complet" },
  { icon: "📄", value: "Conforme NGAP", label: "validé par des kinés praticiens" },
  { icon: "🔧", value: "Templates", label: "personnalisables selon ta spécialité" },
  { icon: "📨", value: "Envoi 1 clic", label: "directement depuis MAK" },
];

const STEPS = [
  {
    n: "01",
    title: "Saisis tes données comme tu veux",
    body: "Dicte tes notes à voix haute, tape en texte libre, ou remplis un template pré-structuré. Entre tes mesures précises (testing musculaire, bilan articulaire, scores fonctionnels) dans les champs dédiés. Les templates sont entièrement personnalisables selon ta pratique.",
  },
  {
    n: "02",
    title: "L'IA structure et met en conformité",
    body: "MAK traite l'ensemble de tes données et génère un document structuré, conforme aux exigences NGAP et aux attentes de l'Assurance Maladie. Format professionnel, terminologie clinique exacte, structure attendue par tes correspondants médicaux.",
  },
  {
    n: "03",
    title: "Tu relis, tu envoies",
    body: "Exporte en PDF en un clic. Envoie directement par mail à ton correspondant médical depuis l'interface. Zéro copier-coller. Zéro reformatage.",
  },
];

const FAQ = [
  {
    q: "Le document généré est-il vraiment conforme NGAP ?",
    a: "Oui. La structure et la terminologie sont basées sur les exigences NGAP et les retours de kinésithérapeutes praticiens. Tu restes responsable du contenu clinique — MAK gère la forme.",
  },
  {
    q: "Je peux personnaliser les templates selon ma spécialité ?",
    a: "Oui. MAK propose des templates de base (MSK, neurologique, respiratoire, sportif, pédiatrique) que tu peux modifier et enregistrer selon ta pratique.",
  },
  {
    q: "Mes données patients sont-elles sécurisées ?",
    a: "MAK respecte le RGPD et les recommandations de la CNIL pour le traitement de données de santé. Tes données ne sont jamais revendues ni utilisées pour entraîner des modèles tiers.",
  },
];

export default function DocumentationBilanPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">Fonctionnalité</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Tes bilans kinésithérapiques en 2 minutes.<br />
            <span className="text-[#3899aa]">Conformes NGAP. Prêts à envoyer.</span>
          </h1>
          <p className="text-lg text-[#475569] mb-8 max-w-2xl mx-auto leading-relaxed">
            Dicte tes notes, remplis ton template, laisse l&apos;IA structurer. Tu relis, tu envoies. C&apos;est tout.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://monassistantkine.vercel.app/signup"
              className="inline-flex items-center justify-center gap-2 bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#3899aa]/25"
            >
              Créer mon compte gratuitement <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/replay"
              className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-[#d4ecea] text-[#3899aa] font-medium hover:bg-[#eef7f6] transition-all"
            >
              Voir une démo
            </Link>
          </div>
        </div>
      </section>

      {/* Problème */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Le problème</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Combien de temps tu perds à documenter ce soir ?</h2>
          <p className="text-[#475569] mb-6">Un kiné libéral passe en moyenne <strong className="text-[#0f172a]">45 à 60 minutes par jour</strong> sur la documentation clinique. Soit :</p>
          <ul className="space-y-3 mb-6">
            {["4 heures par semaine", "16 heures par mois", "192 heures par an"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#475569]">
                <CheckCircle2 className="w-4 h-4 text-[#3899aa] shrink-0" />
                <span className={i === 2 ? "font-bold text-[#0f172a]" : ""}>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#475569]">192 heures que tu ne passes pas avec tes patients. Ni avec ta famille. Ce n&apos;est pas une fatalité. C&apos;est un problème d&apos;outil.</p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-10">Comment MAK génère ton bilan</h2>
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

      {/* Screenshot */}
      <section className="py-10 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #d4ecea", boxShadow: "0 4px 24px rgba(56,153,170,0.08)" }}>
            <Image
              src="/screenshots/bilan.png"
              alt="Capture d'écran du module de documentation bilan kinésithérapique de Mon Assistant Kiné"
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
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Pourquoi MAK</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Pas un outil générique. Un outil kiné.</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            ChatGPT ne sait pas ce qu&apos;est un testing musculaire coté de 0 à 5. Il ne connaît pas la structure d&apos;un bilan kinésithérapique conforme NGAP. Il te donnera un texte qu&apos;il faudra entièrement reformater.
          </p>
          <p className="text-[#475569] leading-relaxed">
            MAK a été conçu par des kinésithérapeutes libéraux. Chaque champ, chaque template, chaque formulation a été pensé pour correspondre exactement à ce qu&apos;on attend d&apos;un bilan professionnel en France.
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Commencer gratuitement</h2>
          <p className="text-white/80 mb-8">0€, sans carte bancaire</p>
          <Link
            href="https://monassistantkine.vercel.app/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
          >
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
