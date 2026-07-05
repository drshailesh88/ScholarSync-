import type { Candidate, FullTextState, SrReview } from "./types";

/** An exclusion is only valid with a structured reason (PRISMA integrity). */
export function canRecordExclusion(reasonCode: string | undefined): boolean {
  return Boolean(reasonCode && reasonCode.length > 0);
}

export type FullTextStatus =
  | "to_review"
  | "one_vote"
  | "conflict"
  | "included"
  | "excluded";

/** Full-text status for a study, from its dual Include/Exclude decisions. */
export function deriveFullTextStatus(
  state: FullTextState | undefined,
): FullTextStatus {
  if (!state) return "to_review";
  if (state.resolution) return state.resolution === "include" ? "included" : "excluded";

  const [a, b] = state.decisions;
  if (a && b) {
    if (a.vote === b.vote) return a.vote === "include" ? "included" : "excluded";
    return "conflict";
  }
  if (a) return "one_vote";
  return "to_review";
}

export interface FullTextTabs {
  toReview: number;
  conflicts: number;
  awaitingOther: number;
  excluded: number;
}

export interface FullTextQueue {
  tabs: FullTextTabs;
  toReview: Candidate[];
}

function reviewerVoted(state: FullTextState | undefined, reviewerId: string) {
  return Boolean(state?.decisions.some((d) => d.reviewerId === reviewerId));
}

/** The reviewer's full-text work: the assessment pool + tab counts. */
export function deriveFullTextQueue(
  review: SrReview,
  reviewerId: string,
): FullTextQueue {
  // Only studies that advanced from title & abstract are assessed here.
  const pool = review.candidates.filter(
    (candidate) => candidate.fullText !== undefined,
  );

  const toReview = pool.filter((candidate) => {
    const status = deriveFullTextStatus(candidate.fullText);
    const open = status === "to_review" || status === "one_vote";
    return open && !reviewerVoted(candidate.fullText, reviewerId);
  });

  const awaitingOther = pool.filter(
    (candidate) =>
      deriveFullTextStatus(candidate.fullText) === "one_vote" &&
      reviewerVoted(candidate.fullText, reviewerId),
  ).length;

  return {
    tabs: {
      toReview: toReview.length,
      conflicts: pool.filter(
        (c) => deriveFullTextStatus(c.fullText) === "conflict",
      ).length,
      awaitingOther,
      excluded: pool.filter(
        (c) => deriveFullTextStatus(c.fullText) === "excluded",
      ).length,
    },
    toReview,
  };
}
