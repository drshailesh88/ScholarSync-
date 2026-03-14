// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NotebookPasswordGate } from "../NotebookPasswordGate";

const verifyPasswordMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/actions/notebook-share", () => ({
  verifyNotebookSharePassword: verifyPasswordMock,
}));

vi.mock("../SharedNotebookViewer", () => ({
  SharedNotebookViewer: ({ title }: { title: string }) => <div>viewer:{title}</div>,
}));

const notebook = {
  title: "Shared notes",
  ownerName: "Alice",
  mode: "view",
  createdAt: new Date(),
  messages: [],
};

describe("NotebookPasswordGate", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    verifyPasswordMock.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function setPassword(value: string) {
    const input = container.querySelector('input[type="password"]') as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  it("renders locked form", () => {
    act(() => root.render(<NotebookPasswordGate token="t1" notebook={notebook} />));
    expect(container.textContent).toContain("Password Protected");
    expect(container.textContent).toContain("View Notebook");
  });

  it("shows loading and error for invalid password", async () => {
    verifyPasswordMock.mockResolvedValue(false);
    act(() => root.render(<NotebookPasswordGate token="t1" notebook={notebook} />));

    await act(async () => {
      setPassword("wrong-pass");
    });

    await act(async () => {
      container.querySelector("form")?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(verifyPasswordMock).toHaveBeenCalledWith("t1", "wrong-pass");
    expect(container.textContent).toContain("Incorrect password");
  });

  it("renders shared viewer when password is valid", async () => {
    verifyPasswordMock.mockResolvedValue(true);
    act(() => root.render(<NotebookPasswordGate token="t1" notebook={notebook} />));

    await act(async () => {
      setPassword("correct");
      container.querySelector("form")?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(container.textContent).toContain("viewer:Shared notes");
  });
});
