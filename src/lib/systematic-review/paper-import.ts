/**
 * Paper Import Engine for Systematic Reviews
 *
 * Imports papers from PubMed, Semantic Scholar, and OpenAlex search results
 * into a systematic review project, with deduplication.
 */

import { db } from "@/lib/db";
import { papers, projectPapers } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { searchSemanticScholar } from "@/lib/search/sources/semantic-scholar";
import { searchOpenAlex } from "@/lib/search/sources/openalex";
import { searchClinicalTrials as searchClinicalTrialsLowLevel } from "@/lib/search/sources/clinical-trials";
import {
  normalizeTitle,
  isSamePaper,
  deduplicateResults,
} from "@/lib/search/dedup";
import type { UnifiedSearchResult } from "@/types/search";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ImportSource =
  | "pubmed"
  | "semantic_scholar"
  | "openalex"
  | "clinicaltrials";

export interface ImportResult {
  totalFound: number;
  imported: number;
  duplicatesSkipped: number;
  batchId: string;
  papers: Array<{ paperId: number; title: string; isNew: boolean }>;
}

// ---------------------------------------------------------------------------
// Core import function: search → dedup → save → link
// ---------------------------------------------------------------------------

export async function importFromSearch(
  projectId: number,
  searchString: string,
  sources: ImportSource[],
  maxResults: number = 100
): Promise<ImportResult> {
  const batchId = `import_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // 1. Run searches across all requested sources in parallel
  const searchPromises: Promise<UnifiedSearchResult[]>[] = [];

  if (sources.includes("pubmed")) {
    searchPromises.push(
      searchPubMed(searchString, { maxResults }).then((r) => r.results)
    );
  }
  if (sources.includes("semantic_scholar")) {
    searchPromises.push(
      searchSemanticScholar(searchString, { limit: maxResults }).then((r) => r.results)
    );
  }
  if (sources.includes("openalex")) {
    searchPromises.push(
      searchOpenAlex(searchString, { limit: maxResults }).then((r) => r.results)
    );
  }
  if (sources.includes("clinicaltrials")) {
    searchPromises.push(
      searchClinicalTrialsLowLevel(searchString, { limit: maxResults }).then(
        (r) => r.results
      )
    );
  }

  const allResults = (await Promise.all(searchPromises)).flat();

  // 2. Cross-source dedup
  const dedupedResults = deduplicateResults(allResults);

  // 3. Get existing project papers to avoid re-importing
  const existingPPs = await db
    .select({ paperId: projectPapers.paper_id })
    .from(projectPapers)
    .where(eq(projectPapers.project_id, projectId));
  const existingPaperIds = new Set(existingPPs.map((pp) => pp.paperId));

  // 4. Import each paper
  const importedPapers: ImportResult["papers"] = [];
  let duplicatesSkipped = 0;

  for (const result of dedupedResults) {
    const paperId = await findOrCreatePaper(result);

    // Skip if already linked to this project
    if (existingPaperIds.has(paperId)) {
      duplicatesSkipped++;
      continue;
    }

    // Link paper to project
    await db
      .insert(projectPapers)
      .values({
        project_id: projectId,
        paper_id: paperId,
        added_by: "search",
        status: "saved",
      })
      .onConflictDoNothing();

    existingPaperIds.add(paperId);
    importedPapers.push({
      paperId,
      title: result.title,
      isNew: true,
    });
  }

  return {
    totalFound: allResults.length,
    imported: importedPapers.length,
    duplicatesSkipped,
    batchId,
    papers: importedPapers,
  };
}

// ---------------------------------------------------------------------------
// Import a single paper from a UnifiedSearchResult
// ---------------------------------------------------------------------------

async function findOrCreatePaper(result: UnifiedSearchResult): Promise<number> {
  // Check by DOI
  if (result.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, result.doi));
    if (existing) return existing.id;
  }

  // Check by PMID
  if (result.pmid) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.pubmed_id, result.pmid));
    if (existing) return existing.id;
  }

  // Check by Semantic Scholar ID
  if (result.s2Id) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.semantic_scholar_id, result.s2Id));
    if (existing) return existing.id;
  }

  // Check by normalized title + year
  if (result.title && result.year) {
    const normalized = normalizeTitle(result.title);
    const candidates = await db
      .select({ id: papers.id, title: papers.title })
      .from(papers)
      .where(eq(papers.year, result.year))
      .limit(100);

    for (const candidate of candidates) {
      if (normalizeTitle(candidate.title) === normalized) {
        return candidate.id;
      }
    }
  }

  // Create new paper
  // Note: "clinical_trials" maps to "deep_research" in the DB enum until
  // a migration adds "clinical_trials" to the paper_source enum.
  const source = result.sources.includes("pubmed")
    ? "pubmed"
    : result.sources.includes("semantic_scholar")
      ? "semantic_scholar"
      : result.sources.includes("clinical_trials")
        ? "deep_research"
        : "openalex";

  const [newPaper] = await db
    .insert(papers)
    .values({
      title: result.title,
      authors: result.authors || [],
      journal: result.journal,
      year: result.year,
      doi: result.doi || undefined,
      pubmed_id: result.pmid || undefined,
      semantic_scholar_id: result.s2Id || undefined,
      openalex_id: result.openalexId || undefined,
      abstract: result.abstract,
      source,
      citation_count: result.citationCount || 0,
      tldr: result.tldr,
      mesh_terms: result.meshTerms || [],
      publication_types: result.publicationTypes || [],
      fields_of_study: result.fieldsOfStudy || [],
      study_type: result.studyType,
      evidence_level: result.evidenceLevel,
      open_access_url: result.openAccessPdfUrl || undefined,
      pdf_url: result.openAccessPdfUrl || undefined,
      open_access: result.isOpenAccess,
      influential_citation_count: result.influentialCitationCount || 0,
      reference_count: result.referenceCount || 0,
    })
    .returning();

  return newPaper.id;
}

// ---------------------------------------------------------------------------
// Deduplicate papers already in a project
// ---------------------------------------------------------------------------

export async function deduplicateProjectPapers(
  projectId: number
): Promise<{ removed: number }> {
  const rows = await db
    .select({
      ppId: projectPapers.id,
      paperId: projectPapers.paper_id,
      title: papers.title,
      year: papers.year,
      doi: papers.doi,
      pmid: papers.pubmed_id,
      s2Id: papers.semantic_scholar_id,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
    .where(eq(projectPapers.project_id, projectId));

  const seen = new Map<string, number>(); // normalizedKey → ppId (keep first)
  const toRemove: number[] = [];

  for (const row of rows) {
    // Build a dedup key: prefer DOI, then PMID, then normalized title+year
    const key =
      row.doi?.toLowerCase() ||
      row.pmid ||
      row.s2Id ||
      `${normalizeTitle(row.title)}_${row.year}`;

    if (seen.has(key)) {
      toRemove.push(row.ppId);
    } else {
      seen.set(key, row.ppId);
    }
  }

  if (toRemove.length > 0) {
    for (const ppId of toRemove) {
      await db
        .delete(projectPapers)
        .where(
          and(
            eq(projectPapers.id, ppId),
            eq(projectPapers.project_id, projectId)
          )
        );
    }
  }

  return { removed: toRemove.length };
}

// ---------------------------------------------------------------------------
// Import papers from uploaded PDF metadata (for manually uploaded PDFs)
// ---------------------------------------------------------------------------

export async function importUploadedPaper(
  projectId: number,
  metadata: {
    title: string;
    authors?: string[];
    year?: number;
    doi?: string;
    abstract?: string;
    journal?: string;
  }
): Promise<{ paperId: number; isNew: boolean }> {
  // Check if paper already exists
  const mockResult: UnifiedSearchResult = {
    title: metadata.title,
    authors: metadata.authors || [],
    journal: metadata.journal || "",
    year: metadata.year || 0,
    doi: metadata.doi,
    abstract: metadata.abstract,
    citationCount: 0,
    publicationTypes: [],
    isOpenAccess: false,
    sources: ["user_upload"],
  };

  const paperId = await findOrCreatePaper({
    ...mockResult,
    sources: ["user_upload"],
  } as UnifiedSearchResult);

  // Link to project
  await db
    .insert(projectPapers)
    .values({
      project_id: projectId,
      paper_id: paperId,
      added_by: "user",
      status: "saved",
    })
    .onConflictDoNothing();

  return { paperId, isNew: true };
}

// ---------------------------------------------------------------------------
// Get project papers with full details
// ---------------------------------------------------------------------------

export async function getProjectPapersWithDetails(projectId: number) {
  return db
    .select({
      ppId: projectPapers.id,
      paperId: papers.id,
      title: papers.title,
      authors: papers.authors,
      journal: papers.journal,
      year: papers.year,
      doi: papers.doi,
      pmid: papers.pubmed_id,
      abstract: papers.abstract,
      citationCount: papers.citation_count,
      studyType: papers.study_type,
      evidenceLevel: papers.evidence_level,
      openAccessUrl: papers.open_access_url,
      pdfStoragePath: papers.pdf_storage_path,
      fullTextAvailable: papers.full_text_available,
      status: projectPapers.status,
      addedBy: projectPapers.added_by,
      screeningDecision: projectPapers.screening_decision,
      screeningReason: projectPapers.screening_reason,
      addedAt: projectPapers.created_at,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
    .where(eq(projectPapers.project_id, projectId));
}
