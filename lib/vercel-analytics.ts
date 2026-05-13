const BASE = "https://vercel.com/api/web/insights";

function headers() {
  return {
    Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
}

export async function getAnalytics(period: "day" | "week" | "month" = "week") {
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!projectId) return null;

  const now = new Date();
  const from = new Date(now);
  if (period === "day") from.setDate(now.getDate() - 1);
  else if (period === "week") from.setDate(now.getDate() - 7);
  else from.setMonth(now.getMonth() - 1);

  const params = new URLSearchParams({
    projectId,
    from: from.toISOString(),
    to: now.toISOString(),
    limit: "50",
  });

  try {
    const res = await fetch(`${BASE}/stats?${params}`, { headers: headers() });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
