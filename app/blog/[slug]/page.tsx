import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCta } from "@/components/blog/BlogCta";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

async function getArticle(slug: string) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("statut", "publie")
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monassistantkine.fr";
  return {
    title: article.meta_titre ?? article.titre,
    description: article.meta_description ?? article.extrait ?? undefined,
    openGraph: {
      title: article.meta_titre ?? article.titre,
      description: article.meta_description ?? article.extrait ?? undefined,
      images: article.photo_url ? [article.photo_url] : [],
      url: `${site}/blog/${slug}`,
      type: "article",
    },
    alternates: { canonical: `${site}/blog/${slug}` },
  };
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "IA clinique":        { bg: "#eef7f6", text: "#3899aa" },
  "Bibliographie":      { bg: "#eff6ff", text: "#3b82f6" },
  "Bilans":             { bg: "#fef3c7", text: "#d97706" },
  "Pratique libérale":  { bg: "#fce7f3", text: "#db2777" },
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monassistantkine.fr";
  const colors = article.categorie ? (CATEGORY_COLORS[article.categorie] ?? { bg: "#f1f5f9", text: "#64748b" }) : { bg: "#f1f5f9", text: "#64748b" };
  const date = new Date(article.date_publication ?? article.created_at).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.extrait ?? undefined,
    image: article.photo_url ?? undefined,
    datePublished: article.date_publication ?? article.created_at,
    publisher: {
      "@type": "Organization",
      name: "Mon Assistant Kiné",
      url: site,
    },
    url: `${site}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen" style={{ background: "#f0f9fa" }}>
        <article className="py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[#94a3b8] hover:text-[#3899aa] text-sm mb-8 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Retour au blog
            </Link>

            {article.photo_url && (
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid #d4ecea" }}>
                <Image src={article.photo_url} alt={article.titre} fill className="object-cover" />
              </div>
            )}

            <div className="flex items-center gap-3 mb-5">
              {article.categorie && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                  {article.categorie}
                </span>
              )}
              <span className="text-[#94a3b8] text-xs">{date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-4 leading-tight">
              {article.titre}
            </h1>

            {article.extrait && (
              <p className="text-[#475569] text-lg leading-relaxed mb-8 font-medium">
                {article.extrait}
              </p>
            )}

            {article.corps && (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.corps }}
              />
            )}

            <BlogCta />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
