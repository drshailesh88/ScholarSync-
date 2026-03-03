"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  ListBullets,
  Columns,
  Clock,
  NumberCircleOne,
  ChartBar,
  ChartLine,
  Quotes,
  Megaphone,
  TreeStructure,
  Image,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { SMART_LAYOUTS } from "./smart-layout-templates";
import { useSlidesStore } from "@/stores/slides-store";
import type { SlideLayout } from "@/types/presentation";

// ---------------------------------------------------------------------------
// SmartLayoutPicker — grid of pre-built layout templates
// Replaces the active slide's content blocks on selection.
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, Icon> = {
  ListBullets,
  Columns,
  Clock,
  NumberCircleOne,
  ChartBar,
  ChartLine,
  Quotes,
  Megaphone,
  TreeStructure,
  Image,
};

interface SmartLayoutPickerProps {
  onClose: () => void;
}

export function SmartLayoutPicker({ onClose }: SmartLayoutPickerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const activeSlide = useSlidesStore((s) => s.getActiveSlide());
  const updateSlide = useSlidesStore((s) => s.updateSlide);

  // Close on Escape or outside click
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
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

  const handleSelect = useCallback(
    (layoutId: string) => {
      if (!activeSlide) return;
      const template = SMART_LAYOUTS.find((t) => t.id === layoutId);
      if (!template) return;
      // Map smart layout IDs to the best-matching slide layout for presenter mode
      const LAYOUT_MAP: Record<string, SlideLayout> = {
        two_column: "two_column",
        chart_with_caption: "chart_slide",
        image_with_text: "image_text",
        quote_highlight: "quote_slide",
        methodology: "title_content",
        big_number: "title_content",
        bullets_with_header: "title_content",
        timeline: "title_content",
        steps: "title_content",
        callout_key_finding: "title_content",
      };
      const layout = LAYOUT_MAP[layoutId] ?? "title_content";
      updateSlide(activeSlide.id, { contentBlocks: template.generate(), layout });
      onClose();
    },
    [activeSlide, updateSlide, onClose],
  );

  return (
    <div
      ref={panelRef}
      className="absolute z-50 w-80 max-h-96 overflow-y-auto rounded-xl border border-border bg-surface shadow-xl"
    >
      {/* Header */}
      <div className="sticky top-0 bg-surface px-4 pt-3 pb-2 border-b border-border">
        <h3 className="text-xs font-semibold text-ink">Smart Layouts</h3>
        <p className="text-[10px] text-ink-muted mt-0.5">
          Replace this card&apos;s content with a pre-built layout
        </p>
      </div>

      {/* Layout grid */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {SMART_LAYOUTS.map((layout) => {
          const IconComponent = ICON_MAP[layout.icon];
          return (
            <button
              key={layout.id}
              onClick={() => handleSelect(layout.id)}
              className="flex flex-col items-start gap-1 p-3 rounded-lg border border-border hover:border-brand hover:bg-brand/5 transition-colors text-left group"
            >
              <div className="flex items-center gap-2">
                {IconComponent && (
                  <IconComponent
                    size={16}
                    weight="duotone"
                    className="text-ink-muted group-hover:text-brand transition-colors"
                  />
                )}
                <span className="text-xs font-medium text-ink group-hover:text-brand transition-colors">
                  {layout.label}
                </span>
              </div>
              <span className="text-[10px] text-ink-muted leading-tight">
                {layout.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
