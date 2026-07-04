import { ScrollReveal } from "./ScrollReveal";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const BENEFITS = [
  {
    icon: "🔁",
    title: "Infos pré-remplies à chaque contrat",
    desc: "Numéro d'ordre, adresse, coordonnées — saisis une fois, pré-remplis pour toujours.",
  },
  {
    icon: "📁",
    title: "Tous tes contrats archivés",
    desc: "Retrouve n'importe quel contrat passé en quelques secondes.",
  },
  {
    icon: "✅",
    title: "Déclaration à l'Ordre en 1 clic",
    desc: "Conformité automatique. Plus de démarche manuelle.",
  },
  {
    icon: "📄",
    title: "Export PDF en 1 clic",
    desc: "Contrat signé, mis en forme, prêt à envoyer.",
  },
];

const STEPS = [
  { num: "1", label: "Crée le contrat en 2 min" },
  { num: "2", label: "Invite ton remplaçant par lien" },
  { num: "3", label: "Il signe électroniquement" },
  { num: "4", label: "Déclaration Ordre en 1 clic" },
];

export function ContratSection() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-5xl mx-auto">

        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
            style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            100 % gratuit — pour tous les kinés, pour toujours
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
            Tes contrats de remplacement.<br />
            <span className="text-[#3899aa]">Sans paperasse. Entre kinés.</span>
          </h2>
          <p className="text-base text-[#475569] max-w-2xl mx-auto">
            Mon Assistant Kiné offre à toute la communauté un module complet de gestion des contrats de remplacement —
            de la rédaction à la déclaration ordinale. Gratuit. Sans abonnement. Sans limite.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Avantages */}
          <ScrollReveal className="h-full">
            <div className="h-full bg-white rounded-2xl p-7 flex flex-col" style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 16px rgba(56,153,170,0.07)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3899aa] mb-5">Ce que tu gagnes</p>
              <div className="space-y-5 flex-1">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}>
                      {b.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0f172a] text-sm mb-0.5">{b.title}</p>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Comment ça marche + CTA — une seule carte qui s'étire */}
          <ScrollReveal delay={0.1} className="h-full">
            <div className="h-full bg-white rounded-2xl p-7 flex flex-col" style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 16px rgba(56,153,170,0.07)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3899aa] mb-5">Comment ça marche</p>
              <div className="space-y-4 flex-1">
                {STEPS.map((s, i) => (
                  <div key={s.num} className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#3899aa]"
                        style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}>
                        {s.num}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-px flex-1 mt-1" style={{ background: "#d4ecea", minHeight: 20 }} />
                      )}
                    </div>
                    <p className="text-sm text-[#475569] font-medium pt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA intégré en bas de la carte */}
              <div className="rounded-2xl p-5 mt-6" style={{ background: "#3899aa" }}>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                  <span className="text-white/90 text-sm font-medium">Sans carte bancaire</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0" />
                  <span className="text-white/90 text-sm font-medium">Accès immédiat, gratuit à vie</span>
                </div>
                <Link
                  href="https://app.monassistantkine.fr/signup"
                  className="inline-flex items-center justify-center gap-2 w-full bg-white text-[#3899aa] font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-[#f0f9fa] transition-all hover:scale-[1.02]"
                >
                  Accéder au module contrats
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-white/60 text-xs text-center mt-3">
                  Déjà un compte ?{" "}
                  <a href="https://app.monassistantkine.fr/login" className="underline text-white/80 hover:text-white">
                    Se connecter
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Quote communautaire */}
        <ScrollReveal delay={0.2} className="mt-10">
          <div className="text-center" style={{ borderTop: "1px solid #d4ecea", paddingTop: "32px" }}>
            <p className="text-[#64748b] text-sm italic max-w-xl mx-auto leading-relaxed">
              &ldquo;Les remplacements font partie du quotidien du kiné libéral. On a voulu que chaque remplacement soit simple, traçable, et conforme — pour le titulaire comme pour le remplaçant.&rdquo;
            </p>
            <p className="text-xs text-[#94a3b8] mt-2">— Sylvain & Valentin, co-fondateurs kinés D.E.</p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
