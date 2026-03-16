import { beforeEach, describe, expect, it, vi } from "vitest";

describe("config/branding", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("uses defaults when env vars missing", async () => {
    delete process.env.NEXT_PUBLIC_BRAND_NAME;
    delete process.env.NEXT_PUBLIC_BRAND_TAGLINE;
    const { BRAND } = await import("../branding");
    expect(BRAND.name).toBe("ScholarSync");
    expect(BRAND.tagline).toContain("Academic Integrity");
  });

  it("uses env overrides", async () => {
    process.env.NEXT_PUBLIC_BRAND_NAME = "Custom";
    process.env.NEXT_PUBLIC_BRAND_TAGLINE = "Tag";
    const { BRAND } = await import("../branding");
    expect(BRAND).toEqual({ name: "Custom", tagline: "Tag" });
  });
});
