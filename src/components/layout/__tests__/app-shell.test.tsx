// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppShell } from "../app-shell";

const sidebarSpy = vi.hoisted(() => vi.fn());

vi.mock("../app-sidebar", () => ({
  AppSidebar: ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    sidebarSpy(open);
    return <button onClick={onClose}>sidebar-{open ? "open" : "closed"}</button>;
  },
}));

vi.mock("../app-header", () => ({
  AppHeader: ({ onMenuClick }: { onMenuClick: () => void }) => (
    <button onClick={onMenuClick}>open-menu</button>
  ),
}));

vi.mock("@/components/ui/command-palette", () => ({
  CommandPalette: () => <div>command-palette</div>,
}));

describe("AppShell", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    sidebarSpy.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("renders children and command palette", () => {
    act(() => {
      root.render(<AppShell><div>child-content</div></AppShell>);
    });

    expect(container.textContent).toContain("child-content");
    expect(container.textContent).toContain("command-palette");
    expect(sidebarSpy).toHaveBeenCalledWith(false);
  });

  it("opens and closes sidebar through header and sidebar callbacks", async () => {
    act(() => {
      root.render(<AppShell><div>child</div></AppShell>);
    });

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "open-menu")?.click();
    });
    expect(container.textContent).toContain("sidebar-open");

    await act(async () => {
      Array.from(container.querySelectorAll("button")).find((b) => b.textContent === "sidebar-open")?.click();
    });
    expect(container.textContent).toContain("sidebar-closed");
  });
});
