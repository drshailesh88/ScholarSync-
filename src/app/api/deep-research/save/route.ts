import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deepResearchSessions } from "@/lib/db/schema";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    const body = await request.json();
    const { topic, mode, markdownReport, sources, keyFindings, gaps } = body;

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const [session] = await db
      .insert(deepResearchSessions)
      .values({
        userId,
        originalQuery: topic,
        finalReport: markdownReport || "",
        keyFindings: keyFindings || [],
        gapsIdentified: gaps || [],
        researchPlan: { mode: mode || "standard", sources: sources || [] },
        status: "completed",
        papersFound: Array.isArray(sources) ? sources.length : 0,
        papersRead: Array.isArray(sources) ? sources.length : 0,
        completedAt: new Date(),
      })
      .returning({ id: deepResearchSessions.id });

    return NextResponse.json({ id: session.id, success: true });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Not authenticated")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("[deep-research/save] Error:", err);
    return NextResponse.json(
      { error: "Failed to save research session" },
      { status: 500 }
    );
  }
}
