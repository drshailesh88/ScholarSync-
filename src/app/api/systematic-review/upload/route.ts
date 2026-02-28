/**
 * /api/systematic-review/upload
 *
 * POST — Upload a PDF file to a systematic review project
 */

import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { papers, projectPapers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { uploadPdf } from "@/lib/storage/gcs";
import { verifyProjectAccess } from "@/lib/systematic-review/collaboration";

export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const formData = await req.formData();

    const projectId = parseInt(formData.get("projectId") as string, 10);
    const file = formData.get("file") as File | null;

    if (!projectId || isNaN(projectId)) {
      return NextResponse.json(
        { error: "projectId is required" },
        { status: 400 }
      );
    }
    if (!file || file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "A PDF file is required" },
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

    // Create a paper record with filename as title (will be enriched later)
    const title = file.name.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");
    const [newPaper] = await db
      .insert(papers)
      .values({
        title,
        authors: [],
        source: "user_upload",
        full_text_available: true,
      })
      .returning();

    // Upload PDF to storage
    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate PDF magic bytes (%PDF-)
    const PDF_MAGIC = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d]); // %PDF-
    if (buffer.length < 5 || !buffer.subarray(0, 5).equals(PDF_MAGIC)) {
      return NextResponse.json(
        { error: "Invalid PDF file" },
        { status: 400 }
      );
    }

    const storagePath = await uploadPdf(newPaper.id, buffer);

    // Update paper with storage path
    await db
      .update(papers)
      .set({ pdf_storage_path: storagePath })
      .where(eq(papers.id, newPaper.id));

    // Link to project
    await db
      .insert(projectPapers)
      .values({
        project_id: projectId,
        paper_id: newPaper.id,
        added_by: "user",
        status: "saved",
      })
      .onConflictDoNothing();

    // Trigger PDF processing pipeline in background
    import("@/lib/actions/pdf-pipeline")
      .then(({ processPdfPipeline }) => {
        processPdfPipeline(newPaper.id, buffer).catch((err: unknown) => {
          console.error("PDF pipeline failed:", err);
        });
      })
      .catch((err: unknown) => {
        console.error("Failed to load PDF pipeline:", err);
      });

    return NextResponse.json(
      {
        paperId: newPaper.id,
        title,
        storagePath,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SR PDF upload error", error);
    return NextResponse.json(
      { error: "Failed to upload PDF" },
      { status: 500 }
    );
  }
}
