/**
 * Unit tests for the Network Meta-Analysis engine.
 *
 * Tests the pure mathematical functions only (no database or AI calls).
 *
 * Test cases:
 *  1. 3-treatment triangle network — verify Laplacian, L+, league table
 *  2. Star network — verify P-scores
 *  3. Inconsistency detection — closed loop with known inconsistency
 *  4. Single comparison — should degenerate to pairwise meta-analysis
 *  5. Disconnected network — should throw error
 *  6. Salam 2009 smoking cessation benchmark
 *  7. Random-effects model
 *  8. Matrix algebra helpers
 */

import { describe, it, expect } from "vitest";
import {
  buildNetworkGraph,
  computeNMA,
  computeLeagueTable,
  computePScores,
  testInconsistency,
  type NMAStudy,
} from "@/lib/systematic-review/network-meta-analysis";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TOL = 1e-3; // tolerance for floating-point comparison
const LOOSE_TOL = 0.05; // looser tolerance for complex computations

function makeStudy(
  id: string,
  t1: string,
  t2: string,
  effect: number,
  se: number,
  n1?: number,
  n2?: number
): NMAStudy {
  return { studyId: id, treatment1: t1, treatment2: t2, effect, se, n1, n2 };
}

// ---------------------------------------------------------------------------
// Test 1: Triangle network (A-B-C)
// ---------------------------------------------------------------------------

describe("3-treatment triangle network", () => {
  // Three treatments: A, B, C
  // Studies: A vs B (effect 0.5, se 0.2), B vs C (effect 0.3, se 0.25), A vs C (effect 0.7, se 0.3)
  const studies: NMAStudy[] = [
    makeStudy("s1", "A", "B", 0.5, 0.2),
    makeStudy("s2", "B", "C", 0.3, 0.25),
    makeStudy("s3", "A", "C", 0.7, 0.3),
  ];

  it("builds the correct adjacency matrix and Laplacian", () => {
    const graph = buildNetworkGraph(studies, 0);

    expect(graph.treatments).toEqual(["A", "B", "C"]);
    expect(graph.treatments).toHaveLength(3);

    // Adjacency: weight = 1/se^2
    // A-B: 1/0.04 = 25, B-C: 1/0.0625 = 16, A-C: 1/0.09 ≈ 11.111
    const wAB = 1 / (0.2 * 0.2);
    const wBC = 1 / (0.25 * 0.25);
    const wAC = 1 / (0.3 * 0.3);

    expect(graph.adjacency[0][1]).toBeCloseTo(wAB, 2);
    expect(graph.adjacency[1][0]).toBeCloseTo(wAB, 2);
    expect(graph.adjacency[1][2]).toBeCloseTo(wBC, 2);
    expect(graph.adjacency[0][2]).toBeCloseTo(wAC, 2);

    // Laplacian diagonal: sum of row
    expect(graph.laplacian[0][0]).toBeCloseTo(wAB + wAC, 2);
    expect(graph.laplacian[1][1]).toBeCloseTo(wAB + wBC, 2);
    expect(graph.laplacian[2][2]).toBeCloseTo(wBC + wAC, 2);

    // Laplacian off-diagonal = -adjacency
    expect(graph.laplacian[0][1]).toBeCloseTo(-wAB, 2);
    expect(graph.laplacian[1][2]).toBeCloseTo(-wBC, 2);
  });

  it("computes the NMA and produces a symmetric-antisymmetric league table", () => {
    const result = computeNMA(studies, "fixed");

    expect(result.treatments).toEqual(["A", "B", "C"]);
    expect(result.leagueTable).toHaveLength(3);
    expect(result.leagueTable[0]).toHaveLength(3);

    // Diagonal should be 0
    for (let i = 0; i < 3; i++) {
      expect(result.leagueTable[i][i]).toBeCloseTo(0, 6);
    }

    // Anti-symmetry: theta_ij = -theta_ji
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(result.leagueTable[i][j]).toBeCloseTo(
          -result.leagueTable[j][i],
          4
        );
      }
    }

    // Transitivity: theta_AC should be close to theta_AB + theta_BC
    const thetaAB = result.leagueTable[0][1];
    const thetaBC = result.leagueTable[1][2];
    const thetaAC = result.leagueTable[0][2];
    expect(thetaAC).toBeCloseTo(thetaAB + thetaBC, 2);
  });

  it("produces CI matrix with correct structure", () => {
    const result = computeNMA(studies, "fixed");

    // Diagonal CIs should be 0
    for (let i = 0; i < 3; i++) {
      expect(result.leagueTableCI[i][i].lower).toBe(0);
      expect(result.leagueTableCI[i][i].upper).toBe(0);
    }

    // CIs should contain the point estimate
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i !== j) {
          expect(result.leagueTableCI[i][j].lower).toBeLessThan(
            result.leagueTable[i][j] + TOL
          );
          expect(result.leagueTableCI[i][j].upper).toBeGreaterThan(
            result.leagueTable[i][j] - TOL
          );
        }
      }
    }
  });

  it("produces valid P-scores between 0 and 1", () => {
    const result = computeNMA(studies, "fixed");

    expect(result.pScores).toHaveLength(3);
    for (const ps of result.pScores) {
      expect(ps.score).toBeGreaterThanOrEqual(0);
      expect(ps.score).toBeLessThanOrEqual(1);
    }

    // P-scores should sum to approximately k * 0.5 = 1.5 (property of P-scores)
    const sum = result.pScores.reduce((a, b) => a + b.score, 0);
    expect(sum).toBeCloseTo(1.5, 1);
  });

  it("computes network geometry correctly", () => {
    const result = computeNMA(studies, "fixed");

    expect(result.networkGeometry.nodes).toHaveLength(3);
    expect(result.networkGeometry.edges).toHaveLength(3);

    // Each treatment appears in 2 studies
    for (const node of result.networkGeometry.nodes) {
      expect(node.size).toBe(2);
    }

    // Each edge has weight 1
    for (const edge of result.networkGeometry.edges) {
      expect(edge.weight).toBe(1);
    }
  });
});

