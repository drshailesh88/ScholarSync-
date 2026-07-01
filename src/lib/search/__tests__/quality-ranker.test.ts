import { describe, it, expect } from "vitest";
import type { UnifiedSearchResult } from "@/types/search";
import { qualityRank, rankWithTrace } from "../quality-ranker";

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

describe("quality-ranker — relevance gates the ranking; clinical priors order the relevant results", () => {
  it("keeps a RELEVANT landmark RCT on top via its clinical priors", () => {
    // An on-topic primary trial: the cross-encoder gives it a solid score, so it
    // clears the relevance gate and its high evidence/citations/journal lift it above
    // a less-relevant secondary. Realistic [0,1] scores — not the obsolete raw-logit
    // 0.001 pathology, which the squashed reranker read-out no longer produces.
    const primary = paper({
      title: "Primary RCT",
      evidenceLevel: "I",
      citationCount: 5000,
      journalQuartile: "Q1",
      rrfScore: 0.9,
      rerankScore: 0.55,
    });
    const secondary = paper({
      title: "Secondary sub-study",
      evidenceLevel: "III",
      citationCount: 50,
      journalQuartile: "Q3",
      rrfScore: 0.3,
      rerankScore: 0.5,
    });

    const ranked = qualityRank([secondary, primary], "primary rct");
    expect(ranked[0].title).toBe("Primary RCT");
  });

  it("relevance gate: an off-topic mega-cited paper cannot bury a relevant recent one", () => {
    // The real-world failure this fixes: a generic methods paper (PRISMA) maxes every
    // quality prior — Level I, Q1, 80k citations — but the cross-encoder correctly
    // scores it near-zero for the actual clinical topic. The gate must crush it below
    // a perfectly relevant, recent, zero-citation paper instead of crowning it.
    const offTopic = paper({
      title: "Off-topic mega-cited",
      evidenceLevel: "I",
      citationCount: 80000,
      journalQuartile: "Q1",
      rrfScore: 0.9,
      rerankScore: 0.08,
    });
    const relevant = paper({
      title: "Relevant recent paper",
      evidenceLevel: "V",
      citationCount: 0,
      journalQuartile: null,
      rrfScore: 0.4,
      rerankScore: 0.92,
    });

    const ranked = qualityRank([offTopic, relevant], "the specific clinical topic");
    expect(ranked[0].title).toBe("Relevant recent paper");
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

describe("quality-ranker — signal-aware gate: lexical fallback is not a cross-encoder probability", () => {
  it("crushes a REAL-rerankScore off-topic mega-cited paper below a relevant one", () => {
    // Defense-in-depth restated: with a calibrated cross-encoder score, the 0.45
    // floor crushes the off-topic giant no matter how prestigious it is.
    const offTopic = paper({
      title: "Off-topic mega-cited methods paper",
      evidenceLevel: "I",
      citationCount: 95000,
      journalQuartile: "Q1",
      rrfScore: 0.95,
      rerankScore: 0.07,
    });
    const relevant = paper({
      title: "Tocilizumab for cytokine release syndrome",
      evidenceLevel: "V",
      citationCount: 3,
      journalQuartile: null,
      rrfScore: 0.3,
      rerankScore: 0.9,
    });
    const ranked = qualityRank([offTopic, relevant], "tocilizumab cytokine release syndrome");
    expect(ranked[0].title).toBe("Tocilizumab for cytokine release syndrome");
  });

  it("does NOT treat a generic filler-word overlap as relevance in the LEXICAL fallback", () => {
    // No rerankScore → keyword fallback. The off-topic giant shares only the generic
    // filler token "management" with the query; the distinctive disease/drug terms
    // are absent. Its weighted overlap must stay below the gate floor so its maxed
    // citation/journal priors cannot crown it, while the on-topic paper — which
    // matches the distinctive terms — wins.
    const offTopic = paper({
      title: "Recent advances in the management of clinical patients",
      evidenceLevel: "I",
      citationCount: 90000,
      journalQuartile: "Q1",
      rrfScore: 0.95,
    });
    const onTopic = paper({
      title: "Tocilizumab for cytokine release syndrome",
      evidenceLevel: "V",
      citationCount: 5,
      journalQuartile: null,
      rrfScore: 0.3,
    });

    const scored = rankWithTrace(
      [offTopic, onTopic],
      "tocilizumab cytokine release syndrome management"
    );

    expect(scored[0].result.title).toBe("Tocilizumab for cytokine release syndrome");
    const off = scored.find((s) => s.result.title.startsWith("Recent advances"))!;
    expect(off.signals.relevance).toBeLessThan(0.45);
    const on = scored.find((s) => s.result.title.startsWith("Tocilizumab"))!;
    expect(on.signals.relevance).toBeGreaterThan(0.7);
  });
});
