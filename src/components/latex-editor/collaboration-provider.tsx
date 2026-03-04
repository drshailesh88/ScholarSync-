"use client";

import { ReactNode, useMemo, useState } from "react";
import {
  RoomProvider,
  LiveObject,
} from "@/lib/liveblocks/latex-config";
import type { LatexDocumentData } from "@/lib/liveblocks/latex-config";

// ---------------------------------------------------------------------------
// Collaboration Provider Props
// ---------------------------------------------------------------------------

interface LatexCollaborationProviderProps {
  projectId: string;
  initialFileId: string;
  children: ReactNode;
}

// ---------------------------------------------------------------------------
// Collaboration Provider
// ---------------------------------------------------------------------------

/**
 * Wraps children in a Liveblocks RoomProvider for real-time LaTeX collaboration.
 *
 * When `NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY` is not set, this component simply
 * renders its children without any collaboration — graceful degradation.
 */
export function LatexCollaborationProvider({
  projectId,
  initialFileId,
  children,
}: LatexCollaborationProviderProps) {
  // Generate room ID from project ID (sanitized for Liveblocks compatibility)
  const roomId = useMemo(() => {
    const sanitized = projectId.replace(/[^a-zA-Z0-9-]/g, "-");
    return `latex-project-${sanitized}`;
  }, [projectId]);

  // Store the initial timestamp using useState initializer (runs once on mount)
  const [initialTimestamp] = useState(() => Date.now());

  // Build initial storage
  const initialStorage = useMemo(() => {
    const documentData: LatexDocumentData = {
      fileId: initialFileId,
      lastEditedAt: initialTimestamp,
      lastEditedBy: null,
    };

    return {
      document: new LiveObject(documentData),
    };
  }, [initialFileId, initialTimestamp]);

  // Check if Liveblocks is configured — if not, render without collaboration
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    return <>{children}</>;
  }

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: null,
        activeFileId: initialFileId,
        isTyping: false,
        user: { id: "", name: "", avatar: "", color: "" },
      }}
      initialStorage={initialStorage}
    >
      {children}
    </RoomProvider>
  );
}