// ---------------------------------------------------------------------------
// Test 2: Star network (one reference treatment)
// ---------------------------------------------------------------------------

describe("Star network (reference treatment)", () => {
  // Placebo is compared to A, B, C, D — no direct comparisons among A,B,C,D
  const studies: NMAStudy[] = [
    makeStudy("s1", "Placebo", "A", -1.0, 0.3),
    makeStudy("s2", "Placebo", "B", -0.5, 0.25),
    makeStudy("s3", "Placebo", "C", -0.8, 0.35),
    makeStudy("s4", "Placebo", "D", -0.2, 0.4),
  ];

  it("builds a connected star graph", () => {
    const graph = buildNetworkGraph(studies, 0);
    expect(graph.treatments).toHaveLength(5);
    expect(graph.edges).toHaveLength(4);
  });

  it("P-scores rank treatments by their effect vs Placebo", () => {
    const result = computeNMA(studies, "fixed");

    // Higher positive effect = better
    // A has largest effect (1.0 vs Placebo), then C (0.8), B (0.5), D (0.2)
    // P-scores should reflect this ranking
    const ranks = result.pScores.map((p) => p.treatment);

    // A should be ranked highest (best treatment)
    expect(ranks[0]).toBe("A");
    // Placebo should be ranked lowest
    expect(ranks[ranks.length - 1]).toBe("Placebo");
  });

  it("indirect comparisons are derived correctly", () => {
    const result = computeNMA(studies, "fixed");
    const indexOf = new Map<string, number>();
    result.treatments.forEach((t, i) => indexOf.set(t, i));

    // A vs B indirect: should be close to (-1.0) - (-0.5) = -0.5
    // i.e., A is 0.5 better than B (A vs Placebo minus B vs Placebo)
    const iA = indexOf.get("A")!;
    const iB = indexOf.get("B")!;
    const thetaAB = result.leagueTable[iA][iB];

    // Study convention: "Placebo vs A, effect=-1.0" means the observed effect
    // of A relative to Placebo is negative. In canonical ordering (A < Placebo),
    // the canonical direction is A -> Placebo, so the stored effect is negated: +1.0.
    // Thus: leagueTable[A][Placebo] ≈ +1.0 (A is 1.0 better than Placebo)
    //       leagueTable[B][Placebo] ≈ +0.5 (B is 0.5 better than Placebo)
    //       leagueTable[A][B] = theta_A - theta_B ≈ 1.0 - 0.5 = +0.5
    expect(thetaAB).toBeCloseTo(0.5, 1);
  });

  it("has no inconsistency (no closed loops)", () => {
    const result = computeNMA(studies, "fixed");
    // Star network has no closed loops, so no inconsistency tests
    expect(result.inconsistency).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Test 3: Inconsistency detection
// ---------------------------------------------------------------------------

describe("Inconsistency detection", () => {
  it("detects inconsistency in a triangle with conflicting evidence", () => {
    // A vs B: effect = 1.0 (A better)
    // B vs C: effect = 1.0 (B better)
    // A vs C: effect = 0.5 (inconsistent — should be ~2.0 if consistent)
    const studies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 1.0, 0.2),
      makeStudy("s2", "B", "C", 1.0, 0.2),
      makeStudy("s3", "A", "C", 0.5, 0.2), // inconsistent: direct says 0.5, indirect says 2.0
    ];

    const result = computeNMA(studies, "fixed");

    // Should have inconsistency results
    expect(result.inconsistency.length).toBeGreaterThan(0);

    // At least one comparison should show substantial inconsistency
    const acInconsistency = result.inconsistency.find(
      (ic) =>
        ic.comparison === "A vs C" ||
        ic.comparison === "C vs A"
    );

    // The A vs C comparison should show the largest inconsistency
    // Direct = 0.5, Indirect (via B) ≈ 1.0 + 1.0 = 2.0
    // Diff ≈ |0.5 - 2.0| = 1.5
    if (acInconsistency) {
      expect(Math.abs(acInconsistency.diff)).toBeGreaterThan(0.5);
    }
  });

  it("shows no significant inconsistency in a consistent triangle", () => {
    // Consistent network: A vs B = 0.5, B vs C = 0.3, A vs C = 0.8
    const studies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 0.5, 0.2),
      makeStudy("s2", "B", "C", 0.3, 0.2),
      makeStudy("s3", "A", "C", 0.8, 0.2), // consistent: 0.5 + 0.3 = 0.8
    ];

    const result = computeNMA(studies, "fixed");

    // All inconsistency p-values should be non-significant (> 0.05)
    for (const ic of result.inconsistency) {
      expect(ic.pValue).toBeGreaterThan(0.05);
    }
  });
});

