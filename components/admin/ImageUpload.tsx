"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

const MAX_PX = 1600;
const JPEG_QUALITY = 0.85;
const MAX_MB = 20;

async function compress(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = img.width > MAX_PX ? MAX_PX / img.width : 1;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error("Compression échouée")),
        "image/jpeg", JPEG_QUALITY
      );
    };
    img.onerror = reject;
    img.src = url;
  });
}

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Fichier trop lourd (max ${MAX_MB} Mo)`);
      return;
    }
    setUploading(true);
    setError("");
    try {
      const blob = await compress(file);
      const form = new FormData();
      form.append("file", blob, file.name.replace(/\.[^.]+$/, ".jpg"));
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur upload"); return; }
      if (data.url) onChange(data.url);
    } catch {
      setError("Erreur lors de la compression ou de l'upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {error && <p className="text-[#ef4444] text-xs mb-2">{error}</p>}
      {value ? (
        <div className="relative rounded-xl overflow-hidden aspect-[3/2] w-full" style={{ border: "1px solid #d4ecea" }}>
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
      <p className="text-[#94a3b8] text-xs mt-2 text-center">
        Format recommandé : ratio <strong className="text-[#64748b]">3:2</strong> · ex. 1200 × 800 px · JPG ou WebP
      </p>
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
