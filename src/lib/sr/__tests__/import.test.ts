import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { deriveDupeQueue, deriveImportLedger } from "../import";

const review = createMockReview();

describe("deriveImportLedger", () => {
  const ledger = deriveImportLedger(review);

  it("shows one reversible card per import batch with refs and duplicates", () => {
    expect(ledger.batches).toEqual([
      {
        id: "batch-pubmed",
        source: "PubMed",
        target: "screen",
        ai: undefined,
        refs: 214,
        duplicatesRemoved: 11,
      },
      {
        id: "batch-embase",
        source: "Embase, +2",
        target: "screen",
        ai: undefined,
        refs: 142,
        duplicatesRemoved: 9,
      },
      {
        id: "batch-ai",
        source: "AI search",
        target: "screen",
        ai: true,
        refs: 56,
        duplicatesRemoved: 4,
      },
    ]);
  });

  it("totals the duplicates removed across batches", () => {
    expect(ledger.totalDuplicatesRemoved).toBe(24);
  });
});

describe("deriveDupeQueue", () => {
  it("queues only uncertain pairs, with what matched and the original", () => {
    const queue = deriveDupeQueue(review);
    expect(queue).toHaveLength(2);
    const dapa = queue.find((entry) => entry.candidate.title.includes("DAPA"));
    expect(dapa?.matchedOn).toEqual(["title", "year", "first author"]);
    expect(dapa?.original?.refId).toBe(1660);
    expect(dapa?.original?.title).toContain("DAPA-HF");
  });

  it("keeps uncertain pairs inside the screening pool until merged", () => {
    // 388 = 412 imported − 24 auto-merged; the 2 uncertain stay counted.
    const poolSize = review.candidates.filter(
      (c) => c.dupe?.status !== "auto_merged" && c.dupe?.status !== "merged",
    ).length;
    expect(poolSize).toBe(388);
  });
});
