/**
 * LibrarySource Adapter — Normalizes papers and web sources into one model.
 *
 * This is a pure transformation layer. It takes raw database rows from
 * userReferences+papers or webSources and produces LibrarySource objects.
 * No database queries here — those live in the service layer.
 */

import type { LibrarySource, ExtractionState, WorkflowState, ReadStatus } from "./types";
import { toLibraryId } from "./types";

// ── Raw row types (what the DB query returns) ───────────────────

/** Shape returned by a userReferences JOIN papers query */
export interface PaperRow {
  ref: {
    id: number;
    isFavorite: boolean | null;
    collection: string | null;
    tags: unknown;
    notes: string | null;
    workflowState: WorkflowState | null;
    readingProgress: number | null;
    readStatus: ReadStatus | null;
    lastReadAt: Date | null;
    createdAt: Date | null;
  };
  paper: {
    id: number;
    title: string;
    abstract: string | null;
    authors: unknown;
    journal: string | null;
    year: number | null;
    volume: string | null;
    issue: string | null;
    doi: string | null;
    pubmed_id: string | null;
    open_access_url: string | null;
    citation_count: number | null;
    study_type: string | null;
    source: string | null;
    pdf_storage_path: string | null;
    publication_date: Date | null;
  };
  projectIds?: number[];
}

/** Shape returned by a webSources query */
export interface WebSourceRow {
  id: number;
  url: string;
  domain: string;
  title: string;
  snippet: string | null;
  author: string | null;
  publish_date: Date | null;
  source_type: string | null;
  trust_tier: string | null;
  thumbnail_url: string | null;
  content_html: string | null;
  content_plain: string | null;
  content_extracted: boolean | null;
  notes: string | null;
  tags: unknown;
  workflow_state: WorkflowState | null;
  reading_progress: number | null;
  read_status: ReadStatus | null;
  last_read_at: Date | null;
  extraction_state: ExtractionState | null;
  created_at: Date | null;
  projectIds?: number[];
}

// ── Adapter functions ───────────────────────────────────────────

/** Normalize a paper row (userReferences JOIN papers) into a LibrarySource */
export function adaptPaper(row: PaperRow): LibrarySource {
  const { ref, paper } = row;
  const authors = parseAuthors(paper.authors);

  return {
    libraryId: toLibraryId("paper", paper.id),
    sourceType: "paper",

    // Common metadata
    title: paper.title,
    authors,
    year: paper.year,
    url: paper.open_access_url,
    doi: paper.doi,
    domain: null,
    snippet: paper.abstract ? paper.abstract.slice(0, 300) : null,
    thumbnailUrl: null,

    // Paper-specific
    journal: paper.journal,
    volume: paper.volume,
    issue: paper.issue,
    citationCount: paper.citation_count,
    studyType: paper.study_type,
    pubmedId: paper.pubmed_id,
    abstract: paper.abstract,
    pdfStoragePath: paper.pdf_storage_path,

    // Web-specific (null)
    sourceCategory: null,
    trustTier: null,
    contentHtml: null,
    contentPlain: null,
    extractionState: null,

    // Library metadata
    workflowState: ref.workflowState ?? "inbox",
    readingProgress: clampProgress(ref.readingProgress),
    readStatus: ref.readStatus ?? "unread",
    lastReadAt: ref.lastReadAt?.toISOString() ?? null,
    isFavorite: ref.isFavorite ?? false,
    tags: parseTags(ref.tags),
    notes: ref.notes,
    collection: ref.collection,
    addedAt: ref.createdAt?.toISOString() ?? new Date().toISOString(),

    // Project context
    projectIds: row.projectIds ?? [],
  };
}

/** Normalize a web source row into a LibrarySource */
export function adaptWebSource(row: WebSourceRow): LibrarySource {
  return {
    libraryId: toLibraryId("web", row.id),
    sourceType: "web",

    // Common metadata
    title: row.title,
    authors: row.author ? [row.author] : [],
    year: row.publish_date ? row.publish_date.getFullYear() : null,
    url: row.url,
    doi: null,
    domain: row.domain,
    snippet: row.snippet,
    thumbnailUrl: row.thumbnail_url,

    // Paper-specific (null)
    journal: null,
    volume: null,
    issue: null,
    citationCount: null,
    studyType: null,
    pubmedId: null,
    abstract: null,
    pdfStoragePath: null,

    // Web-specific
    sourceCategory: row.source_type,
    trustTier: row.trust_tier,
    contentHtml: row.content_html,
    contentPlain: row.content_plain,
    extractionState: row.extraction_state ?? deriveExtractionState(row.content_extracted),

    // Library metadata
    workflowState: row.workflow_state ?? "inbox",
    readingProgress: clampProgress(row.reading_progress),
    readStatus: row.read_status ?? "unread",
    lastReadAt: row.last_read_at?.toISOString() ?? null,
    isFavorite: false, // web sources don't have favorites yet
    tags: parseTags(row.tags),
    notes: row.notes,
    collection: null,
    addedAt: row.created_at?.toISOString() ?? new Date().toISOString(),

    // Project context
    projectIds: row.projectIds ?? [],
  };
}

// ── Helpers ─────────────────────────────────────────────────────

function parseAuthors(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((a) =>
      typeof a === "string" ? a : (a as { name?: string })?.name ?? String(a)
    );
  }
  return [];
}

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter((t): t is string => typeof t === "string");
  return [];
}

/** Clamp reading progress to [0, 100] range */
function clampProgress(value: number | null | undefined): number {
  if (value == null) return 0;
  return Math.max(0, Math.min(100, value));
}

/** Derive extraction_state from legacy content_extracted boolean */
function deriveExtractionState(contentExtracted: boolean | null): ExtractionState {
  if (contentExtracted === true) return "ready";
  if (contentExtracted === false) return "pending";
  return "pending";
}
