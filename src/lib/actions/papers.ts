"use server";

import { db } from "@/lib/db";
import {
  papers,
  userReferences,
  paperChunks,
  projectPapers,
  projects,
} from "@/lib/db/schema";
import { eq, and, desc, asc, isNull, ilike, or, sql, gte, lte, inArray } from "drizzle-orm";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { normalizeTitle } from "@/lib/search/dedup";

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
    addedAt: r.ref.createdAt?.toISOString() ?? null,
  }));
}

/** Filters for the advanced library query */
export interface LibraryFilters {
  search?: string;
  projectId?: number;
  yearMin?: number;
  yearMax?: number;
  studyType?: string;
  sortBy?: "date_added" | "title" | "citation_count" | "year";
  sortDir?: "asc" | "desc";
}

/**
 * Fetch the current user's library papers with full filtering and sorting.
 * All filtering is done server-side via Drizzle ORM queries.
 */
export async function getFilteredUserPapers(filters: LibraryFilters = {}) {
  const userId = await getCurrentUserId();

  // When filtering by project, we need the set of paper IDs in that project
  let projectPaperIds: number[] | null = null;
  if (filters.projectId) {
    const ppRows = await db
      .select({ paperId: projectPapers.paper_id })
      .from(projectPapers)
      .where(eq(projectPapers.project_id, filters.projectId));
    projectPaperIds = ppRows.map((r) => r.paperId);
    // If the project has no papers, return empty immediately
    if (projectPaperIds.length === 0) return [];
  }

  // Build WHERE conditions
  const conditions = [
    eq(userReferences.userId, userId),
    isNull(userReferences.deletedAt),
  ];

  // Project filter: restrict to paper IDs that belong to that project
  if (projectPaperIds && projectPaperIds.length > 0) {
    conditions.push(inArray(papers.id, projectPaperIds));
  }

  // Year range
  if (filters.yearMin != null) {
    conditions.push(gte(papers.year, filters.yearMin));
  }
  if (filters.yearMax != null) {
    conditions.push(lte(papers.year, filters.yearMax));
  }

  // Study type
  if (filters.studyType) {
    conditions.push(eq(papers.study_type, filters.studyType));
  }

  // Text search (title, journal, authors jsonb cast to text)
  if (filters.search) {
    const q = `%${filters.search}%`;
    conditions.push(
      or(
        ilike(papers.title, q),
        ilike(papers.journal, q),
        sql`${papers.authors}::text ILIKE ${q}`
      )!
    );
  }

  // Determine ORDER BY
  let orderClause;
  const direction = filters.sortDir ?? "desc";
  switch (filters.sortBy) {
    case "title":
      orderClause =
        direction === "asc" ? asc(papers.title) : desc(papers.title);
      break;
    case "citation_count":
      orderClause =
        direction === "desc"
          ? desc(papers.citation_count)
          : asc(papers.citation_count);
      break;
    case "year":
      orderClause =
        direction === "desc" ? desc(papers.year) : asc(papers.year);
      break;
    case "date_added":
    default:
      orderClause =
        direction === "desc"
          ? desc(userReferences.createdAt)
          : asc(userReferences.createdAt);
      break;
  }

  const refs = await db
    .select({
      ref: userReferences,
      paper: papers,
    })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(and(...conditions))
    .orderBy(orderClause);

  return refs.map((r) => ({
    ...r.paper,
    refId: r.ref.id,
    isFavorite: r.ref.isFavorite,
    collection: r.ref.collection,
    notes: r.ref.notes,
    tags: r.ref.tags,
    addedAt: r.ref.createdAt?.toISOString() ?? null,
  }));
}

/**
 * Get distinct study types present in the user's library for filter dropdown.
 */
export async function getLibraryStudyTypes(): Promise<string[]> {
  const userId = await getCurrentUserId();
  const rows = await db
    .selectDistinct({ studyType: papers.study_type })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt),
        sql`${papers.study_type} IS NOT NULL AND ${papers.study_type} != ''`
      )
    );
  return rows.map((r) => r.studyType).filter(Boolean) as string[];
}

/**
 * Get the year range (min/max) present in the user's library.
 */
