import { ArrowRight } from "lucide-react";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";

// Bandeau final commun : accueil, pages modules, page « Toutes les fonctionnalités ».
// Grand bloc sombre arrondi, posé dans la page (disposition de la maquette V3).
export function FinalBanner({ location = "final-banner" }: { location?: string }) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white">
      <div
        className="max-w-6xl mx-auto rounded-[32px] px-4 sm:px-6 py-14 sm:py-24 flex flex-col items-center text-center"
        style={{ background: "#0f172a" }}
      >
        <h2 className="text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
          Tu parles.
          <br />
          <span style={{ color: "#5bb8c8" }}>Ton bilan s&apos;écrit.</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[#cbd5e1]">Offre Pionnier : 199 €/an (ou 19 €/mois), tarif garanti à vie, réservée aux 100 premiers inscrits.</p>
        <TrackedSignupLink
          location={location}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl h-14 px-5 sm:px-8 whitespace-nowrap text-base sm:text-lg font-semibold w-full sm:w-auto bg-white text-[#0f172a] hover:bg-[#e2f1f3] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
        >
          Essayer gratuitement 14 jours <ArrowRight className="size-5" aria-hidden />
        </TrackedSignupLink>
      </div>
    </section>
  );
}
