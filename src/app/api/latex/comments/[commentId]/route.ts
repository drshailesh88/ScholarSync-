/**
 * LaTeX Comment API
 *
 * GET    /api/latex/comments/[commentId] - Get a single comment
 * PATCH  /api/latex/comments/[commentId] - Update comment (content or resolved)
 * DELETE /api/latex/comments/[commentId] - Delete a comment
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { latexFileComments, latexProjects } from "@/lib/db/schema/editor";
import { eq } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ commentId: string }>;
}

// GET /api/latex/comments/[commentId]
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId } = await params;

    const comment = await db.query.latexFileComments.findFirst({
      where: eq(latexFileComments.id, commentId),
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Verify access through project ownership
    const project = await db.query.latexProjects.findFirst({
      where: eq(latexProjects.id, comment.latexProjectId),
    });

    if (!project || project.userId !== userId) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ comment });
  } catch (error) {
    console.error("[GET /api/latex/comments/[commentId]]", error);
    return NextResponse.json(
      { error: "Failed to fetch comment" },
      { status: 500 }
    );
  }
}

// PATCH /api/latex/comments/[commentId]
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId } = await params;
    const body = await req.json();
    const { content, resolved } = body;

    const comment = await db.query.latexFileComments.findFirst({
      where: eq(latexFileComments.id, commentId),
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Verify access through project ownership
    const project = await db.query.latexProjects.findFirst({
      where: eq(latexProjects.id, comment.latexProjectId),
    });

    if (!project) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // For content updates, only author can edit
    if (content !== undefined && comment.userId !== userId) {
      return NextResponse.json(
        { error: "Only the author can edit this comment" },
        { status: 403 }
      );
    }

    // For resolve/unresolve, project owner can do it
    const isProjectOwner = project.userId === userId;

    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (content !== undefined) {
      const trimmedContent = content.trim();
      if (trimmedContent.length === 0) {
        return NextResponse.json(
          { error: "Comment cannot be empty" },
          { status: 400 }
        );
      }
      if (trimmedContent.length > 10000) {
        return NextResponse.json(
          { error: "Comment is too long" },
          { status: 400 }
        );
      }
      updates.content = trimmedContent;
    }

    if (resolved !== undefined) {
      if (!isProjectOwner) {
        return NextResponse.json(
          { error: "Only project owner can resolve comments" },
          { status: 403 }
        );
      }
      updates.resolved = resolved;
      if (resolved) {
        updates.resolvedAt = new Date();
        updates.resolvedBy = userId;
      } else {
        updates.resolvedAt = null;
        updates.resolvedBy = null;
      }
    }

    const [updated] = await db
      .update(latexFileComments)
      .set(updates)
      .where(eq(latexFileComments.id, commentId))
      .returning();

    return NextResponse.json({ comment: updated });
  } catch (error) {
    console.error("[PATCH /api/latex/comments/[commentId]]", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// DELETE /api/latex/comments/[commentId]
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId } = await params;

    const comment = await db.query.latexFileComments.findFirst({
      where: eq(latexFileComments.id, commentId),
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Verify access through project ownership
    const project = await db.query.latexProjects.findFirst({
      where: eq(latexProjects.id, comment.latexProjectId),
    });

    if (!project) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const isProjectOwner = project.userId === userId;
    const isAuthor = comment.userId === userId;

    // Only author or project owner can delete
    if (!isAuthor && !isProjectOwner) {
      return NextResponse.json(
        { error: "Only the author or project owner can delete this comment" },
        { status: 403 }
      );
    }

    // Delete replies first (cascade should handle this, but be explicit)
    await db
      .delete(latexFileComments)
      .where(eq(latexFileComments.parentId, commentId));

    // Delete the comment
    await db
      .delete(latexFileComments)
      .where(eq(latexFileComments.id, commentId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/latex/comments/[commentId]]", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
