import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  users,
  projects,
  synthesisDocuments,
  synthesisSections,
  deepResearchSessions,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { markdownToTiptap, type SourceReference } from "@/lib/editor/markdown-to-tiptap";

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

    // Ensure the user exists in the DB (required for FK constraints).
    // In dev mode the auth fallback returns a synthetic ID that may not be seeded yet.
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, userId));

    if (!existingUser) {
      await db.insert(users).values({
        id: userId,
        email: `${userId}@dev.local`,
        full_name: "Dev User",
      }).onConflictDoNothing();
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

    // 4. Append a formatted References section to the markdown
    let fullMarkdown = markdownReport;
    if (Array.isArray(sources) && sources.length > 0) {
      const refLines = sources.map((src: Record<string, unknown>, idx: number) => {
        const authors = Array.isArray(src.authors)
          ? (src.authors as string[]).length > 3
            ? `${(src.authors as string[]).slice(0, 3).join(", ")} et al.`
            : (src.authors as string[]).join(", ")
          : "";
        const title = src.title || "Untitled";
        const journal = src.journal || "";
        const year = src.year || "";
        const doi = src.doi ? `DOI: ${src.doi}` : "";
        const parts = [authors, `${title}.`, journal, year ? `(${year})` : "", doi]
          .filter(Boolean)
          .join(" ");
        return `${idx + 1}. ${parts}`;
      });
      fullMarkdown += `\n\n## References\n\n${refLines.join("\n")}`;
    }

    // 5. Convert markdown to Tiptap JSON and save as a single "custom" section
    //    Pass sources so citation markers [N] become DOI/PubMed hyperlinks
    const sourceRefs: SourceReference[] = Array.isArray(sources)
      ? sources.map((s: Record<string, unknown>) => ({
          doi: (s.doi as string) || undefined,
          pmid: (s.pmid as string) || undefined,
          title: (s.title as string) || undefined,
        }))
      : [];
    const tiptapContent = markdownToTiptap(fullMarkdown, sourceRefs);
    const plainText = fullMarkdown;
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
