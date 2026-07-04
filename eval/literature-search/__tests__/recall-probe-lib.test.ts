import { describe, it, expect } from "vitest";
import {
  isDenseLane,
  isFederatedLane,
  aggregateMustHave,
  classifyDenseLiveness,
  summarizeOverall,
  laneAttribution,
  nonOkStatuses,
  type MustHaveRunObservation,
} from "../recall-probe-lib";

describe("lane classification", () => {
  it("treats every medcpt_dense variant as the owned dense corpus", () => {
    expect(isDenseLane("medcpt_dense")).toBe(true);
    expect(isDenseLane("medcpt_dense_recent")).toBe(true);
    expect(isDenseLane("medcpt_dense_hyde_2")).toBe(true);
    expect(isDenseLane("medcpt_dense_recovery")).toBe(true);
  });

  it("treats federated API lanes as not-dense", () => {
    for (const lane of ["pubmed", "europepmc", "scopus", "springer", "clinical_trials", "web"]) {
      expect(isDenseLane(lane)).toBe(false);
      expect(isFederatedLane(lane)).toBe(true);
    }
  });
});

describe("aggregateMustHave", () => {
  it("averages presence across runs and unions lanes", () => {
    const runs: MustHaveRunObservation[] = [
      { inPool: true, inTop10: true, lanes: ["pubmed"] },
      { inPool: true, inTop10: false, lanes: ["pubmed", "medcpt_dense"] },
      { inPool: false, inTop10: false, lanes: [] },
    ];
    const agg = aggregateMustHave(runs);
    expect(agg.inPoolRate).toBeCloseTo(2 / 3);
    expect(agg.inTop10Rate).toBeCloseTo(1 / 3);
    expect(agg.lanesUnion).toEqual(["medcpt_dense", "pubmed"]);
    expect(agg.laneCounts).toEqual({ pubmed: 2, medcpt_dense: 1 });
    expect(agg.missedByAllLanes).toBe(false);
  });

  it("flags a must-have missed on every run", () => {
    const runs: MustHaveRunObservation[] = [
      { inPool: false, inTop10: false, lanes: [] },
      { inPool: false, inTop10: false, lanes: [] },
    ];
    const agg = aggregateMustHave(runs);
    expect(agg.inPoolRate).toBe(0);
    expect(agg.missedByAllLanes).toBe(true);
  });
});

describe("classifyDenseLiveness", () => {
  it("alive when any run returned results", () => {
    expect(
      classifyDenseLiveness([
        { status: { status: "ok" }, count: 0 },
        { status: { status: "ok" }, count: 12 },
      ])
    ).toBe("alive");
  });

  it("dormant when every run is missing_config", () => {
    expect(
      classifyDenseLiveness([
        { status: { status: "missing_config" }, count: 0 },
        { status: { status: "missing_config" }, count: 0 },
      ])
    ).toBe("dormant");
  });

  it("configured_empty when reachable (ok) but always zero", () => {
    expect(classifyDenseLiveness([{ status: { status: "ok" }, count: 0 }])).toBe(
      "configured_empty"
    );
  });

  it("degraded when reachable but every run errored/timed out", () => {
    expect(
      classifyDenseLiveness([
        { status: { status: "timeout" }, count: 0 },
        { status: { status: "error" }, count: 0 },
      ])
    ).toBe("degraded");
  });
});

describe("summarizeOverall + gap", () => {
  it("computes the retrieval-vs-ranking gap", () => {
    const s = summarizeOverall([
      { inPoolRate: 1, inTop10Rate: 0.5, lanesUnion: [], laneCounts: {}, missedByAllLanes: false },
      { inPoolRate: 1, inTop10Rate: 1, lanesUnion: [], laneCounts: {}, missedByAllLanes: false },
      { inPoolRate: 0, inTop10Rate: 0, lanesUnion: [], laneCounts: {}, missedByAllLanes: true },
    ]);
    expect(s.mustHaveCount).toBe(3);
    expect(s.meanInPoolRate).toBeCloseTo(2 / 3);
    expect(s.meanInTop10Rate).toBeCloseTo(0.5);
    expect(s.gap).toBeCloseTo(2 / 3 - 0.5);
    expect(s.missedByAllLanesCount).toBe(1);
  });
});

describe("laneAttribution", () => {
  it("credits owned dense vs federated and their exclusives", () => {
    const attr = laneAttribution([
      // found by federated only
      { inPoolRate: 1, inTop10Rate: 1, lanesUnion: ["pubmed"], laneCounts: {}, missedByAllLanes: false },
      // found by dense only
      { inPoolRate: 1, inTop10Rate: 0, lanesUnion: ["medcpt_dense"], laneCounts: {}, missedByAllLanes: false },
      // found by both
      { inPoolRate: 1, inTop10Rate: 1, lanesUnion: ["europepmc", "medcpt_dense_hyde_0"], laneCounts: {}, missedByAllLanes: false },
      // missed → excluded
      { inPoolRate: 0, inTop10Rate: 0, lanesUnion: [], laneCounts: {}, missedByAllLanes: true },
    ]);
    expect(attr.perLane).toEqual({
      pubmed: 1,
      medcpt_dense: 1,
      europepmc: 1,
      medcpt_dense_hyde_0: 1,
    });
    expect(attr.denseFoundCount).toBe(2);
    expect(attr.federatedFoundCount).toBe(2);
    expect(attr.foundByDenseOnly).toBe(1);
    expect(attr.foundByFederatedOnly).toBe(1);
  });
});

describe("nonOkStatuses", () => {
  it("returns only degraded lanes", () => {
    const out = nonOkStatuses({
      pubmed: { status: "ok" },
      scopus: { status: "missing_config", message: "no key" },
      europepmc: { status: "timeout", message: "slow" },
    });
    expect(out).toEqual([
      { lane: "scopus", status: "missing_config", message: "no key" },
      { lane: "europepmc", status: "timeout", message: "slow" },
    ]);
  });
});
