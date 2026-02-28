/**
 * /api/systematic-review/export-references
 *
 * GET — Export project papers as RIS, BibTeX, EndNote XML, or CSV
 */

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { papers, projectPapers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  generateRIS,
  generateBibTeX,
  generateEndNoteXML,
  generateCSV,
  type ExportablePaper,
} from "@/lib/systematic-review/reference-formats";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

// ---------------------------------------------------------------------------
// GET
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = parseInt(searchParams.get("projectId") || "0", 10);
    const format = searchParams.get("format") || "ris";
    const filter = searchParams.get("filter") || "all"; // all | included | excluded

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }

    // Verify project access (owner or collaborator)
    const access = await verifyProjectAccess(projectId, userId);
    if (!access.allowed) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Fetch project papers
    let rows = await db
      .select({
        title: papers.title,
        authors: papers.authors,
        journal: papers.journal,
        year: papers.year,
        doi: papers.doi,
        pmid: papers.pubmed_id,
        volume: papers.volume,
        issue: papers.issue,
        pages: papers.pages,
        abstract: papers.abstract,
        screeningDecision: projectPapers.screening_decision,
      })
      .from(projectPapers)
      .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
      .where(eq(projectPapers.project_id, projectId));

    // Apply filter
    if (filter === "included") {
      rows = rows.filter((r) => r.screeningDecision === "include");
    } else if (filter === "excluded") {
      rows = rows.filter((r) => r.screeningDecision === "exclude");
    }

    const exportPapers: ExportablePaper[] = rows.map((r) => ({
      title: r.title,
      authors: r.authors as string[],
      journal: r.journal || undefined,
      year: r.year || undefined,
      doi: r.doi || undefined,
      pmid: r.pmid || undefined,
      volume: r.volume || undefined,
      issue: r.issue || undefined,
      pages: r.pages || undefined,
      abstract: r.abstract || undefined,
    }));

    let output: string;
    let contentType: string;
    let filename: string;

    switch (format) {
      case "bibtex":
        output = generateBibTeX(exportPapers);
        contentType = "application/x-bibtex";
        filename = "references.bib";
        break;
      case "endnote":
        output = generateEndNoteXML(exportPapers);
        contentType = "application/xml";
        filename = "references.xml";
        break;
      case "csv":
        output = generateCSV(exportPapers);
        contentType = "text/csv";
        filename = "references.csv";
        break;
      case "ris":
      default:
        output = generateRIS(exportPapers);
        contentType = "application/x-research-info-systems";
        filename = "references.ris";
        break;
    }

    return new Response(output, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (error) {
    console.error("Export references error", error);
    return NextResponse.json(
      { error: "Failed to export references" },
      { status: 500 }
    );
  }
}
