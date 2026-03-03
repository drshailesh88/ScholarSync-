/**
 * Source Coverage Analyzer
 *
 * After answering a query, analyzes which of the user's selected papers
 * contributed chunks to the response and which were not used. Reports
 * coverage gaps so the user knows if their uploaded sources are sufficient.
 *
 * This is the backend module for NotebookLM-parity "Sources used: 3/5" display.
 */

// ── Types ────────────────────────────────────────────────────────

export interface PaperCoverage {
  paperId: number;
  paperTitle: string;
  /** Whether this paper contributed any chunks to the retrieved context */
  contributed: boolean;
  /** Number of chunks from this paper in the retrieved context */
  chunksUsed: number;
  /** Highest relevance score among this paper's chunks (0-1) */
  topScore: number;
  /** Section types represented (e.g., ["results", "methods"]) */
  sectionsRepresented: string[];
}

export interface CoverageReport {
  /** Total papers selected by the user */
  totalPapers: number;
  /** Papers that contributed at least one chunk */
  papersUsed: number;
  /** Papers that contributed zero chunks */
  papersUnused: number;
  /** Coverage ratio (0-1) */
  coverageRatio: number;
  /** Per-paper breakdown */
  papers: PaperCoverage[];
  /** Human-readable coverage summary */
  summary: string;
}

/** Minimal chunk shape needed for coverage analysis */
export interface CoverageChunk {
  paper_id: number;
  score?: number;
  section_type?: string | null;
}

/** Minimal paper shape needed for coverage analysis */
export interface CoveragePaper {
  id: number;
  title: string;
}

// ── Core function ────────────────────────────────────────────────

/**
 * Analyze which papers contributed to the retrieved context.
 *
 * @param selectedPapers - All papers the user selected for the query
 * @param retrievedChunks - Chunks returned by the RAG pipeline
 * @returns Coverage report with per-paper breakdown
 */
export function analyzeSourceCoverage(
  selectedPapers: CoveragePaper[],
  retrievedChunks: CoverageChunk[]
): CoverageReport {
  const papers: PaperCoverage[] = selectedPapers.map((paper) => {
    const paperChunks = retrievedChunks.filter(
      (c) => c.paper_id === paper.id
    );
    const sections = [
      ...new Set(
        paperChunks
          .map((c) => c.section_type)
          .filter((s): s is string => s != null)
      ),
    ];
    const topScore =
      paperChunks.length > 0
        ? Math.max(...paperChunks.map((c) => c.score ?? 0))
        : 0;

    return {
      paperId: paper.id,
      paperTitle: paper.title,
      contributed: paperChunks.length > 0,
      chunksUsed: paperChunks.length,
      topScore: Math.round(topScore * 100) / 100,
      sectionsRepresented: sections,
    };
  });

  const papersUsed = papers.filter((p) => p.contributed).length;
  const papersUnused = papers.length - papersUsed;
  const coverageRatio =
    papers.length > 0 ? Math.round((papersUsed / papers.length) * 100) / 100 : 0;

  // Build summary
  let summary: string;
  if (coverageRatio === 1) {
    summary = `All ${papers.length} of your uploaded papers contributed to this response.`;
  } else if (coverageRatio === 0) {
    summary = `None of your ${papers.length} uploaded papers were relevant to this query.`;
  } else {
    const unusedTitles = papers
      .filter((p) => !p.contributed)
      .map((p) => {
        // Use trial abbreviation if available (text before colon)
        const colonIdx = p.paperTitle.indexOf(":");
        return colonIdx > 0
          ? p.paperTitle.substring(0, colonIdx)
          : p.paperTitle;
      });
    summary = `${papersUsed} of ${papers.length} papers used. Not referenced: ${unusedTitles.join(", ")}.`;
  }

  return {
    totalPapers: papers.length,
    papersUsed,
    papersUnused,
    coverageRatio,
    papers,
    summary,
  };
}

/**
 * Format a coverage report as a brief footer for the AI response.
 * Returns empty string if all papers were used (no gap to report).
 */
export function formatCoverageFooter(report: CoverageReport): string {
  if (report.coverageRatio === 1) return "";
  if (report.totalPapers <= 1) return "";

  const unused = report.papers.filter((p) => !p.contributed);
  if (unused.length === 0) return "";

  const unusedNames = unused.map((p) => {
    const colonIdx = p.paperTitle.indexOf(":");
    return colonIdx > 0
      ? p.paperTitle.substring(0, colonIdx)
      : p.paperTitle;
  });

  return `\n\n---\n*Source coverage: ${report.papersUsed}/${report.totalPapers} papers used. ${unusedNames.join(", ")} did not contribute to this response — the query may not relate to ${unused.length === 1 ? "that paper" : "those papers"}.*`;
}
