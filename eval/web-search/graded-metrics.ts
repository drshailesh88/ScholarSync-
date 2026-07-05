/**
 * Ordering-aware, GRADED IR metrics for the honest gold set (IMPROVEMENT-PLAN §6).
 *
 * These consume the 0-3 graded relevance labels (not binary must-haves) and score a
 * ranked list of result URLs against them — pure functions, no LLM, run in CI in ms.
 * They replace the old set-based gate's blindness to ordering AND to graded relevance.
 *
 *  - gradedNdcgAtK: rank-discounted, gain = 2^grade - 1, normalized by the ideal ranking.
 *  - err: Expected Reciprocal Rank (cascade model) — rewards the best result before dups.
 *  - rbp: Rank-Biased Precision — tunable persistence, robust to shallow judgments.
 */

const MAX_GRADE = 3;

function gain(grade: number): number {
  return Math.pow(2, grade) - 1;
}

export function gradedNdcgAtK(ranked: string[], gold: Map<string, number>, k: number): number {
  const top = ranked.slice(0, k);
  let dcg = 0;
  top.forEach((url, i) => {
    dcg += gain(gold.get(url) ?? 0) / Math.log2(i + 2);
  });
  const idealGrades = [...gold.values()].sort((a, b) => b - a).slice(0, k);
  let idcg = 0;
  idealGrades.forEach((g, i) => {
    idcg += gain(g) / Math.log2(i + 2);
  });
  return idcg === 0 ? 0 : dcg / idcg;
}

/** Expected Reciprocal Rank (Chapelle et al. 2009). rel prob = (2^g - 1) / 2^maxGrade. */
export function err(ranked: string[], gold: Map<string, number>, k: number, maxGrade = MAX_GRADE): number {
  const top = ranked.slice(0, k);
  let score = 0;
  let stopProbSoFar = 1;
  top.forEach((url, i) => {
    const r = gain(gold.get(url) ?? 0) / Math.pow(2, maxGrade);
    score += (stopProbSoFar * r) / (i + 1);
    stopProbSoFar *= 1 - r;
  });
  return score;
}

/** Rank-Biased Precision. RBP = (1-p) · Σ rel_i · p^i, with rel normalized to [0,1]. */
export function rbp(ranked: string[], gold: Map<string, number>, p = 0.8, maxGrade = MAX_GRADE): number {
  let sum = 0;
  ranked.forEach((url, i) => {
    sum += ((gold.get(url) ?? 0) / maxGrade) * Math.pow(p, i);
  });
  return (1 - p) * sum;
}

/** Build a url→grade lookup from labeled rows, keeping the highest grade on duplicates. */
export function goldMapFromLabeled(labeled: { url: string; grade: number }[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const { url, grade } of labeled) {
    m.set(url, Math.max(m.get(url) ?? 0, grade));
  }
  return m;
}
