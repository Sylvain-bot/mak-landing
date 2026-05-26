import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/JsonLd";
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
    "Tes bilans en 3 minutes. Tes drapeaux rouges détectés. L'assistant IA conçu par des kinés, pour des kinés.",
  openGraph: {
    locale: "fr_FR",
    siteName: "Mon Assistant Kiné",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

        {/* Clarity */}
        <Script id="clarity" strategy="afterInteractive">{`
          try {
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","wrdiamqyf8");
          } catch(e) {}
        `}</Script>

        {/* Meta Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">{`
          try {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','1366387265244975');
            fbq('track','PageView');
          } catch(e) {}
        `}</Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1366387265244975&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
