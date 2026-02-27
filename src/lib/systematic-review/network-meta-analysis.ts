/**
 * Network Meta-Analysis Engine — Graph-Theoretical Approach (pure TypeScript)
 *
 * Implements the Ruecker (2012) graph-theoretical approach to NMA:
 *  1. Aggregate studies per comparison (inverse-variance pooling)
 *  2. Build adjacency matrix A from aggregated weights
 *  3. Compute graph Laplacian L = D - A
 *  4. Compute Moore-Penrose pseudoinverse L+ via SVD
 *  5. Compute node potentials: theta = L+ * b  (where b = B^T * W * y_direct)
 *  6. NMA estimates: theta_ij = theta_i - theta_j
 *  7. Variance of theta_ij = L+_ii + L+_jj - 2*L+_ij
 *
 * Also implements:
 *  - P-scores for treatment ranking (Ruecker & Schwarzer 2015)
 *  - Node-splitting inconsistency test (Dias et al. 2010)
 *  - Fixed-effects and random-effects models (DL-style heterogeneity)
 *  - Network geometry extraction for visualization
 *
 * References:
 *  - Ruecker G. (2012). Network meta-analysis, electrical networks and graph theory.
 *    Research Synthesis Methods, 3(4), 312-324.
 *  - Ruecker G, Schwarzer G. (2015). Ranking treatments in frequentist network
 *    meta-analysis works without resampling methods. BMC Medical Research Methodology.
 *  - Dias S, et al. (2010). Checking consistency in mixed treatment comparison
 *    meta-analysis. Statistics in Medicine, 29(7-8), 932-944.
 */

import { computeREML, type StudyEffect } from "./meta-analysis";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single pairwise comparison from a study, on the log scale. */
export interface NMAStudy {
  studyId: string;
  treatment1: string;
  treatment2: string;
  /** Effect estimate (log-scale for OR/RR, raw for MD/SMD). treatment1 vs treatment2. */
  effect: number;
  /** Standard error of the effect estimate. */
  se: number;
  /** Sample size in treatment1 arm (optional). */
  n1?: number;
  /** Sample size in treatment2 arm (optional). */
  n2?: number;
}

/** Full result of a network meta-analysis. */
export interface NMAResult {
  /** Ordered list of treatment labels. */
  treatments: string[];
  /** k x k matrix of relative effects (row i vs column j). leagueTable[i][j] = theta_ij. */
  leagueTable: number[][];
  /** k x k matrix of 95% confidence intervals for relative effects. */
  leagueTableCI: { lower: number; upper: number }[][];
  /** P-scores for treatment ranking (higher = better). Sorted descending by score. */
  pScores: { treatment: string; score: number }[];
  /** Node-splitting inconsistency results for closed loops. */
  inconsistency: {
    comparison: string;
    direct: number;
    indirect: number;
    diff: number;
    pValue: number;
  }[];
  /** Network geometry for visualization (nodes sized by study count, edges by weight). */
  networkGeometry: {
    nodes: { id: string; size: number }[];
    edges: { source: string; target: string; weight: number }[];
  };
  /** Heterogeneity variance (tau-squared), 0 for fixed-effects model. */
  tau2: number;
  /** Model type used. */
  model: "fixed" | "random";
}

// ---------------------------------------------------------------------------
// Matrix algebra helpers (pure TypeScript, no dependencies)
// ---------------------------------------------------------------------------

type Matrix = number[][];

/**
 * Creates a zero matrix of given dimensions.
 */
function zeros(rows: number, cols: number): Matrix {
  return Array.from({ length: rows }, () => new Array(cols).fill(0));
}

/**
 * Creates an identity matrix of size n.
 */
function eye(n: number): Matrix {
  const m = zeros(n, n);
  for (let i = 0; i < n; i++) m[i][i] = 1;
  return m;
}

/**
 * Transposes a matrix.
 */
function transpose(A: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const T = zeros(cols, rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      T[j][i] = A[i][j];
    }
  }
  return T;
}

/**
 * Multiplies two matrices A (m x n) and B (n x p) => C (m x p).
 */
function matMul(A: Matrix, B: Matrix): Matrix {
  const m = A.length;
  const n = A[0].length;
  const p = B[0].length;
  const C = zeros(m, p);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += A[i][k] * B[k][j];
      }
      C[i][j] = sum;
    }
  }
  return C;
}

