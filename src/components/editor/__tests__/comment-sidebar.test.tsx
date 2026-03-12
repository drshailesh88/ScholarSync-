// @vitest-environment jsdom

import { act, createElement } from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createRoot } from "react-dom/client";
import type { Editor } from "@tiptap/react";
import { CommentSidebar } from "../CommentSidebar";
import { addDocumentCommentLocal } from "@/lib/editor/document-comments-local";

function createEditorStub() {
  const run = vi.fn();
  const scrollIntoView = vi.fn(() => ({ run }));
  const setTextSelection = vi.fn(() => ({ scrollIntoView }));
  const focus = vi.fn(() => ({ setTextSelection }));
  const chain = vi.fn(() => ({ focus }));

  return {
    editor: { chain } as unknown as Editor,
    spies: { chain, focus, setTextSelection, scrollIntoView, run },
  };
}

function renderSidebar(
  documentId: string,
  editor: Editor,
  onClose = vi.fn()
) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);

  act(() => {
    root.render(createElement(CommentSidebar, { documentId, editor, onClose }));
  });

  return {
    host,
    onClose,
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      host.remove();
    },
  };
}

function setInputValue(input: HTMLInputElement, value: string) {
  const descriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  );
  descriptor?.set?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

afterEach(() => {
  localStorage.clear();
  document.body.innerHTML = "";
});

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

