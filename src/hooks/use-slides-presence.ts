"use client";

// ---------------------------------------------------------------------------
// useSlidesPresence — Utility helpers for Liveblocks presence in the slides editor.
//
// The actual Liveblocks hook calls happen in LiveblocksPresenceBridge (a component
// rendered inside RoomProvider). This module exports the pure logic / formatters.
// ---------------------------------------------------------------------------

/** Cursor throttle interval — 30 fps */
export const CURSOR_THROTTLE_MS = 1000 / 30;

/**
 * Formats the editing block ID for presence broadcasting.
 * Returns `"slide-{slideId}-block-{index}"` or `null` if not editing.
 */
export function formatEditingBlockId(
  activeSlideId: number | null,
  editingBlockIndex: number | null
): string | null {
  if (activeSlideId === null || editingBlockIndex === null) return null;
  return `slide-${activeSlideId}-block-${editingBlockIndex}`;
}
