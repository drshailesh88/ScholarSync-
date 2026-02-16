/**
 * Hook for managing research sidebar state and keyboard shortcuts.
 */

"use client";

import { useEffect, useCallback } from "react";
import { useResearchStore } from "@/stores/research-store";

export function useResearchSidebar() {
  const {
    isOpen,
    activeTab,
    sidebarWidth,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setActiveTab,
    setSidebarWidth,
  } = useResearchStore();

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      // Cmd/Ctrl+Shift+L — Toggle sidebar
      if (mod && e.shiftKey && e.key === "L") {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // Cmd/Ctrl+Shift+F — Focus search input (when sidebar open)
      if (mod && e.shiftKey && e.key === "F" && isOpen) {
        e.preventDefault();
        setActiveTab("search");
        // Focus the search input after a tick
        requestAnimationFrame(() => {
          const input = document.querySelector<HTMLTextAreaElement>(
            "[data-research-search-input]"
          );
          input?.focus();
        });
        return;
      }

      // Esc — Close detail panel or sidebar
      if (e.key === "Escape" && isOpen) {
        const { selectedPaperId, selectPaper, activeEvidenceTable, setActiveEvidenceTable } =
          useResearchStore.getState();
        if (selectedPaperId) {
          selectPaper(null);
        } else if (activeEvidenceTable) {
          setActiveEvidenceTable(null);
        } else {
          closeSidebar();
        }
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleSidebar, closeSidebar, setActiveTab]);

  // Resize handler
  const handleResize = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = sidebarWidth;

      function onMouseMove(moveEvent: MouseEvent) {
        const delta = startX - moveEvent.clientX;
        setSidebarWidth(startWidth + delta);
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [sidebarWidth, setSidebarWidth]
  );

  return {
    isOpen,
    activeTab,
    sidebarWidth,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setActiveTab,
    handleResize,
  };
}
