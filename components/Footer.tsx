import Link from "next/link";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";

const linkClass = "hover:text-[#236f7d] transition-colors";

export function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-8 bg-white" style={{ borderTop: "1px solid #e2eef0" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-4 text-sm text-[#64748b]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p>© 2026 Mon Assistant Kiné</p>
          <nav aria-label="Informations légales" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/mentions-legales" className={linkClass}>Mentions légales</Link>
            <Link href="/politique-confidentialite" className={linkClass}>Confidentialité</Link>
            <a href="mailto:sylvain@monassistantkine.fr" className={linkClass}>Contact</a>
            <ManageCookiesButton className={`${linkClass} text-left`} />
          </nav>
        </div>
        {/* Liens secondaires : gardent les pages existantes reliées au site (référencement) */}
        <nav aria-label="Plus de pages" className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#64748b]">
          <Link href="/fonctionnalites" className={linkClass}>Fonctionnalités</Link>
          <Link href="/tarifs" className={linkClass}>Tarifs</Link>
          <Link href="/guide-fami" className={linkClass}>Guide FAMI gratuit</Link>
          <Link href="/blog" className={linkClass}>Blog</Link>
          <Link href="/equipe" className={linkClass}>L&apos;équipe</Link>
          <Link href="/comparatif-outils-ia-kine" className={linkClass}>Comparatif</Link>
          <Link href="/cgu" className={linkClass}>CGU</Link>
        </nav>
      </div>
    </footer>
  );
}
