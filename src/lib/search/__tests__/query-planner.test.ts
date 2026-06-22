import { describe, it, expect } from "vitest";
import { planQuery, simplifyForPubMed, coreTopicQuery } from "../query-planner";

describe("simplifyForPubMed", () => {
  it("strips natural-language filler that breaks PubMed term mapping", () => {
    const s = simplifyForPubMed("newest evidence on lecanemab for Alzheimer disease");
    expect(s.toLowerCase()).toContain("lecanemab");
    expect(s.toLowerCase()).toContain("alzheimer");
    expect(s.toLowerCase()).not.toContain("newest");
    expect(s.toLowerCase()).not.toContain("evidence");
  });

  it("flattens PICO scaffolding to keywords", () => {
    const s = simplifyForPubMed(
      "In critically ill ICU patients, does conservative versus liberal oxygen therapy affect mortality?"
    );
    expect(s.toLowerCase()).toContain("oxygen therapy");
    expect(s.toLowerCase()).toContain("mortality");
    expect(s).not.toContain("?");
    expect(s.toLowerCase()).not.toMatch(/\bdoes\b/);
    expect(s.toLowerCase()).not.toMatch(/\bversus\b/);
  });

  it("never returns empty for a real query", () => {
    expect(simplifyForPubMed("DAPA-HF").length).toBeGreaterThan(0);
  });
});

describe("planQuery", () => {
  it("detects recency intent", () => {
    expect(planQuery("latest 2025 trials semaglutide cardiovascular outcomes").recency).toBe(true);
    expect(planQuery("newest evidence on lecanemab").recency).toBe(true);
    expect(planQuery("management of heart failure with reduced ejection fraction").recency).toBe(false);
  });

  it("detects hyphenated and named-number trial acronyms", () => {
    expect(planQuery("DAPA-HF trial").trialAcronyms).toContain("DAPA-HF");
    expect(planQuery("PARTNER 3 trial").trialAcronyms.some((a) => a.includes("PARTNER"))).toBe(true);
    expect(planQuery("results of KEYNOTE-189").trialAcronyms).toContain("KEYNOTE-189");
  });

  it("detects NCT registry ids", () => {
    expect(planQuery("trial NCT02675114 outcomes").trialAcronyms).toContain("NCT02675114");
  });

  it("does not mistake disease/biomarker tokens for trial acronyms", () => {
    const plan = planQuery("myocarditis risk after mRNA COVID-19 vaccine in young males");
    expect(plan.trialAcronyms).not.toContain("COVID-19");
    expect(plan.isTrialLookup).toBe(false);
    expect(plan.wantsTrials).toBe(false);
  });

  it("enables ClinicalTrials linking for trial lookups", () => {
    expect(planQuery("DAPA-HF trial").wantsTrials).toBe(true);
    expect(planQuery("broad question about statins").wantsTrials).toBe(false);
  });

  it("broadens to the core topic so landmark trials are retrievable", () => {
    // The seed query: PARTNER 3 (a 1-year trial) doesn't match "six year outcomes",
    // so a broadened "TAVR low risk" companion query is needed to fetch it.
    const plan = planQuery("TAVR low risk six year outcomes");
    expect(plan.pubmedBroadened).toBe("TAVR low risk");
    expect(coreTopicQuery("TAVR low risk six year outcomes")).toBe("TAVR low risk");
  });

  it("does not broaden when there is no qualifier to strip", () => {
    expect(planQuery("management of heart failure").pubmedBroadened).toBeNull();
  });

  it("does not broaden acronym lookups (already targeted)", () => {
    expect(planQuery("PARTNER 3 trial").pubmedBroadened).toBeNull();
  });

  it("pins trial acronyms as exact title/abstract phrases for PubMed", () => {
    expect(planQuery("PARTNER 3 trial").pubmedPrimary).toBe('"PARTNER 3"[tiab]');
    expect(planQuery("DAPA-HF trial").pubmedPrimary).toBe('"DAPA-HF"[tiab]');
    // NCT ids are searched bare, not phrase-pinned
    expect(planQuery("trial NCT02675114").pubmedPrimary).toContain("NCT02675114");
    expect(planQuery("trial NCT02675114").pubmedPrimary).not.toContain('"NCT02675114"[tiab]');
  });
});