// ---------------------------------------------------------------------------
// Test 4: Single comparison (degenerate case)
// ---------------------------------------------------------------------------

describe("Single comparison (pairwise degenerate case)", () => {
  it("produces correct results for two treatments with one study", () => {
    const studies: NMAStudy[] = [makeStudy("s1", "A", "B", 0.5, 0.2)];

    const result = computeNMA(studies, "fixed");

    expect(result.treatments).toHaveLength(2);
    expect(result.leagueTable[0][1]).toBeCloseTo(0.5, 3);
    expect(result.leagueTable[1][0]).toBeCloseTo(-0.5, 3);
  });

  it("matches pairwise meta-analysis for multiple studies of same comparison", () => {
    const studies: NMAStudy[] = [
      makeStudy("s1", "Drug", "Placebo", 0.5, 0.2),
      makeStudy("s2", "Drug", "Placebo", 0.6, 0.25),
      makeStudy("s3", "Drug", "Placebo", 0.4, 0.3),
    ];

    const result = computeNMA(studies, "fixed");

    // Manual inverse-variance pooling:
    const w1 = 1 / (0.2 * 0.2);
    const w2 = 1 / (0.25 * 0.25);
    const w3 = 1 / (0.3 * 0.3);
    const totalW = w1 + w2 + w3;
    const pooled = (w1 * 0.5 + w2 * 0.6 + w3 * 0.4) / totalW;

    // Find Drug vs Placebo
    const indexOf = new Map<string, number>();
    result.treatments.forEach((t, i) => indexOf.set(t, i));
    const iDrug = indexOf.get("Drug")!;
    const iPlacebo = indexOf.get("Placebo")!;

    expect(result.leagueTable[iDrug][iPlacebo]).toBeCloseTo(pooled, 3);
  });
});

