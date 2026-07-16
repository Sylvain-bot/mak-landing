import Link from "next/link";

export function BlogCta() {
  return (
    <div
      className="rounded-2xl p-8 text-center mt-16"
      style={{ background: "#eef7f6", border: "1px solid #d4ecea" }}
    >
      <p className="text-[#3899aa] text-xs font-semibold uppercase tracking-widest mb-2">Mon Assistant Kiné</p>
      <h3 className="text-[#0f172a] font-bold text-xl mb-2 leading-tight">
        Prêt à récupérer 45 minutes par jour ?
      </h3>
      <p className="text-[#475569] text-sm mb-5 max-w-sm mx-auto">
        Rejoins les kinés qui utilisent Mon Assistant Kiné au quotidien.
      </p>
      <Link
        href="https://www.monassistantkine.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #3899aa 0%, #2a7a8a 100%)" }}
      >
        14 jours d&apos;essai gratuit
      </Link>
    </div>
  );
}
