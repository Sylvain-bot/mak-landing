"use client";

import { useEffect, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { BlockEditor, parseHtmlToBlocks, parseTxt } from "@/components/admin/BlockEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Save, ArrowLeft, RefreshCw, FileText, Eraser } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["IA clinique", "Bibliographie", "Bilans", "Pratique libérale"];

type Block = { id: string; type: "h2" | "h3" | "paragraph" | "image"; content: string };

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

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function blocksToHtml(blocks: Block[]): string {
  return blocks.map((b) => {
    const safe = b.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (b.type === "h2") return `<h2>${safe}</h2>`;
    if (b.type === "h3") return `<h3>${safe}</h3>`;
    if (b.type === "image") return b.content ? `<img src="${b.content}" alt="" />` : "";
    return `<p>${safe}</p>`;
  }).join("\n");
}

export default function ArticleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();
  const [article, setArticle] = useState<Article>(empty);
  const [blocks, setBlocks] = useState<Block[]>([{ id: "1", type: "paragraph", content: "" }]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const txtInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/articles/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setArticle({ ...empty, ...data });
        setBlocks(parseHtmlToBlocks(data.corps ?? ""));
      });
  }, [id, isNew]);

  function handleTxtImport(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      const { blocks: parsed, meta } = parseTxt(text);
      const html = blocksToHtml(parsed);

      // Fallback: extract from body if not in metadata
      const firstTitle = parsed.find((b) => b.type === "h2");
      const firstParagraph = parsed.find((b) => b.type === "paragraph");
      const titre = meta.titre || firstTitle?.content || "";
      const extrait = meta.extrait || firstParagraph?.content.slice(0, 200) || "";

      setBlocks(parsed);
      setArticle((prev) => ({
        ...prev,
        corps: html,
        titre: titre || prev.titre,
        slug: meta.slug || (titre ? slugify(titre) : prev.slug),
        extrait: extrait || prev.extrait,
        categorie: meta.categorie || prev.categorie,
        meta_titre: meta.meta_titre || titre || prev.meta_titre,
        meta_description: (meta.meta_description || extrait).slice(0, 160) || prev.meta_description,
      }));
    };
    reader.readAsText(file, "utf-8");
  }

  function set(key: keyof Article, value: string) {
    setArticle((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "titre" && isNew) next.slug = slugify(value);
      if (key === "titre" && !prev.meta_titre) next.meta_titre = value;
      if (key === "extrait" && !prev.meta_description) next.meta_description = value.slice(0, 160);
      return next;
    });
  }

  function handleBlocksChange(newBlocks: Block[], html: string) {
    setBlocks(newBlocks);
    setArticle((prev) => {
      const next = { ...prev, corps: html };
      if (!prev.meta_description && !prev.extrait) {
        next.meta_description = stripHtml(html).slice(0, 160);
      }
      return next;
    });
  }

  function handleClearContent() {
    if (!confirm("Vider tout le corps de l'article ? Cette action est irréversible.")) return;
    const fresh = { id: Math.random().toString(36).slice(2), type: "paragraph" as const, content: "" };
    setBlocks([fresh]);
    setArticle((prev) => ({ ...prev, corps: "" }));
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#3899aa] hover:bg-[#eef7f6] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-[#0f172a] font-bold text-xl">{isNew ? "Nouvel article" : "Modifier l'article"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearContent}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca" }}
            title="Vider tout le corps de l'article"
          >
            <Eraser className="w-4 h-4" />
            Vider le contenu
          </button>
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
      </div>

      {/* TXT import — prominent entry point */}
      <button
        type="button"
        onClick={() => txtInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl mb-6 transition-all hover:opacity-90 group"
        style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)", border: "2px dashed #86efac" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "white", border: "1px solid #bbf7d0" }}>
          <FileText className="w-4 h-4 text-[#16a34a]" />
        </div>
        <div className="text-left">
          <p className="text-[#15803d] font-semibold text-sm">Importer un fichier .txt</p>
          <p className="text-[#16a34a] text-xs opacity-80">Remplit automatiquement le titre, l'extrait, le corps et le SEO</p>
        </div>
      </button>
      <input
        ref={txtInputRef}
        type="file"
        accept=".txt,text/plain"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { handleTxtImport(f); e.target.value = ""; } }}
      />

      <div className="flex flex-col gap-5">
        {/* Paramètres */}
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

        {/* Infos principales */}
        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Informations</h2>
          <div className="flex flex-col gap-4">
            <Field label="Titre de l'article" value={article.titre} onChange={(v) => set("titre", v)} />
            <Field label="Slug (URL)" value={article.slug} onChange={(v) => set("slug", v)} mono />
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">Extrait <span className="text-[#94a3b8] font-normal">(affiché dans la liste du blog)</span></span>
              <textarea
                rows={2}
                value={article.extrait}
                onChange={(e) => set("extrait", e.target.value)}
                placeholder="Résumé court de l'article…"
                className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none resize-none"
                style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}
              />
            </label>
          </div>
        </div>

        {/* Image de couverture */}
        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Image de couverture</h2>
          <ImageUpload value={article.photo_url} onChange={(v) => set("photo_url", v)} />
        </div>

        {/* Corps */}
        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <h2 className="text-[#0f172a] font-semibold text-sm mb-4">Corps de l'article</h2>
          <BlockEditor
            blocks={blocks}
            onChange={handleBlocksChange}
            onMetaImport={({ titre, extrait }) => {
              setArticle((prev) => ({
                ...prev,
                titre: titre || prev.titre,
                slug: titre ? slugify(titre) : prev.slug,
                extrait: extrait || prev.extrait,
                meta_titre: titre || prev.meta_titre,
                meta_description: extrait ? extrait.slice(0, 160) : prev.meta_description,
              }));
            }}
          />
        </div>

        {/* SEO */}
        <div className="rounded-2xl p-6 bg-white" style={{ border: "1px solid #d4ecea" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#0f172a] font-semibold text-sm">SEO</h2>
            <button
              type="button"
              onClick={() => setArticle((prev) => ({
                ...prev,
                meta_titre: prev.titre,
                meta_description: (prev.extrait || stripHtml(prev.corps)).slice(0, 160),
              }))}
              className="text-xs text-[#3899aa] hover:underline font-medium"
            >
              Remplir automatiquement
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <Field label="Meta titre" value={article.meta_titre} onChange={(v) => set("meta_titre", v)} />
            <label className="flex flex-col gap-1.5">
              <span className="text-[#64748b] text-xs font-medium">
                Meta description
                <span className="ml-2 text-[#94a3b8] font-normal">({article.meta_description.length}/160)</span>
              </span>
              <textarea
                rows={2}
                maxLength={160}
                value={article.meta_description}
                onChange={(e) => set("meta_description", e.target.value)}
                className="px-3 py-2 rounded-lg text-sm text-[#0f172a] outline-none resize-none"
                style={{ border: "1px solid #d4ecea", background: "#f8fcfd" }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, mono, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; mono?: boolean; type?: string;
}) {
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
