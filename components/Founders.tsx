"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Quote } from "lucide-react";

export function Founders() {
  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#0f172a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 100% 0%, rgba(56,153,170,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 0% 100%, rgba(56,153,170,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-[#5bc4d6] text-sm font-semibold uppercase tracking-widest mb-4">
            Les fondateurs
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Créé par des kinés,{" "}
            <span style={{ background: "linear-gradient(135deg, #5bc4d6 0%, #3899aa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              pour des kinés.
            </span>
          </h2>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl p-8 sm:p-12 relative mb-10"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="absolute top-8 right-8" style={{ opacity: 0.06 }}>
            <Quote className="w-16 h-16 text-[#3899aa]" />
          </div>

          <p className="text-white/75 text-lg sm:text-xl leading-relaxed font-medium max-w-3xl mb-10">
            &ldquo;Nous avons créé Mon Assistant Kiné parce que nous vivions les mêmes contraintes
            que vous : trop de temps perdu sur l&apos;administratif, trop d&apos;énergie dispersée
            dans la recherche d&apos;informations. L&apos;objectif n&apos;a jamais été de remplacer
            le raisonnement clinique, mais de le soutenir avec des outils vraiment adaptés à la
            pratique. Faire mieux, sans faire plus.&rdquo;
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { name: "Sylvain", role: "Kinésithérapeute libéral" },
              { name: "Valentin", role: "Kinésithérapeute libéral" },
            ].map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: "#3899aa", boxShadow: "0 4px 16px rgba(56,153,170,0.3)" }}
                >
                  {founder.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{founder.name}</p>
                  <p className="text-white/40 text-xs">{founder.role} · Co-fondateur MAK</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { value: "2", label: "kinés libéraux fondateurs" },
              { value: "100%", label: "conçu pour la pratique terrain" },
              { value: "0", label: "intermédiaire entre vous et l'outil" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 min-w-[140px]">
                <span className="text-2xl font-bold text-[#5bc4d6]">{item.value}</span>
                <span className="text-xs text-white/35 max-w-[130px] leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
