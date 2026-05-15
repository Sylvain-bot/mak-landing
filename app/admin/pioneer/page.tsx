"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";

export default function PioneerAdminPage() {
  const [spots, setSpots] = useState<number | "">("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/pioneer")
      .then((r) => r.json())
      .then((d) => { setSpots(d.spots); setLoading(false); });
  }, []);

  async function handleSave() {
    if (spots === "" || spots < 0 || spots > 100) return;
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/pioneer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spots: Number(spots) }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    else setError(data.error ?? "Erreur");
  }

  const taken = typeof spots === "number" ? 100 - spots : 0;
  const pct = taken;

  return (
    <div className="max-w-md">
      <div className="mb-8">
        <h1 className="text-[#0f172a] font-bold text-xl">Offre Pionnier</h1>
        <p className="text-[#94a3b8] text-sm mt-0.5">
          Mise à jour du compteur de places — affiché en temps réel sur la landing et la page bio.
        </p>
      </div>

      <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[#64748b] mb-2">
            <span><strong className="text-[#0f172a]">{taken}</strong> places vendues</span>
            <span><strong className="text-[#0f172a]">{spots !== "" ? spots : "—"}</strong> restantes sur 100</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#d4ecea] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #3899aa, #2a7a8a)",
              }}
            />
          </div>
        </div>

        {/* Input */}
        <label className="flex flex-col gap-1.5 mb-4">
          <span className="text-[#64748b] text-xs font-medium">Places restantes (0 à 100)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={spots}
            disabled={loading}
            onChange={(e) => setSpots(e.target.value === "" ? "" : Number(e.target.value))}
            className="px-3 py-2.5 rounded-lg text-sm text-[#0f172a] outline-none w-full"
            style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}
          />
        </label>

        {error && <p className="text-[#ef4444] text-xs mb-3">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving || loading || spots === ""}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)" }}
        >
          {saving
            ? <RefreshCw className="w-4 h-4 animate-spin" />
            : <Save className="w-4 h-4" />
          }
          {saved ? "Sauvegardé !" : "Mettre à jour"}
        </button>
      </div>

      <p className="text-[#94a3b8] text-xs mt-4 text-center">
        Le changement est visible sur le site dans la minute.
      </p>
    </div>
  );
}
