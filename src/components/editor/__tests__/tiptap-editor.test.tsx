// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TiptapEditor } from "../tiptap-editor";

const useEditorMock = vi.hoisted(() => vi.fn());
const getDocumentWordCountMock = vi.hoisted(() => vi.fn());

vi.mock("@tiptap/react", () => ({
  useEditor: useEditorMock,
  EditorContent: ({ editor }: { editor: unknown }) => (
    <div data-testid="editor-content">{editor ? "editor-ready" : "editor-null"}</div>
  ),
}));

vi.mock("../toolbar", () => ({
  Toolbar: ({ editor }: { editor: unknown }) => (
    <div data-testid="toolbar">{editor ? "toolbar-ready" : "toolbar-null"}</div>
  ),
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

vi.mock("../FootnoteSection", () => ({
  FootnoteSection: () => <div data-testid="footnote-section" />,
}));

vi.mock("@/stores/editor-store", () => ({
  useEditorStore: (selector: (value: Record<string, unknown>) => unknown) =>
    selector({
      setOutline: vi.fn(),
      setActiveSectionPos: vi.fn(),
      setWordCount: vi.fn(),
    }),
}));

vi.mock("@/lib/editor/word-counter", () => ({
  getDocumentWordCount: getDocumentWordCountMock,
}));

vi.mock("@/lib/editor/serializable-json", () => ({
  toSerializableJson: (value: unknown) => value,
}));

describe("TiptapEditor", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;
  let latestConfig: Record<string, unknown> | null = null;
  let editorMock: Record<string, unknown> | null = null;

  beforeEach(() => {
    vi.useFakeTimers();
    latestConfig = null;
    editorMock = {
      isDestroyed: false,
      state: {
        doc: {
          content: { size: 9 },
          descendants: vi.fn(),
        },
        selection: { from: 1 },
      },
      commands: {
        setContent: vi.fn(),
        clearContent: vi.fn(),
      },
      getText: vi.fn(() => "debounced text words"),
      getJSON: vi.fn(() => ({ type: "doc", content: [] })),
    };

    useEditorMock.mockImplementation((config: Record<string, unknown>) => {
      latestConfig = config;
      return editorMock;
    });

    getDocumentWordCountMock.mockReset();
    getDocumentWordCountMock.mockReturnValue(42);

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

  it("mounts toolbar, overlay siblings, and footnote section when editor is available", () => {
    act(() => {
      root?.render(<TiptapEditor />);
    });

    expect(document.querySelector('[data-testid="toolbar"]')).toBeTruthy();
    expect(document.querySelector('[data-testid="selection-toolbar"]')).toBeTruthy();
    expect(document.querySelector('[data-testid="link-popover"]')).toBeTruthy();
    expect(document.querySelector('[data-testid="document-outline"]')).toBeTruthy();
    expect(document.querySelector('[data-testid="editor-content"]')).toBeTruthy();
    expect(document.querySelector('[data-testid="footnote-section"]')).toBeTruthy();

    const html = container?.innerHTML ?? "";
    expect(html.indexOf("selection-toolbar")).toBeLessThan(
      html.indexOf("editor-content")
    );
    expect(html.indexOf("editor-content")).toBeLessThan(
      html.indexOf("footnote-section")
    );
  });

  it("hides floating overlays and footnote section when editor is null", () => {
    useEditorMock.mockImplementation((config: Record<string, unknown>) => {
      latestConfig = config;
      return null;
    });

    act(() => {
      root?.render(<TiptapEditor />);
    });

    expect(document.querySelector('[data-testid="selection-toolbar"]')).toBeNull();
    expect(document.querySelector('[data-testid="link-popover"]')).toBeNull();
    expect(document.querySelector('[data-testid="document-outline"]')).toBeNull();
    expect(document.querySelector('[data-testid="footnote-section"]')).toBeNull();
    expect(document.querySelector('[data-testid="editor-content"]')).toBeTruthy();
  });

  it("flushSave uses doc.textBetween with newline separators and getDocumentWordCount on Cmd+S", () => {
    const onUpdate = vi.fn();
    const textBetween = vi.fn(() => "first block\nsecond block");
    const doc = {
      toJSON: () => ({ type: "doc" }),
      textBetween,
      content: { size: 13 },
    };

    act(() => {
      root?.render(<TiptapEditor onUpdate={onUpdate} />);
    });

    const handled = (
      latestConfig?.editorProps as {
        handleKeyDown: (view: { state: { doc: typeof doc } }, event: KeyboardEvent) => boolean;
      }
    ).handleKeyDown(
      { state: { doc } },
      new KeyboardEvent("keydown", { key: "s", metaKey: true, bubbles: true })
    );

    expect(handled).toBe(true);
    expect(textBetween).toHaveBeenCalledWith(0, 13, "\n");
    expect(getDocumentWordCountMock).toHaveBeenCalledWith(doc);
    expect(onUpdate).toHaveBeenCalledWith({
      editor_content: { type: "doc" },
      plain_text_content: "first block\nsecond block",
      word_count: 42,
    });
  });

  it("debounced save uses ed.getText with inline string splitting for word count", () => {
    const onUpdate = vi.fn();
    const onDirty = vi.fn();
    const updateEditor = {
      state: { doc: { marker: "pm-doc" } },
      getJSON: vi.fn(() => ({ type: "doc", content: [{ type: "paragraph" }] })),
      getText: vi.fn(() => "alpha beta  gamma"),
    };

    getDocumentWordCountMock.mockReturnValue(99);

    act(() => {
      root?.render(<TiptapEditor onUpdate={onUpdate} onDirty={onDirty} debounceMs={2000} />);
    });

    act(() => {
      (
        latestConfig?.onUpdate as (payload: { editor: typeof updateEditor }) => void
      )({ editor: updateEditor });
    });

    expect(onDirty).toHaveBeenCalledOnce();
    expect(getDocumentWordCountMock).toHaveBeenCalledWith(updateEditor.state.doc);
    expect(onUpdate).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(updateEditor.getText).toHaveBeenCalledWith();
    expect(onUpdate).toHaveBeenCalledWith({
      editor_content: { type: "doc", content: [{ type: "paragraph" }] },
      plain_text_content: "alpha beta  gamma",
      word_count: 3,
    });
  });

  it("clears editor content when contentKey changes to a fresh null-content document", () => {
    act(() => {
      root?.render(<TiptapEditor contentKey={1} content={{ type: "doc", content: [] }} />);
    });

    expect((editorMock?.commands as { clearContent: ReturnType<typeof vi.fn> }).clearContent).not.toHaveBeenCalled();

    act(() => {
      root?.render(<TiptapEditor contentKey={2} content={null} />);
    });

    expect((editorMock?.commands as { clearContent: ReturnType<typeof vi.fn> }).clearContent).toHaveBeenCalled();
  });
});
