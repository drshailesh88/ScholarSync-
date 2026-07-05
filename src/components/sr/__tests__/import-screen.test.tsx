// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImportScreen } from "../import/import-screen";
import { useSrStore } from "@/stores/sr-store";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

function click(el: Element | null | undefined) {
  act(() => {
    el?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

describe("ImportScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<ImportScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function findButton(text: string, scope: ParentNode = container) {
    return Array.from(scope.querySelectorAll("button")).find((el) =>
      el.textContent?.includes(text),
    );
  }

  it("renders the import ledger with one reversible card per batch", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Import history");
    expect(text).toContain("24 total duplicates removed");
    expect(text).toContain("PubMed");
    expect(text).toContain("Embase, +2");
    expect(text).toContain("Added via AI search");
    expect(text).toContain("214");
  });

  it("states that there is no search builder — results arrive, deduped", () => {
    expect(container.textContent).toContain("no search-strategy builder");
  });

  it("queues uncertain duplicates pairwise with what matched", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Possible duplicate");
    expect(text).toContain("Matched on title + year + first author");
    expect(text).toContain("DAPA-HF");
  });

  it("merges a duplicate: card leaves the queue and the totals move", () => {
    const dupeCard = Array.from(container.querySelectorAll(".dupe")).find(
      (el) => el.textContent?.includes("DAPA-HF"),
    );
    click(findButton("Merge", dupeCard));

    expect(container.textContent).toContain("25 total duplicates removed");
    const remaining = container.querySelectorAll(".dupe");
    expect(remaining).toHaveLength(1);
  });

  it("keeps a record on Not a duplicate without counting it as removed", () => {
    const dupeCard = container.querySelector(".dupe");
    click(findButton("Not a duplicate", dupeCard ?? undefined));

    expect(container.textContent).toContain("24 total duplicates removed");
    expect(container.querySelectorAll(".dupe")).toHaveLength(1);
  });

  it("shows the all-clear once the duplicate queue is empty", () => {
    for (const label of ["Merge", "Merge"]) {
      click(findButton(label, container.querySelector(".dupe") ?? undefined));
    }
    expect(container.textContent).toContain("No uncertain duplicates");
  });

  it("undoes an import batch and drops its references", () => {
    click(findButton("Undo import",
      Array.from(container.querySelectorAll(".lcard")).find((el) =>
        el.textContent?.includes("AI search"),
      ),
    ));
    expect(container.textContent).not.toContain("Added via AI search");
    expect(container.textContent).toContain("20 total duplicates removed");
  });
});
