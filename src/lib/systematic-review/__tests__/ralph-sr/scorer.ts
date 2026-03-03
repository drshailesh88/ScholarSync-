/**
 * RALPH SR Scorer
 *
 * Domain-specific scoring for systematic review pipeline tests.
 * Each cycle is scored on a 1-10 scale across relevant dimensions.
 */

export interface CycleScore {
  cycleId: number;
  cycleName: string;
  dimensions: ScoringDimension[];
  overallScore: number;
  maxScore: number;
  normalizedScore: number;
  issues: string[];
  passedChecks: string[];
  patches: string[];
  timestamp: string;
}

export interface ScoringDimension {
  name: string;
  score: number;
  maxScore: number;
  weight: number;
  details: string;
}

export interface Scorecard {
  phase: number;
  cycles: CycleScore[];
  phaseAverage: number;
  gateStatus: "locked" | "unlocked";
  lastUpdated: string;
}

/** Check if a numeric value is within tolerance of expected */
export function isWithinTolerance(
  actual: number,
  expected: number,
  tolerance: number = 0.01
): boolean {
  return Math.abs(actual - expected) <= tolerance;
}

/** Check PRISMA flow arithmetic consistency */
export function checkPRISMAConsistency(flow: {
  identification: {
    databaseResults: number;
    registerResults: number;
    otherSources: number;
    totalIdentified: number;
    duplicatesRemoved: number;
    automationExcluded: number;
    otherReasonsRemoved: number;
  };
  screening: {
    recordsScreened: number;
    recordsExcluded: number;
    exclusionReasons: Record<string, number>;
  };
  eligibility: {
    reportsRetrieved: number;
    reportsNotRetrieved: number;
    reportsAssessed: number;
    reportsExcluded: number;
    exclusionReasons: Record<string, number>;
  };
  included: {
    studiesIncluded: number;
    reportsIncluded: number;
  };
}): { consistent: boolean; errors: string[] } {
  const errors: string[] = [];

  const expectedTotal =
    flow.identification.databaseResults +
    flow.identification.registerResults +
    flow.identification.otherSources;
  if (flow.identification.totalIdentified !== expectedTotal) {
    errors.push(
      `totalIdentified (${flow.identification.totalIdentified}) != sum of sources (${expectedTotal})`
    );
  }

  const expectedScreened =
    flow.identification.totalIdentified -
    flow.identification.duplicatesRemoved -
    flow.identification.automationExcluded -
    flow.identification.otherReasonsRemoved;
  if (flow.screening.recordsScreened !== expectedScreened) {
    errors.push(
      `recordsScreened (${flow.screening.recordsScreened}) != expected (${expectedScreened})`
    );
  }

  const expectedRetrieved =
    flow.screening.recordsScreened - flow.screening.recordsExcluded;
  if (flow.eligibility.reportsRetrieved !== expectedRetrieved) {
    errors.push(
      `reportsRetrieved (${flow.eligibility.reportsRetrieved}) != expected (${expectedRetrieved})`
    );
  }

  const expectedAssessed =
    flow.eligibility.reportsRetrieved - flow.eligibility.reportsNotRetrieved;
  if (flow.eligibility.reportsAssessed !== expectedAssessed) {
    errors.push(
      `reportsAssessed (${flow.eligibility.reportsAssessed}) != expected (${expectedAssessed})`
    );
  }

  const expectedIncluded =
    flow.eligibility.reportsAssessed - flow.eligibility.reportsExcluded;
  if (flow.included.studiesIncluded !== expectedIncluded) {
    errors.push(
      `studiesIncluded (${flow.included.studiesIncluded}) != expected (${expectedIncluded})`
    );
  }

  const screeningExclusionSum = Object.values(
    flow.screening.exclusionReasons
  ).reduce((a, b) => a + b, 0);
  if (screeningExclusionSum !== flow.screening.recordsExcluded) {
    errors.push(
      `Screening exclusion reasons sum (${screeningExclusionSum}) != recordsExcluded (${flow.screening.recordsExcluded})`
    );
  }

  const eligibilityExclusionSum = Object.values(
    flow.eligibility.exclusionReasons
  ).reduce((a, b) => a + b, 0);
  if (eligibilityExclusionSum !== flow.eligibility.reportsExcluded) {
    errors.push(
      `Eligibility exclusion reasons sum (${eligibilityExclusionSum}) != reportsExcluded (${flow.eligibility.reportsExcluded})`
    );
  }

  const allNumbers = [
    flow.identification.databaseResults,
    flow.identification.registerResults,
    flow.identification.otherSources,
    flow.identification.totalIdentified,
    flow.identification.duplicatesRemoved,
    flow.screening.recordsScreened,
    flow.screening.recordsExcluded,
    flow.eligibility.reportsRetrieved,
    flow.eligibility.reportsNotRetrieved,
    flow.eligibility.reportsAssessed,
    flow.eligibility.reportsExcluded,
    flow.included.studiesIncluded,
    flow.included.reportsIncluded,
  ];
  if (allNumbers.some((n) => n < 0)) {
    errors.push("PRISMA flow contains negative numbers");
  }

  return { consistent: errors.length === 0, errors };
}

export function scoreCycle(
  cycleId: number,
  cycleName: string,
  dimensions: ScoringDimension[],
  issues: string[],
  passedChecks: string[],
  patches: string[] = []
): CycleScore {
  const totalWeightedScore = dimensions.reduce(
    (sum, d) => sum + (d.score / d.maxScore) * d.weight * 10,
    0
  );
  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
  const normalizedScore =
    totalWeight > 0
      ? Math.round((totalWeightedScore / totalWeight) * 100) / 100
      : 0;

  return {
    cycleId,
    cycleName,
    dimensions,
    overallScore: dimensions.reduce((s, d) => s + d.score, 0),
    maxScore: dimensions.reduce((s, d) => s + d.maxScore, 0),
    normalizedScore,
    issues,
    passedChecks,
    patches,
    timestamp: new Date().toISOString(),
  };
}

export function computePhaseAverage(cycles: CycleScore[]): number {
  if (cycles.length === 0) return 0;
  return (
    Math.round(
      (cycles.reduce((s, c) => s + c.normalizedScore, 0) / cycles.length) * 100
    ) / 100
  );
}

export function isPhaseUnlocked(phaseAverage: number): boolean {
  return phaseAverage >= 7.0;
}
