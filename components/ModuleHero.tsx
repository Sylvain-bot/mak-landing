import { ArrowRight, Check } from "lucide-react";
import { TrackedSignupLink } from "@/components/TrackedSignupLink";
import { primaryCtaClass, primaryCtaStyle } from "@/lib/ctaStyles";

// Haut de page commun aux modules : titre orienté bénéfice, capture ou maquette, trois points concrets.
export function ModuleHero({
  name,
  title,
  points,
  visual,
  note,
}: {
  name: string;
  title: string;
  points: [string, string, string];
  visual: React.ReactNode;
  note?: string;
}) {
  return (
    <section className="px-4 sm:px-6 pt-24 pb-14 sm:pt-32 sm:pb-20 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#236f7d]">{name}</p>
          <h1 className="mt-3 text-[2.2rem] leading-[1.1] sm:text-5xl font-bold text-[#0f172a] tracking-tight text-balance">
            {title}
          </h1>
          <ul className="mt-7 flex flex-col gap-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base sm:text-lg text-[#334155] leading-snug">
                <span className="mt-0.5 shrink-0 size-6 rounded-full inline-flex items-center justify-center" style={{ background: "#e2f1f3" }}>
                  <Check className="size-4 text-[#236f7d]" aria-hidden />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <TrackedSignupLink location="module-hero" className={`${primaryCtaClass} mt-8 h-13 px-7 text-base w-full sm:w-auto`} style={primaryCtaStyle}>
            Essayer gratuitement 14 jours <ArrowRight className="size-5" aria-hidden />
          </TrackedSignupLink>
          {note && <p className="mt-4 text-sm text-[#64748b]">{note}</p>}
        </div>
        <div className="min-w-0">{visual}</div>
      </div>
    </section>
  );
}

export function ModuleScreenshot({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#f2f9fa]" style={{ border: "1px solid #dcecef", boxShadow: "0 18px 40px rgba(15,23,42,0.10)" }}>
      {children}
    </div>
  );
}
