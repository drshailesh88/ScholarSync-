// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScreeningScreen } from "../screening/screening-screen";
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

function key(k: string) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: k }));
  });
}

describe("ScreeningScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<ScreeningScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("shows the queue tabs with the reviewer's counts", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("To screen");
    expect(text).toContain("114");
    expect(text).toContain("Conflicts");
    expect(text).toContain("74");
    expect(text).toContain("Irrelevant");
  });

  it("renders the first study card with a highlighted abstract", () => {
    expect(container.textContent).toContain(
      "Empagliflozin in Heart Failure with a Preserved Ejection Fraction",
    );
    // Inclusion term highlighted Jade, exclusion Tomato.
    expect(container.querySelector(".hl-i")?.textContent).toContain(
      "SGLT2 inhibitors",
    );
    expect(container.querySelector(".hl-e")?.textContent).toContain(
      "eGFR below 20",
    );
  });

  it("presents the No/Maybe/Yes triad with the AI suggestion ringed, not selected", () => {
    const suggested = container.querySelector(".vote.suggested");
    expect(suggested?.className).toContain("yes");
    expect(container.querySelector(".vote.sel")).toBeNull();
    expect(container.textContent).toContain("AI suggests");
  });

  it("shows the AI inclusion score and per-criterion reasoning", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("4.9");
    expect(text).toContain("Population");
    expect(text).toContain("adults with HF");
    expect(text).toContain("system of record");
  });

  it("keeps reviewer 2's vote blinded until both submit", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Emma Reyes");
    expect(text).toContain("blinded until both submit");
    expect(text).not.toMatch(/Emma[\s\S]*voted:? (yes|no|maybe)/i);
  });

  it("casts a vote on Y and advances to the next study", () => {
    const firstTitle = container
      .querySelector(".reftitle")
      ?.textContent?.trim();
    key("y");

    // The store recorded the vote for the current reviewer.
    const anker = useSrStore
      .getState()
      .review!.candidates.find((c) => c.refId === 2241)!;
    expect(anker.ta.votes).toEqual([{ reviewerId: "you", vote: "yes" }]);

    // The queue advances — a different study is now on the card.
    const nextTitle = container.querySelector(".reftitle")?.textContent?.trim();
    expect(nextTitle).not.toBe(firstTitle);
  });

  it("supports N and M keys for exclude and maybe", () => {
    key("m");
    const anker = useSrStore
      .getState()
      .review!.candidates.find((c) => c.refId === 2241)!;
    expect(anker.ta.votes[0].vote).toBe("maybe");
  });

  it("shows the AI score-threshold slider and live tally (Elicit parity)", () => {
    const text = container.textContent ?? "";
    expect(text).toMatch(/score threshold/i);
    expect(text).toMatch(/evaluated/i);
    expect(text).toContain("388"); // evaluated
    expect(text).toContain("124"); // AI-suggested include at the default cut
    const slider = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement | null;
    expect(slider).not.toBeNull();
  });

  it("re-partitions the tally as the threshold slider moves", () => {
    const slider = container.querySelector(
      'input[type="range"]',
    ) as HTMLInputElement;
    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      )!.set!;
      setter.call(slider, "4.5");
      slider.dispatchEvent(new Event("input", { bubbles: true }));
    });
    // At 4.5 only the top-scoring exemplar clears the cut.
    expect(container.textContent).toContain("1 included");
  });

  it("keeps the human vote as the system of record even with the slider", () => {
    expect(container.textContent).toMatch(/system of record/i);
  });

  it("shows an all-caught-up state when nothing is left to screen", () => {
    // Vote through the whole queue.
    for (let i = 0; i < 114; i += 1) key("y");
    expect(container.textContent).toContain("caught up");
  });
});
