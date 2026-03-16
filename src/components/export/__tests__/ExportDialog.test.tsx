// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { ExportDialog } from "../ExportDialog";

vi.mock("@/stores/reference-store", () => {
  const state = {
    references: new Map(),
    referenceNumberMap: new Map(),
    bibliographyEntries: [],
  };

  return {
    useReferenceStore: (selector: (value: typeof state) => unknown) =>
      selector(state),
  };
});

describe("ExportDialog", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.clearAllMocks();
  });

  function renderDialog(isOpen: boolean) {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <ExportDialog
          isOpen={isOpen}
          onClose={vi.fn()}
          content={{ type: "doc", content: [] }}
          title="Audit Manuscript"
        />
      );
    });
  }

  it("resets format and toggles to defaults each time it opens", () => {
    renderDialog(true);

    const pdfButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "PDF"
    );
    const docxButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "DOCX"
    );
    const [pageNumbers, doubleSpaced] = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    ) as HTMLInputElement[];

    expect(pdfButton).toBeTruthy();
    expect(docxButton).toBeTruthy();
    expect(pageNumbers?.checked).toBe(true);
    expect(doubleSpaced?.checked).toBe(true);
    expect(docxButton?.className.includes("border-brand")).toBe(true);

    act(() => {
      pdfButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      pageNumbers?.click();
      doubleSpaced?.click();
    });

    expect(pageNumbers?.checked).toBe(false);
    expect(doubleSpaced?.checked).toBe(false);
    expect(pdfButton?.className.includes("border-brand")).toBe(true);

    renderDialog(false);
    renderDialog(true);

    const reopenedButtons = Array.from(document.querySelectorAll("button"));
    const reopenedDocxButton = reopenedButtons.find(
      (button) => button.textContent?.trim() === "DOCX"
    );
    const reopenedPdfButton = reopenedButtons.find(
      (button) => button.textContent?.trim() === "PDF"
    );
    const [reopenedPageNumbers, reopenedDoubleSpaced] = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    ) as HTMLInputElement[];

    expect(reopenedPageNumbers?.checked).toBe(true);
    expect(reopenedDoubleSpaced?.checked).toBe(true);
    expect(reopenedDocxButton?.className.includes("border-brand")).toBe(true);
    expect(reopenedPdfButton?.className.includes("border-brand")).toBe(false);
  });
});
