"use client";

import { useState } from "react";
import { BlogCard, type Article } from "@/components/blog/BlogCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";

export function BlogClient({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState("Tous");
  const filtered = category === "Tous" ? articles : articles.filter((a) => a.categorie === category);

  return (
    <>
      <CategoryFilter active={category} onChange={setCategory} />
      <div className="mt-8">
        {filtered.length === 0 ? (
          <p className="text-center text-[#94a3b8] py-20">Aucun article dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a) => <BlogCard key={a.id} article={a} />)}
          </div>
        )}
      </div>
    </>
  );
}
