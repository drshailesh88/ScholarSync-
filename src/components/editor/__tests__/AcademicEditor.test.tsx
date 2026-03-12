// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AcademicEditor } from "../AcademicEditor";

const useEditorMock = vi.hoisted(() => vi.fn());
const getDocumentWordCountMock = vi.hoisted(() => vi.fn());
const setWordCountMock = vi.hoisted(() => vi.fn());
const setOutlineMock = vi.hoisted(() => vi.fn());
const setSaveStatusMock = vi.hoisted(() => vi.fn());
const setActiveSectionPosMock = vi.hoisted(() => vi.fn());
const toggleCommentSidebarMock = vi.hoisted(() => vi.fn());
const setReferenceCountMock = vi.hoisted(() => vi.fn());
const setCommentCountMock = vi.hoisted(() => vi.fn());

vi.mock("@tiptap/react", () => ({
  useEditor: useEditorMock,
  EditorContent: ({ editor }: { editor: unknown }) => (
    <div data-testid="editor-content">{editor ? "editor-ready" : "editor-null"}</div>
  ),
}));

vi.mock("../TopBar", () => ({
  TopBar: () => <div data-testid="top-bar" />,
}));

vi.mock("../SelectionToolbar", () => ({
  SelectionToolbar: () => <div data-testid="selection-toolbar" />,
}));

vi.mock("../LinkPopover", () => ({
  LinkPopover: () => <div data-testid="link-popover" />,
}));

vi.mock("../DocumentOutline", () => ({
  DocumentOutline: () => <div data-testid="document-outline" />,
}));

vi.mock("../CommentSidebar", () => ({
  CommentSidebar: () => <div data-testid="comment-sidebar" />,
}));

vi.mock("../FootnoteSection", () => ({
  FootnoteSection: () => <div data-testid="footnote-section" />,
}));

vi.mock("@/stores/editor-store", () => ({
  useEditorStore: (selector?: (value: Record<string, unknown>) => unknown) => {
    const store = {
      setWordCount: setWordCountMock,
      setOutline: setOutlineMock,
      setSaveStatus: setSaveStatusMock,
      setActiveSectionPos: setActiveSectionPosMock,
      mode: "editing",
      commentSidebarOpen: false,
      toggleCommentSidebar: toggleCommentSidebarMock,
      setReferenceCount: setReferenceCountMock,
      setCommentCount: setCommentCountMock,
    };
    return selector ? selector(store) : store;
  },
}));

vi.mock("@/lib/editor/word-counter", () => ({
  getDocumentWordCount: getDocumentWordCountMock,
}));

vi.mock("@/lib/editor/document-comments-local", () => ({
  getCommentCountLocal: () => ({ total: 0, unresolved: 0 }),
}));

vi.mock("@/lib/editor/serializable-json", () => ({
  toSerializableJson: (value: unknown) => value,
}));

describe("AcademicEditor", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let latestConfig: Record<string, unknown> | null = null;
  let editorMock: Record<string, unknown> | null = null;

  beforeEach(() => {
    vi.useFakeTimers();
    latestConfig = null;
    editorMock = {
      isDestroyed: false,
      setEditable: vi.fn(),
      getText: vi.fn(() => ""),
      getJSON: vi.fn(() => ({ type: "doc", content: [] })),
      commands: {
        setContent: vi.fn(),
      },
      state: {
        doc: {
          descendants: vi.fn(),
        },
        selection: { from: 1 },
      },
    };

    useEditorMock.mockImplementation((config: Record<string, unknown>) => {
      latestConfig = config;
      return editorMock;
    });

    getDocumentWordCountMock.mockReset();
    getDocumentWordCountMock.mockReturnValue(7);
    setWordCountMock.mockReset();
    setOutlineMock.mockReset();
    setSaveStatusMock.mockReset();
    setActiveSectionPosMock.mockReset();
    toggleCommentSidebarMock.mockReset();
    setReferenceCountMock.mockReset();
    setCommentCountMock.mockReset();

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
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("marks saving immediately, then saved after debounce without waiting for parent persistence", () => {
    const unresolvedSave = new Promise<never>(() => {});
    const onUpdate = vi.fn(() => unresolvedSave);
    const updateEditor = {
      state: { doc: { marker: "pm-doc" } },
      getJSON: vi.fn(() => ({ type: "doc", content: [{ type: "paragraph" }] })),
      getText: vi.fn(() => "alpha beta"),
    };

    act(() => {
      root?.render(
        <AcademicEditor
          documentId="doc-1"
          content={{ type: "doc", content: [] }}
          onUpdate={onUpdate}
          debounceMs={2000}
        />
      );
    });

    act(() => {
      (
        latestConfig?.onUpdate as (payload: { editor: typeof updateEditor }) => void
      )({ editor: updateEditor });
    });

    expect(setSaveStatusMock).toHaveBeenCalledWith({ state: "saving" });
    expect(onUpdate).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onUpdate).toHaveBeenCalledWith({
      editor_content: { type: "doc", content: [{ type: "paragraph" }] },
      plain_text_content: "alpha beta",
      word_count: 7,
    });
    expect(setSaveStatusMock).toHaveBeenLastCalledWith({
      state: "saved",
      lastSavedAt: expect.any(Date),
    });
    expect(onUpdate.mock.invocationCallOrder[0]).toBeLessThan(
      setSaveStatusMock.mock.invocationCallOrder[1]
    );
  });

  it("clears the outline on initial bootstrap when fewer than two headings exist", () => {
    act(() => {
      root?.render(
        <AcademicEditor
          documentId="doc-1"
          content={{ type: "doc", content: [] }}
        />
      );
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(setOutlineMock).toHaveBeenCalledWith([]);
  });
});
