"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      setError("Mot de passe incorrect");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f8fcfc" }}>
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white overflow-hidden shadow-lg" style={{ border: "1px solid #d4ecea" }}>
          <div className="h-1" style={{ background: "linear-gradient(90deg,#3899aa,#2a7a8a)" }} />
          <div className="p-8">
            <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-2 font-mono">MAK Analytics</p>
            <h1 className="text-xl font-bold text-[#0f172a] mb-6">Accès sécurisé</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe admin"
                required
                className="w-full h-11 px-4 rounded-xl text-sm text-[#0f172a] outline-none"
                style={{ border: "1.5px solid #d4ecea", background: "#f8fcfc" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3899aa")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#d4ecea")}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#3899aa,#2a7a8a)" }}
              >
                {loading ? "Vérification…" : "Accéder au dashboard"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
