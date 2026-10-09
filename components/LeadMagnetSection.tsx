import { LeadMagnetForm } from "@/components/LeadMagnetForm";
import { GuideFamiImage } from "@/components/GuideFamiImage";
import { GUIDE_FAMI } from "@/lib/guideFami";

export function GuideFamiPitch({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <>
      <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4 font-mono">
        {GUIDE_FAMI.eyebrow}
      </p>
      <Heading className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight mb-5">
        {GUIDE_FAMI.title}
      </Heading>
      <p className="text-[#64748b] text-base leading-relaxed mb-6">{GUIDE_FAMI.text}</p>
      <ul className="space-y-2.5 mb-8">
        {GUIDE_FAMI.bullets.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-[#2a7a8a] font-medium">
            <span className="mt-0.5 shrink-0" aria-hidden>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function LeadMagnetSection() {
  return (
    <section
      id="guide-fami"
      className="py-20 sm:py-28 px-4 sm:px-6 scroll-mt-20"
      style={{ background: "#f2f9fa", borderTop: "1px solid #d4ecea", borderBottom: "1px solid #d4ecea" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-14 items-center">
        <div className="w-40 sm:w-48 md:w-full max-w-xs mx-auto">
          <GuideFamiImage
            src={GUIDE_FAMI.cover}
            alt="Couverture du guide FAMI 2027 pour kinésithérapeutes libéraux"
            sizes="(min-width: 768px) 320px, 192px"
          />
        </div>

        <div>
          <GuideFamiPitch />
          <div className="max-w-md">
            <LeadMagnetForm source="landing-section" />
          </div>
        </div>
      </div>
    </section>
  );
}
