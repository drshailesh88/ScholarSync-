/**
 * Systematic Review module — core domain types.
 *
 * Shapes follow the build brief (§4): the human vote is always the system of
 * record; AI suggestions never advance a study on their own.
 */

/** Title & abstract vote. `maybe` is a positive vote — it advances the study. */
export type TaVote = "no" | "maybe" | "yes";

export interface TaVoteRecord {
  reviewerId: string;
  vote: TaVote;
}

/** Blinded dual-reviewer state for a study at title & abstract screening. */
export interface TaState {
  votes: TaVoteRecord[];
  /** Agreed final decision recorded at conflict resolution. */
  resolution?: TaVote;
  resolvedBy?: string;
}

/**
 * Dual-reviewer routing outcome for a study at title & abstract screening.
 * - `advanced`   — both votes positive → moves to full-text review
 * - `irrelevant` — both reviewers voted No → removed
 * - `conflict`   — one positive vs one No → lands in Resolve conflicts
 * - `one_vote`   — awaiting the other reviewer (blinded)
 * - `no_votes`   — still to screen
 */
export type TaStatus =
  | "no_votes"
  | "one_vote"
  | "conflict"
  | "advanced"
  | "irrelevant";

export interface Reviewer {
  id: string;
  name: string;
  initials: string;
}

/**
 * Duplicate detection state (Covidence model: match on title · year ·
 * volume · authors). High-confidence pairs auto-merge; uncertain pairs
 * queue for human review and stay in the pool until merged.
 */
export type DupeStatus = "auto_merged" | "merged" | "needs_review" | "kept";

export interface DupeRecord {
  status: DupeStatus;
  /** Which fields matched, e.g. ["title", "year", "first author"]. */
  matchedOn: string[];
  /** refId of the record this candidate appears to duplicate. */
  ofRefId?: number;
}

/** An import batch recorded in the reversible ledger. */
export interface ImportBatch {
  id: string;
  source: string;
  /** Stage the references entered (Covidence: import into a named stage). */
  target: "screen" | "fulltext";
  /** Batch came from AI discovery rather than a file. */
  ai?: boolean;
}

/** A reference imported into the review (one row of the screening pool). */
export interface Candidate {
  id: string;
  refId: number;
  title: string;
  authors: string[];
  journal?: string;
  year?: number;
  doi?: string;
  abstract?: string;
  source: string;
  batchId?: string;
  dupe?: DupeRecord;
  /**
   * AI pre-vote shown as a ringed suggestion only — it never advances a
   * study on its own; the human vote is the system of record.
   */
  aiSuggestion?: TaVote;
  ta: TaState;
}

export interface SrReview {
  id: string;
  title: string;
  shortTitle: string;
  reviewers: Reviewer[];
  batches: ImportBatch[];
  candidates: Candidate[];
}

/** A confirmed duplicate is out of the screening pool; uncertain stays in. */
export function isRemovedDuplicate(candidate: Candidate): boolean {
  return (
    candidate.dupe?.status === "auto_merged" ||
    candidate.dupe?.status === "merged"
  );
}
