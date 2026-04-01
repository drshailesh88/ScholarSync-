"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ExploreTab } from "./ExploreTabs";

const TABS_IN_ORDER: ExploreTab[] = ["academic", "web", "news", "discussions", "more"];

export interface ExploreKeyboardState {
  highlightedIndex: number;
  selectedIndices: Set<number>;
  shortcutsOverlayOpen: boolean;
}

export interface ExploreKeyboardActions {
  onSave?: (index: number) => void;
  onOpen?: (index: number) => void;
  onSynthesize?: () => void;
  onInfo?: (index: number) => void;
  onBlock?: (index: number) => void;
  onTabChange: (tab: ExploreTab) => void;
  onSearch: () => void;
  focusSearchBar: () => void;
}

export function useExploreKeyboard(
  resultCount: number,
  activeTab: ExploreTab,
  hasSearched: boolean,
  actions: ExploreKeyboardActions
) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    () => new Set()
  );
  const [shortcutsOverlayOpen, setShortcutsOverlayOpen] = useState(false);
  const lastShiftAnchor = useRef(-1);

  // Reset highlight when results or tab change
  useEffect(() => {
    setHighlightedIndex(-1); // eslint-disable-line react-hooks/set-state-in-effect
    setSelectedIndices(new Set());  
    lastShiftAnchor.current = -1;  
  }, [resultCount, activeTab]);  

  const isInputFocused = useCallback(() => {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    return (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      (el as HTMLElement).isContentEditable
    );
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Never intercept when overlay is open (except to close it)
      if (shortcutsOverlayOpen && e.key !== "?" && e.key !== "Escape") return;

      if (e.key === "Escape" && shortcutsOverlayOpen) {
        setShortcutsOverlayOpen(false);
        e.preventDefault();
        return;
      }

      // Don't intercept when user is typing in an input
      if (isInputFocused()) {
        // Exception: Escape blurs the input
        if (e.key === "Escape") {
          (document.activeElement as HTMLElement)?.blur();
          e.preventDefault();
        }
        return;
      }

      // Don't intercept modified keys (Cmd/Ctrl/Alt) except for Shift+arrows
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (!hasSearched) {
        // Only / to focus search on landing
        if (e.key === "/") {
          e.preventDefault();
          actions.focusSearchBar();
        }
        if (e.key === "?") {
          e.preventDefault();
          setShortcutsOverlayOpen((prev) => !prev);
        }
        return;
      }

      switch (e.key) {
        // ── Result navigation ──
        case "j":
        case "ArrowDown": {
          if (e.shiftKey && e.key === "ArrowDown") {
            // Shift+Down: extend selection downward
            e.preventDefault();
            const next = Math.min(highlightedIndex + 1, resultCount - 1);
            setHighlightedIndex(next);
            setSelectedIndices((prev) => {
              const s = new Set(prev);
              s.add(next);
              return s;
            });
            return;
          }
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < resultCount - 1 ? prev + 1 : prev
          );
          break;
        }
        case "k":
        case "ArrowUp": {
          if (e.shiftKey && e.key === "ArrowUp") {
            // Shift+Up: extend selection upward
            e.preventDefault();
            const prev2 = Math.max(highlightedIndex - 1, 0);
            setHighlightedIndex(prev2);
            setSelectedIndices((prev) => {
              const s = new Set(prev);
              s.add(prev2);
              return s;
            });
            return;
          }
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        }

        // ── Search focus ──
        case "/": {
          e.preventDefault();
          actions.focusSearchBar();
          break;
        }

        // ── Tab switching (1-4 numeric) ──
        case "1":
        case "2":
        case "3":
        case "4": {
          e.preventDefault();
          const tabIndex = Number(e.key) - 1;
          actions.onTabChange(TABS_IN_ORDER[tabIndex]);
          break;
        }

        // ── Tab cycling ──
        case "]": {
          e.preventDefault();
          const currentIdx = TABS_IN_ORDER.indexOf(activeTab);
          const nextIdx = (currentIdx + 1) % TABS_IN_ORDER.length;
          actions.onTabChange(TABS_IN_ORDER[nextIdx]);
          break;
        }
        case "[": {
          e.preventDefault();
          const currentIdx2 = TABS_IN_ORDER.indexOf(activeTab);
          const prevIdx =
            (currentIdx2 - 1 + TABS_IN_ORDER.length) % TABS_IN_ORDER.length;
          actions.onTabChange(TABS_IN_ORDER[prevIdx]);
          break;
        }

        // ── Action shortcuts ──
        case "s":
        case "S": {
          if (highlightedIndex >= 0) {
            e.preventDefault();
            actions.onSave?.(highlightedIndex);
          }
          break;
        }
        case "o":
        case "O": {
          if (highlightedIndex >= 0) {
            e.preventDefault();
            actions.onOpen?.(highlightedIndex);
          }
          break;
        }
        case "q":
        case "Q": {
          e.preventDefault();
          actions.onSynthesize?.();
          break;
        }
        case "i":
        case "I": {
          if (highlightedIndex >= 0) {
            e.preventDefault();
            actions.onInfo?.(highlightedIndex);
          }
          break;
        }
        case "b":
        case "B": {
          if (highlightedIndex >= 0) {
            e.preventDefault();
            actions.onBlock?.(highlightedIndex);
          }
          break;
        }

        // ── Selection ──
        case "x":
        case "X": {
          if (highlightedIndex >= 0) {
            e.preventDefault();
            setSelectedIndices((prev) => {
              const s = new Set(prev);
              if (s.has(highlightedIndex)) {
                s.delete(highlightedIndex);
              } else {
                s.add(highlightedIndex);
              }
              return s;
            });
            lastShiftAnchor.current = highlightedIndex;
          }
          break;
        }

        // ── Keyboard shortcuts overlay ──
        case "?": {
          e.preventDefault();
          setShortcutsOverlayOpen((prev) => !prev);
          break;
        }

        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    highlightedIndex,
    resultCount,
    activeTab,
    hasSearched,
    shortcutsOverlayOpen,
    actions,
    isInputFocused,
  ]);

  return {
    highlightedIndex,
    selectedIndices,
    shortcutsOverlayOpen,
    setShortcutsOverlayOpen,
    setHighlightedIndex,
    clearSelection: useCallback(() => setSelectedIndices(new Set()), []),
  };
}
