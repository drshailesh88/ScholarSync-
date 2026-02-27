"use client";

import { useOthers } from "@/lib/liveblocks/config";

// ---------------------------------------------------------------------------
// Editing indicator — shows a colored border + name tag around content blocks
// that another user is currently editing
// ---------------------------------------------------------------------------

/**
 * Renders an editing indicator around a content block that another user is
 * currently editing. Place this as a child of a `position: relative` wrapper
 * around each editable content block.
 *
 * When no one else is editing this block, renders null.
 */
export function CollaborationEditingIndicator({
  blockId,
}: {
  blockId: string;
}) {
  const others = useOthers();
  const editingUser = others.find(
    (o) => o.presence.editingBlockId === blockId
  );

  if (!editingUser) return null;

  const color = editingUser.info?.color ?? "#6B7280";
  const name = editingUser.info?.name ?? "Someone";

  return (
    <>
      {/* Colored border overlay */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none z-10"
        style={{
          boxShadow: `inset 0 0 0 2px ${color}`,
        }}
      />
      {/* Name tag */}
      <div
        className="absolute -top-5 left-2 text-[10px] px-1.5 py-0.5 rounded-t font-medium text-white z-10 pointer-events-none"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Slide presence dots — shows colored dots on slide thumbnails in the sidebar
// ---------------------------------------------------------------------------

/**
 * Renders small colored presence dots below a slide thumbnail showing which
 * users are currently viewing that slide.
 */
export function SlidePresenceDots({ slideId }: { slideId: number }) {
  const others = useOthers();
  const viewingUsers = others.filter(
    (o) => o.presence.activeSlideId === slideId
  );

  if (viewingUsers.length === 0) return null;

  return (
    <div className="flex items-center gap-0.5 mt-0.5">
      {viewingUsers.slice(0, 4).map((user) => (
        <div
          key={user.connectionId}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: user.info?.color ?? "#6B7280" }}
          title={user.info?.name ?? "Anonymous"}
        />
      ))}
      {viewingUsers.length > 4 && (
        <span className="text-[8px] text-ink-muted font-medium">
          +{viewingUsers.length - 4}
        </span>
      )}
    </div>
  );
}
