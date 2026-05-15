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
import { CtaFinal } from "@/components/CtaFinal";
import { Footer } from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase-server";

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
      <Pricing />
      <FAQ />
      <CtaFinal />
      <Footer />
    </main>
  );
}
