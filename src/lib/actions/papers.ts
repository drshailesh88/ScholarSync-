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

export async function savePaper(data: {
  title: string;
  authors?: string[];
  journal?: string;
  year?: number;
  doi?: string;
  abstract?: string;
  source: "pubmed" | "semantic_scholar" | "openalex" | "arxiv" | "user_upload" | "snowball" | "deep_research";
  pubmed_id?: string;
  semantic_scholar_id?: string;
  citation_count?: number;
  tldr?: string;
  collection?: string;
}) {
  const userId = await getCurrentUserId();

  // Upsert paper (check DOI first)
  let paperId: number;
  if (data.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, data.doi));
    if (existing) {
      paperId = existing.id;
    } else {
      const [newPaper] = await db
        .insert(papers)
        .values({
          title: data.title,
          authors: data.authors || [],
          journal: data.journal,
          year: data.year,
          doi: data.doi,
          abstract: data.abstract,
          source: data.source,
          pubmed_id: data.pubmed_id,
          semantic_scholar_id: data.semantic_scholar_id,
          citation_count: data.citation_count || 0,
          tldr: data.tldr,
        })
        .returning();
      paperId = newPaper.id;
    }
  } else {
    const [newPaper] = await db
      .insert(papers)
      .values({
        title: data.title,
        authors: data.authors || [],
        journal: data.journal,
        year: data.year,
        doi: data.doi,
        abstract: data.abstract,
        source: data.source,
        pubmed_id: data.pubmed_id,
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
