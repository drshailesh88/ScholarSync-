import { describe, expect, it } from "vitest";
import { createMockReview } from "../fixtures";
import { deriveRobStudyList, ROB2_DOMAINS, overallRobJudgment } from "../rob";
import type { RobJudgment } from "../types";

describe("ROB2_DOMAINS", () => {
  it("defines the five RoB 2 domains in order", () => {
    expect(ROB2_DOMAINS.map((d) => d.id)).toEqual([
      "randomisation",
      "deviations",
      "missing",
      "measurement",
      "selection",
    ]);
  });

  it("carries signalling questions for each domain", () => {
    expect(ROB2_DOMAINS[0].signalling.length).toBeGreaterThan(0);
  });
});

describe("overallRobJudgment", () => {
  const low: RobJudgment = "low";
  const some: RobJudgment = "some_concerns";
  const high: RobJudgment = "high";

  it("is Low only when every domain is Low", () => {
    expect(overallRobJudgment([low, low, low, low, low])).toBe("low");
  });

  it("is High if any domain is High", () => {
    expect(overallRobJudgment([low, some, low, high, low])).toBe("high");
  });

  it("is Some concerns if any domain has some concerns but none are High", () => {
    expect(overallRobJudgment([low, some, low, low, low])).toBe(
      "some_concerns",
    );
  });

  it("treats an unassessed domain as some concerns at minimum", () => {
    expect(overallRobJudgment([low, low, undefined, low, low])).toBe(
      "some_concerns",
    );
  });
});

describe("deriveRobStudyList", () => {
  const list = deriveRobStudyList(createMockReview());

  it("joins each assessment to its study with an overall judgment", () => {
    const emperor = list.find((s) => s.candidate.refId === 2241);
    expect(emperor?.overall).toBe("some_concerns");
    const meta = list.find((s) => s.candidate.refId === 2310);
    expect(meta?.overall).toBe("high");
    const dapa = list.find((s) => s.candidate.refId === 1660);
    expect(dapa?.overall).toBe("low");
  });

  it("carries the AI justification and answered signalling questions", () => {
    const emperor = list.find((s) => s.candidate.refId === 2241)!;
    const randomisation = emperor.domains.find(
      (d) => d.domainId === "randomisation",
    );
    expect(randomisation?.aiJustification).toContain("interactive web system");
    expect(randomisation?.signallingAnswers["0"]).toBe("yes");
  });
});
