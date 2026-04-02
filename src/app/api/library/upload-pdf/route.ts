import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { papers, userReferences, projectPapers } from "@/lib/db/schema";
import { uploadPdf } from "@/lib/storage/r2";
import { queuePdfProcessing } from "@/lib/actions/pdf-pipeline";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    userId = await getCurrentUserId();
  } catch {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content-Type must be multipart/form-data" },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title") as string | null;
    const projectId = formData.get("projectId") as string | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are supported" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (max 50 MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Verify it's a real PDF
    if (buffer.length < 5 || buffer.subarray(0, 5).toString() !== "%PDF-") {
      return NextResponse.json({ error: "Invalid PDF file" }, { status: 400 });
    }

    const paperTitle = title || file.name.replace(/\.pdf$/i, "");

    // Create paper record with minimal metadata
    const [newPaper] = await db
      .insert(papers)
      .values({
        title: paperTitle,
        authors: [],
        source: "user_upload",
      })
      .returning();

    // Create user reference (links user to paper) — starts in inbox
    await db
      .insert(userReferences)
      .values({
        userId,
        paperId: newPaper.id,
        collection: "All Papers",
        isFavorite: false,
        workflowState: "inbox",
      })
      .onConflictDoNothing();

    // Store PDF
    const storagePath = await uploadPdf(newPaper.id, buffer);

    await db
      .update(papers)
      .set({
        pdf_storage_path: storagePath,
        full_text_available: true,
      })
      .where(eq(papers.id, newPaper.id));

    // Link to project if specified
    if (projectId) {
      const pid = parseInt(projectId, 10);
      if (!isNaN(pid)) {
        await db
          .insert(projectPapers)
          .values({
            project_id: pid,
            paper_id: newPaper.id,
            added_by: "user",
          })
          .onConflictDoNothing();
      }
    }

    // Fire-and-forget: extract text, chunk, embed
    queuePdfProcessing(newPaper.id, buffer);

    revalidatePath("/library");

    return NextResponse.json({
      success: true,
      paperId: newPaper.id,
      libraryId: `paper_${newPaper.id}`,
      title: paperTitle,
    });
  } catch (error) {
    console.error("PDF upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload PDF" },
      { status: 500 }
    );
  }
}
