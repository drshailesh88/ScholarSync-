"use client";

import { ReactNode, useMemo, useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CollaboratorUser {
  id: string;
  name: string;
  avatar?: string;
  color: string;
}

export interface CursorPosition {
  line: number;
  column: number;
}

export interface SelectionRange {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface UserPresence {
  user: CollaboratorUser;
  cursor: CursorPosition | null;
  selection: SelectionRange | null;
  activeFileId: string | null;
  isTyping: boolean;
  lastActiveAt: number;
}

interface CollaborationContextValue {
  isConnected: boolean;
  currentUser: CollaboratorUser | null;
  others: UserPresence[];
  updatePresence: (partial: Partial<UserPresence>) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CollaborationContext = createContext<CollaborationContextValue | null>(null);

export function useCollaboration() {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error("useCollaboration must be used within a YjsCollaborationProvider");
  }
  return context;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface YjsCollaborationProviderProps {
  projectId: string;
  initialFileId: string;
  children: ReactNode;
}

export function YjsCollaborationProvider({
  projectId,
  initialFileId,
  children,
}: YjsCollaborationProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [others, setOthers] = useState<UserPresence[]>([]);
  const providerRef = useRef<WebsocketProvider | null>(null);

  // Store initial timestamp (stable across renders)
  const [initialTimestamp] = useState(() => Date.now());

  // Compute current user during render (deterministic based on timestamp)
  const currentUser: CollaboratorUser = useMemo(() => ({
    id: `user-${initialTimestamp}`,
    name: "You",
    color: getCollaboratorColor(`user-${initialTimestamp}`),
  }), [initialTimestamp]);

  // Generate room ID (deterministic)
  const roomId = useMemo(() => {
    const sanitized = projectId.replace(/[^a-zA-Z0-9-]/g, "-");
    return `latex-project-${sanitized}`;
  }, [projectId]);

  // Set up WebSocket provider
  useEffect(() => {
    // Check if collaboration is configured
    const wsUrl = process.env.NEXT_PUBLIC_COLLABORATION_WS_URL;
    if (!wsUrl) {
      return; // Graceful degradation - no collaboration
    }

    // Create Y.js document
    const doc = new Y.Doc();

    // Create WebSocket provider
    const provider = new WebsocketProvider(wsUrl, roomId, doc, {
      connect: true,
    });
    providerRef.current = provider;

    // Connection state
    provider.on("status", (event: { status: string }) => {
      setIsConnected(event.status === "connected");
    });

    // Cleanup on unmount
    return () => {
      provider.disconnect();
      doc.destroy();
    };
  }, [roomId]);

  // Update presence - stable callback that accesses ref
  const updatePresence = useCallback((partial: Partial<UserPresence>) => {
    const awareness = providerRef.current?.awareness;
    if (!awareness) return;

    const current = awareness.getLocalState() as { presence?: UserPresence } | null;
    awareness.setLocalStateField("presence", {
      ...current?.presence,
      ...partial,
      lastActiveAt: Date.now(),
    });
  }, []);

  // Set up awareness listener for others
  useEffect(() => {
    const awareness = providerRef.current?.awareness;
    if (!awareness) return;

    const updateOthers = () => {
      const states = awareness.getStates();
      const otherUsers: UserPresence[] = [];

      states.forEach((state, clientId) => {
        const typedState = state as { presence?: UserPresence };
        if (clientId !== awareness.clientID && typedState.presence) {
          otherUsers.push(typedState.presence);
        }
      });

      setOthers(otherUsers);
    };

    awareness.on("change", updateOthers);
    return () => awareness.off("change", updateOthers);
  }, []);

  // Initialize current user presence in awareness
  useEffect(() => {
    const awareness = providerRef.current?.awareness;
    if (!awareness) return;

    awareness.setLocalStateField("presence", {
      user: currentUser,
      cursor: null,
      selection: null,
      activeFileId: initialFileId,
      isTyping: false,
      lastActiveAt: initialTimestamp,
    });
  }, [currentUser, initialFileId, initialTimestamp]);

  const contextValue: CollaborationContextValue = useMemo(() => ({
    isConnected,
    currentUser,
    others,
    updatePresence,
  }), [isConnected, currentUser, others, updatePresence]);

  return (
    <CollaborationContext.Provider value={contextValue}>
      {children}
    </CollaborationContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Convenience Hook for Presence Sync
// ---------------------------------------------------------------------------

interface UsePresenceSyncOptions {
  fileId: string;
}

export function usePresenceSync(options: UsePresenceSyncOptions) {
  const { fileId } = options;
  const { updatePresence } = useCollaboration();
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateCursor = (line: number, column: number) => {
    updatePresence({
      cursor: { line, column },
      activeFileId: fileId,
    });
  };

  const updateSelection = (selection: SelectionRange | null) => {
    updatePresence({ selection });
  };

  const setIsTyping = (isTyping: boolean) => {
    updatePresence({ isTyping });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        updatePresence({ isTyping: false });
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    updateCursor,
    updateSelection,
    setIsTyping,
  };
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

const COLLABORATOR_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
];

export function getCollaboratorColor(userId: string): string {
  const hash = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLLABORATOR_COLORS[hash % COLLABORATOR_COLORS.length];
}

export function generateLatexRoomId(projectId: string): string {
  const sanitized = projectId.replace(/[^a-zA-Z0-9-]/g, "-");
  return `latex-project-${sanitized}`;
}
