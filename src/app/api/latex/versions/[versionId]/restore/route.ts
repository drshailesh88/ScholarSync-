import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexFileVersions, latexFiles, latexProjects } from "@/lib/db/schema/editor";
import { eq, and } from "drizzle-orm";

/** POST — restore a version's content to the current file */
export async function POST(
  req: Request,
  { params }: { params: { versionId: string } }
) {
  try {
    const userId = await getCurrentUserId();
    const { versionId } = params;

    if (!versionId) {
      return NextResponse.json({ error: "Missing versionId" }, { status: 400 });
    }

    // Get version and verify access through project
    const [version] = await db
      .select()
      .from(latexFileVersions)
      .leftJoin(
        latexProjects,
        and(
          eq(latexFileVersions.latexProjectId, latexProjects.id),
          eq(latexProjects.userId, userId)
        )
      )
      .where(eq(latexFileVersions.id, versionId));

    if (!version || !version.latex_projects) {
      return NextResponse.json({ error: "Version not found" }, { status: 404 });
    }

    // Update the current file with the version's content
    const [updatedFile] = await db
      .update(latexFiles)
      .set({
        content: version.latex_file_versions.content,
        updatedAt: new Date(),
      })
      .where(eq(latexFiles.id, version.latex_file_versions.latexFileId))
      .returning();

    return NextResponse.json({
      success: true,
      fileId: updatedFile.id,
      restoredAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Version restore error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
