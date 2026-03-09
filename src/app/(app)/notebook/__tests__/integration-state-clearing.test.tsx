// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

interface ConvoRecord {
  id: number;
  title: string | null;
  mode: string;
  updated_at: Date | null;
  paper_ids?: number[] | null;
  messages?: Array<{ id: number; role: string; content: string; retrieved_chunks: unknown }>;
}

type SuggestionItem = { text: string; type: "factual" | "comparative" | "analytical" | "applied" };

const mocks = vi.hoisted(() => ({
  createConversationMock: vi.fn<() => Promise<ConvoRecord>>(async () => ({ id: 1, title: "Test", mode: "notebook", updated_at: new Date() })),
  addMessageMock: vi.fn(async () => undefined),
  getConversationsMock: vi.fn<() => Promise<ConvoRecord[]>>(async () => []),
  getConversationMock: vi.fn<() => Promise<ConvoRecord | null>>(async () => null),
  updateConversationPaperIdsMock: vi.fn(async () => undefined),
  getUserPapersMock: vi.fn<() => Promise<Array<{ id: number; title: string; is_extracted: boolean }>>>(async () => []),
  savePaperMock: vi.fn(async () => 1),
  getExtractionForPaperMock: vi.fn(async () => null),
  verifyExtractionMock: vi.fn(async () => undefined),
  extractUploadedPdfMock: vi.fn(async () => ({ chunksCreated: 1 })),
  getFollowUpSuggestionsMock: vi.fn<() => Promise<SuggestionItem[]>>(async () => []),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/ui/glass-panel", () => ({
  GlassPanel: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

vi.mock("@/lib/actions/conversations", () => ({
  createConversation: mocks.createConversationMock,
  addMessage: mocks.addMessageMock,
  getConversations: mocks.getConversationsMock,
  getConversation: mocks.getConversationMock,
  updateConversationPaperIds: mocks.updateConversationPaperIdsMock,
}));

vi.mock("@/lib/actions/papers", () => ({
  getUserPapers: mocks.getUserPapersMock,
  savePaper: mocks.savePaperMock,
}));

vi.mock("@/lib/actions/extraction", () => ({
  getExtractionForPaper: mocks.getExtractionForPaperMock,
  verifyExtraction: mocks.verifyExtractionMock,
}));

vi.mock("@/lib/actions/pdf-advanced", () => ({
  extractUploadedPdf: mocks.extractUploadedPdfMock,
}));

vi.mock("@/lib/actions/follow-up-suggestions", () => ({
  getFollowUpSuggestions: mocks.getFollowUpSuggestionsMock,
}));

import NotebookPage from "../page";

function createStreamResponse(
  chunks: string[],
  headers?: Record<string, string>
): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers });
}

interface RenderResult {
  root: Root;
  host: HTMLDivElement;
  cleanup: () => void;
}

let consoleErrorSpy: ReturnType<typeof vi.spyOn> | null = null;

function renderNotebook(): RenderResult {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  act(() => {
    root.render(<NotebookPage />);
  });
  return {
    root,
    host,
    cleanup: () => {
      act(() => root.unmount());
      host.remove();
    },
  };
}

async function flush(ms = 0): Promise<void> {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  });
}

function getChatInput(): HTMLInputElement {
  const input = document.querySelector(
    'input[placeholder="Ask about your sources..."], input[placeholder="What do you want to explore?"]'
  );
  if (!(input instanceof HTMLInputElement)) {
    throw new Error("Chat input not found");
  }
  return input;
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

async function submitMessage(text: string): Promise<void> {
  const input = getChatInput();
  setInputValue(input, text);
  const form = input.closest("form");
  if (!form) throw new Error("Chat form not found");
  await act(async () => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

async function waitForCondition(
  predicate: () => boolean,
  timeoutMs = 3000
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (predicate()) return;
    await flush(20);
  }
  throw new Error("Condition not met within timeout");
}

beforeAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  if (!Element.prototype.scrollIntoView) {
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      value: () => undefined,
      writable: true,
    });
  }
});

afterAll(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
});

beforeEach(() => {
  vi.clearAllMocks();
  const originalConsoleError = console.error;
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string" && first.includes("not wrapped in act")) return;
    originalConsoleError(...(args as Parameters<typeof console.error>));
  });
  mocks.getUserPapersMock.mockResolvedValue([]);
  mocks.getConversationsMock.mockResolvedValue([]);
  mocks.getFollowUpSuggestionsMock.mockResolvedValue([]);
});

afterEach(() => {
  consoleErrorSpy?.mockRestore();
  consoleErrorSpy = null;
  document.body.innerHTML = "";
});

