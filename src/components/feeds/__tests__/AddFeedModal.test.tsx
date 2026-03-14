// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AddFeedModal } from "../add-feed-modal";

const subscribeMock = vi.hoisted(() => vi.fn());
const subscribePubMedMock = vi.hoisted(() => vi.fn());

vi.mock("@/stores/feed-store", () => ({
  useFeedStore: (selector: (state: { subscribe: typeof subscribeMock; subscribePubMed: typeof subscribePubMedMock }) => unknown) =>
    selector({ subscribe: subscribeMock, subscribePubMed: subscribePubMedMock }),
}));

vi.mock("@/components/ui/modal", () => ({
  Modal: ({ open, title, children }: { open: boolean; title: string; children: React.ReactNode }) =>
    open ? (
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    ) : null,
}));

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ tabs, activeTab, onChange }: { tabs: Array<{ key: string; label: string }>; activeTab: string; onChange: (tab: string) => void }) => (
    <div>
      {tabs.map((tab) => (
        <button key={tab.key} data-active={activeTab === tab.key} onClick={() => onChange(tab.key)}>
          {tab.label}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("@/components/feeds/journal-browser", () => ({
  JournalBrowser: () => <div>Journal Browser Content</div>,
}));

describe("AddFeedModal", () => {
  let container: HTMLDivElement;
  let root: Root;
  const onClose = vi.fn();

  beforeEach(() => {
    subscribeMock.mockReset();
    subscribePubMedMock.mockReset();
    onClose.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function setInputValue(input: HTMLInputElement, value: string) {
    const valueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    )?.set;
    valueSetter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  it("renders modal and disables add button initially", () => {
    act(() => root.render(<AddFeedModal open onClose={onClose} />));
    expect(container.textContent).toContain("Add Feed");
    const addButton = Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "Add");
    expect(addButton?.hasAttribute("disabled")).toBe(true);
  });

  it("subscribes by URL and closes modal", async () => {
    subscribeMock.mockResolvedValue(undefined);
    act(() => root.render(<AddFeedModal open onClose={onClose} />));

    const input = container.querySelector('input[type="url"]') as HTMLInputElement;
    await act(async () => {
      setInputValue(input, "https://example.com/feed.xml");
    });

    const addButton = Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "Add")!;
    await act(async () => {
      addButton.click();
    });

    expect(subscribeMock).toHaveBeenCalledWith("https://example.com/feed.xml");
    expect(onClose).toHaveBeenCalled();
  });

  it("shows error and can switch to browse tab", async () => {
    subscribeMock.mockRejectedValue(new Error("Invalid feed"));
    act(() => root.render(<AddFeedModal open onClose={onClose} />));

    const input = container.querySelector('input[type="url"]') as HTMLInputElement;
    await act(async () => {
      setInputValue(input, "https://bad.example");
    });
    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "Add")?.click();
    });

    expect(container.textContent).toContain("Invalid feed");

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "Browse Journals")?.click();
    });
    expect(container.textContent).toContain("Journal Browser Content");
  });

  it("subscribes using PubMed query", async () => {
    subscribePubMedMock.mockResolvedValue(undefined);
    act(() => root.render(<AddFeedModal open onClose={onClose} />));

    const inputs = Array.from(container.querySelectorAll("input")) as HTMLInputElement[];
    const pubmedInput = inputs.find((i) => i.type === "text")!;
    await act(async () => {
      setInputValue(pubmedInput, "oncology AND trial");
    });

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "Create Feed")?.click();
    });

    expect(subscribePubMedMock).toHaveBeenCalledWith("oncology AND trial");
    expect(onClose).toHaveBeenCalled();
  });

});
