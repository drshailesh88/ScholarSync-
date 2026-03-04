import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexFiles, latexFileVersions, latexProjects } from "@/lib/db/schema/editor";
import { eq, desc, and } from "drizzle-orm";

/** POST — save a new version snapshot */
export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const { fileId, description } = body;

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    // Get the file and verify ownership through project
    const [file] = await db
      .select()
      .from(latexFiles)
      .leftJoin(
        latexProjects,
        and(
          eq(latexFiles.latexProjectId, latexProjects.id),
          eq(latexProjects.userId, userId)
        )
      )
      .where(eq(latexFiles.id, fileId));

    if (!file || !file.latex_projects) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Create version snapshot
    const [version] = await db
      .insert(latexFileVersions)
      .values({
        latexFileId: fileId,
        latexProjectId: file.latex_files.latexProjectId,
        content: file.latex_files.content ?? "",
        description: description || null,
      })
      .returning();

    return NextResponse.json({
      id: version.id,
      createdAt: version.createdAt,
    });
  } catch (error) {
    console.error("Version save error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** GET — list versions for a file */
export async function GET(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    // Verify file ownership through project
    const [file] = await db
      .select()
      .from(latexFiles)
      .leftJoin(
        latexProjects,
        and(
          eq(latexFiles.latexProjectId, latexProjects.id),
          eq(latexProjects.userId, userId)
        )
      )
      .where(eq(latexFiles.id, fileId));

    if (!file || !file.latex_projects) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Get versions ordered by date (newest first)
    const versions = await db
      .select()
      .from(latexFileVersions)
      .where(eq(latexFileVersions.latexFileId, fileId))
      .orderBy(desc(latexFileVersions.createdAt));

    return NextResponse.json({ versions });
  } catch (error) {
    console.error("Version list error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
