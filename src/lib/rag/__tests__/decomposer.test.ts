import { describe, it, expect, vi } from "vitest";

vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));
vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));

import { decomposeQuery } from "../decomposer";
import { generateObject } from "ai";

const mockGenerateObject = vi.mocked(generateObject);

describe("decomposeQuery", () => {
  it("returns sub-questions for complex query", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { isComplex: true, subQuestions: ["What is X?", "What is Y?"] },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await decomposeQuery("Compare X and Y");
    expect(result).toEqual(["What is X?", "What is Y?"]);
  });

  it("returns null for simple query", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { isComplex: false, subQuestions: [] },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await decomposeQuery("What is aspirin?");
    expect(result).toBeNull();
  });

  it("returns null when only one sub-question", async () => {
    mockGenerateObject.mockResolvedValueOnce({
      object: { isComplex: true, subQuestions: ["Single question"] },
    } as Awaited<ReturnType<typeof generateObject>>);
    const result = await decomposeQuery("Simple query");
    expect(result).toBeNull();
  });
});
