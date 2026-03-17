// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PDFChatPanel } from "../PDFChatPanel";

const storeState = vi.hoisted(() => ({
  chatMessages: [] as Array<{ id: string; role: string; content: string }> ,
  isChatLoading: false,
  highlights: [] as Array<{ paperId: string; pageNumber: number; selectedText: string; note?: string; color?: string; targetSection?: string }>,
}));
const addChatMessageMock = vi.hoisted(() => vi.fn());
const setChatLoadingMock = vi.hoisted(() => vi.fn());

vi.mock("@/stores/pdf-store", () => ({
  usePDFStore: () => ({
    ...storeState,
    addChatMessage: addChatMessageMock,
    setChatLoading: setChatLoadingMock,
  }),
}));

vi.mock("../PDFChatMessage", () => ({
  PDFChatMessageComponent: ({ message }: { message: { content: string } }) => <div>{message.content}</div>,
}));

vi.mock("../PDFSuggestedQuestions", () => ({
  PDFSuggestedQuestions: ({ questions, onSelect }: { questions: string[]; onSelect: (q: string) => void }) => (
    <div>
      <span>suggested</span>
      <button onClick={() => onSelect(questions[0])}>ask-first</button>
    </div>
  ),
}));

describe("PDFChatPanel", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    vi.restoreAllMocks();
    addChatMessageMock.mockReset();
    setChatLoadingMock.mockReset();
    storeState.chatMessages = [];
    storeState.isChatLoading = false;
    storeState.highlights = [];
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders suggested questions when there are no messages", () => {
    act(() => {
      root.render(<PDFChatPanel paperId="p1" paperMetadata={null} onNavigateToPage={vi.fn()} />);
    });

    expect(container.textContent).toContain("suggested");
    expect(container.textContent).toContain("Ask about this paper");
  });

  it("sends message and appends assistant response", async () => {
    storeState.highlights = [
      { paperId: "p1", pageNumber: 4, selectedText: "primary outcome", note: "important", color: "yellow" },
      { paperId: "other-paper", pageNumber: 1, selectedText: "ignore me" },
    ];
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ content: "assistant answer", sourceQuotes: [] }),
    } as Response);

    act(() => {
      root.render(
        <PDFChatPanel
          paperId="p1"
          paperMetadata={{ title: "Trial paper" } as never}
          currentSelection={{ pageNumber: 3, text: "selected text" } as never}
          onNavigateToPage={vi.fn()}
        />
      );
    });

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;

    await act(async () => {
      setter?.call(textarea, "What is outcome?");
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    });

    await act(async () => {
      container.querySelector('button[aria-label="Send message"]')?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/research/pdf-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paperId: "p1",
        message: '[Selection from page 3: "selected text"]\n\nWhat is outcome?',
        highlights: [
          {
            pageNumber: 4,
            text: "primary outcome",
            note: "important",
            color: "yellow",
            targetSection: undefined,
          },
        ],
        paperMetadata: { title: "Trial paper" },
      }),
    });
    expect(addChatMessageMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ role: "user", content: "What is outcome?" })
    );
    expect(addChatMessageMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ role: "assistant", content: "assistant answer" })
    );
    expect(setChatLoadingMock).toHaveBeenCalledWith(true);
    expect(setChatLoadingMock).toHaveBeenLastCalledWith(false);
  });

  it("shows selection attachment context", () => {
    act(() => {
      root.render(
        <PDFChatPanel
          paperId="p1"
          paperMetadata={null}
          currentSelection={{ pageNumber: 3, text: "selected text" } as never}
          onNavigateToPage={vi.fn()}
        />,
      );
    });

    expect(container.textContent).toContain("Selection from p.3 attached");
  });
});
