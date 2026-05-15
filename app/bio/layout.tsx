import type { ReactNode } from "react";
import { Figtree, DM_Serif_Display } from "next/font/google";

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
  title: "Mon Assistant Kiné — Gagne 2h par semaine au cabinet",
  description: "L'assistant IA pour kinés libéraux. Bilans en 3 min, aide clinique, bibliographie EBP. Accès gratuit, sans carte bancaire.",
};

export default function BioLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${figtree.variable} ${dmSerif.variable}`}>
      {children}
    </div>
  );
}
