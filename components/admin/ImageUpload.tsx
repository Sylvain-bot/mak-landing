"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur upload"); return; }
      if (data.url) onChange(data.url);
    } catch {
      setError("Erreur réseau lors de l'upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {error && <p className="text-[#ef4444] text-xs mb-2">{error}</p>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden h-40 w-full" style={{ border: "1px solid #d4ecea" }}>
          <Image src={value} alt="Photo article" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
          >
            <X className="w-4 h-4 text-[#ef4444]" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 rounded-xl flex flex-col items-center justify-center gap-2 text-sm text-[#94a3b8] hover:text-[#3899aa] hover:border-[#3899aa]/40 transition-all"
          style={{ border: "2px dashed #d4ecea", background: "#f8fcfd" }}
        >
          <Upload className="w-5 h-5" />
          {uploading ? "Envoi en cours…" : "Cliquer pour uploader une image"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
