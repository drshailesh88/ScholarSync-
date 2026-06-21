/**
 * Bearer-token auth for the MCP endpoint.
 *
 * The MCP transport is protected by a single server-side shared secret
 * (`MANAN_MCP_API_KEY`) — it never reads Clerk session cookies, so MCP clients
 * (coding agents) authenticate purely with `Authorization: Bearer <token>`.
 */

import { timingSafeEqual } from "node:crypto";

export const MCP_API_KEY_ENV = "MANAN_MCP_API_KEY";

export function getMcpApiKey(): string | undefined {
  const key = process.env[MCP_API_KEY_ENV];
  return key && key.length > 0 ? key : undefined;
}

export function isMcpAuthConfigured(): boolean {
  return getMcpApiKey() !== undefined;
}

/** Constant-time comparison that does not leak length via early return. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    // Still run a comparison to keep timing roughly constant.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/**
 * Validate a bearer token against the configured MCP API key.
 * Returns false when no token is supplied or no key is configured — callers
 * must treat a configuration gap as "deny", never "allow".
 */
export function isValidMcpToken(bearerToken?: string | null): boolean {
  const expected = getMcpApiKey();
  if (!expected) return false;
  if (!bearerToken) return false;
  return safeEqual(bearerToken, expected);
}
