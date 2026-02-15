import { NextResponse } from "next/server";
import { lookupUnpaywall } from "@/lib/search/sources/unpaywall";
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
  const doi = searchParams.get("doi");

  if (!doi) {
    return NextResponse.json(
      { error: "Query parameter 'doi' is required" },
      { status: 400 }
    );
  }

  try {
    const result = await lookupUnpaywall(doi);
    return NextResponse.json(result);
  } catch (error) {
    log.error("Unpaywall lookup error", error);
    return NextResponse.json(
      { error: "Unpaywall lookup failed" },
      { status: 500 }
    );
  }
}
