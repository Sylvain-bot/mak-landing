import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAnalytics, type Analytics } from "@/lib/posthog-api";

export const dynamic = "force-dynamic";

async function sha256(msg: string) {
  const buf = new TextEncoder().encode(msg);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period: rawPeriod } = await searchParams;
  const period = [7, 30, 90].includes(Number(rawPeriod)) ? Number(rawPeriod) : 30;

  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const expected = process.env.ADMIN_PASSWORD;
  const authed = expected ? session === (await sha256(expected)) : false;

  if (!authed) redirect("/admin/login?from=/admin/analytics");

  const data = await getAnalytics(period);

  return <Dashboard data={data} period={period} />;
}

// ─── Components ──────────────────────────────────────────────────────────────

function fmt(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n ?? 0);
}

function Section({ title, icon, note, children }: { title: string; icon: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #d4ecea" }}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3899aa] mb-1 font-mono">
        {icon} {title}
      </p>
      {note && <p className="text-[10px] text-[#94a3b8] mb-3">{note}</p>}
      {!note && <div className="mb-4" />}
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Bar({ label, value, max, current, pct }: { label: string; value: string; max: number; current: number; pct?: number }) {
  const w = max > 0 ? Math.round((current / max) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-[#0f172a] truncate max-w-[200px]" title={label}>{label}</span>
        <span className="text-xs font-semibold text-[#0f172a] ml-2 shrink-0 tabular-nums">
          {value}{pct !== undefined ? ` · ${pct}%` : ""}
        </span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "#f0f9fa" }}>
        <div className="h-1.5 rounded-full" style={{ width: `${w}%`, background: "linear-gradient(90deg,#3899aa,#5bb5c8)" }} />
      </div>
    </div>
  );
}

function Empty({ text = "Pas encore de données" }: { text?: string }) {
  return <p className="text-xs text-[#94a3b8] italic py-2">{text}</p>;
}

function Dashboard({ data, period }: { data: Analytics; period: number }) {
  const { overview, pages, sources, exits, ctas, devices, trend } = data;
  const maxPv = Math.max(...trend.map((t) => t.pv), 1);
  const totalViews = Math.max(overview.pageviews, 1);

  const ctaLabels: Record<string, string> = {
    cta_signup_click: "Clic « Créer mon compte »",
    cta_demo_click: "Clic « Voir la démo »",
  };

  return (
    <div className="min-h-screen" style={{ background: "#f8fcfc" }}>
      {/* Header */}
      <div style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-[#3899aa] font-bold text-base tracking-tight">MAK</span>
            <span className="text-white/20">/</span>
            <span className="text-white font-semibold text-sm">Analytics</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "#1e293b", color: "#3899aa" }}>
              PostHog EU
            </span>
          </div>
          <div className="flex gap-1">
            {[7, 30, 90].map((p) => (
              <a
                key={p}
                href={`/admin/analytics?period=${p}`}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                style={period === p ? { background: "#3899aa", color: "white" } : { color: "#64748b" }}
              >
                {p}j
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Overview */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Sessions", value: fmt(overview.sessions), sub: "visites distinctes" },
            { label: "Visiteurs uniques", value: fmt(overview.visitors), sub: "personnes différentes" },
            { label: "Pages vues", value: fmt(overview.pageviews), sub: `sur ${period} jours` },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl bg-white p-5 text-center" style={{ border: "1px solid #d4ecea" }}>
              <div className="text-3xl sm:text-4xl font-bold text-[#0f172a] tabular-nums">{c.value}</div>
              <div className="text-xs font-semibold text-[#64748b] mt-1">{c.label}</div>
              <div className="text-[10px] text-[#94a3b8]">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Trend */}
        {trend.length > 0 && (
          <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #d4ecea" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3899aa] mb-5 font-mono">
              📈 Tendance — pages vues / jour
            </p>
            <div className="flex items-end gap-[3px] h-24">
              {trend.map(({ day, pv }) => (
                <div
                  key={day}
                  className="flex-1 rounded-t-sm cursor-default"
                  style={{
                    height: `${Math.max((pv / maxPv) * 100, 3)}%`,
                    background: "linear-gradient(to top, #3899aa, #7dd3de)",
                    minWidth: 3,
                  }}
                  title={`${day} — ${pv} vue${pv > 1 ? "s" : ""}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-[#94a3b8]">
              <span>{trend[0]?.day}</span>
              <span>{trend[trend.length - 1]?.day}</span>
            </div>
          </div>
        )}

        {/* Sources + Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Section title="D'où viennent-ils" icon="🌐" note="Source / domaine référent">
            {sources.length === 0
              ? <Empty />
              : sources.map(({ source, sessions }) => (
                <Bar
                  key={source}
                  label={source}
                  value={fmt(sessions)}
                  max={sources[0].sessions}
                  current={sessions}
                  pct={Math.round((sessions / (overview.sessions || 1)) * 100)}
                />
              ))}
          </Section>

          <Section title="Pages les plus vues" icon="📄">
            {pages.length === 0
              ? <Empty />
              : pages.map(({ page, views }) => (
                <Bar
                  key={page}
                  label={page || "/"}
                  value={fmt(views)}
                  max={pages[0].views}
                  current={views}
                  pct={Math.round((views / totalViews) * 100)}
                />
              ))}
          </Section>
        </div>

        {/* Exits + CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Section
            title="Où ils quittent le site"
            icon="🚪"
            note="Page affichée au moment du départ — indique où la friction est forte"
          >
            {exits.length === 0
              ? <Empty text="Pas encore de données d'exit — elles arrivent avec le trafic" />
              : exits.map(({ page, exits: n }) => (
                <Bar key={page} label={page || "/"} value={fmt(n)} max={exits[0].exits} current={n} />
              ))}
          </Section>

          <Section
            title="Actions clés"
            icon="🎯"
            note="Clics sur les CTAs tracés — conversions visibles en temps réel"
          >
            {ctas.length === 0
              ? <Empty text="Pas encore de clic CTA enregistré — ça apparaîtra avec les premières visites" />
              : ctas.map(({ event, n }) => (
                <Bar key={event} label={ctaLabels[event] ?? event} value={fmt(n)} max={ctas[0].n} current={n} />
              ))}
          </Section>
        </div>

        {/* Devices */}
        <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #d4ecea" }}>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3899aa] mb-5 font-mono">
            📱 Appareils
          </p>
          {devices.length === 0
            ? <Empty />
            : (
              <div className="flex flex-wrap gap-6">
                {devices.map(({ device, n }) => {
                  const pct = Math.round((n / totalViews) * 100);
                  const icons: Record<string, string> = { Desktop: "🖥", Mobile: "📱", Tablet: "📲" };
                  return (
                    <div key={device} className="flex items-center gap-3">
                      <span className="text-2xl">{icons[device] ?? "💻"}</span>
                      <div>
                        <div className="font-semibold text-sm text-[#0f172a]">{device}</div>
                        <div className="text-xs text-[#94a3b8]">{pct}% · {fmt(n)} vues</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {/* Conseils */}
        <div className="rounded-2xl p-5" style={{ background: "#f0f9fa", border: "1px solid #d4ecea" }}>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3899aa] mb-3 font-mono">
            💡 Comment lire ces données
          </p>
          <ul className="space-y-1.5 text-xs text-[#475569]">
            <li><span className="font-semibold text-[#0f172a]">Sources :</span> &quot;Direct / Typé&quot; = URL tapée à la main ou bookmark. Les réseaux sociaux apparaissent par domaine (instagram.com, linkedin.com...).</li>
            <li><span className="font-semibold text-[#0f172a]">Exits élevés sur une page :</span> soit c&apos;est une page de sortie naturelle (pricing → inscription), soit la page ne convainc pas — comparer avec les clics CTA.</li>
            <li><span className="font-semibold text-[#0f172a]">Pas de clic CTA :</span> les gens voient la page mais ne passent pas à l&apos;action → tester le texte du bouton ou sa position.</li>
          </ul>
        </div>

        <p className="text-center text-[10px] text-[#94a3b8] pb-4">
          Données PostHog EU · Projet {process.env.POSTHOG_PROJECT_ID ?? "214209"} · Mise à jour toutes les 5 min
        </p>
      </div>
    </div>
  );
}
