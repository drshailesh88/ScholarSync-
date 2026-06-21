import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { isValidMcpToken, isMcpAuthConfigured, getMcpApiKey } from "../auth";

const ENV = "MANAN_MCP_API_KEY";

describe("MCP bearer auth", () => {
  let original: string | undefined;

  beforeEach(() => {
    original = process.env[ENV];
  });

  afterEach(() => {
    if (original === undefined) delete process.env[ENV];
    else process.env[ENV] = original;
  });

  it("denies when no key is configured (fail closed)", () => {
    delete process.env[ENV];
    expect(isMcpAuthConfigured()).toBe(false);
    expect(isValidMcpToken("anything")).toBe(false);
  });

  it("treats an empty key as not configured", () => {
    process.env[ENV] = "";
    expect(isMcpAuthConfigured()).toBe(false);
    expect(getMcpApiKey()).toBeUndefined();
    expect(isValidMcpToken("")).toBe(false);
  });

  it("denies a missing or empty token", () => {
    process.env[ENV] = "secret-token";
    expect(isValidMcpToken(undefined)).toBe(false);
    expect(isValidMcpToken(null)).toBe(false);
    expect(isValidMcpToken("")).toBe(false);
  });

  it("denies an incorrect token", () => {
    process.env[ENV] = "secret-token";
    expect(isValidMcpToken("wrong-token")).toBe(false);
    expect(isValidMcpToken("secret-token-extra")).toBe(false);
  });

  it("accepts the exact configured token", () => {
    process.env[ENV] = "secret-token";
    expect(isMcpAuthConfigured()).toBe(true);
    expect(isValidMcpToken("secret-token")).toBe(true);
  });
});
