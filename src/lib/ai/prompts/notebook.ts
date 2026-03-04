/**
 * Notebook AI prompts — stub for notebook-mode queries.
 * Full implementation lives on the notebook feature branch.
 */

/** System prompt addition for comparison-type queries */
export const COMPARISON_PROMPT = `

COMPARISON MODE — Cross-Source Synthesis
You are comparing findings across multiple research papers. Structure your response as follows:

1. Per-Paper Findings
   For each paper, summarize its key findings with proper citations:
   - [Paper Name]: Key result 1 [citation], Key result 2 [citation]
   - Use this format for all papers mentioned

2. Points of Agreement
   Identify areas where findings align:
   - "Both Paper A and Paper B found..."
   - "All trials agree on..."
   - Cite each supporting paper

3. Points of Disagreement
   Clearly state conflicts or differences:
   - "Paper A reported X while Paper B found Y"
   - "Only Paper C showed..."
   - "These differences may be due to..."

4. Synthesis
   Provide a balanced summary noting:
   - Consistent findings across papers
   - Inconsistencies that require clarification
   - Limitations of direct comparisons (different populations, designs, etc.)

CRITICAL: NEVER fabricate a head-to-head comparison unless the sources explicitly report one.
- Do NOT claim "X outperformed Y" unless a direct comparison study exists among your sources
- Do NOT fabricate pooled analyses, network meta-analyses, or indirect comparisons
- When results differ, state the discrepancy clearly rather than choosing a "winner"
- If populations differ (e.g., HFrEF vs HFpEF), explicitly note this limitation`;

/**
 * Check if a query is a comparison-type question.
 *
 * Detects comparison intent through various patterns:
 * - "compare/contrast" queries
 * - "agree/disagree" queries
 * - "differ/difference" queries
 * - "conflicting" queries
 * - "vs/versus" queries
 * - "relationship between X and Y" queries
 */
export function isComparisonQuery(query: string): boolean {
  const patterns = [
    /\bcompar(e|ison|ing|ed)\b/i,
    /\bvs\.?\b/i,
    /\bversus\b/i,
    /\bdifference\b/i,
    /\bhow\s+(?:do|does|did)\s+.+\s+differ\b/i,
    /\bcontrast\b/i,
    /\bagree?s?\b/i,
    /\bdisagree?s?\b/i,
    /\bconflicting?\b/i,
    /\bsimilar\b/i,
    /\brelation\s*(?:ship|s)?\s+between\b/i,
  ];
  return patterns.some((p) => p.test(query));
}
