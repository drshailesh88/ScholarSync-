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

/** Full-text decision is binary; excluding requires a structured reason. */
export type FullTextVote = "include" | "exclude";

export interface FullTextDecision {
  reviewerId: string;
  vote: FullTextVote;
  /** Exclusion-reason code — required whenever vote is `exclude`. */
  reasonCode?: string;
}

export interface FullTextState {
  decisions: FullTextDecision[];
  resolution?: FullTextVote;
  resolutionReasonCode?: string;
}

/** A managed, hierarchical exclusion reason (the PRISMA "with reasons" list). */
export interface ExclusionReason {
  code: string;
  label: string;
  /** Parent code for hierarchy; absent for top-level reasons. */
  parent?: string;
}

/** RoB 2 per-domain and overall judgment (the traffic light). */
export type RobJudgment = "low" | "some_concerns" | "high";

export type RobSignalAnswer =
  | "yes"
  | "probably_yes"
  | "probably_no"
  | "no"
  | "no_information";

export interface RobDomainAssessment {
  domainId: string;
  judgment?: RobJudgment;
  signallingAnswers: Record<string, RobSignalAnswer>;
  /** AI-suggested justification drawn from the methods text. */
  aiJustification?: string;
}

export interface RobAssessment {
  candidateId: string;
  domains: RobDomainAssessment[];
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

export interface AiCriterion {
  label: string;
  detail: string;
  met: boolean;
}

export interface AiReasoning {
  /** Inclusion score out of 5, e.g. 4.9. */
  score: number;
  verdict: TaVote;
  criteria: AiCriterion[];
}

/** Eligibility criteria + the terms highlighted in abstracts. */
export interface ReviewCriteria {
  inclusion: string[];
  exclusion: string[];
  highlightInclude: string[];
  highlightExclude: string[];
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
  /** AI inclusion-score + per-criterion reasoning shown in the assist rail. */
  aiReasoning?: AiReasoning;
  /**
   * AI pre-vote shown as a ringed suggestion only — it never advances a
   * study on its own; the human vote is the system of record.
   */
  aiSuggestion?: TaVote;
  ta: TaState;
  fullText?: FullTextState;
}

export interface SrReview {
  id: string;
  title: string;
  shortTitle: string;
  reviewers: Reviewer[];
  criteria: ReviewCriteria;
  exclusionReasons: ExclusionReason[];
  robAssessments: RobAssessment[];
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
