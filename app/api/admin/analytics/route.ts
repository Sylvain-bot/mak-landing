import { NextRequest, NextResponse } from "next/server";
import { getAnalytics } from "@/lib/vercel-analytics";

export async function GET(req: NextRequest) {
  const period = (req.nextUrl.searchParams.get("period") ?? "week") as "day" | "week" | "month";
  const data = await getAnalytics(period);
  if (!data) return NextResponse.json({ error: "Analytics unavailable" }, { status: 503 });
  return NextResponse.json(data);
}
