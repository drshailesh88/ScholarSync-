import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { deriveExtractionGrid, resolveFinal } from "../extraction";

const review = createMockReview();
const emperor = review.candidates.find((c) => c.refId === 2241)!;
const extraction = review.extractions.find(
  (e) => e.candidateId === emperor.id,
)!;

describe("deriveExtractionGrid", () => {
  const grid = deriveExtractionGrid(extraction);

  it("groups fields into their sections in order", () => {
    expect(grid.sections.map((s) => s.name)).toEqual([
      "General information",
      "Characteristics & outcomes",
    ]);
  });

  it("counts the fields that still need a consensus decision", () => {
    expect(grid.conflictCount).toBe(3);
  });

  it("resolves the Final cell to the AI value on agreement, with a source quote", () => {
    const studyId = grid.sections[0].fields.find(
      (f) => f.label === "Study ID",
    )!;
    expect(resolveFinal(studyId)).toEqual({
      value: "EMPEROR-Preserved",
      kind: "ai",
      sourceQuote: expect.any(String),
    });
  });

  it("marks a conflicting Final cell as decision-required until resolved", () => {
    const sampleSize = grid.sections[0].fields.find(
      (f) => f.label === "Sample size",
    )!;
    expect(resolveFinal(sampleSize)).toEqual({ value: null, kind: "conflict" });
  });

  it("shows a resolved conflict as a human final value", () => {
    const resolved = { ...emperorField("Sample size"), finalValue: "5,988" };
    expect(resolveFinal(resolved)).toEqual({
      value: "5,988",
      kind: "resolved",
    });
  });

  it("surfaces the Not reported designed state on a reviewer cell", () => {
    const diabetes = grid.sections[1].fields.find(
      (f) => f.label === "Diabetes status",
    )!;
    expect(diabetes.reviewer2NotReported).toBe(true);
  });
});

function emperorField(label: string) {
  return extraction.fields.find((f) => f.label === label)!;
}
