import { supabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
import { type Article } from "@/components/blog/BlogCard";
import { BlogClient } from "@/components/blog/BlogClient";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default async function BlogPage() {
  const { data } = await supabaseAdmin
    .from("articles")
    .select("id, titre, slug, extrait, categorie, photo_url, date_publication, created_at")
    .eq("statut", "publie")
    .order("date_publication", { ascending: false });

  const articles = (data as Article[]) ?? [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#f0f9fa" }}>
        <section className="py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-3">Blog</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] mb-3 leading-tight">
                Ressources pour les kinés libéraux
              </h1>
              <div className="text-left max-w-2xl mx-auto mb-6 text-[#475569] text-sm leading-relaxed">
                <p className="mb-2">
                  Le blog de Mon Assistant Kiné publie des ressources cliniques et pratiques à destination
                  des kinésithérapeutes libéraux exerçant en France. Chaque article est rédigé ou validé
                  par des kinésithérapeutes diplômés d&apos;État, en s&apos;appuyant sur la littérature scientifique
                  internationale (PubMed, Cleland, recommandations HAS).
                </p>
                <p className="text-center">Nos thématiques : IA clinique · Bibliographie · Bilans · Pratique libérale</p>
              </div>
              <h2 className="sr-only">Catégories</h2>
              <BlogClient articles={articles} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
