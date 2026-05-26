"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Quote } from "lucide-react";

export function Founders() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6"
      style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">
            Les fondateurs
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight">
            Créé par des kinés,{" "}
            <span className="bg-gradient-to-r from-[#3899aa] to-[#2a7a8a] bg-clip-text text-transparent">
              pour des kinés.
            </span>
          </h2>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl p-8 sm:p-10 relative mb-8 bg-white"
          style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 16px rgba(56,153,170,0.07)" }}
        >
          <div className="absolute top-8 right-8 opacity-[0.07]">
            <Quote className="w-14 h-14 text-[#3899aa]" />
          </div>

          <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            &ldquo;Nous avons créé Mon Assistant Kiné parce que nous vivions les mêmes contraintes
            que vous : trop de temps perdu sur l&apos;administratif, trop d&apos;énergie dispersée
            dans la recherche d&apos;informations. L&apos;objectif n&apos;a jamais été de remplacer
            le raisonnement clinique, mais de le soutenir avec des outils vraiment adaptés à la
            pratique. Faire mieux, sans faire plus.&rdquo;
          </p>

          <div className="flex flex-wrap gap-5">
            {[
              { name: "Sylvain", role: "Kinésithérapeute libéral" },
              { name: "Valentin", role: "Kinésithérapeute libéral" },
            ].map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: "#3899aa", boxShadow: "0 4px 12px rgba(56,153,170,0.25)" }}
                >
                  {founder.name[0]}
                </div>
                <div>
                  <p className="text-[#0f172a] font-semibold text-sm">{founder.name}</p>
                  <p className="text-[#94a3b8] text-xs">{founder.role} · Co-fondateur de Mon Assistant Kiné</p>
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
              { value: "0", label: "intermédiaire entre toi et l'outil" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 min-w-[140px]">
                <span className="text-2xl font-bold text-[#3899aa]">{item.value}</span>
                <span className="text-xs text-[#64748b] max-w-[130px] leading-snug">{item.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
