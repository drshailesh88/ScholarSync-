"use server";

/**
 * Annotation Service — CRUD for library_annotations.
 *
 * Supports highlights (with optional notes) and general notes on any
 * LibrarySource. Uses anchor_type + anchor_payload for position encoding.
 */

import { db } from "@/lib/db";
import { libraryAnnotations } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { parseLibraryId } from "./types";

// ── Types ─────────────────────────────────────────────────────────

export type AnnotationColor = "yellow" | "blue";

export type AnchorType = "text_offset" | "css_selector" | "page_position";

export interface AnchorPayload {
  startOffset?: number;
  endOffset?: number;
  cssSelector?: string;
  pageNumber?: number;
  rectX?: number;
  rectY?: number;
  rectWidth?: number;
  rectHeight?: number;
}

export interface Annotation {
  id: number;
  libraryId: string;
  sourceType: "paper" | "web";
  sourceId: number;
  selectedText: string | null;
  note: string | null;
  color: AnnotationColor;
  anchorType: AnchorType;
  anchorPayload: AnchorPayload;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHighlightInput {
  libraryId: string;
  selectedText: string;
  anchorType: AnchorType;
  anchorPayload: AnchorPayload;
  color?: AnnotationColor;
  note?: string;
}

export interface CreateNoteInput {
  libraryId: string;
  note: string;
}

export interface UpdateAnnotationInput {
  id: number;
  note?: string | null;
  color?: AnnotationColor;
}

// ── Queries ───────────────────────────────────────────────────────

/**
 * Get all annotations for a library source, newest first.
 */
export async function getAnnotations(
  libraryId: string
): Promise<Annotation[]> {
  const userId = await getCurrentUserId();
  const { type, id } = parseLibraryId(libraryId);

  const rows = await db
    .select()
    .from(libraryAnnotations)
    .where(
      and(
        eq(libraryAnnotations.user_id, userId),
        eq(libraryAnnotations.source_type, type),
        eq(libraryAnnotations.source_id, id)
      )
    )
    .orderBy(desc(libraryAnnotations.created_at));

  return rows.map(adaptAnnotationRow);
}

// ── Mutations ─────────────────────────────────────────────────────

/**
 * Create a highlight (text selection + anchor + optional note).
 */
export async function createHighlight(
  input: CreateHighlightInput
): Promise<Annotation> {
  const userId = await getCurrentUserId();
  const { type, id } = parseLibraryId(input.libraryId);

  const [row] = await db
    .insert(libraryAnnotations)
    .values({
      user_id: userId,
      source_type: type,
      source_id: id,
      selected_text: input.selectedText,
      note: input.note ?? null,
      color: input.color ?? "yellow",
      anchor_type: input.anchorType,
      anchor_payload: input.anchorPayload,
    })
    .returning();

  revalidatePath("/library");
  return adaptAnnotationRow(row);
}

/**
 * Create a general note on a source (no text selection, no anchor position).
 */
export async function createSourceNote(
  input: CreateNoteInput
): Promise<Annotation> {
  const userId = await getCurrentUserId();
  const { type, id } = parseLibraryId(input.libraryId);

  const [row] = await db
    .insert(libraryAnnotations)
    .values({
      user_id: userId,
      source_type: type,
      source_id: id,
      selected_text: null,
      note: input.note,
      color: "yellow",
      anchor_type: "text_offset",
      anchor_payload: { startOffset: 0, endOffset: 0 },
    })
    .returning();

  revalidatePath("/library");
  return adaptAnnotationRow(row);
}

/**
 * Update an annotation's note or color.
 */
export async function updateAnnotation(
  input: UpdateAnnotationInput
): Promise<Annotation> {
  const userId = await getCurrentUserId();

  const set: Record<string, unknown> = { updated_at: new Date() };
  if (input.note !== undefined) set.note = input.note;
  if (input.color !== undefined) set.color = input.color;

  const [row] = await db
    .update(libraryAnnotations)
    .set(set)
    .where(
      and(
        eq(libraryAnnotations.id, input.id),
        eq(libraryAnnotations.user_id, userId)
      )
    )
    .returning();

  if (!row) {
    throw new Error(`Annotation not found: ${input.id}`);
  }

  revalidatePath("/library");
  return adaptAnnotationRow(row);
}

/**
 * Delete an annotation by ID (must be owned by current user).
 */
export async function deleteAnnotation(id: number): Promise<void> {
  const userId = await getCurrentUserId();

  const result = await db
    .delete(libraryAnnotations)
    .where(
      and(
        eq(libraryAnnotations.id, id),
        eq(libraryAnnotations.user_id, userId)
      )
    )
    .returning({ id: libraryAnnotations.id });

  if (result.length === 0) {
    throw new Error(`Annotation not found: ${id}`);
  }

  revalidatePath("/library");
}

// ── Adapter ───────────────────────────────────────────────────────

function adaptAnnotationRow(row: typeof libraryAnnotations.$inferSelect): Annotation {
  const type = row.source_type as "paper" | "web";
  const id = row.source_id;

  return {
    id: row.id,
    libraryId: `${type}_${id}`,
    sourceType: type,
    sourceId: id,
    selectedText: row.selected_text,
    note: row.note,
    color: (row.color ?? "yellow") as AnnotationColor,
    anchorType: row.anchor_type as AnchorType,
    anchorPayload: (row.anchor_payload ?? {}) as AnchorPayload,
    createdAt: row.created_at?.toISOString() ?? new Date().toISOString(),
    updatedAt: row.updated_at?.toISOString() ?? new Date().toISOString(),
  };
}
