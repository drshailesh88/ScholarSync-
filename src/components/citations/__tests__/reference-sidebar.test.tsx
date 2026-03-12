// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { ReferenceSidebar } from "../reference-sidebar";
import { useReferenceStore } from "@/stores/reference-store";

function renderSidebar() {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);

  act(() => {
    root.render(
      createElement(ReferenceSidebar, {
        open: true,
        onClose: vi.fn(),
        onOpenCitationDialog: vi.fn(),
      })
    );
  });

  return {
    host,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

beforeAll(() => {
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = false;
});

beforeEach(() => {
  useReferenceStore.setState({
    references: new Map([
      [
        "ref-1",
        {
          id: "ref-1",
          documentId: "doc-1",
          type: "article",
          title: "Reference title",
          authors: [{ family: "Smith", given: "John" }],
          year: 2024,
          journal: "Nature",
          doi: "10.1000/example",
          dateAdded: "2026-03-12T00:00:00.000Z",
          cslData: {
            id: "ref-1",
            type: "article-journal",
            title: "Reference title",
          },
        },
      ],
    ]),
    referenceNumberMap: new Map([["ref-1", 1]]),
    bibliographyEntries: [],
    citationDisplayMap: new Map(),
    sidebarOpen: true,
    citationDialogOpen: false,
  });
});

afterEach(() => {
  useReferenceStore.getState().clearReferences();
  useReferenceStore.setState({
    sidebarOpen: false,
    citationDialogOpen: false,
  });
  document.body.innerHTML = "";
});

describe("ReferenceSidebar", () => {
  it("exposes only number, author, year, and added sort modes", () => {
    const { host, cleanup } = renderSidebar();

    const sortButton = Array.from(host.querySelectorAll("button")).find(
      (el) => el.getAttribute("title") === "Sort"
    );

    act(() => {
      sortButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const sortOptions = Array.from(host.querySelectorAll("button"))
      .map((el) => el.textContent?.trim())
      .filter(Boolean);

    expect(sortOptions).toContain("By citation #");
    expect(sortOptions).toContain("By author");
    expect(sortOptions).toContain("By year");
    expect(sortOptions).toContain("By date added");
    expect(sortOptions).not.toContain("By title");

    cleanup();
  });

  it("has no edit-reference action in the expanded row flow", () => {
    const { host, cleanup } = renderSidebar();

    const refRow = Array.from(host.querySelectorAll("button")).find((el) =>
      el.textContent?.includes("Reference title")
    );

    act(() => {
      refRow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const actions = Array.from(host.querySelectorAll("button, a"))
      .map((el) => el.textContent?.trim())
      .filter(Boolean);

    expect(actions).toContain("Remove");
    expect(actions).toContain("Copy DOI");
    expect(actions).toContain("Open DOI");
    expect(actions).not.toContain("Edit");

    cleanup();
  });
});
