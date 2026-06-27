import { describe, it, expect } from "vitest";
import { planQuery } from "../query-planner";
import { promoteGuidelines, rankAndAnnotate } from "../pipeline";
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

describe("planQuery — isGuidelineLookup", () => {
  it("flags society/agency guideline lookups", () => {
    expect(planQuery("ESC guidelines for heart failure").isGuidelineLookup).toBe(true);
    expect(planQuery("KDIGO 2024 guideline for chronic kidney disease").isGuidelineLookup).toBe(true);
    expect(planQuery("epilepsy treatment guideline").isGuidelineLookup).toBe(true);
  });

  it("does NOT flag ordinary clinical questions or trial lookups", () => {
    expect(planQuery("dapagliflozin in heart failure trial").isGuidelineLookup).toBe(false);
    expect(planQuery("sglt2 inhibitors cardiovascular mortality").isGuidelineLookup).toBe(false);
  });
});

describe("promoteGuidelines", () => {
  it("floats a guideline-typed result above higher-ranked non-guidelines", () => {
    const list = [
      paper({ title: "Big RCT", studyType: "rct", citationCount: 9000 }),
      paper({ title: "Meta-analysis", studyType: "meta_analysis", citationCount: 5000 }),
      paper({ title: "2023 Society Guideline", studyType: "guideline", year: 2023 }),
    ];
    const out = promoteGuidelines(list);
    expect(out[0].title).toBe("2023 Society Guideline");
  });

  it("prefers the latest version among guidelines", () => {
    const list = [
      paper({ title: "2012 Guideline", studyType: "guideline", year: 2012 }),
      paper({ title: "2024 Guideline", studyType: "guideline", year: 2024 }),
      paper({ title: "Some review", studyType: "narrative_review" }),
    ];
    const out = promoteGuidelines(list);
    expect(out[0].title).toBe("2024 Guideline");
    expect(out[1].title).toBe("2012 Guideline");
  });

  it("preserves the relative order of non-guideline results (only raises)", () => {
    const list = [
      paper({ title: "A", studyType: "rct" }),
      paper({ title: "G", studyType: "guideline", year: 2022 }),
      paper({ title: "B", studyType: "cohort" }),
      paper({ title: "C", studyType: "meta_analysis" }),
    ];
    const out = promoteGuidelines(list).filter((r) => r.studyType !== "guideline");
    expect(out.map((r) => r.title)).toEqual(["A", "B", "C"]);
  });

  it("is a no-op when there are no guidelines", () => {
    const list = [
      paper({ title: "A", studyType: "rct" }),
      paper({ title: "B", studyType: "cohort" }),
    ];
    expect(promoteGuidelines(list).map((r) => r.title)).toEqual(["A", "B"]);
  });
});

describe("rankAndAnnotate — guideline lookup integration", () => {
  it("ranks the authoritative guideline doc into the top slot for guideline queries", () => {
    const results = [
      paper({
        title: "Sacubitril/valsartan in heart failure: a randomized trial",
        studyType: "rct",
        citationCount: 12000,
        year: 2014,
      }),
      paper({
        title: "2021 ESC Guidelines for the diagnosis and treatment of heart failure",
        studyType: "guideline",
        citationCount: 8000,
        year: 2021,
      }),
    ];
    const ranked = rankAndAnnotate(results, {
      query: "ESC guidelines for heart failure",
      isGuidelineLookup: true,
    });
    expect(ranked[0].studyType).toBe("guideline");
  });
});
