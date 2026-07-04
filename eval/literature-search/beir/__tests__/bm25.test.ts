import { describe, it, expect } from "vitest";
import { tokenize, buildIndex, search } from "../bm25";

describe("tokenize", () => {
  it("lowercases, splits on non-alphanumerics, drops stopwords and 1-char tokens", () => {
    expect(tokenize("The COVID-19 vaccine, a trial!")).toEqual([
      "covid",
      "19",
      "vaccine",
      "trial",
    ]);
  });
});

describe("BM25 search", () => {
  const docs = [
    { id: "d1", text: "aspirin reduces cardiovascular risk in diabetes" },
    { id: "d2", text: "aspirin aspirin aspirin dosing guidelines" },
    { id: "d3", text: "statins and cholesterol in cardiovascular disease" },
  ];
  const index = buildIndex(docs);

  it("ranks a doc with the rarer matching term above a doc with only common terms", () => {
    // "statins" appears only in d3 (high idf) → d3 should top this query.
    const ranked = search(index, "statins cardiovascular", 3);
    expect(ranked[0]).toBe("d3");
  });

  it("rewards term frequency (saturating)", () => {
    // d2 repeats 'aspirin' → outranks d1 for a bare 'aspirin' query.
    const ranked = search(index, "aspirin", 3);
    expect(ranked[0]).toBe("d2");
    expect(ranked).toContain("d1");
    expect(ranked).not.toContain("d3"); // d3 has no 'aspirin'
  });

  it("returns at most topN and only docs sharing a query term", () => {
    const ranked = search(index, "aspirin", 1);
    expect(ranked).toHaveLength(1);
  });

  it("returns empty for a query with no corpus term overlap", () => {
    expect(search(index, "oncology immunotherapy", 10)).toEqual([]);
  });

  it("is deterministic (stable tie-break by docId)", () => {
    const a = search(index, "cardiovascular", 10);
    const b = search(index, "cardiovascular", 10);
    expect(a).toEqual(b);
  });
});
