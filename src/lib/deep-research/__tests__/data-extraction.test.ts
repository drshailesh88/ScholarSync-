import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { UnifiedSearchResult } from "@/types/search";

const getSmallModel = vi.fn();
const getSmallModelFallback = vi.fn();
const generateText = vi.fn();

vi.mock("@/lib/ai/models", () => ({
  AI_PROVIDER: "anthropic",
  getSmallModel: () => getSmallModel(),
  getSmallModelFallback: () => getSmallModelFallback(),
}));
vi.mock("ai", () => ({ generateText: (args: unknown) => generateText(args) }));

import { extractStructuredData } from "../data-extraction";

function paper(title: string): UnifiedSearchResult {
  return {
    title,
    authors: ["A"],
    journal: "J",
    year: 2023,
    abstract: "A randomized controlled trial of 100 patients.",
    citationCount: 1,
    isOpenAccess: false,
    publicationTypes: [],
    sources: ["pubmed"],
    doi: `10.1/${title}`,
  };
}

describe("extractStructuredData — fallback + alarm", () => {
  beforeEach(() => {
    getSmallModel.mockReturnValue({ __id: "primary" });
    getSmallModelFallback.mockReturnValue({ __id: "fallback" });
    generateText.mockReset();
  });
  afterEach(() => vi.restoreAllMocks());

  it("fails over to the fallback model when the primary throws", async () => {
    generateText.mockImplementation(async ({ model }: { model: { __id: string } }) => {
      if (model.__id === "primary") throw new Error("credit balance too low");
      return { text: JSON.stringify({ studyDesign: "RCT", sampleSize: 100 }) };
    });

    const out = await extractStructuredData([paper("p1")]);
    expect(out.size).toBe(1);
    expect(out.get("10.1/p1")?.studyDesign).toBe("RCT");
  });

  it("logs a loud alarm when primary and fallback both fail (no silent zero)", async () => {
    generateText.mockRejectedValue(new Error("all providers down"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const out = await extractStructuredData([paper("p1"), paper("p2")]);

    expect(out.size).toBe(0);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("0/2 papers extracted"));
  });

  it("does not alarm on a normal successful run", async () => {
    generateText.mockResolvedValue({ text: JSON.stringify({ studyDesign: "cohort" }) });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const out = await extractStructuredData([paper("p1")]);

    expect(out.size).toBe(1);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
