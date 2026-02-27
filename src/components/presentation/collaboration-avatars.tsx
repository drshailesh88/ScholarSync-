"use client";

import { useOthers, useSelf } from "@/lib/liveblocks/config";
import { useState } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Collaboration Avatars — shows who is in the room
// ---------------------------------------------------------------------------

const MAX_VISIBLE = 5;

export function CollaborationAvatars() {
  const self = useSelf();
  const others = useOthers();

  if (!self) return null;

  const visibleOthers = others.slice(0, MAX_VISIBLE);
  const overflowCount = others.length - MAX_VISIBLE;

  return (
    <div className="flex items-center gap-1">
      {/* Self avatar */}
      <AvatarBubble
        name={self.info?.name ?? "You"}
        avatar={self.info?.avatar ?? ""}
        color={self.info?.color ?? "#6B7280"}
        isSelf
      />

      {/* Other users */}
      {visibleOthers.map((other) => {
        const slideId = other.presence.activeSlideId;
        return (
          <AvatarBubble
            key={other.connectionId}
            name={other.info?.name ?? "Anonymous"}
            avatar={other.info?.avatar ?? ""}
            color={other.info?.color ?? "#6B7280"}
            slideNumber={slideId !== null ? slideId : undefined}
          />
        );
      })}

      {/* Overflow indicator */}
      {overflowCount > 0 && (
        <div className="w-7 h-7 rounded-full bg-surface-raised border-2 border-border flex items-center justify-center">
          <span className="text-[9px] font-bold text-ink-muted">
            +{overflowCount}
          </span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Individual avatar bubble with tooltip
// ---------------------------------------------------------------------------

function AvatarBubble({
  name,
  avatar,
  color,
  isSelf,
  slideNumber,
}: {
  name: string;
  avatar: string;
  color: string;
  isSelf?: boolean;
  slideNumber?: number;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className="w-7 h-7 rounded-full border-2 overflow-hidden flex items-center justify-center text-[10px] font-bold"
        style={{
          borderColor: color,
          backgroundColor: avatar ? "transparent" : color + "22",
          color: color,
        }}
      >
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={32}
            height={32}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          initials
        )}
      </div>

      {/* Slide number badge */}
      {slideNumber !== undefined && (
        <span
          className="absolute -bottom-1 -right-1 min-w-[14px] h-[14px] flex items-center justify-center px-0.5 rounded-full text-[8px] font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {slideNumber}
        </span>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-ink text-surface text-[10px] font-medium whitespace-nowrap z-50 pointer-events-none">
          {isSelf ? `${name} (you)` : name}
        </div>
      )}
    </div>
  );
}
