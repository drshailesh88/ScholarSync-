import { describe, expect, it } from "vitest";
import {
  buildLocalLibraryPapers,
  buildLocalResolvedReference,
} from "@/lib/citations/local-fallback";

describe("citation local fallbacks", () => {
  it("returns deterministic library papers and filters by query", () => {
    const all = buildLocalLibraryPapers("");
    const filtered = buildLocalLibraryPapers("browser automation");

    expect(all.length).toBeGreaterThanOrEqual(2);
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.title).toContain("Browser Automation");
  });

  it("builds a deterministic resolved reference for DOI and PMID", () => {
    const doiRef = buildLocalResolvedReference("10.1000/example", "doc-1");
    const pmidRef = buildLocalResolvedReference("37654789", "doc-1");

    expect(doiRef.doi).toBe("10.1000/example");
    expect(doiRef.title).toContain("Resolved DOI Reference");
    expect(pmidRef.pmid).toBe("37654789");
    expect(pmidRef.title).toContain("Resolved PMID Reference");
  });
});
