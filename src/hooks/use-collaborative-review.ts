"use client";

import { useCallback, useRef, useState } from "react";
import {
  useSRUpdateMyPresence,
  useSROthers,
  useSRSelf,
  useSRBroadcastEvent,
  useSREventListener,
  useSRStatus,
  type SRRoomEvent,
} from "@/lib/liveblocks/sr-config";
import type { WorkflowTab } from "@/stores/systematic-review-store";

// ---------------------------------------------------------------------------
// Activity Feed Types
// ---------------------------------------------------------------------------

export interface ActivityEntry {
  id: string;
  timestamp: number;
  event: SRRoomEvent;
}

const MAX_ACTIVITY_ENTRIES = 50;

// ---------------------------------------------------------------------------
// Hook: useCollaborativeReview
// ---------------------------------------------------------------------------

/**
 * Provides real-time collaboration helpers for a systematic review project.
 *
 * Must be used inside an <SRRoomProvider>.
 *
 * Returns:
 *  - `others`: array of other collaborators' presence
 *  - `self`: current user's presence
 *  - `connectionStatus`: Liveblocks connection status
 *  - `activityFeed`: ordered list of recent broadcast events
 *  - `updatePresence`: update current user's tab/paper context
 *  - `broadcastDecision`: announce a screening decision
 *  - `broadcastExtraction`: announce an extraction completion
 *  - `broadcastRoB2`: announce a Risk of Bias assessment
 *  - `broadcastStageAdvanced`: announce a workflow stage change
 *  - `broadcastPapersImported`: announce paper imports
 */
export function useCollaborativeReview() {
  const updateMyPresence = useSRUpdateMyPresence();
  const others = useSROthers();
  const self = useSRSelf();
  const broadcast = useSRBroadcastEvent();
  const connectionStatus = useSRStatus();

  const [activityFeed, setActivityFeed] = useState<ActivityEntry[]>([]);
  const idCounter = useRef(0);

  // -----------------------------------------------------------------------
  // Presence helpers
  // -----------------------------------------------------------------------

  const updatePresence = useCallback(
    (update: { activeTab?: WorkflowTab; currentPaperId?: number | null }) => {
      updateMyPresence(update);
    },
    [updateMyPresence]
  );

  // -----------------------------------------------------------------------
  // Activity feed — append incoming broadcast events
  // -----------------------------------------------------------------------

  const appendActivity = useCallback((event: SRRoomEvent) => {
    const entry: ActivityEntry = {
      id: `activity-${Date.now()}-${idCounter.current++}`,
      timestamp: Date.now(),
      event,
    };
    setActivityFeed((prev) => [entry, ...prev].slice(0, MAX_ACTIVITY_ENTRIES));
  }, []);

  useSREventListener(({ event }) => {
    appendActivity(event as SRRoomEvent);
  });

  // -----------------------------------------------------------------------
  // Broadcast helpers
  // -----------------------------------------------------------------------

  const broadcastDecision = useCallback(
    (data: {
      userId: string;
      userName: string;
      paperId: number;
      paperTitle: string;
      decision: "include" | "exclude" | "maybe";
    }) => {
      const event: SRRoomEvent = { type: "decision-made", ...data };
      broadcast(event);
      // Also add to local feed
      appendActivity(event);
    },
    [broadcast, appendActivity]
  );

  const broadcastExtraction = useCallback(
    (data: {
      userId: string;
      userName: string;
      paperId: number;
      paperTitle: string;
    }) => {
      const event: SRRoomEvent = { type: "extraction-complete", ...data };
      broadcast(event);
      appendActivity(event);
    },
    [broadcast, appendActivity]
  );

  const broadcastRoB2 = useCallback(
    (data: {
      userId: string;
      userName: string;
      paperId: number;
      paperTitle: string;
      overallRisk: string;
    }) => {
      const event: SRRoomEvent = { type: "rob2-assessed", ...data };
      broadcast(event);
      appendActivity(event);
    },
    [broadcast, appendActivity]
  );

  const broadcastStageAdvanced = useCallback(
    (data: {
      userId: string;
      userName: string;
      fromStage: string;
      toStage: string;
    }) => {
      const event: SRRoomEvent = { type: "stage-advanced", ...data };
      broadcast(event);
      appendActivity(event);
    },
    [broadcast, appendActivity]
  );

  const broadcastPapersImported = useCallback(
    (data: {
      userId: string;
      userName: string;
      count: number;
      source: string;
    }) => {
      const event: SRRoomEvent = { type: "papers-imported", ...data };
      broadcast(event);
      appendActivity(event);
    },
    [broadcast, appendActivity]
  );

  return {
    others,
    self,
    connectionStatus,
    activityFeed,
    updatePresence,
    broadcastDecision,
    broadcastExtraction,
    broadcastRoB2,
    broadcastStageAdvanced,
    broadcastPapersImported,
  };
}
