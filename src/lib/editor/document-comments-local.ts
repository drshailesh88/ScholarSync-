/**
 * Client-side document comment storage
 * Stores comments in localStorage alongside document content
 * Will be migrated to DB-backed storage post-deployment
 */

import type { DocumentComment, DocumentCommentThread } from "@/lib/actions/document-comments";

const STORAGE_PREFIX = "scholarsync_comments_";

function getStorageKey(documentId: string): string {
  return `${STORAGE_PREFIX}${documentId}`;
}

function generateId(): string {
  return `cmt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

export function getDocumentCommentsLocal(
  documentId: string
): DocumentCommentThread[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(getStorageKey(documentId));
    if (!raw) return [];

    const allComments: DocumentComment[] = JSON.parse(raw);

    // Build threads: top-level comments with their replies
    const topLevel = allComments.filter((c) => !c.parentCommentId);
    const threads: DocumentCommentThread[] = topLevel.map((comment) => ({
      comment,
      replies: allComments
        .filter((c) => c.parentCommentId === comment.id)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
    }));

    // Sort threads: unresolved first, then by date descending
    threads.sort((a, b) => {
      if (a.comment.isResolved !== b.comment.isResolved) {
        return a.comment.isResolved ? 1 : -1;
      }
      return (
        new Date(b.comment.createdAt).getTime() -
        new Date(a.comment.createdAt).getTime()
      );
    });

    return threads;
  } catch {
    return [];
  }
}

export function addDocumentCommentLocal(
  documentId: string,
  params: {
    content: string;
    textRangeStart?: number;
    textRangeEnd?: number;
    quotedText?: string;
    parentCommentId?: string;
    userName?: string;
  }
): DocumentComment {
  if (typeof window === "undefined") {
    throw new Error("localStorage is not available on the server");
  }

  const allComments = getAllCommentsRaw(documentId);

  const newComment: DocumentComment = {
    id: generateId(),
    documentId,
    userId: "local-user",
    userName: params.userName || "You",
    textRangeStart: params.textRangeStart ?? null,
    textRangeEnd: params.textRangeEnd ?? null,
    quotedText: params.quotedText ?? null,
    content: params.content,
    parentCommentId: params.parentCommentId ?? null,
    isResolved: false,
    createdAt: new Date().toISOString(),
  };

  allComments.push(newComment);
  saveAllComments(documentId, allComments);

  return newComment;
}

export function resolveDocumentCommentLocal(
  documentId: string,
  commentId: string
): void {
  if (typeof window === "undefined") return;

  const allComments = getAllCommentsRaw(documentId);
  const comment = allComments.find((c) => c.id === commentId);
  if (comment) {
    comment.isResolved = true;
    saveAllComments(documentId, allComments);
  }
}

export function unresolveDocumentCommentLocal(
  documentId: string,
  commentId: string
): void {
  if (typeof window === "undefined") return;

  const allComments = getAllCommentsRaw(documentId);
  const comment = allComments.find((c) => c.id === commentId);
  if (comment) {
    comment.isResolved = false;
    saveAllComments(documentId, allComments);
  }
}

export function deleteDocumentCommentLocal(
  documentId: string,
  commentId: string
): void {
  if (typeof window === "undefined") return;

  let allComments = getAllCommentsRaw(documentId);
  // Delete the comment and all its replies
  allComments = allComments.filter(
    (c) => c.id !== commentId && c.parentCommentId !== commentId
  );
  saveAllComments(documentId, allComments);
}

export function getCommentCountLocal(documentId: string): {
  total: number;
  unresolved: number;
} {
  if (typeof window === "undefined") {
    return { total: 0, unresolved: 0 };
  }

  const allComments = getAllCommentsRaw(documentId);
  const topLevel = allComments.filter((c) => !c.parentCommentId);
  return {
    total: topLevel.length,
    unresolved: topLevel.filter((c) => !c.isResolved).length,
  };
}

// --- Internal helpers ---

function getAllCommentsRaw(documentId: string): DocumentComment[] {
  try {
    const raw = localStorage.getItem(getStorageKey(documentId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAllComments(
  documentId: string,
  comments: DocumentComment[]
): void {
  localStorage.setItem(getStorageKey(documentId), JSON.stringify(comments));
}
