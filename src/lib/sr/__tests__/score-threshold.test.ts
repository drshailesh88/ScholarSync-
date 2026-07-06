import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { deriveScoreTally, DEFAULT_SCORE_THRESHOLD } from "../score-threshold";

const review = createMockReview();

describe("deriveScoreTally", () => {
  it("partitions the AI-scored pool at the threshold", () => {
    const tally = deriveScoreTally(review, 4.0);
    expect(tally.evaluated).toBe(388);
    expect(tally.aiInclude).toBe(124);
    expect(tally.aiExclude).toBe(264);
    expect(tally.aiInclude + tally.aiExclude).toBe(tally.evaluated);
  });

  it("moves the boundary as the threshold rises", () => {
    // Only the top-scoring exemplar (4.9) clears a 4.5 cut.
    const strict = deriveScoreTally(review, 4.5);
    expect(strict.aiInclude).toBe(1);
    expect(strict.aiExclude).toBe(387);
  });

  it("includes everything at a zero threshold", () => {
    const tally = deriveScoreTally(review, 0);
    expect(tally.aiInclude).toBe(388);
    expect(tally.aiExclude).toBe(0);
  });

  it("has a sensible default threshold in the score range", () => {
    expect(DEFAULT_SCORE_THRESHOLD).toBeGreaterThan(0);
    expect(DEFAULT_SCORE_THRESHOLD).toBeLessThanOrEqual(5);
  });
});
