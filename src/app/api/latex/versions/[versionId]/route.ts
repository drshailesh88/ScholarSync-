import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexFileVersions, latexProjects } from "@/lib/db/schema/editor";
import { eq, and } from "drizzle-orm";

/** GET — get a specific version's content */
export async function GET(
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

    return NextResponse.json({
      id: version.latex_file_versions.id,
      content: version.latex_file_versions.content,
      description: version.latex_file_versions.description,
      createdAt: version.latex_file_versions.createdAt,
    });
  } catch (error) {
    console.error("Version get error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE — delete a version */
export async function DELETE(
  req: Request,
  { params }: { params: { versionId: string } }
) {
  try {
    const userId = await getCurrentUserId();
    const { versionId } = params;

    if (!versionId) {
      return NextResponse.json({ error: "Missing versionId" }, { status: 400 });
    }

    // Verify access through project
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

    await db.delete(latexFileVersions).where(eq(latexFileVersions.id, versionId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Version delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
