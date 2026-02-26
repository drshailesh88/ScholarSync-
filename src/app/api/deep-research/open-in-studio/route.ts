import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  projects,
  synthesisDocuments,
  synthesisSections,
  deepResearchSessions,
} from "@/lib/db/schema";
import { getCurrentUserId } from "@/lib/auth";
import { markdownToTiptap } from "@/lib/editor/markdown-to-tiptap";

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    const body = await request.json();
    const { topic, mode, markdownReport, sources, keyFindings, gaps } = body;

    if (!topic || !markdownReport) {
      return NextResponse.json(
        { error: "Topic and markdownReport are required" },
        { status: 400 }
      );
    }

    const docTitle = `Literature Review: ${topic.length > 80 ? topic.slice(0, 77) + "..." : topic}`;

    // 1. Save the research session (best-effort — don't block if FK fails)
    try {
      await db.insert(deepResearchSessions).values({
        userId,
        originalQuery: topic,
        finalReport: markdownReport,
        keyFindings: keyFindings || [],
        gapsIdentified: gaps || [],
        researchPlan: { mode: mode || "standard", sources: sources || [] },
        status: "completed",
        papersFound: Array.isArray(sources) ? sources.length : 0,
        papersRead: Array.isArray(sources) ? sources.length : 0,
        completedAt: new Date(),
      });
    } catch (sessionErr) {
      // Non-fatal: log but continue creating the studio document
      console.warn("[open-in-studio] Could not save research session:", sessionErr);
    }

    // 2. Create a project for this research
    const [project] = await db
      .insert(projects)
      .values({
        user_id: userId,
        title: docTitle,
        project_type: "literature_review",
        description: `Deep research report on: ${topic}`,
        status: "drafting",
      })
      .returning();

    // 3. Create a document in that project
    const [doc] = await db
      .insert(synthesisDocuments)
      .values({
        project_id: project.id,
        title: docTitle,
        document_type: "review_article",
        overall_status: "drafting",
      })
      .returning();

    // 4. Convert markdown to Tiptap JSON and save as a single "custom" section
    const tiptapContent = markdownToTiptap(markdownReport);
    const plainText = markdownReport;
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;

    await db.insert(synthesisSections).values({
      document_id: doc.id,
      section_type: "custom",
      title: "Research Report",
      sort_order: 0,
      status: "draft",
      editor_content: tiptapContent as unknown as Record<string, unknown>,
      plain_text_content: plainText,
      word_count: wordCount,
    });

    return NextResponse.json({
      projectId: project.id,
      documentId: doc.id,
      redirectUrl: `/studio?projectId=${project.id}`,
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Not authenticated")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    console.error("[deep-research/open-in-studio] Error:", err);
    return NextResponse.json(
      { error: "Failed to create studio document" },
      { status: 500 }
    );
  }
}
