import { createClient, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// ---------------------------------------------------------------------------
// Liveblocks type definitions for LaTeX collaboration rooms
// ---------------------------------------------------------------------------

/** Cursor position in the editor (line/column based) */
export type EditorCursor = {
  line: number;
  column: number;
};

/** Selection range in the editor */
export type EditorSelection = {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
};

/** Each user's real-time presence state */
export type LatexPresence = {
  /** Current cursor position in the editor */
  cursor: EditorCursor | null;
  /** Current selection in the editor */
  selection: EditorSelection | null;
  /** Which file the user is currently editing */
  activeFileId: string | null;
  /** Whether the user is actively typing */
  isTyping: boolean;
  /** User metadata */
  user: {
    id: string;
    name: string;
    avatar: string;
    /** Assigned collaboration color */
    color: string;
  };
};

/** Shared document state */
export type LatexDocumentData = {
  /** The file being collaborated on */
  fileId: string;
  /** Last edited timestamp */
  lastEditedAt: number;
  /** User ID of last editor */
  lastEditedBy: string | null;
};

/** Root Liveblocks storage shape for LaTeX */
export type LatexStorage = {
  /** Document metadata */
  document: LiveObject<LatexDocumentData>;
};

/** User metadata resolved from Clerk auth */
export type LatexUserMeta = {
  id: string;
  info: {
    name: string;
    avatar: string;
    color: string;
  };
};

/** Broadcast event types for real-time notifications */
export type LatexRoomEvent =
  | { type: "file_saved"; fileId: string }
  | { type: "compilation_started"; projectId: string }
  | { type: "compilation_completed"; projectId: string; success: boolean }
  | { type: "comment_added"; commentId: string; fileId: string };

// ---------------------------------------------------------------------------
// Create the Liveblocks client
// ---------------------------------------------------------------------------

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

// ---------------------------------------------------------------------------
// Room context — typed hooks for LaTeX collaboration
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
} = createRoomContext<LatexPresence, LatexStorage, LatexUserMeta, LatexRoomEvent>(client);

// Re-export for convenience
export { LiveObject };

// ---------------------------------------------------------------------------
// Helper functions for collaboration
// ---------------------------------------------------------------------------

/** Predefined colors for collaborators */
export const COLLABORATOR_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Gold
];

/**
 * Generate a deterministic color for a user based on their ID
 */
export function getCollaboratorColor(userId: string): string {
  const hash = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLLABORATOR_COLORS[hash % COLLABORATOR_COLORS.length];
}

/**
 * Generate a room ID for a LaTeX project
 * Sanitizes special characters to ensure valid room ID format
 */
export function generateLatexRoomId(projectId: string): string {
  // Replace any non-alphanumeric characters (except hyphens) with hyphens
  const sanitized = projectId.replace(/[^a-zA-Z0-9-]/g, "-");
  return `latex-project-${sanitized}`;
}

/**
 * Check if a collaborator is active (active within last 30 seconds)
 */
export function isCollaboratorActive(lastActiveAt: number): boolean {
  return Date.now() - lastActiveAt < 30_000; // 30 seconds
}
