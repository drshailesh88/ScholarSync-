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

const mocks = vi.hoisted(() => ({
  createConversationMock: vi.fn(async () => ({ id: 1 })),
  addMessageMock: vi.fn(async () => undefined),
  getConversationsMock: vi.fn(async () => []),
  getConversationMock: vi.fn(async () => null),
  updateConversationPaperIdsMock: vi.fn(async () => undefined),
  getUserPapersMock: vi.fn(async () => []),
  savePaperMock: vi.fn(async () => 1),
  getExtractionForPaperMock: vi.fn(async () => null),
  verifyExtractionMock: vi.fn(async () => undefined),
  extractUploadedPdfMock: vi.fn(async () => ({ chunksCreated: 1 })),
  getFollowUpSuggestionsMock: vi.fn<
    (params: {
      responseText: string;
      sourceTitles: string[];
      userQuery: string;
      mode: "research" | "learn";
    }) => Promise<Array<{ text: string; type: "factual" | "comparative" | "analytical" | "applied" }>>
  >(),
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

interface RenderResult {
  root: Root;
  host: HTMLDivElement;
  cleanup: () => void;
}

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

let consoleErrorSpy: ReturnType<typeof vi.spyOn> | null = null;

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

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

  return new Response(stream, {
    status: 200,
    headers,
  });
}

function createControlledStreamResponse(): {
  response: Response;
  push: (chunk: string) => void;
  close: () => void;
} {
  const encoder = new TextEncoder();
  let controllerRef: ReadableStreamDefaultController<Uint8Array> | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller;
    },
  });

  return {
    response: new Response(stream, { status: 200 }),
    push: (chunk: string) => {
      controllerRef?.enqueue(encoder.encode(chunk));
    },
    close: () => {
      controllerRef?.close();
    },
  };
}

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
      act(() => {
        root.unmount();
      });
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
  if (!form) {
    throw new Error("Chat form not found");
  }
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
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = true;

  if (!Element.prototype.scrollIntoView) {
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      value: () => undefined,
      writable: true,
    });
  }
});

afterAll(() => {
  (
    globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    }
  ).IS_REACT_ACT_ENVIRONMENT = false;
});

