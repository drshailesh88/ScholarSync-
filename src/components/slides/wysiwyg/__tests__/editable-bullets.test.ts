// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import type { Editor as TiptapEditor } from "@tiptap/core";
import {
  MAX_BULLET_NESTING_LEVEL,
  canIndentBulletListItem,
  handleBulletsTabKeyDown,
  indentBulletListItem,
} from "../editable-text-block";

interface MockOptions {
  listLevel?: number;
  canSink?: boolean;
  canLift?: boolean;
}

function makeMockEditor({
  listLevel = 1,
  canSink = true,
  canLift = true,
}: MockOptions = {}) {
  const chain = {
    focus: vi.fn(),
    sinkListItem: vi.fn(),
    liftListItem: vi.fn(),
    run: vi.fn(() => true),
  };
  chain.focus.mockReturnValue(chain);
  chain.sinkListItem.mockReturnValue(chain);
  chain.liftListItem.mockReturnValue(chain);

  let canMode: "sink" | "lift" | null = null;
  const canChain = {
    focus: vi.fn(),
    sinkListItem: vi.fn(),
    liftListItem: vi.fn(),
    run: vi.fn(() => (canMode === "sink" ? canSink : canLift)),
  };
  canChain.focus.mockReturnValue(canChain);
  canChain.sinkListItem.mockImplementation(() => {
    canMode = "sink";
    return canChain;
  });
  canChain.liftListItem.mockImplementation(() => {
    canMode = "lift";
    return canChain;
  });

  const nodeNames: string[] = ["doc"];
  for (let level = 0; level < listLevel; level += 1) {
    nodeNames.push("bulletList", "listItem");
  }

  const editor = {
    state: {
      selection: {
        $from: {
          depth: nodeNames.length - 1,
          node: (depth: number) => ({ type: { name: nodeNames[depth] ?? "paragraph" } }),
        },
      },
    },
    can: () => ({
      chain: () => canChain,
    }),
    chain: () => chain,
  } as unknown as TiptapEditor;

  return { editor, chain, canChain };
}

describe("EditableBulletsBlock indentation behavior", () => {
  it("Tab triggers sinkListItem", () => {
    const { editor, chain } = makeMockEditor({ listLevel: 1, canSink: true });
    const event = new KeyboardEvent("keydown", { key: "Tab", cancelable: true });

    const handled = handleBulletsTabKeyDown(event, editor, true);

    expect(handled).toBe(true);
    expect(event.defaultPrevented).toBe(true);
    expect(chain.sinkListItem).toHaveBeenCalledWith("listItem");
    expect(chain.liftListItem).not.toHaveBeenCalled();
  });

  it("Shift+Tab triggers liftListItem", () => {
    const { editor, chain } = makeMockEditor({ listLevel: 2, canLift: true });
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      cancelable: true,
    });

    const handled = handleBulletsTabKeyDown(event, editor, true);

    expect(handled).toBe(true);
    expect(event.defaultPrevented).toBe(true);
    expect(chain.liftListItem).toHaveBeenCalledWith("listItem");
    expect(chain.sinkListItem).not.toHaveBeenCalled();
  });

  it("caps indentation at 3 list levels", () => {
    expect(MAX_BULLET_NESTING_LEVEL).toBe(3);

    const { editor: level3Editor, chain: level3Chain, canChain: level3CanChain } = makeMockEditor({
      listLevel: 3,
      canSink: true,
    });
    expect(canIndentBulletListItem(level3Editor)).toBe(false);
    expect(indentBulletListItem(level3Editor)).toBe(false);
    expect(level3CanChain.sinkListItem).not.toHaveBeenCalled();
    expect(level3Chain.sinkListItem).not.toHaveBeenCalled();

    const { editor: level2Editor, chain: level2Chain } = makeMockEditor({
      listLevel: 2,
      canSink: true,
    });
    expect(canIndentBulletListItem(level2Editor)).toBe(true);
    expect(indentBulletListItem(level2Editor)).toBe(true);
    expect(level2Chain.sinkListItem).toHaveBeenCalledWith("listItem");
  });
});
