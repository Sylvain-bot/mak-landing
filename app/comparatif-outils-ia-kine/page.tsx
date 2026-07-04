import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { FeatureNav } from "@/components/FeatureNav";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comparatif outils IA kinésithérapeutes 2026 | Mon Assistant Kiné vs ChatGPT",
  description: "MAK vs ChatGPT — quel outil IA choisir pour votre cabinet kiné ? Comparatif honnête par des kinésithérapeutes praticiens.",
  alternates: { canonical: "https://www.monassistantkine.fr/comparatif-outils-ia-kine" },
  openGraph: {
    title: "Comparatif outils IA kiné 2026 | Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/comparatif-outils-ia-kine",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Quel outil IA pour kinésithérapeute en 2026 ? Comparatif honnête.",
  "description": "Comparatif MAK vs ChatGPT pour kinésithérapeutes libéraux en France.",
  "author": { "@type": "Organization", "name": "Mon Assistant Kiné", "url": "https://www.monassistantkine.fr" },
  "publisher": { "@type": "Organization", "name": "Mon Assistant Kiné" },
  "url": "https://www.monassistantkine.fr/comparatif-outils-ia-kine",
  "inLanguage": "fr-FR",
};

type Status = "yes" | "no" | "partial";

const ROWS: { feature: string; mak: Status; chatgpt: Status; notes?: string }[] = [
  { feature: "Conçu par des kinés", mak: "yes", chatgpt: "no" },
  { feature: "Bilan conforme NGAP", mak: "yes", chatgpt: "partial", notes: "ChatGPT : à reformater manuellement" },
  { feature: "Copilote IA Kiné (clinique & bibliographique)", mak: "yes", chatgpt: "no", notes: "MAK : Mistral (IA européenne), 56 000+ études, zéro hallucination · ChatGPT : non spécialisé, sources non fiables" },
  { feature: "Suivi patient WhatsApp", mak: "yes", chatgpt: "no" },
  { feature: "Programme exercices + vidéos", mak: "yes", chatgpt: "no" },
  { feature: "Gestion administrative", mak: "yes", chatgpt: "partial", notes: "ChatGPT : usage manuel uniquement" },
  { feature: "Contrats de remplacement", mak: "yes", chatgpt: "no", notes: "MAK : gratuit · signature électronique · déclaration Ordre en 1 clic" },
  { feature: "Données patients RGPD", mak: "yes", chatgpt: "partial", notes: "À vérifier selon usage" },
  { feature: "Spécifique kiné libéral FR", mak: "yes", chatgpt: "no" },
];

const TARIFS = [
  { tool: "MAK", price: "19€/mois", note: "Offre Pionnier — 100 premiers inscrits" },
  { tool: "ChatGPT", price: "20$/mois", note: "ChatGPT Pro" },
];

function StatusIcon({ s }: { s: Status }) {
  if (s === "yes") return <CheckCircle2 className="w-5 h-5 text-[#3899aa] mx-auto" />;
  if (s === "no") return <XCircle className="w-5 h-5 text-[#ef4444] mx-auto" />;
  return <MinusCircle className="w-5 h-5 text-[#f59e0b] mx-auto" />;
}

