"use server";

import { db } from "@/lib/db";
import { webSources, projectWebSources, webSourceHighlights } from "@/lib/db/schema";
import {
  eq,
  and,
  desc,
  isNull,
  ilike,
  or,
  sql,
} from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { UnifiedSearchResult } from "@/types/search";

// ── Types ────────────────────────────────────────────────────────

export interface SaveWebSourceInput {
  result: UnifiedSearchResult;
  tab: "academic" | "web" | "news" | "discussions";
  searchQuery?: string;
}

export interface WebSourceFilters {
  search?: string;
  sourceType?: string;
  trustTier?: string;
  status?: "saved" | "archived";
  projectId?: number;
  sortBy?: "date_added" | "title" | "domain";
  sortDir?: "asc" | "desc";
}

export type WebSourceRecord = typeof webSources.$inferSelect;

// ── Save ─────────────────────────────────────────────────────────

/**
 * Save a search result as a web source.
 * Returns { id, alreadySaved } — alreadySaved=true if the URL was already in the user's library.
 */
export async function saveWebSource(input: SaveWebSourceInput): Promise<{
  id: number;
  alreadySaved: boolean;
}> {
  const userId = await getCurrentUserId();
  const { result, tab, searchQuery } = input;

  const url = result.url || (result.doi ? `https://doi.org/${result.doi}` : null);
  if (!url) {
    throw new Error("Cannot save a result without a URL");
  }

  const domain =
    result.domain || (() => {
      try {
        return new URL(url).hostname.replace(/^www\./, "");
      } catch {
        return "unknown";
      }
    })();

  // Duplicate check: unique (user_id, url)
  const [existing] = await db
    .select({ id: webSources.id })
    .from(webSources)
    .where(
      and(
        eq(webSources.user_id, userId),
        eq(webSources.url, url),
        isNull(webSources.deleted_at)
      )
    );

  if (existing) {
    return { id: existing.id, alreadySaved: true };
  }

  // Check for soft-deleted version (same URL) and restore instead of creating new
  const [softDeleted] = await db
    .select({ id: webSources.id })
    .from(webSources)
    .where(
      and(
        eq(webSources.user_id, userId),
        eq(webSources.url, url)
      )
    );

  if (softDeleted) {
    // Restore the soft-deleted source
    await db
      .update(webSources)
      .set({
        deleted_at: null,
        status: "saved",
        updated_at: new Date(),
      })
      .where(eq(webSources.id, softDeleted.id));

    revalidatePath("/library");
    revalidatePath("/explore");
    return { id: softDeleted.id, alreadySaved: false };
  }

  // Insert new web source
  const publishDate = result.publishedAt ? new Date(result.publishedAt) : null;

  const [newSource] = await db
    .insert(webSources)
    .values({
      user_id: userId,
      url,
      domain,
      title: result.title,
      snippet: result.abstract || result.tldr || null,
      author: result.authors.length > 0 ? result.authors.join(", ") : null,
      publish_date: publishDate && !isNaN(publishDate.getTime()) ? publishDate : null,
      source_type: mapSourceType(tab, result),
      trust_tier: result.trustTier || "other",
      tab_found_on: tab,
      search_query: searchQuery || null,
      thumbnail_url: null,
      metadata: {
        sources: result.sources,
        rrfScore: result.rrfScore,
        rerankScore: result.rerankScore,
        platform: result.platform,
        community: result.community,
        engagement: result.engagement,
      },
    })
    .returning();

  revalidatePath("/library");
  revalidatePath("/explore");

  // Fire-and-forget content extraction (non-blocking)
  extractWebSourceContent(newSource.id).catch((err) => {
    console.error(`Content extraction failed for source ${newSource.id}:`, err);
  });

  return { id: newSource.id, alreadySaved: false };
}

// ── Content Extraction ──────────────────────────────────────────

/**
 * Extract content from a web source's URL and store the result.
 * Called automatically after save, or manually from the Reader view.
 */
export async function extractWebSourceContent(
  sourceId: number
): Promise<{ wordCount: number }> {
  const userId = await getCurrentUserId();

  const [source] = await db
    .select({
      id: webSources.id,
      url: webSources.url,
      content_extracted: webSources.content_extracted,
    })
    .from(webSources)
    .where(
      and(
        eq(webSources.id, sourceId),
        eq(webSources.user_id, userId)
      )
    );

  if (!source) throw new Error("Web source not found");
  if (source.content_extracted) return { wordCount: 0 };

  const { extractContent } = await import("@/lib/web/content-extractor");
  const extracted = await extractContent(source.url);

  await db
    .update(webSources)
    .set({
      content_html: extracted.contentHtml,
      content_plain: extracted.contentPlain,
      content_extracted: true,
      updated_at: new Date(),
    })
    .where(eq(webSources.id, sourceId));

  revalidatePath("/library");
  return { wordCount: extracted.wordCount };
}

// ── Get ──────────────────────────────────────────────────────────

