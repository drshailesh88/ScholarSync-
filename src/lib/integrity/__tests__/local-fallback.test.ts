import { describe, expect, it } from "vitest";
import { buildLocalIntegrityCheckResult } from "@/lib/integrity/local-fallback";

describe("buildLocalIntegrityCheckResult", () => {
  it("returns a paid local report with all major sections populated", () => {
    const result = buildLocalIntegrityCheckResult({
      text: "This is a local integrity test paragraph with enough detail to exceed fifty characters. It cites one source for QA validation.",
      plan: "basic",
      userId: "dev_user_001",
      sources: [
        {
          title: "A local QA source",
          doi: "10.1000/local-qa",
          authors: ["Ada Lovelace", "Grace Hopper"],
          year: 2026,
        },
      ],
    });

    expect(result.tier).toBe("paid");
    expect(result.aiDetection.humanScore).toBeGreaterThan(0);
    expect(result.plagiarism?.matches[0]?.source.doi).toBe("10.1000/local-qa");
    expect(result.citationAudit?.verifiedReferences[0]).toMatchObject({
      index: 1,
      title: "A local QA source",
      verified: true,
    });
    expect(result.writingQuality.suggestions.length).toBeGreaterThan(0);
  });

  it("returns a warning issue when no references are available", () => {
    const result = buildLocalIntegrityCheckResult({
      text: "This is a second local integrity test paragraph with enough detail to exceed fifty characters and exercise the empty reference path.",
      plan: "basic",
    });

    expect(result.citationAudit?.issues).toEqual([
      expect.objectContaining({
        severity: "warning",
        reference: "1",
      }),
    ]);
    expect(result.citationAudit?.verifiedReferences).toEqual([]);
  });
});
