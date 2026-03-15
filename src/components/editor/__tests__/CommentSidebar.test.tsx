// @vitest-environment jsdom

import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { CommentSidebar } from "../CommentSidebar";
import { addDocumentCommentLocal } from "@/lib/editor/document-comments-local";

const editorStoreState = {
  setCommentCount: vi.fn(),
};

vi.mock("@/stores/editor-store", () => ({
  useEditorStore: (
    selector: (value: typeof editorStoreState) => unknown
  ) => selector(editorStoreState),
}));

describe("CommentSidebar", () => {
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    localStorage.clear();
    editorStoreState.setCommentCount.mockReset();
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container?.remove();
    container = null;
    root = null;
    vi.clearAllMocks();
  });

  function renderSidebar() {
    if (!container) {
      container = document.createElement("div");
      document.body.appendChild(container);
      root = createRoot(container);
    }

    act(() => {
      root?.render(
        <CommentSidebar
          documentId="doc-1"
          editor={{} as never}
          onClose={vi.fn()}
        />
      );
    });
  }

  function setInputValue(input: HTMLInputElement, value: string) {
    const valueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    )?.set;

    valueSetter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  it("renders the empty state copy and general comment placeholder", () => {
    renderSidebar();

    expect(document.body.textContent).toContain("No comments yet");
    expect(document.body.textContent).toContain(
      "Select text and click the comment button to start"
    );

    const generalInput = document.querySelector(
      'input[placeholder="Add a general comment about this document..."]'
    ) as HTMLInputElement | null;

    expect(generalInput).toBeTruthy();
  });

  it("keeps the inline comment composer placeholder for pending selections", () => {
    renderSidebar();

    act(() => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:new-inline-comment", {
          detail: {
            textRangeStart: 3,
            textRangeEnd: 8,
            quotedText: "quoted text",
          },
        })
      );
    });

    const inlineInput = document.querySelector(
      'input[placeholder="Add a comment..."]'
    ) as HTMLInputElement | null;

    expect(document.body.textContent).toContain("Commenting on selection");
    expect(inlineInput).toBeTruthy();
  });

  it("submits a general comment when Enter is pressed in the bottom input", async () => {
    renderSidebar();

    const generalInput = document.querySelector(
      'input[placeholder="Add a general comment about this document..."]'
    ) as HTMLInputElement | null;

    expect(generalInput).toBeTruthy();

    act(() => {
      setInputValue(generalInput!, "General comment from keyboard");
      generalInput!.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(document.body.textContent).toContain("General comment from keyboard");
  });

  it("submits a reply when Enter is pressed in the reply input", async () => {
    addDocumentCommentLocal("doc-1", {
      content: "Parent thread",
    });

    renderSidebar();

    const replyToggle = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent?.includes("Reply")
    );

    act(() => {
      replyToggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const replyInput = document.querySelector(
      'input[placeholder="Write a reply..."]'
    ) as HTMLInputElement | null;

    expect(replyInput).toBeTruthy();

    act(() => {
      setInputValue(replyInput!, "Reply from keyboard");
      replyInput!.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(document.body.textContent).toContain("Reply from keyboard");
  });

  it("registers and removes the inline-comment window listener", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    renderSidebar();

    const addCall = addSpy.mock.calls.find(
      (call) => call[0] === "scholarsync:new-inline-comment"
    );

    expect(addCall).toBeTruthy();
    expect(typeof addCall?.[1]).toBe("function");

    act(() => {
      root?.unmount();
    });
    root = null;

    expect(removeSpy).toHaveBeenCalledWith(
      "scholarsync:new-inline-comment",
      addCall?.[1]
    );
  });
});
