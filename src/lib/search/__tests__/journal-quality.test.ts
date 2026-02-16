import { describe, it, expect, vi } from "vitest";

vi.mock("@/data/scimago-medicine-2023.json", () => ({
  default: [
    { title: "the lancet", titleOriginal: "The Lancet", quartile: "Q1", citesPerDoc2y: 120, sjr: 13.1, hIndex: 750 },
    { title: "nature medicine", titleOriginal: "Nature Medicine", quartile: "Q1", citesPerDoc2y: 90, sjr: 10.5, hIndex: 500 },
    { title: "journal of clinical investigation", titleOriginal: "JCI", quartile: "Q1", citesPerDoc2y: 15, sjr: 5.2, hIndex: 350 },
    { title: "plos one", titleOriginal: "PLoS ONE", quartile: "Q2", citesPerDoc2y: 3.2, sjr: 0.8, hIndex: 332 },
    { title: "bmc medicine", titleOriginal: "BMC Medicine", quartile: "Q1", citesPerDoc2y: 8.5, sjr: 3.1, hIndex: 120 },
  ],
}));

import { lookupJournalQuality } from "../journal-quality";

describe("lookupJournalQuality", () => {
  it("finds exact match", () => {
    const result = lookupJournalQuality("the lancet");
    expect(result).not.toBeNull();
    expect(result!.quartile).toBe("Q1");
    expect(result!.quartileColor).toBe("emerald");
  });

  it("normalizes case", () => {
    const result = lookupJournalQuality("The Lancet");
    expect(result).not.toBeNull();
    expect(result!.quartile).toBe("Q1");
  });

  it("removes leading 'the'", () => {
    const result = lookupJournalQuality("The Nature Medicine");
    expect(result).not.toBeNull();
  });

  it("finds by includes match", () => {
    const result = lookupJournalQuality("bmc");
    expect(result).not.toBeNull();
    expect(result!.quartile).toBe("Q1");
  });

  it("returns null for unknown journal", () => {
    expect(lookupJournalQuality("Totally Unknown Journal")).toBeNull();
  });

  it("returns correct quartile colors", () => {
    const q2 = lookupJournalQuality("plos one");
    expect(q2).not.toBeNull();
    expect(q2!.quartileColor).toBe("sky");
  });

  it("returns numeric metrics", () => {
    const result = lookupJournalQuality("the lancet");
    expect(result!.citesPerDoc2y).toBe(120);
    expect(result!.sjr).toBe(13.1);
    expect(result!.hIndex).toBe(750);
  });

  it("handles whitespace in input", () => {
    const result = lookupJournalQuality("  the lancet  ");
    expect(result).not.toBeNull();
  });
});
