import type { Metadata } from "next";
import { ModuleHero } from "@/components/ModuleHero";
import { ModuleVideo } from "@/components/ModuleVideo";
import { JsonLd } from "@/components/JsonLd";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gestion administrative automatisée pour kinésithérapeutes | Mon Assistant Kiné",
  description: "Courriers, relances, ordonnances — générés en un clic avec tes templates personnalisables. L'IA crée le document si besoin. Fini les tâches administratives en soirée.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites/gestion-administrative" },
  openGraph: {
    title: "Gestion administrative kiné | Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/fonctionnalites/gestion-administrative",
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
  "description": "Gestion administrative automatisée pour kinésithérapeutes libéraux : courriers, templates, envoi direct.",
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const COSTS = [
  { doc: "Courrier au médecin", time: "10 min" },
  { doc: "Relance ordonnance", time: "5 min" },
  { doc: "Certificat fin de traitement", time: "15 min" },
  { doc: "Demande de prolongation", time: "10 min" },
];

const FEATURES_LIST = [
  { icon: "📄", title: "Tes templates, personnalisables à l'infini", body: "Mon Assistant Kiné intègre une bibliothèque de templates pour tous les documents courants du kiné libéral : courriers médecins, comptes-rendus, relances, demandes de prolongation, certificats. Chaque template est modifiable et enregistrable." },
  { icon: "🤖", title: "L'IA crée le document si tu n'as pas de template", body: "Besoin d'un document inhabituel ? Décris ce que tu veux en quelques mots, Mon Assistant Kiné génère le document complet. Tu relis, tu valides, tu envoies." },
  { icon: "📨", title: "Envoi en un clic", body: "Depuis Mon Assistant Kiné, directement. Pas de copier-coller dans ton client mail, pas de mise en forme manuelle. Le document part avec ton en-tête, ta signature, au bon destinataire." },
];

const STATS = [
  { icon: "📄", value: "Templates inclus", label: "pour tous les documents courants" },
  { icon: "🔧", value: "Personnalisables", label: "adaptés à ton style" },
  { icon: "🤖", value: "Création IA", label: "pour les documents hors template" },
  { icon: "📨", value: "Envoi direct", label: "depuis Mon Assistant Kiné, en un clic" },
  { icon: "⏱", value: "2 minutes", label: "pour un courrier médecin complet" },
];

const FAQ = [
  {
    q: "Les templates sont-ils conformes aux usages de la profession ?",
    a: "Oui. Ils ont été conçus par des kinésithérapeutes libéraux praticiens.",
  },
  {
    q: "Je peux créer mes propres templates ?",
    a: "Oui. Tu peux modifier tous les templates existants et en créer de nouveaux depuis ton espace.",
  },
  {
    q: "L'envoi se fait depuis quelle adresse mail ?",
    a: "Depuis ton adresse professionnelle, configurée à l'inscription.",
  },
];

export default function GestionAdministrativePage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Haut de page : gabarit commun des modules */}
      <ModuleHero
        name="Gestion administrative"
        title="Tes courriers et relances rédigés en un clic."
        points={[
          "Courriers médecins, relances et documents générés depuis tes modèles.",
          "Pas encore de modèle ? Mon Assistant Kiné le crée pour toi.",
          "Tu envoies directement, sans copier-coller.",
        ]}
        visual={
          <ModuleVideo src="/admini.mp4" label="Démo : génération d'un courrier administratif depuis un modèle" />
        }
      />

      {/* Problème */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Le problème</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">L&apos;administratif, c&apos;est le voleur de temps que personne ne mesure.</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {COSTS.map((c) => (
              <div key={c.doc} className="flex items-center justify-between bg-white rounded-xl p-4" style={{ border: "1px solid #d4ecea" }}>
                <span className="text-sm text-[#475569]">{c.doc}</span>
                <span className="text-sm font-semibold text-[#0f172a]">{c.time}</span>
              </div>
            ))}
          </div>
          <p className="text-[#475569] leading-relaxed">
            Multipliez par le nombre de patients. Multipliez par 200 jours de travail par an. Ce sont des heures. Chaque semaine. Prises sur ton temps libre.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">La solution</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-8">Templates prêts à l&apos;emploi. IA disponible si besoin.</h2>
          <div className="space-y-4">
            {FEATURES_LIST.map((f) => (
              <div key={f.title} className="flex gap-5 items-start p-6 rounded-2xl" style={{ border: "1px solid #d4ecea" }}>
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-2">{f.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {STATS.map((s) => (
              <div key={s.value} className="bg-white rounded-2xl p-4 text-center" style={{ border: "1px solid #d4ecea" }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-bold text-[#3899aa] text-sm mb-1">{s.value}</div>
                <div className="text-xs text-[#94a3b8] leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
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

    </>
  );
}
