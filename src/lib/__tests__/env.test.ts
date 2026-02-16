import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("validateEnv", () => {
  const savedEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...savedEnv } as NodeJS.ProcessEnv;
  });

  afterEach(() => {
    process.env = savedEnv;
  });

  it("warns when DATABASE_URL is missing in dev", async () => {
    Object.defineProperty(process.env, "NODE_ENV", { value: "development", writable: true, configurable: true });
    delete process.env.DATABASE_URL;
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { validateEnv } = await import("../env");
    validateEnv();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("DATABASE_URL"));
    warnSpy.mockRestore();
  });

  it("does not warn when DATABASE_URL is set", async () => {
    Object.defineProperty(process.env, "NODE_ENV", { value: "development", writable: true, configurable: true });
    process.env.DATABASE_URL = "postgresql://localhost/test";
    process.env.ANTHROPIC_API_KEY = "sk-test";
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { validateEnv } = await import("../env");
    validateEnv();
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining("DATABASE_URL"));
    warnSpy.mockRestore();
  });

  it("warns about AI key when not set", async () => {
    Object.defineProperty(process.env, "NODE_ENV", { value: "development", writable: true, configurable: true });
    process.env.DATABASE_URL = "postgresql://localhost/test";
    delete process.env.ANTHROPIC_API_KEY;
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { validateEnv } = await import("../env");
    validateEnv();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("ANTHROPIC_API_KEY"));
    warnSpy.mockRestore();
  });
});
