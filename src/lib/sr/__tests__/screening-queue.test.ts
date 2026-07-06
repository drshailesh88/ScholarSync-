import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import {
  deriveScreeningQueue,
  otherReviewerBlindState,
} from "../screening-queue";

const review = createMockReview();

describe("deriveScreeningQueue", () => {
  const queue = deriveScreeningQueue(review, "you");

  it("counts the reviewer's tab buckets", () => {
    expect(queue.tabs).toEqual({
      toScreen: 114,
      conflicts: 74,
      awaitingOther: expect.any(Number),
      irrelevant: 76,
    });
  });

  it("orders the to-screen list with the exemplar study first", () => {
    expect(queue.toScreen[0].refId).toBe(2241);
    expect(queue.toScreen).toHaveLength(114);
  });

  it("only queues studies the reviewer has not yet voted on", () => {
    const votedIds = new Set(
      review.candidates
        .filter((c) => c.ta.votes.some((v) => v.reviewerId === "you"))
        .map((c) => c.id),
    );
    expect(queue.toScreen.every((c) => !votedIds.has(c.id))).toBe(true);
  });
});

describe("otherReviewerBlindState", () => {
  it("hides the partner's decision until the current reviewer votes", () => {
    const anker = review.candidates.find((c) => c.refId === 2241)!;
    const state = otherReviewerBlindState(anker, "you", review.reviewers);
    expect(state.blinded).toBe(true);
    expect(state.other?.name).toBe("Emma Reyes");
    expect(state).not.toHaveProperty("otherVote");
  });

  it("stays blinded even after the current reviewer votes (revealed only at reconciliation)", () => {
    const anker = review.candidates.find((c) => c.refId === 2241)!;
    const voted = {
      ...anker,
      ta: { votes: [{ reviewerId: "you", vote: "yes" as const }] },
    };
    const state = otherReviewerBlindState(voted, "you", review.reviewers);
    expect(state.blinded).toBe(true);
  });
});
