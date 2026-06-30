// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/actions/scopes", () => ({
  getUserScopes: vi.fn().mockResolvedValue([]),
}));

import { ExplorePageClient } from "../ExplorePageClient";

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("ExplorePageClient", () => {
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

  it("keeps the landing state minimal and fetches all source tabs on search", async () => {
    fetchMock.mockImplementation((input: string) => {
      const url = new URL(input, "http://localhost");
      const tab = url.searchParams.get("tab");

      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              title: `${tab} result`,
              authors: [],
              journal: tab === "academic" ? "The Lancet" : "Source",
              year: 2026,
              abstract: `Snippet for ${tab}`,
              citationCount: 0,
              publicationTypes: [tab],
              isOpenAccess: tab === "academic",
              sources: [tab],
            },
          ],
          total: 1,
          page: 0,
          perPage: 10,
          hasMore: false,
          sourceCounts: { [tab ?? "academic"]: 1 },
          searxngUnavailable: false,
        }),
      });
    });

    act(() => {
      root.render(<ExplorePageClient />);
    });

    expect(container.textContent).not.toContain("Academic");

    const input = container.querySelector('input[type="search"]') as HTMLInputElement;
    const submitButton = container.querySelector('button[aria-label="Search Explore"]') as HTMLButtonElement;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;

    await act(async () => {
      setter?.call(input, "climate change");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      submitButton.click();
      await flushPromises();
    });

    // One parallel fetch per searchable tab: academic, web, news, discussions, videos.
    expect(fetchMock).toHaveBeenCalledTimes(5);
    expect(container.textContent).toContain("Academic");
    expect(container.textContent).toContain("academic result");
    expect(container.textContent).toContain("1 results in");
  });

  it("switches tabs without refetching the initial page", async () => {
    fetchMock.mockImplementation((input: string) => {
      const url = new URL(input, "http://localhost");
      const tab = url.searchParams.get("tab") ?? "academic";

      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              title: `${tab} result`,
              authors: [],
              journal: tab === "news" ? "Reuters" : "Source",
              year: 2026,
              publishedAt: "2026-03-31T09:00:00Z",
              abstract: `Snippet for ${tab}`,
              citationCount: 0,
              publicationTypes: [tab],
              isOpenAccess: false,
              sources: [tab],
              sourceLabel: tab === "news" ? "Reuters" : "Source",
            },
          ],
          total: 1,
          page: 0,
          perPage: 10,
          hasMore: false,
          sourceCounts: { [tab]: 1 },
          searxngUnavailable: false,
        }),
      });
    });

    act(() => {
      root.render(<ExplorePageClient />);
    });

    const input = container.querySelector('input[type="search"]') as HTMLInputElement;
    const submitButton = container.querySelector('button[aria-label="Search Explore"]') as HTMLButtonElement;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;

    await act(async () => {
      setter?.call(input, "heart failure");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      submitButton.click();
      await flushPromises();
    });

    const initialCalls = fetchMock.mock.calls.length;
    const newsTab = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "News"
    ) as HTMLButtonElement;

    await act(async () => {
      newsTab.click();
      await flushPromises();
    });

    expect(fetchMock).toHaveBeenCalledTimes(initialCalls);
    expect(container.textContent).toContain("news result");
  });

  it("fetches uncached pagination pages and reuses cached ones", async () => {
    fetchMock.mockImplementation((input: string) => {
      const url = new URL(input, "http://localhost");
      const tab = url.searchParams.get("tab") ?? "academic";
      const page = Number(url.searchParams.get("page") ?? "0");

      return Promise.resolve({
        ok: true,
        json: async () => ({
          results: [
            {
              title: `${tab} page ${page + 1}`,
              authors: [],
              journal: "The Lancet",
              year: 2026,
              abstract: `Snippet for page ${page + 1}`,
              citationCount: 0,
              publicationTypes: [tab],
              isOpenAccess: true,
              sources: [tab],
            },
          ],
          total: 25,
          page,
          perPage: 10,
          hasMore: page < 2,
          sourceCounts: { [tab]: 25 },
          searxngUnavailable: false,
        }),
      });
    });

    act(() => {
      root.render(<ExplorePageClient />);
    });

    const input = container.querySelector('input[type="search"]') as HTMLInputElement;
    const submitButton = container.querySelector('button[aria-label="Search Explore"]') as HTMLButtonElement;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;

    await act(async () => {
      setter?.call(input, "gene editing");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      submitButton.click();
      await flushPromises();
    });

    const nextButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent?.includes("Next")
    ) as HTMLButtonElement;
    const previousButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent?.includes("Previous")
    ) as HTMLButtonElement;

    await act(async () => {
      nextButton.click();
      await flushPromises();
    });

    expect(container.textContent).toContain("academic page 2");
    const afterPageTwoCalls = fetchMock.mock.calls.length;

    await act(async () => {
      previousButton.click();
      await flushPromises();
    });

    await act(async () => {
      nextButton.click();
      await flushPromises();
    });

    expect(fetchMock).toHaveBeenCalledTimes(afterPageTwoCalls);
    expect(container.textContent).toContain("academic page 2");
  });
});
