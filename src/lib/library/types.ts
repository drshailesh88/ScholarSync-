/**
 * LibrarySource — Unified domain model for papers and web sources.
 *
 * The Library module treats papers (from userReferences + papers tables) and
 * web sources (from webSources table) as a single type: LibrarySource.
 * The composite libraryId (e.g. "paper_42", "web_187") encodes which
 * underlying table the source lives in.
 */

// ── Composite ID ────────────────────────────────────────────────

export type SourceType = "paper" | "web";

export interface ParsedLibraryId {
  type: SourceType;
  id: number;
}

/**
 * Encode a source type + numeric ID into a composite libraryId.
 * @example toLibraryId("paper", 42) → "paper_42"
 */
export function toLibraryId(type: SourceType, id: number): string {
  if (!Number.isInteger(id) || id < 0) {
    throw new Error(`Invalid id for libraryId: ${id}. Must be a non-negative integer.`);
  }
  return `${type}_${id}`;
}

/**
 * Decode a composite libraryId back into type + numeric ID.
 * @example parseLibraryId("web_187") → { type: "web", id: 187 }
 * @throws if the format is invalid
 */
export function parseLibraryId(libraryId: string): ParsedLibraryId {
  const match = libraryId.match(/^(paper|web)_(\d+)$/);
  if (!match) {
    throw new Error(`Invalid libraryId format: "${libraryId}". Expected "paper_N" or "web_N".`);
  }
  return {
    type: match[1] as SourceType,
    id: parseInt(match[2], 10),
  };
}

// ── Workflow States ─────────────────────────────────────────────

export type WorkflowState = "inbox" | "core" | "background" | "archived";
export type ReadStatus = "unread" | "in_progress" | "read";
export type ExtractionState = "pending" | "ready" | "partial" | "failed";

// ── Unified LibrarySource ───────────────────────────────────────

export interface LibrarySource {
  /** Composite ID: "paper_42" or "web_187" */
  libraryId: string;
  sourceType: SourceType;

  // ── Common metadata ──────────────────────────────────────────
  title: string;
  authors: string[];
  year: number | null;
  url: string | null;
  doi: string | null;
  domain: string | null;
  snippet: string | null;
  thumbnailUrl: string | null;

  // ── Paper-specific (null for web sources) ────────────────────
  journal: string | null;
  volume: string | null;
  issue: string | null;
  citationCount: number | null;
  studyType: string | null;
  pubmedId: string | null;
  abstract: string | null;
  pdfStoragePath: string | null;

  // ── Web-specific (null for papers) ───────────────────────────
  sourceCategory: string | null; // web_source_type enum value
  trustTier: string | null;
  contentHtml: string | null;
  contentPlain: string | null;
  extractionState: ExtractionState | null;

  // ── Library metadata (shared across both) ────────────────────
  workflowState: WorkflowState;
  readingProgress: number;
  readStatus: ReadStatus;
  lastReadAt: string | null;
  isFavorite: boolean;
  tags: string[];
  notes: string | null;
  collection: string | null;
  addedAt: string;

  // ── Project context ──────────────────────────────────────────
  projectIds: number[];
}

// ── Service filter types ────────────────────────────────────────

export interface LibrarySourceFilters {
  search?: string;
  sourceType?: SourceType;
  workflowState?: WorkflowState;
  readStatus?: ReadStatus;
  projectId?: number;
  sortBy?: "date_added" | "title" | "year";
  sortDir?: "asc" | "desc";
  limit?: number;
  offset?: number;
}
