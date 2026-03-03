/**
 * RALPH SR Fixture: SGLT2 Inhibitor Trials
 *
 * 5 landmark trials of SGLT2 inhibitors in heart failure.
 * Effect sizes are real published data (hazard ratios for
 * cardiovascular death or heart failure hospitalization).
 *
 * Sources:
 * - DAPA-HF: McMurray et al., NEJM 2019;381:1995-2008
 * - EMPEROR-Reduced: Packer et al., NEJM 2020;383:1413-1424
 * - DELIVER: Solomon et al., NEJM 2022;387:1089-1098
 * - EMPEROR-Preserved: Anker et al., NEJM 2021;385:1451-1461
 * - SOLOIST-WHF: Bhatt et al., NEJM 2021;384:117-128
 */

import type { StudyEffect } from "@/lib/systematic-review/meta-analysis";

/**
 * These are log(HR) and SE(log(HR)) from the published trials.
 * HR < 1 means SGLT2i is protective (fewer events).
 *
 * log(HR) values and SEs derived from published CIs using:
 * SE = (log(upperCI) - log(lowerCI)) / (2 * 1.96)
 */
export const SGLT2_STUDIES: StudyEffect[] = [
  {
    studyId: "DAPA-HF",
    studyLabel: "DAPA-HF (McMurray 2019)",
    effect: Math.log(0.74),
    se: (Math.log(0.85) - Math.log(0.65)) / (2 * 1.96),
    ciLower: Math.log(0.65),
    ciUpper: Math.log(0.85),
    n: 4744,
  },
  {
    studyId: "EMPEROR-Reduced",
    studyLabel: "EMPEROR-Reduced (Packer 2020)",
    effect: Math.log(0.75),
    se: (Math.log(0.86) - Math.log(0.65)) / (2 * 1.96),
    ciLower: Math.log(0.65),
    ciUpper: Math.log(0.86),
    n: 3730,
  },
  {
    studyId: "DELIVER",
    studyLabel: "DELIVER (Solomon 2022)",
    effect: Math.log(0.82),
    se: (Math.log(0.92) - Math.log(0.73)) / (2 * 1.96),
    ciLower: Math.log(0.73),
    ciUpper: Math.log(0.92),
    n: 6263,
  },
  {
    studyId: "EMPEROR-Preserved",
    studyLabel: "EMPEROR-Preserved (Anker 2021)",
    effect: Math.log(0.79),
    se: (Math.log(0.90) - Math.log(0.69)) / (2 * 1.96),
    ciLower: Math.log(0.69),
    ciUpper: Math.log(0.90),
    n: 5988,
  },
  {
    studyId: "SOLOIST-WHF",
    studyLabel: "SOLOIST-WHF (Bhatt 2021)",
    effect: Math.log(0.67),
    se: (Math.log(0.85) - Math.log(0.52)) / (2 * 1.96),
    ciLower: Math.log(0.52),
    ciUpper: Math.log(0.85),
    n: 1222,
  },
];

/**
 * Pre-computed expected pooled results using inverse-variance weighting.
 */
export function computeExpectedFixedEffect() {
  const studies = SGLT2_STUDIES;
  const weights = studies.map((s) => 1 / (s.se * s.se));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const pooledEffect =
    studies.reduce((sum, s, i) => sum + weights[i] * s.effect, 0) / totalWeight;
  const pooledSE = Math.sqrt(1 / totalWeight);

  const Q = studies.reduce(
    (sum, s, i) => sum + weights[i] * (s.effect - pooledEffect) ** 2,
    0
  );
  const df = studies.length - 1;
  const I2 = Math.max(0, ((Q - df) / Q) * 100);

  return {
    pooledLogHR: pooledEffect,
    pooledHR: Math.exp(pooledEffect),
    pooledSE,
    Q,
    df,
    I2,
    k: studies.length,
    weights,
    totalWeight,
  };
}

export const MOCK_PRISMA_FLOW = {
  identification: {
    databaseResults: 342,
    registerResults: 87,
    otherSources: 12,
    totalIdentified: 441,
    duplicatesRemoved: 56,
    automationExcluded: 0,
    otherReasonsRemoved: 0,
  },
  screening: {
    recordsScreened: 385,
    recordsExcluded: 340,
    exclusionReasons: {
      "Not SGLT2 inhibitor": 120,
      "Not heart failure": 85,
      "Review/editorial": 65,
      "Animal study": 40,
      "Duplicate population": 30,
    },
  },
  eligibility: {
    reportsRetrieved: 45,
    reportsNotRetrieved: 3,
    reportsAssessed: 42,
    reportsExcluded: 37,
    exclusionReasons: {
      "Wrong outcome": 15,
      "Insufficient data": 12,
      "Wrong comparator": 10,
    },
  },
  included: {
    studiesIncluded: 5,
    reportsIncluded: 5,
  },
};