export default function ComparatifPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">Comparatif 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Quel outil IA pour kinésithérapeute en 2026 ?<br />
            <span className="text-[#3899aa]">Comparatif honnête.</span>
          </h1>
          <p className="text-lg text-[#475569]">Rédigé par des kinésithérapeutes libéraux. Sans langue de bois.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[#475569] leading-relaxed">
            Le marché des outils IA pour kinésithérapeutes se structure rapidement. Avant d&apos;investir du temps et de l&apos;argent dans un outil, voici ce qu&apos;il faut savoir sur les options disponibles en 2026.
          </p>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Tableau comparatif</h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #d4ecea" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#f0f9fa", borderBottom: "1px solid #d4ecea" }}>
                  <th className="text-left p-4 font-semibold text-[#0f172a]">Fonctionnalité</th>
                  <th className="text-center p-4 font-bold text-[#3899aa]">MAK</th>
                  <th className="text-center p-4 font-semibold text-[#64748b]">ChatGPT</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: i < ROWS.length - 1 ? "1px solid #d4ecea" : "none" }}>
                    <td className="p-4 text-[#475569]">
                      <div>{row.feature}</div>
                      {row.notes && <div className="text-xs text-[#94a3b8] mt-0.5">{row.notes}</div>}
                    </td>
                    <td className="p-4"><StatusIcon s={row.mak} /></td>
                    <td className="p-4"><StatusIcon s={row.chatgpt} /></td>
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #d4ecea", background: "#f8fcfd" }}>
                  <td className="p-4 font-semibold text-[#0f172a]">Tarif mensuel</td>
                  {TARIFS.map((t) => (
                    <td key={t.tool} className="p-4 text-center">
                      <div className={`font-bold ${t.tool === "MAK" ? "text-[#3899aa]" : "text-[#475569]"}`}>{t.price}</div>
                      {t.note && <div className="text-xs text-[#94a3b8] mt-0.5">{t.note}</div>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-[#94a3b8]">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa]" /> Oui</span>
            <span className="flex items-center gap-1"><MinusCircle className="w-3.5 h-3.5 text-[#f59e0b]" /> Partiel</span>
            <span className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-[#ef4444]" /> Non</span>
          </div>
        </div>
      </section>

      {/* Analyse par outil */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Analyse par outil</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #d4ecea" }}>
              <h3 className="font-bold text-[#0f172a] mb-3">ChatGPT — puissant, mais pas fait pour toi</h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                ChatGPT est un outil remarquable pour de nombreux usages. Pour la kinésithérapie libérale française, il a des limites concrètes : il ne connaît pas la structure d&apos;un bilan conforme NGAP, il peut inventer des études cliniques qui n&apos;existent pas, et chaque document produit nécessite un reformatage manuel. Utilisé comme outil d&apos;écriture généraliste, ChatGPT est utile. Comme assistant clinique kiné, il manque de spécificité.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6" style={{ border: "2px solid #3899aa", boxShadow: "0 4px 20px rgba(56,153,170,0.1)" }}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-bold text-[#0f172a]">MAK — l&apos;outil conçu de l&apos;intérieur</h3>
                <span className="text-xs bg-[#eef7f6] text-[#3899aa] font-semibold px-2 py-0.5 rounded-full">Notre choix</span>
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">
                MAK est le seul outil de cette liste conçu par des kinésithérapeutes libéraux praticiens. Chaque fonctionnalité répond à un problème réel, vécu au cabinet : la documentation conforme NGAP, la recherche EBP fiable connectée à PubMed et PEDro, l&apos;aide à la décision clinique basée sur le Cleland, le suivi patient à domicile avec programme d&apos;exercices et vidéos. Ce n&apos;est pas un outil générique adapté à la kiné. C&apos;est un outil kiné depuis le départ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui choisir quoi */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Pour qui choisir quoi</h2>
          <div className="space-y-4">
            {[
              { title: "Choisissez MAK si :", items: ["Tu es kinésithérapeute libéral en France", "Tu veux gagner du temps sur la documentation et l'administratif", "Tu veux un suivi patient structuré avec programme d'exercices et vidéos", "Tu veux des recherches EBP fiables sans risque d'hallucination"], color: "#3899aa", bg: "#eef7f6" },
              { title: "Choisissez ChatGPT si :", items: ["Tu cherches un assistant généraliste pour rédiger des emails, préparer une formation, ou brainstormer", "Pas pour ta documentation clinique ni ton raisonnement diagnostique"], color: "#64748b", bg: "#f8fafc" },
            ].map((block) => (
              <div key={block.title} className="rounded-2xl p-6" style={{ background: block.bg, border: `1px solid ${block.color}30` }}>
                <h3 className="font-bold mb-3" style={{ color: block.color }}>{block.title}</h3>
                <ul className="space-y-1">
                  {block.items.map((item, i) => (
                    <li key={i} className="text-sm text-[#475569] flex items-start gap-2">
                      <span style={{ color: block.color }} className="font-bold shrink-0">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#f0f9fa" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              { q: "Ces outils sont-ils conformes RGPD pour des données patients ?", a: "MAK est conçu pour respecter le RGPD et les recommandations de la CNIL. Les données patients ne sont jamais utilisées pour entraîner des modèles IA tiers. Pour ChatGPT, vérifiez les conditions générales avant d'y saisir des données identifiantes de patients." },
              { q: "L'IA peut-elle remplacer le logiciel de gestion de cabinet ?", a: "Non. MAK complète ton logiciel de gestion (agenda, facturation, télétransmission) — il ne le remplace pas." },
            ].map((item) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Essayer MAK gratuitement — sans engagement</h2>
          <p className="text-white/80 mb-8">Sans carte bancaire · Accès immédiat</p>
          <Link
            href="https://app.monassistantkine.fr/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#3899aa] font-semibold px-8 h-12 rounded-lg text-base hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
          >
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FeatureNav />
      <Footer />
    </>
  );
}
