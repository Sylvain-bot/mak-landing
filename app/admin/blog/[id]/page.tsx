"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Save, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["IA clinique", "Bibliographie", "Bilans", "Pratique libérale"];

type Article = {
  id?: string;
  titre: string;
  slug: string;
  extrait: string;
  corps: string;
  categorie: string;
  photo_url: string;
  statut: string;
  meta_titre: string;
  meta_description: string;
  date_publication: string;
};

const empty: Article = {
  titre: "", slug: "", extrait: "", corps: "", categorie: CATEGORIES[0],
  photo_url: "", statut: "brouillon", meta_titre: "", meta_description: "",
  date_publication: new Date().toISOString().split("T")[0],
};

function slugify(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export default function ArticleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();
  const [article, setArticle] = useState<Article>(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/articles/${id}`)
      .then((r) => r.json())
      .then((data) => setArticle({ ...empty, ...data }));
  }, [id, isNew]);

  function set(key: keyof Article, value: string) {
    setArticle((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "titre" && isNew) next.slug = slugify(value);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...article,
      date_publication: article.date_publication ? new Date(article.date_publication).toISOString() : null,
    };
    if (isNew) {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.id) router.replace(`/admin/blog/${data.id}`);
    } else {
      await fetch(`/api/admin/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#3899aa] hover:bg-[#eef7f6] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-[#0f172a] font-bold text-xl">{isNew ? "Nouvel article" : "Modifier l'article"}</h1>
          </div>
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

      <div className="flex flex-col gap-5">
        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Contenu</h2>
          <div className="flex flex-col gap-4">
            <Field label="Titre" value={article.titre} onChange={(v) => set("titre", v)} />
            <Field label="Slug (URL)" value={article.slug} onChange={(v) => set("slug", v)} mono />
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">Extrait</span>
              <textarea
                rows={2}
                value={article.extrait}
                onChange={(e) => set("extrait", e.target.value)}
                className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none resize-none"
                style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">Corps de l'article</span>
              <TiptapEditor content={article.corps} onChange={(v) => set("corps", v)} />
            </label>
          </div>
        </div>

        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Image de couverture</h2>
          <ImageUpload value={article.photo_url} onChange={(v) => set("photo_url", v)} />
        </div>

        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Paramètres</h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">Catégorie</span>
              <select value={article.categorie} onChange={(e) => set("categorie", e.target.value)} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">Statut</span>
              <select value={article.statut} onChange={(e) => set("statut", e.target.value)} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}>
                <option value="brouillon">Brouillon</option>
                <option value="publie">Publié</option>
              </select>
            </label>
            <Field label="Date de publication" value={article.date_publication} onChange={(v) => set("date_publication", v)} type="date" />
          </div>
        </div>

        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-[#0f172a] font-semibold text-sm mb-4">SEO</h2>
          <div className="flex flex-col gap-4">
            <Field label="Meta titre" value={article.meta_titre} onChange={(v) => set("meta_titre", v)} />
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">Meta description</span>
              <textarea rows={2} value={article.meta_description} onChange={(e) => set("meta_description", e.target.value)} className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none resize-none" style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, mono, type = "text" }: { label: string; value: string; onChange: (v: string) => void; mono?: boolean; type?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[#64748b] text-xs font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none ${mono ? "font-mono" : ""}`}
        style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}
      />
    </label>
  );
}
