import type { ReactNode } from "react";
import { Figtree, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/JsonLd";
import { bioSchema } from "@/lib/schemas/bio.schema";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata = {
  title: "À propos — Mon Assistant Kiné, l'IA créée par des kinés pour des kinés",
  description: "Découvrez Mon Assistant Kiné : deux kinésithérapeutes diplômés d'État qui ont créé l'IA pour transformer la pratique clinique des kinés libéraux.",
  alternates: {
    canonical: "https://www.monassistantkine.fr/bio",
  },
  openGraph: {
    title: "À propos — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/bio",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function BioLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${figtree.variable} ${dmSerif.variable}`}>
      <JsonLd data={bioSchema} />
      {/* Preconnect — réduit la latence des scripts tiers */}
      <link rel="preconnect" href="https://www.clarity.ms" />
      <link rel="preconnect" href="https://connect.facebook.net" />
      <link rel="preconnect" href="https://www.facebook.com" />

      {children}

      {/* [1+2] Page Lifecycle API + beacon
          - visibilitychange filtre les faux positifs < 800ms (Instagram/FB)
          - freeze (Page Lifecycle) = page réellement suspendue par l'OS
          - pagehide tague l'exit reason (bfcache vs closed) au dernier moment
            pour que le beacon interne de Clarity l'embarque avant fermeture */}
      <Script id="mak-lifecycle" strategy="afterInteractive">{`
        try {
          var _mak_hideStart = 0;

          document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
              _mak_hideStart = Date.now();
            } else if (_mak_hideStart > 0) {
              var elapsed = Date.now() - _mak_hideStart;
              if (elapsed < 800) {
                try { clarity("set", "false_hide", "true"); } catch(e) {}
              }
              _mak_hideStart = 0;
            }
          });

          document.addEventListener('freeze', function() {
            try { clarity("set", "page_frozen", "true"); } catch(e) {}
          });

          window.addEventListener('pagehide', function(ev) {
            try {
              clarity("set", "exit_type", ev.persisted ? "bfcache" : "closed");
            } catch(e) {}
          });
        } catch(e) {}
      `}</Script>

      {/* Marquage UTM dans Clarity — filtre par source dans le dashboard */}
      <Script id="mak-utm" strategy="afterInteractive">{`
        try {
          var _mak_params = new URLSearchParams(window.location.search);
          var _mak_source = _mak_params.get('utm_source') || 'direct';
          var _mak_medium = _mak_params.get('utm_medium') || 'none';
          var _mak_campaign = _mak_params.get('utm_campaign') || 'none';
          if (window.clarity) {
            clarity("set", "utm_source", _mak_source);
            clarity("set", "utm_medium", _mak_medium);
            clarity("set", "utm_campaign", _mak_campaign);
          } else {
            window.addEventListener('load', function() {
              try {
                clarity("set", "utm_source", _mak_source);
                clarity("set", "utm_medium", _mak_medium);
                clarity("set", "utm_campaign", _mak_campaign);
              } catch(e) {}
            });
          }
        } catch(e) {}
      `}</Script>

      {/* Détection navigateur intégré Instagram/Facebook — tague les sessions Clarity */}
      <Script id="mak-browser" strategy="afterInteractive">{`
        try {
          var _mak_ua = navigator.userAgent || '';
          var _mak_browser = 'other';
          if (_mak_ua.indexOf('Instagram') > -1) {
            _mak_browser = 'instagram_webview';
          } else if (_mak_ua.indexOf('FBAN') > -1 || _mak_ua.indexOf('FBAV') > -1) {
            _mak_browser = 'facebook_webview';
          } else if (_mak_ua.indexOf('iPhone') > -1 || _mak_ua.indexOf('iPad') > -1) {
            _mak_browser = 'ios_safari';
          } else if (_mak_ua.indexOf('Android') > -1) {
            _mak_browser = 'android_chrome';
          }
          window.addEventListener('load', function() {
            try { clarity("set", "browser_type", _mak_browser); } catch(e) {}
          });
        } catch(e) {}
      `}</Script>

      {/* [3] Scroll depth — tag à 25/50/75/100% pour voir jusqu'où les visiteurs scrollent */}
      <Script id="mak-scroll" strategy="afterInteractive">{`
        try {
          var _mak_depths = [25, 50, 75, 100];
          var _mak_reached = {};
          var _mak_ticking = false;

          function _mak_checkDepth() {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            var pct = Math.round((scrollTop / docHeight) * 100);
            for (var i = 0; i < _mak_depths.length; i++) {
              var d = _mak_depths[i];
              if (pct >= d && !_mak_reached[d]) {
                _mak_reached[d] = true;
                try { clarity("set", "scroll_depth", d + "%"); } catch(e) {}
              }
            }
            _mak_ticking = false;
          }

          window.addEventListener('scroll', function() {
            if (!_mak_ticking) {
              _mak_ticking = true;
              requestAnimationFrame(_mak_checkDepth);
            }
          }, { passive: true });
        } catch(e) {}
      `}</Script>

      {/* [5] Clarity upgrade — force l'enregistrement de toutes les sessions /bio (pas d'échantillonnage) */}
      <Script id="mak-upgrade" strategy="afterInteractive">{`
        try {
          if (window.clarity) {
            clarity("upgrade", "bio_visitor");
          } else {
            window.addEventListener('load', function() {
              try { clarity("upgrade", "bio_visitor"); } catch(e) {}
            });
          }
        } catch(e) {}
      `}</Script>
    </div>
  );
}
