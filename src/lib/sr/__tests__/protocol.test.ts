import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import {
  PICO_FIELDS,
  SUGGESTED_CRITERIA,
  deriveScreeningCriteria,
} from "../protocol";

const review = createMockReview();

describe("PICO_FIELDS", () => {
  it("lists the five PICO(S) fields in order", () => {
    expect(PICO_FIELDS.map((f) => f.key)).toEqual([
      "population",
      "intervention",
      "comparator",
      "outcome",
      "studyDesign",
    ]);
  });
});

describe("deriveScreeningCriteria", () => {
  it("collapses the structured protocol criteria into the labels screening shows", () => {
    const criteria = deriveScreeningCriteria(review.protocol);
    expect(criteria.inclusion).toEqual([
      "Adults with heart failure",
      "SGLT2-inhibitor intervention",
      "Randomised controlled trial",
      "Reports HF hospitalisation or mortality",
    ]);
    expect(criteria.exclusion).toContain("Conference abstract only");
  });

  it("keeps the review's screening panel in sync with the protocol (one source)", () => {
    // The criteria the screening screen reads must equal what the protocol defines.
    const derived = deriveScreeningCriteria(review.protocol);
    expect(review.criteria.inclusion).toEqual(derived.inclusion);
    expect(review.criteria.exclusion).toEqual(derived.exclusion);
  });
});

describe("SUGGESTED_CRITERIA", () => {
  it("offers Elicit-style suggested criteria not already in the protocol", () => {
    const existing = new Set(review.protocol.criteria.map((c) => c.label));
    expect(SUGGESTED_CRITERIA.length).toBeGreaterThan(0);
    expect(SUGGESTED_CRITERIA.every((c) => c.label && c.instruction)).toBe(true);
    // At least one suggestion is genuinely new.
    expect(SUGGESTED_CRITERIA.some((c) => !existing.has(c.label))).toBe(true);
  });
});

describe("protocol shape", () => {
  it("carries a research question and AI-drafted PICO, marked for verification", () => {
    expect(review.protocol.researchQuestion).toContain("SGLT2");
    expect(review.protocol.pico.population).toBeTruthy();
    expect(review.protocol.status).toBe("draft");
  });

  it("gives every eligibility criterion an instruction and answer structure", () => {
    for (const criterion of review.protocol.criteria) {
      expect(criterion.instruction.length).toBeGreaterThan(0);
      expect(["any", "specified", "yes_no_maybe"]).toContain(
        criterion.answerStructure,
      );
      expect(["include", "exclude"]).toContain(criterion.kind);
    }
  });
});
