import { describe, it, expect } from "vitest";
import { extractJson, parseVerdict } from "../judge-schema";

const goodScores = { relevance: 4, authority: 5, recency: 3, diversity: 4, dedup: 5, usefulness: 4 };
const good = JSON.stringify({
  perQuery: [{ id: "news-h5n1-dairy", A: goodScores, B: goodScores, winner: "A", note: "ok" }],
  overall: { winner: "A", summary: "A is better." },
});

describe("extractJson", () => {
  it("parses bare JSON", () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 });
  });
  it("strips ```json fences and surrounding prose", () => {
    expect(extractJson('here:\n```json\n{"a":1}\n```\nthanks')).toEqual({ a: 1 });
  });
});

describe("parseVerdict", () => {
  it("accepts a well-formed verdict", () => {
    const v = parseVerdict(good);
    expect(v.perQuery[0].winner).toBe("A");
    expect(v.overall.winner).toBe("A");
  });
  it("throws on a missing dimension", () => {
    const bad = JSON.stringify({ perQuery: [{ id: "x", A: { relevance: 4 }, B: goodScores, winner: "A" }], overall: { winner: "A", summary: "s" } });
    expect(() => parseVerdict(bad)).toThrow(/dimension|relevance|authority/i);
  });
  it("throws on an out-of-range score", () => {
    const bad = JSON.stringify({ perQuery: [{ id: "x", A: { ...goodScores, relevance: 9 }, B: goodScores, winner: "A" }], overall: { winner: "A", summary: "s" } });
    expect(() => parseVerdict(bad)).toThrow(/0-5|range/i);
  });
  it("throws on an invalid winner", () => {
    const bad = JSON.stringify({ perQuery: [{ id: "x", A: goodScores, B: goodScores, winner: "C" }], overall: { winner: "A", summary: "s" } });
    expect(() => parseVerdict(bad)).toThrow(/winner/i);
  });
});
