"use client";

import { CardStack } from "./card-stack";
import { CardOutlineSidebar } from "./card-outline-sidebar";
import { GammaToolbar } from "./gamma-toolbar";
import { GammaAgentPanel } from "./gamma-agent-panel";
import { OutlineGenerator } from "./outline-generator";
import { useSlidesStore } from "@/stores/slides-store";

export function GammaModeLayout() {
  const slides = useSlidesStore((s) => s.slides);
  const agentPanelOpen = useSlidesStore((s) => s.agentPanelOpen);

  return (
    <div className="flex flex-col h-full">
      {/* Top toolbar */}
      <GammaToolbar />

      {slides.length === 0 ? (
        <OutlineGenerator />
      ) : (
        /* Three-panel layout: Sidebar | Card Stack | Agent Panel */
        <div className="flex-1 flex min-h-0">
          {/* Left sidebar — card outline */}
          <div className="w-56 shrink-0 border-r border-border bg-surface overflow-y-auto">
            <CardOutlineSidebar />
          </div>

          {/* Center — scrollable card stack */}
          <div className="flex-1 overflow-y-auto bg-surface-raised/30">
            <CardStack />
          </div>

          {/* Right panel — AI agent */}
          {agentPanelOpen && (
            <div className="w-[360px] shrink-0 border-l border-border">
              <GammaAgentPanel />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
