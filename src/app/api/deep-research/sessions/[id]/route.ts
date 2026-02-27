import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deepResearchSessions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    const { id } = await params;
    const sessionId = parseInt(id, 10);

    if (isNaN(sessionId)) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 });
    }

    const [session] = await db
      .select()
      .from(deepResearchSessions)
      .where(
        and(
          eq(deepResearchSessions.id, sessionId),
          eq(deepResearchSessions.userId, userId)
        )
      )
      .limit(1);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const plan = session.researchPlan as { mode?: string; sources?: unknown[] } | null;

    return NextResponse.json({
      id: session.id,
      topic: session.originalQuery,
      mode: plan?.mode || "standard",
      markdownReport: session.finalReport || "",
      sources: plan?.sources || [],
      keyFindings: session.keyFindings || [],
      gaps: session.gapsIdentified || [],
      papersFound: session.papersFound,
      completedAt: session.completedAt?.toISOString(),
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Not authenticated")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("[deep-research/sessions/[id]] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
