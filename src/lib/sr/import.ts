import type { Candidate, SrReview } from "./types";

export interface LedgerBatch {
  id: string;
  source: string;
  target: "screen" | "fulltext";
  ai?: boolean;
  refs: number;
  duplicatesRemoved: number;
}

export interface ImportLedger {
  batches: LedgerBatch[];
  totalDuplicatesRemoved: number;
}

/** The reversible import history: one card per batch, counts derived. */
export function deriveImportLedger(review: SrReview): ImportLedger {
  const batches = review.batches.map((batch) => {
    const members = review.candidates.filter(
      (candidate) => candidate.batchId === batch.id,
    );
    return {
      id: batch.id,
      source: batch.source,
      target: batch.target,
      ai: batch.ai,
      refs: members.length,
      duplicatesRemoved: members.filter(
        (candidate) =>
          candidate.dupe?.status === "auto_merged" ||
          candidate.dupe?.status === "merged",
      ).length,
    };
  });

  return {
    batches,
    totalDuplicatesRemoved: batches.reduce(
      (total, batch) => total + batch.duplicatesRemoved,
      0,
    ),
  };
}

export interface DupeQueueEntry {
  candidate: Candidate;
  matchedOn: string[];
  original?: Candidate;
}

/** Uncertain duplicate pairs awaiting a human merge / keep decision. */
export function deriveDupeQueue(review: SrReview): DupeQueueEntry[] {
  return review.candidates
    .filter((candidate) => candidate.dupe?.status === "needs_review")
    .map((candidate) => ({
      candidate,
      matchedOn: candidate.dupe?.matchedOn ?? [],
      original: review.candidates.find(
        (other) => other.refId === candidate.dupe?.ofRefId,
      ),
    }));
}
