"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "mak_newsletter_dismissed";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const triggered = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let mobileTimer: ReturnType<typeof setTimeout>;

    // Desktop — souris qui remonte vers les onglets
    function handleMouseLeave(e: MouseEvent) {
      if (triggered.current) return;
      if (e.clientY < 10) {
        triggered.current = true;
        setOpen(true);
      }
    }

    // Mobile — après 40 s de navigation sans action
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

  // Fermer avec Échap
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
        setState("error");
      }
    } catch {
      setState("error");
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
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-xl font-bold text-[#0f172a] mb-2">Tu es inscrit·e !</h2>
              <p className="text-sm text-[#64748b] mb-6">
                Première ressource dans ta boîte mail très bientôt.
              </p>
              <button
                onClick={dismiss}
                className="text-sm font-medium text-[#3899aa] hover:underline"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <p className="text-[#3899aa] text-[11px] font-semibold uppercase tracking-widest mb-1.5 font-mono">
                    Avant de partir
                  </p>
                  <h2 className="text-xl font-bold text-[#0f172a] leading-snug">
                    1 ressource EBP par semaine,<br />directement dans ta boîte mail.
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

              {/* Valeur */}
              <ul className="space-y-2 mb-6">
                {[
                  "Synthèses cliniques actionnables (Cleland, HAS, PubMed)",
                  "Cas pratiques : diagnostic différentiel, drapeaux rouges",
                  "Conseils pratique libérale — pas de spam, désabonnement en 1 clic",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#475569]">
                    <span className="text-[#3899aa] font-bold mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Formulaire */}
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
                  {state === "loading" ? "Inscription…" : "Je m'abonne — c'est gratuit"}
                </button>
                {state === "error" && (
                  <p className="text-xs text-red-500 text-center">
                    Une erreur s'est produite. Réessaie dans un instant.
                  </p>
                )}
              </form>

              {/* Footer discret */}
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
