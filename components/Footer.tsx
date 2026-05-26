import Link from "next/link";
import Image from "next/image";

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "https://monassistantkine.vercel.app/legal/mentions-legales.html" },
  { label: "Politique de confidentialité", href: "https://monassistantkine.vercel.app/legal/politique-confidentialite.html" },
  { label: "CGU", href: "https://monassistantkine.vercel.app/legal/cgu.html" },
];

export function Footer() {
  return (
    <footer
      className="py-8 px-4 sm:px-6 bg-white"
      style={{ borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div className="flex items-center">
          <Image
            src="/logo-mak.webp"
            alt="Mon Assistant Kiné"
            width={100}
            height={30}
            className="h-7 w-auto object-contain opacity-60"
          />
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:sylvain@monassistantkine.fr"
            className="text-xs text-[#94a3b8] hover:text-[#475569] transition-colors"
          >
            Contact
          </a>
        </nav>

        <p className="text-xs text-[#cbd5e1]">
          © 2026 Mon Assistant Kiné — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
