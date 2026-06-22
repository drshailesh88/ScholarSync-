"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import type { Instance as TippyInstance } from "tippy.js";
import type {
  SuggestionProps,
  SuggestionKeyDownProps,
} from "@tiptap/suggestion";
import type { HashtagSuggestionItem } from "./extensions/hashtag-suggestion";
import { Hash, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface HashtagMenuListProps {
  items: HashtagSuggestionItem[];
  command: (item: HashtagSuggestionItem) => void;
}

export interface HashtagMenuListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export const HashtagMenuList = forwardRef<
  HashtagMenuListRef,
  HashtagMenuListProps
>(function HashtagMenuList({ items, command }, ref) {
  // Reset selectedIndex during render when items identity changes (React "adjusting
  // state while rendering" pattern — avoids setState-in-effect).
  const [prevItems, setPrevItems] = useState(items);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (prevItems !== items) {
    setPrevItems(items);
    setSelectedIndex(0);
  }

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
      // On Space: create new hashtag with whatever is typed
      if (event.key === " ") {
        event.preventDefault();
        // Use the first item (which is the "create new" option if no exact match)
        if (items.length > 0) {
          selectItem(0);
        }
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      ref={scrollRef}
      className="bg-surface border border-border rounded-lg shadow-lg p-1.5 w-64 max-h-[240px] overflow-y-auto"
    >
      {items.map((item, idx) => (
        <button
          key={item.tag}
          data-selected={idx === selectedIndex}
          onClick={() => selectItem(idx)}
          className={cn(
            "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-colors",
            idx === selectedIndex
              ? "bg-brand/10 text-brand"
              : "text-ink hover:bg-surface-raised"
          )}
        >
          <div
            className={cn(
              "w-7 h-7 rounded-md flex items-center justify-center shrink-0",
              idx === selectedIndex ? "bg-brand/15" : "bg-surface-raised"
            )}
          >
            {item.isNew ? (
              <Plus
                size={14}
                weight="bold"
                className={
                  idx === selectedIndex ? "text-brand" : "text-ink-muted"
                }
              />
            ) : (
              <Hash
                size={14}
                weight="bold"
                className={
                  idx === selectedIndex ? "text-brand" : "text-ink-muted"
                }
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {item.isNew ? `Create #${item.tag}` : `#${item.tag}`}
            </p>
            {!item.isNew && item.count > 0 && (
              <p className="text-[11px] text-ink-muted">
                {item.count} {item.count === 1 ? "doc" : "docs"}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
});

/**
 * Creates the suggestion render function for the hashtag suggestion extension.
 */
export function createHashtagMenuRenderer() {
  let component: ReactRenderer<HashtagMenuListRef> | null = null;
  let popup: TippyInstance[] | null = null;

  return {
    onStart: (props: SuggestionProps) => {
      component = new ReactRenderer(HashtagMenuList, {
        props: {
          items: props.items,
          command: (item: HashtagSuggestionItem) => {
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
        command: (item: HashtagSuggestionItem) => {
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
