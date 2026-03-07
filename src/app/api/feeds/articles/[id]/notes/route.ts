import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getArticleNote, saveArticleNote } from "@/lib/actions/feeds";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

// GET — Fetch note for article
export async function GET(
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

    const notes = await getArticleNote(articleId);
    return NextResponse.json({ notes });
  } catch (error) {
    console.error("GET /api/feeds/articles/[id]/notes error", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT — Save or clear note for article
export async function PUT(
  req: NextRequest,
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

    const body = await req.json();
    const notes =
      body?.notes == null
        ? null
        : typeof body.notes === "string"
          ? body.notes
          : undefined;

    if (notes === undefined) {
      return NextResponse.json({ error: "Invalid notes payload" }, { status: 400 });
    }

    await saveArticleNote(articleId, notes);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/feeds/articles/[id]/notes error", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
