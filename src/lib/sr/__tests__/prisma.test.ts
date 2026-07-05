import { describe, expect, it } from "vitest";
import { createEmptyReview, createMockReview } from "../fixtures";
import { derivePrismaCounts } from "../prisma";

describe("derivePrismaCounts", () => {
  const counts = derivePrismaCounts(createMockReview());

  it("auto-generates the flow from the live review counts", () => {
    expect(counts).toEqual({
      identified: 412,
      duplicatesRemoved: 24,
      screened: 388,
      irrelevantAtScreening: 264,
      fullTextAssessed: 124,
      fullTextExcluded: 23,
      included: 12,
      ongoing: 89,
    });
  });

  it("keeps the flow internally consistent (each stage subtracts to the next)", () => {
    expect(counts.identified - counts.duplicatesRemoved).toBe(counts.screened);
    expect(counts.screened - counts.irrelevantAtScreening).toBe(
      counts.fullTextAssessed,
    );
    expect(
      counts.fullTextAssessed -
        counts.fullTextExcluded -
        counts.included,
    ).toBe(counts.ongoing);
  });

  it("groups the full-text exclusions by their reason", () => {
    const counts2 = derivePrismaCounts(createMockReview());
    expect(counts2.fullTextExcluded).toBe(23);
  });

  it("is all zeros for a first-run review", () => {
    const empty = derivePrismaCounts(createEmptyReview());
    expect(empty.identified).toBe(0);
    expect(empty.included).toBe(0);
  });
});
