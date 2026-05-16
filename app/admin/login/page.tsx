"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/content");
        return;
      }
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? `Erreur ${res.status}`);
    } catch {
      setError("Erreur réseau — vérifie ta connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f0f9fa" }}>
      <div className="w-full max-w-sm">
        <div
          className="rounded-2xl p-8 bg-white"
          style={{ border: "1px solid #d4ecea", boxShadow: "0 4px 24px rgba(56,153,170,0.08)" }}
        >
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-1">Mon Assistant Kiné</p>
          <h1 className="text-[#0f172a] font-bold text-xl mb-6">Administration</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{ border: "1px solid #d4ecea", background: "#f8fcfd", color: "#0f172a" }}
              required
            />
            {error && <p className="text-[#ef4444] text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)" }}
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
