"use client";

import { useOthers, useSelf, useUpdateMyPresence } from "@/lib/liveblocks/latex-config";
import type { EditorCursor, EditorSelection } from "@/lib/liveblocks/latex-config";
import { useEffect, useRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Collaborator Avatars — shows who's in the document
// ---------------------------------------------------------------------------

/**
 * Displays avatar bubbles for all collaborators currently in the document.
 * Shows up to 4 avatars with a "+N" indicator for additional users.
 */
export function CollaboratorAvatars() {
  const others = useOthers();
  const self = useSelf();

  if (others.length === 0 && !self) return null;

  const allUsers = [self, ...others].filter(Boolean);
  const displayUsers = allUsers.slice(0, 4);
  const remaining = allUsers.length - 4;

  return (
    <div className="flex items-center -space-x-2">
      {displayUsers.map((user, index) => {
        const info = user?.info;
        if (!info) return null;

        return (
          <div
            key={user?.connectionId ?? index}
            className="relative group"
            style={{ zIndex: 10 - index }}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-surface flex items-center justify-center text-xs font-medium text-white overflow-hidden"
              style={{ backgroundColor: info.color }}
              title={info.name}
            >
              {info.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={info.avatar}
                  alt={info.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                info.name.charAt(0).toUpperCase()
              )}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-ink text-surface text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {info.name}
            </div>
          </div>
        );
      })}
      {remaining > 0 && (
        <div
          className="w-8 h-8 rounded-full border-2 border-surface bg-ink-muted flex items-center justify-center text-xs font-medium text-surface"
          style={{ zIndex: 5 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cursor Indicator — shows collaborator cursor position
// ---------------------------------------------------------------------------

interface CursorIndicatorProps {
  cursor: EditorCursor;
  color: string;
  name: string;
  lineHeight: number;
  charWidth: number;
  offsetX?: number;
  offsetY?: number;
}

/**
 * Renders a cursor indicator at the specified position in the editor.
 * Used to show where collaborators are working.
 */
export function CursorIndicator({
  cursor,
  color,
  name,
  lineHeight,
  charWidth,
  offsetX = 0,
  offsetY = 0,
}: CursorIndicatorProps) {
  const left = offsetX + (cursor.column - 1) * charWidth;
  const top = offsetY + (cursor.line - 1) * lineHeight;

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      {/* Cursor line */}
      <div
        className="w-0.5 h-5 animate-pulse"
        style={{ backgroundColor: color }}
      />
      {/* Name tag */}
      <div
        className="absolute top-0 left-0.5 text-[10px] px-1 py-0.5 rounded font-medium text-white whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Selection Highlight — shows collaborator selection
// ---------------------------------------------------------------------------

interface SelectionHighlightProps {
  selection: EditorSelection;
  color: string;
  lineHeight: number;
  charWidth: number;
  offsetX?: number;
  offsetY?: number;
}

/**
 * Renders a selection highlight for collaborator selections.
 * Shows a semi-transparent overlay over selected text.
 */
export function SelectionHighlight({
  selection,
  color,
  lineHeight,
  charWidth,
  offsetX = 0,
  offsetY = 0,
}: SelectionHighlightProps) {
  // For single-line selections
  if (selection.startLine === selection.endLine) {
    const left = offsetX + (selection.startColumn - 1) * charWidth;
    const top = offsetY + (selection.startLine - 1) * lineHeight;
    const width = (selection.endColumn - selection.startColumn) * charWidth;

    return (
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: `${lineHeight}px`,
          backgroundColor: color,
          opacity: 0.2,
        }}
      />
    );
  }

  // For multi-line selections, render multiple rectangles
  const highlights: ReactNode[] = [];
  let key = 0;

  for (let line = selection.startLine; line <= selection.endLine; line++) {
    const top = offsetY + (line - 1) * lineHeight;
    let left: number;
    let width: number;

    if (line === selection.startLine) {
      left = offsetX + (selection.startColumn - 1) * charWidth;
      width = 500; // Extend to end of line
    } else if (line === selection.endLine) {
      left = offsetX;
      width = (selection.endColumn - 1) * charWidth;
    } else {
      left = offsetX;
      width = 500; // Full line
    }

    highlights.push(
      <div
        key={key++}
        className="absolute pointer-events-none z-10"
        style={{
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: `${lineHeight}px`,
          backgroundColor: color,
          opacity: 0.2,
        }}
      />
    );
  }

  return <>{highlights}</>;
}

// ---------------------------------------------------------------------------
// Typing Indicator — shows who's typing
// ---------------------------------------------------------------------------

/**
 * Shows a "typing" indicator when collaborators are actively editing.
 */
export function TypingIndicator() {
  const others = useOthers();
  const typingUsers = others.filter((o) => o.presence.isTyping);

  if (typingUsers.length === 0) return null;

  const names = typingUsers
    .map((u) => u.info?.name ?? "Someone")
    .slice(0, 2);

  let text: string;
  if (names.length === 1) {
    text = `${names[0]} is typing...`;
  } else if (names.length === 2) {
    text = `${names[0]} and ${names[1]} are typing...`;
  } else {
    text = `${names[0]} and others are typing...`;
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-ink-muted">
      <span className="flex gap-0.5">
        <span className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
      </span>
      {text}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Presence Hook — sync editor state with Liveblocks
// ---------------------------------------------------------------------------

interface UsePresenceSyncOptions {
  fileId: string;
  lineHeight?: number;
  charWidth?: number;
}

/**
 * Hook to sync editor cursor/selection state with Liveblocks presence.
 * Call this in the editor component to enable real-time collaboration.
 */
export function usePresenceSync(options: UsePresenceSyncOptions) {
  const { fileId } = options;
  const updatePresence = useUpdateMyPresence();
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update cursor position
  const updateCursor = (line: number, column: number) => {
    updatePresence({
      cursor: { line, column },
      activeFileId: fileId,
    });
  };

  // Update selection
  const updateSelection = (selection: EditorSelection | null) => {
    updatePresence({ selection });
  };

  // Set typing state (with auto-clear after 2 seconds)
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

  // Clear presence on unmount
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
