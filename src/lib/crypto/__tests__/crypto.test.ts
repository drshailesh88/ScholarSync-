import { describe, expect, it } from "vitest";
import { hashPassword, isHashedPassword, verifyPassword } from "../password";

describe("password crypto", () => {
  it("hashes and verifies passwords", async () => {
    const hash = await hashPassword("secret");
    expect(isHashedPassword(hash)).toBe(true);
    await expect(verifyPassword("secret", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong", hash)).resolves.toBe(false);
  });

  it("returns false for malformed hashes", async () => {
    expect(isHashedPassword("abc")).toBe(false);
    await expect(verifyPassword("secret", "abc")).resolves.toBe(false);
  });
});
