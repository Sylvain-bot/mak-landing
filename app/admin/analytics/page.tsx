import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAnalytics, type Analytics,
  getVisitors, type Visitor,
  getVisitorDetail, type VisitorDetail,
} from "@/lib/posthog-api";

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
  searchParams: Promise<{ period?: string; visitor?: string }>;
}) {
  const { period: rawPeriod, visitor: visitorId } = await searchParams;
  const period = [7, 30, 90].includes(Number(rawPeriod)) ? Number(rawPeriod) : 30;

  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const expected = process.env.ADMIN_PASSWORD;
  const authed = expected ? session === (await sha256(expected)) : false;

  if (!authed) redirect("/admin/login?from=/admin/analytics");

  const hasKey = !!process.env.POSTHOG_PERSONAL_API_KEY?.trim();

  // Visitor detail view
  if (visitorId) {
    const detail = await getVisitorDetail(visitorId);
    return <VisitorDetailView id={visitorId} detail={detail} period={period} />;
  }

  // Main dashboard
  const [data, visitors] = await Promise.all([
    getAnalytics(period),
    getVisitors(period),
  ]);

  return <Dashboard data={data} visitors={visitors} period={period} hasKey={hasKey} />;
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

function Dashboard({ data, visitors, period, hasKey }: { data: Analytics; visitors: Visitor[]; period: number; hasKey: boolean }) {
  const { overview, pages, sources, exits, ctas, devices, trend } = data;
  const maxPv = Math.max(...trend.map((t) => t.pv), 1);
  const totalViews = Math.max(overview.pageviews, 1);
  const hasData = overview.pageviews > 0;

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

        {/* Warning banners */}
        {!hasKey && (
          <div className="rounded-xl px-5 py-3 text-sm font-medium" style={{ background: "#fef3c7", border: "1px solid #fbbf24", color: "#92400e" }}>
            ⚠️ Variable <code className="font-mono text-xs bg-amber-100 px-1 rounded">POSTHOG_PERSONAL_API_KEY</code> non détectée sur Vercel — les données ne peuvent pas être chargées.
          </div>
        )}
        {hasKey && !hasData && (
          <div className="rounded-xl px-5 py-3 text-sm font-medium" style={{ background: "#fef3c7", border: "1px solid #fbbf24", color: "#92400e" }}>
            ⚠️ La clé PostHog est présente mais aucune donnée n&apos;est retournée. Vérifier que la clé est correcte dans Vercel (sans espace ni saut de ligne).
          </div>
        )}

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

        {/* Visiteurs récents */}
        <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #d4ecea" }}>
          <div className="px-6 pt-5 pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3899aa] font-mono">
              👤 Visiteurs récents
            </p>
            <p className="text-[10px] text-[#94a3b8] mt-0.5">Cliquer sur un visiteur pour voir son parcours détaillé</p>
          </div>
          {visitors.length === 0 ? (
            <div className="px-6 pb-5"><Empty /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: "#f8fcfc", borderBottom: "1px solid #d4ecea" }}>
                    {["Visiteur", "Lieu", "Appareil", "Pages vues", "Dernière visite"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left font-semibold text-[#64748b] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v, i) => (
                    <tr
                      key={v.id}
                      style={{ borderBottom: i < visitors.length - 1 ? "1px solid #f0f9fa" : "none" }}
                    >
                      <td className="px-4 py-3">
                        <a
                          href={`/admin/analytics?visitor=${encodeURIComponent(v.id)}&period=${period}`}
                          className="font-mono text-[10px] text-[#3899aa] hover:underline"
                        >
                          {v.id.slice(0, 8)}…
                        </a>
                      </td>
                      <td className="px-4 py-3 text-[#475569]">
                        {[v.ville, v.region, v.pays].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-4 py-3 text-[#475569]">
                        {v.navigateur ?? "—"}{v.appareil ? ` · ${v.appareil}` : ""}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#0f172a]">{v.pages_vues}</td>
                      <td className="px-4 py-3 text-[#94a3b8] whitespace-nowrap">
                        {new Date(v.derniere_visite).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          Données PostHog EU · Projet {process.env.POSTHOG_PROJECT_ID ?? "214209"} · Mise à jour à chaque rechargement
        </p>
      </div>
    </div>
  );
}

// ─── Visitor detail view ──────────────────────────────────────────────────────

function fmtDuree(s: number | null): string {
  if (s === null) return "—";
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return sec > 0 ? `${m}m ${sec}s` : `${m}m`;
}

function fmtTs(ts: string) {
  return new Date(ts).toLocaleString("fr-FR", {
    day: "2-digit", month: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
}

function VisitorDetailView({ id, detail, period }: { id: string; detail: VisitorDetail; period: number }) {
  const { meta, views } = detail;

  // Group by session_id keeping insertion order
  const sessionMap = new Map<string, typeof views>();
  for (const v of views) {
    if (!sessionMap.has(v.session_id)) sessionMap.set(v.session_id, []);
    sessionMap.get(v.session_id)!.push(v);
  }
  const sessions = [...sessionMap.entries()];

  const deviceIcon = (d: string | null) =>
    d === "Mobile" ? "📱" : d === "Tablet" ? "📲" : "🖥";

  return (
    <div className="min-h-screen" style={{ background: "#f8fcfc" }}>
      {/* Header */}
      <div style={{ background: "#0f172a" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <a
            href={`/admin/analytics?period=${period}`}
            className="text-[#3899aa] hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            ← Retour
          </a>
          <span className="text-white/20">/</span>
          <span className="text-white font-semibold text-sm">Parcours visiteur</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full ml-auto" style={{ background: "#1e293b", color: "#3899aa" }}>
            {id.slice(0, 12)}…
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Visitor info card */}
        <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #d4ecea" }}>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3899aa] mb-4 font-mono">
            👤 Profil du visiteur
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Ville", value: [meta.ville, meta.region].filter(Boolean).join(", ") || "—" },
              { label: "Pays", value: meta.pays || "—" },
              { label: "Appareil", value: `${deviceIcon(meta.appareil)} ${meta.appareil || "—"}` },
              { label: "Navigateur", value: meta.navigateur || "—" },
              { label: "OS", value: meta.os || "—" },
              { label: "Source", value: meta.referrer || "Direct / Typé" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-0.5">{label}</div>
                <div className="text-sm text-[#0f172a] font-medium">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions */}
        {sessions.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-[#94a3b8]" style={{ border: "1px solid #d4ecea" }}>
            Aucun parcours disponible pour ce visiteur
          </div>
        ) : sessions.map(([sessId, pages], si) => {
          const totalDuree = pages.reduce((acc, p) => acc + (p.duree_s ?? 0), 0);
          return (
            <div key={sessId} className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #d4ecea" }}>
              {/* Session header */}
              <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#f8fcfc", borderBottom: "1px solid #d4ecea" }}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3899aa] font-mono">
                    Session {si + 1}
                  </span>
                  <span className="text-[10px] text-[#94a3b8]">·</span>
                  <span className="text-[10px] text-[#94a3b8]">{pages.length} page{pages.length > 1 ? "s" : ""}</span>
                  {totalDuree > 0 && (
                    <>
                      <span className="text-[10px] text-[#94a3b8]">·</span>
                      <span className="text-[10px] text-[#94a3b8]">{fmtDuree(totalDuree)} total</span>
                    </>
                  )}
                </div>
                <span className="text-[10px] text-[#94a3b8]">{fmtTs(pages[0].ts)}</span>
              </div>

              {/* Pages list */}
              <div className="divide-y" style={{ borderColor: "#f0f9fa" }}>
                {pages.map((p, pi) => (
                  <div key={pi} className="px-5 py-3 flex items-center gap-3">
                    {/* Step number */}
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                      style={{ background: "#eef7f6", color: "#3899aa" }}
                    >
                      {pi + 1}
                    </div>

                    {/* Page path */}
                    <div className="flex-1 min-w-0">
                      <span
                        className="text-sm font-mono text-[#0f172a] truncate block"
                        title={p.page}
                      >
                        {p.page}
                      </span>
                      <span className="text-[10px] text-[#94a3b8]">{fmtTs(p.ts)}</span>
                    </div>

                    {/* Duration */}
                    <div className="shrink-0 text-right">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={
                          p.duree_s === null
                            ? { background: "#f1f5f9", color: "#94a3b8" }
                            : p.duree_s > 60
                            ? { background: "#eef7f6", color: "#3899aa" }
                            : { background: "#f8fcfc", color: "#64748b" }
                        }
                      >
                        {fmtDuree(p.duree_s)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
