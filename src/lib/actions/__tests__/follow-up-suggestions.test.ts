import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  generateFollowUpSuggestionsMock: vi.fn(),
}));

vi.mock("@/lib/ai/prompts/follow-up-suggestions", () => ({
  generateFollowUpSuggestions: mocks.generateFollowUpSuggestionsMock,
}));

import { getFollowUpSuggestions } from "../follow-up-suggestions";

describe("getFollowUpSuggestions action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns [] and skips generation for short responses", async () => {
    const result = await getFollowUpSuggestions({
      responseText: "short",
      sourceTitles: ["Paper A"],
      userQuery: "Q",
      mode: "research",
    });

    expect(result).toEqual([]);
    expect(mocks.generateFollowUpSuggestionsMock).not.toHaveBeenCalled();
  });

  it("delegates to generator for longer responses", async () => {
    const suggestions = [
      { text: "Compare trial populations", type: "comparative" },
      { text: "Probe confounding limitations", type: "analytical" },
      { text: "What would change this conclusion?", type: "applied" },
    ] as const;
    mocks.generateFollowUpSuggestionsMock.mockResolvedValueOnce(suggestions);

    const params = {
      responseText: "long enough response ".repeat(8),
      sourceTitles: ["Paper A", "Paper B"],
      userQuery: "How do they compare?",
      mode: "research" as const,
    };
    const result = await getFollowUpSuggestions(params);

    expect(mocks.generateFollowUpSuggestionsMock).toHaveBeenCalledWith(params);
    expect(result).toEqual(suggestions);
  });
});
