"use client";

import { useSlidesStore } from "@/stores/slides-store";
import { ModeSelector } from "../mode-selector";
import { CardStack } from "./card-stack";
import { CardOutlineSidebar } from "./card-outline-sidebar";

export function GammaModeLayout() {
  const mode = useSlidesStore((s) => s.mode);
  const setMode = useSlidesStore((s) => s.setMode);
  const slides = useSlidesStore((s) => s.slides);
  const setIsPresenting = useSlidesStore((s) => s.setIsPresenting);

  return (
    <div className="flex flex-col h-full">
      {/* Top toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface shrink-0">
        <ModeSelector mode={mode} onModeChange={setMode} />
        <div className="flex-1" />
        <span className="text-xs text-ink-muted">
          {slides.length} card{slides.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => setIsPresenting(true)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 transition-colors"
        >
          Present
        </button>
      </div>

      {/* Three-panel layout: Sidebar | Card Stack | Agent Panel */}
      <div className="flex-1 flex min-h-0">
        {/* Left sidebar — card outline */}
        <div className="w-56 shrink-0 border-r border-border bg-surface overflow-y-auto">
          <CardOutlineSidebar />
        </div>

        {/* Center — scrollable card stack */}
        <div className="flex-1 overflow-y-auto bg-surface-raised/30">
          <CardStack />
        </div>

        {/* Right panel — AI agent (Phase 2) */}
        {/* Will be toggled on/off */}
      </div>
    </div>
  );
}
