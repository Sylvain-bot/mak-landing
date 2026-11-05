import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, CheckCircle2, CalendarClock, Users, MailCheck, ArrowRight } from "lucide-react";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";
import { MerciVideo } from "@/components/merci/MerciVideo";
import { LEADMAGNET_CONTACT_EMAIL } from "@/lib/guideFami";
import { primaryCtaClass, primaryCtaStyle } from "@/lib/ctaStyles";
import { getPionnierPlacesLeft, PIONNIER_TOTAL_PLACES } from "@/lib/pionniers";
import {
  FAMI_AMOUNT,
  PRICE_PIONNIER,
  PRICE_PIONNIER_ANNUAL,
  PRIVACY_POLICY_URL,
  COMPLIANCE_CLAIM,
} from "@/lib/claims";

export const metadata: Metadata = {
  title: "C'est envoyé ! | Guide FAMI 2027 — Mon Assistant Kiné",
  robots: { index: false, follow: false },
};

// Page merci du guide FAMI, construite comme une page de vente courte (vidéo d'abord) :
// titre qui demande 2 minutes, vidéo, un seul bouton, l'offre, deux échéances réelles, avis, questions.
// Vidéo : déposer le fichier dans public/videos/ puis renseigner VIDEO_SRC (vide = cadre « Vidéo à venir »).
const VIDEO_SRC = "";
const VIDEO_POSTER = undefined;
const VIDEO_RATIO: "16/9" | "9/16" = "16/9";

// Offre réservée à cette page : -10 % la première année, via un lien de paiement dédié (fourni par Valentin).
// Tant que le lien est vide, les boutons mènent à l'inscription standard.
const MERCI_SIGNUP_URL = "";
const FIRST_YEAR_DISCOUNT = 0.1;

const NAVY = "#0f172a";
const GOLD = "#e8b04d";
const GROUND = "#f2f9fa";

const eur = (n: number) =>
  new Intl.NumberFormat("fr-FR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n) + " €";

// TODO-FONDATEUR : valeurs estimées par module (ce que coûterait un outil équivalent), à valider avant la mise en ligne.
// null = « offert ».
const VALUE_STACK: { name: string; detail: string; value: number | null }[] = [
  { name: "Bilan dicté", detail: "Tu parles pendant la séance, ton bilan NGAP se rédige.", value: 360 },
  { name: "Copilote IA clinique", detail: "Questions cliniques et bibliographiques, 60 000+ textes, réponses sourcées.", value: 240 },
  { name: "Suivi patient et exercices", detail: "Programme d'exercices sur WhatsApp, suivi entre les séances.", value: 240 },
  { name: "Vidéotransmission sécurisée", detail: "Téléconsultation dédiée à la télésanté, éligible au FAMI.", value: 180 },
  { name: "Gestion administrative", detail: "Courriers et relances rédigés depuis tes modèles.", value: 120 },
  { name: "Contrats de remplacement", detail: "Rédigés, signés et déclarés à l'Ordre.", value: 60 },
  { name: "Prix Pionnier bloqué à vie", detail: "Même quand les tarifs augmenteront.", value: null },
  { name: "Communauté privée avec les fondateurs", detail: "Tes retours façonnent l'outil.", value: null },
];
const STACK_TOTAL = VALUE_STACK.reduce((s, x) => s + (x.value ?? 0), 0);
const ANNUAL = Number(PRICE_PIONNIER_ANNUAL);
const FIRST_YEAR_PRICE = Math.round(ANNUAL * (1 - FIRST_YEAR_DISCOUNT) * 100) / 100;
const NET_GAIN = Math.round((Number(FAMI_AMOUNT) - FIRST_YEAR_PRICE) * 100) / 100;

const REVIEWS = [
  {
    quote:
      "L'enregistrement de séance, c'est génial ! Les bilans sont plus complets car plus besoin de se creuser le soir pour se souvenir de ce qui a été dit. Plus qu'à relire et enregistrer, et plus jamais de bilans en retard : le rêve.",
    author: "Constance",
    location: "Gueugnon",
  },
  {
    quote: "Je rédige mes bilans directement pendant les séances. Mes soirées m'appartiennent à nouveau.",
    author: "Marion D.",
    location: "Biot",
  },
  {
    quote: "Avec le suivi patient, j'ai une bien meilleure observance. Mes patients font vraiment leurs exercices entre les séances.",
    author: "Clément B.",
    location: "Lyon",
  },
];

const QUESTIONS = [
  {
    q: "Je vais être débité tout de suite ?",
    a: "Non. Les 14 jours d'essai sont complets et gratuits. La carte bancaire est demandée à l'inscription, mais tu n'es débité qu'à la fin de l'essai, si tu gardes l'abonnement.",
  },
  {
    q: "Je peux arrêter quand je veux ?",
    a: "Oui. L'essai se résilie à tout moment, et l'abonnement mensuel est sans engagement. L'annuel engage sur 12 mois, payés en une fois, à un tarif plus bas.",
  },
  {
    q: "Et les données de mes patients ?",
    a: "Elles sont chiffrées, hébergées en France chez un hébergeur certifié HDS, et ne servent jamais à entraîner des modèles d'IA.",
  },
];

function Cta({ location, placesLeft }: { location: string; placesLeft: number | null }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <TrackedSignupLink
        location={location}
        href={MERCI_SIGNUP_URL}
        className={`${primaryCtaClass} h-14 px-8 text-lg w-full sm:w-auto`}
        style={primaryCtaStyle}
      >
        Je teste 14 jours <ArrowRight className="size-5" aria-hidden />
      </TrackedSignupLink>
      <p className="text-sm text-[#475569] text-center">
        -{FIRST_YEAR_DISCOUNT * 100} % la première année, réservé à cette page
        {placesLeft !== null && (
          <>
            {" "}· <strong className="font-semibold text-[#9a6b12]">plus que {placesLeft} places Pionnier</strong>
          </>
        )}
      </p>
    </div>
  );
}

