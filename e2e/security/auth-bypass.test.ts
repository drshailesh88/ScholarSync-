import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name === "route.ts") files.push(full);
  }
  return files;
}

const apiRoot = path.resolve("src/app/api");
const routeFiles = walk(apiRoot);

const protectedSignals = [/getCurrentUserId\(/, /supabase\.auth\.getUser\(/, /auth\.getUser\(/];

describe("auth bypass protection", () => {
  it("protected API routes either return explicit 401 or delegate auth to shared helper", () => {
    const protectedRoutes = routeFiles.filter((file) => {
      const source = fs.readFileSync(file, "utf8");
      return protectedSignals.some((p) => p.test(source));
    });

    expect(protectedRoutes.length).toBeGreaterThan(0);

    const missingAuthDefense = protectedRoutes.filter((file) => {
      const source = fs.readFileSync(file, "utf8");
      const has401Path = /\b401\b|status:\s*401|Unauthorized|Authentication required/i.test(source);
      const delegatesToHelper = /getCurrentUserId\(/.test(source);
      return !has401Path && !delegatesToHelper;
    });

    expect(missingAuthDefense, `Protected routes without detectable auth defense:\n${missingAuthDefense.join("\n")}`).toEqual([]);
  });
});
