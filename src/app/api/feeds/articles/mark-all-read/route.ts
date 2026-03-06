import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { z } from "zod";
import { markAllRead } from "@/lib/actions/feeds";

const markAllReadSchema = z.object({
  feedSourceId: z.number().int().positive().optional(),
});

// POST — Mark all read
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

    const body = await req.json().catch(() => ({}));
    const parsed = markAllReadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await markAllRead(parsed.data.feedSourceId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/feeds/articles/mark-all-read error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
