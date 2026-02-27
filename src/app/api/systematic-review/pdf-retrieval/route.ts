/**
 * /api/systematic-review/pdf-retrieval
 *
 * POST — Trigger open-access PDF retrieval for one paper or a batch.
 *         If paperIds is omitted, retrieves PDFs for ALL included papers
 *         in the project that do not yet have a pdf_storage_path.
 *
 * GET  — Return retrieval status (pdf_url / pdf_storage_path presence)
 *         for every paper in a project.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { papers, projectPapers, projects } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import {
  batchRetrievePDFs,
  retrievePDF,
  type RetrievalResult,
} from "@/lib/systematic-review/pdf-retrieval";

// ---------------------------------------------------------------------------
// POST — trigger retrieval
// ---------------------------------------------------------------------------

const postSchema = z.object({
  projectId: z.number().int().positive(),
  paperIds: z.array(z.number().int().positive()).optional(),
});

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { projectId, paperIds: requestedIds } = parsed.data;

    // Verify the project belongs to the authenticated user
    const [project] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let targetIds: number[];

    if (requestedIds && requestedIds.length > 0) {
      // Validate that the requested paper IDs actually belong to this project
      const linked = await db
        .select({ paperId: projectPapers.paper_id })
        .from(projectPapers)
        .where(
          and(
            eq(projectPapers.project_id, projectId),
            inArray(projectPapers.paper_id, requestedIds)
          )
        );

      targetIds = linked.map((r) => r.paperId);

      if (targetIds.length === 0) {
        return NextResponse.json(
          { error: "None of the provided paperIds belong to this project" },
          { status: 400 }
        );
      }
    } else {
      // No paperIds provided — retrieve all included papers that have no PDF yet.
      // "Included" means screening_decision = 'included' OR status = 'included'
      // (fall back to all papers in the project if none are formally included).
      const projectPaperRows = await db
        .select({
          paperId: projectPapers.paper_id,
          pdfStoragePath: papers.pdf_storage_path,
          pdfUrl: papers.pdf_url,
        })
        .from(projectPapers)
        .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
        .where(eq(projectPapers.project_id, projectId));

      // Only process papers that do not already have a stored PDF file
      targetIds = projectPaperRows
        .filter((r) => !r.pdfStoragePath)
        .map((r) => r.paperId);

      if (targetIds.length === 0) {
        return NextResponse.json({
          message: "All papers already have PDFs",
          results: [],
          summary: { total: 0, retrieved: 0, notAvailable: 0, failed: 0 },
        });
      }
    }

    // Run single or batch retrieval
    let results: RetrievalResult[];

    if (targetIds.length === 1) {
      const single = await retrievePDF(targetIds[0]).catch(
        (err): RetrievalResult => ({
          paperId: targetIds[0],
          status: "failed",
          error: err instanceof Error ? err.message : String(err),
        })
      );
      results = [single];
    } else {
      results = await batchRetrievePDFs(targetIds);
    }

    // Build a summary
    const summary = {
      total: results.length,
      retrieved: results.filter((r) => r.status === "retrieved").length,
      notAvailable: results.filter((r) => r.status === "not_available").length,
      failed: results.filter((r) => r.status === "failed").length,
    };

    return NextResponse.json({ results, summary }, { status: 200 });
  } catch (error) {
    console.error("PDF retrieval error", error);
    return NextResponse.json(
      { error: "PDF retrieval failed" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — retrieval status for all papers in a project
// ---------------------------------------------------------------------------

export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectIdParam = searchParams.get("projectId");

    if (!projectIdParam) {
      return NextResponse.json(
        { error: "projectId query parameter is required" },
        { status: 400 }
      );
    }

    const projectId = parseInt(projectIdParam, 10);
    if (isNaN(projectId) || projectId <= 0) {
      return NextResponse.json(
        { error: "projectId must be a positive integer" },
        { status: 400 }
      );
    }

    // Verify ownership
    const [project] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.user_id, userId)))
      .limit(1);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Fetch retrieval status for every paper in the project
    const rows = await db
      .select({
        paperId: papers.id,
        title: papers.title,
        doi: papers.doi,
        pdfUrl: papers.pdf_url,
        pdfStoragePath: papers.pdf_storage_path,
        openAccessUrl: papers.open_access_url,
        openAccess: papers.open_access,
      })
      .from(projectPapers)
      .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
      .where(eq(projectPapers.project_id, projectId));

    const statuses = rows.map((row) => {
      let status: RetrievalResult["status"];

      if (row.pdfStoragePath) {
        status = "retrieved";
      } else if (row.pdfUrl) {
        status = "retrieved";
      } else {
        status = "not_attempted";
      }

      return {
        paperId: row.paperId,
        title: row.title,
        doi: row.doi,
        status,
        pdfUrl: row.pdfUrl,
        pdfStoragePath: row.pdfStoragePath,
        openAccess: row.openAccess,
      };
    });

    const summary = {
      total: statuses.length,
      retrieved: statuses.filter((s) => s.status === "retrieved").length,
      notAttempted: statuses.filter((s) => s.status === "not_attempted").length,
    };

    return NextResponse.json({ statuses, summary });
  } catch (error) {
    console.error("PDF retrieval status error", error);
    return NextResponse.json(
      { error: "Failed to fetch retrieval status" },
      { status: 500 }
    );
  }
}
