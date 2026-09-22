"use client";

import Image from "next/image";

export function ReeducaBanner() {
  const repeated = Array(6).fill(null);

  return (
    <div
      className="overflow-hidden"
      style={{ background: "#eef7f6", borderTop: "1px solid #d4ecea", borderBottom: "1px solid #d4ecea" }}
    >
      <div
        className="flex items-center gap-12 py-3 animate-marquee whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {repeated.map((_, i) => (
          <span key={i} className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-medium text-[#2a7a8a]">🎤 Mon Assistant Kiné cité à la conférence ITMP · Rééduca Paris, septembre 2026</span>
            <span className="text-[#3899aa]/40 mx-2">✦</span>
            <Image
              src="/logo reeduca.png"
              alt="Rééduca"
              width={110}
              height={40}
              className="object-contain"
              style={{ maxHeight: "38px", width: "auto", opacity: 0.75 }}
            />
            <span className="text-[#3899aa]/40 mx-2">✦</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
