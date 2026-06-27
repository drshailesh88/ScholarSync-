// eval/web-search/council/__tests__/build-blinded-packet.test.ts
import { describe, it, expect } from "vitest";
import { oursIsEngineA, renderRows, buildPacket } from "../build-blinded-packet";
import type { EnginePair } from "../build-blinded-packet";
import { BENCHMARK_QUERIES } from "../../queries";
import type { CommonRow } from "../../types";

const row = (over: Partial<CommonRow>): CommonRow => ({ title: "t", url: "https://x.com/a", domain: "x.com", publishedDate: null, snippet: null, ...over });

describe("oursIsEngineA", () => {
  it("is deterministic for a given salt+id and varies across ids", () => {
    expect(oursIsEngineA("s", "abc")).toBe(oursIsEngineA("s", "abc"));
    const flips = BENCHMARK_QUERIES.map((q) => oursIsEngineA("salt", q.id));
    expect(new Set(flips).size).toBe(2); // both A and B occur across the set
  });
});

describe("renderRows", () => {
  it("renders title · domain · date · snippet and marks empty lists", () => {
    expect(renderRows([])).toEqual(["_(no results)_"]);
    const line = renderRows([row({ title: "CDC flu", domain: "cdc.gov", publishedDate: "2026-06-01", snippet: "snip-text" })])[0];
    expect(line).toContain("CDC flu");
    expect(line).toContain("cdc.gov");
    expect(line).toContain("2026-06-01");
    expect(line).toContain("snip-text");
  });
});

describe("buildPacket", () => {
  const q = BENCHMARK_QUERIES.find((x) => x.id === "news-h5n1-dairy")!;
  // Neutral fixture titles ("alpha"/"beta") so the identity-leak assertions below
  // test the BUILDER, not the fixture text. (A real engine name in a title would be
  // fixture noise, not a blinding leak.)
  const pairs: EnginePair[] = [{
    id: q.id, tab: q.tab,
    ours: [row({ title: "alpha-1", domain: "cdc.gov" })],
    exa: [row({ title: "beta-1", domain: "reuters.com" })],
  }];
  const queriesById = new Map(BENCHMARK_QUERIES.map((x) => [x.id, x]));

  it("emits a key mapping each id to which engine is 'A', and a packet that hides identity", () => {
    const { packet, key } = buildPacket({ pairs, queriesById, salt: "t" });
    expect(["ours", "exa"]).toContain(key[q.id]);
    // packet must never name the real engines (the builder emits only "Engine A/B").
    // Word-boundary check for the opponent name so ordinary words ("exactly") don't false-positive.
    expect(packet.toLowerCase()).not.toContain("searxng");
    expect(packet).not.toMatch(/\bexa\b/i);
    // packet prints the ground-truth must-haves as the relevance anchor
    expect(packet.toLowerCase()).toContain("must-have");
    // both engines appear under A/B headings
    expect(packet).toContain("Engine A");
    expect(packet).toContain("Engine B");
    // the per-query tab rubric is present
    expect(packet.toLowerCase()).toContain("tab = news");
  });

  it("places ours under the label key says it is", () => {
    const { packet, key } = buildPacket({ pairs, queriesById, salt: "t" });
    const aIdx = packet.indexOf("### Engine A");
    const bIdx = packet.indexOf("### Engine B");
    const oursTitleIdx = packet.indexOf("alpha-1");
    const oursUnderA = oursTitleIdx > aIdx && oursTitleIdx < bIdx;
    expect(oursUnderA).toBe(key[q.id] === "ours");
  });
});
