"use client";

import type { Editor } from "@tiptap/react";
import {
  TextB,
  TextItalic,
  ListBullets,
  ListNumbers,
  Quotes,
  TextHOne,
  TextHTwo,
  TextHThree,
  BookOpen,
  Books,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | null;
}

interface ToolbarButton {
  icon: typeof TextB;
  label: string;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
}

const buttons: ToolbarButton[] = [
  {
    icon: TextHOne,
    label: "Heading 1",
    action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (e) => e.isActive("heading", { level: 1 }),
  },
  {
    icon: TextHTwo,
    label: "Heading 2",
    action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (e) => e.isActive("heading", { level: 2 }),
  },
  {
    icon: TextHThree,
    label: "Heading 3",
    action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (e) => e.isActive("heading", { level: 3 }),
  },
  {
    icon: TextB,
    label: "Bold",
    action: (e) => e.chain().focus().toggleBold().run(),
    isActive: (e) => e.isActive("bold"),
  },
  {
    icon: TextItalic,
    label: "Italic",
    action: (e) => e.chain().focus().toggleItalic().run(),
    isActive: (e) => e.isActive("italic"),
  },
  {
    icon: ListBullets,
    label: "Bullet List",
    action: (e) => e.chain().focus().toggleBulletList().run(),
    isActive: (e) => e.isActive("bulletList"),
  },
  {
    icon: ListNumbers,
    label: "Ordered List",
    action: (e) => e.chain().focus().toggleOrderedList().run(),
    isActive: (e) => e.isActive("orderedList"),
  },
  {
    icon: Quotes,
    label: "Blockquote",
    action: (e) => e.chain().focus().toggleBlockquote().run(),
    isActive: (e) => e.isActive("blockquote"),
  },
];

interface ToolbarExtendedProps extends ToolbarProps {
  onOpenCitationDialog?: () => void;
  onToggleReferenceSidebar?: () => void;
  referenceCount?: number;
}

export function Toolbar({
  editor,
  onOpenCitationDialog,
  onToggleReferenceSidebar,
  referenceCount,
}: ToolbarExtendedProps) {
  if (!editor) return null;

  return (
    <div className="glass-panel flex items-center gap-0.5 px-2 py-1.5 border-b border-border">
      {buttons.map((btn, idx) => {
        const Icon = btn.icon;
        const active = btn.isActive(editor);
        return (
          <button
            key={idx}
            onClick={() => btn.action(editor)}
            title={btn.label}
            className={cn(
              "p-2 rounded-lg transition-colors",
              active
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised"
            )}
          >
            <Icon size={18} />
          </button>
        );
      })}

      {/* Separator */}
      <div className="w-px h-5 bg-border mx-1" />

      {/* Cite button */}
      {onOpenCitationDialog && (
        <button
          onClick={onOpenCitationDialog}
          title="Insert Citation (Cmd+Shift+C)"
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-ink-muted hover:text-ink hover:bg-surface-raised text-xs"
        >
          <BookOpen size={16} />
          <span className="hidden sm:inline">Cite</span>
        </button>
      )}

      {/* References sidebar toggle */}
      {onToggleReferenceSidebar && (
        <button
          onClick={onToggleReferenceSidebar}
          title="Toggle Reference Sidebar (Cmd+Shift+R)"
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors text-ink-muted hover:text-ink hover:bg-surface-raised text-xs"
        >
          <Books size={16} />
          {referenceCount !== undefined && referenceCount > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none">
              {referenceCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
