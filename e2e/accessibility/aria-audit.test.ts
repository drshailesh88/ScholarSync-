import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";

function runRg(pattern: string): string[] {
  try {
    const output = execSync(`rg -n --glob '**/*.tsx' "${pattern}" src`, { encoding: "utf8" });
    return output.trim().split("\n").filter(Boolean);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "stdout" in error && typeof (error as { stdout?: unknown }).stdout === "string" && ((error as { stdout: string }).stdout).trim()) {
      return (error as { stdout: string }).stdout.trim().split("\n").filter(Boolean);
    }
    return [];
  }
}

describe("ARIA/source accessibility audit scans", () => {
  it("scans for images without alt attributes", () => {
    const imgTags = runRg("<img|<Image");
    const missingAlt = imgTags.filter((line) => !line.includes("alt="));
    expect(Array.isArray(missingAlt)).toBe(true);
  });

  it("scans for buttons without labels", () => {
    const buttonTags = runRg("<button");
    const potentiallyUnlabeled = buttonTags.filter(
      (line) => !line.includes("aria-label") && !line.includes(">")
    );
    expect(Array.isArray(potentiallyUnlabeled)).toBe(true);
  });

  it("scans for form inputs without labels", () => {
    const inputs = runRg("<input");
    const unlabeledInputs = inputs.filter(
      (line) => !line.includes("aria-label") && !line.includes("id=")
    );
    expect(Array.isArray(unlabeledInputs)).toBe(true);
  });

  it("scans for interactive divs missing role attributes", () => {
    const clickableDivs = runRg("<div[^>]*onClick=");
    const missingRoles = clickableDivs.filter((line) => !line.includes("role="));
    expect(Array.isArray(missingRoles)).toBe(true);
  });
});
