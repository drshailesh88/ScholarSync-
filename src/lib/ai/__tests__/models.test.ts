import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getSmallModelFallback } from "../models";

describe("getSmallModelFallback", () => {
  const original = process.env.DEEPSEEK_API_KEY;
  beforeEach(() => {
    delete process.env.DEEPSEEK_API_KEY;
  });
  afterEach(() => {
    if (original === undefined) delete process.env.DEEPSEEK_API_KEY;
    else process.env.DEEPSEEK_API_KEY = original;
  });

  it("returns null when DEEPSEEK_API_KEY is unset (no fallback available)", () => {
    expect(getSmallModelFallback()).toBeNull();
  });

  it("returns a model when DEEPSEEK_API_KEY is set", () => {
    process.env.DEEPSEEK_API_KEY = "sk-test-deepseek";
    expect(getSmallModelFallback()).not.toBeNull();
  });
});
