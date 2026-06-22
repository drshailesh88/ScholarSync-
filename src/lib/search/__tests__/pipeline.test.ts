import { describe, it, expect } from "vitest";
import { rankAndAnnotate, buildFlags, buildWhyRelevant } from "../pipeline";
import type { UnifiedSearchResult } from "@/types/search";

function paper(p: Partial<UnifiedSearchResult>): UnifiedSearchResult {
  return {
    title: "Untitled",
    authors: [],
    journal: "",
    year: 2020,
    citationCount: 0,
    publicationTypes: [],
    isOpenAccess: false,
    sources: ["pubmed"],
    ...p,
  };
}

describe("buildFlags", () => {
  it("flags missing metadata, never fabricates it", () => {
    const flags = buildFlags(paper({ title: "x", doi: undefined, pmid: undefined, citationCount: 0 }));
    expect(flags).toContain("missing_doi");
    expect(flags).toContain("missing_pmid");
    expect(flags).toContain("missing_citation_count");
  });
  it("omits flags for present fields", () => {
    const flags = buildFlags(
      paper({
        title: "x",
        doi: "10.1/x",
        pmid: "1",
        year: 2021,
        journal: "NEJM",
        citationCount: 10,
        journalQuartile: "Q1",
        studyType: "rct",
        abstract: "abc",
      })
    );
    expect(flags).not.toContain("missing_doi");
    expect(flags).not.toContain("unrated_journal");
    expect(flags).not.toContain("unclassified_study_type");
  });
});

describe("buildWhyRelevant", () => {
  it("summarizes evidence, year, citations and matched terms deterministically", () => {
    const why = buildWhyRelevant(
      paper({ studyType: "meta_analysis", evidenceLevel: "I", year: 2024, citationCount: 150, journalQuartile: "Q1" }),
      ["sglt2", "heart failure"]
    );
    expect(why).toContain("Level I");
    expect(why).toContain("2024");
    expect(why).toContain("150 citations");
    expect(why).toContain("matches: sglt2, heart failure");
  });
});

describe("rankAndAnnotate", () => {
  const landmarkRct = paper({
    title: "Dapagliflozin in heart failure with reduced ejection fraction",
    studyType: "rct",
    evidenceLevel: "II",
    year: 2019,
    citationCount: 5000,
    journal: "N Engl J Med",
    rrfScore: 0.02,
  });
  const obscureCaseReport = paper({
    title: "A case report of an unrelated finding",
    studyType: "case_report",
    evidenceLevel: "IV",
    year: 2025,
    citationCount: 0,
    rrfScore: 0.02,
  });

  it("ranks the high-evidence, high-citation landmark above a recent case report", () => {
    const ranked = rankAndAnnotate([obscureCaseReport, landmarkRct], {
      query: "dapagliflozin heart failure reduced ejection fraction",
    });
    expect(ranked[0].title).toContain("Dapagliflozin");
    expect(ranked[0].rankingTrace?.strategy).toBe("quality");
    expect(ranked[0].rankingTrace?.composite).toBeGreaterThan(ranked[1].rankingTrace!.composite);
    expect(ranked[0].whyRelevant).toBeTruthy();
    expect(ranked[0].flags).toBeDefined();
  });

  it("recency strategy orders by year (newest first) and labels the trace", () => {
    const ranked = rankAndAnnotate([landmarkRct, obscureCaseReport], {
      query: "latest dapagliflozin",
      recency: true,
    });
    expect(ranked[0].year).toBe(2025);
    expect(ranked[0].rankingTrace?.strategy).toBe("recency");
  });

  it("returns [] for empty input", () => {
    expect(rankAndAnnotate([], { query: "x" })).toEqual([]);
  });

  it("uses rerankScore as the dominant relevance signal when present", () => {
    const base = {
      studyType: "rct" as const,
      evidenceLevel: "II" as const,
      year: 2020,
      citationCount: 100,
      journal: "NEJM",
      rrfScore: 0.02,
    };
    const semanticallyTop = paper({ ...base, title: "Highly relevant paper", rerankScore: 0.95 });
    const semanticallyWeak = paper({ ...base, title: "Barely relevant paper", rerankScore: 0.05 });
    const ranked = rankAndAnnotate([semanticallyWeak, semanticallyTop], { query: "anything" });
    expect(ranked[0].title).toBe("Highly relevant paper");
    expect(ranked[0].rankingTrace?.relevance).toBeCloseTo(0.95, 2);
    // velocity signal is computed and surfaced in the trace
    expect(typeof ranked[0].rankingTrace?.velocity).toBe("number");
  });

  it("recency blend keeps a high-quality landmark above a newer low-value item", () => {
    const landmark = paper({
      title: "Landmark trial of drug X",
      studyType: "rct",
      evidenceLevel: "II",
      year: 2022,
      citationCount: 4000,
      journal: "NEJM",
      journalQuartile: "Q1",
      rerankScore: 0.9,
      rrfScore: 0.03,
    });
    const newerNoise = paper({
      title: "Minor commentary mentioning drug X",
      studyType: "other",
      evidenceLevel: "V",
      year: 2026,
      citationCount: 1,
      rerankScore: 0.2,
      rrfScore: 0.01,
    });
    const ranked = rankAndAnnotate([newerNoise, landmark], { query: "latest drug X", recency: true });
    expect(ranked[0].title).toBe("Landmark trial of drug X");
    expect(ranked[0].rankingTrace?.strategy).toBe("recency");
  });

  it("flags and demotes retracted papers below clean ones, without dropping them", () => {
    const retractedHighScore = paper({
      title: "Retracted landmark on dapagliflozin heart failure",
      studyType: "rct",
      evidenceLevel: "II",
      year: 2019,
      citationCount: 9000,
      journal: "N Engl J Med",
      publicationTypes: ["Retracted Publication"],
      rrfScore: 0.05,
    });
    const cleanLowScore = paper({
      title: "A modest cohort on dapagliflozin heart failure",
      studyType: "cohort",
      evidenceLevel: "III",
      year: 2018,
      citationCount: 5,
      rrfScore: 0.01,
    });
    const ranked = rankAndAnnotate([retractedHighScore, cleanLowScore], {
      query: "dapagliflozin heart failure",
    });
    expect(ranked).toHaveLength(2); // not dropped
    expect(ranked[0].title).toContain("modest cohort"); // clean paper ranks above the retracted one
    expect(ranked[1].flags).toContain("retracted");
  });
});
