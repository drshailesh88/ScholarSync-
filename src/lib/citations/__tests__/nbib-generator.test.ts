import { describe, it, expect } from "vitest";
import { generateNbib, generateNbibBatch } from "../nbib-generator";
import type { UnifiedSearchResult } from "@/types/search";

function makeResult(overrides: Partial<UnifiedSearchResult> = {}): UnifiedSearchResult {
  return {
    title: "Test Paper Title",
    authors: ["Smith John", "Doe Jane"],
    journal: "Test Journal",
    year: 2023,
    citationCount: 10,
    isOpenAccess: false,
    publicationTypes: ["Journal Article"],
    sources: ["pubmed"],
    ...overrides,
  };
}

describe("generateNbib", () => {
  it("generates NBIB with all fields", () => {
    const result = makeResult({
      pmid: "12345678",
      doi: "10.1056/test",
      abstract: "This is a test abstract.",
      meshTerms: ["Cardiovascular Diseases", "Diabetes Mellitus"],
    });
    const nbib = generateNbib(result);
    expect(nbib).toContain("PMID- 12345678");
    expect(nbib).toContain("TI  - Test Paper Title");
    expect(nbib).toContain("AU  - Smith J");
    expect(nbib).toContain("AU  - Doe J");
    expect(nbib).toContain("AB  - This is a test abstract.");
    expect(nbib).toContain("TA  - Test Journal");
    expect(nbib).toContain("DP  - 2023");
    expect(nbib).toContain("AID - 10.1056/test [doi]");
    expect(nbib).toContain("PT  - Journal Article");
    expect(nbib).toContain("MH  - Cardiovascular Diseases");
    expect(nbib).toContain("MH  - Diabetes Mellitus");
  });

  it("omits PMID when not present", () => {
    const nbib = generateNbib(makeResult());
    expect(nbib).not.toContain("PMID-");
  });

  it("omits abstract when not present", () => {
    const nbib = generateNbib(makeResult());
    expect(nbib).not.toContain("AB  -");
  });

  it("omits DOI when not present", () => {
    const nbib = generateNbib(makeResult());
    expect(nbib).not.toContain("AID -");
  });

  it("handles author name formats", () => {
    const result = makeResult({ authors: ["Smith, John M", "Doe"] });
    const nbib = generateNbib(result);
    expect(nbib).toContain("AU  - Smith JM");
    expect(nbib).toContain("AU  - Doe");
  });

  it("handles empty authors array", () => {
    const result = makeResult({ authors: [] });
    const nbib = generateNbib(result);
    expect(nbib).not.toContain("AU  -");
  });
});

describe("generateNbibBatch", () => {
  it("generates NBIB for multiple results", () => {
    const results = [
      makeResult({ title: "Paper A", pmid: "111" }),
      makeResult({ title: "Paper B", pmid: "222" }),
    ];
    const nbib = generateNbibBatch(results);
    expect(nbib).toContain("TI  - Paper A");
    expect(nbib).toContain("TI  - Paper B");
    expect(nbib).toContain("PMID- 111");
    expect(nbib).toContain("PMID- 222");
  });

  it("returns empty string for empty array", () => {
    expect(generateNbibBatch([])).toBe("");
  });
});
