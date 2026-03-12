// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DocumentOutline } from "../DocumentOutline";

const useEditorStoreMock = vi.hoisted(() => vi.fn());

vi.mock("@/stores/editor-store", () => ({
  useEditorStore: (selector?: (value: Record<string, unknown>) => unknown) => {
    const store = useEditorStoreMock();
    return selector ? selector(store) : store;
  },
}));

describe("DocumentOutline", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    useEditorStoreMock.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.restoreAllMocks();
  });

  it("uses the documented heading styles, hover word-count reveal, and locale-formatted footer", () => {
    useEditorStoreMock.mockReturnValue({
      outline: [
        { id: "h1", type: "heading", level: 2, text: "Intro", pos: 5, wordCount: 1234 },
        { id: "h2", type: "heading", level: 3, text: "Details", pos: 15, wordCount: 56 },
      ],
      outlineVisible: true,
      toggleOutline: vi.fn(),
      activeSectionPos: 5,
      wordCount: 12345,
    });

    const editor = {
      view: { domAtPos: vi.fn(() => ({ node: document.createElement("div") })) },
      chain: vi.fn(() => ({
        focus: vi.fn().mockReturnThis(),
        setTextSelection: vi.fn().mockReturnThis(),
        run: vi.fn(),
      })),
    };

    act(() => {
      root?.render(<DocumentOutline editor={editor as never} />);
    });

    const header = Array.from(container?.querySelectorAll("span") ?? []).find(
      (span) => span.textContent === "Document Outline"
    );
    expect(header?.className).toContain("text-xs");
    expect(header?.className).toContain("font-semibold");
    expect(header?.className).toContain("text-ink-muted");
    expect(header?.className).toContain("uppercase");
    expect(header?.className).toContain("tracking-wider");

    const wordCountBadge = Array.from(container?.querySelectorAll("span") ?? []).find(
      (span) => span.textContent === "1234w"
    );
    expect(wordCountBadge?.className).toContain("opacity-0");
    expect(wordCountBadge?.className).toContain("group-hover:opacity-100");
    expect(wordCountBadge?.className).toContain("transition-opacity");

    expect(container?.textContent).toContain("Total: 12,345 words");
  });

  it('uses "Document Outline" as the collapsed toggle title', () => {
    useEditorStoreMock.mockReturnValue({
      outline: [
        { id: "h1", type: "heading", level: 2, text: "Intro", pos: 5, wordCount: 10 },
        { id: "h2", type: "heading", level: 2, text: "Methods", pos: 15, wordCount: 20 },
      ],
      outlineVisible: false,
      toggleOutline: vi.fn(),
      activeSectionPos: null,
      wordCount: 30,
    });

    const editor = {
      view: { domAtPos: vi.fn(() => ({ node: document.createElement("div") })) },
      chain: vi.fn(() => ({
        focus: vi.fn().mockReturnThis(),
        setTextSelection: vi.fn().mockReturnThis(),
        run: vi.fn(),
      })),
    };

    act(() => {
      root?.render(<DocumentOutline editor={editor as never} />);
    });

    const toggle = container?.querySelector('button[title="Document Outline"]');
    expect(toggle).toBeTruthy();
  });
});
