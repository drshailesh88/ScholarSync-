"use server";

// =============================================================================
// Document Comment Types
// =============================================================================

export interface DocumentComment {
  id: string;
  documentId: string;
  userId: string;
  userName: string;
  /** Character offset range in the document (for inline comments) */
  textRangeStart: number | null;
  textRangeEnd: number | null;
  /** The exact text that was highlighted when comment was created */
  quotedText: string | null;
  content: string;
  parentCommentId: string | null;
  isResolved: boolean;
  createdAt: string; // ISO string
  replies?: DocumentComment[];
}

export interface DocumentCommentThread {
  comment: DocumentComment;
  replies: DocumentComment[];
}

// =============================================================================
// Client-side storage (localStorage)
// Used while documents are localStorage-based
// =============================================================================

const STORAGE_PREFIX = "scholarsync_comments_";

export async function getDocumentComments(
  documentId: string
): Promise<DocumentCommentThread[]> {
  // This is a "server action" that actually reads from the client
  // In production, this will query the documentComments table
  // For now, throw to indicate client should use local functions
  throw new Error("Use client-side getDocumentCommentsLocal() instead");
}

// =============================================================================
// DB-backed actions (for when documents are persisted)
// These are stubs that will be wired up post-deployment
// =============================================================================

export async function addDocumentCommentDB(params: {
  sectionId: number;
  content: string;
  textRangeStart?: number;
  textRangeEnd?: number;
  parentCommentId?: number;
}): Promise<{ id: number } | null> {
  // TODO: Wire to documentComments table after deployment
  // const userId = await getCurrentUserId();
  // const [comment] = await db.insert(documentComments).values({ ... }).returning();
  return null;
}
