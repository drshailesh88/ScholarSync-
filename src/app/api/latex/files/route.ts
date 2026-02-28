import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { latexFiles, latexProjects } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

const createFileSchema = z.object({
  projectId: z.string().uuid(),
  path: z.string().min(1).max(255),
  content: z.string().max(500000).optional(),
  isMain: z.boolean().optional(),
});

const updateFileSchema = z.object({
  fileId: z.string().uuid(),
  path: z.string().min(1).max(255).optional(),
  content: z.string().max(500000).optional(),
  isMain: z.boolean().optional(),
});

const deleteFileSchema = z.object({
  fileId: z.string().uuid(),
});

/** POST — create a new file in a project */
export async function POST(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = createFileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { projectId, path, content, isMain } = parsed.data;

    // Verify project ownership
    const [project] = await db
      .select({ id: latexProjects.id })
      .from(latexProjects)
      .where(and(eq(latexProjects.id, projectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const [file] = await db
      .insert(latexFiles)
      .values({
        latexProjectId: projectId,
        path,
        content: content ?? "",
        isMain: isMain ?? false,
      })
      .returning();

    // Touch project updatedAt
    await db
      .update(latexProjects)
      .set({ updatedAt: new Date() })
      .where(eq(latexProjects.id, projectId));

    return NextResponse.json(file);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** PATCH — update a file (rename, content change) */
export async function PATCH(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = updateFileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { fileId, ...updates } = parsed.data;

    // Get file and verify ownership via project
    const [file] = await db
      .select({ id: latexFiles.id, latexProjectId: latexFiles.latexProjectId })
      .from(latexFiles)
      .where(eq(latexFiles.id, fileId));

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const [project] = await db
      .select({ id: latexProjects.id })
      .from(latexProjects)
      .where(and(eq(latexProjects.id, file.latexProjectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const [updated] = await db
      .update(latexFiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(latexFiles.id, fileId))
      .returning();

    // Touch project updatedAt
    await db
      .update(latexProjects)
      .set({ updatedAt: new Date() })
      .where(eq(latexProjects.id, file.latexProjectId));

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** DELETE — remove a file from a project */
export async function DELETE(req: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await req.json();
    const parsed = deleteFileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { fileId } = parsed.data;

    // Get file and verify ownership
    const [file] = await db
      .select({ id: latexFiles.id, latexProjectId: latexFiles.latexProjectId, isMain: latexFiles.isMain })
      .from(latexFiles)
      .where(eq(latexFiles.id, fileId));

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Don't allow deleting main file
    if (file.isMain) {
      return NextResponse.json({ error: "Cannot delete the main file" }, { status: 400 });
    }

    const [project] = await db
      .select({ id: latexProjects.id })
      .from(latexProjects)
      .where(and(eq(latexProjects.id, file.latexProjectId), eq(latexProjects.userId, userId)));

    if (!project) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db
      .delete(latexFiles)
      .where(eq(latexFiles.id, fileId));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
