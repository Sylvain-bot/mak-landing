import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HomeHeroLight, HowItWorks, FamiBlock, CopiloteBlock, Devices, Proof, AlsoInside } from "@/components/home/HomeSections";
import { FinalBanner } from "@/components/FinalBanner";
import { Footer } from "@/components/Footer";

// Page de test (comparaison du hero clair) : non indexée, à supprimer après décision.
export const metadata: Metadata = {
  title: "Test hero clair — Mon Assistant Kiné",
  robots: { index: false, follow: false },
};

export default function TestHeroClair() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHeroLight />
        <FamiBlock />
        <HowItWorks />
        <CopiloteBlock />
        <Devices />
        <Proof />
        <AlsoInside />
        <FinalBanner />
      </main>
      <Footer />
    </>
  );
}
