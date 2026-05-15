"use client";

import Image from "next/image";
import Link from "next/link";

const NEXT_STEPS = [
  {
    icon: "📬",
    title: "Vérifie ta boîte mail",
    detail: "Un email de confirmation t'a été envoyé. Pense à vérifier les spams si tu ne le vois pas.",
  },
  {
    icon: "🎯",
    title: "Ce qui t'attend",
    detail: "Tu recevras des conseils pratiques pour gagner du temps au cabinet, des études EBP sélectionnées et les nouveautés de Mon Assistant Kiné.",
  },
  {
    icon: "🚀",
    title: "Envie de tester maintenant ?",
    detail: "Crée ton compte gratuitement — sans carte bancaire. Tu verras la différence dès le premier bilan.",
  },
];

export default function BioMerciPage() {
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

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
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

        {/* Check icon */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "#eef7f6", border: "2px solid #d4ecea",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24,
          boxShadow: "0 4px 20px rgba(56,153,170,0.12)",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3899aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 700,
          textAlign: "center", lineHeight: 1.2, letterSpacing: "-0.02em",
          color: "#0f172a", marginBottom: 12,
        }}>
          Merci pour ton inscription !
        </h1>

        <p style={{ fontSize: 15, color: "#475569", textAlign: "center", lineHeight: 1.6, marginBottom: 36, maxWidth: 400 }}>
          Tu fais maintenant partie des kinés libéraux qui veulent travailler plus intelligemment.
        </p>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", marginBottom: 36 }}>
          {NEXT_STEPS.map((step, i) => (
            <div key={step.title} style={{
              background: "white", border: "1px solid #d4ecea",
              borderRadius: 14, padding: "16px 18px",
              display: "flex", alignItems: "flex-start", gap: 14,
              boxShadow: "0 1px 6px rgba(56,153,170,0.06)",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#eef7f6", border: "1px solid #d4ecea",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
              }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#0f172a", marginBottom: 3 }}>{step.title}</div>
                <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.55 }}>{step.detail}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: "#eef7f6", color: "#3899aa",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, marginTop: 2,
              }}>{i + 1}</div>
            </div>
          ))}
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
          Tester Mon Assistant Kiné gratuitement
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>→</span>
        </Link>
        <p style={{ fontSize: 11.5, color: "#94a3b8", textAlign: "center", marginBottom: 20 }}>
          Sans carte bancaire · Accès immédiat
        </p>

        {/* Back to landing */}
        <Link href="/" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: 48 }}>
        <p style={{ fontSize: 11.5, color: "#94a3b8", marginBottom: 8 }}>© 2026 Mon Assistant Kiné</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          {[
            { label: "CGU", href: "https://monassistantkine.vercel.app/legal/cgu.html" },
            { label: "Confidentialité", href: "https://monassistantkine.vercel.app/legal/politique-confidentialite.html" },
            { label: "Mentions légales", href: "https://monassistantkine.vercel.app/legal/mentions-legales.html" },
          ].map((l) => (
            <Link key={l.label} href={l.href} style={{ fontSize: 11, color: "#94a3b8", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </div>
      </footer>
    </main>
  );
}
