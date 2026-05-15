"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const YT_ID = "NQh0eORWvkc";

const FEATS = [
  { icon: "📋", label: "Bilans en 3 minutes", detail: "Dicte tes notes, l'IA structure un bilan conforme et exportable" },
  { icon: "🧠", label: "Aide clinique en temps réel", detail: "Drapeaux rouges détectés, raisonnement structuré en 30 secondes" },
  { icon: "📚", label: "Recherche EBP instantanée", detail: "56 000+ études — résultat en 30 sec, au lieu de 2h sur PubMed" },
  { icon: "💬", label: "Chatbot patient", detail: "Tes patients accompagnés entre les séances, sans SMS à gérer" },
];

const AVATARS = [
  { initials: "ML", bg: "#cde9ef", color: "#1d6e7e" },
  { initials: "JP", bg: "#d0ede8", color: "#1a6b5a" },
  { initials: "SR", bg: "#dbd5f5", color: "#5b3fa8" },
  { initials: "CM", bg: "#fde5cc", color: "#b8520a" },
];

const FOOTER_LINKS = [
  { label: "CGU", href: "https://monassistantkine.vercel.app/legal/cgu.html" },
  { label: "Politique de confidentialité", href: "https://monassistantkine.vercel.app/legal/politique-confidentialite.html" },
  { label: "Mentions légales", href: "https://monassistantkine.vercel.app/legal/mentions-legales.html" },
];

