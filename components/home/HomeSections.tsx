import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Moon, ListChecks, Eye, Monitor, Tablet, Smartphone, Award } from "lucide-react";
import { BilanComposition, EncoderStrip } from "@/components/BilanDemoVisual";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { TrackedLink } from "@/components/TrackedLink";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";
import { primaryCtaClass, primaryCtaStyle } from "@/lib/ctaStyles";
import { FAMI_HREF, MODULES, ALL_FEATURES_HREF } from "@/lib/modules";
import { TIME_SAVED_PER_BILAN } from "@/lib/claims";

// Disposition inspirée de la maquette « Page d'accueil V3 » : sections centrées,
// alternance blanc / fond clair, grandes cartes arrondies. Typo et couleurs du site.

const GROUND = "#f2f9fa";
const h2 = "text-3xl sm:text-5xl font-bold text-[#0f172a] leading-[1.08] tracking-tight text-balance text-center";

export function HomeHero() {
  return (
    <section className="px-4 sm:px-6 pt-28 pb-12 sm:pt-36 sm:pb-16" style={{ background: GROUND }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#236f7d]">Bilan kiné dicté</p>
        <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] font-bold text-[#0f172a] tracking-tight">
          Tu parles.
          <br />
          <span className="text-[#2a8494]">Ton bilan s&apos;écrit.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-2xl">
          Mon Assistant Kiné écoute ta séance et retranscrit ton bilan en entier, structuré, prêt à vérifier. Et l&apos;aide FAMI
          peut couvrir ton abonnement.
        </p>
        <TrackedSignupLink location="hero" className={`${primaryCtaClass} mt-8 h-14 px-8 text-base sm:text-lg w-full sm:w-auto`} style={primaryCtaStyle}>
          Essayer gratuitement 14 jours <ArrowRight className="size-5" aria-hidden />
        </TrackedSignupLink>
        <p className="mt-4 text-sm text-[#64748b]">Données de santé hébergées en France chez un hébergeur certifié HDS</p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#334155]" style={{ border: "1px solid #dcecef" }}>
          <Award className="size-4 text-[#236f7d]" aria-hidden />
          Présenté par l&apos;ITMP au salon Rééduca 2026
        </p>
      </div>

      {/* Illustration : le téléphone pendant l'écoute devant le bilan rédigé */}
      <div className="mx-auto mt-8 sm:mt-10 w-full max-w-[640px]">
        <BilanComposition priority />
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
    <section className="px-4 sm:px-6 py-20 sm:py-28" style={{ background: GROUND }}>
      <div className="max-w-6xl mx-auto">
        <h2 className={h2}>Ta séance, sans clavier.</h2>
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {STEPS.map((s, i) => (
            <li key={s} className="rounded-3xl bg-white p-7 sm:p-9 flex flex-col gap-5">
              <span
                className="size-12 rounded-full inline-flex items-center justify-center text-lg font-bold text-white"
                style={{ background: "#237584" }}
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="text-xl font-semibold text-[#0f172a] leading-snug">{s}</p>
            </li>
          ))}
        </ol>

        {/* Bande déroulante : de la dictée (à gauche) au bilan structuré (à droite) */}
        <div className="mt-10 sm:mt-12">
          <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2 px-1">
            <span className="text-[#64748b]">Ce que tu dis</span>
            <span className="text-[#236f7d]">Ce que Mon Assistant Kiné rédige</span>
          </div>
          <EncoderStrip />
        </div>

        <p className="mt-8 text-base sm:text-lg text-[#475569] text-center">
          Rien n&apos;est enregistré dans le dossier sans ta validation.
        </p>
      </div>
    </section>
  );
}

export function FamiBlock() {
  return (
    <section id="fami" className="px-4 sm:px-6 py-20 sm:py-28 scroll-mt-20 bg-white">
      {/* Ancien ancrage de la section guide FAMI, gardé pour les liens déjà diffusés */}
      <span id="guide-fami" className="block relative -top-20" aria-hidden />
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h2 className={h2}>Gratuit. Et même mieux.</h2>
        <p className="mt-5 text-lg sm:text-xl text-[#475569] max-w-2xl leading-relaxed">
          Mon Assistant Kiné inclut un module de vidéotransmission sécurisée qui te rend éligible au forfait FAMI.
        </p>

        <div className="mt-10 w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5">
          <div className="rounded-3xl px-8 py-7 sm:min-w-[210px]" style={{ background: GROUND }}>
            <p className="text-sm text-[#475569]">Forfait FAMI</p>
            <p className="mt-1 text-4xl sm:text-[2.6rem] font-bold text-[#0f172a] tabular-nums">350 €<span className="text-lg font-semibold">/an</span></p>
          </div>
          <span className="text-3xl sm:text-4xl text-[#94a3b8]" aria-label="moins">−</span>
          <div className="rounded-3xl px-8 py-7 sm:min-w-[210px]" style={{ background: GROUND }}>
            <p className="text-sm text-[#475569]">Abonnement Pionnier annuel</p>
            <p className="mt-1 text-4xl sm:text-[2.6rem] font-bold text-[#0f172a] tabular-nums">199 €<span className="text-lg font-semibold">/an</span></p>
          </div>
          <span className="text-3xl sm:text-4xl text-[#94a3b8]" aria-label="égale">=</span>
          <div className="rounded-3xl px-8 py-7 sm:min-w-[210px] text-white" style={{ background: "#1f6976" }}>
            <p className="text-sm text-white">Pour toi</p>
            <p className="mt-1 text-4xl sm:text-[2.6rem] font-bold tabular-nums">+151 €<span className="text-lg font-semibold">/an</span></p>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#64748b] max-w-xl leading-relaxed">
          Si tu ne perçois pas déjà le forfait FAMI via un autre logiciel de vidéotransmission. Forfait fixe à déclarer
          sur amelipro.
        </p>
        <Link
          href={FAMI_HREF}
          className="mt-6 inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold text-[#236f7d] underline underline-offset-4 decoration-[#3899aa]/40 hover:decoration-[#236f7d] rounded outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
        >
          Télécharger le guide FAMI gratuit <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

const BENEFITS: { icon: typeof Moon; title: string; text: string; stat?: string }[] = [
  {
    icon: Moon,
    title: "Tes soirées te reviennent",
    text: "Ton bilan est rédigé pendant la séance, plus de rattrapage le soir.",
    // TODO: chiffre mesuré à fournir (lib/claims.ts → TIME_SAVED_PER_BILAN). Vide = rien d'affiché.
    stat: TIME_SAVED_PER_BILAN,
  },
  { icon: ListChecks, title: "Des bilans plus complets", text: "Mon Assistant Kiné n'oublie rien de ce que tu as dit pendant l'examen." },
  { icon: Eye, title: "Ton attention reste sur ton patient", text: "Tu regardes ton patient, pas ton clavier." },
];

export function Benefits() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28" style={{ background: GROUND }}>
      <div className="max-w-6xl mx-auto">
        <h2 className={h2}>Moins d&apos;écran. Plus de patients.</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {BENEFITS.map(({ icon: Icon, title, text, stat }) => (
            <div key={title} className="rounded-3xl bg-white p-7 sm:p-9 flex flex-col gap-4">
              <Icon className="size-9 text-[#236f7d]" strokeWidth={1.8} aria-hidden />
              {/* TODO: chiffre mesuré à fournir — masqué tant qu'il est vide */}
              {stat ? <p className="text-2xl sm:text-3xl font-bold text-[#236f7d] tabular-nums">{stat}</p> : null}
              <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-snug">{title}</h3>
              <p className="text-base sm:text-[17px] text-[#475569] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section className="py-20 sm:py-28" style={{ background: GROUND }}>
      <div className="px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className={h2}>Ils l&apos;utilisent au cabinet.</h2>
      </div>
      {/* Bande déroulante pleine largeur (pause au survol) */}
      <div className="mt-12">
        <TestimonialsCarousel />
      </div>
    </section>
  );
}

// Les autres modules, en liste discrète : on montre que l'outil couvre tout le cabinet
// sans détourner de l'appel à l'action principal (liens vers les pages, pas vers l'inscription).
export function AlsoInside() {
  const others = MODULES.filter((m) => m.slug !== "documentation-bilan-kine");
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className={h2}>Et autour du bilan, tout ton cabinet.</h2>
        <p className="mt-4 text-lg text-[#475569] text-center">Un seul outil pour la séance, le suivi et l&apos;administratif.</p>
        <ul className="mt-10 divide-y divide-[#dcecef] border-y border-[#dcecef]">
          {others.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="group flex items-center justify-between gap-4 py-5 px-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
              >
                <span className="min-w-0">
                  <span className="block text-lg font-semibold text-[#0f172a] group-hover:text-[#236f7d] transition-colors">{m.name}</span>
                  <span className="block text-base text-[#475569] mt-0.5">{m.pitch}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-[#236f7d] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-base text-[#475569] text-center">
          Tu veux voir ces outils en action ?{" "}
          <TrackedLink
            href="/replay"
            event="cta_replay_click"
            properties={{ location: "also-inside" }}
            className="inline-flex items-center gap-1 font-semibold text-[#236f7d] underline underline-offset-4 decoration-[#3899aa]/40 hover:decoration-[#236f7d] rounded outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
          >
            Regarde le replay du live de lancement <ArrowRight className="size-4" aria-hidden />
          </TrackedLink>
        </p>
        <div className="mt-6 text-center">
          <Link
            href={ALL_FEATURES_HREF}
            className="inline-flex items-center gap-1.5 text-base font-semibold text-[#236f7d] underline underline-offset-4 decoration-[#3899aa]/40 hover:decoration-[#236f7d] rounded outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
          >
            Voir toutes les fonctionnalités <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

const DEVICES = [
  { icon: Monitor, label: "Ordinateur" },
  { icon: Tablet, label: "Tablette" },
  { icon: Smartphone, label: "Téléphone" },
];

export function Devices() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h2 className={h2}>Sur tous tes écrans, sans installation.</h2>
        <p className="mt-5 text-lg sm:text-xl text-[#475569] max-w-2xl leading-relaxed">
          Mon Assistant Kiné fonctionne directement dans ton navigateur et s&apos;adapte à ton ordinateur, ta tablette
          et ton téléphone : au cabinet, en déplacement ou entre deux patients. Aucune application à installer.
        </p>
        <Image
          src="/new_se-removebg-preview.png"
          alt="Mon Assistant Kiné affiché sur un ordinateur, une tablette et un téléphone"
          width={707}
          height={353}
          sizes="(min-width: 768px) 640px, 92vw"
          className="mt-10 w-full max-w-[640px] h-auto"
        />
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {DEVICES.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#0f172a]" style={{ background: GROUND }}>
              <Icon className="size-4 text-[#236f7d]" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Témoignages Copilote (réels, publiés avec accord) : sortis du carrousel pour illustrer ce bloc.
const COPILOTE_QUOTES = [
  {
    quote: "J'avais un doute sur une prise en charge cervicale. En 30 secondes j'avais une orientation structurée.",
    author: "Amandine S.",
    location: "Toulouse",
  },
  {
    quote: "Le Copilote, c'est vraiment un game changer. Une simple question peut changer ma pratique.",
    author: "Pierre L.",
    location: "Quimper",
  },
];

// Le Copilote éclaire la décision, il ne la prend pas : on parle de réponse « sourcée » et d'« orientation ».
export function CopiloteBlock() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#236f7d]">Copilote IA clinique</p>
        <h2 className={`${h2} mt-4`}>Un doute clinique ? Une réponse sourcée en 30 secondes.</h2>
        <p className="mt-5 text-lg sm:text-xl text-[#475569] max-w-2xl leading-relaxed">
          Pose ta question comme à un confrère. Le Copilote te donne une orientation structurée, avec ses références.
        </p>
        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
          {COPILOTE_QUOTES.map((t) => (
            <figure key={t.author} className="m-0 rounded-3xl p-7 sm:p-9 flex flex-col justify-between gap-5" style={{ background: GROUND }}>
              <blockquote className="text-lg sm:text-xl text-[#0f172a] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="text-sm sm:text-[15px] text-[#475569]">
                <strong className="font-semibold text-[#0f172a]">{t.author}</strong> · {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
        <Link
          href="/fonctionnalites/aide-decision-clinique"
          className="mt-8 inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold text-[#236f7d] underline underline-offset-4 decoration-[#3899aa]/40 hover:decoration-[#236f7d] rounded outline-none focus-visible:ring-2 focus-visible:ring-[#3899aa]/50"
        >
          Découvrir le Copilote <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
