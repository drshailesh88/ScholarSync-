/**
 * Pure aggregation helpers for the UNFROZEN first-stage recall probe.
 *
 * The probe measures whether a landmark (must-have) paper is even RETRIEVED into
 * the live fused candidate pool BEFORE ranking — the thing the frozen 87-query
 * re-ranking harness (candidate-cache.ts) can never see. These functions are the
 * deterministic, I/O-free core (matching is reused from eval/metrics), unit
 * tested separately from the live fan-out that feeds them.
 */

import type { SourceStatus, SourceStatusKind } from "@/lib/search/source-status";

/** One observation of a single must-have on a single live retrieval run. */
export interface MustHaveRunObservation {
  /** Present ANYWHERE in the fused candidate pool (pre-ranking) this run. */
  inPool: boolean;
  /** Present in the final top-k (post-ranking) this run. */
  inTop10: boolean;
  /** Provenance lanes that retrieved it into the pool this run (dedup, e.g. ["pubmed","medcpt_dense"]). */
  lanes: string[];
}

/** Cross-run aggregate for a single must-have. */
export interface MustHaveAggregate {
  /** Fraction of runs the must-have was in the pool (0..1). */
  inPoolRate: number;
  /** Fraction of runs the must-have was in the final top-k (0..1). */
  inTop10Rate: number;
  /** Union of every lane that retrieved it across runs. */
  lanesUnion: string[];
  /** Per-lane count of how many runs that lane retrieved it. */
  laneCounts: Record<string, number>;
  /** True first-stage recall failure: never in the pool on ANY run. */
  missedByAllLanes: boolean;
}

const DENSE_LANE_RE = /^medcpt_dense/;

/** Is this a MedCPT owned dense-retrieval lane (base / recency / HyDE / recovery)? */
export function isDenseLane(lane: string): boolean {
  return DENSE_LANE_RE.test(lane);
}

/** Federated external API lanes (the throttleable ones), vs the owned dense corpus. */
export function isFederatedLane(lane: string): boolean {
  return !isDenseLane(lane);
}

export function aggregateMustHave(runs: MustHaveRunObservation[]): MustHaveAggregate {
  const n = runs.length || 1;
  const inPoolCount = runs.filter((r) => r.inPool).length;
  const inTop10Count = runs.filter((r) => r.inTop10).length;
  const laneCounts: Record<string, number> = {};
  for (const r of runs) {
    for (const lane of new Set(r.lanes)) {
      laneCounts[lane] = (laneCounts[lane] ?? 0) + 1;
    }
  }
  return {
    inPoolRate: inPoolCount / n,
    inTop10Rate: inTop10Count / n,
    lanesUnion: Object.keys(laneCounts).sort(),
    laneCounts,
    missedByAllLanes: inPoolCount === 0,
  };
}

/**
 * Whether the owned MedCPT dense lane is actually ALIVE across the probe.
 *
 * A dead/dormant dense backbone means the pool is lexical-only — the single most
 * important structural finding. We classify from the per-run status + returned
 * count of the base `medcpt_dense` lane:
 *  - "alive"    : returned results (count > 0) on at least one run.
 *  - "configured_empty" : status ok but always returned 0 (reachable, no hits — suspicious).
 *  - "dormant"  : always missing_config (encoder/turbopuffer not provisioned).
 *  - "degraded" : reachable but every run failed (timeout / error / rate_limited).
 */
export type DenseLiveness = "alive" | "configured_empty" | "dormant" | "degraded";

export function classifyDenseLiveness(
  perRun: Array<{ status?: SourceStatus; count: number }>
): DenseLiveness {
  if (perRun.length === 0) return "dormant";
  const anyResults = perRun.some((r) => r.count > 0);
  if (anyResults) return "alive";
  const kinds = perRun.map((r) => r.status?.status ?? "missing_config");
  const allMissing = kinds.every((k) => k === "missing_config");
  if (allMissing) return "dormant";
  const anyOk = kinds.some((k) => k === "ok");
  if (anyOk) return "configured_empty";
  return "degraded";
}

export interface OverallSummary {
  mustHaveCount: number;
  /** Mean in-pool rate across all must-haves (retrieval recall). */
  meanInPoolRate: number;
  /** Mean in-top10 rate across all must-haves (end-to-end recall). */
  meanInTop10Rate: number;
  /** meanInPoolRate - meanInTop10Rate: how much recall is lost to RANKING, not retrieval. */
  gap: number;
  /** Must-haves never retrieved on any run (true first-stage recall failures). */
  missedByAllLanesCount: number;
}

export function summarizeOverall(aggs: MustHaveAggregate[]): OverallSummary {
  const n = aggs.length || 1;
  const meanInPoolRate = aggs.reduce((a, m) => a + m.inPoolRate, 0) / n;
  const meanInTop10Rate = aggs.reduce((a, m) => a + m.inTop10Rate, 0) / n;
  return {
    mustHaveCount: aggs.length,
    meanInPoolRate,
    meanInTop10Rate,
    gap: meanInPoolRate - meanInTop10Rate,
    missedByAllLanesCount: aggs.filter((m) => m.missedByAllLanes).length,
  };
}

/**
 * Per-lane attribution: for must-haves that WERE found in the pool, tally which
 * lane(s) carried them. A must-have found by K lanes credits all K (union), so
 * columns sum to >= the number of found must-haves. This tells us whether the
 * owned dense corpus or the federated APIs are carrying first-stage recall.
 */
export function laneAttribution(aggs: MustHaveAggregate[]): {
  perLane: Record<string, number>;
  denseFoundCount: number;
  federatedFoundCount: number;
  foundByDenseOnly: number;
  foundByFederatedOnly: number;
} {
  const perLane: Record<string, number> = {};
  let denseFoundCount = 0;
  let federatedFoundCount = 0;
  let foundByDenseOnly = 0;
  let foundByFederatedOnly = 0;
  for (const agg of aggs) {
    if (agg.missedByAllLanes) continue;
    const lanes = agg.lanesUnion;
    for (const lane of lanes) perLane[lane] = (perLane[lane] ?? 0) + 1;
    const hasDense = lanes.some(isDenseLane);
    const hasFederated = lanes.some(isFederatedLane);
    if (hasDense) denseFoundCount++;
    if (hasFederated) federatedFoundCount++;
    if (hasDense && !hasFederated) foundByDenseOnly++;
    if (hasFederated && !hasDense) foundByFederatedOnly++;
  }
  return { perLane, denseFoundCount, federatedFoundCount, foundByDenseOnly, foundByFederatedOnly };
}

/** Non-ok source statuses for a run, formatted for the report (never contains secrets). */
export function nonOkStatuses(
  statuses: Record<string, SourceStatus>
): Array<{ lane: string; status: SourceStatusKind; message?: string }> {
  return Object.entries(statuses)
    .filter(([, s]) => s.status !== "ok")
    .map(([lane, s]) => ({ lane, status: s.status, message: s.message }));
}
