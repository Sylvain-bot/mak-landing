"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FamiSection() {
  return (
    <section
      id="fami-section"
      className="py-12 px-4 sm:px-6"
      style={{ background: "#f8fbfc", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: "#0f2229", border: "1px solid rgba(232,176,77,0.25)" }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#e8b04d" }}
              >
                Info · Aide FAMI — Assurance Maladie
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-2">
                Le Forfait d&apos;Aide à la Modernisation (FAMI) de l&apos;Assurance Maladie
                inclut un critère d&apos;équipement en solution de vidéotransmission sécurisée.
                S&apos;abonner à Mon Assistant Kiné avec le module vidéo peut te rendre éligible à{" "}
                <strong style={{ color: "#e8b04d" }}>jusqu&apos;à 350 €/an versés par ta CPAM</strong>,
                déclarés chaque année sur Amelipro (janv.–mars).
              </p>
              <p className="text-white/30 text-xs">
                Éligibilité soumise aux conditions de ta CPAM — Mon Assistant Kiné ne peut pas garantir le versement.
              </p>
            </div>
            <Link
              href="/fonctionnalites/videotransmission"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-opacity hover:opacity-80"
              style={{
                background: "rgba(232,176,77,0.15)",
                border: "1px solid rgba(232,176,77,0.4)",
                color: "#e8b04d",
              }}
            >
              En savoir plus <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
