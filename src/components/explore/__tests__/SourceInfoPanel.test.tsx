// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SourceInfoPanel } from "../SourceInfoPanel";
import type { UnifiedSearchResult } from "@/types/search";

function makeResult(overrides: Partial<UnifiedSearchResult> = {}): UnifiedSearchResult {
  return {
    title: "Example result",
    authors: [],
    journal: "",
    year: 2026,
    citationCount: 0,
    publicationTypes: [],
    isOpenAccess: false,
    sources: ["searxng"],
    domain: "nytimes.com",
    trustTier: "major_journalism",
    url: "https://nytimes.com/article",
    ...overrides,
  };
}

describe("SourceInfoPanel", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders domain name and trust tier label", () => {
    act(() => {
      root.render(
        <SourceInfoPanel
          currentPreference="neutral"
          onClose={vi.fn()}
          onSetPreference={vi.fn()}
          result={makeResult()}
        />
      );
    });

    expect(container.textContent).toContain("nytimes.com");
    expect(container.textContent).toContain("Major Journalism");
  });

  it("renders government trust tier", () => {
    act(() => {
      root.render(
        <SourceInfoPanel
          currentPreference="neutral"
          onClose={vi.fn()}
          onSetPreference={vi.fn()}
          result={makeResult({ domain: "nih.gov", trustTier: "government" })}
        />
      );
    });

    expect(container.textContent).toContain("nih.gov");
    expect(container.textContent).toContain("Government / Institutional");
  });

  it("shows source type when available", () => {
    act(() => {
      root.render(
        <SourceInfoPanel
          currentPreference="neutral"
          onClose={vi.fn()}
          onSetPreference={vi.fn()}
          result={makeResult({ sourceLabel: "News Outlet" })}
        />
      );
    });

    expect(container.textContent).toContain("News Outlet");
  });

  it("shows current preference level", () => {
    act(() => {
      root.render(
        <SourceInfoPanel
          currentPreference="prefer"
          onClose={vi.fn()}
          onSetPreference={vi.fn()}
          result={makeResult()}
        />
      );
    });

    expect(container.textContent).toContain("Prefer");
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    act(() => {
      root.render(
        <SourceInfoPanel
          currentPreference="neutral"
          onClose={onClose}
          onSetPreference={vi.fn()}
          result={makeResult()}
        />
      );
    });

    const closeBtn = container.querySelector('[aria-label="Close source info"]') as HTMLButtonElement;
    act(() => {
      closeBtn.click();
    });

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("expands preference controls and calls onSetPreference", () => {
    const onSetPreference = vi.fn();
    act(() => {
      root.render(
        <SourceInfoPanel
          currentPreference="neutral"
          onClose={vi.fn()}
          onSetPreference={onSetPreference}
          result={makeResult()}
        />
      );
    });

    // Click "Domain Preference" to expand
    const buttons = Array.from(container.querySelectorAll("button"));
    const domainPrefBtn = buttons.find(
      (b) => b.textContent?.includes("Domain Preference")
    );
    expect(domainPrefBtn).toBeTruthy();

    act(() => {
      domainPrefBtn!.click();
    });

    // Should show all preference options
    expect(container.textContent).toContain("Always near top");
    expect(container.textContent).toContain("Boost in results");
    expect(container.textContent).toContain("Default ranking");
    expect(container.textContent).toContain("Demote in results");
    expect(container.textContent).toContain("Never show");

    // Re-query after expansion and click "Mute"
    const allButtons = Array.from(container.querySelectorAll("button"));
    const muteButton = allButtons.find((b) => b.textContent?.includes("Mute") && b.textContent?.includes("Never show"));
    expect(muteButton).toBeTruthy();

    act(() => {
      muteButton!.click();
    });

    expect(onSetPreference).toHaveBeenCalledWith("mute");
  });

  it("has data-testid for test targeting", () => {
    act(() => {
      root.render(
        <SourceInfoPanel
          currentPreference="neutral"
          onClose={vi.fn()}
          onSetPreference={vi.fn()}
          result={makeResult()}
        />
      );
    });

    expect(container.querySelector('[data-testid="source-info-panel"]')).toBeTruthy();
  });
});
