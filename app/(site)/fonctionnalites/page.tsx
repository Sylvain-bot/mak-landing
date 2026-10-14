import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";
import { MODULES, MODULE_GROUPS } from "@/lib/modules";

export const metadata: Metadata = {
  title: "Fonctionnalités | Mon Assistant Kiné — L'IA pour kinésithérapeutes",
  description:
    "Tous les modules de Mon Assistant Kiné : bilan dicté, suivi patient et exercices, copilot IA clinique, vidéotransmission éligible FAMI, gestion administrative et contrats de remplacement gratuits.",
  alternates: { canonical: "https://www.monassistantkine.fr/fonctionnalites" },
  openGraph: {
    title: "Fonctionnalités — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/fonctionnalites",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function FonctionnalitesPage() {
  return (
    <main className="px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#0f172a] leading-tight text-balance">
          Tout ce que MAK fait pour ton cabinet
        </h1>
        <p className="mt-4 text-lg text-[#475569] max-w-2xl">
          Le bilan dicté d&apos;abord, et les outils qui t&apos;accompagnent autour de la séance.
        </p>

        {MODULE_GROUPS.map((g) => (
          <section key={g.id} className="mt-12" aria-labelledby={`grp-${g.id}`}>
            <h2 id={`grp-${g.id}`} className="text-xs font-semibold uppercase tracking-[0.1em] text-[#236f7d]">
              {g.label}
            </h2>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES.filter((m) => m.group === g.id).map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="group h-full flex flex-col rounded-2xl p-6 bg-white transition-colors hover:bg-[#f2f9fa] outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
                    style={{ border: "1px solid #dcecef" }}
                  >
                    <span className="text-lg font-semibold text-[#0f172a]">{m.name}</span>
                    <span className="mt-2 text-base text-[#475569] leading-relaxed flex-1">{m.pitch}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#236f7d]">
                      Découvrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