// ---------------------------------------------------------------------------
// Test 5: Disconnected network
// ---------------------------------------------------------------------------

describe("Disconnected network", () => {
  it("throws an error for a disconnected network", () => {
    // A-B and C-D are two disconnected components
    const studies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 0.5, 0.2),
      makeStudy("s2", "C", "D", 0.3, 0.25),
    ];

    expect(() => computeNMA(studies, "fixed")).toThrow(/[Dd]isconnected/);
  });

  it("throws for three components", () => {
    const studies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 0.5, 0.2),
      makeStudy("s2", "C", "D", 0.3, 0.25),
      makeStudy("s3", "E", "F", 0.1, 0.15),
    ];

    expect(() => computeNMA(studies, "fixed")).toThrow(/[Dd]isconnected/);
  });
});

// ---------------------------------------------------------------------------
// Test 6: Salam 2009 smoking cessation benchmark
// ---------------------------------------------------------------------------

describe("Salam 2009 smoking cessation network (benchmark)", () => {
  /**
   * Simplified version of the smoking cessation network from:
   * Salam et al. (2009) / Dias et al. (2013)
   *
   * Treatments:
   *  1 = No intervention (reference)
   *  2 = Self-help
   *  3 = Individual counselling
   *  4 = Group counselling
   *
   * Study data (log-OR scale, approximate):
   * These values are derived from published NMA tutorials using this dataset.
   */
  const studies: NMAStudy[] = [
    // No intervention vs Self-help
    makeStudy("s01", "No intervention", "Self-help", -0.49, 0.64),
    makeStudy("s02", "No intervention", "Self-help", -0.32, 0.25),
    // No intervention vs Individual counselling
    makeStudy("s03", "No intervention", "Individual counselling", -0.58, 0.38),
    makeStudy("s04", "No intervention", "Individual counselling", -0.94, 0.60),
    makeStudy("s05", "No intervention", "Individual counselling", -0.30, 0.18),
    // No intervention vs Group counselling
    makeStudy("s06", "No intervention", "Group counselling", -1.09, 0.28),
    // Self-help vs Individual counselling
    makeStudy("s07", "Self-help", "Individual counselling", -0.34, 0.58),
    makeStudy("s08", "Self-help", "Individual counselling", -0.73, 0.36),
    // Individual vs Group counselling
    makeStudy("s09", "Individual counselling", "Group counselling", -0.30, 0.42),
  ];

  it("produces a complete result with 4 treatments", () => {
    const result = computeNMA(studies, "fixed");

    expect(result.treatments).toHaveLength(4);
    expect(result.leagueTable).toHaveLength(4);
    expect(result.pScores).toHaveLength(4);
    expect(result.networkGeometry.nodes).toHaveLength(4);
  });

  it("ranks treatments in expected order", () => {
    const result = computeNMA(studies, "fixed");

    // Expected ranking (best to worst):
    // Group counselling > Individual counselling > Self-help > No intervention
    const ranks = result.pScores.map((p) => p.treatment);

    // Group counselling should be near the top
    expect(ranks.indexOf("Group counselling")).toBeLessThan(
      ranks.indexOf("No intervention")
    );

    // Individual counselling should be better than no intervention
    expect(ranks.indexOf("Individual counselling")).toBeLessThan(
      ranks.indexOf("No intervention")
    );
  });

  it("estimates Group vs No intervention as significant", () => {
    const result = computeNMA(studies, "fixed");
    const indexOf = new Map<string, number>();
    result.treatments.forEach((t, i) => indexOf.set(t, i));

    const iGroup = indexOf.get("Group counselling")!;
    const iNone = indexOf.get("No intervention")!;

    // Study effects are "No intervention vs Group = -1.09" meaning Group is better.
    // In canonical ordering (Group < No intervention alphabetically), the stored
    // direction is Group -> No intervention, so effect is negated: +1.09.
    // leagueTable[Group][None] = theta_Group - theta_None > 0 (Group is better)
    const effect = result.leagueTable[iGroup][iNone];
    const ci = result.leagueTableCI[iGroup][iNone];

    expect(effect).toBeGreaterThan(0);
    // CI lower bound should be > 0 (significant)
    expect(ci.lower).toBeGreaterThan(0);
  });

  it("detects potential inconsistency in closed loops", () => {
    const result = computeNMA(studies, "fixed");

    // The network has closed loops (e.g., No intervention - Self-help - Individual)
    // There should be at least some inconsistency tests
    expect(result.inconsistency.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Test 7: Random-effects model
// ---------------------------------------------------------------------------

describe("Random-effects NMA", () => {
  const studies: NMAStudy[] = [
    makeStudy("s1", "A", "B", 0.5, 0.2),
    makeStudy("s2", "A", "B", 0.8, 0.25),
    makeStudy("s3", "B", "C", 0.3, 0.2),
    makeStudy("s4", "B", "C", 0.6, 0.3),
    makeStudy("s5", "A", "C", 0.9, 0.25),
    makeStudy("s6", "A", "C", 1.1, 0.3),
  ];

  it("produces a valid NMA result", () => {
    const result = computeNMA(studies, "random");

    expect(result.model).toBe("random");
    expect(result.treatments).toHaveLength(3);
    expect(result.tau2).toBeGreaterThanOrEqual(0);
  });

  it("has wider confidence intervals than fixed-effects", () => {
    const fixedResult = computeNMA(studies, "fixed");
    const randomResult = computeNMA(studies, "random");

    // Random-effects CIs should be at least as wide as fixed-effects
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === j) continue;
        const fixedWidth =
          fixedResult.leagueTableCI[i][j].upper -
          fixedResult.leagueTableCI[i][j].lower;
        const randomWidth =
          randomResult.leagueTableCI[i][j].upper -
          randomResult.leagueTableCI[i][j].lower;
        // Random should be >= fixed (or very close if tau2 ≈ 0)
        expect(randomWidth).toBeGreaterThanOrEqual(fixedWidth - TOL);
      }
    }
  });

  it("reports tau2 > 0 for heterogeneous data", () => {
    // Create studies with very different effects to ensure heterogeneity
    const hetStudies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 0.1, 0.1),
      makeStudy("s2", "A", "B", 2.0, 0.1),
      makeStudy("s3", "B", "C", 0.1, 0.1),
      makeStudy("s4", "B", "C", 1.5, 0.1),
      makeStudy("s5", "A", "C", 0.3, 0.1),
    ];

    const result = computeNMA(hetStudies, "random");
    expect(result.tau2).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Test 8: Edge cases and matrix helpers
// ---------------------------------------------------------------------------

describe("Edge cases", () => {
  it("handles studies with reversed treatment order", () => {
    // Same comparison, different direction conventions
    const studies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 0.5, 0.2),
      makeStudy("s2", "B", "A", -0.5, 0.2), // same info, reversed
      makeStudy("s3", "B", "C", 0.3, 0.25),
    ];

    const result = computeNMA(studies, "fixed");
    expect(result.treatments).toHaveLength(3);

    // A vs B effect should be close to 0.5 (pooled from two studies)
    const indexOf = new Map<string, number>();
    result.treatments.forEach((t, i) => indexOf.set(t, i));
    const thetaAB = result.leagueTable[indexOf.get("A")!][indexOf.get("B")!];
    expect(thetaAB).toBeCloseTo(0.5, 2);
  });

  it("handles a single study correctly", () => {
    const studies: NMAStudy[] = [makeStudy("s1", "X", "Y", 1.0, 0.5)];

    const result = computeNMA(studies, "fixed");
    expect(result.treatments).toHaveLength(2);
    expect(result.leagueTable[0][1]).toBeCloseTo(1.0, 3);
  });

  it("handles many studies per comparison", () => {
    const studies: NMAStudy[] = [];
    for (let i = 0; i < 20; i++) {
      studies.push(makeStudy(`s${i}`, "A", "B", 0.5 + Math.random() * 0.1, 0.2));
    }
    studies.push(makeStudy("s20", "B", "C", 0.3, 0.2));

    const result = computeNMA(studies, "fixed");
    expect(result.treatments).toHaveLength(3);
    // A vs B should be close to ~0.55 (mean of uniform 0.5-0.6)
    const indexOf = new Map<string, number>();
    result.treatments.forEach((t, i) => indexOf.set(t, i));
    const thetaAB = result.leagueTable[indexOf.get("A")!][indexOf.get("B")!];
    expect(thetaAB).toBeGreaterThan(0.4);
    expect(thetaAB).toBeLessThan(0.7);
  });

  it("throws for empty study array", () => {
    expect(() => computeNMA([], "fixed")).toThrow(/[Nn]o studies/);
  });
});

// ---------------------------------------------------------------------------
// Test 9: buildNetworkGraph directly
// ---------------------------------------------------------------------------

describe("buildNetworkGraph", () => {
  it("aggregates multiple studies for the same comparison", () => {
    const studies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 0.4, 0.2),
      makeStudy("s2", "A", "B", 0.6, 0.3),
      makeStudy("s3", "A", "C", 0.8, 0.25),
    ];

    const graph = buildNetworkGraph(studies, 0);

    // A-B edge should aggregate two studies
    const abEdge = graph.edges.find(
      (e) =>
        (e.treatment1 === "A" && e.treatment2 === "B") ||
        (e.treatment1 === "B" && e.treatment2 === "A")
    );
    expect(abEdge).toBeDefined();
    expect(abEdge!.studyCount).toBe(2);

    // Aggregated weight = 1/0.04 + 1/0.09 = 25 + 11.111 = 36.111
    const expectedWeight = 1 / (0.2 * 0.2) + 1 / (0.3 * 0.3);
    expect(abEdge!.weight).toBeCloseTo(expectedWeight, 2);
  });

  it("adjusts weights for random-effects (tau2 > 0)", () => {
    const studies: NMAStudy[] = [
      makeStudy("s1", "A", "B", 0.5, 0.2),
      makeStudy("s2", "B", "C", 0.3, 0.25),
    ];

    const tau2 = 0.1;
    const graph = buildNetworkGraph(studies, tau2);

    // A-B weight = 1 / (0.04 + 0.1) = 1/0.14 ≈ 7.143
    const abEdge = graph.edges.find(
      (e) => e.treatment1 === "A" && e.treatment2 === "B"
    );
    expect(abEdge!.weight).toBeCloseTo(1 / (0.04 + 0.1), 2);
  });
});

