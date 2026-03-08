/**
 * Fuzzy Search Module
 *
 * Provides Levenshtein distance-based fuzzy matching for icon search.
 * Handles typos like "cardiologi" -> "cardiology" and "microsocpe" -> "microscope".
 */

/**
 * Calculate the Levenshtein distance between two strings.
 * Uses an optimized single-row dynamic programming approach.
 */
export function levenshteinDistance(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  // Use single row optimization
  let prevRow = new Array(bLen + 1);
  for (let j = 0; j <= bLen; j++) {
    prevRow[j] = j;
  }

  for (let i = 1; i <= aLen; i++) {
    let prev = i;
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const curr = Math.min(
        prevRow[j] + 1,      // deletion
        prev + 1,             // insertion
        prevRow[j - 1] + cost // substitution
      );
      prevRow[j - 1] = prev;
      prev = curr;
    }
    prevRow[bLen] = prev;
  }

  return prevRow[bLen];
}

/**
 * Calculate a fuzzy match score between a query and target string.
 * Returns a score from 0 to 1, where 1 is an exact match.
 * Returns 0 if the distance exceeds the tolerance threshold.
 */
export function fuzzyMatchScore(query: string, target: string): number {
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  // Exact match
  if (q === t) return 1;

  // Contains match (not fuzzy, but useful)
  if (t.includes(q)) return 0.8;
  if (q.includes(t)) return 0.6;

  // Levenshtein-based fuzzy matching
  const distance = levenshteinDistance(q, t);
  const maxLen = Math.max(q.length, t.length);

  // Tolerance: allow up to ~30% of the string length as edit distance
  const maxDistance = Math.max(2, Math.floor(maxLen * 0.3));

  if (distance > maxDistance) return 0;

  return 1 - distance / maxLen;
}

/**
 * Check if a query fuzzy-matches a target within a tolerance.
 * More lenient for longer strings.
 */
export function isFuzzyMatch(query: string, target: string, maxDistance?: number): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();

  if (t.includes(q) || q.includes(t)) return true;

  const distance = levenshteinDistance(q, t);
  const threshold = maxDistance ?? Math.max(2, Math.floor(Math.max(q.length, t.length) * 0.3));

  return distance <= threshold;
}

/**
 * Find the best fuzzy matches from a list of candidates.
 * Returns candidates sorted by match quality.
 */
export function fuzzySearch(
  query: string,
  candidates: string[],
  maxResults: number = 20
): Array<{ value: string; score: number }> {
  if (!query.trim()) return [];

  const results: Array<{ value: string; score: number }> = [];

  for (const candidate of candidates) {
    const score = fuzzyMatchScore(query, candidate);
    if (score > 0) {
      results.push({ value: candidate, score });
    }

    // Also check individual words of multi-word candidates
    if (score === 0) {
      const words = candidate.toLowerCase().split(/[\s\-_]+/);
      let bestWordScore = 0;
      for (const word of words) {
        const wordScore = fuzzyMatchScore(query.toLowerCase(), word);
        bestWordScore = Math.max(bestWordScore, wordScore);
      }
      if (bestWordScore > 0) {
        results.push({ value: candidate, score: bestWordScore * 0.7 });
      }
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}
