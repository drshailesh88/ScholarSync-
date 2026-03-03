/**
 * Citation Verifier
 *
 * Post-response verification that [N] citation markers in AI responses
 * actually match the content of Source N. Detects cross-citation errors
 * where the AI cites the wrong source for a claim.
 *
 * Works in two modes:
 * - Lexical (default): Fast, deterministic overlap scoring between
 *   the claim text near [N] and the actual source N content.
 * - Semantic (optional): Uses embeddings for deeper similarity check.
 *   Requires AI SDK and is slower.
 *
 * Usage:
 *   const result = verifyCitations(response, sourceChunks);
 *   if (result.issues.length > 0) { ... flag or re-generate ... }
 */

export interface SourceChunk {
  sourceIndex: number; // 1-based, matches [N] in the response
  text: string;
  sectionType?: string | null;
  pageNumber?: number | null;
}

export interface CitationClaim {
  citationNumber: number;
  claimText: string; // The sentence or clause containing the [N] marker
  startIndex: number; // Position in the response
}

export interface CitationVerification {
  citationNumber: number;
  claimText: string;
  sourceText: string;
  overlapScore: number; // 0-1, how much the claim text overlaps with source
  isValid: boolean; // true if overlapScore >= threshold
  matchedTerms: string[]; // Key terms that matched
  unmatchedClaims: string[]; // Factual claims in the sentence that don't appear in source
}

export interface VerificationResult {
  totalCitations: number;
  validCitations: number;
  invalidCitations: number;
  missingSourceCitations: number; // Citations referencing non-existent sources
  verifications: CitationVerification[];
  issues: string[];
  overallAccuracy: number; // 0-1
}

/**
 * Extract citation claims from a response.
 * For each [N] marker, extracts the surrounding sentence.
 * Strips the "Sources:" footer section to avoid false positives.
 */
export function extractCitationClaims(response: string): CitationClaim[] {
  const claims: CitationClaim[] = [];

  // Strip the Sources/References section at the end — it contains [N] markers
  // that are reference labels, not citation claims
  let bodyText = response;
  const sourceSectionMatch = response.match(
    /\n\s*(?:sources?|references?):\s*\n/i
  );
  if (sourceSectionMatch && sourceSectionMatch.index !== undefined) {
    bodyText = response.substring(0, sourceSectionMatch.index);
  }

  // Split into sentences using a smarter approach that handles:
  // - Decimal numbers (0.55, 2.28) — don't split on the dot
  // - Abbreviations (e.g., vs., etc.) — don't split
  // - Citation markers [N] at end of sentence
  // Strategy: replace decimal dots with placeholder, split, then restore
  const placeholder = "\x00DOT\x00";
  const protected_ = bodyText
    .replace(/(\d)\.([\d])/g, `$1${placeholder}$2`) // Protect decimal dots
    .replace(/(vs|etc|e\.g|i\.e|Dr|Mr|Mrs|et al)\./gi, `$1${placeholder}`); // Protect abbreviations

  // Split on sentence boundaries (. ! ? or newline)
  const rawSentences = protected_.split(/(?<=[.!?])\s+|\n+/);

  for (let i = 0; i < rawSentences.length; i++) {
    // Restore dots
    const sentence = rawSentences[i]
      .replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), ".")
      .trim();
    if (!sentence || sentence.length < 5) continue;

    // Calculate start index in original text (approximate)
    const startIndex = bodyText.indexOf(sentence.substring(0, 20));

    // Find all [N] citations in this sentence
    const citationMatches = sentence.matchAll(/\[(\d+)\]/g);
    for (const cm of citationMatches) {
      const citationNum = parseInt(cm[1], 10);
      if (
        !claims.some(
          (c) => c.citationNumber === citationNum && c.claimText === sentence
        )
      ) {
        claims.push({
          citationNumber: citationNum,
          claimText: sentence,
          startIndex: startIndex >= 0 ? startIndex : 0,
        });
      }
    }
  }

  return claims;
}

/**
 * Extract significant terms from text for overlap comparison.
 * Filters out common stop words and short words.
 */
function extractSignificantTerms(text: string): string[] {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "is",
    "was",
    "were",
    "are",
    "been",
    "be",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "shall",
    "can",
    "need",
    "dare",
    "ought",
    "used",
    "to",
    "of",
    "in",
    "for",
    "on",
    "with",
    "at",
    "by",
    "from",
    "as",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "between",
    "and",
    "but",
    "or",
    "nor",
    "not",
    "so",
    "yet",
    "both",
    "either",
    "neither",
    "each",
    "every",
    "all",
    "any",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "only",
    "own",
    "same",
    "than",
    "too",
    "very",
    "just",
    "also",
    "that",
    "this",
    "these",
    "those",
    "it",
    "its",
    "which",
    "who",
    "whom",
    "what",
    "when",
    "where",
    "how",
    "there",
    "their",
    "they",
    "them",
    "then",
    "here",
  ]);

  return text
    .toLowerCase()
    .replace(/\[\d+\]/g, "") // Remove citation markers
    .replace(/[^\w\s.-]/g, " ") // Keep dots and hyphens for numbers
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));
}

/**
 * Extract numerical values and statistical terms from text.
 * These are the highest-signal terms for citation verification.
 */
function extractNumericalTerms(text: string): string[] {
  const patterns = [
    /\d+\.?\d*/g, // Plain numbers
    /\d+\.\d+[-–]\d+\.\d+/g, // CI ranges
    /[<>=]+\s*\d+\.?\d*/g, // Comparisons like <0.001
    /\d+\s*%/g, // Percentages
  ];

  const terms: string[] = [];
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const m of matches) {
      terms.push(m[0].replace(/\s+/g, ""));
    }
  }
  return terms;
}

