import type { Metadata } from "next";
import { ModuleHero } from "@/components/ModuleHero";
import { BilanComposition } from "@/components/BilanDemoVisual";
import { JsonLd } from "@/components/JsonLd";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bilan NGAP automatique — Enregistre ta séance | Mon Assistant Kiné",
  description: "Enregistre ta séance, Mon Assistant Kiné génère ton bilan kinésithérapique complet conforme NGAP en quelques secondes. Export PDF en 1 clic. Nouveau module Bilans.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites/documentation-bilan-kine" },
  openGraph: {
    title: "Documentation bilan kiné automatisée | Mon Assistant Kiné",
    description: "Génère tes bilans kiné conformes NGAP en quelques minutes.",
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
  "description": "Enregistre ta séance de kiné, Mon Assistant Kiné retranscrit et génère un bilan NGAP complet en quelques secondes. Export PDF en 1 clic.",
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const STATS = [
  { icon: "🎙", value: "1 tap", label: "pour lancer l'enregistrement de ta séance" },
  { icon: "⚡", value: "Quelques sec.", label: "pour générer le bilan NGAP complet" },
  { icon: "📄", value: "Conforme NGAP", label: "anamnèse, examen, diagnostic, objectifs, traitement" },
  { icon: "📥", value: "PDF 1 clic", label: "signable, prêt à archiver ou à transmettre" },
];

const STEPS = [
  {
    n: "01",
    title: "Tu lances l'enregistrement",
    body: "En un tap depuis ton téléphone, ta tablette ou ton ordinateur, directement dans le navigateur. Ta séance entière est captée en arrière-plan pendant que tu te concentres sur ton patient — sans noter, sans dicter, sans interrompre le soin.",
  },
  {
    n: "02",
    title: "Transcription et structuration NGAP automatiques",
    body: "Mon Assistant Kiné retranscrit l'audio et génère un bilan clinique complet en quelques secondes : identification & anamnèse, examen clinique (avec tableaux de mesures), diagnostic kinésithérapique, objectifs et traitement. Terminologie clinique exacte, conforme aux exigences NGAP.",
  },
  {
    n: "03",
    title: "Tu relis et exportes le PDF en 1 clic",
    body: "Bilan complet, daté et signable. Export PDF direct — prêt à archiver dans le dossier patient ou à transmettre au médecin correspondant.",
  },
];

const FAQ = [
  {
    q: "Faut-il s'arrêter de traiter pour utiliser l'enregistrement ?",
    a: "Non. Tu lances l'enregistrement en un tap et il tourne en arrière-plan. Tu continues ta séance normalement — la retranscription et la structuration NGAP se font après, en quelques secondes.",
  },
  {
    q: "Le bilan généré est-il vraiment conforme NGAP ?",
    a: "Oui. La structure (identification, anamnèse, examen clinique, diagnostic kinésithérapique, objectifs, traitement) est basée sur les exigences NGAP. Tu restes responsable du contenu clinique — Mon Assistant Kiné gère la mise en forme.",
  },
  {
    q: "L'enregistrement fonctionne-t-il en déplacement (kiné à domicile) ?",
    a: "Oui. Mon Assistant Kiné s'ouvre dans le navigateur de ton téléphone ou de ta tablette et s'adapte à leur écran, au cabinet comme chez le patient.",
  },
  {
    q: "Mes données patients sont-elles sécurisées ?",
    a: "Mon Assistant Kiné respecte le RGPD et les recommandations de la CNIL pour le traitement de données de santé. Tes enregistrements et bilans ne sont jamais revendus ni utilisés pour entraîner des modèles tiers.",
  },
];

export default function DocumentationBilanPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Haut de page : gabarit commun des modules */}
      <ModuleHero
        name="Bilan dicté"
        title="Tu parles pendant ta séance, ton bilan se rédige."
        points={[
          "Tu lances l'écoute et tu restes concentré sur ton patient.",
          "Mon Assistant Kiné retranscrit et structure un bilan clinique complet, conforme NGAP.",
          "Tu relis, tu valides, tu exportes en PDF en 1 clic.",
        ]}
        visual={
          <div className="mx-auto w-full max-w-[600px]">
            <BilanComposition priority />
          </div>
        }
      />

      {/* Pourquoi */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Pourquoi ça change tout</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Un bilan fait en direct, sans rien oublier.</h2>
          <div className="space-y-4">
            {[
              { icon: "🎯", text: "Tu restes concentré sur ton patient — pas sur tes notes. L'enregistrement tourne en arrière-plan, tu n'as rien à gérer." },
              { icon: "✅", text: "Rien n'est oublié. Tout ce qui a été dit pendant la séance est retranscrit — anamnèse, examen, observations cliniques, décisions thérapeutiques." },
              { icon: "⚡", text: "Le bilan est structuré en direct, dans les secondes qui suivent ta séance. Pas le soir, pas entre deux patients — maintenant." },
              { icon: "📅", text: "Tu gagnes du temps sur chaque bilan, chaque semaine. Du temps qui revient à tes patients, à ta pratique, ou à ta vie." },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-4 p-4 rounded-xl bg-white" style={{ border: "1px solid #d4ecea" }}>
                <span className="text-xl shrink-0">{icon}</span>
                <p className="text-[#475569] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-10">Comment Mon Assistant Kiné génère ton bilan</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Pas un outil générique. Un outil kiné.</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            ChatGPT ne sait pas ce qu&apos;est un testing musculaire coté de 0 à 5. Il ne connaît pas la structure d&apos;un bilan kinésithérapique conforme NGAP. Il te donnera un texte qu&apos;il faudra entièrement reformater.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Mon Assistant Kiné a été conçu par des kinésithérapeutes libéraux. Chaque champ, chaque template, chaque formulation a été pensé pour correspondre exactement à ce qu&apos;on attend d&apos;un bilan professionnel en France.
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

    </>
  );
}
