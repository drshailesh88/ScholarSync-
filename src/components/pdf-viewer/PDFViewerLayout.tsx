"use client";

import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePDFStore } from "@/stores/pdf-store";
import { PDFViewerComponent } from "./PDFViewer";
import { PDFChatPanel } from "./PDFChatPanel";

interface PDFViewerLayoutProps {
  /** The editor content to render in the right panel (when in pdf-editor mode) */
  editorSlot?: React.ReactNode;
  className?: string;
}

/**
 * Layout manager for the PDF viewer system.
 * Handles three configurations:
 * - pdf-editor: PDF left, Tiptap editor right
 * - pdf-chat: PDF left, AI chat right
 * - pdf-chat-editor: PDF left, chat center, editor right (wide screens)
 */
export function PDFViewerLayout({
  editorSlot,
  className,
}: PDFViewerLayoutProps) {
  const { isOpen, layout, currentPaperId, paperMetadata, currentSelection, navigateTo } =
    usePDFStore();

  // Keyboard shortcut: Cmd+Shift+P to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        usePDFStore.getState().closePDF();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigateToPage = useCallback(
    (page: number, startOffset?: number, endOffset?: number) => {
      navigateTo({
        pageNumber: page,
        highlightSpan:
          startOffset != null && endOffset != null
            ? { startOffset, endOffset }
            : undefined,
      });
    },
    [navigateTo]
  );

  if (!isOpen) {
    // When PDF is closed, render only the editor at full width
    return <>{editorSlot}</>;
  }

  return (
    <div className={cn("flex h-full w-full", className)}>
      {/* PDF Viewer — always on the left */}
      <div
        className={cn(
          "flex-1 min-w-0 border-r border-border",
          layout === "pdf-chat-editor" ? "w-[40%]" : "w-1/2"
        )}
      >
        <PDFViewerComponent />
      </div>

      {/* Right panel content depends on layout mode */}
      {layout === "pdf-chat" && currentPaperId && (
        <div className="w-[380px] min-w-[320px] max-w-[440px] flex flex-col">
          <PDFChatPanel
            paperId={currentPaperId}
            paperMetadata={paperMetadata}
            currentSelection={currentSelection}
            onNavigateToPage={handleNavigateToPage}
          />
        </div>
      )}

      {layout === "pdf-editor" && (
        <div className="flex-1 min-w-0">{editorSlot}</div>
      )}

      {layout === "pdf-chat-editor" && (
        <>
          {/* Chat panel in the middle */}
          <div className="w-[340px] min-w-[280px] border-r border-border flex flex-col">
            {currentPaperId && (
              <PDFChatPanel
                paperId={currentPaperId}
                paperMetadata={paperMetadata}
                currentSelection={currentSelection}
                onNavigateToPage={handleNavigateToPage}
              />
            )}
          </div>
          {/* Editor on the right */}
          <div className="flex-1 min-w-0">{editorSlot}</div>
        </>
      )}
    </div>
  );
}
