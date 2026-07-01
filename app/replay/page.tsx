"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const YT_ID = "i4jnfqxYzwQ";

const TIMELINE = [
  { time: "00:00", text: "Introduction — pourquoi Mon Assistant Kiné a été créé" },
  { time: "03:30", text: "Le problème : la paperasse qui ronge le temps de soin" },
  { time: "06:00", text: "Démo live des modules — bilans, aide clinique, EBP, chatbot patient" },
  { time: "28:30", text: "Questions / Réponses en direct" },
  { time: "35:30", text: "Témoignage d'un bêta-testeur" },
  { time: "44:00", text: "L'offre Pionnier — détails et inscription" },
];

export default function ReplayPage() {
  const [ytLoaded, setYtLoaded] = useState(false);

  return (
    <main style={{
      fontFamily: "var(--font-sans, 'Poppins', system-ui, sans-serif)",
      background: "#f0f9fa",
      color: "#0f172a",
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "48px 20px 48px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(56,153,170,0.09) 0%, transparent 70%)",
      }} />
      <div aria-hidden style={{
        position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.035,
        backgroundImage: "linear-gradient(rgba(56,153,170,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,153,170,1) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <Link href="/">
            <Image
              src="https://d1yei2z3i6k35z.cloudfront.net/13022750/69f8eddbd64793.49542531_Design_sans_titre__12_-removebg-preview2.webp"
              alt="Mon Assistant Kiné"
              width={120}
              height={60}
              priority
              style={{ width: 110, height: "auto", display: "block" }}
            />
          </Link>
        </div>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#eef7f6", border: "1px solid #d4ecea",
          color: "#3899aa", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.07em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 50, marginBottom: 20,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#3899aa"><path d="M8 5v14l11-7z"/></svg>
          Live de Lancement — Replay
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(24px, 6vw, 36px)", fontWeight: 700,
          textAlign: "center", lineHeight: 1.2, letterSpacing: "-0.02em",
          color: "#0f172a", marginBottom: 12,
        }}>
          Replay — Live de Lancement<br />
          <span style={{ color: "#3899aa" }}>Mon Assistant Kiné</span>
        </h1>

        <p style={{ fontSize: 15, color: "#475569", textAlign: "center", lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
          Tu as manqué le live ? Regarde le replay et découvre l&apos;offre Pionnier réservée aux 100 premiers abonnés.
        </p>

        {/* YouTube facade */}
        <div
          onClick={() => setYtLoaded(true)}
          style={{
            width: "100%", aspectRatio: "16/9",
            borderRadius: 16, overflow: "hidden",
            border: "1px solid #d4ecea",
            boxShadow: "0 8px 40px rgba(56,153,170,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            position: "relative", cursor: ytLoaded ? "default" : "pointer",
            background: "#0f172a", marginBottom: 12,
          }}
        >
          {ytLoaded ? (
            <iframe
              src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Replay Mon Assistant Kiné"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          ) : (
            <>
              <Image
                src={`https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`}
                alt="Replay Mon Assistant Kiné"
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
              {/* Dark overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.25)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <div style={{
                  width: 68, height: 68, borderRadius: "50%",
                  background: "rgba(56,153,170,0.95)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 4 }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div style={{
                position: "absolute", bottom: 14, right: 14,
                background: "rgba(0,0,0,0.6)", color: "#fff",
                fontSize: 11, fontWeight: 600, padding: "3px 8px",
                borderRadius: 6, letterSpacing: "0.03em",
              }}>49:00</div>
            </>
          )}
        </div>
        <p style={{ fontSize: 11.5, color: "#94a3b8", textAlign: "center", marginBottom: 36 }}>
          Clique pour lancer · Replay complet · 49 minutes
        </p>

        {/* Timeline */}
        <div style={{
          width: "100%", background: "white",
          border: "1px solid #d4ecea", borderRadius: 16,
          padding: "20px 24px", marginBottom: 32,
          boxShadow: "0 2px 12px rgba(56,153,170,0.06)",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#3899aa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            Timeline du replay
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {TIMELINE.map((item, i) => (
              <div key={item.time} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                paddingBottom: i < TIMELINE.length - 1 ? 14 : 0,
                marginBottom: i < TIMELINE.length - 1 ? 14 : 0,
                borderBottom: i < TIMELINE.length - 1 ? "1px solid #f0f9fa" : "none",
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: "#3899aa",
                  background: "#eef7f6", border: "1px solid #d4ecea",
                  borderRadius: 6, padding: "2px 7px",
                  flexShrink: 0, marginTop: 1, letterSpacing: "0.02em",
                }}>{item.time}</span>
                <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="https://monassistantkine.vercel.app/signup"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)",
            color: "#fff", fontSize: 15, fontWeight: 700,
            padding: "16px 32px", borderRadius: 50, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(56,153,170,0.35)",
            marginBottom: 10, transition: "transform .2s, opacity .2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.92"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
        >
          Rejoindre l&apos;offre Pionnier — 19€/mois
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</span>
        </Link>
        <p style={{ fontSize: 11.5, color: "#94a3b8", textAlign: "center", marginBottom: 12 }}>
          Au lieu de 49€/mois · Tarif garanti à vie · Limité aux 100 premiers
        </p>
        <Link href="https://monassistantkine.vercel.app/login" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>
          Déjà un compte ? <span style={{ color: "#3899aa", fontWeight: 600 }}>Se connecter</span>
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: 48 }}>
        <p style={{ fontSize: 11.5, color: "#94a3b8", marginBottom: 8 }}>© 2026 Mon Assistant Kiné</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          {[
            { label: "CGU", href: "/cgu" },
            { label: "Confidentialité", href: "/politique-confidentialite" },
            { label: "Mentions légales", href: "/mentions-legales" },
          ].map((l) => (
            <Link key={l.label} href={l.href} style={{ fontSize: 11, color: "#94a3b8", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
