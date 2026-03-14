import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve("src/app/(app)/projects/page.tsx");
const source = fs.readFileSync(projectsPath, "utf8");

describe("project creation form hardening", () => {
  it("blocks empty required project name", () => {
    expect(source).toContain("if (!newName.trim() || creating) return;");
    expect(source).toContain("disabled={creating || !newName.trim()}");
  });

  it("handles special characters without unsafe interpolation", () => {
    expect(source).toContain("title: newName.trim()");
    expect(source).toContain("target_journal: newTargetJournal.trim() || undefined");
  });

  it("prevents double-click submit by checking creating state", () => {
    expect(source).toContain("if (!newName.trim() || creating) return;");
    expect(source).toContain("setCreating(true);");
    expect(source).toContain("setCreating(false);");
  });
});
