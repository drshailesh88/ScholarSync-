import { describe, it, expect, vi } from "vitest";

vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));
vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));

import { generateMultiQueries } from "../query-enhancer";
import { generateObject } from "ai";

const mockGenerateObject = vi.mocked(generateObject);

describe("generateMultiQueries", () => {
  it("returns original + 3 variations", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { queries: ["myocardial infarction treatment", "cardiac event therapy", "heart attack management"] },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await generateMultiQueries("heart attack treatment");
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("heart attack treatment");
  });

  it("keeps original query first", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { queries: ["v1", "v2", "v3"] },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await generateMultiQueries("original");
    expect(result[0]).toBe("original");
    expect(result.slice(1)).toEqual(["v1", "v2", "v3"]);
  });
});
