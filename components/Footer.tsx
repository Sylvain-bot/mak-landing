import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "CGU", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="py-10 px-4 sm:px-6"
      style={{ background: "#040810", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center">
          <Image
            src="/logo-mak.webp"
            alt="Mon Assistant Kiné"
            width={100}
            height={30}
            className="h-7 w-auto object-contain brightness-0 invert opacity-35"
          />
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-white/25 hover:text-white/55 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-white/18">
          © 2026 Mon Assistant Kiné — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
