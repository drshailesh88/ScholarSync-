/**
 * LaTeX Comments API
 *
 * GET  /api/latex/comments?fileId=xxx - Get comments for a file
 * POST /api/latex/comments            - Create a new comment
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { latexFileComments, latexFiles, latexProjects } from "@/lib/db/schema/editor";
import { eq, and, desc } from "drizzle-orm";
import { getCurrentUserId, getCurrentUser } from "@/lib/auth";
import { nanoid } from "nanoid";

// GET /api/latex/comments?fileId=xxx&projectId=xxx
export async function GET(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    const projectId = searchParams.get("projectId");

    if (!fileId && !projectId) {
      return NextResponse.json(
        { error: "fileId or projectId is required" },
        { status: 400 }
      );
    }

    // Verify access through project ownership
    if (projectId) {
      const project = await db.query.latexProjects.findFirst({
        where: eq(latexProjects.id, projectId),
      });

      if (!project || project.userId !== userId) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    } else if (fileId) {
      const file = await db.query.latexFiles.findFirst({
        where: eq(latexFiles.id, fileId),
      });

      if (!file) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }

      // Check project ownership
      const project = await db.query.latexProjects.findFirst({
        where: eq(latexProjects.id, file.latexProjectId),
      });

      if (!project || project.userId !== userId) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    }

    // Fetch comments
    let comments;
    if (fileId) {
      comments = await db
        .select()
        .from(latexFileComments)
        .where(eq(latexFileComments.latexFileId, fileId))
        .orderBy(desc(latexFileComments.createdAt));
    } else {
      comments = await db
        .select()
        .from(latexFileComments)
        .where(eq(latexFileComments.latexProjectId, projectId!))
        .orderBy(desc(latexFileComments.createdAt));
    }

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("[GET /api/latex/comments]", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/latex/comments
export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getCurrentUser();
    const userName = user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : "Anonymous";
    const userAvatar = user?.imageUrl || null;

    const body = await req.json();
    const { fileId, projectId, lineNumber, content, parentId } = body;

    if (!fileId || !projectId || lineNumber === undefined || !content) {
      return NextResponse.json(
        { error: "fileId, projectId, lineNumber, and content are required" },
        { status: 400 }
      );
    }

    // Validate content
    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 }
      );
    }
    if (trimmedContent.length > 10000) {
      return NextResponse.json(
        { error: "Comment is too long (max 10000 characters)" },
        { status: 400 }
      );
    }

    // Verify access through project ownership
    const project = await db.query.latexProjects.findFirst({
      where: eq(latexProjects.id, projectId),
    });

    if (!project || project.userId !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Verify file exists in project
    const file = await db.query.latexFiles.findFirst({
      where: and(
        eq(latexFiles.id, fileId),
        eq(latexFiles.latexProjectId, projectId)
      ),
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // If replying, verify parent comment exists
    if (parentId) {
      const parent = await db.query.latexFileComments.findFirst({
        where: eq(latexFileComments.id, parentId),
      });
      if (!parent) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }
    }

    const commentId = nanoid(12);
    const now = new Date();

    const [comment] = await db
      .insert(latexFileComments)
      .values({
        id: commentId,
        latexFileId: fileId,
        latexProjectId: projectId,
        lineNumber,
        userId,
        userName,
        userAvatar,
        content: trimmedContent,
        parentId: parentId || null,
        resolved: false,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json({ comment });
  } catch (error) {
    console.error("[POST /api/latex/comments]", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
