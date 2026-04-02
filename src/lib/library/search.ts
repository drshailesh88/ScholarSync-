"use server";

/**
 * Library search functions for command palette integration.
 * Searches across library sources and annotations for Cmd+K.
 */

import { db } from "@/lib/db";
import {
  papers,
  userReferences,
  webSources,
  libraryAnnotations,
} from "@/lib/db/schema";
import { eq, and, desc, isNull, ilike, or } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { adaptPaper, adaptWebSource } from "./adapter";
import type { PaperRow, WebSourceRow } from "./adapter";

export interface LibrarySearchResult {
  libraryId: string;
  title: string;
  sourceType: "paper" | "web";
  snippet: string | null;
  workflowState: string;
}

export interface AnnotationSearchResult {
  id: number;
  libraryId: string;
  text: string;
  note: string | null;
  sourceTitle: string;
  highlightStyle: string;
}

/**
 * Search library sources by title for command palette.
 * Returns lightweight results (not full LibrarySource objects).
 */
export async function searchLibrarySources(
  query: string,
  limit = 8
): Promise<LibrarySearchResult[]> {
  if (!query.trim()) return [];

  const userId = await getCurrentUserId();
  const searchTerm = `%${query.trim()}%`;

  // Search papers
  const paperRows = await db
    .select({ ref: userReferences, paper: papers })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt),
        or(
          ilike(papers.title, searchTerm),
          ilike(papers.journal, searchTerm)
        )
      )
    )
    .orderBy(desc(userReferences.createdAt))
    .limit(limit);

  // Search web sources
  const webRows = await db
    .select()
    .from(webSources)
    .where(
      and(
        eq(webSources.user_id, userId),
        isNull(webSources.deleted_at),
        or(
          ilike(webSources.title, searchTerm),
          ilike(webSources.domain, searchTerm)
        )
      )
    )
    .orderBy(desc(webSources.created_at))
    .limit(limit);

  const results: LibrarySearchResult[] = [];

  for (const row of paperRows) {
    const adapted = adaptPaper(row as PaperRow);
    results.push({
      libraryId: adapted.libraryId,
      title: adapted.title,
      sourceType: "paper",
      snippet: adapted.journal ?? adapted.snippet,
      workflowState: adapted.workflowState,
    });
  }

  for (const row of webRows) {
    const adapted = adaptWebSource(row as WebSourceRow);
    results.push({
      libraryId: adapted.libraryId,
      title: adapted.title,
      sourceType: "web",
      snippet: adapted.domain ?? adapted.snippet,
      workflowState: adapted.workflowState,
    });
  }

  // Sort by title relevance (exact start match first) then take limit
  return results
    .sort((a, b) => {
      const aStartsWith = a.title.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1;
      const bStartsWith = b.title.toLowerCase().startsWith(query.toLowerCase()) ? 0 : 1;
      return aStartsWith - bStartsWith;
    })
    .slice(0, limit);
}

/**
 * Search annotations (highlights + notes) for command palette.
 */
export async function searchAnnotations(
  query: string,
  limit = 5
): Promise<AnnotationSearchResult[]> {
  if (!query.trim()) return [];

  const userId = await getCurrentUserId();
  const searchTerm = `%${query.trim()}%`;

  try {
    const rows = await db
      .select({
        id: libraryAnnotations.id,
        sourceId: libraryAnnotations.source_id,
        sourceType: libraryAnnotations.source_type,
        text: libraryAnnotations.selected_text,
        note: libraryAnnotations.note,
        color: libraryAnnotations.color,
      })
      .from(libraryAnnotations)
      .where(
        and(
          eq(libraryAnnotations.user_id, userId),
          or(
            ilike(libraryAnnotations.selected_text, searchTerm),
            ilike(libraryAnnotations.note, searchTerm)
          )
        )
      )
      .orderBy(desc(libraryAnnotations.created_at))
      .limit(limit);

    // Fetch source titles for display
    const results: AnnotationSearchResult[] = [];
    for (const row of rows) {
      const libraryId = `${row.sourceType}_${row.sourceId}`;
      let sourceTitle = "Unknown source";

      try {
        if (row.sourceType === "paper") {
          const [paper] = await db
            .select({ title: papers.title })
            .from(papers)
            .where(eq(papers.id, row.sourceId))
            .limit(1);
          if (paper) sourceTitle = paper.title;
        } else {
          const [web] = await db
            .select({ title: webSources.title })
            .from(webSources)
            .where(eq(webSources.id, row.sourceId))
            .limit(1);
          if (web) sourceTitle = web.title ?? "Untitled";
        }
      } catch {
        // Keep default title
      }

      results.push({
        id: row.id,
        libraryId,
        text: row.text ?? "",
        note: row.note ?? null,
        sourceTitle,
        highlightStyle: row.color ?? "yellow",
      });
    }

    return results;
  } catch {
    return []; // library_annotations table may not have data yet
  }
}
