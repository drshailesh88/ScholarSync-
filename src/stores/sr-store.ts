import { create } from "zustand";
import { getReviewById } from "@/lib/sr/fixtures";
import type { Candidate, SrReview, TaVote } from "@/lib/sr/types";

/**
 * Client state for the SR module. Holds the active review (seeded from the
 * mock fixtures while the module runs on mock data) and the mutations the
 * screens perform. All counts everywhere derive from this one record.
 */
interface SrStoreState {
  reviewId: string | null;
  review: SrReview | null;
  initReview: (reviewId: string) => void;
  mergeDuplicate: (candidateId: string) => void;
  markNotDuplicate: (candidateId: string) => void;
  undoImport: (batchId: string) => void;
  castTaVote: (candidateId: string, reviewerId: string, vote: TaVote) => void;
}

function updateCandidate(
  review: SrReview,
  candidateId: string,
  update: (candidate: Candidate) => Candidate,
): SrReview {
  return {
    ...review,
    candidates: review.candidates.map((candidate) =>
      candidate.id === candidateId ? update(candidate) : candidate,
    ),
  };
}

export const useSrStore = create<SrStoreState>((set, get) => ({
  reviewId: null,
  review: null,

  initReview: (reviewId) => {
    if (get().reviewId === reviewId && get().review) return;
    set({ reviewId, review: getReviewById(reviewId) });
  },

  mergeDuplicate: (candidateId) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => ({
        ...candidate,
        dupe: candidate.dupe && { ...candidate.dupe, status: "merged" },
      })),
    });
  },

  markNotDuplicate: (candidateId) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => ({
        ...candidate,
        dupe: candidate.dupe && { ...candidate.dupe, status: "kept" },
      })),
    });
  },

  castTaVote: (candidateId, reviewerId, vote) => {
    const { review } = get();
    if (!review) return;
    set({
      review: updateCandidate(review, candidateId, (candidate) => ({
        ...candidate,
        ta: {
          ...candidate.ta,
          votes: [
            ...candidate.ta.votes.filter((v) => v.reviewerId !== reviewerId),
            { reviewerId, vote },
          ],
        },
      })),
    });
  },

  undoImport: (batchId) => {
    const { review } = get();
    if (!review) return;
    set({
      review: {
        ...review,
        batches: review.batches.filter((batch) => batch.id !== batchId),
        candidates: review.candidates.filter(
          (candidate) => candidate.batchId !== batchId,
        ),
      },
    });
  },
}));