/**
 * Multiplies a matrix A (m x n) by a column vector v (n x 1) => result (m x 1).
 */
function matVecMul(A: Matrix, v: number[]): number[] {
  const m = A.length;
  const n = A[0].length;
  const result = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result[i] += A[i][j] * v[j];
    }
  }
  return result;
}

/**
 * Computes the 2-norm of a column of a matrix.
 */
function colNorm(A: Matrix, col: number): number {
  let sum = 0;
  for (let i = 0; i < A.length; i++) {
    sum += A[i][col] * A[i][col];
  }
  return Math.sqrt(sum);
}

/**
 * Deep-copies a matrix.
 */
function cloneMatrix(A: Matrix): Matrix {
  return A.map((row) => [...row]);
}

/**
 * Computes the Singular Value Decomposition A = U * diag(S) * V^T
 * using the one-sided Jacobi iterative algorithm.
 *
 * This is a pure-TypeScript implementation suitable for small to medium
 * matrices (up to ~50x50 which is well beyond typical NMA networks).
 *
 * @param A - Input matrix (m x n), m >= n
 * @returns { U, S, V } where U is m x n, S is length-n array, V is n x n
 */
function svd(A: Matrix): { U: Matrix; S: number[]; V: Matrix } {
  const m = A.length;
  const n = A[0].length;

  // Work on a copy
  const U = cloneMatrix(A);
  const V = eye(n);

  const maxIter = 200;
  const tol = 1e-12;

  // One-sided Jacobi SVD: repeatedly apply Jacobi rotations to U^T * U
  for (let iter = 0; iter < maxIter; iter++) {
    let converged = true;

    for (let p = 0; p < n - 1; p++) {
      for (let q = p + 1; q < n; q++) {
        // Compute elements of 2x2 Gram matrix G = U^T * U for columns p, q
        let alpha = 0;
        let beta = 0;
        let gamma = 0;
        for (let i = 0; i < m; i++) {
          alpha += U[i][p] * U[i][p];
          beta += U[i][q] * U[i][q];
          gamma += U[i][p] * U[i][q];
        }

        // Check convergence for this pair
        if (Math.abs(gamma) < tol * Math.sqrt(alpha * beta + 1e-300)) continue;
        converged = false;

        // Compute Jacobi rotation angle
        // When zeta = 0 (alpha == beta), the rotation should be pi/4,
        // giving t = 1 (or -1 depending on sign of gamma).
        const zeta = (beta - alpha) / (2 * gamma);
        let t: number;
        if (zeta === 0) {
          t = 1; // pi/4 rotation
        } else {
          t =
            Math.sign(zeta) / (Math.abs(zeta) + Math.sqrt(1 + zeta * zeta));
        }
        const c = 1 / Math.sqrt(1 + t * t);
        const s = t * c;

        // Apply rotation to columns of U
        for (let i = 0; i < m; i++) {
          const up = U[i][p];
          const uq = U[i][q];
          U[i][p] = c * up - s * uq;
          U[i][q] = s * up + c * uq;
        }

        // Apply rotation to columns of V
        for (let i = 0; i < n; i++) {
          const vp = V[i][p];
          const vq = V[i][q];
          V[i][p] = c * vp - s * vq;
          V[i][q] = s * vp + c * vq;
        }
      }
    }

    if (converged) break;
  }

  // Extract singular values and normalize U columns
  const S: number[] = [];
  for (let j = 0; j < n; j++) {
    const norm = colNorm(U, j);
    S.push(norm);
    if (norm > tol) {
      for (let i = 0; i < m; i++) {
        U[i][j] /= norm;
      }
    }
  }

  // Sort singular values in descending order
  const indices = Array.from({ length: n }, (_, i) => i);
  indices.sort((a, b) => S[b] - S[a]);

  const sortedS = indices.map((i) => S[i]);
  const sortedU = zeros(m, n);
  const sortedV = zeros(n, n);

  for (let j = 0; j < n; j++) {
    const srcIdx = indices[j];
    for (let i = 0; i < m; i++) sortedU[i][j] = U[i][srcIdx];
    for (let i = 0; i < n; i++) sortedV[i][j] = V[i][srcIdx];
  }

  return { U: sortedU, S: sortedS, V: sortedV };
}

