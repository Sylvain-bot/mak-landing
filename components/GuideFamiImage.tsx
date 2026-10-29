"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";

// Page du guide au format A4. Si l'image n'est pas encore déposée dans /public/images, affiche un placeholder.
export function GuideFamiImage({
  src,
  alt,
  label,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  label?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <div
      className="relative w-full aspect-[210/297] rounded-xl overflow-hidden bg-white"
      style={{ border: "1px solid #d4ecea", boxShadow: "0 12px 32px rgba(15,23,42,0.10)" }}
    >
      {missing ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center"
          style={{ background: "linear-gradient(160deg, #f0f9fa, #ffffff)" }}>
          <FileText className="size-10 text-[#3899aa]" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3899aa] font-mono">Guide FAMI 2027</p>
          {label && <p className="text-xs text-[#475569]">{label}</p>}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}
