"use client";

import { useSROthers, useSRSelf, useSRStatus } from "@/lib/liveblocks/sr-config";
import { cn } from "@/lib/utils";
import { Users, WifiHigh, WifiSlash } from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Tab label mapping
// ---------------------------------------------------------------------------

const TAB_LABELS: Record<string, string> = {
  strategy: "Search Strategy",
  import: "Import Papers",
  screening: "AI Screening",
  prisma: "PRISMA Flow",
  rob2: "Risk of Bias",
  extraction: "Data Extraction",
  meta_analysis: "Meta-Analysis",
  grade: "GRADE",
  manuscript: "Manuscript",
  snowball: "Snowballing",
  export: "Export",
  living: "Living Review",
  protocol: "Protocol",
  prospero: "PROSPERO",
};

// ---------------------------------------------------------------------------
// CollaboratorPresence
// ---------------------------------------------------------------------------

/**
 * Displays colored avatars of online collaborators in a systematic review
 * project. Shows which tab each collaborator is viewing on hover.
 */
export function CollaboratorPresence() {
  const others = useSROthers();
  const self = useSRSelf();
  const status = useSRStatus();

  const isConnected = status === "connected";
  const collaborators = others.map((other) => ({
    connectionId: other.connectionId,
    presence: other.presence,
    info: other.info,
  }));

  if (!isConnected && collaborators.length === 0) {
    return (
      <div className="flex items-center gap-1.5 text-ink-muted text-xs">
        <WifiSlash size={14} weight="bold" />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Connection indicator */}
      <div
        className={cn(
          "flex items-center gap-1 text-xs",
          isConnected ? "text-emerald-500" : "text-amber-500"
        )}
      >
        <WifiHigh size={14} weight="bold" />
      </div>

      {/* Collaborator avatars */}
      <div className="flex items-center -space-x-2">
        {/* Self avatar */}
        {self && (
          <div className="relative group">
            <div
              className="w-7 h-7 rounded-full border-2 border-surface flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-brand/30"
              style={{ backgroundColor: self.presence.color || "#6366f1" }}
              title="You"
            >
              {self.presence.avatar ? (
                <img
                  src={self.presence.avatar}
                  alt={self.presence.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(self.presence.name)
              )}
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
              <div className="bg-surface-raised border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <p className="text-xs font-medium text-ink">You</p>
                {self.presence.activeTab && (
                  <p className="text-[10px] text-ink-muted mt-0.5">
                    {TAB_LABELS[self.presence.activeTab] || self.presence.activeTab}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other collaborators */}
        {collaborators.map((collab) => (
          <div key={collab.connectionId} className="relative group">
            <div
              className="w-7 h-7 rounded-full border-2 border-surface flex items-center justify-center text-[10px] font-bold text-white"
              style={{
                backgroundColor:
                  collab.presence.color || collab.info?.color || "#94a3b8",
              }}
            >
              {collab.presence.avatar || collab.info?.avatar ? (
                <img
                  src={collab.presence.avatar || collab.info?.avatar || ""}
                  alt={collab.presence.name || collab.info?.name || "User"}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(
                  collab.presence.name || collab.info?.name || "?"
                )
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
              <div className="bg-surface-raised border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <p className="text-xs font-medium text-ink">
                  {collab.presence.name || collab.info?.name || "Anonymous"}
                </p>
                {collab.presence.activeTab && (
                  <p className="text-[10px] text-ink-muted mt-0.5">
                    Viewing:{" "}
                    {TAB_LABELS[collab.presence.activeTab] ||
                      collab.presence.activeTab}
                  </p>
                )}
                {collab.presence.currentPaperId && (
                  <p className="text-[10px] text-brand mt-0.5">
                    Paper #{collab.presence.currentPaperId}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Count badge */}
      {collaborators.length > 0 && (
        <span className="text-[10px] text-ink-muted font-medium flex items-center gap-1">
          <Users size={12} weight="bold" />
          {collaborators.length + 1}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
