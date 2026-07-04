"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "mak_newsletter_dismissed";
const CONTACT_EMAIL = "contact@monassistantkine.fr";

export function ExitIntentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "fallback">("idle");
  const triggered = useRef(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let mobileTimer: ReturnType<typeof setTimeout>;

    function handleMouseLeave(e: MouseEvent) {
      if (triggered.current) return;
      if (e.clientY < 10) {
        triggered.current = true;
        setOpen(true);
      }
    }

    // Mobile — 40 s de navigation
    mobileTimer = setTimeout(() => {
      if (triggered.current) return;
      triggered.current = true;
      setOpen(true);
    }, 40000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function dismiss() {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setState("success");
        sessionStorage.setItem(STORAGE_KEY, "1");
      } else {
        setState("fallback");
      }
    } catch {
      setState("fallback");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.65)", backdropFilter: "blur(3px)" }}
      onClick={dismiss}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "1px solid #d4ecea" }}
      >
        {/* Bande accent */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #3899aa, #2a7a8a)" }} />

        <div className="bg-white px-7 py-8">
          {state === "success" ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#eef7f6" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3899aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="text-xl font-bold text-[#0f172a] mb-2">Tu es dans la boucle !</h2>
              <p className="text-sm text-[#64748b] mb-6 leading-relaxed">
                On te tient au courant des nouveautés Mon Assistant Kiné et on partage les meilleures ressources cliniques — sans spam.
              </p>
              <button onClick={dismiss} className="text-sm font-medium text-[#3899aa] hover:underline">
                Fermer
              </button>
            </div>

          ) : state === "fallback" ? (
            <div className="text-center py-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fef3c7" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h2 className="text-lg font-bold text-[#0f172a] mb-2">On prépare tout ça !</h2>
              <p className="text-sm text-[#64748b] mb-5 leading-relaxed">
                L&apos;inscription automatique n&apos;est pas encore disponible. Envoie-nous un mail et on t&apos;ajoute manuellement — promis, c&apos;est rapide.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Inscription newsletter Mon Assistant Kiné&body=Bonjour, je souhaite m'inscrire à la newsletter Mon Assistant Kiné. Mon email : ${encodeURIComponent(email)}`}
                className="inline-flex items-center gap-2 px-6 h-11 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)" }}
                onClick={() => sessionStorage.setItem(STORAGE_KEY, "1")}
              >
                Envoyer un mail
              </a>
              <button onClick={dismiss} className="block mx-auto mt-3 text-xs text-[#94a3b8] hover:underline">
                Pas maintenant
              </button>
            </div>

          ) : (
            <>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-[#3899aa] text-[11px] font-semibold uppercase tracking-widest mb-1.5 font-mono">
                    Rejoins la communauté Mon Assistant Kiné
                  </p>
                  <h2 className="text-xl font-bold text-[#0f172a] leading-snug">
                    Les coulisses du projet,<br />les nouveautés et les meilleures ressources cliniques.
                  </h2>
                </div>
                <button
                  onClick={dismiss}
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[#94a3b8] hover:bg-[#f1f5f9] transition-colors text-lg leading-none mt-0.5"
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>

              <ul className="space-y-2 mb-6">
                {[
                  "Les coulisses du projet — décisions produit, ce qui arrive, ce qu'on a testé",
                  "Ressources EBP actionnables sélectionnées par des kinés praticiens",
                  "Accès anticipé aux nouvelles fonctionnalités",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#475569]">
                    <span className="text-[#3899aa] font-bold mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.fr"
                  className="w-full h-11 px-4 rounded-xl text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none transition-colors"
                  style={{ border: "1.5px solid #d4ecea", background: "#f8fcfc" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#3899aa")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#d4ecea")}
                  disabled={state === "loading"}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #3899aa, #2a7a8a)", boxShadow: "0 4px 14px rgba(56,153,170,0.3)" }}
                >
                  {state === "loading" ? "Inscription…" : "Je rejoins la liste — c'est gratuit"}
                </button>
              </form>

              <p className="text-[11px] text-[#94a3b8] text-center mt-4">
                Réservé aux kinésithérapeutes · Pas de spam · Désabonnement en 1 clic
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