function PlacesCounter({ placesLeft }: { placesLeft: number }) {
  const taken = PIONNIER_TOTAL_PLACES - placesLeft;
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-bold text-[#0f172a] tabular-nums">
          {placesLeft} places restantes
        </span>
        <span className="text-[#475569] tabular-nums">sur {PIONNIER_TOTAL_PLACES}</span>
      </div>
      <div
        className="mt-2 h-2.5 rounded-full overflow-hidden"
        style={{ background: "rgba(232,176,77,0.18)" }}
        role="progressbar"
        aria-label="Places Pionnier déjà prises"
        aria-valuemin={0}
        aria-valuemax={PIONNIER_TOTAL_PLACES}
        aria-valuenow={taken}
      >
        <div className="h-full rounded-full" style={{ width: `${(taken / PIONNIER_TOTAL_PLACES) * 100}%`, background: GOLD }} />
      </div>
    </div>
  );
}

export default async function GuideFamiMerciPage() {
  const placesLeft = await getPionnierPlacesLeft();
  return (
    <div className="flex flex-col min-h-svh bg-white">
      <header className="px-4 sm:px-6 py-4" style={{ background: GROUND }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" aria-label="Mon Assistant Kiné — accueil" className="inline-block shrink-0">
            <Image src="/logo-mak.webp" alt="Mon Assistant Kiné" width={120} height={36} className="h-8 w-auto object-contain" priority />
          </Link>
          {/* Deux étapes : le guide est envoyé, il reste la vidéo */}
          <ol className="flex items-center gap-2 text-xs sm:text-sm font-semibold" aria-label="Étapes">
            <li className="flex items-center gap-1.5 text-[#236f7d]">
              <CheckCircle2 className="size-4" aria-hidden /> Guide envoyé
            </li>
            <li aria-hidden className="w-6 h-px bg-[#94a3b8]" />
            <li className="flex items-center gap-1.5 text-[#0f172a]">
              <span className="flex items-center justify-center size-4 rounded-full text-[10px] text-white" style={{ background: NAVY }}>2</span>
              La vidéo
            </li>
          </ol>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. Titre + vidéo + bouton */}
        <section className="px-4 sm:px-6 pt-10 pb-16 sm:pt-14 sm:pb-20" style={{ background: GROUND }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#236f7d]">
              <MailCheck className="size-4" aria-hidden /> Ton guide FAMI arrive dans ta boîte mail
            </p>
            <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-[#0f172a] leading-[1.08] tracking-tight text-balance">
              Je t&apos;offre le guide.
              <br />
              <span className="text-[#236f7d]">Tu m&apos;offres 2 minutes ?</span>
            </h1>
            <p className="mt-5 text-lg text-[#475569] leading-relaxed text-balance">
              En attendant ton mail, je te montre comment récupérer les {FAMI_AMOUNT} € de la vidéotransmission, et
              rentrer chez toi avec tes bilans déjà écrits.
            </p>
            <div className="mt-8 sm:mt-10">
              <MerciVideo src={VIDEO_SRC} poster={VIDEO_POSTER} ratio={VIDEO_RATIO} />
            </div>
            <div className="mt-8 sm:mt-10">
              <Cta location="merci-video" placesLeft={placesLeft} />
            </div>
          </div>
        </section>

        {/* 2. L'offre */}
        <section className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#475569] text-center">L&apos;offre Pionnier</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight tracking-tight text-balance text-center">
              Tout ce que tu as dès aujourd&apos;hui
            </h2>
            {/* La pile de valeur : chaque module avec sa valeur estimée, puis le prix réel */}
            <div className="mt-10 rounded-3xl overflow-hidden" style={{ border: "1px solid #d4ecea" }}>
              <ul className="divide-y divide-[#dcecef]" style={{ background: GROUND }}>
                {VALUE_STACK.map((x) => (
                  <li key={x.name} className="flex items-start gap-3 px-5 sm:px-7 py-4">
                    <Check className="size-5 mt-0.5 shrink-0" style={{ color: x.value === null ? "#b07d1a" : "#236f7d" }} aria-hidden />
                    <span className="flex-1 min-w-0">
                      <strong className="block font-semibold text-[#0f172a]">{x.name}</strong>
                      <span className="block text-sm text-[#475569] mt-0.5">{x.detail}</span>
                    </span>
                    <span className="shrink-0 text-right text-sm sm:text-base font-semibold tabular-nums text-[#475569]">
                      {x.value === null ? <span style={{ color: "#9a6b12" }}>Offert</span> : <>{eur(x.value)}/an</>}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline justify-between gap-4 px-5 sm:px-7 py-4 bg-white">
                <span className="font-semibold text-[#0f172a]">Valeur estimée</span>
                <span className="text-lg font-bold tabular-nums text-[#0f172a]">{eur(STACK_TOTAL)}/an</span>
              </div>
            </div>

            {/* Le prix, la réduction de cette page, puis le calcul FAMI */}
            <div className="mt-6 rounded-3xl px-6 py-8 sm:px-10 text-center" style={{ background: NAVY }}>
              <p className="text-sm text-[#cbd5e1]">Ton prix Pionnier</p>
              <p className="mt-2 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 tabular-nums">
                <span className="text-xl text-[#94a3b8] line-through decoration-[#94a3b8]/70">{eur(ANNUAL)}/an</span>
                <span className="text-4xl sm:text-5xl font-bold text-white">{eur(FIRST_YEAR_PRICE)}</span>
                <span className="text-lg font-semibold text-white">/an</span>
              </p>
              <p className="mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-bold" style={{ background: "rgba(232,176,77,0.15)", color: GOLD }}>
                -{FIRST_YEAR_DISCOUNT * 100} % la première année, réservé à cette page
              </p>
              <p className="mt-2 text-sm text-[#cbd5e1]">Ou {PRICE_PIONNIER} €/mois, sans engagement.</p>

              <div className="mt-7 pt-7 border-t border-white/10">
                <p className="text-sm text-[#cbd5e1]">Et avec le forfait FAMI vidéotransmission :</p>
                <p className="mt-3 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  <span>{eur(Number(FAMI_AMOUNT))}</span>
                  <span className="text-[#94a3b8]" aria-label="moins">−</span>
                  <span>{eur(FIRST_YEAR_PRICE)}</span>
                  <span className="text-[#94a3b8]" aria-label="égale">=</span>
                  <span style={{ color: GOLD }}>+{eur(NET_GAIN)} pour toi</span>
                </p>
                <p className="mt-4 text-sm text-[#cbd5e1] max-w-xl mx-auto leading-relaxed">
                  La première année. Si tu ne perçois pas déjà le forfait via un autre logiciel de vidéotransmission. Forfait
                  fixe à déclarer sur amelipro, versé par ta CPAM.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Les deux échéances */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl p-6 sm:p-7" style={{ background: "rgba(232,176,77,0.08)", border: "1.5px solid rgba(232,176,77,0.5)" }}>
              <CalendarClock className="size-7" style={{ color: "#b07d1a" }} aria-hidden />
              <h3 className="mt-3 text-lg font-bold text-[#0f172a]">Le 31 décembre compte</h3>
              <p className="mt-2 text-[15px] text-[#475569] leading-relaxed">
                Le FAMI est calculé sur ton équipement au 31 décembre. Équipé en janvier, c&apos;est une année de forfait
                en moins.
              </p>
            </div>
            <div className="rounded-3xl p-6 sm:p-7" style={{ background: "rgba(232,176,77,0.08)", border: "1.5px solid rgba(232,176,77,0.5)" }}>
              <Users className="size-7" style={{ color: "#b07d1a" }} aria-hidden />
              <h3 className="mt-3 text-lg font-bold text-[#0f172a]">100 places Pionnier</h3>
              <p className="mt-2 text-[15px] text-[#475569] leading-relaxed">
                Le tarif Pionnier, bloqué à vie, est réservé aux {`${PIONNIER_TOTAL_PLACES} premiers`} kinés. Ensuite, l&apos;offre
                ferme.
              </p>
              {placesLeft !== null && <PlacesCounter placesLeft={placesLeft} />}
            </div>
          </div>
          <div className="mt-10">
            <Cta location="merci-offre" placesLeft={placesLeft} />
          </div>
        </section>

        {/* 4. Avis */}
        <section className="px-4 sm:px-6 py-16 sm:py-24" style={{ background: GROUND }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight tracking-tight text-balance text-center">
              Ils l&apos;utilisent déjà au cabinet
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <figure key={r.author} className="rounded-3xl bg-white p-6 sm:p-7 flex flex-col" style={{ border: "1px solid #d4ecea" }}>
                  <blockquote className="text-[15px] text-[#0f172a] leading-relaxed flex-1">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm text-[#475569]">
                    <strong className="font-semibold text-[#0f172a]">{r.author}</strong> · {r.location}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Questions + dernier bouton */}
        <section className="px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight tracking-tight text-center">Tes questions</h2>
            <dl className="mt-10 divide-y divide-[#dcecef] border-y border-[#dcecef]">
              {QUESTIONS.map((x) => (
                <div key={x.q} className="py-5">
                  <dt className="text-lg font-semibold text-[#0f172a]">{x.q}</dt>
                  <dd className="mt-2 text-base text-[#475569] leading-relaxed">{x.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-[#475569] text-center">{COMPLIANCE_CLAIM}</p>
            <div className="mt-10">
              <Cta location="merci-bas" placesLeft={placesLeft} />
            </div>

            {/* Rappel mail, en bas : la vidéo passe d'abord */}
            <div className="mt-16 rounded-2xl p-6 text-center" style={{ background: GROUND }}>
              <p className="text-sm text-[#475569] leading-relaxed">
                Ton guide est envoyé par <strong className="text-[#0f172a] font-semibold">sylvain@monassistantkine.fr</strong>.
                Pas reçu ? Vérifie tes spams ou l&apos;onglet Promotions, et ajoute cette adresse à tes contacts.
              </p>
              <p className="mt-2 text-xs text-[#94a3b8]">
                <a href={`mailto:${LEADMAGNET_CONTACT_EMAIL}`} className="underline hover:text-[#3899aa] transition-colors">
                  Toujours rien après 10 minutes ? Écris-nous à {LEADMAGNET_CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 sm:px-6 py-6 bg-white" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <p>© 2026 Mon Assistant Kiné</p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/mentions-legales" className="hover:text-[#475569] transition-colors">Mentions légales</Link>
            <Link href={PRIVACY_POLICY_URL} className="hover:text-[#475569] transition-colors">Politique de confidentialité</Link>
            <ManageCookiesButton className="hover:text-[#475569] transition-colors" />
          </nav>
        </div>
      </footer>
    </div>
  );
}
