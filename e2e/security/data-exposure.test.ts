import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function walkTsx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTsx(full));
    else if (entry.isFile() && entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const root = path.resolve("src");
const tsxFiles = walkTsx(root);

const secretLiteralPattern = /(password|passwd|secret|api[_-]?key|token)\s*[:=]\s*["'`](?!\s*(?:\$\{|\)|\}|\]|,))(?!\s*(?:""|''|``))[^"'`]{6,}["'`]/i;
const envPattern = /process\.env\.([A-Z0-9_]+)/g;

describe("data exposure safeguards", () => {
  it("finds no hardcoded password/secret literals in .tsx files", () => {
    const offenders: string[] = [];

    for (const file of tsxFiles) {
      const rel = path.relative(process.cwd(), file);
      const source = fs.readFileSync(file, "utf8");
      if (secretLiteralPattern.test(source)) offenders.push(rel);
    }

    expect(offenders, `Possible hardcoded secrets in:\n${offenders.join("\n")}`).toEqual([]);
  });

  it("uses only NEXT_PUBLIC_ env vars in client components", () => {
    const offenders: string[] = [];

    for (const file of tsxFiles) {
      const rel = path.relative(process.cwd(), file);
      const source = fs.readFileSync(file, "utf8");
      if (!source.startsWith('"use client"') && !source.startsWith("'use client'")) continue;

      for (const match of source.matchAll(envPattern)) {
        const key = match[1];
        if (!key.startsWith("NEXT_PUBLIC_") && key !== "NODE_ENV") {
          offenders.push(`${rel} -> ${key}`);
        }
      }
    }

    expect(offenders, `Client components using non-public env vars:\n${offenders.join("\n")}`).toEqual([]);
  });
});
