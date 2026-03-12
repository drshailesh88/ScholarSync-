// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { AcademicKeyboardShortcuts } from "../keyboard-shortcuts";

describe("AcademicKeyboardShortcuts", () => {
  it("dispatches toggle-comment-sidebar for Mod-/", () => {
    const config = AcademicKeyboardShortcuts.config as any;
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const shortcuts = config.addKeyboardShortcuts.call({
      editor: {},
    });

    expect(shortcuts["Mod-/"]()).toBe(true);

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "scholarsync:editor-action",
        detail: { action: "toggle-comment-sidebar" },
      })
    );
  });

  it("wires Mod-\\\\ to clear marks and reset nodes", () => {
    const config = AcademicKeyboardShortcuts.config as any;
    const chain = {
      focus: vi.fn(),
      unsetAllMarks: vi.fn(),
      clearNodes: vi.fn(),
      run: vi.fn(),
    };

    chain.focus.mockReturnValue(chain);
    chain.unsetAllMarks.mockReturnValue(chain);
    chain.clearNodes.mockReturnValue(chain);
    chain.run.mockReturnValue(true);

    const shortcuts = config.addKeyboardShortcuts.call({
      editor: {
        chain: () => chain,
      },
    });

    expect(shortcuts["Mod-\\"]()).toBe(true);
    expect(chain.focus).toHaveBeenCalledOnce();
    expect(chain.unsetAllMarks).toHaveBeenCalledOnce();
    expect(chain.clearNodes).toHaveBeenCalledOnce();
    expect(chain.run).toHaveBeenCalledOnce();
  });
});
