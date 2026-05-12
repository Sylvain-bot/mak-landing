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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
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
