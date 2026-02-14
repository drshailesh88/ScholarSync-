import { NextResponse } from "next/server";
import { uploadPdf, getSignedPdfUrl, downloadPdf } from "@/lib/storage/gcs";
import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { queuePdfProcessing } from "@/lib/actions/pdf-pipeline";

/**
 * GET /api/papers/[id]/pdf
 * Returns a signed URL to the PDF in GCS (redirect), or streams it.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
  }

  const paperId = parseInt(id, 10);

  try {
    // Try signed URL first (browser-direct, fastest)
    const signedUrl = await getSignedPdfUrl(paperId);

    if (signedUrl) {
      return NextResponse.redirect(signedUrl);
    }

    // In local storage mode, serve the file directly
    const pdfBuffer = await downloadPdf(paperId);
    if (pdfBuffer) {
      return new Response(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="paper-${id}.pdf"`,
          "Cache-Control": "private, max-age=3600",
        },
      });
    }

    // PDF not in GCS — check if paper has a web URL we can redirect to
    const [paper] = await db
      .select({
        pdf_url: papers.pdf_url,
        open_access_url: papers.open_access_url,
      })
      .from(papers)
      .where(eq(papers.id, paperId));

    if (paper?.pdf_url) {
      return NextResponse.redirect(paper.pdf_url);
    }
    if (paper?.open_access_url) {
      return NextResponse.redirect(paper.open_access_url);
    }

    return NextResponse.json(
      { error: "PDF not found for this paper" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error serving PDF:", error);
    return NextResponse.json(
      { error: "Failed to serve PDF" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/papers/[id]/pdf
 * Stores a PDF file in GCS and triggers the processing pipeline.
 * Expects multipart/form-data with a "file" field.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
  }

  const paperId = parseInt(id, 10);

  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Store in GCS
    const gcsPath = await uploadPdf(paperId, buffer);

    // Update paper record
    await db
      .update(papers)
      .set({
        pdf_storage_path: gcsPath,
        full_text_available: true,
      })
      .where(eq(papers.id, paperId));

    // Trigger full processing pipeline in background
    queuePdfProcessing(paperId, buffer);

    return NextResponse.json({
      success: true,
      paperId: id,
      storagePath: gcsPath,
    });
  } catch (error) {
    console.error("Error storing PDF:", error);
    return NextResponse.json(
      { error: "Failed to store PDF file" },
      { status: 500 }
    );
  }
}
