import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ENV_KEY = "NEXT_PUBLIC_ENABLE_V2_MODULES";

async function loadModule() {
  vi.resetModules();
  return import("../v1-features");
}

describe("v1-features", () => {
  const original = process.env[ENV_KEY];

  beforeEach(() => {
    delete process.env[ENV_KEY];
  });

  afterEach(() => {
    if (original === undefined) delete process.env[ENV_KEY];
    else process.env[ENV_KEY] = original;
  });

  it("defaults to search-only v1 mode", async () => {
    const { isV1SearchOnly, SEARCH_LANDING_PATH } = await loadModule();
    expect(isV1SearchOnly()).toBe(true);
    expect(SEARCH_LANDING_PATH).toBe("/research");
  });

  it("disables search-only mode when v2 modules are enabled", async () => {
    process.env[ENV_KEY] = "true";
    const { isV1SearchOnly } = await loadModule();
    expect(isV1SearchOnly()).toBe(false);
  });

  it("hides v2 capability routes in v1", async () => {
    const { isHiddenInV1Path } = await loadModule();
    for (const path of [
      "/dashboard",
      "/studio",
      "/studio/123",
      "/latex",
      "/poster",
      "/presentation",
      "/notebook",
      "/feeds",
      "/deep-research",
      "/library",
      "/library/inbox",
      "/systematic-review",
      "/compliance",
    ]) {
      expect(isHiddenInV1Path(path)).toBe(true);
    }
  });

  it("keeps the search and account surfaces reachable in v1", async () => {
    const { isHiddenInV1Path } = await loadModule();
    for (const path of [
      "/research",
      "/explore",
      "/settings",
      "/onboarding",
      "/",
      "/sign-in",
    ]) {
      expect(isHiddenInV1Path(path)).toBe(false);
    }
  });

  it("keeps standalone public viewers reachable despite a hidden prefix", async () => {
    const { isHiddenInV1Path } = await loadModule();
    expect(isHiddenInV1Path("/presentation/audience")).toBe(false);
    expect(isHiddenInV1Path("/presentation/audience/xyz")).toBe(false);
  });

  it("reveals every route when v2 modules are enabled", async () => {
    process.env[ENV_KEY] = "true";
    const { isHiddenInV1Path } = await loadModule();
    expect(isHiddenInV1Path("/studio")).toBe(false);
    expect(isHiddenInV1Path("/poster")).toBe(false);
  });

  it("private-app mode is off unless explicitly enabled", async () => {
    delete process.env.PRIVATE_APP_MODE;
    let mod = await loadModule();
    expect(mod.isPrivateApp()).toBe(false);

    process.env.PRIVATE_APP_MODE = "true";
    mod = await loadModule();
    expect(mod.isPrivateApp()).toBe(true);
    delete process.env.PRIVATE_APP_MODE;
  });
});
