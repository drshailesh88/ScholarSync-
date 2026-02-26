/**
 * Unified Integrity Check system — shared types.
 *
 * Three engines:
 *   1. AI Detection  – detects AI-generated content per paragraph
 *   2. Plagiarism    – shingling + MinHash against scholarly literature
 *   3. Citation Audit – verifies DOIs/PMIDs, flags uncited claims
 */

// ── AI Detection ────────────────────────────────────────────────

export interface AIParagraphResult {
  /** 0-based paragraph index */
  paragraphIndex: number;
  /** The first ~80 chars of the paragraph for display */
  excerpt: string;
  /** 0-100: probability this paragraph is human-written */
  humanProbability: number;
  /** Flags explaining why AI was detected */
  flags: string[];
  /** Actionable suggestion to improve originality */
  suggestion?: string;
}

export interface AIDetectionResult {
  /** Overall 0-100 human-written score */
  humanScore: number;
  /** Overall 0-100 AI-generated score */
  aiScore: number;
  /** Overall risk level */
  overallRisk: "low" | "medium" | "high";
  /** Per-paragraph breakdown */
  paragraphs: AIParagraphResult[];
  /** Which engine produced this result */
  engine: "llm-heuristic" | "binoculars" | "replicate";
  /** Statistical features computed on the text */
  stats: TextStatistics;
}

export interface TextStatistics {
  /** Average words per sentence */
  avgSentenceLength: number;
  /** Standard deviation of sentence lengths (burstiness proxy) */
  sentenceLengthStdDev: number;
  /** Type-token ratio (vocabulary richness) */
  typeTokenRatio: number;
  /** Passive voice percentage */
  passiveVoicePercent: number;
  /** Flesch-Kincaid readability grade */
  readabilityGrade: number;
  /** Count of hedging phrases detected */
  hedgingPhraseCount: number;
}

// ── Plagiarism Detection ────────────────────────────────────────

export interface PlagiarismMatch {
  /** Text excerpt from the user's document */
  excerpt: string;
  /** Matched source information */
  source: {
    title: string;
    authors?: string[];
    doi?: string;
    url?: string;
    year?: number;
  };
  /** Jaccard similarity score 0-1 */
  similarity: number;
  /** Severity classification */
  severity: "low" | "medium" | "high";
}

export interface PlagiarismResult {
  /** Overall similarity score 0-100 */
  similarityScore: number;
  /** Number of sources scanned */
  sourcesScanned: number;
  /** Matched sources */
  matches: PlagiarismMatch[];
  /** Which engine produced this result */
  engine: "shingling-scholarly" | "copyleaks";
}

// ── Citation Audit ──────────────────────────────────────────────

export interface CitationIssue {
  /** Type of issue */
  type: "unverified_doi" | "invalid_doi" | "missing_citation" | "hallucinated_ref" | "broken_pmid";
  /** Severity */
  severity: "info" | "warning" | "error";
  /** Human-readable description */
  message: string;
  /** The reference number or excerpt involved */
  reference?: string;
  /** Paragraph index where the issue was found */
  paragraphIndex?: number;
}

export interface CitationAuditResult {
  /** Total citations found in the document */
  totalCitations: number;
  /** Citations that were verified successfully */
  verifiedCitations: number;
  /** Issues found */
  issues: CitationIssue[];
  /** References that were verified against Crossref/PubMed */
  verifiedReferences: Array<{
    index: number;
    doi?: string;
    pmid?: string;
    title: string;
    verified: boolean;
  }>;
}

// ── Unified Result ──────────────────────────────────────────────

export interface IntegrityCheckResult {
  /** Which tier ran (determines which engines were used) */
  tier: "free" | "paid";
  /** AI detection results */
  aiDetection: AIDetectionResult;
  /** Plagiarism results (null for free tier if not available) */
  plagiarism: PlagiarismResult | null;
  /** Citation audit results (null for free tier) */
  citationAudit: CitationAuditResult | null;
  /** Writing quality metrics */
  writingQuality: {
    passiveVoiceCount: number;
    averageSentenceLength: number;
    readabilityGrade: number;
    suggestions: string[];
  };
  /** Timestamp */
  checkedAt: string;
}

// ── Engine Input ────────────────────────────────────────────────

export interface IntegrityCheckInput {
  /** The document text to check */
  text: string;
  /** User's plan tier */
  plan: "free" | "basic" | "pro" | "institutional";
  /** Optional: sources/references from the document (for citation audit) */
  sources?: Array<{
    title?: string;
    doi?: string;
    pmid?: string;
    authors?: string[];
    year?: number;
  }>;
  /** Optional: check mode */
  mode?: "full" | "ai_detection" | "plagiarism" | "citation_audit";
}
