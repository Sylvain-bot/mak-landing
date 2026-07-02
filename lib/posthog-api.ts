const PH_HOST = "https://eu.posthog.com";

async function hogql(sql: string) {
  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  const project = process.env.POSTHOG_PROJECT_ID ?? "214209";
  if (!key) return [];
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(`${PH_HOST}/api/projects/${project}/query/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: { kind: "HogQLQuery", query: sql } }),
      signal: ctrl.signal,
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.results ?? []) as unknown[][];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

export async function getAnalytics(days = 30) {
  const d = Number(days);

  const [overview, pages, sources, exits, ctas, devices, trend] =
    await Promise.all([
      hogql(`
        SELECT
          count() AS pageviews,
          count(DISTINCT distinct_id) AS visitors,
          count(DISTINCT properties.$session_id) AS sessions
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= now() - INTERVAL ${d} DAY
      `),
      hogql(`
        SELECT
          coalesce(nullIf(properties.$pathname, ''), '/') AS page,
          count() AS views
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= now() - INTERVAL ${d} DAY
        GROUP BY page
        ORDER BY views DESC
        LIMIT 15
      `),
      hogql(`
        SELECT
          coalesce(nullIf(properties.$referring_domain, ''), 'Direct / Typé') AS source,
          count() AS sessions
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= now() - INTERVAL ${d} DAY
        GROUP BY source
        ORDER BY sessions DESC
        LIMIT 12
      `),
      hogql(`
        SELECT
          coalesce(nullIf(properties.$pathname, ''), '/') AS page,
          count() AS exits
        FROM events
        WHERE event = '$pageleave'
          AND timestamp >= now() - INTERVAL ${d} DAY
        GROUP BY page
        ORDER BY exits DESC
        LIMIT 12
      `),
      hogql(`
        SELECT event, count() AS n
        FROM events
        WHERE event IN ('cta_signup_click', 'cta_demo_click')
          AND timestamp >= now() - INTERVAL ${d} DAY
        GROUP BY event
        ORDER BY n DESC
      `),
      hogql(`
        SELECT
          coalesce(nullIf(properties.$device_type, ''), 'Inconnu') AS device,
          count() AS n
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= now() - INTERVAL ${d} DAY
        GROUP BY device
        ORDER BY n DESC
      `),
      hogql(`
        SELECT
          toDate(timestamp) AS day,
          count() AS pageviews
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= now() - INTERVAL ${d} DAY
        GROUP BY day
        ORDER BY day ASC
      `),
    ]);

  const [pv, visitors, sessions] = (overview[0] as number[]) ?? [0, 0, 0];

  return {
    overview: { pageviews: pv ?? 0, visitors: visitors ?? 0, sessions: sessions ?? 0 },
    pages: pages.map(([page, views]) => ({ page: String(page), views: Number(views) })),
    sources: sources.map(([source, sessions]) => ({ source: String(source), sessions: Number(sessions) })),
    exits: exits.map(([page, exits]) => ({ page: String(page), exits: Number(exits) })),
    ctas: ctas.map(([event, n]) => ({ event: String(event), n: Number(n) })),
    devices: devices.map(([device, n]) => ({ device: String(device), n: Number(n) })),
    trend: trend.map(([day, pv]) => ({ day: String(day), pv: Number(pv) })),
  };
}

export type Analytics = Awaited<ReturnType<typeof getAnalytics>>;
