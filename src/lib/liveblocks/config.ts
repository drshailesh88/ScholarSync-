import { createClient, LiveMap, LiveObject } from "@liveblocks/client";
import type { JsonObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// ---------------------------------------------------------------------------
// Liveblocks type definitions for presentation collaboration rooms
// ---------------------------------------------------------------------------

/** Each user's real-time presence state */
export type Presence = {
  cursor: { x: number; y: number } | null;
  /** Which slide the user is currently viewing */
  activeSlideId: number | null;
  /** Which content block the user is currently editing */
  editingBlockId: string | null;
  user: {
    id: string;
    name: string;
    avatar: string;
    /** Assigned collaboration cursor color */
    color: string;
  };
};

/** Deck metadata shape for Liveblocks storage — must be LsonObject-compatible */
export type LiveDeckMeta = {
  title: string;
  theme: string;
  /** JSON-serializable theme config — typed as JsonObject to satisfy Lson constraint */
  themeConfig: JsonObject;
  slideOrder: number[];
};

/**
 * Collaborative slide data stored in a LiveObject.
 * Must satisfy LsonObject: all values must be serializable Lson types.
 * contentBlocks is stored as a JSON-serializable array of plain objects.
 */
export type LiveSlideData = {
  id: number;
  sortOrder: number;
  layout: string;
  title: string;
  subtitle: string;
  /** Stored as a JSON-serializable array — cast to/from ContentBlock[] at boundaries */
  contentBlocks: JsonObject[];
  speakerNotes: string;
};

/** Root Liveblocks storage shape */
export type Storage = {
  /** Slide data synced in real-time, keyed by slide ID string */
  slides: LiveMap<string, LiveObject<LiveSlideData>>;
  /** Deck-level metadata */
  deckMeta: LiveObject<LiveDeckMeta>;
};

/** User metadata resolved from Clerk auth */
export type UserMeta = {
  id: string;
  info: {
    name: string;
    avatar: string;
    color: string;
  };
};

/** Broadcast event types for real-time notifications */
export type RoomEvent =
  | { type: "slide_added"; slideId: number }
  | { type: "slide_deleted"; slideId: number }
  | { type: "ai_action_started"; action: string; slideId?: number }
  | { type: "ai_action_completed"; action: string };

// ---------------------------------------------------------------------------
// Create the Liveblocks client
// ---------------------------------------------------------------------------

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

// ---------------------------------------------------------------------------
// Room context — typed hooks for our presentation collaboration
// ---------------------------------------------------------------------------

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
  useOthers,
  useOthersMapped,
  useSelf,
  useStorage,
  useMutation,
  useBroadcastEvent,
  useEventListener,
  useStatus,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);

// Re-export for convenience in provider initialization
export { LiveMap, LiveObject };