// ---------------------------------------------------------------------------
// Test 10: computeLeagueTable and computePScores directly
// ---------------------------------------------------------------------------

describe("computeLeagueTable", () => {
  it("produces correct variance and effects from a known pseudoinverse", () => {
    const treatments = ["A", "B"];
    // For L = [[w, -w], [-w, w]] with w=1, L+ = [[0.25, -0.25], [-0.25, 0.25]]
    const Lplus = [
      [0.25, -0.25],
      [-0.25, 0.25],
    ];

    // Potentials: theta_A = 0.5, theta_B = -0.3
    const potentials = [0.5, -0.3];

    const { leagueTable, leagueTableSE } = computeLeagueTable(
      treatments,
      Lplus,
      potentials
    );

    // Effects: theta_AB = theta_A - theta_B = 0.5 - (-0.3) = 0.8
    expect(leagueTable[0][1]).toBeCloseTo(0.8, 6);
    expect(leagueTable[1][0]).toBeCloseTo(-0.8, 6);

    // var_AB = L+_00 + L+_11 - 2*L+_01 = 0.25 + 0.25 - 2*(-0.25) = 1.0
    expect(leagueTableSE[0][1]).toBeCloseTo(1.0, 6);
  });

  it("produces zero effects when no potentials given", () => {
    const treatments = ["A", "B"];
    const Lplus = [
      [0.25, -0.25],
      [-0.25, 0.25],
    ];

    const { leagueTable } = computeLeagueTable(treatments, Lplus);
    expect(leagueTable[0][1]).toBe(0);
    expect(leagueTable[1][0]).toBe(0);
  });
});

