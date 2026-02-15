"use client";

import { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import type { Instance as TippyInstance } from "tippy.js";
import type { SuggestionProps, SuggestionKeyDownProps } from "@tiptap/suggestion";
import type { SlashCommandItem } from "./extensions/slash-commands";
import {
  TextH,
  ListBullets,
  ListNumbers,
  CheckSquare,
  Quotes,
  Minus,
  Code,
  Table,
  Image,
  Sparkle,
  Hash,
  Paragraph,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  basic: "BASIC BLOCKS",
  academic: "ACADEMIC",
  ai: "AI TOOLS",
  tools: "DOCUMENT TOOLS",
};

const ICON_MAP: Record<string, typeof Paragraph> = {
  paragraph: Paragraph,
  h1: TextH,
  h2: TextH,
  h3: TextH,
  h4: TextH,
  bullet: ListBullets,
  numbered: ListNumbers,
  checklist: CheckSquare,
  quote: Quotes,
  divider: Minus,
  code: Code,
  table: Table,
  image: Image,
  ai: Sparkle,
  tools: Hash,
};

interface SlashMenuListProps {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
}

export interface SlashMenuListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export const SlashMenuList = forwardRef<SlashMenuListRef, SlashMenuListProps>(
  function SlashMenuList({ items, command }, ref) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    // Scroll selected item into view
    useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;
      const selected = container.querySelector("[data-selected=true]");
      if (selected) {
        selected.scrollIntoView({ block: "nearest" });
      }
    }, [selectedIndex]);

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];
        if (item) command(item);
      },
      [items, command]
    );

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: SuggestionKeyDownProps) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedIndex((i) => (i - 1 + items.length) % items.length);
          return true;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedIndex((i) => (i + 1) % items.length);
          return true;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          selectItem(selectedIndex);
          return true;
        }
        if (event.key === "Escape") {
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-3 w-80">
          <p className="text-xs text-ink-muted text-center py-4">
            No commands found
          </p>
        </div>
      );
    }

    let lastCategory = "";

    return (
      <div
        ref={scrollRef}
        className="bg-surface border border-border rounded-lg shadow-lg p-1.5 w-80 max-h-[400px] overflow-y-auto"
      >
        {items.map((item, idx) => {
          const showCategory = item.category !== lastCategory;
          lastCategory = item.category;
          const IconComponent = ICON_MAP[item.icon] || Paragraph;

          return (
            <div key={`${item.category}-${item.title}`}>
              {showCategory && (
                <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider px-2.5 pt-3 pb-1.5">
                  {CATEGORY_LABELS[item.category] || item.category}
                </p>
              )}
              <button
                data-selected={idx === selectedIndex}
                onClick={() => selectItem(idx)}
                className={cn(
                  "w-full flex items-center gap-3 px-2.5 py-2 rounded-md text-left transition-colors",
                  idx === selectedIndex
                    ? "bg-brand/10 text-brand"
                    : "text-ink hover:bg-surface-raised"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                    idx === selectedIndex
                      ? "bg-brand/15"
                      : "bg-surface-raised"
                  )}
                >
                  <IconComponent
                    size={16}
                    weight={item.icon === "ai" ? "fill" : "regular"}
                    className={
                      idx === selectedIndex ? "text-brand" : "text-ink-muted"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    {item.shortcut && (
                      <span className="text-[10px] text-ink-muted ml-2 shrink-0">
                        {item.shortcut}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ink-muted truncate">
                    {item.description}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);

/**
 * Creates the suggestion render function for the slash commands extension.
 */
export function createSlashMenuRenderer() {
  let component: ReactRenderer<SlashMenuListRef> | null = null;
  let popup: TippyInstance[] | null = null;

  return {
    onStart: (props: SuggestionProps) => {
      component = new ReactRenderer(SlashMenuList, {
        props: {
          items: props.items,
          command: (item: SlashCommandItem) => {
            props.command(item);
          },
        },
        editor: props.editor,
      });

      if (!props.clientRect) return;

      popup = tippy("body", {
        getReferenceClientRect: props.clientRect as () => DOMRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
        animation: "shift-toward-subtle",
        offset: [0, 4],
      });
    },

    onUpdate(props: SuggestionProps) {
      component?.updateProps({
        items: props.items,
        command: (item: SlashCommandItem) => {
          props.command(item);
        },
      });

      if (popup && props.clientRect) {
        popup[0]?.setProps({
          getReferenceClientRect: props.clientRect as () => DOMRect,
        });
      }
    },

    onKeyDown(props: SuggestionKeyDownProps) {
      if (props.event.key === "Escape") {
        popup?.[0]?.hide();
        return true;
      }
      return component?.ref?.onKeyDown(props) ?? false;
    },

    onExit() {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
}
