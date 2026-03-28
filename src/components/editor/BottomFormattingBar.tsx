"use client";

import type { Editor } from "@tiptap/react";
import {
  TextB,
  TextItalic,
  TextStrikethrough,
  TextH,
  Link as LinkIcon,
  Table,
  Code,
  CaretDown,
  HighlighterCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BottomFormattingBarProps {
  editor: Editor | null;
}

const HEADING_OPTIONS = [
  { label: "Text", level: 0 },
  { label: "H1", level: 1 },
  { label: "H2", level: 2 },
  { label: "H3", level: 3 },
];

export function BottomFormattingBar({ editor }: BottomFormattingBarProps) {
  const [showHeadings, setShowHeadings] = useState(false);

  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    cn(
      "p-2.5 rounded-lg transition-colors",
      isActive
        ? "text-ink"
        : "text-ink/40 hover:text-ink/80"
    );

  return (
    <div className="flex justify-center pb-3 px-4">
      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-raised/80 dark:bg-surface-raised backdrop-blur-sm shadow-sm border border-border-subtle">
        {/* Heading selector */}
        <div className="relative">
          <button
            onClick={() => setShowHeadings(!showHeadings)}
            className={cn(btnClass(editor.isActive("heading")), "flex items-center gap-0.5")}
            title="Heading"
          >
            <TextH size={20} weight="bold" />
            <CaretDown size={10} className="opacity-50" />
          </button>
          {showHeadings && (
            <div className="absolute bottom-full left-0 mb-2 w-28 rounded-xl bg-surface border border-border shadow-lg py-1.5 z-50">
              {!HEADING_OPTIONS.length ? null : HEADING_OPTIONS.map((opt) => (
                <button
                  key={opt.level}
                  onClick={() => {
                    if (opt.level === 0) {
                      editor.chain().focus().setParagraph().run();
                    } else {
                      editor.chain().focus().setHeading({ level: opt.level as 1 | 2 | 3 | 4 }).run();
                    }
                    setShowHeadings(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-sm hover:bg-surface-raised transition-colors",
                    (opt.level === 0 && !editor.isActive("heading")) ||
                      editor.isActive("heading", { level: opt.level })
                      ? "text-ink font-medium"
                      : "text-ink/60"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold (Cmd+B)"
        >
          <TextB size={20} weight="bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic (Cmd+I)"
        >
          <TextItalic size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive("strike"))}
          title="Strikethrough"
        >
          <TextStrikethrough size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={btnClass(editor.isActive("highlight"))}
          title="Highlight"
        >
          <HighlighterCircle size={20} />
        </button>

        <div className="w-px h-5 bg-border mx-0.5" />

        <button
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={btnClass(editor.isActive("link"))}
          title="Link (Cmd+K)"
        >
          <LinkIcon size={20} />
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className={btnClass(false)}
          title="Insert table"
        >
          <Table size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={btnClass(editor.isActive("codeBlock"))}
          title="Code block"
        >
          <Code size={20} />
        </button>
      </div>
    </div>
  );
}
