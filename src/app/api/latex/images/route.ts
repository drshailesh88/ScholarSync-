import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexProjects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  uploadLatexImage,
  downloadLatexImage,
  deleteLatexImage,
  LATEX_IMAGE_TYPES,
} from "@/lib/storage/r2";

/** POST — upload an image for a LaTeX project */
export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const formData = await req.formData();

    const projectId = formData.get("projectId") as string;
    const file = formData.get("file") as File | null;

    if (!projectId || !file) {
      return NextResponse.json(
        { error: "Missing projectId or file" },
        { status: 400 }
      );
    }

    // Validate file type - normalize jpeg to jpg
    const contentType = file.type === "image/jpeg" ? "image/jpg" as const : file.type as typeof LATEX_IMAGE_TYPES[number];
    if (!LATEX_IMAGE_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: `Invalid file type. Supported: ${LATEX_IMAGE_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // Max 10MB per image
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB" },
        { status: 400 }
      );
    }

    // Verify project ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Upload to R2
    const buffer = Buffer.from(await file.arrayBuffer());
    const { storageKey, id } = await uploadLatexImage(
      projectId,
      file.name,
      buffer,
      contentType
    );

    return NextResponse.json({
      id,
      filename: file.name,
      storageKey,
      sizeBytes: file.size,
      contentType: file.type,
      url: `/api/latex/images?storageKey=${encodeURIComponent(storageKey)}`,
    });
  } catch (error) {
    console.error("LaTeX image upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** GET — download an image */
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const storageKey = searchParams.get("storageKey");

    if (!storageKey) {
      return NextResponse.json({ error: "Missing storageKey" }, { status: 400 });
    }

    // Extract projectId from storageKey: "latex-images/{projectId}/{id}/{filename}"
    const parts = storageKey.split("/");
    if (parts.length < 4 || parts[0] !== "latex-images") {
      return NextResponse.json({ error: "Invalid storage key" }, { status: 400 });
    }

    const projectId = parts[1];

    // Verify project ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const buffer = await downloadLatexImage(storageKey);
    if (!buffer) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Determine content type from extension
    const ext = storageKey.split(".").pop()?.toLowerCase();
    const contentType =
      ext === "pdf"
        ? "application/pdf"
        : ext === "png"
          ? "image/png"
          : ext === "jpg" || ext === "jpeg"
            ? "image/jpeg"
            : "application/octet-stream";

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("LaTeX image download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE — remove an image */
export async function DELETE(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const storageKey = searchParams.get("storageKey");

    if (!storageKey) {
      return NextResponse.json({ error: "Missing storageKey" }, { status: 400 });
    }

    // Extract projectId from storageKey
    const parts = storageKey.split("/");
    if (parts.length < 4 || parts[0] !== "latex-images") {
      return NextResponse.json({ error: "Invalid storage key" }, { status: 400 });
    }

    const projectId = parts[1];

    // Verify project ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await deleteLatexImage(storageKey);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LaTeX image delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
