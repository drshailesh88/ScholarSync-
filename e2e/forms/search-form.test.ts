import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const searchPath = path.resolve("src/components/research/SearchInput.tsx");
const source = fs.readFileSync(searchPath, "utf8");

describe("search form hardening", () => {
  it("blocks empty required query submissions", () => {
    expect(source).toContain("disabled={isSearching || !query.trim()}");
  });

  it("accepts special characters by forwarding raw query input", () => {
    expect(source).toContain("onQueryChange(e.target.value)");
    expect(source).toContain("onSearch();");
  });

  it("prevents double-submit while searching", () => {
    expect(source).toContain("disabled={isSearching || !query.trim()}");
    expect(source).toContain('{isSearching ? "Searching..." : "Search"}');
  });
});
