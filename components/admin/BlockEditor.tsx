"use client";

import { useRef, useCallback } from "react";
import { Trash2, ArrowUp, ArrowDown, Plus, FileText, ImagePlus, Type, AlignLeft } from "lucide-react";

type BlockType = "h2" | "h3" | "paragraph" | "image";
type Block = { id: string; type: BlockType; content: string };

function uid() {
  return Math.random().toString(36).slice(2);
}

// Convert HTML string → blocks (used for Word import)
export function htmlToBlocks(html: string): Block[] {
  const div = document.createElement("div");
  div.innerHTML = html;
  const blocks: Block[] = [];
  div.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const text = el.innerText.trim();
    if (!text) return;
    if (tag === "h1" || tag === "h2") {
      blocks.push({ id: uid(), type: "h2", content: text });
    } else if (tag === "h3" || tag === "h4") {
      blocks.push({ id: uid(), type: "h3", content: text });
    } else if (tag === "img") {
      blocks.push({ id: uid(), type: "image", content: (el as HTMLImageElement).src });
    } else {
      blocks.push({ id: uid(), type: "paragraph", content: text });
    }
  });
  return blocks.length ? blocks : [{ id: uid(), type: "paragraph", content: "" }];
}

export type TxtMeta = {
  titre?: string;
  slug?: string;
  extrait?: string;
  categorie?: string;
  meta_titre?: string;
  meta_description?: string;
};

// Parse a .txt file → blocks + metadata
// Metadata lines at the top: TITRE: ... / SLUG: ... / EXTRAIT: ... etc.
// Body lines: # Titre section / ## Sous-titre / plain text paragraph
export function parseTxtToBlocks(text: string): Block[] {
  return parseTxt(text).blocks;
}

export function parseTxt(text: string): { blocks: Block[]; meta: TxtMeta } {
  const lines = text.split(/\r?\n/);
  const meta: TxtMeta = {};
  const META_KEYS = ["TITRE", "SLUG", "EXTRAIT", "CATEGORIE", "META_TITRE", "META_DESCRIPTION"];
  let bodyStart = 0;

  // Read metadata lines at the top (KEY: value)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) { bodyStart = i; break; }
    const key = line.slice(0, colonIdx).trim().toUpperCase().replace(/ /g, "_");
    const value = line.slice(colonIdx + 1).trim();
    if (META_KEYS.includes(key)) {
      if (key === "TITRE") meta.titre = value;
      else if (key === "SLUG") meta.slug = value;
      else if (key === "EXTRAIT") meta.extrait = value;
      else if (key === "CATEGORIE") meta.categorie = value;
      else if (key === "META_TITRE") meta.meta_titre = value;
      else if (key === "META_DESCRIPTION") meta.meta_description = value;
      bodyStart = i + 1;
    } else {
      bodyStart = i;
      break;
    }
  }

  // Parse body into blocks
  const blocks: Block[] = [];
  let paragraphBuffer: string[] = [];

  function flushParagraph() {
    const content = paragraphBuffer.join(" ").trim();
    if (content) blocks.push({ id: uid(), type: "paragraph", content });
    paragraphBuffer = [];
  }

  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("## ")) {
      flushParagraph();
      blocks.push({ id: uid(), type: "h3", content: line.slice(3).trim() });
    } else if (line.startsWith("# ")) {
      flushParagraph();
      blocks.push({ id: uid(), type: "h2", content: line.slice(2).trim() });
    } else if (line === "") {
      flushParagraph();
    } else {
      paragraphBuffer.push(line);
    }
  }
  flushParagraph();

  return {
    blocks: blocks.length ? blocks : [{ id: uid(), type: "paragraph", content: "" }],
    meta,
  };
}

// Convert blocks → HTML string
function blocksToHtml(blocks: Block[]): string {
  return blocks.map((b) => {
    const safe = b.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (b.type === "h2") return `<h2>${safe}</h2>`;
    if (b.type === "h3") return `<h3>${safe}</h3>`;
    if (b.type === "image") return b.content ? `<img src="${b.content}" alt="" />` : "";
    return `<p>${safe}</p>`;
  }).join("\n");
}

