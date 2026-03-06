import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { z } from "zod";
import { getSubscriptions, subscribeFeed, subscribePubMedSearch } from "@/lib/actions/feeds";

// GET — List user's feed subscriptions
export async function GET(_req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    void userId;

    const result = await getSubscriptions();
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/feeds error", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// POST — Subscribe to a feed
const subscribeSchema = z.object({
  feedUrl: z.string().url().optional(),
  pubmedQuery: z.string().min(1).optional(),
}).refine((d) => d.feedUrl || d.pubmedQuery, {
  message: "Either feedUrl or pubmedQuery is required",
});

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
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (parsed.data.pubmedQuery) {
      const result = await subscribePubMedSearch(parsed.data.pubmedQuery);
      return NextResponse.json(result);
    }

    const result = await subscribeFeed(parsed.data.feedUrl!);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/feeds error", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    if (message.includes("Already")) return NextResponse.json({ error: message }, { status: 409 });
    if (message.includes("Invalid")) return NextResponse.json({ error: message }, { status: 400 });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
