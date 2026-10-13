import type { ReactNode } from "react";
import { Figtree, DM_Serif_Display } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { bioSchema } from "@/lib/schemas/bio.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata = {
  title: "À propos — Mon Assistant Kiné, l'IA créée par des kinés pour des kinés",
  description: "Découvrez Mon Assistant Kiné : deux kinésithérapeutes diplômés d'État qui ont créé l'IA pour transformer la pratique clinique des kinés libéraux.",
  alternates: {
    canonical: "https://www.monassistantkine.fr/bio",
  },
  openGraph: {
    title: "À propos — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/bio",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function BioLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${figtree.variable} ${dmSerif.variable}`}>
      <JsonLd data={bioSchema} />
      {children}
    </div>
  );
}
