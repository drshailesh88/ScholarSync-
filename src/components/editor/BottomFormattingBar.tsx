"use client";

import type { Editor } from "@tiptap/react";
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  TextH,
  ListBullets,
  ListNumbers,
  Link as LinkIcon,
  Table,
  Code,
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
  { label: "H4", level: 4 },
];

export function BottomFormattingBar({ editor }: BottomFormattingBarProps) {
  const [showHeadings, setShowHeadings] = useState(false);

  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    cn(
      "p-2 rounded-md transition-colors",
      isActive
        ? "text-brand"
        : "text-ink-muted/50 hover:text-ink-muted"
    );

  return (
    <div className="flex items-center justify-center gap-0.5 px-3 py-1.5 border-t border-border-subtle bg-surface/80 backdrop-blur-sm">
      {/* Heading selector */}
      <div className="relative">
        <button
          onClick={() => setShowHeadings(!showHeadings)}
          className={btnClass(editor.isActive("heading"))}
          title="Heading"
        >
          <TextH size={18} />
        </button>
        {showHeadings && (
          <div className="absolute bottom-full left-0 mb-2 w-28 rounded-lg bg-surface border border-border shadow-lg py-1 z-50">
            {HEADING_OPTIONS.map((opt) => (
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
                  "w-full text-left px-3 py-1.5 text-xs hover:bg-surface-raised transition-colors",
                  (opt.level === 0 && !editor.isActive("heading")) ||
                    editor.isActive("heading", { level: opt.level })
                    ? "text-brand font-medium"
                    : "text-ink"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-4 bg-border-subtle mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
        title="Bold (Cmd+B)"
      >
        <TextB size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
        title="Italic (Cmd+I)"
      >
        <TextItalic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btnClass(editor.isActive("underline"))}
        title="Underline (Cmd+U)"
      >
        <TextUnderline size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive("strike"))}
        title="Strikethrough"
      >
        <TextStrikethrough size={18} />
      </button>

      <div className="w-px h-4 bg-border-subtle mx-1" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
        title="Bullet list"
      >
        <ListBullets size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
        title="Numbered list"
      >
        <ListNumbers size={18} />
      </button>

      <div className="w-px h-4 bg-border-subtle mx-1" />

      <button
        onClick={() => {
          const url = window.prompt("Enter URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={btnClass(editor.isActive("link"))}
        title="Link (Cmd+K)"
      >
        <LinkIcon size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btnClass(editor.isActive("codeBlock"))}
        title="Code block"
      >
        <Code size={18} />
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
        <Table size={18} />
      </button>
    </div>
  );
}
