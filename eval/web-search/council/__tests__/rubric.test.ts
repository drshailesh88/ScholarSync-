import { describe, it, expect } from "vitest";
import { DIMS, RUBRIC_BY_TAB, OUTPUT_SCHEMA, SCORING_PREAMBLE } from "../rubric";

describe("rubric", () => {
  it("defines exactly the six objective web dimensions", () => {
    expect([...DIMS]).toEqual(["relevance", "authority", "recency", "diversity", "dedup", "usefulness"]);
  });
  it("has a distinct rubric for each tab that names that tab's emphasis", () => {
    expect(RUBRIC_BY_TAB.news.toLowerCase()).toContain("recency");
    expect(RUBRIC_BY_TAB.discussions.toLowerCase()).toContain("community");
    expect(RUBRIC_BY_TAB.web).not.toBe(RUBRIC_BY_TAB.news);
    expect(RUBRIC_BY_TAB.news).not.toBe(RUBRIC_BY_TAB.discussions);
  });
  it("output schema mentions every dimension and the winner field", () => {
    for (const d of DIMS) expect(OUTPUT_SCHEMA).toContain(d);
    expect(OUTPUT_SCHEMA).toContain("winner");
    expect(SCORING_PREAMBLE.toLowerCase()).toContain("engine a");
  });
});
