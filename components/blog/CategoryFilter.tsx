"use client";

const CATEGORIES = ["Tous", "IA clinique", "Bibliographie", "Bilans", "Pratique libérale"];

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
          style={
            active === cat
              ? { background: "#3899aa", color: "white", border: "1px solid #3899aa" }
              : { background: "white", color: "#64748b", border: "1px solid #d4ecea" }
          }
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
