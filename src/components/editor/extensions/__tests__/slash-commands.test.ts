// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { filterCommands, structuralCommands } from "../slash-commands";

describe("filterCommands", () => {
  it("matches commands by title and description text", () => {
    expect(filterCommands("heading 1").some((cmd) => cmd.title === "Heading 1")).toBe(true);
    expect(
      filterCommands("unordered list").some((cmd) => cmd.title === "Bullet List")
    ).toBe(true);
  });

  it("matches commands by the visible category text", () => {
    expect(filterCommands("document").some((cmd) => cmd.title === "Word Count")).toBe(true);
    expect(filterCommands("academic").some((cmd) => cmd.title === "Table")).toBe(true);
  });

  it("dispatches the shared insert-citation editor action for Cite", () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const citeCommand = structuralCommands.find((cmd) => cmd.title === "Cite");

    expect(citeCommand).toBeDefined();
    citeCommand?.command({} as never);

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "scholarsync:editor-action",
        detail: { action: "insert-citation" },
      })
    );
  });

  it("shows heading shortcut badges that match the registered keyboard shortcuts", () => {
    expect(
      structuralCommands.find((cmd) => cmd.title === "Heading 1")?.shortcut
    ).toBe("Cmd+Shift+1");
    expect(
      structuralCommands.find((cmd) => cmd.title === "Heading 2")?.shortcut
    ).toBe("Cmd+Shift+2");
    expect(
      structuralCommands.find((cmd) => cmd.title === "Heading 3")?.shortcut
    ).toBe("Cmd+Shift+3");
    expect(
      structuralCommands.find((cmd) => cmd.title === "Heading 4")?.shortcut
    ).toBe("Cmd+Shift+4");
  });

  it("shows shortcut badges for block quote, divider, and code block", () => {
    expect(
      structuralCommands.find((cmd) => cmd.title === "Block Quote")?.shortcut
    ).toBe("Cmd+Shift+B");
    expect(
      structuralCommands.find((cmd) => cmd.title === "Divider")?.shortcut
    ).toBe("Cmd+Shift+Enter");
    expect(
      structuralCommands.find((cmd) => cmd.title === "Code Block")?.shortcut
    ).toBe("Cmd+Opt+C");
  });
});
