// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FullTextScreen } from "../fulltext/fulltext-screen";
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

function byText(text: string, selector = "button") {
  return Array.from(document.querySelectorAll(selector)).find((el) =>
    el.textContent?.includes(text),
  ) as HTMLElement | undefined;
}

function click(el: Element | null | undefined) {
  act(() => {
    el?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

describe("FullTextScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<FullTextScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("shows the full-text queue tabs and the eligibility checklist", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("To screen");
    expect(text).toContain("Excluded");
    expect(text).toContain("Eligibility checklist");
    expect(text).toContain("DAPA-HF");
  });

  it("offers binary Include / Exclude, not the No/Maybe/Yes triad", () => {
    expect(byText("Include", ".vote")).toBeTruthy();
    expect(byText("Exclude", ".vote")).toBeTruthy();
    expect(container.querySelector(".vote.maybe")).toBeNull();
  });

  it("blocks Exclude until a structured reason is chosen", () => {
    const firstTitle = container.querySelector(".reftitle")?.textContent;
    // Clicking Exclude with no reason must not record or advance.
    click(byText("Exclude", ".vote"));
    expect(container.querySelector(".reftitle")?.textContent).toBe(firstTitle);
    const dapa = useSrStore
      .getState()
      .review!.candidates.find((c) => c.refId === 1660)!;
    expect(
      dapa.fullText?.decisions.some((d) => d.reviewerId === "you"),
    ).toBeFalsy();
  });

  it("records an exclusion once a reason is selected", () => {
    const select = container.querySelector(
      "select",
    ) as HTMLSelectElement | null;
    expect(select).not.toBeNull();
    act(() => {
      select!.value = "wrong_outcome";
      select!.dispatchEvent(new Event("change", { bubbles: true }));
    });
    click(byText("Exclude", ".vote"));

    const dapa = useSrStore
      .getState()
      .review!.candidates.find((c) => c.refId === 1660)!;
    expect(dapa.fullText?.decisions).toContainEqual({
      reviewerId: "you",
      vote: "exclude",
      reasonCode: "wrong_outcome",
    });
  });

  it("records an include immediately, no reason needed, and advances", () => {
    const firstTitle = container.querySelector(".reftitle")?.textContent;
    click(byText("Include", ".vote"));
    const dapa = useSrStore
      .getState()
      .review!.candidates.find((c) => c.refId === 1660)!;
    expect(
      dapa.fullText?.decisions.some(
        (d) => d.reviewerId === "you" && d.vote === "include",
      ),
    ).toBe(true);
    expect(container.querySelector(".reftitle")?.textContent).not.toBe(
      firstTitle,
    );
  });
});
