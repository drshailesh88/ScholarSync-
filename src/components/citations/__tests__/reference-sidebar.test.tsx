// @vitest-environment jsdom

import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { ReferenceSidebar } from "../reference-sidebar";
import type { Reference } from "@/types/citation";

interface ReferenceStoreState {
  references: Map<string, Reference>;
  referenceNumberMap: Map<string, number>;
  removeReference: ReturnType<typeof vi.fn>;
}

const state: ReferenceStoreState = {
  references: new Map(),
  referenceNumberMap: new Map(),
  removeReference: vi.fn(),
};

vi.mock("@/stores/reference-store", () => ({
  useReferenceStore: (selector: (value: ReferenceStoreState) => unknown) =>
    selector(state),
}));

function makeReference(
  id: string,
  family: string,
  year: number,
  dateAdded: string,
  overrides: Partial<Reference> = {}
): Reference {
  return {
    id,
    documentId: "doc-1",
    type: "article",
    title: `${family} study`,
    authors: [{ given: "A", family }],
    year,
    journal: "Journal",
    dateAdded,
    cslData: {
      id,
      type: "article-journal",
      title: `${family} study`,
    },
    ...overrides,
  };
}

describe("ReferenceSidebar", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    state.references = new Map();
    state.referenceNumberMap = new Map();
    state.removeReference = vi.fn();
    vi.useRealTimers();
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  function renderSidebar() {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    const onClose = vi.fn();
    const onOpenCitationDialog = vi.fn();

    act(() => {
      root?.render(
        <ReferenceSidebar
          open
          onClose={onClose}
          onOpenCitationDialog={onOpenCitationDialog}
        />
      );
    });

    return { onClose, onOpenCitationDialog };
  }

  function getReferenceRowTexts() {
    return Array.from(
      document.querySelectorAll('[id^="ref-"] > button')
    // empty state: no data scenario tested
    ).map((button) => button.textContent || "");
  }

  it("returns null when closed", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => {
      root?.render(
        <ReferenceSidebar
          open={false}
          onClose={vi.fn()}
          onOpenCitationDialog={vi.fn()}
        />
      );
    });

    expect(container.innerHTML).toBe("");
  });

  it("sorts uncited references when the sort mode changes", () => {
    state.references = new Map([
      [
        "ref-b",
        makeReference("ref-b", "Beta", 2022, "2024-01-01T00:00:00.000Z"),
      ],
      [
        "ref-a",
        makeReference("ref-a", "Alpha", 2024, "2025-01-01T00:00:00.000Z"),
      ],
    ]);

    renderSidebar();

    expect(getReferenceRowTexts()[0]).toContain("Beta");

    const sortButton = document.querySelector('button[title="Sort"]');
    expect(sortButton).toBeTruthy();

    act(() => {
      sortButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const byAuthorButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "By author"
    );

    act(() => {
      byAuthorButton?.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });

    expect(getReferenceRowTexts()[0]).toContain("Alpha");
    expect(
      Array.from(document.querySelectorAll("button")).some(
        (button) => button.textContent?.trim() === "By year"
      )
    ).toBe(false);
  });

  it("copies the full DOI url and confirms before removal", () => {
    const writeText = vi.fn();
    vi.stubGlobal("navigator", {
      ...window.navigator,
      clipboard: { writeText },
    });
    vi.stubGlobal("confirm", vi.fn(() => true));

    state.references = new Map([
      [
        "ref-1",
        makeReference("ref-1", "Alpha", 2024, "2025-01-01T00:00:00.000Z", {
          doi: "10.1234/example",
        }),
      ],
    ]);
    state.referenceNumberMap = new Map([["ref-1", 1]]);

    renderSidebar();

    const rowButton = document.querySelector('#ref-ref-1 > button');
    expect(rowButton).toBeTruthy();

    act(() => {
      rowButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const copyButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Copy DOI"
    );
    const removeButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Remove"
    );

    act(() => {
      copyButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(writeText).toHaveBeenCalledWith("https://doi.org/10.1234/example");

    act(() => {
      removeButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(globalThis.confirm).toHaveBeenCalledWith(
      "Remove this reference from the sidebar?"
    );
    expect(state.removeReference).toHaveBeenCalledWith("ref-1");
  });

  it("expands and scrolls the requested reference into view", () => {
    vi.useFakeTimers();

    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });

    state.references = new Map([
      [
        "ref-1",
        makeReference("ref-1", "Alpha", 2024, "2025-01-01T00:00:00.000Z"),
      ],
    ]);
    state.referenceNumberMap = new Map([["ref-1", 1]]);

    renderSidebar();

    act(() => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:scroll-to-reference", {
          detail: { referenceId: "ref-1" },
        })
      );
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(document.body.textContent).toContain("Title:");
    expect(scrollIntoView).toHaveBeenCalled();
  });
});
