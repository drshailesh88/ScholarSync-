import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  formatEditingBlockId,
  CURSOR_THROTTLE_MS,
} from "../use-slides-presence";

// ---------------------------------------------------------------------------
// Tests for use-slides-presence utilities
// ---------------------------------------------------------------------------

describe("formatEditingBlockId", () => {
  it("returns formatted block ID when both slideId and blockIndex are present", () => {
    expect(formatEditingBlockId(42, 3)).toBe("slide-42-block-3");
  });

  it("returns null when activeSlideId is null", () => {
    expect(formatEditingBlockId(null, 3)).toBeNull();
  });

  it("returns null when editingBlockIndex is null", () => {
    expect(formatEditingBlockId(42, null)).toBeNull();
  });

  it("returns null when both are null", () => {
    expect(formatEditingBlockId(null, null)).toBeNull();
  });

  it("handles index 0 correctly (not falsy)", () => {
    expect(formatEditingBlockId(1, 0)).toBe("slide-1-block-0");
  });
});

// ---------------------------------------------------------------------------
// Tests for presence update behavior (simulated without Liveblocks)
// ---------------------------------------------------------------------------

describe("presence update logic", () => {
  it("broadcasts activeSlideId changes", () => {
    const updatePresence = vi.fn();
    const prev = { activeSlideId: 1, editingBlockId: null as string | null };

    // Simulate store change
    const state = { activeSlideId: 2, editingBlockIndex: null };
    const patches: Record<string, unknown> = {};

    if (state.activeSlideId !== prev.activeSlideId) {
      patches.activeSlideId = state.activeSlideId;
    }

    const editingBlockId = formatEditingBlockId(
      state.activeSlideId,
      state.editingBlockIndex
    );
    if (editingBlockId !== prev.editingBlockId) {
      patches.editingBlockId = editingBlockId;
    }

    if (Object.keys(patches).length > 0) {
      updatePresence(patches);
    }

    expect(updatePresence).toHaveBeenCalledWith({ activeSlideId: 2 });
  });

  it("broadcasts editingBlockId when editing starts", () => {
    const updatePresence = vi.fn();
    const prev = { activeSlideId: 5, editingBlockId: null as string | null };

    const state = { activeSlideId: 5, editingBlockIndex: 2 };
    const patches: Record<string, unknown> = {};

    if (state.activeSlideId !== prev.activeSlideId) {
      patches.activeSlideId = state.activeSlideId;
    }

    const editingBlockId = formatEditingBlockId(
      state.activeSlideId,
      state.editingBlockIndex
    );
    if (editingBlockId !== prev.editingBlockId) {
      patches.editingBlockId = editingBlockId;
    }

    if (Object.keys(patches).length > 0) {
      updatePresence(patches);
    }

    expect(updatePresence).toHaveBeenCalledWith({
      editingBlockId: "slide-5-block-2",
    });
  });

  it("clears editingBlockId when editing stops", () => {
    const updatePresence = vi.fn();
    const prev = {
      activeSlideId: 5,
      editingBlockId: "slide-5-block-2",
    };

    const state = { activeSlideId: 5, editingBlockIndex: null };
    const patches: Record<string, unknown> = {};

    if (state.activeSlideId !== prev.activeSlideId) {
      patches.activeSlideId = state.activeSlideId;
    }

    const editingBlockId = formatEditingBlockId(
      state.activeSlideId,
      state.editingBlockIndex
    );
    if (editingBlockId !== prev.editingBlockId) {
      patches.editingBlockId = editingBlockId;
    }

    if (Object.keys(patches).length > 0) {
      updatePresence(patches);
    }

    expect(updatePresence).toHaveBeenCalledWith({ editingBlockId: null });
  });

  it("does not call updatePresence when nothing changes", () => {
    const updatePresence = vi.fn();
    const prev = { activeSlideId: 5, editingBlockId: null as string | null };

    const state = { activeSlideId: 5, editingBlockIndex: null };
    const patches: Record<string, unknown> = {};

    if (state.activeSlideId !== prev.activeSlideId) {
      patches.activeSlideId = state.activeSlideId;
    }

    const editingBlockId = formatEditingBlockId(
      state.activeSlideId,
      state.editingBlockIndex
    );
    if (editingBlockId !== prev.editingBlockId) {
      patches.editingBlockId = editingBlockId;
    }

    if (Object.keys(patches).length > 0) {
      updatePresence(patches);
    }

    expect(updatePresence).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Tests for graceful degradation
// ---------------------------------------------------------------------------

describe("graceful degradation", () => {
  it("formatEditingBlockId works without Liveblocks (pure function)", () => {
    // No Liveblocks imports in this module — should never throw
    expect(() => formatEditingBlockId(1, 2)).not.toThrow();
    expect(() => formatEditingBlockId(null, null)).not.toThrow();
  });

  it("CURSOR_THROTTLE_MS is defined and reasonable", () => {
    expect(CURSOR_THROTTLE_MS).toBeGreaterThan(0);
    expect(CURSOR_THROTTLE_MS).toBeLessThanOrEqual(50); // at most ~50ms for 20fps minimum
  });
});

// ---------------------------------------------------------------------------
// Tests for cursor throttling
// ---------------------------------------------------------------------------

describe("cursor throttling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("throttles cursor updates to 30fps maximum", () => {
    const updatePresence = vi.fn();
    // Start lastUpdate in the past so the first call passes the threshold
    let lastUpdate = -CURSOR_THROTTLE_MS;

    function simulateCursorMove(x: number, y: number, now: number) {
      if (now - lastUpdate >= CURSOR_THROTTLE_MS) {
        lastUpdate = now;
        updatePresence({ cursor: { x, y } });
      }
    }

    // First call should go through (0 - (-CURSOR_THROTTLE_MS) >= CURSOR_THROTTLE_MS)
    simulateCursorMove(10, 20, 0);
    expect(updatePresence).toHaveBeenCalledTimes(1);

    // Rapid calls within throttle window should be dropped
    simulateCursorMove(11, 21, 5);
    simulateCursorMove(12, 22, 10);
    simulateCursorMove(13, 23, 15);
    simulateCursorMove(14, 24, 20);
    simulateCursorMove(15, 25, 25);
    simulateCursorMove(16, 26, 30);
    expect(updatePresence).toHaveBeenCalledTimes(1);

    // After throttle window passes, next call should go through
    simulateCursorMove(50, 60, CURSOR_THROTTLE_MS + 1);
    expect(updatePresence).toHaveBeenCalledTimes(2);
  });

  it("should not exceed 30 updates per second", () => {
    const updatePresence = vi.fn();
    let lastUpdate = 0;

    // Simulate 1000ms of continuous mouse movement at 1ms intervals
    for (let t = 0; t <= 1000; t += 1) {
      if (t - lastUpdate >= CURSOR_THROTTLE_MS) {
        lastUpdate = t;
        updatePresence({ cursor: { x: t, y: t } });
      }
    }

    // At 30fps throttle, we should get at most ~30 updates per second
    expect(updatePresence.mock.calls.length).toBeLessThanOrEqual(31);
    expect(updatePresence.mock.calls.length).toBeGreaterThanOrEqual(28);
  });
});