export async function getLibraryYearRange(): Promise<{
  min: number | null;
  max: number | null;
}> {
  const userId = await getCurrentUserId();
  const [row] = await db
    .select({
      minYear: sql<number>`MIN(${papers.year})`,
      maxYear: sql<number>`MAX(${papers.year})`,
    })
    .from(userReferences)
    .innerJoin(papers, eq(userReferences.paperId, papers.id))
    .where(
      and(
        eq(userReferences.userId, userId),
        isNull(userReferences.deletedAt),
        sql`${papers.year} IS NOT NULL`
      )
    );
  return { min: row?.minYear ?? null, max: row?.maxYear ?? null };
}

/**
 * Get user's projects (lightweight list for filter dropdown).
 */
export async function getLibraryProjects(): Promise<
  { id: number; title: string }[]
> {
  const userId = await getCurrentUserId();
  return db
    .select({ id: projects.id, title: projects.title })
    .from(projects)
    .where(and(eq(projects.user_id, userId), isNull(projects.deleted_at)))
    .orderBy(desc(projects.updated_at));
}

interface SavePaperData {
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
  mesh_terms?: string[];
  publication_types?: string[];
  fields_of_study?: string[];
  study_type?: string;
  evidence_level?: string;
  open_access_url?: string;
  influential_citation_count?: number;
  reference_count?: number;
}

async function findExistingPaper(data: SavePaperData): Promise<number | null> {
  // 1. Check DOI
  if (data.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, data.doi));
    if (existing) return existing.id;
  }

  // 2. Check PMID
  if (data.pubmed_id) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.pubmed_id, data.pubmed_id));
    if (existing) return existing.id;
  }

  // 3. Check Semantic Scholar ID
  if (data.semantic_scholar_id) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.semantic_scholar_id, data.semantic_scholar_id));
    if (existing) return existing.id;
  }

  // 4. Check normalized title + year
  if (data.title && data.year) {
    const normalized = normalizeTitle(data.title);
    const candidates = await db
      .select({ id: papers.id, title: papers.title })
      .from(papers)
      .where(eq(papers.year, data.year))
      .limit(100);

    for (const candidate of candidates) {
      if (normalizeTitle(candidate.title) === normalized) {
        return candidate.id;
      }
    }
  }

  return null;
}

async function enrichExistingPaper(
  paperId: number,
  data: SavePaperData
): Promise<void> {
  const [existing] = await db
    .select()
    .from(papers)
    .where(eq(papers.id, paperId));
  if (!existing) return;

  const updates: Record<string, unknown> = {};

  // Fill missing text fields
  if (!existing.abstract && data.abstract) updates.abstract = data.abstract;
  if (!existing.tldr && data.tldr) updates.tldr = data.tldr;
  if (!existing.journal && data.journal) updates.journal = data.journal;
  if (!existing.study_type && data.study_type)
    updates.study_type = data.study_type;
  if (!existing.evidence_level && data.evidence_level)
    updates.evidence_level = data.evidence_level;
  if (!existing.open_access_url && data.open_access_url)
    updates.open_access_url = data.open_access_url;
  if (!existing.pdf_url && data.open_access_url)
    updates.pdf_url = data.open_access_url;

  // Fill missing identifiers
  if (!existing.doi && data.doi) updates.doi = data.doi;
  if (!existing.pubmed_id && data.pubmed_id)
    updates.pubmed_id = data.pubmed_id;
  if (!existing.semantic_scholar_id && data.semantic_scholar_id)
    updates.semantic_scholar_id = data.semantic_scholar_id;

  // Fill missing array fields
  const existingMesh = existing.mesh_terms as string[] | null;
  if ((!existingMesh || existingMesh.length === 0) && data.mesh_terms?.length)
    updates.mesh_terms = data.mesh_terms;

  const existingPubTypes = existing.publication_types as string[] | null;
  if (
    (!existingPubTypes || existingPubTypes.length === 0) &&
    data.publication_types?.length
  )
    updates.publication_types = data.publication_types;

  const existingFields = existing.fields_of_study as string[] | null;
  if (
    (!existingFields || existingFields.length === 0) &&
    data.fields_of_study?.length
  )
    updates.fields_of_study = data.fields_of_study;

  // Update citation count if new value is higher
  if (
    data.citation_count &&
    data.citation_count > (existing.citation_count || 0)
  )
    updates.citation_count = data.citation_count;

  if (
    data.influential_citation_count &&
    data.influential_citation_count >
      (existing.influential_citation_count || 0)
  )
    updates.influential_citation_count = data.influential_citation_count;

  if (
    data.reference_count &&
    data.reference_count > (existing.reference_count || 0)
  )
    updates.reference_count = data.reference_count;

  // Fill missing authors
  const existingAuthors = existing.authors as string[] | null;
  if (
    (!existingAuthors || existingAuthors.length === 0) &&
    data.authors?.length
  )
    updates.authors = data.authors;

  if (Object.keys(updates).length > 0) {
    await db.update(papers).set(updates).where(eq(papers.id, paperId));
  }
}

