import { describe, it, expect } from "vitest";
import type { UnifiedSearchResult } from "@/types/search";
import { qualityRank } from "../quality-ranker";

function paper(over: Partial<UnifiedSearchResult>): UnifiedSearchResult {
  return {
    title: "",
    authors: [],
    journal: "",
    year: 2020,
    citationCount: 0,
    isOpenAccess: false,
    openAccessPdfUrl: null,
    publicationTypes: [],
    sources: ["pubmed"],
    ...over,
  } as UnifiedSearchResult;
}

describe("quality-ranker — cross-encoder relevance is a bounded signal, not the ruler", () => {
  it("does not let a low cross-encoder score bury a landmark RCT", () => {
    // The primary trial report: the cross-encoder scored it low (it describes the
    // intervention, not the trial acronym), but it is a high-evidence, highly cited
    // RCT. The score arrives squashed to [0,1] (sigmoid(-7) ≈ 0.001) so it is one
    // capped term; the clinical-quality priors must keep the primary on top.
    const primary = paper({
      title: "Primary RCT",
      evidenceLevel: "I",
      citationCount: 5000,
      journalQuartile: "Q1",
      rrfScore: 0.9,
      rerankScore: 0.001,
    });
    const secondary = paper({
      title: "Secondary sub-study",
      evidenceLevel: "III",
      citationCount: 50,
      journalQuartile: "Q3",
      rrfScore: 0.3,
      rerankScore: 0.88,
    });

    const ranked = qualityRank([secondary, primary], "primary rct");
    expect(ranked[0].title).toBe("Primary RCT");
  });

  it("keeps the cross-encoder a meaningful but bounded signal (prefers the higher score, all else equal)", () => {
    const liked = paper({
      title: "Liked",
      evidenceLevel: "II",
      citationCount: 100,
      rrfScore: 0.5,
      rerankScore: 0.95,
    });
    const disliked = paper({
      title: "Disliked",
      evidenceLevel: "II",
      citationCount: 100,
      rrfScore: 0.5,
      rerankScore: 0.05,
    });

    const ranked = qualityRank([disliked, liked], "x");
    expect(ranked[0].title).toBe("Liked");
  });
});
