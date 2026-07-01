import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="bg-white pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-4">
            Informations légales
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight mb-2">
            {title}
          </h1>
          <p className="text-sm text-[#94a3b8] mb-10">Dernière mise à jour : {lastUpdated}</p>

          <div
            className="
              [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-[#0f172a] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:first:mt-0
              [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#0f172a] [&_h3]:mt-7 [&_h3]:mb-3
              [&_h4]:text-sm [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-wide [&_h4]:text-[#3899aa] [&_h4]:mt-5 [&_h4]:mb-2
              [&_p]:text-[#475569] [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-[#475569] [&_ul]:mb-4
              [&_li]:leading-relaxed
              [&_strong]:text-[#0f172a] [&_strong]:font-semibold
              [&_a]:text-[#3899aa] [&_a]:hover:underline
              [&_hr]:border-[#d4ecea] [&_hr]:my-8
              [&_table]:w-full [&_table]:text-sm [&_table]:mb-6 [&_table]:border-collapse
              [&_th]:border [&_th]:border-[#d4ecea] [&_th]:bg-[#f0f9fa] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-[#0f172a] [&_th]:font-semibold
              [&_td]:border [&_td]:border-[#d4ecea] [&_td]:px-3 [&_td]:py-2 [&_td]:text-[#475569] [&_td]:align-top
            "
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
