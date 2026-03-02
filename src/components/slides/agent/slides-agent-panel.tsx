"use client";

import { cn } from "@/lib/utils";
import { useSlidesStore } from "@/stores/slides-store";
import { LearnMode } from "./learn-mode";
import { DraftMode } from "./draft-mode";
import { VisualMode } from "./visual-mode";

export function SlidesAgentPanel() {
  const agentMode = useSlidesStore((s) => s.agentMode);
  const setAgentMode = useSlidesStore((s) => s.setAgentMode);

  return (
    <div className="flex flex-col h-full">
      {/* Header with tabs */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-xs font-semibold text-ink mb-3 uppercase tracking-wider">
          AI Agent
        </h3>
        <div className="flex gap-1 p-0.5 rounded-lg bg-surface-raised">
          <button
            onClick={() => setAgentMode("learn")}
            className={cn(
              "flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              agentMode === "learn"
                ? "bg-brand text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Learn
          </button>
          <button
            onClick={() => setAgentMode("draft")}
            className={cn(
              "flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              agentMode === "draft"
                ? "bg-brand text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Draft
          </button>
          <button
            onClick={() => setAgentMode("visual")}
            className={cn(
              "flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              agentMode === "visual"
                ? "bg-brand text-white shadow-sm"
                : "text-ink-muted hover:text-ink"
            )}
          >
            Visual
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {agentMode === "learn" && <LearnMode />}
        {agentMode === "draft" && <DraftMode />}
        {agentMode === "visual" && <VisualMode />}
      </div>
    </div>
  );
}
