"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";

type ContentData = {
  hero: { badge: string; headline: string; subheadline: string; cta_primary: string; cta_secondary: string };
  urgency: { label: string; text: string; spots_left: number };
};

export default function ContentPage() {
  const [data, setData] = useState<ContentData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function setHero(key: keyof ContentData["hero"], value: string) {
    if (!data) return;
    setData({ ...data, hero: { ...data.hero, [key]: value } });
  }

  function setUrgency(key: keyof ContentData["urgency"], value: string | number) {
    if (!data) return;
    setData({ ...data, urgency: { ...data.urgency, [key]: value } });
  }

  if (!data) return <p className="text-[#94a3b8] text-sm">Chargement…</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0f172a] font-bold text-xl">Contenu de la landing</h1>
          <p className="text-[#94a3b8] text-sm mt-0.5">Modifie le texte affiché sur la page d'accueil.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)" }}
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "Sauvegardé !" : "Sauvegarder"}
        </button>
      </div>

      <section className="rounded-2xl p-6 bg-white mb-5" style={{ border: "1px solid #d4ecea" }}>
        <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Hero</h2>
        <div className="flex flex-col gap-4">
          {(["badge", "headline", "subheadline", "cta_primary", "cta_secondary"] as const).map((key) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium capitalize">{key.replace("_", " ")}</span>
              <input
                value={data.hero[key]}
                onChange={(e) => setHero(key, e.target.value)}
                className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none transition-all"
                style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
        <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Urgence / Offre Pionniers</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[#64748b] text-xs font-medium">Label</span>
            <input value={data.urgency.label} onChange={(e) => setUrgency("label", e.target.value)} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[#64748b] text-xs font-medium">Texte</span>
            <input value={data.urgency.text} onChange={(e) => setUrgency("text", e.target.value)} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[#64748b] text-xs font-medium">Places restantes</span>
            <input type="number" value={data.urgency.spots_left} onChange={(e) => setUrgency("spots_left", Number(e.target.value))} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none w-32" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }} />
          </label>
        </div>
      </section>
    </div>
  );
}
