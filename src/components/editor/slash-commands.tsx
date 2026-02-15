"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import type { Instance as TippyInstance } from "tippy.js";
import {
  TextHOne,
  TextHTwo,
  TextHThree,
  ListBullets,
  ListNumbers,
  Quotes,
  Sparkle,
  MagnifyingGlass,
  BookOpen,
  ShieldCheck,
  Minus,
} from "@phosphor-icons/react";

interface CommandItem {
  title: string;
  description: string;
  icon: typeof TextHOne;
  command: (props: { editor: any; range: any }) => void;
  category: "formatting" | "ai" | "insert";
}

const commands: CommandItem[] = [
  // Formatting
  {
    title: "Heading 1",
    description: "Large section heading",
    icon: TextHOne,
    category: "formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: TextHTwo,
    category: "formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: TextHThree,
    category: "formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create an unordered list",
    icon: ListBullets,
    category: "formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create an ordered list",
    icon: ListNumbers,
    category: "formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Blockquote",
    description: "Add a block quote",
    icon: Quotes,
    category: "formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Divider",
    description: "Insert a horizontal rule",
    icon: Minus,
    category: "formatting",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  // AI Commands
  {
    title: "AI Continue Writing",
    description: "Let AI continue from your cursor",
    icon: Sparkle,
    category: "ai",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      // Dispatch custom event for the studio page to handle
      window.dispatchEvent(new CustomEvent("scholarsync:ai-action", { detail: { action: "continue", context: editor.getText() } }));
    },
  },
  {
    title: "AI Summarize Selection",
    description: "Summarize selected text",
    icon: Sparkle,
    category: "ai",
    command: ({ editor, range }) => {
      const selection = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );
      editor.chain().focus().deleteRange(range).run();
      window.dispatchEvent(new CustomEvent("scholarsync:ai-action", { detail: { action: "summarize", context: selection || editor.getText() } }));
    },
  },
  {
    title: "Find Sources",
    description: "Search for related papers",
    icon: MagnifyingGlass,
    category: "ai",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      window.dispatchEvent(new CustomEvent("scholarsync:ai-action", { detail: { action: "find-sources", context: editor.getText() } }));
    },
  },
  {
    title: "Add Citation",
    description: "Insert a citation from your library",
    icon: BookOpen,
    category: "ai",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      window.dispatchEvent(new CustomEvent("scholarsync:open-citation-dialog"));
    },
  },
  {
    title: "Check Integrity",
    description: "Run plagiarism & AI detection check",
    icon: ShieldCheck,
    category: "ai",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      window.dispatchEvent(new CustomEvent("scholarsync:ai-action", { detail: { action: "integrity-check", context: editor.getText() } }));
    },
  },
];

// --- Command List Component ---

interface CommandListProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

function CommandList({ items, command }: CommandListProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) command(item);
    },
    [items, command]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + items.length) % items.length);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % items.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        selectItem(selectedIndex);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selectedIndex, items.length, selectItem]);

  if (items.length === 0) {
    return (
      <div className="glass-panel rounded-xl border border-border shadow-xl p-3 min-w-[280px]">
        <p className="text-xs text-ink-muted text-center py-2">No matching commands</p>
      </div>
    );
  }

  let lastCategory = "";

  return (
    <div
      ref={containerRef}
      className="glass-panel rounded-xl border border-border shadow-xl p-1.5 min-w-[280px] max-h-[320px] overflow-y-auto"
    >
      {items.map((item, idx) => {
        const showCategory = item.category !== lastCategory;
        lastCategory = item.category;
        const Icon = item.icon;

        return (
          <div key={item.title}>
            {showCategory && (
              <p className="text-[10px] font-medium text-ink-muted uppercase tracking-wider px-2 pt-2 pb-1">
                {item.category === "formatting" ? "Format" : item.category === "ai" ? "AI Actions" : "Insert"}
              </p>
            )}
            <button
              onClick={() => selectItem(idx)}
              className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-colors ${
                idx === selectedIndex
                  ? "bg-brand/10 text-brand"
                  : "text-ink hover:bg-surface-raised"
              }`}
            >
              <Icon size={16} className={idx === selectedIndex ? "text-brand" : "text-ink-muted"} />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-[10px] text-ink-muted">{item.description}</p>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

// --- Tiptap Extension ---

export const SlashCommands = Extension.create({
  name: "slashCommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        items: ({ query }: { query: string }) => {
          return commands.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          );
        },
        render: () => {
          let component: ReactRenderer | null = null;
          let popup: TippyInstance[] | null = null;

          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(CommandList, {
                props: {
                  items: props.items,
                  command: (item: CommandItem) => {
                    item.command({ editor: props.editor, range: props.range });
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
              });
            },
            onUpdate(props: SuggestionProps) {
              component?.updateProps({
                items: props.items,
                command: (item: CommandItem) => {
                  item.command({ editor: props.editor, range: props.range });
                },
              });
              if (popup && props.clientRect) {
                popup[0]?.setProps({
                  getReferenceClientRect: props.clientRect as () => DOMRect,
                });
              }
            },
            onKeyDown(props: { event: KeyboardEvent }) {
              if (props.event.key === "Escape") {
                popup?.[0]?.hide();
                return true;
              }
              return false;
            },
            onExit() {
              popup?.[0]?.destroy();
              component?.destroy();
            },
          };
        },
      } satisfies Partial<SuggestionOptions>,
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
