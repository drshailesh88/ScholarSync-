import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { feedArticles } from "@/lib/db/schema";
import { findRelatedPapers } from "@/lib/feeds/related-papers";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const rateLimitResponse = await checkRateLimit(
      userId,
      "research",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    const { id } = await params;
    const articleId = Number.parseInt(id, 10);

    if (Number.isNaN(articleId)) {
      return NextResponse.json(
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const [article] = await db
      .select({
        title: feedArticles.title,
        doi: feedArticles.doi,
        pubmedId: feedArticles.pubmedId,
      })
      .from(feedArticles)
      .where(eq(feedArticles.id, articleId));

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const result = await findRelatedPapers(article, 5);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/feeds/articles/[id]/related error", error);
    return NextResponse.json(
      { error: "Failed to find related papers" },
      { status: 500 }
    );
  }
}
