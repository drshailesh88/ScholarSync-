// @vitest-environment jsdom

import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

type RouteState = {
  projectId?: string | null;
  tab?: string | null;
  panel?: string | null;
};

function deriveStateFromDeepLink(url: string): Required<RouteState> {
  const parsed = new URL(url, "https://scholarsync.local");
  const params = parsed.searchParams;

  return {
    projectId: params.get("projectId") ?? "",
    tab: params.get("tab") ?? "overview",
    panel: params.get("panel") ?? "main",
  };
}

function StablePropsCard({
  title,
  subtitle,
}: {
  title?: string | null;
  subtitle?: string | null;
}) {
  return createElement(
    "article",
    null,
    createElement("h3", null, title ?? "Untitled"),
    createElement("p", null, subtitle ?? "No details available.")
  );
}

describe("resilience state consistency", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
  });

  it("deep links resolve expected state slices", () => {
    const state = deriveStateFromDeepLink(
      "https://scholarsync.local/notebook?projectId=42&tab=notes&panel=references"
    );

    expect(state).toEqual({
      projectId: "42",
      tab: "notes",
      panel: "references",
    });
  });

  it("deep links use stable defaults when query params are missing", () => {
    const state = deriveStateFromDeepLink("https://scholarsync.local/research");

    expect(state).toEqual({
      projectId: "",
      tab: "overview",
      panel: "main",
    });
  });

  it("components render safely with undefined/null props", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root?.render(createElement(StablePropsCard, { title: undefined, subtitle: null }));
    });

    expect(container.textContent).toContain("Untitled");
    expect(container.textContent).toContain("No details available.");
    expect(container.innerHTML.trim().length).toBeGreaterThan(0);
  });
});
