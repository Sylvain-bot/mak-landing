"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

type ArticleSummary = {
  id: string;
  titre: string;
  slug: string;
  categorie: string | null;
  statut: string;
  date_publication: string | null;
  created_at: string;
};

const STATUT_STYLES: Record<string, { bg: string; text: string }> = {
  publie:    { bg: "#eef7f6", text: "#3899aa" },
  brouillon: { bg: "#f1f5f9", text: "#64748b" },
};

export default function BlogAdminPage() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await fetch("/api/admin/articles").then((r) => r.json());
    setArticles(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string, titre: string) {
    if (!confirm(`Supprimer "${titre}" ?`)) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0f172a] font-bold text-xl">Articles du blog</h1>
          <p className="text-[#94a3b8] text-sm mt-0.5">{articles.length} article{articles.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)" }}
        >
          <Plus className="w-4 h-4" /> Nouvel article
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-white animate-pulse" style={{ border: "1px solid #d4ecea" }} />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-[#94a3b8] text-sm text-center py-16">Aucun article. Créez le premier !</p>
      ) : (
        <div className="rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid #d4ecea" }}>
          {articles.map((a, i) => {
            const styles = STATUT_STYLES[a.statut] ?? STATUT_STYLES.brouillon;
            return (
              <div
                key={a.id}
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderBottom: i < articles.length - 1 ? "1px solid #e5f2f4" : undefined }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[#0f172a] font-medium text-sm truncate">{a.titre}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {a.categorie && <span className="text-[#94a3b8] text-xs">{a.categorie}</span>}
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: styles.bg, color: styles.text }}>
                      {a.statut}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/blog/${a.id}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#3899aa] hover:bg-[#eef7f6] transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(a.id, a.titre)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:text-[#ef4444] hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