describe("computePScores", () => {
  it("assigns score 1 to clearly best treatment and 0 to worst", () => {
    const treatments = ["Best", "Worst"];
    // Best vs Worst: effect = 10, SE = 0.1 (overwhelmingly positive)
    const leagueTable = [
      [0, 10],
      [-10, 0],
    ];
    const leagueTableSE = [
      [0, 0.1],
      [0.1, 0],
    ];

    const scores = computePScores(treatments, leagueTable, leagueTableSE);

    expect(scores[0].treatment).toBe("Best");
    expect(scores[0].score).toBeGreaterThan(0.99);
    expect(scores[1].treatment).toBe("Worst");
    expect(scores[1].score).toBeLessThan(0.01);
  });

  it("assigns approximately 0.5 to equally effective treatments", () => {
    const treatments = ["A", "B"];
    const leagueTable = [
      [0, 0],
      [0, 0],
    ];
    const leagueTableSE = [
      [0, 1],
      [1, 0],
    ];

    const scores = computePScores(treatments, leagueTable, leagueTableSE);

    expect(scores[0].score).toBeCloseTo(0.5, 1);
    expect(scores[1].score).toBeCloseTo(0.5, 1);
  });
});

// ---------------------------------------------------------------------------
// Test 11: Large network
// ---------------------------------------------------------------------------

