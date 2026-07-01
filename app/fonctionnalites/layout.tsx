import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { FeatureNav } from "@/components/FeatureNav";
import { Footer } from "@/components/Footer";

export default function FonctionnalitesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <FeatureNav />
      <Footer />
    </>
  );
}
