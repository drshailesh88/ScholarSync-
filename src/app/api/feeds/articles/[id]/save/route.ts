import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { saveArticleToLibrary } from "@/lib/actions/feeds";

// POST — Save to Library
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "feeds", RATE_LIMITS.feeds);
    if (rateLimitResponse) return rateLimitResponse;

    const { id } = await params;
    const articleId = parseInt(id, 10);
    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const result = await saveArticleToLibrary(articleId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/feeds/articles/[id]/save error", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    if (message.includes("not found")) return NextResponse.json({ error: message }, { status: 404 });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
