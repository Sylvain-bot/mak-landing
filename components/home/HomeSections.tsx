import Link from "next/link";
import { ArrowRight, Moon, ListChecks, Eye } from "lucide-react";
import { BilanDemoVisual } from "@/components/BilanDemoVisual";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";
import { primaryCtaClass, primaryCtaStyle } from "@/lib/ctaStyles";
import { FAMI_HREF } from "@/lib/modules";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.1em] text-[#236f7d]";
const h2 = "text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight text-balance";

export function HomeHero() {
  return (
    <section className="px-4 sm:px-6 pt-24 pb-14 sm:pt-32 sm:pb-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
        <div className="min-w-0">
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl font-bold text-[#0f172a] tracking-tight text-balance">
            Tu parles. <span className="text-[#2a8494]">Ton bilan s&apos;écrit.</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-xl">
            MAK écoute ta séance et retranscrit ton bilan en entier, structuré, prêt à vérifier. Et l&apos;aide FAMI
            peut couvrir ton abonnement.
          </p>
          <TrackedSignupLink location="hero" className={`${primaryCtaClass} mt-8 h-13 px-7 text-base w-full sm:w-auto`} style={primaryCtaStyle}>
            Essayer gratuitement 14 jours <ArrowRight className="size-5" aria-hidden />
          </TrackedSignupLink>
          <p className="mt-4 text-sm text-[#64748b]">[sans engagement, données hébergées en France chez un hébergeur HDS]</p>
        </div>
        <div className="min-w-0">
          <BilanDemoVisual />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  "Lance l'écoute en début de séance",
  "Fais ton bilan normalement, en parlant",
  "Relis et valide le bilan rédigé",
];

export function HowItWorks() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24" style={{ background: "#f2f9fa" }}>
      <div className="max-w-5xl mx-auto">
        <p className={eyebrow}>Comment ça marche</p>
        <h2 className={`${h2} mt-3`}>Ta séance, sans clavier.</h2>
        <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <li key={s} className="flex md:flex-col items-start gap-4 rounded-2xl bg-white p-5 sm:p-6" style={{ border: "1px solid #dcecef" }}>
              <span
                className="shrink-0 size-10 rounded-full inline-flex items-center justify-center text-base font-bold text-white"
                style={{ background: "#237584" }}
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="text-lg font-semibold text-[#0f172a] leading-snug">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-base text-[#475569]">Rien n&apos;est enregistré dans le dossier sans ta validation.</p>
      </div>
    </section>
  );
}

export function FamiBlock() {
  return (
    <section id="fami" className="px-4 sm:px-6 py-16 sm:py-24 bg-white scroll-mt-20">
      {/* Ancien ancrage de la section guide FAMI, gardé pour les liens déjà diffusés */}
      <span id="guide-fami" className="block relative -top-20" aria-hidden />
      <div className="max-w-5xl mx-auto">
        <p className={eyebrow}>Aide FAMI</p>
        <h2 className={`${h2} mt-3`}>Gratuit. Et même mieux.</h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-3 sm:gap-4">
          <div className="rounded-2xl p-5 sm:p-6 text-center" style={{ background: "#f2f9fa", border: "1px solid #dcecef" }}>
            <p className="text-sm text-[#475569]">Forfait FAMI</p>
            <p className="mt-1 text-3xl font-bold text-[#0f172a] tabular-nums">350 €<span className="text-base font-semibold">/an</span></p>
          </div>
          <span className="self-center text-center text-2xl font-bold text-[#94a3b8]" aria-label="moins">−</span>
          <div className="rounded-2xl p-5 sm:p-6 text-center" style={{ background: "#f2f9fa", border: "1px solid #dcecef" }}>
            <p className="text-sm text-[#475569]">Abonnement MAK</p>
            <p className="mt-1 text-3xl font-bold text-[#0f172a] tabular-nums">199 €<span className="text-base font-semibold">/an</span></p>
          </div>
          <span className="self-center text-center text-2xl font-bold text-[#94a3b8]" aria-label="égale">=</span>
          <div className="rounded-2xl p-5 sm:p-6 text-center text-white" style={{ background: "#1f6976" }}>
            <p className="text-sm text-white">Pour toi</p>
            <p className="mt-1 text-3xl font-bold tabular-nums">+151 €<span className="text-base font-semibold">/an</span></p>
          </div>
        </div>

        <p className="mt-5 text-sm text-[#64748b] max-w-2xl">
          Si tu ne perçois pas déjà le forfait FAMI via un autre logiciel de vidéotransmission. Forfait fixe à déclarer
          sur amelipro.
        </p>
        <Link
          href={FAMI_HREF}
          className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-[#236f7d] underline underline-offset-4 decoration-[#3899aa]/40 hover:decoration-[#236f7d] rounded outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
        >
          Télécharger le guide FAMI gratuit <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

const BENEFITS = [
  { icon: Moon, title: "Tes soirées te reviennent", text: "Ton bilan est rédigé pendant la séance, plus de rattrapage le soir." },
  { icon: ListChecks, title: "Des bilans plus complets", text: "MAK n'oublie rien de ce que tu as dit pendant l'examen." },
  { icon: Eye, title: "Ton attention reste sur ton patient", text: "Tu regardes ton patient, pas ton clavier." },
];

export function Benefits() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24" style={{ background: "#f2f9fa" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className={h2}>Moins d&apos;écran. Plus de patients.</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="size-11 rounded-xl inline-flex items-center justify-center bg-white" style={{ border: "1px solid #dcecef" }}>
                <Icon className="size-5 text-[#2a8494]" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#0f172a]">{title}</h3>
              <p className="mt-2 text-base text-[#475569] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { quote: "Je ne pense plus pouvoir me passer de l'app maintenant.", who: "Constance, kinésithérapeute, [Ville]" },
  { quote: "J'ai vraiment pris du plaisir à faire mes bilans.", who: "Kinésithérapeute, utilisateur Pionnier" },
  { quote: "Ça change mon quotidien et celui de mes patients.", who: "Kinésithérapeute, utilisateur Pionnier" },
  { quote: "C'est que le début, mais l'app est déjà très agréable à utiliser.", who: "Kinésithérapeute, utilisateur Pionnier" },
];

export function Proof() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className={h2}>Ils l&apos;utilisent au cabinet.</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t) => (
            <figure key={t.quote} className="rounded-2xl p-6 sm:p-7" style={{ background: "#f2f9fa", border: "1px solid #dcecef" }}>
              <blockquote className="text-lg text-[#0f172a] leading-relaxed">« {t.quote} »</blockquote>
              <figcaption className="mt-4 text-sm text-[#475569]">{t.who}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-base text-[#475569]">
          Présenté par l&apos;ITMP lors de la conférence sur l&apos;IA en kinésithérapie au salon Rééduca 2026.
        </p>
      </div>
    </section>
  );
}
