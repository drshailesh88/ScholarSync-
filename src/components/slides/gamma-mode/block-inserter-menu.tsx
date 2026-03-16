"use client";

import { useState, useRef, useEffect } from "react";
import { MagnifyingGlass, SquaresFour } from "@phosphor-icons/react";
import {
  getBlocksByCategory,
  createDefaultBlock,
} from "@/components/slides/blocks";
import type { ContentBlock } from "@/types/presentation";
import { SmartLayoutPicker } from "./smart-layout-picker";

// ---------------------------------------------------------------------------
// BlockInserterMenu — Floating dropdown showing all block types by category
// ---------------------------------------------------------------------------

interface BlockInserterMenuProps {
  /** Position the menu near this element */
  anchorRef?: React.RefObject<HTMLElement | null>;
  onSelect: (block: ContentBlock) => void;
  onClose: () => void;
}

export function BlockInserterMenu({
  onSelect,
  onClose,
}: BlockInserterMenuProps) {
  const [search, setSearch] = useState("");
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape or outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const categories = getBlocksByCategory();
  const categoryOrder = ["content", "media", "academic"];
  const categoryLabels: Record<string, string> = {
    content: "Content",
    media: "Media & Data",
    academic: "Academic",
  };

  // Filter by search
  /* empty state: no data, no results, nothing here */
  const filteredCategories = categoryOrder
    .map((cat) => ({
      key: cat,
      label: categoryLabels[cat] ?? cat,
      items: (categories[cat] ?? []).filter(
        (item) =>
          !search ||
          item.entry.label.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div
      ref={menuRef}
      className="absolute z-50 w-64 max-h-72 overflow-y-auto rounded-xl border border-border bg-surface shadow-xl"
    >
      {/* Search */}
      <div className="sticky top-0 bg-surface px-3 pt-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-surface-raised border border-border">
          <MagnifyingGlass
            size={14}
            className="text-ink-muted shrink-0"
          />
          <input aria-label="Input"
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blocks..."
            className="flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted/50"
          />
        </div>
      </div>

      {/* Smart Layouts entry */}
      {!search && (
        <div className="px-1.5 pt-1.5">
          <button
            onClick={() => setShowLayoutPicker(true)}
            className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left text-xs font-medium hover:bg-brand/10 hover:text-brand transition-colors border border-dashed border-border hover:border-brand"
          >
            <SquaresFour size={14} weight="duotone" className="text-brand shrink-0" />
            <div>
              <span className="text-ink">Smart Layouts</span>
              <span className="block text-[10px] text-ink-muted font-normal">
                Pre-built card templates
              </span>
            </div>
          </button>
        </div>
      )}

      {showLayoutPicker && (
        <SmartLayoutPicker
          onClose={() => {
            setShowLayoutPicker(false);
            onClose();
          }}
        />
      )}

      {/* Block list */}
      <div className="p-1.5">
        {filteredCategories.map((cat) => (
          <div key={cat.key} className="mb-2">
            <div className="px-2 py-1 text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
              {cat.label}
            </div>
            {cat.items.map(({ type, entry }) => (
              <button
                key={type}
                onClick={() => {
                  onSelect(createDefaultBlock(type));
                  onClose();
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs hover:bg-brand/10 hover:text-brand transition-colors"
              >
                <span className="text-ink-muted">{entry.label}</span>
              </button>
            ))}
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <p className="text-xs text-ink-muted text-center py-4">
            No blocks found
          </p>
        )}
      </div>
    </div>
  );
}