// Parse stored HTML back to blocks on load
export function parseHtmlToBlocks(html: string): Block[] {
  if (!html) return [{ id: uid(), type: "paragraph", content: "" }];
  // Simple regex-based parser (no DOM needed — works server-side too)
  const blocks: Block[] = [];
  const tagRegex = /<(h2|h3|p|img)[^>]*>(.*?)<\/\1>|<img[^>]+src="([^"]+)"[^>]*\/?>/gi;
  let match;
  while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[1]?.toLowerCase();
    const content = match[2]?.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
    const imgSrc = match[3];
    if (imgSrc) {
      blocks.push({ id: uid(), type: "image", content: imgSrc });
    } else if (tag === "h2") {
      blocks.push({ id: uid(), type: "h2", content: content ?? "" });
    } else if (tag === "h3") {
      blocks.push({ id: uid(), type: "h3", content: content ?? "" });
    } else if (tag === "p" && content) {
      blocks.push({ id: uid(), type: "paragraph", content: content ?? "" });
    }
  }
  return blocks.length ? blocks : [{ id: uid(), type: "paragraph", content: "" }];
}

type Props = {
  blocks: Block[];
  onChange: (blocks: Block[], html: string) => void;
  onMetaImport?: (meta: { titre: string; extrait: string }) => void;
};

const BLOCK_LABELS: Record<BlockType, string> = {
  h2: "Titre de section",
  h3: "Sous-titre",
  paragraph: "Paragraphe",
  image: "Image",
};

const BLOCK_STYLES: Record<BlockType, React.CSSProperties> = {
  h2: { fontWeight: 700, fontSize: "1.1rem", color: "#0f172a" },
  h3: { fontWeight: 600, fontSize: "0.95rem", color: "#1e293b" },
  paragraph: { fontWeight: 400, fontSize: "0.875rem", color: "#334155" },
  image: {},
};

