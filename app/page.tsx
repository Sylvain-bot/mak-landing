import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { DemoVideo } from "@/components/DemoVideo";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { Results } from "@/components/Results";
import { Testimonials } from "@/components/Testimonials";
import { Founders } from "@/components/Founders";
import { ForWho } from "@/components/ForWho";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { ContratSection } from "@/components/ContratSection";
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homepageSchema } from "@/lib/schemas/homepage.schema";
import { supabaseAdmin } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Mon Assistant Kiné | Bilans en 3 min — IA pour Kinésithérapeutes",
  description: "Gagnez 2h/semaine : bilans en 3 minutes, drapeaux rouges détectés, 56 000+ études intégrées. Essayez Mon Assistant Kiné gratuitement.",
  alternates: {
    canonical: "https://www.monassistantkine.fr",
  },
  openGraph: {
    title: "Mon Assistant Kiné | IA pour Kinésithérapeutes",
    description: "Gagnez 2h/semaine grâce à l'IA : bilans en 3 min, drapeaux rouges détectés.",
    url: "https://www.monassistantkine.fr",
    type: "website",
    locale: "fr_FR",
    siteName: "Mon Assistant Kiné",
  },
};

async function getPioneerSpots(): Promise<number> {
  try {
    const { data } = await supabaseAdmin
      .from("settings")
      .select("value")
      .eq("key", "pioneer_spots")
      .single();
    return data ? parseInt(data.value, 10) : 87;
  } catch {
    return 87;
  }
}

export default async function Home() {
  const pioneerSpots = await getPioneerSpots();

  return (
    <main>
      <JsonLd data={homepageSchema} />
      <Navbar />
      <Hero pioneerSpots={pioneerSpots} />
      <SocialProof />
      <DemoVideo />
      <Problem />
      <Features />
      <Results />
      <Testimonials />
      <Founders />
      <ForWho />
      <ContratSection />
      <Pricing />
      <FAQ />
      <CtaFinal />
      <section className="py-10 px-4 sm:px-6" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-base font-semibold text-[#0f172a] mb-2">Sécurité &amp; conformité</h3>
          <p className="text-sm text-[#64748b] leading-relaxed">
            Mon Assistant Kiné est conçu dans le respect des obligations RGPD applicables aux
            professionnels de santé. Les données patients ne sont jamais utilisées pour entraîner
            des modèles IA tiers. Hébergement en Europe.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