/**
 * Computes the Moore-Penrose pseudoinverse of a symmetric matrix using SVD.
 *
 * For a matrix A = U * diag(S) * V^T, the pseudoinverse is:
 *   A+ = V * diag(1/S_i for S_i > tol, else 0) * U^T
 *
 * @param A - Symmetric matrix (n x n)
 * @param tol - Threshold below which singular values are treated as zero
 * @returns The pseudoinverse matrix A+ (n x n)
 */
function pseudoinverse(A: Matrix, tol: number = 1e-10): Matrix {
  const { U, S, V } = svd(A);
  const n = S.length;

  // Build diagonal of reciprocal singular values
  const Sinv = zeros(n, n);
  for (let i = 0; i < n; i++) {
    Sinv[i][i] = S[i] > tol ? 1 / S[i] : 0;
  }

  // A+ = V * Sinv * U^T
  return matMul(matMul(V, Sinv), transpose(U));
}

// ---------------------------------------------------------------------------
// Standard normal CDF (duplicated from meta-analysis.ts to avoid
// exporting internal helpers; kept minimal)
// ---------------------------------------------------------------------------

/** Standard normal CDF (Abramowitz & Stegun approximation). */
function normalCDF(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const az = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * az);
  const y =
    1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-az * az);

  return 0.5 * (1.0 + sign * y);
}

/** Two-tailed p-value from z-score. */
function zToPValue(z: number): number {
  return 2 * (1 - normalCDF(Math.abs(z)));
}

const Z_95 = 1.96;

// ---------------------------------------------------------------------------
// Network graph construction
// ---------------------------------------------------------------------------

/**
 * Aggregates multiple studies comparing the same pair of treatments
 * into a single weight (sum of inverse variances) and pooled effect.
 */
interface AggregatedEdge {
  treatment1: string;
  treatment2: string;
  /** Index of treatment1 in the treatments array (canonical: lo < hi). */
  loIdx: number;
  /** Index of treatment2 in the treatments array (canonical: lo < hi). */
  hiIdx: number;
  weight: number; // sum of 1/(se^2 + tau^2) across studies
  pooledEffect: number; // inverse-variance weighted mean (lo -> hi direction)
  studyCount: number;
}

/**
 * Builds the adjacency matrix, graph Laplacian, and aggregated edge data
 * from a set of NMA studies.
 *
 * Steps:
 *  1. Extract unique treatments and assign indices
 *  2. Aggregate studies per comparison (inverse-variance pooling)
 *  3. Build weighted adjacency matrix A (weights = sum of 1/variance)
 *  4. Build Laplacian L = D - A (D = diagonal matrix of row sums)
 *
 * @param studies - Array of pairwise study comparisons
 * @param tau2 - Between-study heterogeneity variance (0 for fixed-effects)
 * @returns treatments, adjacency matrix, Laplacian, aggregated edges
 * @throws Error if the network is disconnected
 */
export function buildNetworkGraph(
  studies: NMAStudy[],
  tau2: number = 0
): {
  treatments: string[];
  adjacency: Matrix;
  laplacian: Matrix;
  edges: AggregatedEdge[];
} {
  // 1. Extract unique treatments
  const treatmentSet = new Set<string>();
  for (const s of studies) {
    treatmentSet.add(s.treatment1);
    treatmentSet.add(s.treatment2);
  }
  const treatments = Array.from(treatmentSet).sort();
  const k = treatments.length;
  const indexOf = new Map<string, number>();
  treatments.forEach((t, i) => indexOf.set(t, i));

  // 2. Aggregate studies per comparison
  const edgeMap = new Map<string, { weight: number; weightedEffect: number; count: number }>();

  for (const s of studies) {
    // Canonical key: always smaller index first
    const i1 = indexOf.get(s.treatment1)!;
    const i2 = indexOf.get(s.treatment2)!;
    const [lo, hi] = i1 < i2 ? [i1, i2] : [i2, i1];
    const key = `${lo}:${hi}`;

    // Weight for this study: 1 / (se^2 + tau^2)
    const w = 1 / (s.se * s.se + tau2);
    // Effect direction: canonical direction is lo -> hi
    const eff = i1 < i2 ? s.effect : -s.effect;

    const existing = edgeMap.get(key);
    if (existing) {
      existing.weight += w;
      existing.weightedEffect += w * eff;
      existing.count += 1;
    } else {
      edgeMap.set(key, { weight: w, weightedEffect: w * eff, count: 1 });
    }
  }

  // Build aggregated edges
  const edges: AggregatedEdge[] = [];
  for (const [key, val] of edgeMap) {
    const [lo, hi] = key.split(":").map(Number);
    edges.push({
      treatment1: treatments[lo],
      treatment2: treatments[hi],
      loIdx: lo,
      hiIdx: hi,
      weight: val.weight,
      pooledEffect: val.weightedEffect / val.weight,
      studyCount: val.count,
    });
  }

  // 3. Build adjacency matrix
  const A = zeros(k, k);
  for (const edge of edges) {
    A[edge.loIdx][edge.hiIdx] = edge.weight;
    A[edge.hiIdx][edge.loIdx] = edge.weight;
  }

  // 4. Build Laplacian L = D - A
  const L = zeros(k, k);
  for (let i = 0; i < k; i++) {
    let degree = 0;
    for (let j = 0; j < k; j++) {
      degree += A[i][j];
      L[i][j] = -A[i][j];
    }
    L[i][i] = degree;
  }

  // 5. Check connectivity via the rank of L
  validateConnectivity(L, k);

  return { treatments, adjacency: A, laplacian: L, edges };
}