export function BlockEditor({ blocks, onChange, onMetaImport }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageTargetBlock = useRef<string | null>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);
  const txtInputRef = useRef<HTMLInputElement>(null);

  const emit = useCallback((next: Block[]) => {
    onChange(next, blocksToHtml(next));
  }, [onChange]);

  function update(id: string, content: string) {
    emit(blocks.map((b) => b.id === id ? { ...b, content } : b));
  }

  function addBlock(type: BlockType, afterId?: string) {
    const newBlock: Block = { id: uid(), type, content: "" };
    if (!afterId) { emit([...blocks, newBlock]); return; }
    const idx = blocks.findIndex((b) => b.id === afterId);
    const next = [...blocks];
    next.splice(idx + 1, 0, newBlock);
    emit(next);
  }

  function removeBlock(id: string) {
    const next = blocks.filter((b) => b.id !== id);
    emit(next.length ? next : [{ id: uid(), type: "paragraph", content: "" }]);
  }

  function move(id: string, dir: -1 | 1) {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx + dir < 0 || idx + dir >= blocks.length) return;
    const next = [...blocks];
    [next[idx], next[idx + dir]] = [next[idx + dir], next[idx]];
    emit(next);
  }

  async function handleImageUpload(file: File, blockId: string) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) update(blockId, data.url);
    else alert(data.error ?? "Erreur upload");
  }

  async function handleWordImport(file: File) {
    const mammoth = (await import("mammoth")).default;
    const arrayBuffer = await file.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    const parsed = htmlToBlocks(html);
    emit(parsed);
  }

  function handleTxtImport(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      const parsed = parseTxtToBlocks(text);
      emit(parsed);

      // Auto-fill titre and extrait from content
      if (onMetaImport) {
        const firstTitle = parsed.find((b) => b.type === "h2");
        const firstParagraph = parsed.find((b) => b.type === "paragraph");
        onMetaImport({
          titre: firstTitle?.content ?? "",
          extrait: firstParagraph?.content.slice(0, 200) ?? "",
        });
      }
    };
    reader.readAsText(file, "utf-8");
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[#94a3b8] text-xs font-medium mr-1">Ajouter :</span>
        {([
          { type: "h2" as BlockType, label: "Titre section", icon: <Type className="w-3.5 h-3.5" /> },
          { type: "h3" as BlockType, label: "Sous-titre", icon: <Type className="w-3 h-3" /> },
          { type: "paragraph" as BlockType, label: "Paragraphe", icon: <AlignLeft className="w-3.5 h-3.5" /> },
          { type: "image" as BlockType, label: "Image", icon: <ImagePlus className="w-3.5 h-3.5" /> },
        ]).map(({ type, label, icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
            style={{ background: "#eef7f6", color: "#3899aa", border: "1px solid #d4ecea" }}
          >
            <Plus className="w-3 h-3" />
            {icon}
            {label}
          </button>
        ))}
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={() => txtInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
          >
            <FileText className="w-3.5 h-3.5" />
            Importer .txt
          </button>
          <button
            type="button"
            onClick={() => wordInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
            style={{ background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0" }}
          >
            <FileText className="w-3.5 h-3.5" />
            Importer Word
          </button>
        </div>
      </div>

      {/* Blocks */}
      <div className="flex flex-col gap-2">
        {blocks.map((block, idx) => (
          <div
            key={block.id}
            className="group flex gap-2 items-start rounded-xl p-3"
            style={{ background: "white", border: "1px solid #d4ecea" }}
          >
            {/* Block label */}
            <div className="shrink-0 w-28 pt-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                {BLOCK_LABELS[block.type]}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {block.type === "image" ? (
                <div>
                  {block.content ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={block.content} alt="" className="w-full max-h-48 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => update(block.id, "")}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow text-[#ef4444] hover:bg-red-50"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { imageTargetBlock.current = block.id; imageInputRef.current?.click(); }}
                      className="w-full h-20 rounded-lg flex items-center justify-center gap-2 text-sm text-[#94a3b8] hover:text-[#3899aa] transition-colors"
                      style={{ border: "2px dashed #d4ecea", background: "#f8fcfd" }}
                    >
                      <ImagePlus className="w-4 h-4" />
                      Cliquer pour uploader
                    </button>
                  )}
                </div>
              ) : (
                <textarea
                  value={block.content}
                  onChange={(e) => update(block.id, e.target.value)}
                  rows={block.type === "paragraph" ? 4 : 1}
                  placeholder={
                    block.type === "h2" ? "Titre de la section…" :
                    block.type === "h3" ? "Sous-titre…" :
                    "Texte du paragraphe…"
                  }
                  className="w-full outline-none resize-none bg-transparent leading-relaxed"
                  style={{ ...BLOCK_STYLES[block.type], border: "none", padding: 0 }}
                />
              )}
            </div>

            {/* Actions */}
            <div className="shrink-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button type="button" onClick={() => move(block.id, -1)} disabled={idx === 0} className="w-6 h-6 rounded flex items-center justify-center text-[#94a3b8] hover:text-[#3899aa] disabled:opacity-30 transition-colors">
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => move(block.id, 1)} disabled={idx === blocks.length - 1} className="w-6 h-6 rounded flex items-center justify-center text-[#94a3b8] hover:text-[#3899aa] disabled:opacity-30 transition-colors">
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => removeBlock(block.id)} className="w-6 h-6 rounded flex items-center justify-center text-[#94a3b8] hover:text-[#ef4444] transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {blocks.length === 0 && (
        <p className="text-center text-[#94a3b8] text-sm py-8">Ajoute un bloc ci-dessus pour commencer.</p>
      )}

      {/* Hidden inputs */}
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && imageTargetBlock.current) { handleImageUpload(f, imageTargetBlock.current); e.target.value = ""; }
        }}
      />
      <input ref={wordInputRef} type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { handleWordImport(f); e.target.value = ""; } }}
      />
      <input ref={txtInputRef} type="file" accept=".txt,text/plain" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { handleTxtImport(f); e.target.value = ""; } }}
      />
    </div>
  );
}
