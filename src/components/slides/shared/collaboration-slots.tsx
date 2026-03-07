"use client";

import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Collaboration slot components — lazy-load Liveblocks-dependent components
// only when the env var is configured. This ensures graceful degradation:
// if Liveblocks is not set up, nothing renders and no hooks are called.
//
// Follows the same pattern as CollaborationToolbarSlot in
// src/components/presentation/collaboration-toolbar-slot.tsx
// ---------------------------------------------------------------------------

const LIVEBLOCKS_CONFIGURED =
  typeof process !== "undefined" &&
  !!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

// ---------------------------------------------------------------------------
// PresenceBridgeSlot — syncs Zustand store to Liveblocks presence
// ---------------------------------------------------------------------------

export function PresenceBridgeSlot() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!LIVEBLOCKS_CONFIGURED) return;
    import("./liveblocks-presence-bridge").then((mod) => {
      setComponent(() => mod.LiveblocksPresenceBridge);
    });
  }, []);

  if (!Component) return null;
  return <Component />;
}

// ---------------------------------------------------------------------------
// RemoteCursorsSlot — renders remote cursors + tracks local cursor
// ---------------------------------------------------------------------------

type RemoteCursorsProps = {
  canvasRef: React.RefObject<HTMLDivElement | null>;
};

export function RemoteCursorsSlot({ canvasRef }: RemoteCursorsProps) {
  const [Component, setComponent] = useState<
    React.ComponentType<RemoteCursorsProps> | null
  >(null);

  useEffect(() => {
    if (!LIVEBLOCKS_CONFIGURED) return;
    import("./remote-cursors-overlay").then((mod) => {
      setComponent(() => mod.RemoteCursorsOverlay);
    });
  }, []);

  if (!Component) return null;
  return <Component canvasRef={canvasRef} />;
}

// ---------------------------------------------------------------------------
// PresenceDotsSlot — colored dots under slide thumbnails
// ---------------------------------------------------------------------------

// Module-level cache so many filmstrip items share one dynamic import
let _SlidePresenceDots: React.ComponentType<{ slideId: number }> | null = null;
let _presenceDotsPromise: Promise<void> | null = null;

export function PresenceDotsSlot({ slideId }: { slideId: number }) {
  const [, rerender] = useState(0);

  useEffect(() => {
    if (!LIVEBLOCKS_CONFIGURED || _SlidePresenceDots) return;
    if (!_presenceDotsPromise) {
      _presenceDotsPromise = import(
        "@/components/presentation/collaboration-cursors"
      ).then((mod) => {
        _SlidePresenceDots = mod.SlidePresenceDots;
      });
    }
    _presenceDotsPromise.then(() => rerender((n) => n + 1));
  }, []);

  if (!_SlidePresenceDots) return null;
  return <_SlidePresenceDots slideId={slideId} />;
}

// ---------------------------------------------------------------------------
// EditingIndicatorSlot — colored border + name tag on blocks
// ---------------------------------------------------------------------------

let _EditingIndicator: React.ComponentType<{ blockId: string }> | null = null;
let _editingIndicatorPromise: Promise<void> | null = null;

export function EditingIndicatorSlot({ blockId }: { blockId: string }) {
  const [, rerender] = useState(0);

  useEffect(() => {
    if (!LIVEBLOCKS_CONFIGURED || _EditingIndicator) return;
    if (!_editingIndicatorPromise) {
      _editingIndicatorPromise = import(
        "@/components/presentation/collaboration-cursors"
      ).then((mod) => {
        _EditingIndicator = mod.CollaborationEditingIndicator;
      });
    }
    _editingIndicatorPromise.then(() => rerender((n) => n + 1));
  }, []);

  if (!_EditingIndicator) return null;
  return <_EditingIndicator blockId={blockId} />;
}

// ---------------------------------------------------------------------------
// AvatarsSlot — user avatars in toolbar
// ---------------------------------------------------------------------------

export function AvatarsSlot() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!LIVEBLOCKS_CONFIGURED) return;
    import("@/components/presentation/collaboration-avatars").then((mod) => {
      setComponent(() => mod.CollaborationAvatars);
    });
  }, []);

  if (!Component) return null;
  return <Component />;
}
