import { deriveTaStatus } from "./screening";
import {
  isRemovedDuplicate,
  type Candidate,
  type Reviewer,
  type SrReview,
  type TaState,
  type TaVote,
} from "./types";

export interface KappaReadout {
  value: number | null;
  label: string;
}

function isPositive(vote: TaVote): boolean {
  return vote === "yes" || vote === "maybe";
}

function kappaLabel(value: number): string {
  if (value < 0.01) return "Poor";
  if (value <= 0.2) return "Slight";
  if (value <= 0.4) return "Fair";
  if (value <= 0.6) return "Moderate";
  if (value <= 0.8) return "Substantial";
  return "Almost perfect";
}

/**
 * Cohen's κ over the include/exclude collapse of the first two votes on each
 * dual-voted study (maybe and yes both count as include).
 */
export function cohensKappa(states: TaState[]): KappaReadout {
  const pairs = states
    .filter((state) => state.votes.length >= 2)
    .map((state) => ({
      a: isPositive(state.votes[0].vote),
      b: isPositive(state.votes[1].vote),
    }));

  const n = pairs.length;
  if (n === 0) return { value: null, label: "Not enough data" };

  const agree = pairs.filter((pair) => pair.a === pair.b).length;
  const po = agree / n;

  const aPos = pairs.filter((pair) => pair.a).length / n;
  const bPos = pairs.filter((pair) => pair.b).length / n;
  const pe = aPos * bPos + (1 - aPos) * (1 - bPos);

  const value = pe === 1 ? 1 : (po - pe) / (1 - pe);
  return { value, label: kappaLabel(value) };
}

export interface ConflictVoter {
  id: string;
  name: string;
  initials: string;
}

export interface ConflictItem {
  candidate: Candidate;
  /** Who cast a vote — never what they voted (anti-anchoring). */
  voters: ConflictVoter[];
}

export interface ConflictQueue {
  decision: ConflictItem[];
  reason: ConflictItem[];
  kappa: KappaReadout;
}

function votersOf(candidate: Candidate, reviewers: Reviewer[]): ConflictVoter[] {
  return candidate.ta.votes
    .map((vote) => reviewers.find((r) => r.id === vote.reviewerId))
    .filter((reviewer): reviewer is Reviewer => Boolean(reviewer))
    .map(({ id, name, initials }) => ({ id, name, initials }));
}

/** The blinded conflict queue + the review's inter-rater agreement. */
export function deriveConflictQueue(review: SrReview): ConflictQueue {
  const pool = review.candidates.filter(
    (candidate) => !isRemovedDuplicate(candidate),
  );

  const decision = pool
    .filter((candidate) => deriveTaStatus(candidate.ta) === "conflict")
    .map((candidate) => ({
      // Blind the resolver structurally: strip the votes before handing the
      // candidate to the queue so their decision can't anchor on the votes.
      candidate: { ...candidate, ta: { votes: [], resolution: undefined } },
      voters: votersOf(candidate, review.reviewers),
    }));

  return {
    decision,
    // Reason conflicts (both exclude on different reasons) arise at full text.
    reason: [],
    kappa: cohensKappa(pool.map((candidate) => candidate.ta)),
  };
}
