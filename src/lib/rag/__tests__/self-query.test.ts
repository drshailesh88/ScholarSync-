import { describe, it, expect, vi } from "vitest";

vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));
vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));

import { extractMetadataFilters } from "../self-query";
import { generateObject } from "ai";

const mockGenerateObject = vi.mocked(generateObject);

describe("extractMetadataFilters", () => {
  it("extracts section type filter", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { sectionType: "methods", requireTable: false },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await extractMetadataFilters("What methods were used?");
    expect(result.sectionType).toBe("methods");
  });

  it("extracts year range filter", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { yearRange: { start: 2020, end: 2024 } },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await extractMetadataFilters("Studies from 2020-2024");
    expect(result.yearRange?.start).toBe(2020);
    expect(result.yearRange?.end).toBe(2024);
  });

  it("extracts requireTable flag", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { requireTable: true },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await extractMetadataFilters("Show me the sample sizes");
    expect(result.requireTable).toBe(true);
  });

  it("returns empty filters for generic query", async () => {
    mockGenerateObject.mockResolvedValueOnce({ object: {} } as Awaited<ReturnType<typeof generateObject>>);
    const result = await extractMetadataFilters("Tell me about aspirin");
    expect(result.sectionType).toBeUndefined();
    expect(result.yearRange).toBeUndefined();
  });
});
