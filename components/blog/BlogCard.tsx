import Link from "next/link";
import Image from "next/image";

export type Article = {
  id: string;
  titre: string;
  slug: string;
  extrait: string | null;
  categorie: string | null;
  photo_url: string | null;
  date_publication: string | null;
  created_at: string;
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "IA clinique":        { bg: "#eef7f6", text: "#3899aa" },
  "Bibliographie":      { bg: "#eff6ff", text: "#3b82f6" },
  "Bilans":             { bg: "#fef3c7", text: "#d97706" },
  "Pratique libérale":  { bg: "#fce7f3", text: "#db2777" },
};

export function BlogCard({ article }: { article: Article }) {
  const colors = article.categorie ? (CATEGORY_COLORS[article.categorie] ?? { bg: "#f1f5f9", text: "#64748b" }) : { bg: "#f1f5f9", text: "#64748b" };
  const date = new Date(article.date_publication ?? article.created_at).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white transition-all hover:-translate-y-1"
      style={{ border: "1px solid #d4ecea", boxShadow: "0 2px 12px rgba(56,153,170,0.06)" }}
    >
      <div className="relative h-44 bg-[#f0f9fa] overflow-hidden">
        {article.photo_url ? (
          <Image src={article.photo_url} alt={article.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl">📋</div>
        )}
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        {article.categorie && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full w-fit" style={{ background: colors.bg, color: colors.text }}>
            {article.categorie}
          </span>
        )}
        <h3 className="text-[#0f172a] font-bold text-base leading-snug group-hover:text-[#3899aa] transition-colors line-clamp-2">
          {article.titre}
        </h3>
        {article.extrait && (
          <p className="text-[#64748b] text-sm leading-relaxed line-clamp-3 flex-1">{article.extrait}</p>
        )}
        <p className="text-[#94a3b8] text-xs mt-auto">{date}</p>
      </div>
    </Link>
  );
}
