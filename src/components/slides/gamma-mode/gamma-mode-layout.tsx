"use client";

import { CardStack } from "./card-stack";
import { CardOutlineSidebar } from "./card-outline-sidebar";
import { GammaToolbar } from "./gamma-toolbar";

export function GammaModeLayout() {
  return (
    <div className="flex flex-col h-full">
      {/* Top toolbar */}
      <GammaToolbar />

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
