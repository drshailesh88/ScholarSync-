// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaScreen } from "../prisma/prisma-screen";
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

function byText(text: string) {
  return Array.from(document.querySelectorAll("button")).find((el) =>
    el.textContent?.includes(text),
  ) as HTMLElement | undefined;
}

describe("PrismaScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<PrismaScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders the auto-generated flow with the live counts", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("412");
    expect(text).toContain("388");
    expect(text).toContain("124");
    expect(text).toContain("12");
  });

  it("shows the side boxes for duplicates, irrelevant, excluded, and ongoing", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("24"); // duplicates removed
    expect(text).toContain("264"); // irrelevant at screening
    expect(text).toContain("23"); // full-text excluded with reasons
    expect(text).toContain("89"); // ongoing / awaiting classification
  });

  it("offers a PRISMA 2020 DOCX download", () => {
    expect(container.textContent).toMatch(/DOCX/);
  });

  it("drills into full-text exclusions by reason", () => {
    expect(container.textContent).not.toContain("Wrong population");
    act(() => {
      byText("Show reasons")?.dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });
    expect(container.textContent).toContain("Wrong population");
  });

  it("reflects live changes — a new full-text include lifts the included count", () => {
    // DAPA-HF (refId 1660) is a to-review study; two includes make 13 included.
    const dapa = useSrStore
      .getState()
      .review!.candidates.find((c) => c.refId === 1660)!;
    act(() => {
      useSrStore.getState().castFullTextVote(dapa.id, "you", "include");
      useSrStore.getState().castFullTextVote(dapa.id, "emma", "include");
    });
    expect(container.textContent).toContain("13");
  });
});
