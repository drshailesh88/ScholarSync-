// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ReportScreen } from "../report/report-screen";
import { ExportScreen } from "../report/export-screen";
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

function mount(node: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(node));
  return { container, root };
}

describe("ReportScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    ({ container, root } = mount(<ReportScreen reviewId="sglt2-hf" />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders an auto-drafted narrative with a title and citation chips", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("AI · AUTO-DRAFTED NARRATIVE");
    expect(text).toMatch(/SGLT2 inhibitors/);
    expect(container.querySelector(".ci")).not.toBeNull();
  });

  it("weaves the live included count into the meta line", () => {
    expect(container.textContent).toContain("12 included studies");
  });

  it("shows a characteristics table with source chips and a not-reported cell", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Anker 2021");
    expect(text).toContain("5,988");
    expect(container.querySelector(".vchip")).not.toBeNull();
    expect(container.querySelector(".nr")?.textContent).toContain(
      "Not reported",
    );
  });

  it("shows the report status rail and export/handoff actions", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Gather");
    expect(text).toContain("Generate");
    expect(text).toContain("BibTeX");
    expect(text).toContain("Send to manuscript");
  });
});

describe("ExportScreen", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    useSrStore.setState({ reviewId: null, review: null });
    ({ container, root } = mount(<ExportScreen reviewId="sglt2-hf" />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("offers CSV, RevMan, and DOCX export targets", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("CSV");
    expect(text).toContain("RevMan");
    expect(text).toContain("DOCX");
  });

  it("explains that statistical synthesis happens in RevMan/R, not in-app", () => {
    const text = container.textContent ?? "";
    expect(text).toMatch(/RevMan or R/);
    expect(text).toContain("Why no forest plot here?");
  });

  it("uses Lucide icons, not raw glyphs", () => {
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[▤◆▦]/);
    expect(container.querySelectorAll(".excard svg").length).toBeGreaterThan(0);
  });
});
