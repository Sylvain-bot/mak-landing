import { ArrowRight } from "lucide-react";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";
import { primaryCtaClass } from "@/lib/ctaStyles";

// Bandeau final commun : accueil, pages modules, page « Toutes les fonctionnalités ».
export function FinalBanner({ location = "final-banner" }: { location?: string }) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24" style={{ background: "#0f172a" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight text-balance">
          Tu parles. <span style={{ color: "#5bb8c8" }}>Ton bilan s&apos;écrit.</span>
        </h2>
        <p className="mt-5 text-base sm:text-lg text-[#cbd5e1]">
          Offre Pionnier : 199 €/an, à vie. [Date de fin de l&apos;offre]
        </p>
        <TrackedSignupLink
          location={location}
          className={`${primaryCtaClass} mt-8 h-13 px-7 text-base w-full sm:w-auto`}
          style={{ background: "#237584", boxShadow: "0 8px 24px rgba(56,153,170,0.35)" }}
        >
          Essayer gratuitement 14 jours <ArrowRight className="size-5" aria-hidden />
        </TrackedSignupLink>
      </div>
    </section>
  );
}
