import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.monassistantkine.fr"),
  title: "Mon Assistant Kiné — L'IA pour kinésithérapeutes",
  description:
    "Tu parles, ton bilan s'écrit. L'assistant IA conçu par des kinés libéraux, pour les kinés libéraux.",
  openGraph: {
    locale: "fr_FR",
    siteName: "Mon Assistant Kiné",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Layout neutre (partagé avec /admin) : aucun traceur, aucune bannière, aucun chatbot.
  // Ces éléments vivent dans app/(site)/layout.tsx, réservé aux pages publiques.
  return (
    <html
      lang="fr"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0f172a]">
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.monassistantkine.fr/#organization",
          "name": "Mon Assistant Kiné",
          "url": "https://www.monassistantkine.fr",
          "logo": "https://www.monassistantkine.fr/logo-mak.webp",
        }} />
        {children}
      </body>
    </html>
  );
}
