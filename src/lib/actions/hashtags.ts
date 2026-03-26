"use server";

import { db } from "@/lib/db";
import {
  documentHashtags,
  synthesisDocuments,
  synthesisSections,
  projects,
} from "@/lib/db/schema";
import { eq, and, isNull, desc, sql, ilike } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";

export interface DocumentSearchResult {
  documentId: number;
  projectId: number;
  title: string;
  documentType: string;
  updatedAt: Date;
  matchingTags: string[];
  snippet: string;
}

// ---------------------------------------------------------------------------
// Helper: recursively extract hashtag nodes from Tiptap JSON
// ---------------------------------------------------------------------------
function extractHashtags(node: Record<string, unknown>): string[] {
  const tags: string[] = [];

  if (node.type === "hashtag") {
    const attrs = node.attrs as Record<string, unknown> | undefined;
    if (attrs?.tag && typeof attrs.tag === "string") {
      tags.push(attrs.tag.toLowerCase());
    }
  }

  const content = node.content as Record<string, unknown>[] | undefined;
  if (Array.isArray(content)) {
    for (const child of content) {
      tags.push(...extractHashtags(child));
    }
  }

  return tags;
}

// ---------------------------------------------------------------------------
// syncDocumentHashtags — called after every document save
// ---------------------------------------------------------------------------
export async function syncDocumentHashtags(
  documentId: number,
  sectionId: number
): Promise<void> {
  const userId = await getCurrentUserId();

  // Fetch the section's editor_content
  const [section] = await db
    .select({ editor_content: synthesisSections.editor_content })
    .from(synthesisSections)
    .innerJoin(
      synthesisDocuments,
      eq(synthesisSections.document_id, synthesisDocuments.id)
    )
    .innerJoin(projects, eq(synthesisDocuments.project_id, projects.id))
    .where(
      and(
        eq(synthesisSections.id, sectionId),
        eq(synthesisSections.document_id, documentId),
        eq(projects.user_id, userId),
        isNull(synthesisDocuments.deleted_at),
        isNull(projects.deleted_at)
      )
    )
    .limit(1);

  if (!section?.editor_content) {
    // No content — clear any existing hashtags for this section
    await db
      .delete(documentHashtags)
      .where(
        and(
          eq(documentHashtags.document_id, documentId),
          eq(documentHashtags.section_id, sectionId)
        )
      );
    return;
  }

  const editorJson = section.editor_content as Record<string, unknown>;
  const tags = [...new Set(extractHashtags(editorJson))];

  // Delete existing rows for this (document_id, section_id) pair
  await db
    .delete(documentHashtags)
    .where(
      and(
        eq(documentHashtags.document_id, documentId),
        eq(documentHashtags.section_id, sectionId)
      )
    );

  // Bulk insert new hashtag rows
  if (tags.length > 0) {
    await db.insert(documentHashtags).values(
      tags.map((tag) => ({
        document_id: documentId,
        section_id: sectionId,
        tag,
        user_id: userId,
      }))
    );
  }
}

// ---------------------------------------------------------------------------
// getHashtagSuggestions — for autocomplete
// ---------------------------------------------------------------------------
export async function getHashtagSuggestions(
  query?: string
): Promise<{ tag: string; count: number }[]> {
  const userId = await getCurrentUserId();

  const conditions = [eq(documentHashtags.user_id, userId)];
  if (query) {
    conditions.push(ilike(documentHashtags.tag, `${query}%`));
  }

  const results = await db
    .select({
      tag: documentHashtags.tag,
      count: sql<number>`count(distinct ${documentHashtags.document_id})`.as(
        "count"
      ),
    })
    .from(documentHashtags)
    .where(and(...conditions))
    .groupBy(documentHashtags.tag)
    .orderBy(desc(sql`count`))
    .limit(20);

  return results;
}