/**
 * Calculate overlap score between a claim and a source chunk.
 * Uses a weighted combination of term overlap and numerical match.
 */
function calculateOverlapScore(
  claimText: string,
  sourceText: string
): { score: number; matchedTerms: string[]; unmatchedClaims: string[] } {
  const claimTerms = extractSignificantTerms(claimText);
  const sourceTerms = new Set(extractSignificantTerms(sourceText));
  const sourceLower = sourceText.toLowerCase();

  // Term overlap
  const matchedTerms: string[] = [];
  const unmatchedTerms: string[] = [];

  for (const term of claimTerms) {
    if (sourceTerms.has(term) || sourceLower.includes(term)) {
      matchedTerms.push(term);
    } else {
      unmatchedTerms.push(term);
    }
  }

  // Numerical match (higher weight — numbers are the most important signal)
  const claimNumbers = extractNumericalTerms(claimText);
  const sourceNumbers = new Set(extractNumericalTerms(sourceText));
  let numericalMatch = 1.0;
  const unmatchedNumbers: string[] = [];

  if (claimNumbers.length > 0) {
    const matched = claimNumbers.filter(
      (n) => sourceNumbers.has(n) || sourceLower.includes(n)
    );
    numericalMatch = matched.length / claimNumbers.length;
    const unmatched = claimNumbers.filter(
      (n) => !sourceNumbers.has(n) && !sourceLower.includes(n)
    );
    unmatchedNumbers.push(...unmatched);
  }

  // Weighted score: 60% numerical match, 40% term overlap
  const termOverlap =
    claimTerms.length > 0 ? matchedTerms.length / claimTerms.length : 1.0;
  const score = numericalMatch * 0.6 + termOverlap * 0.4;

  // Unmatched claims: combine factual terms and numbers that didn't match
  const unmatchedClaims = [
    ...unmatchedNumbers.map((n) => `number: ${n}`),
    ...unmatchedTerms.filter(
      (t) =>
        // Only flag significant unmatched terms (medical/statistical terms)
        /\d/.test(t) ||
        t.length > 5
    ),
  ];

  return { score, matchedTerms, unmatchedClaims };
}

/**
 * Verify all citations in a response against their source chunks.
 *
 * @param response The AI-generated response text
 * @param sources Array of source chunks, where sourceIndex matches [N]
 * @param threshold Minimum overlap score to consider a citation valid (default 0.3)
 */
export function verifyCitations(
  response: string,
  sources: SourceChunk[],
  threshold: number = 0.3
): VerificationResult {
  const claims = extractCitationClaims(response);
  const sourceMap = new Map(sources.map((s) => [s.sourceIndex, s]));

  const verifications: CitationVerification[] = [];
  const issues: string[] = [];
  let missingSourceCitations = 0;

  for (const claim of claims) {
    const source = sourceMap.get(claim.citationNumber);

    if (!source) {
      missingSourceCitations++;
      issues.push(
        `Citation [${claim.citationNumber}] references non-existent source`
      );
      continue;
    }

    const { score, matchedTerms, unmatchedClaims } = calculateOverlapScore(
      claim.claimText,
      source.text
    );

    const isValid = score >= threshold;

    const verification: CitationVerification = {
      citationNumber: claim.citationNumber,
      claimText:
        claim.claimText.length > 200
          ? claim.claimText.substring(0, 200) + "..."
          : claim.claimText,
      sourceText:
        source.text.length > 200
          ? source.text.substring(0, 200) + "..."
          : source.text,
      overlapScore: Math.round(score * 100) / 100,
      isValid,
      matchedTerms,
      unmatchedClaims,
    };

    verifications.push(verification);

    if (!isValid) {
      // Try to find the correct source
      let bestSource: { index: number; score: number } | null = null;
      for (const [idx, src] of sourceMap) {
        if (idx === claim.citationNumber) continue;
        const { score: altScore } = calculateOverlapScore(
          claim.claimText,
          src.text
        );
        if (!bestSource || altScore > bestSource.score) {
          bestSource = { index: idx, score: altScore };
        }
      }

      let suggestion = "";
      if (bestSource && bestSource.score > score + 0.1) {
        suggestion = ` (should likely be [${bestSource.index}], overlap=${bestSource.score.toFixed(2)})`;
      }

      issues.push(
        `Citation [${claim.citationNumber}] has low overlap (${score.toFixed(2)}) with source content${suggestion}`
      );
    }
  }

  const validCount = verifications.filter((v) => v.isValid).length;
  const totalVerified = verifications.length;

  return {
    totalCitations: claims.length,
    validCitations: validCount,
    invalidCitations: totalVerified - validCount,
    missingSourceCitations,
    verifications,
    issues,
    overallAccuracy: totalVerified > 0 ? validCount / totalVerified : 1.0,
  };
}

/**
 * Format verification result for logging/debugging.
 */
export function formatVerificationResult(result: VerificationResult): string {
  const lines: string[] = [];
  lines.push(`Citation Verification: ${result.validCitations}/${result.totalCitations} valid (${(result.overallAccuracy * 100).toFixed(0)}%)`);

  for (const v of result.verifications) {
    const status = v.isValid ? "✓" : "✗";
    lines.push(`  ${status} [${v.citationNumber}] overlap=${v.overlapScore} — matched: ${v.matchedTerms.slice(0, 5).join(", ")}`);
    if (v.unmatchedClaims.length > 0) {
      lines.push(`    unmatched: ${v.unmatchedClaims.join(", ")}`);
    }
  }

  if (result.issues.length > 0) {
    lines.push(`  Issues:`);
    for (const issue of result.issues) {
      lines.push(`    - ${issue}`);
    }
  }

  return lines.join("\n");
}
