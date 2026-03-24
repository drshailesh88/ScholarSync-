// Google Docs-style formatting toolbar — collapsible
"use client";

import type { MouseEvent } from "react";
import type { Editor } from "@tiptap/react";
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  ListBullets,
  ListNumbers,
  CheckSquare,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  Link as LinkIcon,
  Table,
  Quotes,
  Code,
  TextSuperscript,
  TextSubscript,
  CaretUp,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | null;
  onCollapse?: () => void;
}

export function Toolbar({ editor, onCollapse }: ToolbarProps) {
  if (!editor) return null;

  const prevent = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const btn = (
    active: boolean,
    action: () => void,
    icon: React.ReactNode,
    title: string
  ) => (
    <button
      type="button"
      onMouseDown={(e) => {
        prevent(e);
        action();
      }}
      title={title}
      className={cn(
        "p-1.5 rounded transition-colors",
        active
          ? "bg-brand/10 text-brand"
          : "text-ink-muted hover:text-ink hover:bg-surface-raised"
      )}
    >
      {icon}
    </button>
  );

  const sep = <div className="w-px h-5 bg-border-subtle mx-0.5 shrink-0" />;

  return (
    <div className="ss-formatting-toolbar flex items-center gap-0.5 px-3 py-1 overflow-x-auto">
      {/* Text formatting */}
      {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <TextB size={16} />, "Bold (⌘B)")}
      {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <TextItalic size={16} />, "Italic (⌘I)")}
      {btn(editor.isActive("underline"), () => editor.chain().focus().toggleUnderline().run(), <TextUnderline size={16} />, "Underline (⌘U)")}
      {btn(editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), <TextStrikethrough size={16} />, "Strikethrough (⌘⇧X)")}

      {sep}

      {/* Headings as a compact group */}
      <button
        type="button"
        onMouseDown={(e) => { prevent(e); editor.chain().focus().toggleHeading({ level: 1 }).run(); }}
        title="Heading 1 (⌘⇧1)"
        className={cn("px-1.5 py-1 rounded text-[11px] font-bold transition-colors", editor.isActive("heading", { level: 1 }) ? "bg-brand/10 text-brand" : "text-ink-muted hover:text-ink hover:bg-surface-raised")}
      >H1</button>
      <button
        type="button"
        onMouseDown={(e) => { prevent(e); editor.chain().focus().toggleHeading({ level: 2 }).run(); }}
        title="Heading 2 (⌘⇧2)"
        className={cn("px-1.5 py-1 rounded text-[11px] font-bold transition-colors", editor.isActive("heading", { level: 2 }) ? "bg-brand/10 text-brand" : "text-ink-muted hover:text-ink hover:bg-surface-raised")}
      >H2</button>
      <button
        type="button"
        onMouseDown={(e) => { prevent(e); editor.chain().focus().toggleHeading({ level: 3 }).run(); }}
        title="Heading 3 (⌘⇧3)"
        className={cn("px-1.5 py-1 rounded text-[11px] font-bold transition-colors", editor.isActive("heading", { level: 3 }) ? "bg-brand/10 text-brand" : "text-ink-muted hover:text-ink hover:bg-surface-raised")}
      >H3</button>

      {sep}

      {/* Lists */}
      {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <ListBullets size={16} />, "Bullet List (⌘⇧8)")}
      {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListNumbers size={16} />, "Ordered List (⌘⇧7)")}
      {btn(editor.isActive("taskList"), () => editor.chain().focus().toggleTaskList().run(), <CheckSquare size={16} />, "Checklist (⌘⇧9)")}
      {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quotes size={16} />, "Blockquote (⌘⇧B)")}

      {sep}

      {/* Alignment */}
      {btn(editor.isActive({ textAlign: "left" }), () => editor.chain().focus().setTextAlign("left").run(), <TextAlignLeft size={16} />, "Align Left")}
      {btn(editor.isActive({ textAlign: "center" }), () => editor.chain().focus().setTextAlign("center").run(), <TextAlignCenter size={16} />, "Align Center")}
      {btn(editor.isActive({ textAlign: "right" }), () => editor.chain().focus().setTextAlign("right").run(), <TextAlignRight size={16} />, "Align Right")}

      {sep}

      {/* Super/sub/code */}
      {btn(editor.isActive("superscript"), () => editor.chain().focus().toggleSuperscript().run(), <TextSuperscript size={16} />, "Superscript (⌘⇧.)")}
      {btn(editor.isActive("subscript"), () => editor.chain().focus().toggleSubscript().run(), <TextSubscript size={16} />, "Subscript (⌘⇧,)")}
      {btn(editor.isActive("code"), () => editor.chain().focus().toggleCode().run(), <Code size={16} />, "Inline Code (⌘E)")}

      {sep}

      {/* Insert */}
      {btn(editor.isActive("link"), () => {
        const url = window.prompt("Enter URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }, <LinkIcon size={16} />, "Insert Link (⌘⇧K)")}
      <button
        type="button"
        onMouseDown={(e) => {
          prevent(e);
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        }}
        title="Insert Table"
        className="p-1.5 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
      >
        <Table size={16} />
      </button>

      {/* Spacer + collapse button */}
      <div className="flex-1" />
      {onCollapse && (
        <button
          type="button"
          onClick={onCollapse}
          title="Hide toolbar"
          className="p-1.5 rounded text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
        >
          <CaretUp size={14} />
        </button>
      )}
    </div>
  );
}