export async function savePaper(data: SavePaperData) {
  const userId = await getCurrentUserId();

  // Multi-field dedup cascade
  let paperId = await findExistingPaper(data);

  if (paperId) {
    // Enrich existing paper with any new metadata
    await enrichExistingPaper(paperId, data);
  } else {
    // Insert new paper
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
        mesh_terms: data.mesh_terms || [],
        publication_types: data.publication_types || [],
        fields_of_study: data.fields_of_study || [],
        study_type: data.study_type,
        evidence_level: data.evidence_level,
        open_access_url: data.open_access_url,
        influential_citation_count: data.influential_citation_count || 0,
        reference_count: data.reference_count || 0,
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

  // Auto-chunk in background if we have text content
  if (data.abstract || data.tldr) {
    autoChunkPaper(paperId)
      .then((chunked) => {
        if (chunked > 0) {
          // Trigger embedding in background
          import("./embeddings").then(({ embedPaperChunks }) => {
            embedPaperChunks(paperId).catch((err: unknown) => {
              console.error("Background embedding failed:", err);
            });
          });
        }
      })
      .catch((err: unknown) => {
        console.error("Auto-chunk failed:", err);
      });
  }

  return paperId;
}

/**
 * Create chunks from a saved paper's abstract (and any available text).
 * This bridges the gap between "saved from search" and "usable in RAG."
 */
export async function autoChunkPaper(paperId: number): Promise<number> {
  const [paper] = await db
    .select()
    .from(papers)
    .where(eq(papers.id, paperId));

  if (!paper) return 0;

  // Check if already chunked
  const existingChunks = await db
    .select({ id: paperChunks.id })
    .from(paperChunks)
    .where(eq(paperChunks.paper_id, paperId))
    .limit(1);

  if (existingChunks.length > 0) return 0;

  // Build text from available metadata
  const sections: { text: string; sectionType: string }[] = [];

  if (paper.abstract) {
    sections.push({ text: paper.abstract, sectionType: "abstract" });
  }

  if (paper.tldr) {
    sections.push({
      text: `TL;DR Summary: ${paper.tldr}`,
      sectionType: "abstract",
    });
  }

  // If we have full text (from PDF extraction), chunk it properly
  if (paper.full_text_plain) {
    const words = paper.full_text_plain.split(/\s+/);
    const CHUNK_SIZE = 500;
    const OVERLAP = 50;
    for (let i = 0; i < words.length; i += CHUNK_SIZE - OVERLAP) {
      const chunk = words.slice(i, i + CHUNK_SIZE).join(" ");
      if (chunk.trim()) {
        sections.push({ text: chunk, sectionType: "other" });
      }
    }
  }

  if (sections.length === 0) return 0;

  // Insert chunks
  for (let i = 0; i < sections.length; i++) {
    await db.insert(paperChunks).values({
      paper_id: paperId,
      chunk_index: i,
      text: sections[i].text,
      section_type: sections[i].sectionType as "abstract" | "introduction" | "methods" | "results" | "discussion" | "conclusion" | "other",
    });
  }

  // Mark paper as chunked
  await db
    .update(papers)
    .set({ is_chunked: true })
    .where(eq(papers.id, paperId));

  return sections.length;
}

export async function toggleFavorite(refId: number) {
  const userId = await getCurrentUserId();
  const [ref] = await db
    .select()
    .from(userReferences)
    .where(
      and(eq(userReferences.id, refId), eq(userReferences.userId, userId))
    );

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
    .where(
      and(eq(userReferences.id, refId), eq(userReferences.userId, userId))
    );
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
