// @vitest-environment jsdom

import { act, createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

type EmptyStateRendererProps = {
  title: string;
  emptyCopy: string;
  data: unknown[] | null | undefined;
};

function EmptyStateRenderer({ title, emptyCopy, data }: EmptyStateRendererProps) {
  const hasRows = Array.isArray(data) && data.length > 0;

  return createElement(
    "section",
    { "aria-label": title },
    createElement("h2", null, title),
    hasRows ? createElement("div", null, "content-ready") : createElement("p", null, emptyCopy)
  );
}

describe("resilience empty states", () => {
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

  function render(component: ReactNode) {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root?.render(component);
    });
  }

  it.each([
    ["library", "Your library is empty. Add papers from Discover."],
    ["feeds", "No feeds yet. Add a feed to get started."],
    ["projects", "No projects yet. Create your first research project."],
    ["notebook", "No notes yet. Upload files to start a notebook."],
    ["research", "Try searching for a topic to begin discovery."],
  ])("renders %s empty-state copy when data is []", (title, emptyCopy) => {
    render(createElement(EmptyStateRenderer, { title, emptyCopy, data: [] }));

    expect(container?.textContent).toContain(title);
    expect(container?.textContent).toContain(emptyCopy);
    expect(container?.textContent).not.toContain("content-ready");
  });

  it.each([
    ["library", null],
    ["feeds", undefined],
    ["projects", null],
    ["notebook", undefined],
    ["research", null],
  ])("renders fallback UI when %s data is %s", (title, value) => {
    render(
      createElement(EmptyStateRenderer, {
        title,
        emptyCopy: "fallback-empty-state",
        data: value as unknown[] | null | undefined,
      })
    );

    expect(container?.textContent).toContain("fallback-empty-state");
    expect(container?.innerHTML?.trim().length).toBeGreaterThan(0);
  });
});
