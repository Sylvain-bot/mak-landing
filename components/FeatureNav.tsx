import Link from "next/link";

const FEATURES = [
  { href: "/fonctionnalites/documentation-bilan-kine", icon: "📋", label: "Bilans NGAP", desc: "en 5 minutes" },
  { href: "/fonctionnalites/aide-decision-clinique", icon: "🧠", label: "Copilote IA Kiné", desc: "clinique & bibliographique" },
  { href: "/fonctionnalites/suivi-patient", icon: "💬", label: "Suivi patient", desc: "via WhatsApp" },
  { href: "/fonctionnalites/gestion-administrative", icon: "📨", label: "Administratif", desc: "en 1 clic" },
  { href: "/fonctionnalites/contrats-remplacement", icon: "📑", label: "Contrats", desc: "100 % gratuit", free: true },
];

export function FeatureNav() {
  return (
    <section className="py-12 px-4 sm:px-6" style={{ background: "#f0f9fa", borderTop: "1px solid #d4ecea" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#3899aa] mb-6">
          Toutes les fonctionnalités
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {FEATURES.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-white text-center transition-all hover:-translate-y-0.5 w-[calc(50%-6px)] sm:w-40"
              style={(f as any).free
                ? { border: "1px solid #86efac", boxShadow: "0 1px 4px rgba(22,163,74,0.08)" }
                : { border: "1px solid #d4ecea", boxShadow: "0 1px 4px rgba(56,153,170,0.06)" }
              }
            >
              <span className="text-xl">{f.icon}</span>
              <span className="text-xs font-semibold text-[#0f172a]">{f.label}</span>
              <span className="text-xs" style={{ color: (f as any).free ? "#15803d" : "#94a3b8" }}>{f.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
