import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { deriveReport } from "../report";

describe("deriveReport", () => {
  const report = deriveReport(createMockReview());

  it("draws its headline numbers from the live PRISMA counts", () => {
    expect(report.includedCount).toBe(12);
    expect(report.criteriaCount).toBe(4);
  });

  it("assembles a characteristics table of the named included studies", () => {
    const anker = report.characteristics.find((s) => s.study.includes("Anker"));
    expect(anker).toMatchObject({
      type: "RCT",
      intervention: "Empagliflozin",
      n: "5,988",
      efCategory: "HFpEF >40%",
    });
    expect(report.characteristics).toHaveLength(4);
  });

  it("marks a value the paper never reported as not-reported, never blank", () => {
    const meta = report.characteristics.find((s) =>
      s.study.includes("Banerjee"),
    )!;
    expect(meta.efCategoryNotReported).toBe(true);
  });

  it("carries the funnel provenance for the report scaffold", () => {
    expect(report.provenance).toEqual({
      gathered: 412,
      included: 12,
    });
  });
});
