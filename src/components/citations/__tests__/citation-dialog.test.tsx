// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { CitationDialog } from "../citation-dialog";

const referenceStoreState = {
  references: new Map(),
  addReference: vi.fn(),
  referenceNumberMap: new Map(),
};

vi.mock("@/stores/reference-store", () => ({
  useReferenceStore: (
    selector: (value: typeof referenceStoreState) => unknown
  ) => selector(referenceStoreState),
}));

describe("CitationDialog", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    referenceStoreState.addReference.mockReset();
  });

  function renderDialog() {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <CitationDialog
          open
          onClose={vi.fn()}
          onInsert={vi.fn()}
          documentId="doc-1"
        />
      );
    });
  }

  it("exposes the full reference type list including Other in manual entry", () => {
    renderDialog();

    const manualTab = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Manual Entry"
    );

    act(() => {
      manualTab?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const typeSelect = document.querySelector("select") as HTMLSelectElement | null;

    expect(typeSelect).toBeTruthy();
    expect(Array.from(typeSelect?.options ?? []).map((option) => option.value)).toEqual([
      "article",
      "book",
      "chapter",
      "website",
      "guideline",
      "conference",
      "thesis",
      "preprint",
      "other",
    ]);
  });
});
