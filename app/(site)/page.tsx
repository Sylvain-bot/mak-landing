import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HomeHero, HowItWorks, FamiBlock, CopiloteBlock, Benefits, Devices, Proof, AlsoInside } from "@/components/home/HomeSections";
import { FinalBanner } from "@/components/FinalBanner";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homepageSchema } from "@/lib/schemas/homepage.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mon Assistant Kiné | Tu parles, ton bilan s'écrit — l'IA des kinés libéraux",
  description:
    "Mon Assistant Kiné écoute ta séance et rédige ton bilan kiné en entier, structuré, prêt à vérifier. L'aide FAMI peut couvrir ton abonnement. Essaie gratuitement 14 jours.",
  alternates: {
    canonical: "https://www.monassistantkine.fr",
  },
  openGraph: {
    title: "Mon Assistant Kiné | Tu parles, ton bilan s'écrit",
    description: "Mon Assistant Kiné écoute ta séance et rédige ton bilan kiné, structuré et prêt à vérifier. Essai gratuit 14 jours.",
    url: "https://www.monassistantkine.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Mon Assistant Kiné",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

// La FAQ n'est plus affichée sur l'accueil : son balisage FAQPage est retiré
// (Google exige que le balisage décrive du contenu visible).
const schema = {
  ...homepageSchema,
  "@graph": (homepageSchema["@graph"] as { "@type": string }[]).filter((n) => n["@type"] !== "FAQPage"),
};

export default function Home() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main>
        <HomeHero />
        <FamiBlock />
        <HowItWorks />
        <CopiloteBlock />
        <Benefits />
        <Devices />
        <Proof />
        <AlsoInside />
        <FinalBanner />
      </main>
      <Footer />
    </>
  );
}
