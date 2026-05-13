"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const AVATARS = [
  { initials: "AS", hue: 196 },
  { initials: "PL", hue: 210 },
  { initials: "MD", hue: 180 },
  { initials: "CB", hue: 220 },
  { initials: "SB", hue: 200 },
  { initials: "LM", hue: 190 },
  { initials: "FR", hue: 215 },
  { initials: "VD", hue: 185 },
];

export function SocialProof() {
  return (
    <section
      className="py-4 overflow-hidden"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea", borderBottom: "1px solid #d4ecea" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a, i) => (
                <motion.div
                  key={a.initials}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.06 }}
                  className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-semibold"
                  style={{
                    background: `hsl(${a.hue}deg 50% 88%)`,
                    color: `hsl(${a.hue}deg 60% 35%)`,
                    borderColor: "#f0f9fa",
                  }}
                >
                  {a.initials}
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-[#94a3b8] font-medium">4.9 / 5</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8" style={{ background: "#d4ecea" }} />

          <p className="text-[#64748b] text-sm sm:text-base text-center sm:text-left">
            Rejoins les{" "}
            <span className="text-[#0f172a] font-semibold">200+ kinés libéraux</span>{" "}
            qui suivent Mon Assistant Kiné
          </p>
        </motion.div>
      </div>
    </section>
  );
}
