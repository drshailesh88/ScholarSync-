import { describe, expect, it } from "vitest";
import { isComparisonQuery } from "../notebook";

describe("isComparisonQuery", () => {
  it("detects comparative follow-up chip text", () => {
    expect(isComparisonQuery("Compare in vivo and in vitro error profiles")).toBe(true);
    expect(isComparisonQuery("How do these trials differ on outcomes?")).toBe(true);
  });
});