describe("CommentSidebar", () => {
  it("renders the empty state and filter controls", () => {
    const { editor } = createEditorStub();
    const { host, cleanup } = renderSidebar("doc-empty", editor);

    expect(host.textContent).toContain("Comments");
    expect(host.textContent).toContain("No comments yet");
    expect(host.textContent).toContain(
      "Select text and click the comment button to start"
    );

    const filters = Array.from(host.querySelectorAll("button"))
      .map((el) => el.textContent?.trim())
      .filter(Boolean);

    expect(filters).toContain("all");
    expect(filters).toContain("unresolved");
    expect(filters).toContain("resolved");

    cleanup();
  });

  it("renders unresolved and resolved comments with the expected timestamps and actions", () => {
    const { editor } = createEditorStub();
    const now = Date.now();

    addDocumentCommentLocal("doc-comments", {
      content: "Primary unresolved comment",
      quotedText: "Quoted text",
      textRangeStart: 1,
      textRangeEnd: 4,
      userName: "Alice",
    });
    addDocumentCommentLocal("doc-comments", {
      content: "Reply content",
      parentCommentId: "missing-parent-will-be-overwritten",
      userName: "Carol",
    });

    const seeded = JSON.parse(
      localStorage.getItem("scholarsync_comments_doc-comments") || "[]"
    );
    seeded[0].createdAt = new Date(now - 30 * 1000).toISOString();
    seeded[1].parentCommentId = seeded[0].id;
    seeded[1].createdAt = new Date(now - 5 * 60 * 1000).toISOString();
    seeded[1].userId = "other-user";
    seeded.push({
      id: "resolved-top-level",
      documentId: "doc-comments",
      userId: "other-user",
      userName: "Bob",
      textRangeStart: null,
      textRangeEnd: null,
      quotedText: null,
      content: "Resolved comment",
      parentCommentId: null,
      isResolved: true,
      createdAt: new Date(now - 26 * 60 * 60 * 1000).toISOString(),
    });
    localStorage.setItem(
      "scholarsync_comments_doc-comments",
      JSON.stringify(seeded)
    );

    const { host, cleanup } = renderSidebar("doc-comments", editor);

    expect(host.textContent).toContain("Alice");
    expect(host.textContent).toContain("Just now");
    expect(host.textContent).toContain("Carol");
    expect(host.textContent).toContain("5m ago");
    expect(host.textContent).toContain("Bob");
    expect(host.textContent).toContain("Yesterday");
    expect(host.textContent).toContain("Resolved");

    const unresolvedBadge = Array.from(host.querySelectorAll("span")).find(
      (el) =>
        el.textContent?.trim() === "1" &&
        el.className.includes("bg-amber-500/15")
    );
    expect(unresolvedBadge).not.toBeNull();

    const primaryParagraph = Array.from(host.querySelectorAll("p")).find((el) =>
      el.textContent?.trim() === "Primary unresolved comment"
    );
    const replyParagraph = Array.from(host.querySelectorAll("p")).find((el) =>
      el.textContent?.trim() === "Reply content"
    );
    const resolvedParagraph = Array.from(host.querySelectorAll("p")).find((el) =>
      el.textContent?.trim() === "Resolved comment"
    );

    const primaryBubble = primaryParagraph?.closest(".group");
    const replyBubble = replyParagraph?.closest(".group");
    const resolvedBubble = resolvedParagraph?.closest(".group");
    const replyButtons = Array.from(replyBubble?.querySelectorAll("button") ?? [])
      .map((el) => el.textContent?.trim())
      .filter(Boolean);

    expect(primaryBubble?.textContent).toContain("Resolve");
    expect(primaryBubble?.textContent).toContain("Reply");
    expect(primaryBubble?.textContent).toContain("Delete");
    expect(replyBubble?.textContent).not.toContain("Resolve");
    expect(replyBubble?.textContent).not.toContain("Delete");
    expect(replyButtons).toEqual([]);
    expect(resolvedBubble?.textContent).toContain("Unresolve");
    expect(resolvedBubble?.textContent).toContain("Reply");

    const resolvedName = Array.from(host.querySelectorAll("span")).find(
      (el) => el.textContent?.trim() === "Bob"
    );
    expect(resolvedName?.className).toContain("line-through");

    cleanup();
  });

  it("shows inline comment creation UI when scholarsync:new-inline-comment fires", () => {
    const { editor } = createEditorStub();
    const { host, cleanup } = renderSidebar("doc-inline", editor);

    act(() => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:new-inline-comment", {
          detail: {
            textRangeStart: 2,
            textRangeEnd: 8,
            quotedText: "Inline quoted text",
          },
        })
      );
    });

    expect(host.textContent).toContain("Commenting on selection");
    expect(host.textContent).toContain("“Inline quoted text”");
    expect(host.textContent).toContain("Cancel");
    expect(host.textContent).toContain("Add Comment");

    cleanup();
  });

  it("submits an inline comment on Enter and stores it in localStorage as local-user", async () => {
    const { editor } = createEditorStub();
    const { host, cleanup } = renderSidebar("doc-inline-submit", editor);

    act(() => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:new-inline-comment", {
          detail: {
            textRangeStart: 2,
            textRangeEnd: 8,
            quotedText: "Inline quoted text",
          },
        })
      );
    });

    const inputs = Array.from(
      host.querySelectorAll('input[placeholder="Add a comment..."]')
    );
    expect(inputs).toHaveLength(1);

    await act(async () => {
      setInputValue(inputs[0] as HTMLInputElement, "Inline submission");
      await Promise.resolve();
    });

    await act(async () => {
      inputs[0]?.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          bubbles: true,
          cancelable: true,
        })
      );
      await Promise.resolve();
    });

    const stored = JSON.parse(
      localStorage.getItem("scholarsync_comments_doc-inline-submit") || "[]"
    );

    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      documentId: "doc-inline-submit",
      userId: "local-user",
      userName: "You",
      content: "Inline submission",
      quotedText: "Inline quoted text",
      textRangeStart: 2,
      textRangeEnd: 8,
      parentCommentId: null,
      isResolved: false,
    });

    cleanup();
  });

  it("submits a reply on Enter without creating a newline", async () => {
    const { editor } = createEditorStub();
    const parent = addDocumentCommentLocal("doc-reply", {
      content: "Parent comment",
      userName: "Alice",
    });

    const { host, cleanup } = renderSidebar("doc-reply", editor);
    const replyButton = Array.from(host.querySelectorAll("button")).find(
      (el) => el.textContent?.trim() === "Reply"
    );

    act(() => {
      replyButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const replyInput = host.querySelector(
      'input[placeholder="Write a reply..."]'
    ) as HTMLInputElement | null;
    expect(replyInput).not.toBeNull();

    await act(async () => {
      setInputValue(replyInput!, "Reply via Enter");
      await Promise.resolve();
    });

    await act(async () => {
      replyInput!.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          code: "Enter",
          bubbles: true,
          cancelable: true,
        })
      );
      await Promise.resolve();
    });

    const stored = JSON.parse(
      localStorage.getItem("scholarsync_comments_doc-reply") || "[]"
    );

    expect(stored).toHaveLength(2);
    expect(stored[1]).toMatchObject({
      documentId: "doc-reply",
      userId: "local-user",
      userName: "You",
      content: "Reply via Enter",
      parentCommentId: parent.id,
      isResolved: false,
    });

    cleanup();
  });

  it("clicking quoted text scrolls the editor selection into view", () => {
    const { editor, spies } = createEditorStub();
    const comment = addDocumentCommentLocal("doc-scroll", {
      content: "Primary unresolved comment",
      quotedText: "Quoted text",
      textRangeStart: 3,
      textRangeEnd: 9,
      userName: "Alice",
    });

    const { host, cleanup } = renderSidebar("doc-scroll", editor);
    const quotedButton = Array.from(host.querySelectorAll("button")).find((el) =>
      el.textContent?.includes("Quoted text")
    );

    act(() => {
      quotedButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(spies.chain).toHaveBeenCalledOnce();
    expect(spies.focus).toHaveBeenCalledOnce();
    expect(spies.setTextSelection).toHaveBeenCalledWith({
      from: comment.textRangeStart,
      to: comment.textRangeEnd,
    });
    expect(spies.scrollIntoView).toHaveBeenCalledOnce();
    expect(spies.run).toHaveBeenCalledOnce();

    cleanup();
  });
});
