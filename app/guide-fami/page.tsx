import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadMagnetForm } from "@/components/LeadMagnetForm";
import { GuideFamiImage } from "@/components/GuideFamiImage";
import { GuideFamiPitch } from "@/components/LeadMagnetSection";
import { GUIDE_FAMI } from "@/lib/guideFami";

const TITLE = "Guide FAMI 2027 gratuit pour kinés libéraux | Mon Assistant Kiné";
const DESCRIPTION =
  "Le FAMI est calculé sur ton équipement au 31 décembre. Règles, calendrier, déclaration amelipro pas à pas et checklist : le guide gratuit pour ne plus perdre jusqu'à 1 115 €.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.monassistantkine.fr/guide-fami" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.monassistantkine.fr/guide-fami",
    type: "website",
    images: [GUIDE_FAMI.cover],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [GUIDE_FAMI.cover],
  },
};

export default function GuideFamiPage() {
  return (
    <div className="flex flex-col min-h-svh" style={{ background: "#f2f9fa" }}>
      <header className="px-4 sm:px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <Link href="/" aria-label="Mon Assistant Kiné — accueil" className="inline-block">
            <Image src="/logo-mak.webp" alt="Mon Assistant Kiné" width={120} height={36} className="h-8 w-auto object-contain" priority />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Bloc principal */}
        <section className="px-4 sm:px-6 pt-6 pb-16 sm:pt-10 sm:pb-24">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-start">
            <div className="w-40 sm:w-48 md:w-full max-w-xs mx-auto md:sticky md:top-8">
              <GuideFamiImage
                src={GUIDE_FAMI.cover}
                alt="Couverture du guide FAMI 2027 pour kinésithérapeutes libéraux"
                sizes="(min-width: 768px) 320px, 192px"
                priority
              />
            </div>

            <div>
              <GuideFamiPitch headingLevel="h1" />
              <div className="max-w-md">
                <LeadMagnetForm source="page-guide" />
                <p className="text-xs text-[#64748b] mt-5 text-center">
                  Par Sylvain, kiné libéral et co-fondateur de Mon Assistant Kiné
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 sm:px-6 py-6 bg-white" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <p>© 2026 Mon Assistant Kiné</p>
          <nav className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-[#475569] transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-[#475569] transition-colors">Politique de confidentialité</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
