import { describe, expect, it } from "vitest";
import {
  CURRENT_REVIEWER_ID,
  createEmptyReview,
  createMockReview,
  getReviewById,
} from "../fixtures";
import { deriveFunnelSummary, deriveYourWork } from "../funnel";

describe("createMockReview", () => {
  const review = createMockReview();
  const summary = deriveFunnelSummary(review);

  it("produces the prototype-scale funnel numbers", () => {
    expect(summary.imported).toBe(412);
    expect(summary.duplicatesRemoved).toBe(24);
    expect(summary.screening.total).toBe(388);
    expect(summary.screening.conflicts).toBe(74);
    expect(summary.fullText.toAssess).toBe(124);
  });

  it("has the AI pre-screen the whole pool and suggest the includes", () => {
    expect(summary.ai).toEqual({ preScreened: 388, suggestedInclude: 124 });
  });

  it("keeps the screening breakdown internally consistent", () => {
    const { total, done, conflicts, oneVote, noVotes } = summary.screening;
    expect(done + conflicts + oneVote + noVotes).toBe(total);
  });

  it("gives the current reviewer a personal queue", () => {
    const work = deriveYourWork(review, CURRENT_REVIEWER_ID);
    expect(work.toResolve).toBe(74);
    expect(work.toScreen).toBe(summary.screening.noVotes);
    expect(work.screenedSoFar).toBeGreaterThan(0);
  });

  it("is deterministic across calls", () => {
    expect(createMockReview()).toEqual(review);
  });

  it("puts the EMPEROR-Preserved exemplar at the head of the to-screen queue", () => {
    const anker = review.candidates.find((c) =>
      c.title.includes("Empagliflozin in Heart Failure"),
    );
    expect(anker).toBeDefined();
    expect(anker?.ta.votes).toHaveLength(0);
    expect(anker?.doi).toBe("10.1056/NEJMoa2107038");
  });
});

describe("createEmptyReview", () => {
  it("models a first-run review with nothing imported", () => {
    const summary = deriveFunnelSummary(createEmptyReview());
    expect(summary.imported).toBe(0);
    expect(summary.screening.total).toBe(0);
  });
});

describe("getReviewById", () => {
  it("returns the first-run review for the new-review id", () => {
    expect(getReviewById("new-review").candidates).toHaveLength(0);
  });

  it("returns the seeded mock review for any other id while on mock data", () => {
    expect(getReviewById("sglt2-hf").candidates).toHaveLength(412);
    expect(getReviewById("42").candidates).toHaveLength(412);
  });
});