export async function getWebSources(
  filters: WebSourceFilters = {}
): Promise<WebSourceRecord[]> {
  const userId = await getCurrentUserId();

  // If filtering by project, get the set of web_source_ids in that project
  let projectSourceIds: number[] | null = null;
  if (filters.projectId) {
    const pwsRows = await db
      .select({ webSourceId: projectWebSources.web_source_id })
      .from(projectWebSources)
      .where(eq(projectWebSources.project_id, filters.projectId));
    projectSourceIds = pwsRows.map((r) => r.webSourceId);
    if (projectSourceIds.length === 0) return [];
  }

  const conditions = [
    eq(webSources.user_id, userId),
    isNull(webSources.deleted_at),
  ];

  if (filters.status) {
    conditions.push(eq(webSources.status, filters.status));
  }

  if (filters.sourceType) {
    conditions.push(
      eq(webSources.source_type, filters.sourceType as typeof webSources.source_type.enumValues[number])
    );
  }

  if (filters.trustTier) {
    conditions.push(
      eq(webSources.trust_tier, filters.trustTier as typeof webSources.trust_tier.enumValues[number])
    );
  }

  if (filters.search) {
    conditions.push(
      or(
        ilike(webSources.title, `%${filters.search}%`),
        ilike(webSources.domain, `%${filters.search}%`),
        ilike(webSources.snippet, `%${filters.search}%`)
      )!
    );
  }

  if (projectSourceIds && projectSourceIds.length > 0) {
    conditions.push(
      sql`${webSources.id} = ANY(${projectSourceIds})`
    );
  }

  // Sort
  let orderBy;
  const dir = filters.sortDir === "asc" ? "asc" : "desc";
  switch (filters.sortBy) {
    case "title":
      orderBy = dir === "asc"
        ? sql`${webSources.title} ASC`
        : sql`${webSources.title} DESC`;
      break;
    case "domain":
      orderBy = dir === "asc"
        ? sql`${webSources.domain} ASC`
        : sql`${webSources.domain} DESC`;
      break;
    default:
      orderBy = desc(webSources.created_at);
  }

  const rows = await db
    .select()
    .from(webSources)
    .where(and(...conditions))
    .orderBy(orderBy);

  return rows;
}

/**
 * Get a single web source by ID (must belong to current user).
 */
export async function getWebSourceById(
  sourceId: number
): Promise<WebSourceRecord | null> {
  const userId = await getCurrentUserId();
  const [source] = await db
    .select()
    .from(webSources)
    .where(
      and(
        eq(webSources.id, sourceId),
        eq(webSources.user_id, userId),
        isNull(webSources.deleted_at)
      )
    );
  return source || null;
}

/**
 * Check if a URL is already saved by the current user.
 */
export async function isWebSourceSaved(url: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  const [existing] = await db
    .select({ id: webSources.id })
    .from(webSources)
    .where(
      and(
        eq(webSources.user_id, userId),
        eq(webSources.url, url),
        isNull(webSources.deleted_at)
      )
    );
  return !!existing;
}

/**
 * Batch-check which URLs are already saved by the current user.
 * Returns a Set of saved URLs for O(1) lookup.
 */
export async function getSavedUrls(urls: string[]): Promise<string[]> {
  if (urls.length === 0) return [];
  const userId = await getCurrentUserId();

  const rows = await db
    .select({ url: webSources.url })
    .from(webSources)
    .where(
      and(
        eq(webSources.user_id, userId),
        sql`${webSources.url} = ANY(${urls})`,
        isNull(webSources.deleted_at)
      )
    );

  return rows.map((r) => r.url);
}

// ── Archive / Delete ─────────────────────────────────────────────

export async function archiveWebSource(sourceId: number): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(webSources)
    .set({ status: "archived", updated_at: new Date() })
    .where(
      and(
        eq(webSources.id, sourceId),
        eq(webSources.user_id, userId)
      )
    );
  revalidatePath("/library");
}

/**
 * Soft-delete a web source. It remains in the DB for 30 days.
 */
export async function deleteWebSource(sourceId: number): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(webSources)
    .set({ deleted_at: new Date(), updated_at: new Date() })
    .where(
      and(
        eq(webSources.id, sourceId),
        eq(webSources.user_id, userId)
      )
    );
  revalidatePath("/library");
}

/**
 * Restore a soft-deleted web source within 30 days.
 */
export async function restoreWebSource(sourceId: number): Promise<void> {
  const userId = await getCurrentUserId();
  await db
    .update(webSources)
    .set({ deleted_at: null, status: "saved", updated_at: new Date() })
    .where(
      and(
        eq(webSources.id, sourceId),
        eq(webSources.user_id, userId)
      )
    );
  revalidatePath("/library");
}

// ── Project Linking ──────────────────────────────────────────────

