import { describe, expect, it } from "vitest";
import {
  getFeedEmptyStateDescription,
} from "../feed-empty-state";
import { filterFeedsForDomain } from "../journal-browser";

describe("domain feed content", () => {
  it("uses medical journal suggestions for medicine", () => {
    const description = getFeedEmptyStateDescription({ id: "medicine" });

    expect(description).toContain("NEJM");
    expect(description).toContain("The Lancet");
  });

  it("does not mention medical journals for physics", () => {
    const description = getFeedEmptyStateDescription({ id: "physics" });

    expect(description).not.toContain("NEJM");
    expect(description).toContain("Nature Physics");
  });

  it("filters journal browser feeds by domain categories", () => {
    const feeds = [
      { title: "Physics Letters", category: "Physics" },
      { title: "New England Journal of Medicine", category: "Cardiology" },
      { title: "arXiv Physics Feed", category: "Physics" },
    ];

    const filtered = filterFeedsForDomain(feeds, {
      id: "physics",
      journalCategories: ["Physics"],
    });

    expect(filtered).toEqual([
      { title: "Physics Letters", category: "Physics" },
      { title: "arXiv Physics Feed", category: "Physics" },
    ]);
  });
});
