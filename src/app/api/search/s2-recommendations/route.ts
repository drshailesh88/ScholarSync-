import { NextResponse } from "next/server";
import {
  getRecommendationsForPaper,
  getRecommendationsFromList,
} from "@/lib/search/sources/s2-recommendations";
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
  const paperId = searchParams.get("paperId");
  const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 100);

  if (!paperId) {
    return NextResponse.json(
      { error: "Query parameter 'paperId' is required" },
      { status: 400 }
    );
  }

  try {
    const results = await getRecommendationsForPaper(paperId, limit);
    return NextResponse.json({ results });
  } catch (error) {
    log.error("S2 recommendations error", error);
    return NextResponse.json(
      { error: "S2 recommendations failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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

  try {
    const body = await req.json();
    const {
      positivePaperIds,
      negativePaperIds = [],
      limit = 10,
    }: {
      positivePaperIds: string[];
      negativePaperIds?: string[];
      limit?: number;
    } = body;

    const clampedLimit = Math.min(limit, 100);

    if (!positivePaperIds || positivePaperIds.length === 0) {
      return NextResponse.json(
        { error: "positivePaperIds is required" },
        { status: 400 }
      );
    }

    const results = await getRecommendationsFromList(
      positivePaperIds,
      negativePaperIds,
      clampedLimit
    );
    return NextResponse.json({ results });
  } catch (error) {
    log.error("S2 recommendations error", error);
    return NextResponse.json(
      { error: "S2 recommendations failed" },
      { status: 500 }
    );
  }
}
