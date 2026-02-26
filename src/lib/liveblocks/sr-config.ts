import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import type { WorkflowTab } from "@/stores/systematic-review-store";

// ---------------------------------------------------------------------------
// Liveblocks type definitions for systematic review collaboration rooms
// ---------------------------------------------------------------------------

/** Each collaborator's real-time presence in an SR project */
export type SRPresence = {
  userId: string;
  name: string;
  avatar: string;
  color: string;
  /** Which workflow tab the user is currently viewing */
  activeTab: WorkflowTab | null;
  /** Which paper the user is currently working on (if any) */
  currentPaperId: number | null;
};

/** User metadata resolved from Clerk auth (shared with presentation rooms) */
export type SRUserMeta = {
  id: string;
  info: {
    name: string;
    avatar: string;
    color: string;
  };
};

/** Broadcast event types for SR activity feed */
export type SRRoomEvent =
  | {
      type: "decision-made";
      userId: string;
      userName: string;
      paperId: number;
      paperTitle: string;
      decision: "include" | "exclude" | "maybe";
    }
  | {
      type: "extraction-complete";
      userId: string;
      userName: string;
      paperId: number;
      paperTitle: string;
    }
  | {
      type: "rob2-assessed";
      userId: string;
      userName: string;
      paperId: number;
      paperTitle: string;
      overallRisk: string;
    }
  | {
      type: "stage-advanced";
      userId: string;
      userName: string;
      fromStage: string;
      toStage: string;
    }
  | {
      type: "papers-imported";
      userId: string;
      userName: string;
      count: number;
      source: string;
    };

/** Storage is empty for SR rooms -- we use the DB, not Liveblocks storage */
export type SRStorage = Record<string, never>;

// ---------------------------------------------------------------------------
// Create the Liveblocks client (shares the same auth endpoint)
// ---------------------------------------------------------------------------

const srClient = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

// ---------------------------------------------------------------------------
// Room context -- typed hooks for SR collaboration
// ---------------------------------------------------------------------------

export const {
  RoomProvider: SRRoomProvider,
  useRoom: useSRRoom,
  useMyPresence: useSRMyPresence,
  useUpdateMyPresence: useSRUpdateMyPresence,
  useOthers: useSROthers,
  useSelf: useSRSelf,
  useBroadcastEvent: useSRBroadcastEvent,
  useEventListener: useSREventListener,
  useStatus: useSRStatus,
} = createRoomContext<SRPresence, SRStorage, SRUserMeta, SRRoomEvent>(
  srClient
);
