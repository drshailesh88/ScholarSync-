import { NextResponse } from "next/server";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function GET(req: Request) {
  const log = logger.withRequestId();

  // Authentication
  let userId: string;
  try {
    userId = await getCurrentUserId();
  } catch {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Rate limiting
  const rateLimitResponse = await checkRateLimit(userId, "search", RATE_LIMITS.search);
  if (rateLimitResponse) return rateLimitResponse;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const maxResults = Math.min(parseInt(searchParams.get("maxResults") || "20", 10), 100);
  const page = parseInt(searchParams.get("page") || "0", 10);
  const yearStart = searchParams.get("yearStart")
    ? parseInt(searchParams.get("yearStart")!, 10)
    : undefined;
  const yearEnd = searchParams.get("yearEnd")
    ? parseInt(searchParams.get("yearEnd")!, 10)
    : undefined;

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  if (q.length > 500) {
    return NextResponse.json(
      { error: "Query parameter 'q' must not exceed 500 characters" },
      { status: 400 }
    );
  }

  try {
    const data = await searchPubMed(q, { maxResults, page, yearStart, yearEnd });
    return NextResponse.json(data);
  } catch (error) {
    log.error("PubMed search error", error);
    return NextResponse.json(
      { error: "PubMed search failed" },
      { status: 500 }
    );
  }
}
