import { ArrowRight } from "lucide-react";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";

// Bandeau final commun : accueil, pages modules, page « Toutes les fonctionnalités ».
// Grand bloc sombre arrondi, posé dans la page (disposition de la maquette V3).
export function FinalBanner({ location = "final-banner" }: { location?: string }) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white">
      <div
        className="max-w-6xl mx-auto rounded-[32px] px-4 sm:px-6 py-14 sm:py-24 flex flex-col items-center text-center"
        style={{ background: "#0f172a", border: "1.5px solid rgba(56,153,170,0.45)", boxShadow: "0 0 60px rgba(56,153,170,0.18)" }}
      >
        <span
          className="mb-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
          style={{ background: "rgba(232,176,77,0.12)", border: "1px solid rgba(232,176,77,0.4)", color: "#e8b04d" }}
        >
          ★ 100 places · Offre Pionnier
        </span>
        <h2 className="text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
          Tu parles.
          <br />
          <span style={{ color: "#5bb8c8" }}>Ton bilan s&apos;écrit.</span>
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[#cbd5e1]">
          Offre Pionnier :{" "}
          <strong className="font-bold" style={{ color: "#e8b04d" }}>
            199 €/an
          </strong>{" "}
          (ou 19 €/mois),{" "}
          <strong className="font-semibold" style={{ color: "#e8b04d" }}>
            tarif garanti à vie
          </strong>
          , réservée aux 100 premiers inscrits.
        </p>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white leading-relaxed">
          Et l&apos;accès au groupe Pionnier : des kinés libéraux qui échangent sur leur pratique, s&apos;entraident et
          décident avec nous des prochaines fonctionnalités.
        </p>
        {/* TODO-FONDATEUR: exemple de fonctionnalité née d'une demande du groupe Pionnier (texte à fournir), par ex. :
        <p className="mt-3 max-w-2xl text-sm text-[#cbd5e1]">Exemple : « … », demandé par le groupe et livré en … .</p>
        */}
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
