// eval/web-search/council/__tests__/preflight.test.ts
import { describe, it, expect } from "vitest";
import { councilStrengthCheck } from "../preflight";
import type { EnginePair } from "../build-blinded-packet";
import type { WebBenchmarkQuery, CommonRow } from "../../types";

const row = (over: Partial<CommonRow>): CommonRow => ({ title: "t", url: "https://x.com/a", domain: "x.com", publishedDate: "2026-06-01", snippet: "s", ...over });
const q = (id: string): WebBenchmarkQuery => ({ id, tab: "news", queryClass: "recency", query: "q", intent: "i", recencyBiased: true, mustHaves: [{ label: "m", domain: "cdc.gov", rule: "authority" }] });

function pairs(ids: string[]): EnginePair[] {
  return ids.map((id) => ({ id, tab: "news", ours: [row({})], exa: [row({})] }));
}

describe("councilStrengthCheck", () => {
  const ids = ["a", "b", "c", "d"];
  const queriesById = new Map(ids.map((id) => [id, q(id)]));
  const key = { a: "ours", b: "exa", c: "ours", d: "exa" } as Record<string, "ours" | "exa">;

  it("passes when mustHaves present, rows show date+snippet, ≥3 judges, blinding ok", () => {
    const res = councilStrengthCheck({ pairs: pairs(ids), key, queriesById, judgesPresent: ["opus", "codex", "grok"] });
    expect(res.ok).toBe(true);
    expect(res.failures).toEqual([]);
  });

  it("fails with <3 judges", () => {
    const res = councilStrengthCheck({ pairs: pairs(ids), key, queriesById, judgesPresent: ["opus", "codex"] });
    expect(res.ok).toBe(false);
    expect(res.failures.join(" ")).toMatch(/judge/i);
  });

  it("fails when a query has no mustHaves (ground truth missing)", () => {
    const qb = new Map(queriesById);
    qb.set("a", { ...q("a"), mustHaves: [] });
    const res = councilStrengthCheck({ pairs: pairs(ids), key, queriesById: qb, judgesPresent: ["opus", "codex", "grok"] });
    expect(res.ok).toBe(false);
    expect(res.failures.join(" ")).toMatch(/must-have|ground truth/i);
  });

  it("fails when rows lack date+snippet (a fingerprint / poor rows)", () => {
    const bare: EnginePair[] = ids.map((id) => ({ id, tab: "news", ours: [row({ snippet: null, publishedDate: null })], exa: [row({})] }));
    const res = councilStrengthCheck({ pairs: bare, key, queriesById, judgesPresent: ["opus", "codex", "grok"] });
    expect(res.ok).toBe(false);
    expect(res.failures.join(" ")).toMatch(/blinding|snippet|date/i);
  });
});
