/**
 * /api/systematic-review/import-references
 *
 * POST — Import papers from RIS or BibTeX file content
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { papers, projectPapers, projects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  parseReferences,
  type ParsedReference,
} from "@/lib/systematic-review/reference-formats";
import { normalizeTitle } from "@/lib/search/dedup";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const importSchema = z.object({
  projectId: z.number().int().positive(),
  content: z.string().min(10).max(5_000_000),
  format: z.enum(["ris", "bibtex", "auto"]).default("auto"),
});

// ---------------------------------------------------------------------------
// POST
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = importSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, content } = parsed.data;

    // Verify project ownership
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Parse references
    const { format: detectedFormat, references } = parseReferences(content);

    if (references.length === 0) {
      return NextResponse.json(
        { error: "No valid references found in the file" },
        { status: 400 }
      );
    }

    // Get existing project papers
    const existingPPs = await db
      .select({ paperId: projectPapers.paper_id })
      .from(projectPapers)
      .where(eq(projectPapers.project_id, projectId));
    const existingPaperIds = new Set(existingPPs.map((pp) => pp.paperId));

    // Import each reference
    let imported = 0;
    let duplicatesSkipped = 0;

    for (const ref of references) {
      const paperId = await findOrCreateFromReference(ref);

      if (existingPaperIds.has(paperId)) {
        duplicatesSkipped++;
        continue;
      }

      await db
        .insert(projectPapers)
        .values({
          project_id: projectId,
          paper_id: paperId,
          added_by: "user",
          status: "saved",
        })
        .onConflictDoNothing();

      existingPaperIds.add(paperId);
      imported++;
    }

    return NextResponse.json({
      format: detectedFormat,
      totalParsed: references.length,
      imported,
      duplicatesSkipped,
    });
  } catch (error) {
    console.error("Import references error", error);
    return NextResponse.json(
      { error: "Failed to import references" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Helper: find or create paper from parsed reference
// ---------------------------------------------------------------------------

async function findOrCreateFromReference(
  ref: ParsedReference
): Promise<number> {
  // Check by DOI
  if (ref.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, ref.doi));
    if (existing) return existing.id;
  }

  // Check by PMID
  if (ref.pmid) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.pubmed_id, ref.pmid));
    if (existing) return existing.id;
  }

  // Check by title + year
  if (ref.title && ref.year) {
    const normalized = normalizeTitle(ref.title);
    const candidates = await db
      .select({ id: papers.id, title: papers.title })
      .from(papers)
      .where(eq(papers.year, ref.year))
      .limit(100);

    for (const c of candidates) {
      if (normalizeTitle(c.title) === normalized) return c.id;
    }
  }

  // Create new
  const [newPaper] = await db
    .insert(papers)
    .values({
      title: ref.title,
      authors: ref.authors || [],
      journal: ref.journal,
      year: ref.year || 0,
      doi: ref.doi || undefined,
      pubmed_id: ref.pmid || undefined,
      volume: ref.volume || undefined,
      issue: ref.issue || undefined,
      pages: ref.pages || undefined,
      abstract: ref.abstract,
      source: "user_upload",
      citation_count: 0,
    })
    .returning();

  return newPaper.id;
}
