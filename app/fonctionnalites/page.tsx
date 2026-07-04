import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fonctionnalités | Mon Assistant Kiné — L'IA pour kinésithérapeutes",
  description: "Découvrez tous les modules de Mon Assistant Kiné : copilote IA clinique, bilans NGAP, suivi patient, gestion administrative et contrats de remplacement gratuits.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites" },
  openGraph: {
    title: "Fonctionnalités — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/fonctionnalites",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

const FEATURES = [
  {
    href: "/fonctionnalites/aide-decision-clinique",
    icon: "🧠",
    title: "Copilote IA Kiné",
    desc: "Clinique & bibliographique — pose ta question comme à un confrère, l'IA détecte drapeaux rouges et mobilise 56 000+ ressources scientifiques.",
  },
  {
    href: "/fonctionnalites/documentation-bilan-kine",
    icon: "📋",
    title: "Bilans NGAP",
    desc: "Génère un bilan kinésithérapique complet et conforme en quelques minutes, exportable en PDF ou par mail.",
  },
  {
    href: "/fonctionnalites/suivi-patient",
    icon: "💬",
    title: "Suivi patient",
    desc: "Programmes d'exercices envoyés sur WhatsApp avec vidéos, chatbot guidé par ton protocole, suivi de l'observance.",
  },
  {
    href: "/fonctionnalites/gestion-administrative",
    icon: "📨",
    title: "Administratif",
    desc: "Courriers, relances et ordonnances générés en un clic à partir de tes templates, envoyés directement depuis Mon Assistant Kiné.",
  },
  {
    href: "/fonctionnalites/contrats-remplacement",
    icon: "📑",
    title: "Contrats de remplacement",
    desc: "Rédaction, signature électronique et déclaration à l'Ordre en 1 clic — 100 % gratuit pour tous les kinés.",
    free: true,
  },
];

export default function FonctionnalitesPage() {
  return (
    <>
      <section className="bg-white pt-28 pb-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">
            Fonctionnalités
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-5">
            Tout ce que Mon Assistant Kiné<br />fait pour ton cabinet
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Cinq modules, un seul outil. Chaque fonctionnalité résout un problème réel du
            quotidien d&apos;un kinésithérapeute libéral.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group rounded-2xl p-6 flex flex-col bg-white transition-all hover:-translate-y-0.5"
              style={f.free
                ? { border: "1px solid #86efac", boxShadow: "0 1px 4px rgba(22,163,74,0.08)" }
                : { border: "1px solid #d4ecea", boxShadow: "0 1px 4px rgba(56,153,170,0.06)" }
              }
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{f.icon}</span>
                <h2 className="text-base font-bold text-[#0f172a]">{f.title}</h2>
                {f.free && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto"
                    style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d" }}
                  >
                    Gratuit
                  </span>
                )}
              </div>
              <p className="text-sm text-[#475569] leading-relaxed mb-4 flex-1">{f.desc}</p>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: f.free ? "#15803d" : "#3899aa" }}
              >
                En savoir plus
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
