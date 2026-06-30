import { describe, it, expect, vi, afterEach } from "vitest";
import { traverseCitationGraph } from "../citation-traversal";
import type { UnifiedSearchResult } from "@/types/search";

function jsonResponse(body: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as unknown as Response;
}

const citingPaper = {
  paperId: "c1",
  title: "A citing paper",
  authors: [{ name: "Author A" }],
  year: 2023,
  abstract: "abstract",
  citationCount: 5,
  journal: { name: "Journal" },
  externalIds: { DOI: "10.1/c1" },
  isOpenAccess: true,
};

const seed: UnifiedSearchResult = {
  title: "Seed",
  authors: [],
  journal: "",
  year: 2020,
  s2Id: "seed1",
  abstract: "seed abstract",
  citationCount: 100,
  isOpenAccess: true,
  publicationTypes: [],
  sources: ["semantic_scholar"],
};

describe("traverseCitationGraph — S2 retry/backoff", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("retries after a 429 and recovers the citation papers", async () => {
    vi.useFakeTimers();
    let citationsCall = 0;
    const fetchMock = vi.fn(async (url: string) => {
      if (String(url).includes("/citations")) {
        citationsCall++;
        // First attempt throttled, second succeeds.
        return citationsCall === 1
          ? jsonResponse({}, 429)
          : jsonResponse({ data: [{ citingPaper }] });
      }
      return jsonResponse({ data: [] }); // references: empty
    });
    vi.stubGlobal("fetch", fetchMock);

    const promise = traverseCitationGraph([seed]);
    await vi.advanceTimersByTimeAsync(2000); // flush the backoff sleep
    const result = await promise;

    expect(citationsCall).toBe(2); // retried exactly once
    expect(result.map((r) => r.s2Id)).toContain("c1"); // recovered, not silently zeroed
  });

  it("returns [] (no throw) when S2 stays throttled across all attempts", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn(async () => jsonResponse({}, 429));
    vi.stubGlobal("fetch", fetchMock);

    const promise = traverseCitationGraph([seed]);
    await vi.advanceTimersByTimeAsync(10000);
    const result = await promise;

    expect(result).toEqual([]);
  });
});
