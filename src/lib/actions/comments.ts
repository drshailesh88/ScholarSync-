"use server";

import { db } from "@/lib/db";
import { slideComments } from "@/lib/db/schema";
import { eq, and, asc, desc, isNull } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CommentWithReplies {
  id: string;
  slideId: number;
  deckId: number;
  userId: string;
  userName: string | null;
  userAvatar: string | null;
  content: string;
  parentId: string | null;
  resolved: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  replies: CommentWithReplies[];
}

export interface CommentsBySlide {
  [slideId: string]: CommentWithReplies[];
}

// ---------------------------------------------------------------------------
// addComment
// ---------------------------------------------------------------------------

export async function addComment(
  slideId: number,
  deckId: number,
  content: string,
  parentId?: string
) {
  const userId = await getCurrentUserId();

  // Try to get user name from Clerk
  let userName = "User";
  let userAvatar: string | null = null;
  try {
    const { currentUser } = await import("@clerk/nextjs/server");
    const user = await currentUser();
    if (user) {
      userName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName ?? user.emailAddresses?.[0]?.emailAddress ?? "User";
      userAvatar = user.imageUrl ?? null;
    }
  } catch {
    // Dev mode or Clerk not configured
  }

  const [comment] = await db
    .insert(slideComments)
    .values({
      slideId,
      deckId,
      userId,
      userName,
      userAvatar,
      content,
      parentId: parentId ?? null,
    })
    .returning();

  return comment;
}

// ---------------------------------------------------------------------------
// getComments — all comments for a deck, grouped by slideId
// ---------------------------------------------------------------------------

export async function getComments(deckId: number): Promise<CommentsBySlide> {
  const rows = await db
    .select()
    .from(slideComments)
    .where(eq(slideComments.deckId, deckId))
    .orderBy(asc(slideComments.createdAt));

  // Build tree: separate top-level from replies
  const byId = new Map<string, CommentWithReplies>();
  const topLevel: CommentWithReplies[] = [];

  for (const row of rows) {
    const node: CommentWithReplies = {
      ...row,
      replies: [],
    };
    byId.set(row.id, node);
  }

  for (const node of byId.values()) {
    if (node.parentId && byId.has(node.parentId)) {
      byId.get(node.parentId)!.replies.push(node);
    } else {
      topLevel.push(node);
    }
  }

  // Group by slideId
  const grouped: CommentsBySlide = {};
  for (const comment of topLevel) {
    const key = String(comment.slideId);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(comment);
  }

  return grouped;
}

// ---------------------------------------------------------------------------
// getSlideComments — comments + replies for a specific slide
// ---------------------------------------------------------------------------

export async function getSlideComments(
  slideId: number
): Promise<CommentWithReplies[]> {
  const rows = await db
    .select()
    .from(slideComments)
    .where(eq(slideComments.slideId, slideId))
    .orderBy(asc(slideComments.createdAt));

  const byId = new Map<string, CommentWithReplies>();
  const topLevel: CommentWithReplies[] = [];

  for (const row of rows) {
    const node: CommentWithReplies = {
      ...row,
      replies: [],
    };
    byId.set(row.id, node);
  }

  for (const node of byId.values()) {
    if (node.parentId && byId.has(node.parentId)) {
      byId.get(node.parentId)!.replies.push(node);
    } else {
      topLevel.push(node);
    }
  }

  return topLevel;
}

// ---------------------------------------------------------------------------
// resolveComment
// ---------------------------------------------------------------------------

export async function resolveComment(commentId: string) {
  await getCurrentUserId(); // ensure authenticated

  const [updated] = await db
    .update(slideComments)
    .set({ resolved: true, updatedAt: new Date() })
    .where(eq(slideComments.id, commentId))
    .returning();

  return updated;
}

// ---------------------------------------------------------------------------
// unresolveComment
// ---------------------------------------------------------------------------

export async function unresolveComment(commentId: string) {
  await getCurrentUserId();

  const [updated] = await db
    .update(slideComments)
    .set({ resolved: false, updatedAt: new Date() })
    .where(eq(slideComments.id, commentId))
    .returning();

  return updated;
}

// ---------------------------------------------------------------------------
// deleteComment — only by owner
// ---------------------------------------------------------------------------

export async function deleteComment(commentId: string) {
  const userId = await getCurrentUserId();

  // Verify ownership
  const [comment] = await db
    .select({ userId: slideComments.userId })
    .from(slideComments)
    .where(eq(slideComments.id, commentId))
    .limit(1);

  if (!comment || comment.userId !== userId) {
    throw new Error("Not authorized to delete this comment");
  }

  // Delete the comment (and its replies via cascade would need app-level handling
  // since parentId is not a FK). Delete replies first.
  await db
    .delete(slideComments)
    .where(eq(slideComments.parentId, commentId));

  await db
    .delete(slideComments)
    .where(eq(slideComments.id, commentId));

  return { deleted: true };
}
