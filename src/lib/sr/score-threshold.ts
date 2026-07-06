import { isRemovedDuplicate, type SrReview } from "./types";

/** Elicit's default cut sits just below the "confident include" band. */
export const DEFAULT_SCORE_THRESHOLD = 4.0;

export interface ScoreTally {
  evaluated: number;
  /** Studies the AI would suggest including at this threshold. */
  aiInclude: number;
  aiExclude: number;
}

/**
 * Preview how the AI's inclusion-score cut partitions the screening pool.
 * This tunes the AI *suggestion* boundary only — the blinded human dual-vote
 * remains the system of record.
 */
export function deriveScoreTally(
  review: SrReview,
  threshold: number,
): ScoreTally {
  const scored = review.candidates.filter(
    (candidate) => !isRemovedDuplicate(candidate) && candidate.aiReasoning,
  );
  const aiInclude = scored.filter(
    (candidate) => (candidate.aiReasoning?.score ?? 0) >= threshold,
  ).length;

  return {
    evaluated: scored.length,
    aiInclude,
    aiExclude: scored.length - aiInclude,
  };
}
