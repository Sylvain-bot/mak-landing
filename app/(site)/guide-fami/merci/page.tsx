import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";
import { MailCheck } from "lucide-react";
import { LEADMAGNET_CONTACT_EMAIL } from "@/lib/guideFami";

export const metadata: Metadata = {
  title: "C'est envoyé ! | Guide FAMI 2027 — Mon Assistant Kiné",
  robots: { index: false, follow: false },
};

const TRIAL_URL = "https://app.monassistantkine.fr";

export default function GuideFamiMerciPage() {
  return (
    <div className="flex flex-col min-h-svh" style={{ background: "#f2f9fa" }}>
      <header className="px-4 sm:px-6 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href="/" aria-label="Mon Assistant Kiné — accueil" className="inline-block">
            <Image src="/logo-mak.webp" alt="Mon Assistant Kiné" width={120} height={36} className="h-8 w-auto object-contain" priority />
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(56,153,170,0.12)" }}>
            <MailCheck className="size-7 text-[#3899aa]" aria-hidden />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight mb-5">
            C&apos;est envoyé ! Regarde ta boîte mail.
          </h1>
          <p className="text-[#475569] text-base leading-relaxed mb-5">
            Ton guide arrive dans quelques minutes, envoyé par{" "}
            <strong className="text-[#0f172a] font-semibold">sylvain@monassistantkine.fr</strong>. Pas reçu ?
            Vérifie tes spams ou l&apos;onglet Promotions, et ajoute cette adresse à tes contacts.
          </p>
          <p className="text-xs text-[#94a3b8]">
            <a href={`mailto:${LEADMAGNET_CONTACT_EMAIL}`} className="underline hover:text-[#3899aa] transition-colors">
              Pas reçu après 10 minutes ? Écris-nous à {LEADMAGNET_CONTACT_EMAIL}
            </a>
          </p>
        </div>

        {/* Bloc secondaire */}
        <div className="max-w-xl mx-auto mt-14 sm:mt-20 rounded-2xl bg-white p-7 sm:p-9 text-center" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-lg sm:text-xl font-semibold text-[#0f172a] mb-3">Envie de t&apos;équiper avant le 31/12 ?</h2>
          <p className="text-sm text-[#475569] leading-relaxed mb-6">
            Mon Assistant Kiné inclut une vidéotransmission sécurisée, dédiée à la télésanté et éligible aux 350 € du FAMI.
          </p>
          <a
            href={TRIAL_URL}
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl font-semibold text-sm text-[#2a7a8a] transition-colors hover:bg-[#f0f9fa] outline-none focus-visible:ring-3 focus-visible:ring-[#3899aa]/40"
            style={{ border: "1.5px solid #3899aa" }}
          >
            Tester 14 jours gratuitement
          </a>
        </div>
      </main>

      <footer className="px-4 sm:px-6 py-6 bg-white" style={{ borderTop: "1px solid #d4ecea" }}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <p>© 2026 Mon Assistant Kiné</p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/mentions-legales" className="hover:text-[#475569] transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-[#475569] transition-colors">Politique de confidentialité</Link>
            <ManageCookiesButton className="hover:text-[#475569] transition-colors" />
          </nav>
        </div>
      </footer>
    </div>
  );
}
