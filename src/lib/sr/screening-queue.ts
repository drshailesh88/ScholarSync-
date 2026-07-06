import { deriveTaStatus } from "./screening";
import { isRemovedDuplicate, type Candidate, type Reviewer, type SrReview } from "./types";

export interface ScreeningTabs {
  toScreen: number;
  conflicts: number;
  awaitingOther: number;
  irrelevant: number;
}

export interface ScreeningQueue {
  tabs: ScreeningTabs;
  toScreen: Candidate[];
}

function hasVoted(candidate: Candidate, reviewerId: string): boolean {
  return candidate.ta.votes.some((v) => v.reviewerId === reviewerId);
}

/** The reviewer's screening work: tab counts + the ordered to-screen list. */
export function deriveScreeningQueue(
  review: SrReview,
  reviewerId: string,
): ScreeningQueue {
  const pool = review.candidates.filter(
    (candidate) => !isRemovedDuplicate(candidate),
  );

  const toScreen = pool.filter((candidate) => {
    const status = deriveTaStatus(candidate.ta);
    const open = status === "no_votes" || status === "one_vote";
    return open && !hasVoted(candidate, reviewerId);
  });

  const awaitingOther = pool.filter(
    (candidate) =>
      deriveTaStatus(candidate.ta) === "one_vote" &&
      hasVoted(candidate, reviewerId),
  ).length;

  return {
    tabs: {
      toScreen: toScreen.length,
      conflicts: pool.filter((c) => deriveTaStatus(c.ta) === "conflict").length,
      awaitingOther,
      irrelevant: pool.filter((c) => deriveTaStatus(c.ta) === "irrelevant")
        .length,
    },
    toScreen,
  };
}

export interface BlindState {
  blinded: boolean;
  other?: Reviewer;
}

/**
 * Screening is blinded: a reviewer never sees a colleague's vote here — it is
 * revealed only at reconciliation. We surface *who* the partner is, never
 * *what* they voted.
 */
export function otherReviewerBlindState(
  candidate: Candidate,
  reviewerId: string,
  reviewers: Reviewer[],
): BlindState {
  void candidate;
  const other = reviewers.find(
    (reviewer) => reviewer.id !== reviewerId && reviewer.id !== "you",
  );
  return { blinded: true, other };
}
