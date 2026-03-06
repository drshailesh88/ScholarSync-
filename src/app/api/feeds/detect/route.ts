import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { z } from "zod";
import { detectFeedFromUrl } from "@/lib/actions/feeds";

const detectSchema = z.object({
  url: z.string().url(),
});

// POST — Auto-detect feed from URL
export async function POST(req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "feeds", RATE_LIMITS.feeds);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const parsed = detectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const feeds = await detectFeedFromUrl(parsed.data.url);
    return NextResponse.json({ feeds });
  } catch (error) {
    console.error("POST /api/feeds/detect error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