/**
 * Validates that the network is connected by checking that the Laplacian
 * has exactly one zero singular value (within tolerance).
 *
 * @throws Error if the network is disconnected
 */
function validateConnectivity(L: Matrix, k: number): void {
  if (k <= 1) return;

  const { S } = svd(L);
  // Count near-zero singular values
  const tol = 1e-8;
  let zeroCount = 0;
  for (const s of S) {
    if (s < tol) zeroCount++;
  }

  if (zeroCount > 1) {
    throw new Error(
      `Disconnected network detected: the treatment network has ${zeroCount} ` +
        `connected components. All treatments must be connected (directly or ` +
        `indirectly) for network meta-analysis.`
    );
  }
}

// ---------------------------------------------------------------------------
// Core NMA computation
// ---------------------------------------------------------------------------

/**
 * Computes the node potential vector from the Laplacian pseudoinverse
 * and the aggregated edge data (Ruecker 2012, equation 11).
 *
 * The key insight: In graph-theoretical NMA, each node (treatment) gets a
 * "potential" value, and the relative effect between treatments i and j is
 * simply theta_i - theta_j.
 *
 * The potentials are computed as:
 *   theta = L+ * b
 * where b is the "current injection" vector:
 *   b_i = sum over edges incident to i of (w_e * y_e * sign_e)
 *
 * Here w_e is the weight of edge e, y_e is the observed direct effect,
 * and sign_e is +1 if i is the "hi" node and -1 if i is the "lo" node.
 *
 * @param Lplus - Pseudoinverse of the Laplacian (k x k)
 * @param edges - Aggregated edge data
 * @param k - Number of treatments
 * @returns Node potential vector (length k)
 */
function computeNodePotentials(
  Lplus: Matrix,
  edges: AggregatedEdge[],
  k: number
): number[] {
  // Build the "current injection" vector b
  // b_i = sum over edges e incident to i of: w_e * y_e * direction
  // For edge (lo, hi) with pooled effect y (in lo->hi direction):
  //   contribution to b[lo] = +w * y  (current flows from lo)
  //   contribution to b[hi] = -w * y  (current flows into hi)
  const b = new Array(k).fill(0);
  for (const edge of edges) {
    const flow = edge.weight * edge.pooledEffect;
    b[edge.loIdx] += flow;
    b[edge.hiIdx] -= flow;
  }

  // theta = L+ * b
  return matVecMul(Lplus, b);
}

/**
 * Computes the league table of all pairwise relative effects and their
 * standard errors from the Laplacian pseudoinverse and node potentials.
 *
 * Effects:
 *   leagueTable[i][j] = theta_i - theta_j  (treatment i vs treatment j)
 *
 * Standard errors (from Ruecker 2012):
 *   var(theta_ij) = L+_ii + L+_jj - 2*L+_ij
 *   SE(theta_ij) = sqrt(var(theta_ij))
 *
 * @param treatments - Ordered treatment labels
 * @param Lplus - Moore-Penrose pseudoinverse of the Laplacian
 * @param potentials - Node potential vector from computeNodePotentials
 * @returns leagueTable (effects) and leagueTableSE (standard errors)
 */
