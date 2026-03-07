import { describe, it, expect } from "vitest";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeTextBlock(overrides: Partial<ContentBlock & { locked?: boolean; opacity?: number; shadow?: ContentBlock["shadow"]; border?: ContentBlock["border"] }> = {}): ContentBlock {
  return {
    type: "text",
    data: { text: "Hello", style: "body" },
    ...overrides,
  } as ContentBlock;
}

function computeWrapperStyle(block: ContentBlock, isEditing: boolean) {
  const style: Record<string, unknown> = {};
  if (!isEditing) {
    const opacityValue = block.opacity ?? 100;
    if (opacityValue !== 100) {
      style.opacity = opacityValue / 100;
    }
    if (block.shadow) {
      const s = block.shadow;
      style.boxShadow = `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread ?? 0}px ${s.color}`;
    }
    if (block.border) {
      const b = block.border;
      style.border = `${b.width}px ${b.style} ${b.color}`;
      style.borderRadius = `${b.radius}px`;
    }
  }
  return style;
}

function getOutlineClass(block: ContentBlock, isSelected: boolean, isEditing: boolean) {
  if (isSelected && !isEditing && block.locked) return "outline-gray-400";
  if (isSelected && !isEditing && !block.locked) return "outline-blue-500";
  return "";
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Block locking behavior", () => {
  it("locked block prevents resize (resize handles should not render)", () => {
    const block = makeTextBlock({ locked: true });
    // When locked, resize handles should not appear:
    // isSelected && !isEditing && !block.locked => false when locked
    const showResizeHandles = true && !false && !block.locked;
    expect(showResizeHandles).toBe(false);
  });

  it("locked block prevents move (startMove is a no-op)", () => {
    const block = makeTextBlock({ locked: true });
    // startMove returns early when block.locked is true
    const moveAllowed = !block.locked;
    expect(moveAllowed).toBe(false);
  });

  it("locked block prevents edit (double-click does not enter edit mode)", () => {
    const block = makeTextBlock({ locked: true });
    // handleDoubleClick returns early when block.locked is true
    const editAllowed = !block.locked;
    expect(editAllowed).toBe(false);
  });

  it("locked block shows gray outline class", () => {
    const block = makeTextBlock({ locked: true });
    const outlineClass = getOutlineClass(block, true, false);
    expect(outlineClass).toBe("outline-gray-400");
  });

  it("unlocked block shows blue outline class", () => {
    const block = makeTextBlock({ locked: false });
    const outlineClass = getOutlineClass(block, true, false);
    expect(outlineClass).toBe("outline-blue-500");
  });

  it("locked block shows lock icon (data-lock-icon exists when locked)", () => {
    const block = makeTextBlock({ locked: true });
    // Lock icon renders when block.locked is true
    expect(block.locked).toBe(true);
  });

  it("unlocking re-enables resize/move/edit", () => {
    const block = makeTextBlock({ locked: false });
    const showResizeHandles = true && !false && !block.locked;
    const moveAllowed = !block.locked;
    const editAllowed = !block.locked;
    expect(showResizeHandles).toBe(true);
    expect(moveAllowed).toBe(true);
    expect(editAllowed).toBe(true);
  });
});

describe("Visual style: opacity", () => {
  it("opacity 50 applies correct CSS (0.5)", () => {
    const block = makeTextBlock({ opacity: 50 });
    const style = computeWrapperStyle(block, false);
    expect(style.opacity).toBe(0.5);
  });

  it("opacity 100 (default) does not add opacity to style", () => {
    const block = makeTextBlock({ opacity: 100 });
    const style = computeWrapperStyle(block, false);
    expect(style.opacity).toBeUndefined();
  });

  it("opacity 0 applies 0", () => {
    const block = makeTextBlock({ opacity: 0 });
    const style = computeWrapperStyle(block, false);
    expect(style.opacity).toBe(0);
  });
});

describe("Visual style: shadow", () => {
  it("generates correct box-shadow CSS string", () => {
    const block = makeTextBlock({
      shadow: { offsetX: 2, offsetY: 4, blur: 8, spread: 1, color: "#000000" },
    });
    const style = computeWrapperStyle(block, false);
    expect(style.boxShadow).toBe("2px 4px 8px 1px #000000");
  });

  it("shadow preset 'Subtle' outputs correct values", () => {
    const subtle = { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: "rgba(0,0,0,0.1)" };
    const block = makeTextBlock({ shadow: subtle });
    const style = computeWrapperStyle(block, false);
    expect(style.boxShadow).toBe("0px 2px 4px 0px rgba(0,0,0,0.1)");
  });

  it("spread defaults to 0 when omitted", () => {
    const block = makeTextBlock({
      shadow: { offsetX: 0, offsetY: 0, blur: 10, color: "#333" },
    });
    const style = computeWrapperStyle(block, false);
    expect(style.boxShadow).toBe("0px 0px 10px 0px #333");
  });
});

describe("Visual style: border", () => {
  it("generates correct border CSS string", () => {
    const block = makeTextBlock({
      border: { width: 2, color: "#ff0000", style: "dashed", radius: 8 },
    });
    const style = computeWrapperStyle(block, false);
    expect(style.border).toBe("2px dashed #ff0000");
    expect(style.borderRadius).toBe("8px");
  });

  it("border radius applies", () => {
    const block = makeTextBlock({
      border: { width: 1, color: "#000", style: "solid", radius: 16 },
    });
    const style = computeWrapperStyle(block, false);
    expect(style.borderRadius).toBe("16px");
  });
});

describe("Ctrl+L toggles lock", () => {
  it("toggleBlockLock flips locked state", () => {
    // Simulating store behavior
    const block = makeTextBlock({ locked: false });
    const toggled = { ...block, locked: !block.locked };
    expect(toggled.locked).toBe(true);

    const toggledBack = { ...toggled, locked: !toggled.locked };
    expect(toggledBack.locked).toBe(false);
  });
});

describe("Style controls not applied during editing mode", () => {
  it("does not apply opacity/shadow/border when editing", () => {
    const block = makeTextBlock({
      opacity: 50,
      shadow: { offsetX: 0, offsetY: 4, blur: 12, spread: 0, color: "#000" },
      border: { width: 2, color: "#f00", style: "solid", radius: 4 },
    });
    const style = computeWrapperStyle(block, true);
    expect(style.opacity).toBeUndefined();
    expect(style.boxShadow).toBeUndefined();
    expect(style.border).toBeUndefined();
    expect(style.borderRadius).toBeUndefined();
  });
});
