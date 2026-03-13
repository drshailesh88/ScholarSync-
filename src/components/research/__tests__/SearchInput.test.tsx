// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchInput } from "../SearchInput";

vi.mock("../FilterPanel", () => ({
  FilterPanel: () => <div>filter-panel</div>,
}));

describe("SearchInput", () => {
  let container: HTMLDivElement;
  let root: Root;

  const onQueryChange = vi.fn();
  const onFiltersChange = vi.fn();
  const onRemoveChip = vi.fn();
  const onSearch = vi.fn();

  const baseProps = {
    query: "gene therapy",
    onQueryChange,
    filters: {},
    onFiltersChange,
    parsedChips: [{ label: "year:2020+" }],
    onRemoveChip,
    onSearch,
    isSearching: false,
  };

  beforeEach(() => {
    onQueryChange.mockReset();
    onFiltersChange.mockReset();
    onRemoveChip.mockReset();
    onSearch.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders input and parsed chips", () => {
    act(() => {
      root.render(<SearchInput {...baseProps} />);
    });

    expect(container.textContent).toContain("year:2020+");
    expect(container.textContent).toContain("Search");
  });

  it("triggers query updates and search action", async () => {
    act(() => {
      root.render(<SearchInput {...baseProps} />);
    });

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;

    await act(async () => {
      setter?.call(textarea, "new query");
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.dispatchEvent(new Event("change", { bubbles: true }));
      textarea.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });

    expect(onQueryChange).toHaveBeenCalledWith("new query");
    expect(onSearch).toHaveBeenCalled();
  });

  it("shows loading label and toggles filter panel", async () => {
    act(() => {
      root.render(<SearchInput {...baseProps} isSearching />);
    });

    expect(container.textContent).toContain("Searching...");

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes("Filters"))?.click();
    });

    expect(container.textContent).toContain("filter-panel");
  });
});
