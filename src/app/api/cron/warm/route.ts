import { NextResponse } from "next/server";

// Keep the owned MedCPT dense endpoint warm so the first user search after idle
// gets a dense contribution (and low latency) instead of a cold miss. Deliberately
// LEAN: it only pings the Modal combined-search endpoint — no PubMed/Scopus/Springer
// calls and NO OpenRouter rerank — so the cron itself costs effectively nothing.
// Scheduled every 5 min from vercel.json (Vercel Pro).
export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  // Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`.
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const searchUrl = process.env.MEDCPT_SEARCH_URL;
  if (!searchUrl) {
    return NextResponse.json({ ok: false, reason: "MEDCPT_SEARCH_URL not set" });
  }

  const startedAt = Date.now();
  try {
    // Match the dense lane's contract: POST { query } to the combined endpoint.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(searchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "warm" }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timer));
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      warmedMs: Date.now() - startedAt,
    });
  } catch (error) {
    // A warm miss is never an incident.
    return NextResponse.json({
      ok: false,
      warmedMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : "warm failed",
    });
  }
}
