import { describe, expect, it, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  generateObjectMock: vi.fn(),
  getSmallModelMock: vi.fn(() => "small-model"),
}));

vi.mock("ai", () => ({
  generateObject: mocks.generateObjectMock,
}));

vi.mock("@/lib/ai/models", () => ({
  getSmallModel: mocks.getSmallModelMock,
}));

import { generateFollowUpSuggestions } from "../follow-up-suggestions";

describe("generateFollowUpSuggestions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("builds mode-aware prompts and truncates long responses", async () => {
    mocks.generateObjectMock.mockResolvedValueOnce({
      object: {
        suggestions: [
          { text: "Why do you think this mechanism failed?", type: "analytical" },
          { text: "How would you test this assumption?", type: "applied" },
          { text: "What if sample size doubled?", type: "comparative" },
        ],
      },
    });

    const longResponse = "x".repeat(2000);
    const result = await generateFollowUpSuggestions({
      responseText: longResponse,
      sourceTitles: ["Paper A", "Paper B"],
      userQuery: "Explain this",
      mode: "learn",
    });

    expect(result).toHaveLength(3);
    expect(mocks.getSmallModelMock).toHaveBeenCalledTimes(1);
    expect(mocks.generateObjectMock).toHaveBeenCalledTimes(1);

    const call = mocks.generateObjectMock.mock.calls[0][0] as {
      prompt: string;
      system: string;
      model: string;
    };
    expect(call.model).toBe("small-model");
    expect(call.system).toContain("LEARN (Socratic) mode");
    expect(call.prompt).toContain("Sources referenced: Paper A, Paper B");
    expect(call.prompt).toContain("x".repeat(1500));
    expect(call.prompt).not.toContain("x".repeat(1501));
  });

  it("returns [] when generation fails", async () => {
    mocks.generateObjectMock.mockRejectedValueOnce(new Error("API unavailable"));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const result = await generateFollowUpSuggestions({
      responseText: "long enough response text ".repeat(10),
      sourceTitles: [],
      userQuery: "Question",
      mode: "research",
    });

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("avoids comparative type when only one source is available", async () => {
    mocks.generateObjectMock.mockResolvedValueOnce({
      object: {
        suggestions: [
          { text: "Compare outcome by subgroup", type: "comparative" },
          { text: "Which limitation matters most?", type: "analytical" },
          { text: "How would this affect practice?", type: "applied" },
        ],
      },
    });

    const result = await generateFollowUpSuggestions({
      responseText: "long enough response text ".repeat(10),
      sourceTitles: ["Single Paper"],
      userQuery: "What does this show?",
      mode: "research",
    });

    expect(result).toHaveLength(3);
    expect(result[0]?.type).toBe("analytical");
    const call = mocks.generateObjectMock.mock.calls[0][0] as { system: string };
    expect(call.system).toContain("Only one source is available; avoid comparative suggestions.");
    expect(call.system).toContain("You are in RESEARCH mode");
  });
});
