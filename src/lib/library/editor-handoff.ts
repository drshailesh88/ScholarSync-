"use server";

/**
 * Editor Handoff Service — Server-backed citation transport between Library and Editor.
 *
 * Replaces the sessionStorage bridge with a durable handoff lifecycle:
 *   Library → createEditorHandoff() → navigate to Editor with handoff ID
 *   → Editor fetches handoff → imports citations → marks consumed
 *
 * Handoff statuses: pending → consumed | cancelled
 */

import { db } from "@/lib/db";
import { editorHandoffs } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { LibrarySource } from "./types";

// ── Types ──────────────────────────────────────────────────────

export interface HandoffSourcePayload {
  libraryId: string;
  title: string;
  authors?: string[];
  year?: number;
  journal?: string;
  doi?: string;
  url?: string;
  sourceType: "paper" | "web";
}

export interface EditorHandoff {
  id: number;
  userId: string;
  documentId: number | null;
  payload: { sources: HandoffSourcePayload[] };
  status: "pending" | "consumed" | "cancelled";
  createdAt: Date | null;
  consumedAt: Date | null;
}

// ── Create ─────────────────────────────────────────────────────

/**
 * Create an editor handoff from one or more LibrarySources.
 * Returns the handoff ID for navigation to the Editor.
 */
export async function createEditorHandoff(
  sources: LibrarySource[],
  documentId?: number
): Promise<{ handoffId: number }> {
  const userId = await getCurrentUserId();

  if (sources.length === 0) {
    throw new Error("At least one source is required to create a handoff.");
  }

  const payload = {
    sources: sources.map(normalizeSourceToPayload),
  };

  const [row] = await db
    .insert(editorHandoffs)
    .values({
      userId,
      documentId: documentId ?? null,
      payload,
      status: "pending",
    })
    .returning({ id: editorHandoffs.id });

  revalidatePath("/library");
  return { handoffId: row.id };
}

/**
 * Create a handoff from raw libraryIds (fetches the sources server-side).
 * Convenience for bulk flows where the client only has IDs.
 */
export async function createEditorHandoffFromIds(
  libraryIds: string[],
  documentId?: number
): Promise<{ handoffId: number }> {
  // Dynamically import to avoid circular dependency
  const { getLibrarySourceById } = await import("./service");

  const sources = await Promise.all(
    libraryIds.map((id) => getLibrarySourceById(id))
  );

  return createEditorHandoff(sources, documentId);
}

// ── Read ───────────────────────────────────────────────────────

/**
 * Fetch a pending handoff by ID. Only returns if owned by current user
 * and status is "pending".
 */
export async function getEditorHandoff(
  handoffId: number
): Promise<EditorHandoff | null> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select()
    .from(editorHandoffs)
    .where(
      and(
        eq(editorHandoffs.id, handoffId),
        eq(editorHandoffs.userId, userId)
      )
    )
    .limit(1);

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    userId: row.userId,
    documentId: row.documentId,
    payload: row.payload as EditorHandoff["payload"],
    status: row.status as EditorHandoff["status"],
    createdAt: row.createdAt,
    consumedAt: row.consumedAt,
  };
}

/**
 * Get the most recent pending handoff for the current user.
 * Used by the Editor to detect incoming citations on mount.
 */
export async function getPendingHandoff(): Promise<EditorHandoff | null> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select()
    .from(editorHandoffs)
    .where(
      and(
        eq(editorHandoffs.userId, userId),
        eq(editorHandoffs.status, "pending")
      )
    )
    .orderBy(desc(editorHandoffs.createdAt))
    .limit(1);

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    userId: row.userId,
    documentId: row.documentId,
    payload: row.payload as EditorHandoff["payload"],
    status: row.status as EditorHandoff["status"],
    createdAt: row.createdAt,
    consumedAt: row.consumedAt,
  };
}

// ── Consume ────────────────────────────────────────────────────

/**
 * Mark a handoff as consumed. Called by the Editor after importing citations.
 * Returns the consumed handoff.
 */
export async function consumeEditorHandoff(
  handoffId: number
): Promise<EditorHandoff | null> {
  const userId = await getCurrentUserId();

  const [row] = await db
    .update(editorHandoffs)
    .set({
      status: "consumed",
      consumedAt: new Date(),
    })
    .where(
      and(
        eq(editorHandoffs.id, handoffId),
        eq(editorHandoffs.userId, userId),
        eq(editorHandoffs.status, "pending")
      )
    )
    .returning();

  if (!row) return null;

  revalidatePath("/library");
  revalidatePath("/editor");

  return {
    id: row.id,
    userId: row.userId,
    documentId: row.documentId,
    payload: row.payload as EditorHandoff["payload"],
    status: row.status as EditorHandoff["status"],
    createdAt: row.createdAt,
    consumedAt: row.consumedAt,
  };
}

// ── Cancel ─────────────────────────────────────────────────────

/**
 * Cancel a pending handoff (e.g., user navigates away before Editor consumes it).
 */
export async function cancelEditorHandoff(
  handoffId: number
): Promise<void> {
  const userId = await getCurrentUserId();

  await db
    .update(editorHandoffs)
    .set({ status: "cancelled" })
    .where(
      and(
        eq(editorHandoffs.id, handoffId),
        eq(editorHandoffs.userId, userId),
        eq(editorHandoffs.status, "pending")
      )
    );
}

// ── Cited status ───────────────────────────────────────────────

/**
 * Get the set of libraryIds that have been cited (appear in consumed handoffs).
 * Used to show "Cited" badge on library source cards.
 */
export async function getCitedLibraryIds(): Promise<Set<string>> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select({ payload: editorHandoffs.payload })
    .from(editorHandoffs)
    .where(
      and(
        eq(editorHandoffs.userId, userId),
        eq(editorHandoffs.status, "consumed")
      )
    );

  const cited = new Set<string>();
  for (const row of rows) {
    const payload = row.payload as { sources: HandoffSourcePayload[] };
    for (const source of payload.sources) {
      cited.add(source.libraryId);
    }
  }

  return cited;
}

// ── Helpers ────────────────────────────────────────────────────

function normalizeSourceToPayload(source: LibrarySource): HandoffSourcePayload {
  return {
    libraryId: source.libraryId,
    title: source.title,
    authors: source.authors.length > 0 ? source.authors : undefined,
    year: source.year ?? undefined,
    journal: source.journal ?? undefined,
    doi: source.doi ?? undefined,
    url: source.url ?? undefined,
    sourceType: source.sourceType,
  };
}
