/**
 * RALPH Scorer
 *
 * Analyzes AI responses for citation accuracy, grounding, hallucination,
 * completeness, and readability. Works in both mock and live modes.
 */

import {
  verifyCitations,
  type SourceChunk,
} from "../../citation-verifier";
import type {
  MockChunk,
  TestQuery,
  ScoreBreakdown,
  QueryResult,
  PromptAnalysis,
} from "./types";

/**
 * Extract all [N] citation markers from a response text.
 * Returns unique citation numbers found.
 */
export function extractCitations(response: string): number[] {
  const matches = response.matchAll(/\[(\d+)\]/g);
  const citations = new Set<number>();
  for (const match of matches) {
    citations.add(parseInt(match[1], 10));
  }
  return [...citations].sort((a, b) => a - b);
}

/**
 * Check if the response contains any of the forbidden content strings.
 */
export function checkForbiddenContent(
  response: string,
  forbidden: string[]
): string[] {
  const violations: string[] = [];
  const lower = response.toLowerCase();
  for (const term of forbidden) {
    if (lower.includes(term.toLowerCase())) {
      violations.push(`Contains forbidden content: "${term}"`);
    }
  }
  return violations;
}

/**
 * Check if response includes a Sources section at the end.
 */
export function hasSourcesSection(response: string): boolean {
  return /sources?:/i.test(response);
}

/**
 * Check if statistical values in response match the source chunks.
 */
export function checkStatisticalAccuracy(
  response: string,
  chunks: MockChunk[]
): { accurate: string[]; hallucinated: string[] } {
  // Extract numbers/stats patterns from response
  const statsPatterns = [
    /HR\s*[\d.]+/gi,
    /\d+\.\d+[-–]\d+\.\d+/g, // CI ranges like 0.65-0.85
    /P\s*[<>=]\s*[\d.]+/gi,
    /\d+\.\d+\s*months/gi,
    /NNT\s*(?:was\s*)?\d+/gi,
  ];

  const responseStats: string[] = [];
  for (const pattern of statsPatterns) {
    const matches = response.matchAll(pattern);
    for (const m of matches) {
      responseStats.push(m[0]);
    }
  }

  const allChunkText = chunks.map((c) => c.text).join(" ");
  const accurate: string[] = [];
  const hallucinated: string[] = [];

  for (const stat of responseStats) {
    // Normalize for comparison (remove spaces, lowercase)
    const normalized = stat.replace(/\s+/g, "").toLowerCase();
    const chunkNormalized = allChunkText.replace(/\s+/g, "").toLowerCase();
    if (chunkNormalized.includes(normalized)) {
      accurate.push(stat);
    } else {
      // Try a looser match — just check the numbers
      const numbers = stat.match(/[\d.]+/g);
      const anyMatch = numbers?.some((n) => allChunkText.includes(n));
      if (anyMatch) {
        accurate.push(stat);
      } else {
        hallucinated.push(stat);
      }
    }
  }

  return { accurate, hallucinated };
}

/**
 * Score a single query response.
 */
