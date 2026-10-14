import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { FinalBanner } from "@/components/FinalBanner";
import { Footer } from "@/components/Footer";

// Gabarit commun aux pages modules : en-tête, contenu, même bandeau final que l'accueil.
export default function FonctionnalitesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <FinalBanner location="module-final-banner" />
      <Footer />
    </>
  );
}
