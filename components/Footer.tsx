import Link from "next/link";
import Image from "next/image";

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "CGU", href: "/cgu" },
];

// Liste canonique des fonctionnalités — utilisée dans le footer de toutes les pages
export const FEATURES_NAV = [
  { href: "/fonctionnalites/documentation-bilan-kine", label: "Bilans NGAP en 3 min" },
  { href: "/fonctionnalites/aide-decision-clinique", label: "Copilote IA Kiné" },
  { href: "/fonctionnalites/suivi-patient", label: "Suivi patient WhatsApp" },
  { href: "/fonctionnalites/gestion-administrative", label: "Gestion administrative" },
  { href: "/fonctionnalites/contrats-remplacement", label: "Contrats de remplacement — Gratuit" },
];

export function Footer() {
  return (
    <footer
      className="py-10 px-4 sm:px-6 bg-white"
      style={{ borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-8">
          {/* Logo + baseline */}
          <div className="flex flex-col gap-2">
            <Image
              src="/logo-mak.webp"
              alt="Mon Assistant Kiné"
              width={100}
              height={30}
              className="h-7 w-auto object-contain opacity-60"
            />
            <p className="text-xs text-[#94a3b8]">Conçu par deux kinésithérapeutes D.E. libéraux</p>
          </div>

          {/* Fonctionnalités */}
          <div>
            <p className="text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-3">Fonctionnalités</p>
            <nav className="flex flex-col gap-1.5">
              {FEATURES_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Légal + contact */}
          <div>
            <p className="text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-3">Légal</p>
            <nav className="flex flex-col gap-1.5">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="mailto:sylvain@monassistantkine.fr"
                className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid #d4ecea" }}>
          <p className="text-xs text-[#cbd5e1]">
            © 2026 Mon Assistant Kiné — Tous droits réservés
          </p>
          <p className="text-xs text-[#cbd5e1]">
            RGPD · Données hébergées en France
          </p>
        </div>
      </div>
    </footer>
  );
}
