// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SynthesisBlock } from "../SynthesisBlock";
import type { UnifiedSearchResult } from "@/types/search";

function makeResult(
  overrides: Partial<UnifiedSearchResult> = {}
): UnifiedSearchResult {
  return {
    title: "Example Source",
    authors: ["Smith J", "Chen A"],
    journal: "Nature",
    year: 2026,
    abstract: "A test abstract.",
    citationCount: 10,
    publicationTypes: ["article"],
    isOpenAccess: true,
    sources: ["pubmed"],
    trustTier: "government",
    url: "https://example.gov/paper",
    domain: "example.gov",
    ...overrides,
  };
}

function makeResults(count: number): UnifiedSearchResult[] {
  const tiers: Array<UnifiedSearchResult["trustTier"]> = [
    "government",
    "major_journalism",
    "community",
    "other",
  ];
  return Array.from({ length: count }, (_, i) =>
    makeResult({
      title: `Source ${i + 1}`,
      authors: [`Author${i + 1}`],
      trustTier: tiers[i % tiers.length],
      url: `https://example${i}.com/page`,
      domain: `example${i}.com`,
    })
  );
}

function createStreamResponse(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Stream in chunks
      const words = text.split(" ");
      let accumulated = "";
      for (const word of words) {
        accumulated += (accumulated ? " " : "") + word;
        controller.enqueue(encoder.encode(word + " "));
      }
      controller.close();
    },
  });

  return {
    ok: true,
    body: stream,
    headers: new Headers({ "Content-Type": "text/plain" }),
  };
}

describe("SynthesisBlock", () => {
  let container: HTMLDivElement;
  let root: Root;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("does not render when isOpen is false", () => {
    act(() => {
      root.render(
        <SynthesisBlock
          isOpen={false}
          onClose={vi.fn()}
          query="climate change"
          results={makeResults(5)}
          tab="web"
        />
      );
    });

    expect(container.querySelector("[data-testid='synthesis-block']")).toBeNull();
  });

  it("renders skeleton while streaming", async () => {
    // Stall the fetch so we can observe the loading state
    fetchMock.mockReturnValue(new Promise(() => {})); // never resolves

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="climate change"
          results={makeResults(5)}
          tab="web"
        />
      );
    });

    expect(
      container.querySelector("[data-testid='synthesis-block']")
    ).not.toBeNull();
    expect(
      container.querySelector("[data-testid='synthesis-skeleton']")
    ).not.toBeNull();
  });

  it("streams synthesis text and renders it", async () => {
    const streamText = "Climate change is [1] accelerating according to [2] recent studies.";
    fetchMock.mockResolvedValue(createStreamResponse(streamText));

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="climate change"
          results={makeResults(5)}
          tab="web"
        />
      );
    });

    // Wait for streaming to complete
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const content = container.querySelector(
      "[data-testid='synthesis-content']"
    );
    expect(content).not.toBeNull();
    expect(content!.textContent).toContain("Climate change");
    expect(content!.textContent).toContain("accelerating");
  });

  it("renders citation markers colored by trust tier", async () => {
    const streamText = "Government data [1] and journalism [2] agree.";
    fetchMock.mockResolvedValue(createStreamResponse(streamText));

    const results = makeResults(5);

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="test"
          results={results}
          tab="web"
        />
      );
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const citation1 = container.querySelector(
      "[data-testid='citation-marker-1']"
    );
    const citation2 = container.querySelector(
      "[data-testid='citation-marker-2']"
    );

    expect(citation1).not.toBeNull();
    expect(citation2).not.toBeNull();

    // Citation markers are buttons (verifying they exist as interactive elements)
    expect(citation1!.tagName).toBe("BUTTON");
    expect(citation2!.tagName).toBe("BUTTON");

    // Citation 1 text shows [1], citation 2 shows [2]
    expect(citation1!.textContent).toBe("[1]");
    expect(citation2!.textContent).toBe("[2]");

    // Both citations have title attributes linking to their respective sources
    expect(citation1!.getAttribute("title")).toContain("Source 1");
    expect(citation2!.getAttribute("title")).toContain("Source 2");
  });

  it("citation markers are clickable buttons that scroll to results", async () => {
    const streamText = "Source [1] confirms this.";
    fetchMock.mockResolvedValue(createStreamResponse(streamText));

    // Create a target element that citation would scroll to
    const targetEl = document.createElement("div");
    targetEl.id = "explore-result-0";
    targetEl.scrollIntoView = vi.fn();
    document.body.appendChild(targetEl);

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="test"
          results={makeResults(3)}
          tab="web"
        />
      );
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    const citation = container.querySelector(
      "[data-testid='citation-marker-1']"
    ) as HTMLButtonElement;
    expect(citation).not.toBeNull();
    expect(citation.tagName).toBe("BUTTON");

    act(() => {
      citation.click();
    });

    expect(targetEl.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "center",
    });

    targetEl.remove();
  });

  it("collapses and expands via toggle button", async () => {
    const streamText = "Synthesis complete.";
    fetchMock.mockResolvedValue(createStreamResponse(streamText));

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="test"
          results={makeResults(3)}
          tab="web"
        />
      );
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Content should be visible
    expect(
      container.querySelector("[data-testid='synthesis-content']")
    ).not.toBeNull();

    // Click collapse toggle
    const collapseBtn = container.querySelector(
      "[data-testid='synthesis-collapse-toggle']"
    ) as HTMLButtonElement;
    expect(collapseBtn).not.toBeNull();

    act(() => {
      collapseBtn.click();
    });

    // Content should be hidden
    expect(
      container.querySelector("[data-testid='synthesis-content']")
    ).toBeNull();

    // Click expand toggle
    const expandBtn = container.querySelector(
      "[data-testid='synthesis-collapse-toggle']"
    ) as HTMLButtonElement;
    act(() => {
      expandBtn.click();
    });

    // Content should be visible again
    expect(
      container.querySelector("[data-testid='synthesis-content']")
    ).not.toBeNull();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    fetchMock.mockResolvedValue(createStreamResponse("Some synthesis."));

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={onClose}
          query="test"
          results={makeResults(3)}
          tab="web"
        />
      );
    });

    const closeBtn = container.querySelector(
      "[data-testid='synthesis-close']"
    ) as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();

    act(() => {
      closeBtn.click();
    });

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("sends correct payload to /api/explore/synthesize", async () => {
    fetchMock.mockResolvedValue(createStreamResponse("Result."));

    const results = makeResults(3);

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="machine learning"
          results={results}
          tab="academic"
        />
      );
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/explore/synthesize",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );

    const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(callBody.query).toBe("machine learning");
    expect(callBody.sources).toHaveLength(3);
    expect(callBody.sources[0].title).toBe("Source 1");
    expect(callBody.sources[0].trustTier).toBe("government");
  });

  it("shows error message when fetch fails", async () => {
    fetchMock.mockResolvedValue({ ok: false, body: null });

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="test"
          results={makeResults(3)}
          tab="web"
        />
      );
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(container.textContent).toContain(
      "Synthesis could not be generated"
    );
  });

  it("shows header indicating source count and tab", async () => {
    fetchMock.mockReturnValue(new Promise(() => {}));

    await act(async () => {
      root.render(
        <SynthesisBlock
          isOpen={true}
          onClose={vi.fn()}
          query="test"
          results={makeResults(5)}
          tab="news"
        />
      );
    });

    expect(container.textContent).toContain("top 5 news results");
  });
});
