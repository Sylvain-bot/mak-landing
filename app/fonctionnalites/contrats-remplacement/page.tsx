import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";
import { CTA_MAIN } from "@/lib/claims";

export const metadata: Metadata = {
  title: "Contrats de remplacement pour kinésithérapeutes | Mon Assistant Kiné",
  description: "Crée, envoie et signe tes contrats de remplacement en ligne. Infos pré-remplies, déclaration Ordre en 1 clic, archivage automatique. Gratuit pour tous les kinés.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites/contrats-remplacement" },
  openGraph: {
    title: "Contrats de remplacement kiné | Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/fonctionnalites/contrats-remplacement",
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
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Module de gestion des contrats de remplacement pour kinésithérapeutes libéraux — gratuit, signature électronique, déclaration Ordre, archivage.",
  "audience": { "@type": "MedicalAudience", "audienceType": "Physiotherapist" },
};

const STEPS = [
  {
    icon: "✍️",
    title: "Crée le contrat en 2 minutes",
    body: "Tes informations (numéro d'ordre, adresse, coordonnées) sont pré-remplies automatiquement. Tu n'as qu'à renseigner les spécificités du remplacement : dates, honoraires, modalités.",
  },
  {
    icon: "📨",
    title: "Invite ton remplaçant par lien",
    body: "Un lien est généré et envoyé à ton remplaçant. Il accède au contrat directement depuis son téléphone — sans application à installer, sans compte obligatoire.",
  },
  {
    icon: "🖊️",
    title: "Signature électronique des deux côtés",
    body: "Le titulaire et le remplaçant signent chacun de leur côté. La signature est horodatée et archivée. Le contrat est immédiatement opposable.",
  },
  {
    icon: "✅",
    title: "Déclaration à l'Ordre en 1 clic",
    body: "Une fois signé, Mon Assistant Kiné génère les éléments nécessaires à la déclaration du remplacement auprès de l'Ordre des Masseurs-Kinésithérapeutes. Conformité assurée, sans démarche supplémentaire.",
  },
];

const STATS = [
  { icon: "💶", value: "Gratuit", label: "pour tous les kinés, pour toujours" },
  { icon: "⏱️", value: "2 minutes", label: "pour créer un contrat complet" },
  { icon: "🔁", value: "Pré-rempli", label: "infos réutilisées à chaque contrat" },
  { icon: "📁", value: "Archivé", label: "tous tes contrats accessibles" },
];

const FAQ = [
  {
    q: "C'est vraiment gratuit ?",
    a: "Oui, entièrement et sans limite de durée. Le module contrats est notre façon de rendre service à toute la communauté des kinés libéraux — qu'ils soient abonnés à Mon Assistant Kiné ou non.",
  },
  {
    q: "Mon remplaçant doit-il créer un compte ?",
    a: "Non, il peut signer sans compte. Mais en créant un compte gratuit, ses informations seront pré-remplies pour tous ses prochains contrats — ce qui lui fait gagner du temps à chaque remplacement.",
  },
  {
    q: "La signature électronique est-elle valable juridiquement ?",
    a: "Oui. La signature est horodatée et archivée, ce qui lui confère une valeur probante. Pour les contrats de remplacement en kinésithérapie libérale, ce niveau de signature est suffisant.",
  },
  {
    q: "Comment fonctionne la déclaration à l'Ordre ?",
    a: "Une fois le contrat signé par les deux parties, Mon Assistant Kiné génère les éléments nécessaires à la déclaration du remplacement à l'Ordre. La démarche qui prenait plusieurs étapes se fait en 1 clic depuis l'app.",
  },
  {
    q: "Mes contrats sont-ils sauvegardés si je n'ai pas d'abonnement ?",
    a: "Oui. Le module contrats — incluant l'archivage — est entièrement gratuit. Tous tes contrats signés restent accessibles dans ton espace sans aucun abonnement.",
  },
];

export default function ContratsRemplacementPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            100 % gratuit — pour tous les kinés
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Tes contrats de remplacement.<br />
            <span className="text-[#3899aa]">Signés, déclarés, archivés.</span>
          </h1>
          <p className="text-lg text-[#475569] mb-8 max-w-2xl mx-auto leading-relaxed">
            De la rédaction à la déclaration ordinale — tout se passe dans Mon Assistant Kiné, en 2 minutes.
            Offert à toute la communauté des kinés libéraux. Sans abonnement.
          </p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base transition-all hover:scale-[1.02] shadow-lg shadow-[#3899aa]/25"
          >
            Accéder au module — c'est gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Problème */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Le problème</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Un remplacement, c'est déjà assez compliqué.</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            Trouver un remplaçant, s'accorder sur les modalités, rédiger un contrat conforme,
            le faire signer, le déclarer à l'Ordre… Chaque étape prend du temps, et l'oubli d'une
            seule peut exposer à un problème de conformité.
          </p>
          <p className="text-[#475569] leading-relaxed">
            La plupart des kinés font ça à la main, par mail, avec un Word et une signature scannée.
            En 2026, il y a mieux.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">La solution</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-10">De la rédaction à la déclaration — en 4 étapes.</h2>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-5 items-start p-6 rounded-2xl" style={{ border: "1px solid #d4ecea" }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 font-bold text-sm text-[#3899aa]"
                  style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f172a] mb-2">{s.icon} {s.title}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{s.body}</p>
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

      {/* Angle communauté */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Pourquoi c'est gratuit</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-6">Entre kinés, on s'entraide.</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            Les remplacements font partie du quotidien du kiné libéral — que tu sois titulaire qui part en vacances
            ou remplaçant qui construit sa clientèle. On a voulu que chaque remplacement soit simple,
            traçable et conforme, pour les deux parties.
          </p>
          <p className="text-[#475569] leading-relaxed">
            Ce module est notre contribution à la communauté. Pas un produit d'appel — un vrai service,
            entièrement gratuit, sans limite de durée, que tu aies un abonnement Mon Assistant Kiné ou non.
          </p>
          <blockquote className="mt-8 pl-5 italic text-[#64748b] text-sm leading-relaxed"
            style={{ borderLeft: "2px solid #d4ecea" }}>
            &ldquo;On a voulu que chaque remplacement soit simple, traçable, et conforme — pour le titulaire comme pour le remplaçant.&rdquo;
            <span className="block mt-2 not-italic text-xs text-[#94a3b8]">— Sylvain & Valentin, co-fondateurs kinés D.E.</span>
          </blockquote>
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

      {/* Cross-sell doux */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Et pendant que ton remplaçant signe…</p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] mb-4 leading-tight">
            Découvre ce que Mon Assistant Kiné fait d&apos;autre pour ton cabinet
          </h2>
          <p className="text-[#475569] text-base mb-6 leading-relaxed">
            Bilans en 3 minutes, copilote clinique sourcé (56 000+ études dont Cleland), suivi patient WhatsApp.
            Un seul outil, conçu par des kinés libéraux.
          </p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-[#3899aa] hover:bg-[#2d8a9a] text-white font-semibold px-8 h-12 rounded-lg text-base hover:scale-[1.02] transition-all shadow-lg shadow-[#3899aa]/20"
          >
            {CTA_MAIN}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#3899aa" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Accéder au module contrats</h2>
          <p className="text-white/80 mb-8">Gratuit · Sans carte bancaire · Accès immédiat</p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
          >
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-white/60 text-sm mt-4">
            Déjà un compte ?{" "}
            <a href="https://app.monassistantkine.fr/login" className="underline text-white/80 hover:text-white">
              Se connecter
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
