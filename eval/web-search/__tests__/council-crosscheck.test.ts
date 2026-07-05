import { describe, it, expect } from "vitest";
import { aggregateJudgeGrades, judgeAgreement } from "../council-crosscheck";

describe("aggregateJudgeGrades", () => {
  it("takes the per-doc median grade across judges", () => {
    const { medianByDoc } = aggregateJudgeGrades([
      { model: "a", grades: [3, 1, 0] },
      { model: "b", grades: [3, 2, 0] },
      { model: "c", grades: [2, 2, 1] },
    ]);
    expect(medianByDoc).toEqual([3, 2, 0]);
  });

  it("reports the mean of the top-k median grades as a semantic-quality signal", () => {
    const { meanTopGrade } = aggregateJudgeGrades(
      [
        { model: "a", grades: [3, 3, 0, 0] },
        { model: "b", grades: [3, 3, 0, 0] },
      ],
      2
    );
    expect(meanTopGrade).toBeCloseTo(3, 5); // top-2 medians are both 3
  });

  it("handles an empty panel without dividing by zero", () => {
    const { medianByDoc, meanTopGrade } = aggregateJudgeGrades([]);
    expect(medianByDoc).toEqual([]);
    expect(meanTopGrade).toBe(0);
  });
});

describe("judgeAgreement", () => {
  it("is 1 when all judges give identical grades", () => {
    expect(
      judgeAgreement([
        { model: "a", grades: [3, 1, 0] },
        { model: "b", grades: [3, 1, 0] },
      ])
    ).toBeCloseTo(1, 5);
  });

  it("is lower when judges disagree", () => {
    const agree = judgeAgreement([
      { model: "a", grades: [3, 3] },
      { model: "b", grades: [3, 3] },
    ]);
    const disagree = judgeAgreement([
      { model: "a", grades: [3, 0] },
      { model: "b", grades: [0, 3] },
    ]);
    expect(disagree).toBeLessThan(agree);
  });
});
