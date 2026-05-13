"use client";

import { useEffect, useState } from "react";
import { Send, Users, RefreshCw } from "lucide-react";

type Stats = { totalContacts: number; lists: { id: number; name: string; totalSubscribers: number }[] };

export default function NewsletterPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [listId, setListId] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        if (d.lists?.[0]) setListId(d.lists[0].id);
      });
  }, []);

  async function handleSend() {
    if (!listId || !subject || !html) return;
    setSending(true);
    setErr("");
    const res = await fetch("/api/admin/newsletter/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, htmlContent: html, listIds: [listId] }),
    });
    const data = await res.json();
    setSending(false);
    if (res.ok) { setSent(true); setSubject(""); setHtml(""); setTimeout(() => setSent(false), 3000); }
    else setErr(data.message ?? "Erreur lors de l'envoi");
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-[#0f172a] font-bold text-xl">Newsletter</h1>
        <p className="text-[#94a3b8] text-sm mt-0.5">Géré via Brevo.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #d4ecea" }}>
            <div className="flex items-center gap-2 text-[#94a3b8] text-xs font-medium mb-2"><Users className="w-4 h-4" /> Contacts totaux</div>
            <p className="text-[#0f172a] font-bold text-3xl">{stats.totalContacts.toLocaleString("fr-FR")}</p>
          </div>
          <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #d4ecea" }}>
            <div className="flex items-center gap-2 text-[#94a3b8] text-xs font-medium mb-2"><Send className="w-4 h-4" /> Listes actives</div>
            <p className="text-[#0f172a] font-bold text-3xl">{stats.lists.length}</p>
          </div>
        </div>
      )}

      <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
        <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Envoyer un email</h2>
        <div className="flex flex-col gap-4">
          {stats?.lists && stats.lists.length > 0 && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">Liste de destinataires</span>
              <select value={listId ?? ""} onChange={(e) => setListId(Number(e.target.value))} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}>
                {stats.lists.map((l) => <option key={l.id} value={l.id}>{l.name} ({l.totalSubscribers} contacts)</option>)}
              </select>
            </label>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-[#64748b] text-xs font-medium">Sujet</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[#64748b] text-xs font-medium">Contenu HTML</span>
            <textarea rows={8} value={html} onChange={(e) => setHtml(e.target.value)} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none resize-y font-mono" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }} />
          </label>
          {err && <p className="text-[#ef4444] text-xs">{err}</p>}
          <button
            onClick={handleSend}
            disabled={sending || !subject || !html}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)" }}
          >
            {sending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sent ? "Email envoyé !" : "Envoyer la campagne"}
          </button>
        </div>
      </div>
    </div>
  );
}
