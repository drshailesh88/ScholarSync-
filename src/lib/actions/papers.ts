"use server";

import { db } from "@/lib/db";
import { papers, userReferences } from "@/lib/db/schema";
import { eq, and, desc, isNull, ilike, or } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getUserPapers(collection?: string) {
  const userId = await getCurrentUserId();
  const refs = await db
    .select({
      ref: userReferences,
      paper: papers,
    })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt),
        collection ? eq(userReferences.collection, collection) : undefined
      )
    )
    .orderBy(desc(userReferences.createdAt));

  return refs.map((r) => ({
    ...r.paper,
    refId: r.ref.id,
    isFavorite: r.ref.isFavorite,
    collection: r.ref.collection,
    notes: r.ref.notes,
    tags: r.ref.tags,
  }));
}

/**
 * Find an existing paper by checking DOI, PubMed ID, and Semantic Scholar ID.
 * Returns the paper ID if found, null otherwise.
 */
async function findExistingPaper(data: {
  doi?: string;
  pubmed_id?: string;
  semantic_scholar_id?: string;
}): Promise<number | null> {
  // Check DOI first (most reliable identifier)
  if (data.doi) {
    const [match] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, data.doi));
    if (match) return match.id;
  }

  // Check PubMed ID
  if (data.pubmed_id) {
    const [match] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.pubmed_id, data.pubmed_id));
    if (match) return match.id;
  }

  // Check Semantic Scholar ID
  if (data.semantic_scholar_id) {
    const [match] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.semantic_scholar_id, data.semantic_scholar_id));
    if (match) return match.id;
  }

  return null;
}

/**
 * Enrich an existing paper record with new data, filling in fields
 * that were previously null/empty without overwriting existing values.
 */
async function enrichExistingPaper(
  paperId: number,
  data: {
    abstract?: string;
    tldr?: string;
    citation_count?: number;
    pubmed_id?: string;
    semantic_scholar_id?: string;
    doi?: string;
    authors?: string[];
    journal?: string;
    year?: number;
  }
) {
  // Fetch current paper data to know what to fill
  const [current] = await db
    .select()
    .from(papers)
    .where(eq(papers.id, paperId));

  if (!current) return;

  const updates: Record<string, unknown> = {};

  // Fill missing identifiers
  if (!current.doi && data.doi) updates.doi = data.doi;
  if (!current.pubmed_id && data.pubmed_id) updates.pubmed_id = data.pubmed_id;
  if (!current.semantic_scholar_id && data.semantic_scholar_id)
    updates.semantic_scholar_id = data.semantic_scholar_id;

  // Fill missing metadata
  if (!current.abstract && data.abstract) updates.abstract = data.abstract;
  if (!current.tldr && data.tldr) updates.tldr = data.tldr;
  if (!current.journal && data.journal) updates.journal = data.journal;
  if (!current.year && data.year) updates.year = data.year;

  // Always update citation count if the new value is higher
  if (
    data.citation_count &&
    data.citation_count > (current.citation_count ?? 0)
  ) {
    updates.citation_count = data.citation_count;
  }

  // Fill authors if currently empty
  const currentAuthors = current.authors as string[] | null;
  if (
    (!currentAuthors || currentAuthors.length === 0) &&
    data.authors &&
    data.authors.length > 0
  ) {
    updates.authors = data.authors;
  }

  if (Object.keys(updates).length > 0) {
    await db.update(papers).set(updates).where(eq(papers.id, paperId));
  }
}

export async function savePaper(data: {
  title: string;
  authors?: string[];
  journal?: string;
  year?: number;
  doi?: string;
  abstract?: string;
  source:
    | "pubmed"
    | "semantic_scholar"
    | "openalex"
    | "arxiv"
    | "user_upload"
    | "snowball"
    | "deep_research";
  pubmed_id?: string;
  semantic_scholar_id?: string;
  citation_count?: number;
  tldr?: string;
  collection?: string;
}) {
  const userId = await getCurrentUserId();

  // Multi-field deduplication: check DOI, PMID, and S2 ID
  let paperId = await findExistingPaper({
    doi: data.doi,
    pubmed_id: data.pubmed_id,
    semantic_scholar_id: data.semantic_scholar_id,
  });

  if (paperId) {
    // Enrich existing paper with any new data
    await enrichExistingPaper(paperId, {
      abstract: data.abstract,
      tldr: data.tldr,
      citation_count: data.citation_count,
      pubmed_id: data.pubmed_id,
      semantic_scholar_id: data.semantic_scholar_id,
      doi: data.doi,
      authors: data.authors,
      journal: data.journal,
      year: data.year,
    });
  } else {
    // Create new paper
    const [newPaper] = await db
      .insert(papers)
      .values({
        title: data.title,
        authors: data.authors || [],
        journal: data.journal,
        year: data.year,
        doi: data.doi || undefined,
        abstract: data.abstract,
        source: data.source,
        pubmed_id: data.pubmed_id || undefined,
        semantic_scholar_id: data.semantic_scholar_id,
        citation_count: data.citation_count || 0,
        tldr: data.tldr,
      })
      .returning();
    paperId = newPaper.id;
  }

  // Create user reference
  await db
    .insert(userReferences)
    .values({
      userId: userId,
      paperId: paperId,
      collection: data.collection || "All Papers",
      isFavorite: false,
    })
    .onConflictDoNothing();

  revalidatePath("/library");
  return paperId;
}

export async function toggleFavorite(refId: number) {
  const userId = await getCurrentUserId();
  const [ref] = await db
    .select()
    .from(userReferences)
    .where(and(eq(userReferences.id, refId), eq(userReferences.userId, userId)));

  if (!ref) return;

  await db
    .update(userReferences)
    .set({ isFavorite: !ref.isFavorite })
    .where(eq(userReferences.id, refId));

  revalidatePath("/library");
}

export async function removePaper(refId: number) {
  const userId = await getCurrentUserId();
  await db
    .update(userReferences)
    .set({ deletedAt: new Date() })
    .where(and(eq(userReferences.id, refId), eq(userReferences.userId, userId)));
  revalidatePath("/library");
}

export async function searchPapersInLibrary(query: string) {
  const userId = await getCurrentUserId();
  return db
    .select({
      ref: userReferences,
      paper: papers,
    })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt),
        or(
          ilike(papers.title, `%${query}%`),
          ilike(papers.journal, `%${query}%`)
        )
      )
    )
    .orderBy(desc(userReferences.createdAt));
}