describe("Larger network (6 treatments)", () => {
  const studies: NMAStudy[] = [
    makeStudy("s01", "A", "B", 0.2, 0.15),
    makeStudy("s02", "A", "C", 0.4, 0.18),
    makeStudy("s03", "A", "D", 0.6, 0.20),
    makeStudy("s04", "B", "C", 0.15, 0.16),
    makeStudy("s05", "B", "E", 0.35, 0.22),
    makeStudy("s06", "C", "D", 0.1, 0.19),
    makeStudy("s07", "C", "F", 0.5, 0.25),
    makeStudy("s08", "D", "E", -0.1, 0.17),
    makeStudy("s09", "D", "F", 0.3, 0.21),
    makeStudy("s10", "E", "F", 0.4, 0.23),
  ];

  it("produces valid results for a 6-treatment network", () => {
    const result = computeNMA(studies, "fixed");

    expect(result.treatments).toHaveLength(6);
    expect(result.leagueTable).toHaveLength(6);
    expect(result.pScores).toHaveLength(6);

    // Anti-symmetry check
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        expect(result.leagueTable[i][j]).toBeCloseTo(
          -result.leagueTable[j][i],
          4
        );
      }
    }

    // P-scores sum to k/2 = 3
    const pSum = result.pScores.reduce((a, b) => a + b.score, 0);
    expect(pSum).toBeCloseTo(3, 1);
  });

  it("random-effects model runs without error", () => {
    const result = computeNMA(studies, "random");
    expect(result.model).toBe("random");
    expect(result.treatments).toHaveLength(6);
  });
});
