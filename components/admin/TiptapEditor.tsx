"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import {
  Bold, Italic, Link2, List, ListOrdered, Heading2, Heading3,
  Undo, Redo, ImagePlus, FileText,
} from "lucide-react";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

function ToolbarBtn({
  onClick, active, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className="p-1.5 rounded transition-all"
      style={active ? { background: "#eef7f6", color: "#3899aa" } : { color: "#64748b" }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px self-stretch bg-[#d4ecea] mx-1" />;
}

export function TiptapEditor({ content, onChange }: Props) {
  const wordInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLink.configure({ openOnClick: false }),
      TiptapImage.configure({ inline: false, allowBase64: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      transformPastedHTML(html) {
        // Strip Word/Google Docs junk (class, style, mso-*, lang attributes)
        return html
          .replace(/\s*class="[^"]*"/gi, "")
          .replace(/\s*style="[^"]*"/gi, "")
          .replace(/\s*lang="[^"]*"/gi, "")
          .replace(/<o:p[^>]*>.*?<\/o:p>/gi, "")
          .replace(/<w:[^>]+>.*?<\/w:[^>]+>/gi, "")
          .replace(/<!--[\s\S]*?-->/g, "");
      },
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("URL du lien :", editor.getAttributes("link").href);
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  async function handleImageUpload(file: File) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const { url } = await res.json();
    if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run();
  }

  async function handleWordImport(file: File) {
    // Dynamically import mammoth to keep bundle lean
    const mammoth = (await import("mammoth")).default;
    const arrayBuffer = await file.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    editor.commands.setContent(html);
    onChange(editor.getHTML());
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #d4ecea" }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b" style={{ borderColor: "#d4ecea", background: "#f8fcfd" }}>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Gras">
          <Bold className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italique">
          <Italic className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Titre H2">
          <Heading2 className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Titre H3">
          <Heading3 className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Liste à puces">
          <List className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Liste numérotée">
          <ListOrdered className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={setLink} active={editor.isActive("link")} title="Insérer un lien">
          <Link2 className="w-4 h-4" />
        </ToolbarBtn>

        <Divider />

        {/* Insert image inline */}
        <ToolbarBtn onClick={() => imageInputRef.current?.click()} title="Insérer une image dans le texte">
          <ImagePlus className="w-4 h-4" />
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Annuler">
          <Undo className="w-4 h-4" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Rétablir">
          <Redo className="w-4 h-4" />
        </ToolbarBtn>

        <Divider />

        {/* Word import */}
        <button
          type="button"
          title="Importer un fichier Word (.docx)"
          onMouseDown={(e) => { e.preventDefault(); wordInputRef.current?.click(); }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ background: "#eef7f6", color: "#3899aa", border: "1px solid #d4ecea" }}
        >
          <FileText className="w-3.5 h-3.5" />
          Importer Word
        </button>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="prose prose-slate max-w-none p-4 min-h-[300px] focus-within:outline-none text-sm [&_img]:rounded-xl [&_img]:my-4 [&_img]:max-w-full [&_img]:mx-auto [&_img]:block"
      />

      {/* Hidden inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { handleImageUpload(f); e.target.value = ""; } }}
      />
      <input
        ref={wordInputRef}
        type="file"
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) { handleWordImport(f); e.target.value = ""; } }}
      />
    </div>
  );
}