export function computeLeagueTable(
  treatments: string[],
  Lplus: Matrix,
  potentials?: number[]
): { leagueTable: Matrix; leagueTableSE: Matrix } {
  const k = treatments.length;
  const effects = zeros(k, k);
  const ses = zeros(k, k);

  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      if (i === j) {
        effects[i][j] = 0;
        ses[i][j] = 0;
      } else {
        // Effect estimate: difference of node potentials
        if (potentials) {
          effects[i][j] = potentials[i] - potentials[j];
        } else {
          // If no potentials given, effects are 0 (variance-only mode)
          effects[i][j] = 0;
        }
        // Variance from Ruecker (2012) equation 8
        const variance = Lplus[i][i] + Lplus[j][j] - 2 * Lplus[i][j];
        ses[i][j] = Math.sqrt(Math.max(0, variance));
      }
    }
  }

  return { leagueTable: effects, leagueTableSE: ses };
}

/**
 * Computes P-scores for treatment ranking (Ruecker & Schwarzer 2015).
 *
 * P-scores are defined as the mean of the one-sided p-values across all
 * pairwise comparisons. A P-score of 1 means the treatment is certainly
 * the best; 0 means certainly the worst.
 *
 * For treatment i:
 *   P_i = (1 / (k-1)) * sum_{j != i} Phi(theta_ij / se_ij)
 *
 * where Phi is the standard normal CDF.
 *
 * @param treatments - Ordered treatment labels
 * @param leagueTable - k x k matrix of relative effects
 * @param leagueTableSE - k x k matrix of standard errors
 * @returns Array of { treatment, score } sorted descending by score
 */
export function computePScores(
  treatments: string[],
  leagueTable: Matrix,
  leagueTableSE: Matrix
): { treatment: string; score: number }[] {
  const k = treatments.length;
  const scores: { treatment: string; score: number }[] = [];

  for (let i = 0; i < k; i++) {
    let sum = 0;
    let count = 0;
    for (let j = 0; j < k; j++) {
      if (i === j) continue;
      const se = leagueTableSE[i][j];
      if (se > 0) {
        // P(treatment i better than j) = Phi(theta_ij / se_ij)
        // Assumes higher effect is better
        sum += normalCDF(leagueTable[i][j] / se);
      } else {
        sum += 0.5;
      }
      count++;
    }
    scores.push({
      treatment: treatments[i],
      score: count > 0 ? sum / count : 0.5,
    });
  }

  return scores.sort((a, b) => b.score - a.score);
}

/**
 * Estimates the common heterogeneity variance (tau-squared) for the network
 * using a DerSimonian-Laird-type Q-based estimator on the residuals of the
 * fixed-effects NMA model.
 *
 * @param studies - Array of NMA studies
 * @returns Estimated tau-squared
 */
function estimateNetworkTau2(studies: NMAStudy[]): number {
  if (studies.length <= 2) return 0;

  // Build fixed-effects network
  const { treatments, laplacian, edges } = buildNetworkGraph(studies, 0);
  const Lplus = pseudoinverse(laplacian);
  const potentials = computeNodePotentials(Lplus, edges, treatments.length);
  const { leagueTable } = computeLeagueTable(treatments, Lplus, potentials);

  const indexOf = new Map<string, number>();
  treatments.forEach((t, i) => indexOf.set(t, i));

  // Compute Q statistic from residuals
  const weights: number[] = [];
  const residuals: number[] = [];

  for (const s of studies) {
    const i = indexOf.get(s.treatment1)!;
    const j = indexOf.get(s.treatment2)!;
    const predicted = leagueTable[i][j];
    const w = 1 / (s.se * s.se);
    weights.push(w);
    residuals.push(s.effect - predicted);
  }

  const Q = residuals.reduce((sum, r, i) => sum + weights[i] * r * r, 0);
  const totalW = weights.reduce((a, b) => a + b, 0);

  // df = number of studies - (k - 1) where k = number of treatments
  const k = treatments.length;
  const df = studies.length - (k - 1);

  if (df <= 0) return 0;

  const C = totalW - weights.reduce((s, w) => s + (w * w) / totalW, 0);
  return C > 0 ? Math.max(0, (Q - df) / C) : 0;
}

/**
 * Tests for inconsistency using the node-splitting approach (Dias et al. 2010).
 *
 * For each comparison that has both direct and indirect evidence (i.e., it
 * participates in at least one closed loop), this function:
 *  1. Estimates the direct effect from studies comparing i vs j directly
 *  2. Estimates the indirect effect from the network excluding direct i-j studies
 *  3. Tests the difference (direct - indirect) for significance
 *
 * @param studies - Array of NMA studies
 * @param nmaResult - Full NMA result (used to identify comparisons)
 * @param tau2 - Heterogeneity variance
 * @returns Array of inconsistency test results for each testable comparison
 */
