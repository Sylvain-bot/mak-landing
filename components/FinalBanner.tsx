import { ArrowRight, Users } from "lucide-react";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";

// Bandeau final commun : accueil, pages modules, page « Toutes les fonctionnalités ».
// Grand bloc sombre arrondi, posé dans la page (disposition de la maquette V3).
export function FinalBanner({ location = "final-banner" }: { location?: string }) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white">
      <div
        className="relative overflow-hidden max-w-6xl mx-auto rounded-[32px] px-4 sm:px-6 py-14 sm:py-24 flex flex-col items-center text-center"
        style={{ background: "#0f172a", border: "1.5px solid rgba(56,153,170,0.45)", boxShadow: "0 0 60px rgba(56,153,170,0.18)" }}
      >
        {/* TODO: image de fond dédiée (brief Nano Banana « fond-final ») — fond uni en attendant */}
        <div className="relative flex flex-col items-center w-full">
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
        {/* Encart groupe Pionnier : avantage réservé aux 100 premiers, mis en avant comme l'offre */}
        <div
          className="mt-8 w-full max-w-2xl rounded-2xl px-5 py-5 sm:px-7 sm:py-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left"
          style={{ background: "rgba(232,176,77,0.07)", border: "1px solid rgba(232,176,77,0.35)" }}
        >
          <span
            className="shrink-0 size-12 rounded-full inline-flex items-center justify-center"
            style={{ background: "rgba(232,176,77,0.15)" }}
            aria-hidden
          >
            <Users className="size-6" style={{ color: "#e8b04d" }} />
          </span>
          <div className="min-w-0">
            <p className="text-lg sm:text-xl font-bold text-white">
              Et l&apos;accès au <span style={{ color: "#e8b04d" }}>groupe Pionnier</span>
            </p>
            <p className="mt-1.5 text-base text-[#cbd5e1] leading-relaxed">
              Des kinés libéraux qui échangent sur leur pratique, s&apos;entraident et décident avec nous des prochaines
              fonctionnalités.
            </p>
            {/* Exemple réel de fonctionnalité née d'une demande du groupe (fondateur, 27/10/2026) */}
            <p className="mt-3 text-sm text-[#e2e8f0]">
              <span className="font-semibold" style={{ color: "#e8b04d" }}>
                Né d&apos;une demande du groupe :
              </span>{" "}
              le body chart, désormais intégré au bilan.
            </p>
          </div>
        </div>
        <TrackedSignupLink
          location={location}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl h-14 px-5 sm:px-8 whitespace-nowrap text-base sm:text-lg font-semibold w-full sm:w-auto bg-white text-[#0f172a] hover:bg-[#e2f1f3] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
        >
          Essayer gratuitement 14 jours <ArrowRight className="size-5" aria-hidden />
        </TrackedSignupLink>
        </div>
      </div>
    </section>
  );
}
