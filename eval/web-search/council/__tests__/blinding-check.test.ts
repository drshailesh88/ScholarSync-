import { describe, it, expect } from "vitest";
import { presenceRate, checkBlinding } from "../blinding-check";
import type { EnginePair } from "../build-blinded-packet";
import type { CommonRow } from "../../types";

const row = (over: Partial<CommonRow>): CommonRow => ({ title: "t", url: "https://x.com/a", domain: "x.com", publishedDate: null, snippet: null, ...over });

const pair = (id: string, ours: CommonRow[], exa: CommonRow[]): EnginePair => ({ id, tab: "news", ours, exa });

describe("presenceRate", () => {
  it("is the fraction of rows whose field is non-null", () => {
    const pairs = [pair("a", [row({ snippet: "s" }), row({ snippet: null })], [])];
    expect(presenceRate(pairs, "ours", "snippet")).toBe(0.5);
  });
});

describe("checkBlinding", () => {
  it("passes when both engines carry date+snippet at similar rates and A/B is balanced", () => {
    const pairs = [
      pair("a", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
      pair("b", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
    ];
    const res = checkBlinding({ pairs, key: { a: "ours", b: "exa" } });
    expect(res.ok).toBe(true);
    expect(res.reasons).toEqual([]);
  });

  it("FAILS when one engine always has snippets and the other never does (a fingerprint)", () => {
    const pairs = [
      pair("a", [row({ snippet: "s" })], [row({ snippet: null })]),
      pair("b", [row({ snippet: "s" })], [row({ snippet: null })]),
    ];
    const res = checkBlinding({ pairs, key: { a: "ours", b: "exa" } });
    expect(res.ok).toBe(false);
    expect(res.reasons.join(" ")).toMatch(/snippet/i);
    expect(res.fieldGap.snippet).toBeGreaterThan(0.5);
  });

  it("FAILS when the A/B assignment is lopsided (blinding not randomized)", () => {
    const pairs = [pair("a", [row({})], [row({})]), pair("b", [row({})], [row({})]), pair("c", [row({})], [row({})])];
    const res = checkBlinding({ pairs, key: { a: "ours", b: "ours", c: "ours" } });
    expect(res.ok).toBe(false);
    expect(res.reasons.join(" ")).toMatch(/balance|lopsided/i);
  });

  it("passes with >=3 balanced queries and matched field presence", () => {
    const balanced = [
      pair("a", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
      pair("b", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
      pair("c", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
      pair("d", [row({ snippet: "s", publishedDate: "2026-06-01" })], [row({ snippet: "s", publishedDate: "2026-06-02" })]),
    ];
    const res = checkBlinding({ pairs: balanced, key: { a: "ours", b: "exa", c: "ours", d: "exa" } });
    expect(res.ok).toBe(true);
    expect(res.aShareOurs).toBe(0.5);
  });
});
