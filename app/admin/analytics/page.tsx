"use client";

import { useEffect, useState } from "react";
import { BarChart2, Users, Eye, Clock } from "lucide-react";

type Period = "day" | "week" | "month";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("week");
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?period=${period}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setUnavailable(true); setData(null); }
        else { setUnavailable(false); setData(d); }
      })
      .finally(() => setLoading(false));
  }, [period]);

  const PERIODS: { value: Period; label: string }[] = [
    { value: "day", label: "Aujourd'hui" },
    { value: "week", label: "7 jours" },
    { value: "month", label: "30 jours" },
  ];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#0f172a] font-bold text-xl">Analytics</h1>
          <p className="text-[#94a3b8] text-sm mt-0.5">Via Vercel Analytics.</p>
        </div>
        <div className="flex gap-1.5 p-1 rounded-xl" style={{ background: "white", border: "1px solid #d4ecea" }}>
          {PERIODS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPeriod(value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={period === value ? { background: "#3899aa", color: "white" } : { color: "#64748b" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 rounded-2xl animate-pulse bg-white" style={{ border: "1px solid #d4ecea" }} />)}
        </div>
      ) : unavailable ? (
        <div className="rounded-2xl p-10 text-center bg-white" style={{ border: "1px solid #d4ecea" }}>
          <BarChart2 className="w-8 h-8 text-[#d4ecea] mx-auto mb-3" />
          <p className="text-[#64748b] text-sm">Analytics non disponible.</p>
          <p className="text-[#94a3b8] text-xs mt-1">Configure <code className="text-[#3899aa]">VERCEL_ACCESS_TOKEN</code> et <code className="text-[#3899aa]">VERCEL_PROJECT_ID</code> dans les variables d'environnement.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={<Eye className="w-4 h-4" />} label="Pages vues" value={String((data as Record<string, number>)?.pageviews ?? "—")} />
          <StatCard icon={<Users className="w-4 h-4" />} label="Visiteurs uniques" value={String((data as Record<string, number>)?.visitors ?? "—")} />
          <StatCard icon={<Clock className="w-4 h-4" />} label="Durée moy." value={String((data as Record<string, number>)?.avgDuration ? `${Math.round((data as Record<string, number>).avgDuration)}s` : "—")} />
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #d4ecea" }}>
      <div className="flex items-center gap-2 text-[#94a3b8] text-xs font-medium mb-2">{icon} {label}</div>
      <p className="text-[#0f172a] font-bold text-3xl tabular-nums">{value}</p>
    </div>
  );
}