export default function BioPage() {
  const [ytLoaded, setYtLoaded] = useState(false);

  return (
    <main
      style={{
        fontFamily: "var(--font-figtree, 'Figtree', system-ui, sans-serif)",
        background: "#f7fafb",
        color: "#0f2d35",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "52px 20px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 45% at 50% -10%, rgba(56,153,170,0.1) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 95% 90%, rgba(56,153,170,0.06) 0%, transparent 60%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.035,
        backgroundImage: "linear-gradient(rgba(56,153,170,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,153,170,1) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      {/* Card */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Logo */}
        <div style={{ marginBottom: 24 }}>
          <Image
            src="https://d1yei2z3i6k35z.cloudfront.net/13022750/69f8eddbd64793.49542531_Design_sans_titre__12_-removebg-preview2.webp"
            alt="Mon Assistant Kiné"
            width={120}
            height={60}
            priority
            style={{ width: 120, height: "auto", display: "block" }}
          />
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.25)",
          color: "#2a7a8a", fontSize: 10.5, fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 50, marginBottom: 20,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3899aa", display: "inline-block" }} className="animate-pulse" />
          Offre Pionnier · 87 places restantes · 19€/mois
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "var(--font-dm-serif, 'DM Serif Display', Georgia, serif)",
          fontSize: "clamp(32px, 9vw, 44px)", lineHeight: 1.1,
          textAlign: "center", fontWeight: 400, letterSpacing: "-0.025em",
          color: "#0f2d35", marginBottom: 12,
        }}>
          Gagne <em style={{ fontStyle: "italic", color: "#3899aa" }}>2h par semaine</em><br />au cabinet.
        </h1>

        <p style={{ fontSize: 16, color: "#6b8f96", textAlign: "center", lineHeight: 1.6, marginBottom: 24 }}>
          Soigne. Mon Assistant Kiné s&apos;occupe du reste.
        </p>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28, width: "100%" }}>
          {FEATS.map((f) => (
            <div key={f.label} style={{
              background: "#fff", border: "1px solid rgba(56,153,170,0.15)",
              borderRadius: 12, padding: "11px 16px",
              display: "flex", alignItems: "flex-start", gap: 10,
              boxShadow: "0 1px 4px rgba(56,153,170,0.06)",
            }}>
              <span style={{ fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f2d35" }}>{f.label}</div>
                <div style={{ fontSize: 11.5, color: "#6b8f96", marginTop: 2 }}>{f.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ display: "flex" }}>
            {AVATARS.map((av, i) => (
              <div key={av.initials} style={{
                width: 28, height: 28, borderRadius: "50%",
                border: "2px solid #f7fafb",
                background: av.bg, color: av.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
                marginLeft: i === 0 ? 0 : -8,
              }}>
                {av.initials}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 12.5, color: "#6b8f96" }}>
            <strong style={{ color: "#0f2d35" }}>200+ kinés</strong> abonnés · conçu par des kinés libéraux
          </span>
        </div>

        {/* Pionnier offer */}
        <div style={{
          width: "100%", background: "#f0f9fa",
          border: "1px solid #d4ecea", borderRadius: 16,
          padding: "18px 20px", marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f2d35" }}>Offre Pionnier</span>
              <span style={{ fontSize: 11, color: "#6b8f96", marginLeft: 8 }}>· lancé le 22/04/2026</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#3899aa" }}>19€</span>
              <span style={{ fontSize: 11, color: "#a8c5cc", textDecoration: "line-through", marginLeft: 6 }}>49€</span>
              <span style={{ fontSize: 11, color: "#6b8f96" }}>/mois</span>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ width: "100%", height: 7, borderRadius: 99, background: "#d4ecea", overflow: "hidden", marginBottom: 8 }}>
            <div style={{ width: "13%", height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #3899aa, #2a7a8a)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11.5, color: "#6b8f96" }}>
              <strong style={{ color: "#0f2d35" }}>87 places</strong> restantes sur 100
            </span>
            <span style={{ fontSize: 11, color: "#3899aa", fontWeight: 600 }}>Tarif garanti à vie</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="https://monassistantkine.vercel.app/signup"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", background: "#3899aa", color: "#fff",
            fontFamily: "var(--font-figtree, sans-serif)",
            fontSize: 16, fontWeight: 700,
            padding: "17px 32px", borderRadius: 50,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(56,153,170,0.35)",
            transition: "transform .2s, box-shadow .2s, background .2s",
            marginBottom: 10,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2a7a8a"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#3899aa"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
        >
          Créer mon compte gratuitement
          <span style={{
            width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
          }}>→</span>
        </Link>
        <p style={{ fontSize: 11.5, color: "#a8c5cc", textAlign: "center", marginBottom: 24 }}>
          Sans carte bancaire · Accès immédiat · Annulable à tout moment
        </p>

        {/* Testimonial */}
        <div style={{
          width: "100%", background: "#fff",
          border: "1px solid rgba(56,153,170,0.15)", borderLeft: "3px solid #3899aa",
          borderRadius: 12, padding: "18px 20px", marginBottom: 24,
          boxShadow: "0 1px 6px rgba(56,153,170,0.07)",
        }}>
          <div style={{ color: "#f59e0b", fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>★★★★★</div>
          <p style={{ fontSize: 13.5, color: "#0f2d35", lineHeight: 1.65, fontWeight: 300, fontStyle: "italic", marginBottom: 12 }}>
            &ldquo;Je remplissais mes bilans le soir, ça prenait{" "}
            <strong style={{ color: "#2a7a8a", fontStyle: "normal", fontWeight: 700 }}>20 minutes chacun</strong>.
            {" "}Maintenant je le génère en 3-4 minutes pendant la consultation.{" "}
            <strong style={{ color: "#2a7a8a", fontStyle: "normal", fontWeight: 700 }}>Mes soirées m&apos;appartiennent à nouveau.</strong>&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: "#d0ede8", color: "#1a6b5a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
            }}>MD</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0f2d35" }}>Marion D.</div>
              <div style={{ fontSize: 11, color: "#6b8f96" }}>Kiné libérale · Biot</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(56,153,170,0.18)" }} />
          <span style={{ fontSize: 11, color: "#a8c5cc", letterSpacing: "0.06em", textTransform: "uppercase" }}>Vois l&apos;app en situation réelle</span>
          <div style={{ flex: 1, height: 1, background: "rgba(56,153,170,0.18)" }} />
        </div>

        {/* YouTube facade */}
        <div style={{
          width: "100%", aspectRatio: "16/9", borderRadius: 14, overflow: "hidden",
          border: "1px solid rgba(56,153,170,0.15)", marginBottom: 6,
          boxShadow: "0 2px 16px rgba(56,153,170,0.1)",
          position: "relative", cursor: "pointer", background: "#0f2d35",
        }}
          onClick={() => setYtLoaded(true)}
        >
          {ytLoaded ? (
            <iframe
              src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Démo Mon Assistant Kiné"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <>
              <Image
                src={`https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg`}
                alt="Démo Mon Assistant Kiné"
                fill
                sizes="(max-width: 520px) 100vw, 520px"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "rgba(56,153,170,0.92)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        <p style={{ fontSize: 11.5, color: "#a8c5cc", textAlign: "center", marginBottom: 28 }}>
          Démo complète · 2 minutes pour comprendre comment ça marche
        </p>

        {/* Login */}
        <p style={{ fontSize: 13, color: "#6b8f96", textAlign: "center", marginBottom: 32 }}>
          Déjà un compte ?{" "}
          <Link href="https://monassistantkine.vercel.app/login" style={{ color: "#3899aa", textDecoration: "none", fontWeight: 600 }}>
            Se connecter
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <p style={{ fontSize: 11.5, color: "#a8c5cc", marginBottom: 8 }}>© 2026 Mon Assistant Kiné</p>
        <div>
          {FOOTER_LINKS.map((l) => (
            <Link key={l.label} href={l.href} style={{ fontSize: 11, color: "#a8c5cc", textDecoration: "none", margin: "0 8px" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
