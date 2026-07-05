// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ProtocolScreen } from "../protocol/protocol-screen";
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

function byText(text: string, sel = "button") {
  return Array.from(document.querySelectorAll(sel)).find((el) =>
    el.textContent?.includes(text),
  ) as HTMLElement | undefined;
}

describe("ProtocolScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(<ProtocolScreen reviewId="sglt2-hf" />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("shows the research question and AI-drafted PICO fields with a verify framing", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Population");
    expect(text).toContain("Intervention");
    expect(text).toContain("Comparator");
    expect(text).toContain("Outcome");
    expect(text).toContain("Study design");
    expect(text).toMatch(/Uses AI.*verify|verify/i);
    const rq = container.querySelector(
      "textarea, input",
    ) as HTMLTextAreaElement | null;
    expect(rq?.value).toContain("SGLT2");
  });

  function inputValues() {
    return Array.from(container.querySelectorAll("input")).map((i) => i.value);
  }
  function textareaValues() {
    return Array.from(container.querySelectorAll("textarea")).map(
      (t) => t.value,
    );
  }

  it("lists eligibility criteria with their instruction and answer structure", () => {
    expect(inputValues()).toContain("Adults with heart failure");
    expect(
      textareaValues().some((v) => v.includes("Include studies enrolling adults")),
    ).toBe(true);
    // Answer-structure control (Elicit column-as-a-question).
    expect(container.textContent).toContain("Yes / No / Maybe");
  });

  it("separates inclusion from exclusion criteria", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Inclusion");
    expect(text).toContain("Exclusion");
    expect(inputValues()).toContain("Conference abstract only");
  });

  it("edits a criterion instruction through the store", () => {
    const instr = Array.from(
      container.querySelectorAll("textarea"),
    ).find((t) => t.value.includes("Include studies enrolling adults"))!;
    act(() => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value",
      )!.set!;
      setter.call(instr, "Adults ≥18y with HF, any EF.");
      instr.dispatchEvent(new Event("input", { bubbles: true }));
    });
    const crit = useSrStore
      .getState()
      .review!.protocol.criteria.find((c) => c.id === "inc-population")!;
    expect(crit.instruction).toBe("Adults ≥18y with HF, any EF.");
  });

  it("adds a suggested criterion and reflects it in the list", () => {
    click(byText("Human participants"));
    const criteria = useSrStore.getState().review!.protocol.criteria;
    expect(criteria.some((c) => c.label === "Human participants")).toBe(true);
    expect(inputValues()).toContain("Human participants");
  });

  it("removes a criterion", () => {
    const egfrRow = Array.from(container.querySelectorAll(".critedit")).find(
      (el) =>
        (el.querySelector(".crit-name") as HTMLInputElement | null)?.value ===
        "eGFR <20 populations",
    );
    expect(egfrRow).toBeTruthy();
    click(egfrRow?.querySelector('[aria-label="Remove criterion"]'));
    expect(
      inputValues().includes("eGFR <20 populations"),
    ).toBe(false);
  });

  it("approves the protocol and shows it locked", () => {
    click(byText("Approve"));
    expect(useSrStore.getState().review!.protocol.status).toBe("approved");
    expect(container.textContent).toMatch(/Approved|Locked/);
  });

  it("shows a first-run empty protocol prompt for a new review", () => {
    act(() => root.unmount());
    useSrStore.setState({ reviewId: null, review: null });
    root = createRoot(container);
    act(() => root.render(<ProtocolScreen reviewId="new-review" />));
    expect(container.textContent).toMatch(/research question|Draft with AI/i);
  });
});