export function testInconsistency(
  studies: NMAStudy[],
  nmaResult: NMAResult,
  tau2: number = 0
): NMAResult["inconsistency"] {
  const results: NMAResult["inconsistency"] = [];
  const treatments = nmaResult.treatments;
  const indexOf = new Map<string, number>();
  treatments.forEach((t, i) => indexOf.set(t, i));

  // Identify direct comparisons (pairs with at least one study)
  const directPairs = new Map<string, NMAStudy[]>();
  for (const s of studies) {
    const i = indexOf.get(s.treatment1)!;
    const j = indexOf.get(s.treatment2)!;
    const [lo, hi] = i < j ? [i, j] : [j, i];
    const key = `${lo}:${hi}`;
    if (!directPairs.has(key)) directPairs.set(key, []);
    directPairs.get(key)!.push(s);
  }

  // For each direct comparison, check if removing it still leaves a connected network
  for (const [key, directStudies] of directPairs) {
    const [lo, hi] = key.split(":").map(Number);
    const t1 = treatments[lo];
    const t2 = treatments[hi];

    // Direct estimate: inverse-variance pooled from direct studies (canonical lo->hi)
    const directWeights = directStudies.map((s) => 1 / (s.se * s.se + tau2));
    const totalDW = directWeights.reduce((a, b) => a + b, 0);
    const directEffects = directStudies.map((s) => {
      const i = indexOf.get(s.treatment1)!;
      const j = indexOf.get(s.treatment2)!;
      return i < j ? s.effect : -s.effect;
    });
    const directEffect =
      directEffects.reduce((sum, e, i) => sum + directWeights[i] * e, 0) / totalDW;
    const directSE = Math.sqrt(1 / totalDW);

    // Indirect estimate: NMA excluding direct studies for this comparison
    const indirectStudies = studies.filter((s) => {
      const i = indexOf.get(s.treatment1)!;
      const j = indexOf.get(s.treatment2)!;
      const [a, b] = i < j ? [i, j] : [j, i];
      return !(a === lo && b === hi);
    });

    // Need at least some remaining studies
    if (indirectStudies.length === 0) continue;

    let indirectEffect: number;
    let indirectSE: number;

    try {
      const indirectGraph = buildNetworkGraph(indirectStudies, tau2);
      const indirectTreatments = indirectGraph.treatments;

      // Both treatments must still be in the indirect network
      if (
        !indirectTreatments.includes(t1) ||
        !indirectTreatments.includes(t2)
      ) {
        continue;
      }

      const indirectLplus = pseudoinverse(indirectGraph.laplacian);
      const indirectPotentials = computeNodePotentials(
        indirectLplus,
        indirectGraph.edges,
        indirectTreatments.length
      );
      const { leagueTable: indirectLT, leagueTableSE: indirectSEs } =
        computeLeagueTable(indirectTreatments, indirectLplus, indirectPotentials);

      const ii = indirectTreatments.indexOf(t1);
      const jj = indirectTreatments.indexOf(t2);
      // Use lo->hi convention to match direct effect direction
      indirectEffect = indirectLT[ii][jj];
      indirectSE = indirectSEs[ii][jj];
    } catch {
      // Network disconnected without these studies — no indirect path
      continue;
    }

    // Test: z = (direct - indirect) / sqrt(se_direct^2 + se_indirect^2)
    const diff = directEffect - indirectEffect;
    const diffSE = Math.sqrt(directSE * directSE + indirectSE * indirectSE);
    const zVal = diffSE > 0 ? diff / diffSE : 0;
    const pVal = zToPValue(zVal);

    results.push({
      comparison: `${t1} vs ${t2}`,
      direct: directEffect,
      indirect: indirectEffect,
      diff,
      pValue: pVal,
    });
  }

  return results;
}

/**
 * Extracts network geometry for visualization.
 *
 * Nodes are sized by the number of studies involving that treatment.
 * Edges are weighted by the number of studies for that comparison.
 *
 * @param studies - Array of NMA studies
 * @param treatments - Ordered treatment labels
 * @returns Network geometry with nodes and edges
 */