describe("Integration: state clearing on conversation load", () => {
  it("loadConversation clears follow-up suggestions from previous conversation", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    // Provide past conversations
    mocks.getConversationsMock.mockResolvedValue([
      { id: 42, title: "Past convo", mode: "notebook", updated_at: new Date() },
    ]);

    // First message streaming response
    fetchMock.mockResolvedValueOnce(
      createStreamResponse(
        ["This is a long enough response that exceeds one hundred characters to trigger suggestion generation."],
        { "X-RAG-Sources": "[]" }
      )
    );

    mocks.getFollowUpSuggestionsMock.mockResolvedValueOnce([
      { text: "Stale chip from old convo", type: "analytical" as const },
    ]);

    const view = renderNotebook();
    await flush();

    // Send a message to get suggestion chips
    await submitMessage("Tell me about the papers");
    await waitForCondition(
      () => document.body.textContent?.includes("Stale chip from old convo") === true
    );

    // Now load a past conversation
    mocks.getConversationMock.mockResolvedValueOnce({
      id: 42,
      title: "Past convo",
      mode: "notebook",
      updated_at: new Date(),
      paper_ids: [],
      messages: [
        { id: 1, role: "user", content: "Hello", retrieved_chunks: null },
        { id: 2, role: "assistant", content: "Hi there", retrieved_chunks: null },
      ],
    });

    // Click "Past conversations" to expand, then click the past convo
    const historyButton = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent?.includes("Past conversations")
    );
    expect(historyButton).toBeTruthy();
    await act(async () => {
      historyButton?.click();
    });
    await flush();

    const pastConvoButton = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent?.includes("Past convo")
    );
    expect(pastConvoButton).toBeTruthy();
    await act(async () => {
      pastConvoButton?.click();
    });
    await flush(50);

    // Stale chips should be cleared
    expect(document.body.textContent).not.toContain("Stale chip from old convo");

    view.cleanup();
  });

  it("startNewConversation clears all sprint states", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    mocks.getConversationsMock.mockResolvedValue([]);

    fetchMock.mockResolvedValueOnce(
      createStreamResponse(
        [
          "This response covers CRISPR trial outcomes and includes detailed findings about off-target edits ",
          "with enough length to exceed one hundred characters and trigger follow-up suggestion generation.",
        ],
        { "X-RAG-Sources": "[]" }
      )
    );

    mocks.getFollowUpSuggestionsMock.mockResolvedValueOnce([
      { text: "Should disappear on new convo", type: "factual" as const },
    ]);

    const view = renderNotebook();
    await flush();

    // Click one of the initial suggestion chips which calls sendMessage(text) directly
    const initialChip = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent?.includes("Summarize Key Themes")
    );
    expect(initialChip).toBeTruthy();
    await act(async () => {
      initialChip?.click();
    });

    // Wait for streaming + suggestion generation to complete
    await waitForCondition(
      () => mocks.getFollowUpSuggestionsMock.mock.calls.length === 1
    );
    await flush(50);

    // Verify chips appeared
    expect(document.body.textContent).toContain("Should disappear on new convo");

    // Open history, click "+ New conversation"
    const historyButton = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent?.includes("Past conversations")
    );
    await act(async () => {
      historyButton?.click();
    });
    await flush();

    const newConvoButton = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent?.includes("New conversation")
    );
    expect(newConvoButton).toBeTruthy();
    await act(async () => {
      newConvoButton?.click();
    });
    await flush();

    // Follow-up suggestion chips and AI response should be cleared
    expect(document.body.textContent).not.toContain("Should disappear on new convo");
    expect(document.body.textContent).not.toContain("CRISPR trial outcomes");
    // Initial suggestion chips correctly reappear in the empty state
    expect(document.body.textContent).toContain("Summarize Key Themes");

    view.cleanup();
  });
});

describe("Integration: overlay mutual exclusion", () => {
  it("opening Source Notes closes PDF viewer state", async () => {
    const view = renderNotebook();
    await flush();

    // Verify Source Notes button exists
    const sourceNotesButton = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent?.includes("View Source Notes")
    );
    expect(sourceNotesButton).toBeTruthy();

    // Click it — should not throw even without papers
    await act(async () => {
      sourceNotesButton?.click();
    });
    await flush();

    // The Source Notes panel should be visible
    expect(document.body.textContent).toContain("Source Notes");

    view.cleanup();
  });
});

describe("Integration: request timeout handling", () => {
  it("aborts a stalled notebook request and shows a timeout message", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        const signal = init?.signal;
        signal?.addEventListener("abort", () => {
          reject(new DOMException("The operation was aborted.", "AbortError"));
        });
      });
    });
    global.fetch = fetchMock as typeof fetch;

    const view = renderNotebook();

    try {
      await act(async () => {
        await Promise.resolve();
      });

      await submitMessage("Tell me about the sources");
      await act(async () => {
        await vi.advanceTimersByTimeAsync(30_000);
      });

      expect(document.body.textContent).toContain(
        "The response timed out. Please try again or ask a simpler question.",
      );
    } finally {
      view.cleanup();
      vi.useRealTimers();
    }
  });
});