// ---------------------------------------------------------------------------
// searchByHashtag — find documents containing a specific hashtag
// ---------------------------------------------------------------------------
export async function searchByHashtag(
  tag: string
): Promise<DocumentSearchResult[]> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select({
      documentId: synthesisDocuments.id,
      projectId: synthesisDocuments.project_id,
      title: synthesisDocuments.title,
      documentType: synthesisDocuments.document_type,
      updatedAt: synthesisDocuments.updated_at,
      plainText: synthesisSections.plain_text_content,
    })
    .from(documentHashtags)
    .innerJoin(
      synthesisDocuments,
      eq(documentHashtags.document_id, synthesisDocuments.id)
    )
    .innerJoin(projects, eq(synthesisDocuments.project_id, projects.id))
    .leftJoin(
      synthesisSections,
      eq(documentHashtags.section_id, synthesisSections.id)
    )
    .where(
      and(
        ilike(documentHashtags.tag, tag),
        eq(projects.user_id, userId),
        isNull(synthesisDocuments.deleted_at),
        isNull(projects.deleted_at)
      )
    )
    .groupBy(
      synthesisDocuments.id,
      synthesisDocuments.project_id,
      synthesisDocuments.title,
      synthesisDocuments.document_type,
      synthesisDocuments.updated_at,
      synthesisSections.plain_text_content
    )
    .orderBy(desc(synthesisDocuments.updated_at))
    .limit(15);

  // For each result, fetch all its hashtags
  const docIds = [...new Set(rows.map((r) => r.documentId))];
  const allTags =
    docIds.length > 0
      ? await db
          .select({
            document_id: documentHashtags.document_id,
            tag: documentHashtags.tag,
          })
          .from(documentHashtags)
          .where(
            and(
              sql`${documentHashtags.document_id} IN ${docIds}`,
              eq(documentHashtags.user_id, userId)
            )
          )
      : [];

  const tagsByDoc = new Map<number, Set<string>>();
  for (const t of allTags) {
    if (!tagsByDoc.has(t.document_id)) {
      tagsByDoc.set(t.document_id, new Set());
    }
    tagsByDoc.get(t.document_id)!.add(t.tag);
  }

  // Deduplicate by documentId
  const seen = new Set<number>();
  const results: DocumentSearchResult[] = [];
  for (const row of rows) {
    if (seen.has(row.documentId)) continue;
    seen.add(row.documentId);
    results.push({
      documentId: row.documentId,
      projectId: row.projectId,
      title: row.title,
      documentType: row.documentType || "original_article",
      updatedAt: row.updatedAt ?? new Date(),
      matchingTags: [...(tagsByDoc.get(row.documentId) ?? [])],
      snippet: (row.plainText ?? "").slice(0, 120),
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// searchDocuments — keyword search across titles and content
// ---------------------------------------------------------------------------
export async function searchDocuments(
  query: string
): Promise<DocumentSearchResult[]> {
  const userId = await getCurrentUserId();

  const rows = await db
    .select({
      documentId: synthesisDocuments.id,
      projectId: synthesisDocuments.project_id,
      title: synthesisDocuments.title,
      documentType: synthesisDocuments.document_type,
      updatedAt: synthesisDocuments.updated_at,
      plainText: synthesisSections.plain_text_content,
    })
    .from(synthesisDocuments)
    .innerJoin(projects, eq(synthesisDocuments.project_id, projects.id))
    .leftJoin(
      synthesisSections,
      eq(synthesisSections.document_id, synthesisDocuments.id)
    )
    .where(
      and(
        eq(projects.user_id, userId),
        isNull(synthesisDocuments.deleted_at),
        isNull(projects.deleted_at),
        sql`(${synthesisDocuments.title} ILIKE ${"%" + query + "%"} OR ${synthesisSections.plain_text_content} ILIKE ${"%" + query + "%"})`
      )
    )
    .orderBy(desc(synthesisDocuments.updated_at))
    .limit(15);

  // Fetch hashtags for matched documents
  const docIds = [...new Set(rows.map((r) => r.documentId))];
  const allTags =
    docIds.length > 0
      ? await db
          .select({
            document_id: documentHashtags.document_id,
            tag: documentHashtags.tag,
          })
          .from(documentHashtags)
          .where(
            and(
              sql`${documentHashtags.document_id} IN ${docIds}`,
              eq(documentHashtags.user_id, userId)
            )
          )
      : [];

  const tagsByDoc = new Map<number, Set<string>>();
  for (const t of allTags) {
    if (!tagsByDoc.has(t.document_id)) {
      tagsByDoc.set(t.document_id, new Set());
    }
    tagsByDoc.get(t.document_id)!.add(t.tag);
  }

  // Deduplicate by documentId
  const seen = new Set<number>();
  const results: DocumentSearchResult[] = [];
  for (const row of rows) {
    if (seen.has(row.documentId)) continue;
    seen.add(row.documentId);
    results.push({
      documentId: row.documentId,
      projectId: row.projectId,
      title: row.title,
      documentType: row.documentType || "original_article",
      updatedAt: row.updatedAt ?? new Date(),
      matchingTags: [...(tagsByDoc.get(row.documentId) ?? [])],
      snippet: (row.plainText ?? "").slice(0, 120),
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// universalDocumentSearch — detects #hashtag vs keyword, delegates
// ---------------------------------------------------------------------------
export async function universalDocumentSearch(
  query: string
): Promise<DocumentSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("#")) {
    const tag = trimmed.slice(1).trim();
    if (!tag) return [];
    return searchByHashtag(tag);
  }

  return searchDocuments(trimmed);
}
