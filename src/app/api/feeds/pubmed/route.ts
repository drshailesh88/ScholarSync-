import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { z } from "zod";
import { subscribePubMedSearch } from "@/lib/actions/feeds";

const pubmedSchema = z.object({
  query: z.string().min(1),
});

// POST — Create PubMed search feed
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
    const parsed = pubmedSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await subscribePubMedSearch(parsed.data.query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/feeds/pubmed error", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    if (message.includes("Already")) return NextResponse.json({ error: message }, { status: 409 });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
