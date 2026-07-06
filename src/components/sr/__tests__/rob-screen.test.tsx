// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RobScreen } from "../rob/rob-screen";
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

describe("RobScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<RobScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("lists studies to assess with their overall RoB judgment", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("EMPEROR-Preserved");
    expect(text).toContain("Some concerns");
    expect(text).toContain("Meta-analysis");
    expect(text).toContain("High");
  });

  it("shows the five RoB 2 domains as accordions for the selected study", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Randomisation process");
    expect(text).toContain("Deviations from intended intervention");
    expect(text).toContain("Missing outcome data");
    expect(text).toContain("Measurement of the outcome");
    expect(text).toContain("Selection of the reported result");
  });

  it("shows signalling questions and the AI justification with provenance", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Was the allocation sequence random?");
    expect(text).toContain("interactive web system");
    expect(text).toMatch(/AI|✦/);
  });

  it("selecting another study swaps the domain assessment", () => {
    const metaRow = Array.from(container.querySelectorAll(".sl")).find((el) =>
      el.textContent?.includes("Meta-analysis"),
    );
    act(() => {
      metaRow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // The header now reflects the meta-analysis and its High overall.
    const header = container.querySelector(".robhdr");
    expect(header?.textContent).toContain("High");
  });

  it("records a domain judgment via the signalling options", () => {
    const domain = container.querySelector(".robdomain");
    const option = Array.from(domain?.querySelectorAll(".opt") ?? []).find(
      (el) => el.textContent === "Probably yes",
    );
    act(() => {
      option?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(option?.className).toContain("sel");
  });
});
