import { describe, it, expect, vi } from "vitest";

vi.mock("ai", () => ({
  generateText: vi.fn(),
}));
vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));

import { generateHypotheticalAnswer } from "../hyde";
import { generateText } from "ai";

const mockGenerateText = vi.mocked(generateText);

describe("generateHypotheticalAnswer", () => {
  it("returns generated text", async () => {
    mockGenerateText.mockResolvedValueOnce({
      text: "Aspirin inhibits cyclooxygenase enzymes.",
    } as Awaited<ReturnType<typeof generateText>>);
    const result = await generateHypotheticalAnswer("How does aspirin work?");
    expect(result).toBe("Aspirin inhibits cyclooxygenase enzymes.");
  });

  it("passes query as prompt", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: "answer" } as Awaited<ReturnType<typeof generateText>>);
    await generateHypotheticalAnswer("my query");
    expect(mockGenerateText).toHaveBeenCalledWith(
      expect.objectContaining({ prompt: "my query" })
    );
  });
});
