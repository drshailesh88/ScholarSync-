import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deepResearchSessions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    const sessions = await db
      .select({
        id: deepResearchSessions.id,
        topic: deepResearchSessions.originalQuery,
        status: deepResearchSessions.status,
        papersFound: deepResearchSessions.papersFound,
        startedAt: deepResearchSessions.startedAt,
        completedAt: deepResearchSessions.completedAt,
        researchPlan: deepResearchSessions.researchPlan,
      })
      .from(deepResearchSessions)
      .where(eq(deepResearchSessions.userId, userId))
      .orderBy(desc(deepResearchSessions.completedAt))
      .limit(20);

    // Extract mode from researchPlan JSON, avoid sending full sources in listing
    const results = sessions.map((s) => ({
      id: s.id,
      topic: s.topic,
      status: s.status,
      papersFound: s.papersFound,
      mode: (s.researchPlan as { mode?: string })?.mode || "standard",
      completedAt: s.completedAt?.toISOString() || s.startedAt?.toISOString(),
    }));

    return NextResponse.json({ sessions: results });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Not authenticated")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("[deep-research/sessions] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
