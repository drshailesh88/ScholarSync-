import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const PDF_STORAGE_DIR = path.join("/tmp", "scholarsync-pdfs");

/**
 * GET /api/papers/[id]/pdf
 * Serves a stored PDF file for a given paper ID.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid paper ID" }, { status: 400 });
  }

  const filePath = path.join(PDF_STORAGE_DIR, `${id}.pdf`);

  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: "PDF not found for this paper" },
      { status: 404 }
    );
  }

  try {
    const fileBuffer = await readFile(filePath);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="paper-${id}.pdf"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error reading PDF file:", error);
    return NextResponse.json(
      { error: "Failed to read PDF file" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/papers/[id]/pdf
 * Stores a PDF file for a given paper ID.
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

    // Ensure storage directory exists
    if (!existsSync(PDF_STORAGE_DIR)) {
      await mkdir(PDF_STORAGE_DIR, { recursive: true });
    }

    const arrayBuffer = await file.arrayBuffer();
    const filePath = path.join(PDF_STORAGE_DIR, `${id}.pdf`);
    await writeFile(filePath, Buffer.from(arrayBuffer));

    return NextResponse.json({ success: true, paperId: id });
  } catch (error) {
    console.error("Error storing PDF file:", error);
    return NextResponse.json(
      { error: "Failed to store PDF file" },
      { status: 500 }
    );
  }
}