export function scoreQueryResponse(
  query: TestQuery,
  response: string,
  chunks: MockChunk[]
): QueryResult {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  const citationsFound = extractCitations(response);

  // --- Grounding (30%) ---
  let grounding = 10;

  // Determine if this is a "no-answer-expected" query (no required citations = deflection expected)
  const isDeflectionQuery =
    query.requiredCitations !== undefined && query.requiredCitations.length === 0;

  if (isDeflectionQuery) {
    // For deflection queries, grounding means: does the response acknowledge the sources don't cover this?
    const deflectionPhrases = [
      "don't cover",
      "doesn't cover",
      "do not cover",
      "does not cover",
      "not covered",
      "don't contain",
      "doesn't contain",
      "do not contain",
      "no information",
      "not in your sources",
      "not in the sources",
      "sources don't",
      "sources do not",
      "not specifically",
      "not addressed",
    ];
    const hasDeflection = deflectionPhrases.some((phrase) =>
      response.toLowerCase().includes(phrase)
    );
    if (hasDeflection) {
      grounding = 10;
      passedChecks.push("Correctly identifies topic is not in sources");
    } else {
      grounding = 2;
      issues.push(
        "Failed to acknowledge that sources don't cover the requested topic"
      );
    }

    // Penalize if it cites sources for off-topic claims
    if (citationsFound.length > 0) {
      // Check if citations are used appropriately (e.g., "your sources cover X instead [1]")
      // vs inappropriately (claiming sources say something about the off-topic query)
      const responseLower = response.toLowerCase();
      const isAppropriateUse =
        responseLower.includes("instead") ||
        responseLower.includes("do cover") ||
        responseLower.includes("does cover") ||
        responseLower.includes("here is what");
      if (!isAppropriateUse) {
        grounding = Math.max(1, grounding - 4);
        issues.push(
          "Cited sources for information not contained in them"
        );
      } else {
        passedChecks.push(
          "Citations used appropriately to indicate what sources DO cover"
        );
      }
    }
  } else {
    // Standard grounding check: factual claims should have citations
    // Protect decimal dots (e.g., 0.74, -2.28, P<0.001) and abbreviations
    // from being treated as sentence boundaries
    const PLACEHOLDER = "\x00DOT\x00";
    const protectedResponse = response
      .replace(/(\d)\.(\d)/g, `$1${PLACEHOLDER}$2`) // decimal numbers
      .replace(/(vs)\.(\s)/gi, `$1${PLACEHOLDER}$2`) // "vs."
      .replace(/(et al)\./gi, `$1${PLACEHOLDER}`) // "et al."
      .replace(/(Dr|Mr|Mrs|Ms)\./gi, `$1${PLACEHOLDER}`); // titles
    const sentences = protectedResponse
      .split(/[.!?]+/)
      .map((s) => s.replaceAll(PLACEHOLDER, "."))
      .filter((s) => s.trim().length > 20);
    // Exclude structural/meta lines from factual detection:
    // - Section headers (## Heading, **Bold heading**)
    // - Dialogue markers (**Host:**, **Expert:**)
    // - Review questions (numbered questions without data)
    const isStructuralLine = (s: string): boolean => {
      const trimmed = s.trim();
      return /^\*\*(Host|Expert|Q|A)[\s:*]/.test(trimmed) && !/\d{2,}/.test(trimmed) || // dialogue markers without data
        /^#{1,3}\s/.test(trimmed) || // markdown headers
        /^\d+\.\s+\w+.*\?$/.test(trimmed); // numbered questions
    };

    const factualSentences = sentences.filter(
      (s) =>
        !isStructuralLine(s) && (
          /\d/.test(s) || // Contains numbers
          /found|showed|demonstrated|reduced|increased|significant/i.test(s) // Factual language
        )
    );

    // Contextual grounding: a synthesis sentence that contains no new statistical
    // data (no numbers, HR, OR, CI, p-values) is considered "contextually grounded"
    // if at least one of the 3 preceding sentences in the full list has a [N] citation.
    // Extended to 3-sentence lookback for conversational formats (Host/Expert interleaving).
    const hasStatisticalContent = (s: string): boolean =>
      /\d/.test(s) || /\b(HR|OR|CI|RR|NNT|p\s*[<>=])\b/i.test(s);

    const isContextuallyGrounded = (s: string): boolean => {
      if (/\[\d+\]/.test(s)) return true; // directly cited
      if (hasStatisticalContent(s)) return false; // has new data — needs own citation
      // Look back at the 3 preceding sentences in the full list
      const idx = sentences.indexOf(s);
      if (idx <= 0) return false;
      const lookback = sentences.slice(Math.max(0, idx - 3), idx);
      return lookback.some((prev) => /\[\d+\]/.test(prev));
    };

    const citedFactualSentences = factualSentences.filter((s) =>
      isContextuallyGrounded(s)
    );
    if (factualSentences.length > 0) {
      const citationRate =
        citedFactualSentences.length / factualSentences.length;
      if (citationRate < 0.5) {
        grounding = Math.max(1, Math.round(citationRate * 10));
        issues.push(
          `Only ${Math.round(citationRate * 100)}% of factual sentences have citations`
        );
      } else if (citationRate < 1.0) {
        grounding = Math.max(5, Math.round(citationRate * 10));
        issues.push(
          `${Math.round(citationRate * 100)}% of factual sentences have citations (target: 100%)`
        );
      } else {
        passedChecks.push("All factual sentences have citations");
      }
    }
  }

  // --- Citation Accuracy (25%) ---
  // Now uses the citation verifier for content-level verification
  let citationAccuracy = 10;
  if (citationsFound.length === 0 && chunks.length > 0 && !isDeflectionQuery) {
    citationAccuracy = 1;
    issues.push("No citations found in response despite having source chunks");
  } else if (isDeflectionQuery && citationsFound.length === 0) {
    // No citations is correct for deflection queries
    citationAccuracy = 10;
    passedChecks.push("Correctly avoided citing sources for off-topic question");
  } else {
    // Check required citations
    if (query.requiredCitations) {
      const missing = query.requiredCitations.filter(
        (c) => !citationsFound.includes(c)
      );
      if (missing.length > 0) {
        citationAccuracy -= missing.length * 3;
        issues.push(`Missing required citations: [${missing.join("], [")}]`);
      } else {
        passedChecks.push("All required citations present");
      }
    }
    // Check for out-of-range citations
    const maxSource = chunks.length;
    const outOfRange = citationsFound.filter((c) => c > maxSource || c < 1);
    if (outOfRange.length > 0) {
      citationAccuracy -= outOfRange.length * 2;
      issues.push(`Out-of-range citations: [${outOfRange.join("], [")}]`);
    }

    // Citation content verification (Cycle 2)
    const sourceChunks: SourceChunk[] = chunks.map((c, i) => ({
      sourceIndex: i + 1,
      text: c.text,
      sectionType: c.section_type,
      pageNumber: c.page_number,
    }));
    const verification = verifyCitations(response, sourceChunks);
    if (verification.invalidCitations > 0) {
      citationAccuracy -= verification.invalidCitations * 2;
      issues.push(
        `Citation content mismatch: ${verification.invalidCitations} citation(s) don't match their source content`
      );
      for (const issue of verification.issues) {
        issues.push(`  CV: ${issue}`);
      }
    }
    if (verification.validCitations > 0 && verification.invalidCitations === 0) {
      passedChecks.push(
        `Citation verifier: all ${verification.validCitations} citations match source content (avg overlap: ${(verification.overallAccuracy * 100).toFixed(0)}%)`
      );
    }
  }
  citationAccuracy = Math.max(1, citationAccuracy);

  // --- Hallucination Resistance (25%) ---
  let hallucinationResistance = 10;
  // Check forbidden content
  if (query.forbiddenContent) {
    const violations = checkForbiddenContent(response, query.forbiddenContent);
    if (violations.length > 0) {
      hallucinationResistance -= violations.length * 2;
      issues.push(...violations);
    } else {
      passedChecks.push("No forbidden content detected");
    }
  }
  // Check statistical accuracy
  const statCheck = checkStatisticalAccuracy(response, chunks);
  if (statCheck.hallucinated.length > 0) {
    hallucinationResistance -= statCheck.hallucinated.length * 3;
    issues.push(
      `Hallucinated statistics: ${statCheck.hallucinated.join(", ")}`
    );
  }
  if (statCheck.accurate.length > 0) {
    passedChecks.push(
      `${statCheck.accurate.length} statistical values verified against sources`
    );
  }
  hallucinationResistance = Math.max(1, hallucinationResistance);

  // --- Completeness (10%) ---
  let completeness = 5; // Default middle
  // Check expected behaviors using multi-strategy matching:
  // 1. Extract keywords (length > 3 to catch numbers like "0.74", "[1]")
  // 2. For negation expectations ("Does NOT..."), verify the negated content is absent
  // 3. For citation expectations ("[N]"), check citation markers directly
  const matchExpectedBehavior = (expected: string, resp: string): boolean => {
    const lower = resp.toLowerCase();
    const expectedLower = expected.toLowerCase();

    // Negation check: "Does NOT mention X" / "Does NOT hallucinate X" / "Does NOT cite X"
    const negationMatch = expectedLower.match(
      /does\s+not\s+(?:mention|hallucinate|cite|fabricate|claim|include|contain|present|use|make|mix)/
    );
    if (negationMatch) {
      // Extract what should NOT be present — the keywords after the negation verb
      const afterVerb = expectedLower.split(negationMatch[0])[1]?.trim() || "";
      const forbiddenKeywords = afterVerb
        .split(/\s+/)
        .filter((w) => w.length > 3 && !/^(that|this|from|with|into|about|their|they|them|these|those|been|have|will|just|like|than|then|when|what|which|also|does|here|only|such|very|each|some|more|both|many|most|same|even|back|over|data|info|were|should|could|would)$/.test(w));
      if (forbiddenKeywords.length > 0) {
        // Check none of the forbidden keywords appear
        const hasForbidden = forbiddenKeywords.some((k) => lower.includes(k));
        return !hasForbidden;
      }
      return true; // Can't determine what's forbidden — pass
    }

    // Citation marker check: "[1]", "[2]" etc.
    const citationRefs = expected.match(/\[(\d+)\]/g);
    if (citationRefs && citationRefs.length > 0) {
      const allPresent = citationRefs.every((ref) => resp.includes(ref));
      if (allPresent) return true;
    }

    // Numeric value check: look for specific numbers like "0.74", "21", "4744"
    const numbers = expected.match(/\d+\.?\d*/g);
    if (numbers && numbers.length > 0) {
      const numbersFound = numbers.filter((n) => resp.includes(n));
      if (numbersFound.length > 0) return true;
    }

    // Standard keyword matching (length > 3 instead of > 4 to catch more terms)
    // Split on whitespace, slashes, and strip parentheses for compound terms
    const keywords = expectedLower
      .replace(/[()]/g, "")
      .split(/[\s/]+/)
      .filter((w) => w.length > 3 && !/^(that|this|from|with|into|about|their|they|them|these|those|been|have|will|just|like|than|then|when|what|which|also|does|here|only|such|very|each|some|more|both|many|most|same|even|back|over|were|should|could|would)$/.test(w));
    const matched = keywords.filter((k) => lower.includes(k));
    // Require at least 40% of keywords to match (more lenient than just "any")
    return matched.length >= Math.max(1, Math.ceil(keywords.length * 0.4));
  };

  const expectedMatches = query.expectedBehavior.filter((expected) =>
    matchExpectedBehavior(expected, response)
  );
  completeness = Math.round(
    (expectedMatches.length / query.expectedBehavior.length) * 10
  );
  completeness = Math.max(1, completeness);
  if (expectedMatches.length === query.expectedBehavior.length) {
    passedChecks.push("All expected behaviors matched");
  } else {
    const missing = query.expectedBehavior.filter(
      (expected) => !matchExpectedBehavior(expected, response)
    );
    if (missing.length > 0) {
      issues.push(`Missing expected behaviors: ${missing.join("; ")}`);
    }
  }

  // --- Readability (10%) ---
  let readability = 7; // Default decent
  if (response.length < 50) {
    readability = 3;
    issues.push("Response too short");
  }
  if (response.length > 3000) {
    readability = Math.max(4, readability - 2);
    issues.push("Response excessively long");
  }
  if (hasSourcesSection(response)) {
    readability = Math.min(10, readability + 1);
    passedChecks.push("Response includes Sources section");
  } else if (isDeflectionQuery) {
    // Deflection queries don't need a Sources section
    readability = Math.min(10, readability + 1);
    passedChecks.push("No Sources section needed for deflection response");
  } else {
    readability = Math.max(1, readability - 2);
    issues.push("Missing Sources section at end of response");
  }
  // Check for structure (paragraphs, not a wall of text)
  const paragraphs = response.split(/\n\n+/).filter((p) => p.trim().length > 0);
  if (paragraphs.length >= 2) {
    readability = Math.min(10, readability + 1);
  }

  const scores: ScoreBreakdown = {
    grounding,
    citationAccuracy,
    completeness,
    hallucinationResistance,
    readability,
  };

  // Weighted average: Grounding 30%, Citation 25%, Hallucination 25%, Completeness 10%, Readability 10%
  const weightedScore =
    grounding * 0.3 +
    citationAccuracy * 0.25 +
    hallucinationResistance * 0.25 +
    completeness * 0.1 +
    readability * 0.1;

  return {
    queryId: query.id,
    query: query.query,
    response,
    citationsFound,
    scores,
    weightedScore: Math.round(weightedScore * 100) / 100,
    issues,
    passedChecks,
  };
}

