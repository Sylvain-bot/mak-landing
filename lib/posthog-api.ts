const PH_HOST = "https://eu.posthog.com";

async function hogql(sql: string) {
  const key = process.env.POSTHOG_PERSONAL_API_KEY?.trim();
  const project = (process.env.POSTHOG_PROJECT_ID ?? "214209").trim();
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

// ─── Visitors list ────────────────────────────────────────────────────────────

export async function getVisitors(days = 30) {
  const d = Number(days);
  const rows = await hogql(`
    SELECT
      distinct_id,
      any(properties.$geoip_city_name)           AS ville,
      any(properties.$geoip_subdivision_1_name)  AS region,
      any(properties.$geoip_country_name)        AS pays,
      any(properties.$browser)                   AS navigateur,
      any(properties.$device_type)               AS appareil,
      count()                                    AS pages_vues,
      count(DISTINCT properties.$session_id)     AS sessions,
      min(timestamp)                             AS premiere_visite,
      max(timestamp)                             AS derniere_visite
    FROM events
    WHERE event = '$pageview'
      AND timestamp >= now() - INTERVAL ${d} DAY
    GROUP BY distinct_id
    ORDER BY derniere_visite DESC
    LIMIT 50
  `);
  return rows.map(([id, ville, region, pays, navigateur, appareil, pages, sess, first, last]) => ({
    id: String(id),
    ville: ville ? String(ville) : null,
    region: region ? String(region) : null,
    pays: pays ? String(pays) : null,
    navigateur: navigateur ? String(navigateur) : null,
    appareil: appareil ? String(appareil) : null,
    pages_vues: Number(pages),
    sessions: Number(sess),
    premiere_visite: String(first),
    derniere_visite: String(last),
  }));
}

export type Visitor = Awaited<ReturnType<typeof getVisitors>>[number];

// ─── Visitor detail ───────────────────────────────────────────────────────────

export async function getVisitorDetail(distinctId: string) {
  const safe = distinctId.replace(/[^a-zA-Z0-9\-_]/g, "");
  const [infoRows, eventRows] = await Promise.all([
    hogql(`
      SELECT
        any(properties.$geoip_city_name)          AS ville,
        any(properties.$geoip_subdivision_1_name) AS region,
        any(properties.$geoip_country_name)       AS pays,
        any(properties.$browser)                  AS navigateur,
        any(properties.$device_type)              AS appareil,
        any(properties.$os)                       AS os,
        any(properties.$referring_domain)         AS referrer,
        min(timestamp)                            AS premiere_visite
      FROM events
      WHERE distinct_id = '${safe}'
        AND event = '$pageview'
      LIMIT 1
    `),
    hogql(`
      SELECT
        event,
        properties.$pathname                    AS page,
        properties.$session_id                  AS session_id,
        toString(timestamp)                     AS ts
      FROM events
      WHERE distinct_id = '${safe}'
        AND event IN ('$pageview', '$pageleave')
        AND timestamp >= now() - INTERVAL 30 DAY
      ORDER BY timestamp ASC
      LIMIT 300
    `),
  ]);

  const info = infoRows[0] ?? [];
  const meta = {
    ville:    info[0] ? String(info[0]) : null,
    region:   info[1] ? String(info[1]) : null,
    pays:     info[2] ? String(info[2]) : null,
    navigateur: info[3] ? String(info[3]) : null,
    appareil: info[4] ? String(info[4]) : null,
    os:       info[5] ? String(info[5]) : null,
    referrer: info[6] ? String(info[6]) : null,
    premiere_visite: info[7] ? String(info[7]) : null,
  };

  // Pair pageviews with their matching pageleave to compute duration
  type RawEvent = { event: string; page: string; session_id: string; ts: string };
  const raw: RawEvent[] = eventRows.map(([ev, pg, sid, ts]) => ({
    event: String(ev),
    page: String(pg) || "/",
    session_id: String(sid),
    ts: String(ts),
  }));

  // Build session→page→[pageleave timestamps] index
  const leaveMap = new Map<string, string[]>();
  for (const r of raw) {
    if (r.event !== "$pageleave") continue;
    const key = `${r.session_id}||${r.page}`;
    if (!leaveMap.has(key)) leaveMap.set(key, []);
    leaveMap.get(key)!.push(r.ts);
  }

  const views = raw
    .filter((r) => r.event === "$pageview")
    .map((r) => {
      const key = `${r.session_id}||${r.page}`;
      const leaves = leaveMap.get(key) ?? [];
      // nearest pageleave after this pageview
      const match = leaves.find((l) => l > r.ts);
      const dureeMs = match
        ? new Date(match).getTime() - new Date(r.ts).getTime()
        : null;
      return {
        page: r.page,
        session_id: r.session_id,
        ts: r.ts,
        duree_s: dureeMs !== null ? Math.round(dureeMs / 1000) : null,
      };
    });

  return { meta, views };
}

export type VisitorDetail = Awaited<ReturnType<typeof getVisitorDetail>>;