export async function linkWebSourceToProject(
  sourceId: number,
  projectId: number
): Promise<void> {
  const userId = await getCurrentUserId();

  // Verify the source belongs to the user
  const [source] = await db
    .select({ id: webSources.id })
    .from(webSources)
    .where(
      and(
        eq(webSources.id, sourceId),
        eq(webSources.user_id, userId)
      )
    );
  if (!source) throw new Error("Web source not found");

  await db
    .insert(projectWebSources)
    .values({
      project_id: projectId,
      web_source_id: sourceId,
      added_by: "manual",
    })
    .onConflictDoNothing();

  revalidatePath("/library");
}

export async function unlinkWebSourceFromProject(
  sourceId: number,
  projectId: number
): Promise<void> {
  const userId = await getCurrentUserId();

  // Verify the source belongs to the user
  const [source] = await db
    .select({ id: webSources.id })
    .from(webSources)
    .where(
      and(
        eq(webSources.id, sourceId),
        eq(webSources.user_id, userId)
      )
    );
  if (!source) throw new Error("Web source not found");

  await db
    .delete(projectWebSources)
    .where(
      and(
        eq(projectWebSources.web_source_id, sourceId),
        eq(projectWebSources.project_id, projectId)
      )
    );
  revalidatePath("/library");
}

/**
 * Get project IDs linked to a web source.
 */
export async function getWebSourceProjects(
  sourceId: number
): Promise<number[]> {
  const userId = await getCurrentUserId();

  // Join through web_sources to verify ownership
  const rows = await db
    .select({ projectId: projectWebSources.project_id })
    .from(projectWebSources)
    .innerJoin(webSources, eq(projectWebSources.web_source_id, webSources.id))
    .where(
      and(
        eq(projectWebSources.web_source_id, sourceId),
        eq(webSources.user_id, userId)
      )
    );
  return rows.map((r) => r.projectId);
}

// ── Highlights ──────────────────────────────────────────────────

export type AnnotationColor = "yellow" | "green" | "red" | "blue" | "purple";

export interface CreateHighlightInput {
  webSourceId: number;
  selectedText: string;
  startOffset: number;
  endOffset: number;
  color?: AnnotationColor;
  note?: string;
}

export type WebSourceHighlightRecord =
  typeof webSourceHighlights.$inferSelect;

export async function createHighlight(
  input: CreateHighlightInput
): Promise<WebSourceHighlightRecord> {
  const userId = await getCurrentUserId();

  // Verify ownership
  const [source] = await db
    .select({ id: webSources.id })
    .from(webSources)
    .where(
      and(eq(webSources.id, input.webSourceId), eq(webSources.user_id, userId))
    );
  if (!source) throw new Error("Web source not found");

  const [highlight] = await db
    .insert(webSourceHighlights)
    .values({
      web_source_id: input.webSourceId,
      user_id: userId,
      selected_text: input.selectedText,
      start_offset: input.startOffset,
      end_offset: input.endOffset,
      color: input.color || "yellow",
      note: input.note || null,
    })
    .returning();

  revalidatePath("/library");
  return highlight;
}

export async function getHighlights(
  webSourceId: number
): Promise<WebSourceHighlightRecord[]> {
  const userId = await getCurrentUserId();

  return db
    .select()
    .from(webSourceHighlights)
    .where(
      and(
        eq(webSourceHighlights.web_source_id, webSourceId),
        eq(webSourceHighlights.user_id, userId)
      )
    )
    .orderBy(webSourceHighlights.start_offset);
}

export async function updateHighlight(
  highlightId: number,
  updates: { color?: AnnotationColor; note?: string | null }
): Promise<void> {
  const userId = await getCurrentUserId();

  await db
    .update(webSourceHighlights)
    .set({ ...updates, updated_at: new Date() })
    .where(
      and(
        eq(webSourceHighlights.id, highlightId),
        eq(webSourceHighlights.user_id, userId)
      )
    );
  revalidatePath("/library");
}

export async function deleteHighlight(highlightId: number): Promise<void> {
  const userId = await getCurrentUserId();

  await db
    .delete(webSourceHighlights)
    .where(
      and(
        eq(webSourceHighlights.id, highlightId),
        eq(webSourceHighlights.user_id, userId)
      )
    );
  revalidatePath("/library");
}

// ── Notes (general, on web source) ──────────────────────────────

export async function updateWebSourceNotes(
  sourceId: number,
  notes: string | null
): Promise<void> {
  const userId = await getCurrentUserId();

  await db
    .update(webSources)
    .set({ notes, updated_at: new Date() })
    .where(
      and(eq(webSources.id, sourceId), eq(webSources.user_id, userId))
    );
  revalidatePath("/library");
}

// ── Helpers ──────────────────────────────────────────────────────

function mapSourceType(
  tab: string,
  result: UnifiedSearchResult
): "news_article" | "blog_post" | "discussion_post" | "government_report" | "wiki" | "video" | "other" {
  if (tab === "news") return "news_article";
  if (tab === "discussions") return "discussion_post";
  if (result.trustTier === "government") return "government_report";

  const domain = result.domain || "";
  if (domain.includes("wikipedia.org") || domain.includes("wiki")) return "wiki";
  if (domain.includes("youtube.com") || domain.includes("vimeo.com")) return "video";

  return "other";
}
