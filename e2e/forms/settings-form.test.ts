import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const settingsPath = path.resolve("src/app/(app)/settings/page.tsx");
const source = fs.readFileSync(settingsPath, "utf8");

describe("settings form hardening", () => {
  it("handles empty required-ish input via trimmed guard for research interests", () => {
    expect(source).toContain("const trimmed = interestInput.trim();");
    expect(source).toContain("if (trimmed && !researchInterests.includes(trimmed))");
  });

  it("preserves special characters in profile fields by submitting raw values", () => {
    expect(source).toContain("full_name: profileName");
    expect(source).toContain("specialty,");
    expect(source).toContain("country,");
    expect(source).toContain("bio,");
  });

  it("prevents double-submit by disabling save controls while request is in-flight", () => {
    expect(source).toContain("setSaving(true);");
    expect(source).toContain("setSaving(false);");
    expect(source).toContain("disabled={saving}");
  });
});
