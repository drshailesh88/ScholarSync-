"use client";

import { X, Books, MagnifyingGlass, ChatCircleDots } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useResearchSidebar } from "@/hooks/useResearchSidebar";
import { useResearchStore } from "@/stores/research-store";
import { usePaperDetail } from "@/hooks/usePaperDetail";
import { usePaperChat } from "@/hooks/usePaperChat";
import { useEvidenceTable } from "@/hooks/useEvidenceTable";
import { SearchTab } from "./SearchTab";
import { LibraryTab } from "./LibraryTab";
import { ChatTab } from "./ChatTab";
import type { PaperResult } from "@/lib/research/types";
import { useCallback } from "react";

const TABS = [
  { key: "search" as const, label: "Search", icon: MagnifyingGlass },
  { key: "library" as const, label: "Library", icon: Books },
  { key: "chat" as const, label: "Chat", icon: ChatCircleDots },
];

export function ResearchSidebar() {
  const sidebar = useResearchSidebar();
  const store = useResearchStore();
  const detail = usePaperDetail();
  const chat = usePaperChat();
  const evidence = useEvidenceTable();

  const handleInsertCitation = useCallback((paper: PaperResult) => {
    window.dispatchEvent(
      new CustomEvent("scholarsync:insert-citation", {
        detail: {
          title: paper.title,
          authors: paper.authors,
          year: paper.year,
          journal: paper.journal,
          doi: paper.doi,
          pmid: paper.pmid,
        },
      })
    );
  }, []);

  // Collapsed state
  if (!sidebar.isOpen) {
    return (
      <button
        onClick={sidebar.openSidebar}
        className="shrink-0 w-6 h-full flex flex-col items-center justify-center gap-2 bg-surface border-l border-border hover:bg-surface-raised transition-colors"
        title="Open Research Sidebar (Cmd+Shift+L)"
      >
        <Books size={14} className="text-ink-muted" />
      </button>
    );
  }

  const libraryCount = store.libraryPapers.length;
  const chatPaperCount = chat.getScopedPapers().length;

  return (
    <aside
      className="shrink-0 glass-panel border-l border-border flex flex-col h-full relative"
      style={{ width: sidebar.sidebarWidth }}
    >
      {/* Resize handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-brand/20 transition-colors z-10"
        onMouseDown={sidebar.handleResize}
      />

      {/* Header with close button */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle">
        <span className="text-xs font-semibold text-ink">Literature Research</span>
        <button
          onClick={sidebar.closeSidebar}
          className="p-1 rounded hover:bg-surface-raised text-ink-muted hover:text-ink transition-colors"
          title="Close (Cmd+Shift+L)"
        >
          <X size={12} />
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {sidebar.activeTab === "search" && <SearchTab />}
        {sidebar.activeTab === "library" && (
          <LibraryTab
            papers={store.libraryPapers}
            selectedPaperIds={evidence.selectedPaperIds}
            onTogglePaperSelection={evidence.togglePaperSelection}
            onViewDetail={(id) => {
              sidebar.setActiveTab("search");
              detail.openPaperDetail(id);
            }}
            onInsertCitation={handleInsertCitation}
            onRemoveFromLibrary={store.removeFromLibrary}
            onBuildEvidenceTable={() => {
              sidebar.setActiveTab("search");
            }}
          />
        )}
        {sidebar.activeTab === "chat" && (
          <ChatTab
            chatScope={chat.chatScope}
            onScopeChange={chat.setChatScope}
            messages={chat.chatMessages}
            isChatLoading={chat.isChatLoading}
            onSendMessage={chat.sendMessage}
            onClearChat={chat.clearChat}
            scopeLabel={chat.getScopeLabel()}
            hasSelectedPaper={!!store.selectedPaperId}
            selectedPaperLabel={
              store.selectedPaperDetail?.paper
                ? `${store.selectedPaperDetail.paper.authors?.[0]?.split(" ").pop() || "Unknown"} ${store.selectedPaperDetail.paper.year}`
                : undefined
            }
            selectedPaperCount={evidence.selectedPaperIds.length}
            libraryPaperCount={libraryCount}
          />
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="flex border-t border-border-subtle">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = sidebar.activeTab === tab.key;
          const badgeCount =
            tab.key === "library" ? libraryCount : undefined;

          return (
            <button
              key={tab.key}
              onClick={() => sidebar.setActiveTab(tab.key)}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors relative",
                isActive
                  ? "text-brand bg-brand/5"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
              )}
            >
              <Icon size={14} weight={isActive ? "fill" : "regular"} />
              <span className="text-[9px] font-medium">{tab.label}</span>
              {badgeCount !== undefined && badgeCount > 0 && (
                <span className="absolute top-1 right-1/4 w-3.5 h-3.5 rounded-full bg-brand text-white text-[8px] font-bold flex items-center justify-center">
                  {badgeCount > 99 ? "99" : badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
