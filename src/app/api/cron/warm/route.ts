import { NextResponse } from "next/server";
import { runLiteratureSearch } from "@/lib/search/run-search";

// A low-traffic serverless app scales to zero, so the FIRST user search after idle
// pays a cold start (Modal dense endpoint + the function itself) and can blow past
// the client abort. This cron exercises the real literature pipeline on a schedule
// so the owned dense lane, the reranker, and the upstream connections stay warm and
// the result cache stays primed. Scheduled from vercel.json.
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const WARM_QUERY = "recent advances in cardiology";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  // Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. If the secret is
  // configured, require it — so the endpoint can't be spammed to run searches.
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const startedAt = Date.now();
  try {
    const r = await runLiteratureSearch({ query: WARM_QUERY, perPage: 1 });
    return NextResponse.json({
      ok: true,
      warmedMs: Date.now() - startedAt,
      sources: Object.keys(r.sourceCounts),
    });
  } catch (error) {
    // Never fail the cron — a warm miss is not an incident.
    return NextResponse.json({
      ok: false,
      warmedMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : "warm failed",
    });
  }
}
