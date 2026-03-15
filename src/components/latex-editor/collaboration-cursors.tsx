"use client";

import { useCollaboration, type CollaboratorUser } from "./collaboration-provider";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Collaborator Avatars — shows who's in the document
// ---------------------------------------------------------------------------

/**
 * Displays avatar bubbles for all collaborators currently in the document.
 * Shows up to 4 avatars with a "+N" indicator for additional users.
 */
export function CollaboratorAvatars() {
  const { others, currentUser, isConnected } = useCollaboration();

  if (!isConnected || (others.length === 0 && !currentUser)) return null;

  // Normalize to flat array of CollaboratorUser
  const allUsers: CollaboratorUser[] = currentUser
    ? [currentUser, ...others.map((o) => o.user)]
    : others.map((o) => o.user);
  const displayUsers = allUsers.slice(0, 4);
  const remaining = allUsers.length - 4;

  return (
    <div className="flex items-center -space-x-2">
      {displayUsers.map((user, index) => {
        if (!user) return null;

        return (
          <div
            key={user?.id ?? index}
            className="relative group"
            style={{ zIndex: 10 - index }}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-surface flex items-center justify-center text-xs font-medium text-white overflow-hidden"
              style={{ backgroundColor: user.color }}
              title={user.name}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-ink text-surface text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {user.name}
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
// Typing Indicator — shows who's typing
// ---------------------------------------------------------------------------

/**
 * Shows a "typing" indicator when collaborators are actively editing.
 */
export function TypingIndicator() {
  const { others } = useCollaboration();
  const typingUsers = others.filter((o) => o.isTyping);

  if (typingUsers.length === 0) return null;

  const names = typingUsers
    .map((u) => u.user?.name ?? "Someone")
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

export function CollaborationStatus() {
  const { isConnected } = useCollaboration();

  return (
    <div
      className="hidden sm:flex items-center gap-1.5 text-[11px] text-ink-muted"
      title={isConnected ? "Collaboration connected" : "Collaboration disconnected"}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: isConnected ? "#10b981" : "#94a3b8" }}
      />
      {isConnected ? "Connected" : "Offline"}
    </div>
  );
}
