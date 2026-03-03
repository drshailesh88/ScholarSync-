/**
 * Notebook AI prompts — stub for notebook-mode queries.
 * Full implementation lives on the notebook feature branch.
 */

/** System prompt addition for comparison-type queries */
export const COMPARISON_PROMPT = `\nWhen comparing items, structure your response with clear sections for each item, followed by a direct comparison of key similarities and differences. Use tables when appropriate.`;

/** Check if a query is a comparison-type question (e.g., "compare X vs Y") */
export function isComparisonQuery(query: string): boolean {
  const patterns = [
    /\bcompar/i,
    /\bvs\.?\b/i,
    /\bversus\b/i,
    /\bdifference\s+between\b/i,
    /\bhow\s+does\s+.+\s+differ\b/i,
    /\bcontrast\b/i,
  ];
  return patterns.some((p) => p.test(query));
}
