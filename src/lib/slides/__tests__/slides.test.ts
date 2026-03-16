import { describe, expect, it } from "vitest";
import { getRegenerateTonePrompt, REGENERATE_TONE_OPTIONS } from "../regenerate";

describe("slides regenerate helpers", () => {
  it("returns prompt for known tone", () => {
    expect(getRegenerateTonePrompt("more_concise")).toBe(
      REGENERATE_TONE_OPTIONS.find((x) => x.value === "more_concise")?.prompt
    );
  });

  it("falls back to default tone for unknown values", () => {
    expect(getRegenerateTonePrompt("unknown")).toBe(REGENERATE_TONE_OPTIONS[0].prompt);
  });
});
