"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Monitor, Tablet, Smartphone } from "lucide-react";

const DEVICES = [
  { icon: Monitor, label: "Navigateur web" },
  { icon: Tablet, label: "Tablette" },
  { icon: Smartphone, label: "Mobile" },
];

export function MultiDevice() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#0f172a" }}
    >
      {/* Gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(56,153,170,0.18) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(56,153,170,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-center">

        {/* Left — text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4 font-mono"
          >
            Disponibilité
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight"
          >
            Sur tous tes appareils,{" "}
            <span className="bg-gradient-to-r from-[#3899aa] to-[#5bb8c8] bg-clip-text text-transparent">
              sans installation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="text-[#94a3b8] text-base leading-relaxed mb-10"
          >
            Mon Assistant Kiné fonctionne directement dans le navigateur — au bureau,
            en déplacement ou entre deux patients. Aucune application à installer,
            aucune synchronisation à gérer.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4">
            {DEVICES.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.22 + i * 0.08 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "rgba(56,153,170,0.1)", border: "1px solid rgba(56,153,170,0.2)" }}
              >
                <Icon className="w-5 h-5 shrink-0" style={{ color: "#3899aa" }} />
                <span className="text-sm font-semibold text-white">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center"
        >
          {/* Glow behind card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,153,170,0.3) 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative scale-100 sm:scale-110 lg:scale-125"
          >
            <Image
              src="/new_se-removebg-preview.png"
              alt="Mon Assistant Kiné — disponible sur PC, tablette et mobile"
              width={1200}
              height={940}
              className="w-full block"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
