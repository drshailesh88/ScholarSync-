import { describe, expect, it } from "vitest";
import { getDomainConfig } from "@/lib/search/domains";

describe("domain feature flags", () => {
  it("enables systematic review for medicine only", () => {
    expect(getDomainConfig("medicine").features.systematicReview).toBe(true);
    expect(getDomainConfig("multidisciplinary").features.systematicReview).toBe(false);
  });

  it("enables PICO extraction for medicine only", () => {
    expect(getDomainConfig("medicine").features.picoExtraction).toBe(true);
    expect(getDomainConfig("multidisciplinary").features.picoExtraction).toBe(false);
  });

  it("disables clinical trials search for multidisciplinary", () => {
    expect(getDomainConfig("medicine").sources).toContain("clinical_trials");
    expect(getDomainConfig("multidisciplinary").features.clinicalTrialsSearch).toBe(false);
  });

  it("limits presentation types for multidisciplinary", () => {
    expect(getDomainConfig("medicine").features.presentationTypes).toContain("grand_rounds");
    expect(getDomainConfig("multidisciplinary").features.presentationTypes).not.toContain("grand_rounds");
  });
});
