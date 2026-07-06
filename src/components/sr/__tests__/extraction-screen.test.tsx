// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExtractionScreen } from "../extraction/extraction-screen";
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

describe("ExtractionScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<ExtractionScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders the consensus grid with Final / Reviewer 1 / Reviewer 2 columns", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Final decision");
    expect(text).toContain("Reviewer 1");
    expect(text).toContain("Reviewer 2");
    expect(text).toContain("Study ID");
    expect(text).toContain("Sample size");
  });

  it("shows the PDF pane as the source for the Final column", () => {
    expect(container.querySelector(".pdfpane")).not.toBeNull();
  });

  it("counts conflicts and marks conflicting Final cells decision-required", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("3 conflicts to resolve");
    expect(text).toContain("Decision required");
  });

  it("shows a source-quote chip on AI-filled Final cells", () => {
    expect(container.querySelector(".vchip")).not.toBeNull();
  });

  it("shows the Not reported designed state, never a blank", () => {
    expect(container.querySelector(".nr")?.textContent).toContain(
      "Not reported",
    );
  });

  it("clicking a source chip reveals the source passage", () => {
    const chip = container.querySelector(".vchip") as HTMLElement;
    act(() => {
      chip.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.textContent).toMatch(/EMPEROR-Preserved \(Empagliflozin/);
  });

  it("resolving a conflict cell drops the conflict count", () => {
    const decisionCell = Array.from(
      container.querySelectorAll(".ctr.conflict"),
    )[0];
    const resolveBtn = decisionCell?.querySelector(
      "button",
    ) as HTMLButtonElement;
    act(() => {
      resolveBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // Picking reviewer 1's value resolves it.
    const pick = Array.from(container.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("5,988"),
    );
    act(() => {
      pick?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.textContent).toContain("2 conflicts to resolve");
  });

  it("toggles between comfortable and compact density", () => {
    const compact = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "Compact",
    );
    act(() => {
      compact?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector(".cgrid.compact")).not.toBeNull();
  });
});
