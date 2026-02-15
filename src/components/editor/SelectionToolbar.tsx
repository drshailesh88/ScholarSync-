"use client";

import type { Editor } from "@tiptap/react";
import { useState, useCallback, useEffect, useRef } from "react";
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  Link as LinkIcon,
  Code,
  HighlighterCircle,
  ChatCircle,
  Sparkle,
  CaretDown,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface SelectionToolbarProps {
  editor: Editor;
}

const HEADING_OPTIONS = [
  { label: "Normal text", level: 0 },
  { label: "Heading 1", level: 1 },
  { label: "Heading 2", level: 2 },
  { label: "Heading 3", level: 3 },
  { label: "Heading 4", level: 4 },
];

const HIGHLIGHT_COLORS = [
  { name: "Yellow", color: "#fef08a" },
  { name: "Green", color: "#bbf7d0" },
  { name: "Blue", color: "#bfdbfe" },
  { name: "Pink", color: "#fecdd3" },
  { name: "Orange", color: "#fed7aa" },
];

export function SelectionToolbar({ editor }: SelectionToolbarProps) {
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showHighlightColors, setShowHighlightColors] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Track selection changes to show/hide toolbar
  useEffect(() => {
    const updateToolbar = () => {
      const { state } = editor;
      const { from, to, empty } = state.selection;

      if (empty) {
        setVisible(false);
        setShowStyleDropdown(false);
        setShowHighlightColors(false);
        return;
      }

      // Get selection coordinates from the editor view
      const { view } = editor;
      const start = view.coordsAtPos(from);
      const end = view.coordsAtPos(to);

      // Position above the selection, centered
      const x = (start.left + end.left) / 2;
      const y = start.top - 8; // 8px gap above selection

      setPosition({ x, y });
      setVisible(true);
    };

    editor.on("selectionUpdate", updateToolbar);
    editor.on("blur", () => {
      // Small delay to allow toolbar button clicks
      setTimeout(() => {
        if (!toolbarRef.current?.contains(document.activeElement)) {
          setVisible(false);
        }
      }, 150);
    });

    return () => {
      editor.off("selectionUpdate", updateToolbar);
    };
  }, [editor]);

  const getCurrentStyle = useCallback(() => {
    for (let i = 4; i >= 1; i--) {
      if (editor.isActive("heading", { level: i })) {
        return `Heading ${i}`;
      }
    }
    return "Normal text";
  }, [editor]);

  const setStyle = useCallback(
    (level: number) => {
      if (level === 0) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor
          .chain()
          .focus()
          .setHeading({ level: level as 1 | 2 | 3 | 4 })
          .run();
      }
      setShowStyleDropdown(false);
    },
    [editor]
  );

  const toggleHighlight = useCallback(
    (color?: string) => {
      if (color) {
        editor.chain().focus().toggleHighlight({ color }).run();
      } else {
        editor.chain().focus().toggleHighlight().run();
      }
      setShowHighlightColors(false);
    },
    [editor]
  );

  const insertLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addComment = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("scholarsync:editor-action", {
        detail: { action: "add-comment" },
      })
    );
  }, []);

  const openAI = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("scholarsync:ai-action", {
        detail: {
          action: "precision-edit",
          context: editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " "
          ),
        },
      })
    );
  }, [editor]);

  if (!visible) return null;

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 transition-opacity duration-150"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="flex items-center gap-0.5 bg-surface border border-border rounded-lg shadow-lg px-1 py-0.5">
        {/* Style dropdown */}
        <div className="relative">
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowStyleDropdown(!showStyleDropdown)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium text-ink hover:bg-surface-raised transition-colors min-w-[90px]"
          >
            <span className="truncate">{getCurrentStyle()}</span>
            <CaretDown size={10} className="text-ink-muted shrink-0" />
          </button>
          {showStyleDropdown && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-surface border border-border rounded-lg shadow-lg py-1 z-50">
              {HEADING_OPTIONS.map((opt) => (
                <button
                  key={opt.level}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setStyle(opt.level)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-sm hover:bg-surface-raised transition-colors",
                    getCurrentStyle() === opt.label
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

        <Separator />

        {/* Text formatting */}
        <ToolbarButton
          icon={TextB}
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={TextItalic}
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={TextUnderline}
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          icon={TextStrikethrough}
          label="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        <Separator />

        {/* Link & Code */}
        <ToolbarButton
          icon={LinkIcon}
          label="Link"
          active={editor.isActive("link")}
          onClick={insertLink}
        />
        <ToolbarButton
          icon={Code}
          label="Inline Code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        />

        <Separator />

        {/* Highlight */}
        <div className="relative">
          <ToolbarButton
            icon={HighlighterCircle}
            label="Highlight"
            active={editor.isActive("highlight")}
            onClick={() => toggleHighlight()}
            onContextMenu={(e) => {
              e.preventDefault();
              setShowHighlightColors(!showHighlightColors);
            }}
          />
          {showHighlightColors && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 flex gap-1 bg-surface border border-border rounded-lg shadow-lg p-2 z-50">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleHighlight(c.color)}
                  className="w-5 h-5 rounded-full border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.color }}
                />
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Comment */}
        <ToolbarButton
          icon={ChatCircle}
          label="Comment"
          onClick={addComment}
        />

        {/* AI */}
        <ToolbarButton
          icon={Sparkle}
          label="AI Edit"
          onClick={openAI}
          className="text-brand"
        />
      </div>
    </div>
  );
}

function Separator() {
  return <div className="w-px h-5 bg-border mx-0.5" />;
}

function ToolbarButton({
  icon: Icon,
  label,
  active,
  onClick,
  onContextMenu,
  className,
}: {
  icon: typeof TextB;
  label: string;
  active?: boolean;
  onClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  return (
    <button
      title={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={cn(
        "p-1.5 rounded-md transition-colors",
        active
          ? "bg-brand/10 text-brand"
          : "text-ink-muted hover:text-ink hover:bg-surface-raised",
        className
      )}
    >
      <Icon size={16} weight={active ? "bold" : "regular"} />
    </button>
  );
}
