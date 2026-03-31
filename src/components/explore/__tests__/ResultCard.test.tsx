// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResultCard } from "../ResultCard";
import type { UnifiedSearchResult } from "@/types/search";

function makeBaseResult(overrides: Partial<UnifiedSearchResult> = {}): UnifiedSearchResult {
  return {
    title: "Example result",
    authors: ["Jane Smith", "Alex Chen", "Priya Patel"],
    journal: "The Lancet",
    year: 2026,
    abstract: "Snippet text for the result card.",
    citationCount: 24,
    publicationTypes: ["article"],
    isOpenAccess: true,
    sources: ["pubmed"],
    trustTier: "major_journalism",
    ...overrides,
  };
}

describe("ResultCard", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-31T12:00:00Z"));
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
  });

  it("renders academic metadata with evidence level", () => {
    act(() => {
      root.render(
        <ResultCard
          result={makeBaseResult({
            evidenceLevel: "I",
            doi: "10.1000/example",
          })}
          tab="academic"
        />
      );
    });

    expect(container.textContent).toContain("The Lancet");
    expect(container.textContent).toContain("Jane Smith, Alex Chen, et al.");
    expect(container.textContent).toContain("Evidence I");
  });

  it("renders news outlet with relative time", () => {
    act(() => {
      root.render(
        <ResultCard
          result={makeBaseResult({
            journal: "Reuters",
            sourceLabel: "Reuters",
            publishedAt: "2026-03-31T09:00:00Z",
            url: "https://www.reuters.com/world/example-story",
          })}
          tab="news"
        />
      );
    });

    expect(container.textContent).toContain("Reuters");
    expect(container.textContent).toContain("3 hours ago");
    expect(container.textContent).toContain("reuters.com > world > example story");
  });

  it("renders discussion platform, community, and engagement", () => {
    act(() => {
      root.render(
        <ResultCard
          result={makeBaseResult({
            journal: "Reddit",
            sourceLabel: "Reddit",
            platform: "Reddit",
            community: "r/science",
            engagement: "▲ 847 · 234 comments",
            url: "https://www.reddit.com/r/science/comments/abc123/example/",
          })}
          tab="discussions"
        />
      );
    });

    expect(container.textContent).toContain("Reddit");
    expect(container.textContent).toContain("r/science");
    expect(container.textContent).toContain("▲ 847 · 234 comments");
  });
});
