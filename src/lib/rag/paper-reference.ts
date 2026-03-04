/**
 * Paper Reference Detection for Notebook RAG
 *
 * Extracts trial names/abbreviations from paper titles and detects
 * when a user query references specific papers.
 *
 * Example: "DAPA-HF: Dapagliflozin in Patients..." -> detects "DAPA-HF"
 */

export interface PaperReference {
  id: number;
  title: string;
}

/**
 * Extract trial abbreviation from a paper title.
 *
 * Trial abbreviations are typically:
 * - At the start of the title, followed by a colon
 * - In ALL CAPS or mixed case with hyphens
 * - Examples: "DAPA-HF:", "PARADIGM-HF:", "EMPEROR-Reduced:"
 */
function extractTrialAbbreviation(title: string): string[] {
  const abbreviations: string[] = [];

  // Pattern 1: Trial name at start followed by colon (e.g., "DAPA-HF: ...", "EMPEROR-Reduced: ...")
  // Matches uppercase letters, numbers, and hyphens - allows mixed case
  const colonPattern = /^([A-Z][A-Za-z0-9]+(?:[-–][A-Za-z0-9]+)*)[:：]\s*/;
  const colonMatch = title.match(colonPattern);
  if (colonMatch) {
    abbreviations.push(colonMatch[1]);
  }

  // Pattern 2: Trial name in parentheses at end (e.g., "... (PARADIGM-HF)")
  const parenPattern = /\(([A-Z][A-Z0-9]+(?:-[A-Z0-9]+)*)\)$/;
  const parenMatch = title.match(parenPattern);
  if (parenMatch) {
    abbreviations.push(parenMatch[1]);
  }

  // Pattern 3: Common trial name patterns within the title
  // Matches words that are ALL CAPS or have specific trial-like patterns
  const wordPattern = /\b([A-Z]{2,}(?:-[A-Z]{2,})+)\b/g;
  const words = title.match(wordPattern);
  if (words) {
    // Filter out common words that might be all caps but aren't trial names
    const commonWords = new Set([
      "HR", "CI", "P", "NYHA", "LVEF", "EF", "CV", "HF", "HFpEF", "HFrEF",
      "SGLT2", "ACE", "ARB", "ARNI", "BB", "MRA",
    ]);
    for (const word of words) {
      if (!commonWords.has(word)) {
        abbreviations.push(word);
      }
    }
  }

  return abbreviations;
}

/**
 * Normalize a string for case-insensitive comparison.
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/\s+/g, " ").trim();
}

/**
 * Detect which papers are referenced in a user's query.
 *
 * @param query - The user's natural language query
 * @param papers - Array of papers with id and title
 * @returns Array of paper IDs that are referenced in the query
 *
 * @example
 * detectPaperReference("What does DAPA-HF say about mortality?", [
 *   { id: 1, title: "DAPA-HF: Dapagliflozin in Patients..." },
 *   { id: 2, title: "EMPEROR-Reduced: Empagliflozin..." }
 * ])
 * // Returns: [1]
 */
export function detectPaperReference(
  query: string,
  papers: readonly PaperReference[]
): number[] {
  const normalizedQuery = normalize(query);
  const referencedIds: number[] = [];

  for (const paper of papers) {
    const abbreviations = extractTrialAbbreviation(paper.title);

    for (const abbr of abbreviations) {
      const normalizedAbbr = normalize(abbr);

      // Check if the trial abbreviation appears as a whole word/phrase in the query
      // Using word boundaries to avoid partial matches
      const escapedAbbr = normalizedAbbr.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const pattern = new RegExp(`\\b${escapedAbbr}\\b`, "i");
      const exactMatch = pattern.test(normalizedQuery);

      // Also check for direct substring match (for hyphenated names like "DAPA-HF")
      const substringMatch = normalizedQuery.includes(normalizedAbbr);

      if (exactMatch || substringMatch) {
        // Avoid false positives: the abbreviation should not be part of a larger word
        // and the match should be significant (at least 3 chars)
        if (normalizedAbbr.length >= 3) {
          referencedIds.push(paper.id);
          break; // Found this paper, move to next
        }
      }
    }

    // Also check if any significant words from the title (after the colon)
    // appear in the query - but only for exact matches to avoid false positives
    const titleAfterColon = paper.title.split(/:\s*/).slice(1).join(":");
    if (titleAfterColon) {
      const titleWords = titleAfterColon
        .split(/\s+/)
        .filter((w) => w.length > 5); // Only significant words
      const queryWords = normalizedQuery.split(/\s+/);
      const matchCount = titleWords.filter((w) =>
        queryWords.some((qw) => normalize(qw) === normalize(w))
      ).length;
      // Only match if 2+ significant title words appear (stronger signal)
      if (matchCount >= 2 && !referencedIds.includes(paper.id)) {
        referencedIds.push(paper.id);
      }
    }
  }

  return referencedIds;
}

/**
 * Create a paper reference detection function for use in tests.
 * This is the default export for easy importing.
 */
export default detectPaperReference;
