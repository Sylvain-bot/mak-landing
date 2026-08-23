"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { cn } from "@/lib/utils";
import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import {
  CTA_SIGNUP_URL,
  CTA_MAIN,
  PRICE_PIONNIER,
  PRICE_PIONNIER_ANNUAL,
  FAMI_AMOUNT,
} from "@/lib/claims";

const PIONNIER_FEATURES = [
  "Programmes illimités",
  "Copilote IA Kiné — usage illimité",
  "Module Administratif",
  "Bilan kiné",
  "Suivi patient WhatsApp",
  "Vidéotransmission sécurisée",
  "Communauté privée fondateurs",
  "Badge Pionnier exclusif",
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-8">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Tarifs</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-2 leading-tight">
            Simple, transparent. Sans surprise.
          </h2>
          <p className="text-[#64748b] text-sm mb-6">
            Tant qu&apos;il reste des places, une seule offre : tout inclus, prix bloqué à vie.
          </p>

          {/* Toggle mensuel / annuel */}
          <div className="inline-flex items-center rounded-xl p-1" style={{ background: "#e2eef0", border: "1px solid #d4ecea" }}>
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                !annual ? "bg-white text-[#0f172a] shadow-sm" : "text-[#64748b] hover:text-[#475569]"
              )}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
                annual ? "bg-white text-[#0f172a] shadow-sm" : "text-[#64748b] hover:text-[#475569]"
              )}
            >
              Annuel
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(232,176,77,0.15)", color: "#92680a", border: "1px solid rgba(232,176,77,0.4)" }}
              >
                FAMI −350€
              </span>
            </button>
          </div>
        </ScrollReveal>

        {!annual ? (
          /* ── MENSUEL ── Pionnier uniquement */
          <ScrollReveal>
            <div
              className="rounded-2xl p-7 sm:p-9 relative overflow-hidden"
              style={{ background: "#0f172a", border: "2px solid #3899aa", boxShadow: "0 8px 40px rgba(56,153,170,0.2)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(56,153,170,0.18) 0%, transparent 70%)" }} />

              <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-bold">
                      <Zap className="w-3 h-3" />
                      Les 100 premiers seulement
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Offre Pionnier — tout inclus, {PRICE_PIONNIER}€/mois à vie.
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    Accès complet à tous les modules, prix garanti à vie, sans engagement, badge fondateur.
                    Quand les 100 places sont prises, cette offre disparaît définitivement.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {PIONNIER_FEATURES.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/85 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 text-center lg:text-right w-full lg:w-auto">
                  <div className="inline-block rounded-2xl p-6 mb-3"
                    style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)" }}>
                    <div className="text-5xl font-bold text-white">{PRICE_PIONNIER}€</div>
                    <div className="text-white/50 text-sm">/mois · à vie</div>
                    <div className="text-[#3899aa] text-xs font-semibold mt-1">au lieu de 49€/mois</div>
                  </div>
                  <p className="text-xs mb-4" style={{ color: "rgba(232,176,77,0.75)" }}>
                    ★ Passe à l&apos;annuel et{" "}
                    <button
                      onClick={() => setAnnual(true)}
                      className="underline hover:opacity-90 transition-opacity font-semibold"
                      style={{ color: "#e8b04d" }}
                    >
                      gagne 151€ net avec le FAMI →
                    </button>
                  </p>
                  <Link
                    href={CTA_SIGNUP_URL}
                    className="block w-full text-center px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
                  >
                    {CTA_MAIN}
                  </Link>
                  <p className="text-white/40 text-xs mt-2">Sans engagement · Résiliable à tout moment</p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-[#94a3b8] mt-4">
              D&apos;autres formules seront disponibles après les 100 places.{" "}
              <Link href="/tarifs" className="underline hover:text-[#3899aa] transition-colors">
                Voir tous les tarifs →
              </Link>
            </p>
          </ScrollReveal>
        ) : (
          /* ── ANNUEL ── Pionnier uniquement */
          <ScrollReveal>
            <div
              className="rounded-2xl p-7 sm:p-9 relative overflow-hidden"
              style={{ background: "#0f172a", border: "2px solid #3899aa", boxShadow: "0 8px 40px rgba(56,153,170,0.2)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(56,153,170,0.18) 0%, transparent 70%)" }} />

              <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3899aa] text-white text-xs font-bold">
                      <Zap className="w-3 h-3" />
                      Les 100 premiers seulement
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: "rgba(232,176,77,0.15)", border: "1px solid rgba(232,176,77,0.4)", color: "#e8b04d" }}
                    >
                      ★ Éligible FAMI
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Offre Pionnier annuelle — et tu <em>gagnes</em> 151€ net.
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    Ta CPAM te verse {FAMI_AMOUNT}€/an grâce au FAMI.
                    Pour {PRICE_PIONNIER_ANNUAL}€ d&apos;abonnement, tu rentres dans tes frais et au-delà.
                    Prix garanti à vie, accès à tout.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {PIONNIER_FEATURES.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/85 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3899aa] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 text-center lg:text-right w-full lg:w-auto">
                  {/* Reçu compact */}
                  <div className="rounded-2xl p-5 mb-3 text-left"
                    style={{ background: "rgba(232,176,77,0.08)", border: "1px solid rgba(232,176,77,0.3)" }}>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-white/60">Tu paies</span>
                      <span className="text-white font-semibold">{PRICE_PIONNIER_ANNUAL} €</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-white/60">FAMI (CPAM)*</span>
                      <span className="font-semibold" style={{ color: "#e8b04d" }}>+ {FAMI_AMOUNT} €</span>
                    </div>
                    <div className="border-t pt-2 mt-1 flex justify-between items-center" style={{ borderColor: "rgba(232,176,77,0.2)" }}>
                      <span className="text-white font-bold text-sm">Tu gagnes</span>
                      <span className="text-2xl font-bold" style={{ color: "#e8b04d" }}>+ 151 €</span>
                    </div>
                  </div>
                  <Link
                    href={CTA_SIGNUP_URL}
                    className="block w-full text-center px-4 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 16px rgba(56,153,170,0.35)" }}
                  >
                    {CTA_MAIN}
                  </Link>
                  <p className="text-white/40 text-xs mt-2">Engagement 12 mois · Paiement en une fois</p>
                </div>
              </div>
            </div>

            <p id="fami-disclaimer" className="text-[#94a3b8] text-xs text-center max-w-xl mx-auto mt-4 leading-relaxed">
              *L&apos;aide FAMI ({FAMI_AMOUNT} €/an) est versée par ta CPAM après déclaration sur Amelipro
              (janv.-mars de l&apos;année suivante). Son versement dépend de ta CPAM et du respect des
              conditions CNAM — Mon Assistant Kiné ne peut pas le garantir.
            </p>

            <p className="text-center text-xs text-[#94a3b8] mt-3">
              D&apos;autres formules seront disponibles après les 100 places.{" "}
              <Link href="/tarifs" className="underline hover:text-[#3899aa] transition-colors">
                Voir tous les tarifs →
              </Link>
            </p>
          </ScrollReveal>
        )}

        {/* Bandeau contrats gratuits — toujours visible */}
        <ScrollReveal delay={0.2} className="mt-6">
          <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={{ background: "#f0fdf4", border: "1px solid #86efac" }}>
            <span className="text-xl shrink-0">📑</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-[#15803d]">Module Contrats de remplacement — 100 % gratuit</span>
              <span className="text-xs text-[#166534]"> · Signature électronique, déclaration Ordre en 1 clic, archivage. Offert à tous les kinés, même sans abonnement.</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d" }}>
              Gratuit
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
