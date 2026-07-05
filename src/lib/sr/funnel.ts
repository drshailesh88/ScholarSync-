import { deriveTaStatus } from "./screening";
import type { Candidate, SrReview } from "./types";

export interface ScreeningBreakdown {
  total: number;
  /** Studies fully decided at title & abstract (advanced or irrelevant). */
  done: number;
  conflicts: number;
  oneVote: number;
  noVotes: number;
}

export interface ReviewerContribution {
  reviewerId: string;
  name: string;
  screened: number;
}

export interface FunnelSummary {
  imported: number;
  duplicatesRemoved: number;
  screening: ScreeningBreakdown;
  fullText: { toAssess: number };
  contributions: ReviewerContribution[];
  ai: { preScreened: number; suggestedInclude: number };
}

function screeningPool(candidates: Candidate[]): Candidate[] {
  return candidates.filter((candidate) => !candidate.isDuplicate);
}

/** Live counts for the Review Summary funnel, derived from the vote record. */
export function deriveFunnelSummary(review: SrReview): FunnelSummary {
  const pool = screeningPool(review.candidates);
  const statuses = pool.map((candidate) => deriveTaStatus(candidate.ta));
  const count = (status: string) =>
    statuses.filter((s) => s === status).length;

  return {
    imported: review.candidates.length,
    duplicatesRemoved: review.candidates.length - pool.length,
    screening: {
      total: pool.length,
      done: count("advanced") + count("irrelevant"),
      conflicts: count("conflict"),
      oneVote: count("one_vote"),
      noVotes: count("no_votes"),
    },
    fullText: { toAssess: count("advanced") },
    contributions: review.reviewers.map((reviewer) => ({
      reviewerId: reviewer.id,
      name: reviewer.name,
      screened: pool.filter((candidate) =>
        candidate.ta.votes.some((v) => v.reviewerId === reviewer.id),
      ).length,
    })),
    ai: {
      preScreened: pool.filter((candidate) => candidate.aiSuggestion).length,
      suggestedInclude: pool.filter(
        (candidate) =>
          candidate.aiSuggestion === "yes" ||
          candidate.aiSuggestion === "maybe",
      ).length,
    },
  };
}

export interface YourWork {
  toResolve: number;
  toScreen: number;
  screenedSoFar: number;
}

/** The personal call to action: what this reviewer can still do right now. */
export function deriveYourWork(review: SrReview, reviewerId: string): YourWork {
  const pool = screeningPool(review.candidates);
  const hasVoted = (candidate: Candidate) =>
    candidate.ta.votes.some((v) => v.reviewerId === reviewerId);

  const toScreen = pool.filter((candidate) => {
    const status = deriveTaStatus(candidate.ta);
    const open = status === "no_votes" || status === "one_vote";
    return open && !hasVoted(candidate);
  }).length;

  return {
    toResolve: pool.filter(
      (candidate) => deriveTaStatus(candidate.ta) === "conflict",
    ).length,
    toScreen,
    screenedSoFar: pool.filter(hasVoted).length,
  };
}