beforeEach(() => {
  vi.clearAllMocks();
  const originalConsoleError = console.error;
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string" && first.includes("not wrapped in act")) {
      return;
    }
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

describe("Notebook follow-up suggestion chips", () => {
  it("renders chips after streaming completes and sends chip text on click", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    fetchMock.mockResolvedValueOnce(
      createStreamResponse(
        [
          "This response covers CRISPR trial outcomes and includes detailed findings ",
          "about off-target edits with enough length to exceed one hundred characters.",
        ],
        { "X-RAG-Sources": "[]" }
      )
    );
    fetchMock.mockResolvedValueOnce(
      createStreamResponse(
        [
          "Second answer explains why off-target mutations differ by delivery method ",
          "and remains long enough to exceed one hundred characters for suggestions.",
        ],
        { "X-RAG-Sources": "[]" }
      )
    );

    const firstSuggestions = deferred<
      Array<{ text: string; type: "factual" | "comparative" | "analytical" | "applied" }>
    >();
    const secondSuggestions = deferred<
      Array<{ text: string; type: "factual" | "comparative" | "analytical" | "applied" }>
    >();
    mocks.getFollowUpSuggestionsMock
      .mockReturnValueOnce(firstSuggestions.promise)
      .mockReturnValueOnce(secondSuggestions.promise);

    const view = renderNotebook();
    await flush();

    await submitMessage("What are the main findings?");
    await waitForCondition(() => mocks.getFollowUpSuggestionsMock.mock.calls.length === 1);
    await act(async () => {
      firstSuggestions.resolve([
        { text: "Probe off-target edits by delivery method", type: "analytical" },
        { text: "Compare CRISPR outcomes across cohorts", type: "comparative" },
        { text: "What limitation most weakens this evidence?", type: "applied" },
      ]);
      await firstSuggestions.promise;
    });
    await waitForCondition(() =>
      document.body.textContent?.includes("Probe off-target edits by delivery method") === true
    );

    const firstChip = Array.from(document.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("Probe off-target edits by delivery method")
    );
    expect(firstChip).toBeTruthy();
    expect(firstChip?.className).toContain("rounded-full");

    await act(async () => {
      firstChip?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Old chips should clear immediately on new send.
    const oldChipStillVisible = Array.from(document.querySelectorAll("button")).some(
      (btn) => btn.textContent?.includes("Probe off-target edits by delivery method") === true
    );
    expect(oldChipStillVisible).toBe(false);
    expect(document.body.textContent).toContain("Probe off-target edits by delivery method");

    await waitForCondition(() => mocks.getFollowUpSuggestionsMock.mock.calls.length === 2);
    await act(async () => {
      secondSuggestions.resolve([
        { text: "How would you test that mutation pathway?", type: "analytical" },
        { text: "What assumption in this model is weakest?", type: "applied" },
        { text: "Compare in vivo and in vitro error profiles", type: "comparative" },
      ]);
      await secondSuggestions.promise;
    });
    await waitForCondition(() =>
      document.body.textContent?.includes("How would you test that mutation pathway?") === true
    );
    const firstTurnChipStillVisible = Array.from(document.querySelectorAll("button")).some(
      (btn) => btn.textContent?.includes("Compare CRISPR outcomes across cohorts") === true
    );
    expect(firstTurnChipStillVisible).toBe(false);
    expect(mocks.addMessageMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(2);

    view.cleanup();
  });

  it("hides chips while streaming and skips generation for short responses", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    const controlled = createControlledStreamResponse();
    fetchMock.mockResolvedValueOnce(controlled.response);

    const view = renderNotebook();
    await flush();

    const suggestionsDeferred = deferred<
      Array<{ text: string; type: "factual" | "comparative" | "analytical" | "applied" }>
    >();
    mocks.getFollowUpSuggestionsMock.mockReturnValueOnce(suggestionsDeferred.promise);

    await submitMessage("Explain the findings in depth");
    await flush();

    // While stream is active, no suggestion chips should render.
    expect(document.querySelector("button[class*='rounded-full']")).toBeNull();
    expect(document.querySelector("span[class*='animation-delay:100ms']")).toBeNull();

    await act(async () => {
      controlled.push(
        "Long streaming response about randomized trial methods and subgroup outcomes that is over one hundred characters."
      );
      controlled.close();
    });

    await waitForCondition(() => mocks.getFollowUpSuggestionsMock.mock.calls.length === 1);
    await act(async () => {
      suggestionsDeferred.resolve([
        { text: "Compare subgroup outcome uncertainty", type: "comparative" },
        { text: "Which confounder is most likely here?", type: "analytical" },
        { text: "How would practice change with null effect?", type: "applied" },
      ]);
      await suggestionsDeferred.promise;
    });
    await flush(20);
    expect(document.body.textContent).toContain("Compare subgroup outcome uncertainty");

    // Next response is short; suggestions should not trigger.
    fetchMock.mockResolvedValueOnce(createStreamResponse(["Too short."], { "X-RAG-Sources": "[]" }));
    await submitMessage("ok");
    await flush(20);

    expect(mocks.getFollowUpSuggestionsMock).toHaveBeenCalledTimes(1);
    expect(document.querySelector("span[class*='animation-delay:100ms']")).toBeNull();

    view.cleanup();
  });

  it("gracefully handles suggestion generation failures", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    fetchMock.mockResolvedValueOnce(
      createStreamResponse([
        "Long response that exceeds one hundred characters and should trigger suggestion generation even if it fails downstream.",
      ])
    );

    mocks.getFollowUpSuggestionsMock.mockRejectedValueOnce(new Error("provider unavailable"));

    const view = renderNotebook();
    await flush();
    await submitMessage("Trigger failure path");
    await waitForCondition(() => mocks.getFollowUpSuggestionsMock.mock.calls.length === 1);
    await flush(30);

    expect(document.querySelector("button[class*='rounded-full'][class*='text-xs']")).toBeNull();
    expect(document.body.textContent).toContain("Long response that exceeds one hundred characters");

    view.cleanup();
  });

  it("prevents stale suggestion races and sends learn mode to generator", async () => {
    const fetchMock = vi.fn();
    global.fetch = fetchMock as typeof fetch;

    fetchMock.mockResolvedValueOnce(
      createStreamResponse([
        "First long response about paper A and B with detailed effect-size discussion that exceeds one hundred chars.",
      ])
    );
    fetchMock.mockResolvedValueOnce(
      createStreamResponse([
        "Second long response focuses on methodology caveats and still exceeds one hundred chars for generation.",
      ])
    );

    const firstDeferred = deferred<
      Array<{ text: string; type: "factual" | "comparative" | "analytical" | "applied" }>
    >();
    const secondDeferred = deferred<
      Array<{ text: string; type: "factual" | "comparative" | "analytical" | "applied" }>
    >();

    mocks.getFollowUpSuggestionsMock
      .mockReturnValueOnce(firstDeferred.promise)
      .mockReturnValueOnce(secondDeferred.promise);

    const view = renderNotebook();
    await flush();

    const learnButton = Array.from(document.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("Learn")
    );
    expect(learnButton).toBeTruthy();
    await act(async () => {
      learnButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await submitMessage("Teach me the key idea");
    await waitForCondition(() => mocks.getFollowUpSuggestionsMock.mock.calls.length === 1);
    expect(mocks.getFollowUpSuggestionsMock.mock.calls[0][0]?.mode).toBe("learn");

    // Send second message before first suggestion call resolves.
    await submitMessage("What assumptions underlie this?");
    await waitForCondition(() => mocks.getFollowUpSuggestionsMock.mock.calls.length === 2);

    await act(async () => {
      firstDeferred.resolve([
        { text: "Stale suggestion should not render", type: "factual" },
        { text: "Stale suggestion 2", type: "analytical" },
        { text: "Stale suggestion 3", type: "applied" },
      ]);
      await firstDeferred.promise;
    });
    await flush(20);
    expect(document.body.textContent).not.toContain("Stale suggestion should not render");

    await act(async () => {
      secondDeferred.resolve([
        { text: "Why do you think this bias appears?", type: "analytical" },
        { text: "How would you test that assumption?", type: "applied" },
        { text: "What if the sample were doubled?", type: "comparative" },
      ]);
      await secondDeferred.promise;
    });
    await waitForCondition(() =>
      document.body.textContent?.includes("Why do you think this bias appears?") === true
    );

    view.cleanup();
  });
});
