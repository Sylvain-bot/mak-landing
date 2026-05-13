"use client";

import { useState, useEffect } from "react";
import { BlogCard, type Article } from "@/components/blog/BlogCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("Tous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("articles")
      .select("id, titre, slug, extrait, categorie, photo_url, date_publication, created_at")
      .eq("statut", "publie")
      .order("date_publication", { ascending: false })
      .then(({ data }) => {
        setArticles((data as Article[]) ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = category === "Tous" ? articles : articles.filter((a) => a.categorie === category);

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
              <p className="text-[#475569] text-base max-w-xl mx-auto mb-8">
                Clinique, pratique libérale, bibliographie et innovation — par Mon Assistant Kiné.
              </p>
              <CategoryFilter active={category} onChange={setCategory} />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-white h-64 animate-pulse" style={{ border: "1px solid #d4ecea" }} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-[#94a3b8] py-20">Aucun article dans cette catégorie.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((a) => <BlogCard key={a.id} article={a} />)}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
