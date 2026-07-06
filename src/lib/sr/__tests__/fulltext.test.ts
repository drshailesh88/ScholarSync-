import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { canRecordExclusion, deriveFullTextQueue } from "../fulltext";

const review = createMockReview();

describe("canRecordExclusion", () => {
  it("blocks an exclude with no reason", () => {
    expect(canRecordExclusion(undefined)).toBe(false);
    expect(canRecordExclusion("")).toBe(false);
  });

  it("allows an exclude once a structured reason is chosen", () => {
    expect(canRecordExclusion("wrong_population")).toBe(true);
  });
});

describe("deriveFullTextQueue", () => {
  const queue = deriveFullTextQueue(review, "you");

  it("only assesses the 124 studies that advanced from title & abstract", () => {
    const assessed = review.candidates.filter((c) => c.fullText).length;
    expect(assessed).toBe(124);
    // The four visible tabs cover everything except the 12 already-included.
    expect(
      queue.tabs.toReview +
        queue.tabs.awaitingOther +
        queue.tabs.conflicts +
        queue.tabs.excluded,
    ).toBe(112);
  });

  it("counts the reviewer's tab buckets", () => {
    expect(queue.tabs).toEqual({
      toReview: 43,
      conflicts: 6,
      awaitingOther: 40,
      excluded: 23,
    });
  });

  it("puts the DAPA-HF exemplar first in the to-review queue", () => {
    expect(queue.toReview[0].refId).toBe(1660);
  });

  it("exposes the managed, hierarchical exclusion-reason list", () => {
    const codes = review.exclusionReasons.map((r) => r.code);
    expect(codes).toContain("wrong_population");
    expect(codes).toContain("abstract_only");
  });
});
