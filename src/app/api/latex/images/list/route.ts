import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexProjects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { listLatexImages } from "@/lib/storage/r2";

/** GET — list all images for a project */
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
    }

    // Verify project ownership
    const [project] = await db
      .select()
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const storageKeys = await listLatexImages(projectId);

    // Transform storage keys to image items
    const images = storageKeys.map((key) => {
      const parts = key.split("/");
      const id = parts[2];
      const filename = parts[3];
      const ext = filename.split(".").pop()?.toLowerCase() || "";
      const contentType =
        ext === "pdf"
          ? "application/pdf"
          : ext === "png"
            ? "image/png"
            : "image/jpeg";

      return {
        id,
        filename,
        storageKey: key,
        contentType,
        url: `/api/latex/images?storageKey=${encodeURIComponent(key)}`,
      };
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("LaTeX image list error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