/**
 * Analyze the constructed system prompt for correctness.
 */
export function analyzePrompt(
  systemPrompt: string,
  expectedChunkCount: number,
  expectedPaperTitles: string[]
): PromptAnalysis {
  const sourceBlocks = (systemPrompt.match(/\[Source \d+\]/g) || []).length;

  const labelsCorrect =
    sourceBlocks === expectedChunkCount &&
    Array.from({ length: expectedChunkCount }, (_, i) =>
      systemPrompt.includes(`[Source ${i + 1}]`)
    ).every(Boolean);

  const rulesPresent =
    systemPrompt.includes("CRITICAL GROUNDING RULES") &&
    systemPrompt.includes("[1]") &&
    systemPrompt.includes("ONLY use information from the sources above");

  const titlesPresent = expectedPaperTitles.filter((t) =>
    systemPrompt.includes(t)
  );

  const sectionTypes = ["abstract", "introduction", "methods", "results", "discussion", "conclusion"]
    .filter((s) => systemPrompt.toLowerCase().includes(`section: ${s}`));

  return {
    totalSourceBlocks: sourceBlocks,
    sourceLabelsCorrect: labelsCorrect,
    citationRulesPresent: rulesPresent,
    chunksIncluded: sourceBlocks,
    paperTitlesPresent: titlesPresent,
    sectionTypesPresent: sectionTypes,
    systemPromptLength: systemPrompt.length,
  };
}