function extractNetworkGeometry(
  studies: NMAStudy[],
  treatments: string[]
): NMAResult["networkGeometry"] {
  const treatmentCounts = new Map<string, number>();
  for (const t of treatments) treatmentCounts.set(t, 0);
  for (const s of studies) {
    treatmentCounts.set(s.treatment1, (treatmentCounts.get(s.treatment1) || 0) + 1);
    treatmentCounts.set(s.treatment2, (treatmentCounts.get(s.treatment2) || 0) + 1);
  }

  const indexOf = new Map<string, number>();
  treatments.forEach((t, i) => indexOf.set(t, i));

  const edgeCounts = new Map<string, number>();
  for (const s of studies) {
    const i = indexOf.get(s.treatment1)!;
    const j = indexOf.get(s.treatment2)!;
    const [lo, hi] = i < j ? [i, j] : [j, i];
    const key = `${lo}:${hi}`;
    edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
  }

  const nodes = treatments.map((t) => ({
    id: t,
    size: treatmentCounts.get(t) || 0,
  }));

  const edgesOut: NMAResult["networkGeometry"]["edges"] = [];
  for (const [key, count] of edgeCounts) {
    const [lo, hi] = key.split(":").map(Number);
    edgesOut.push({
      source: treatments[lo],
      target: treatments[hi],
      weight: count,
    });
  }

  return { nodes, edges: edgesOut };
}

// ---------------------------------------------------------------------------
// Main NMA entry point
// ---------------------------------------------------------------------------

/**
 * Runs a full network meta-analysis using the graph-theoretical approach.
 *
 * This is the main entry point for NMA computation. It:
 *  1. Optionally estimates tau2 for random-effects models
 *  2. Builds the network graph with appropriate weights
 *  3. Computes the Laplacian pseudoinverse
 *  4. Computes node potentials (projected effects)
 *  5. Derives all pairwise effects and confidence intervals
 *  6. Computes P-scores for treatment ranking
 *  7. Tests for inconsistency via node-splitting
 *  8. Extracts network geometry for visualization
 *
 * @param studies - Array of pairwise study comparisons
 * @param model - "fixed" for inverse-variance weighting, "random" for DL-adjusted
 * @returns Complete NMA result
 * @throws Error if no studies provided or network is disconnected
 */
export function computeNMA(
  studies: NMAStudy[],
  model: "fixed" | "random" = "fixed"
): NMAResult {
  if (studies.length === 0) {
    throw new Error("No studies provided for network meta-analysis.");
  }

  // Step 1: Estimate heterogeneity for random-effects
  let tau2 = 0;
  if (model === "random" && studies.length > 2) {
    tau2 = estimateNetworkTau2(studies);
  }

  // Step 2: Build network graph (weights adjusted by tau2)
  const { treatments, laplacian, edges } = buildNetworkGraph(studies, tau2);
  const k = treatments.length;

  // Step 3: Compute Moore-Penrose pseudoinverse of the Laplacian
  const Lplus = pseudoinverse(laplacian);

  // Step 4: Compute node potentials (Ruecker 2012 eq. 11)
  const potentials = computeNodePotentials(Lplus, edges, k);

  // Step 5: Compute league table (effects and SEs)
  const { leagueTable, leagueTableSE } = computeLeagueTable(
    treatments,
    Lplus,
    potentials
  );

  // Step 6: Build confidence interval matrix
  const leagueTableCI: NMAResult["leagueTableCI"] = [];
  for (let i = 0; i < k; i++) {
    leagueTableCI.push([]);
    for (let j = 0; j < k; j++) {
      if (i === j) {
        leagueTableCI[i].push({ lower: 0, upper: 0 });
      } else {
        leagueTableCI[i].push({
          lower: leagueTable[i][j] - Z_95 * leagueTableSE[i][j],
          upper: leagueTable[i][j] + Z_95 * leagueTableSE[i][j],
        });
      }
    }
  }

  // Step 7: Compute P-scores
  const pScores = computePScores(treatments, leagueTable, leagueTableSE);

  // Step 8: Extract network geometry
  const networkGeometry = extractNetworkGeometry(studies, treatments);

  // Build partial result for inconsistency testing
  const partialResult: NMAResult = {
    treatments,
    leagueTable,
    leagueTableCI,
    pScores,
    inconsistency: [],
    networkGeometry,
    tau2,
    model,
  };

  // Step 9: Test inconsistency
  const inconsistency = testInconsistency(studies, partialResult, tau2);

  return {
    ...partialResult,
    inconsistency,
  };
}
