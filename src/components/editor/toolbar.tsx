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

export function Toolbar({ editor }: ToolbarProps) {
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
    </div>
  );
}
