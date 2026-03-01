"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect, useRef } from "react";
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  ListBullets,
  ListNumbers,
  TextSuperscript,
  TextSubscript,
  HighlighterCircle,
} from "@phosphor-icons/react";
import type { ThemeConfig } from "@/types/presentation";

// ---------------------------------------------------------------------------
// EditableTextBlock — TipTap editor that activates on click inside a slide
// ---------------------------------------------------------------------------

interface EditableTextBlockProps {
  content: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onUpdate: (html: string) => void;
  onBlur: () => void;
  placeholder?: string;
  theme: ThemeConfig;
  style?: "title" | "subtitle" | "body" | "caption";
  className?: string;
}

function getTextStyles(
  style: string,
  theme: ThemeConfig
): React.CSSProperties {
  switch (style) {
    case "title":
      return {
        fontSize: "1.3em",
        fontWeight: 700,
        color: theme.primaryColor,
        fontFamily: theme.headingFontFamily ?? theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: 1.2,
      };
    case "subtitle":
      return {
        fontSize: "0.85em",
        fontWeight: 400,
        color: theme.textColor,
        opacity: 0.7,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: 1.4,
      };
    case "caption":
      return {
        fontSize: "0.65em",
        fontWeight: 400,
        color: theme.textColor,
        opacity: 0.5,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: 1.3,
      };
    case "body":
    default:
      return {
        fontSize: "0.85em",
        fontWeight: 400,
        color: theme.textColor,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: 1.6,
      };
  }
}

export function EditableTextBlock({
  content,
  isEditing,
  onStartEdit,
  onUpdate,
  onBlur,
  placeholder = "Click to add text...",
  theme,
  style = "body",
  className,
}: EditableTextBlockProps) {
  const updateRef = useRef(onUpdate);
  useEffect(() => {
    updateRef.current = onUpdate;
  }, [onUpdate]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, // Handled by block style
      }),
      Underline,
      TextAlign.configure({ types: ["paragraph"] }),
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
      Placeholder.configure({ placeholder }),
    ],
    content: content || "",
    editable: isEditing,
    onUpdate: ({ editor: e }) => {
      updateRef.current(e.getHTML());
    },
  });

  // Sync editable state
  useEffect(() => {
    if (editor && editor.isEditable !== isEditing) {
      editor.setEditable(isEditing);
      if (isEditing) {
        editor.commands.focus("end");
      }
    }
  }, [editor, isEditing]);

  // Sync content when it changes externally
  useEffect(() => {
    if (editor && !isEditing && editor.getHTML() !== content) {
      editor.commands.setContent(content || "");
    }
  }, [editor, content, isEditing]);

  const handleBlur = useCallback(() => {
    if (editor) {
      onBlur();
    }
  }, [editor, onBlur]);

  const textStyles = getTextStyles(style, theme);

  if (!editor) return null;

  return (
    <div
      className={className}
      style={textStyles}
      onClick={(e) => {
        if (!isEditing) {
          e.stopPropagation();
          onStartEdit();
        }
      }}
    >
      {/* Bubble menu — floating format toolbar */}
      {isEditing && editor && (
        <BubbleMenu
          editor={editor}
          options={{ placement: "top" }}
          className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-gray-900 shadow-xl border border-gray-700"
        >
          <FormatButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold (Ctrl+B)"
          >
            <TextB size={14} weight={editor.isActive("bold") ? "bold" : "regular"} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic (Ctrl+I)"
          >
            <TextItalic size={14} weight={editor.isActive("italic") ? "bold" : "regular"} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline (Ctrl+U)"
          >
            <TextUnderline size={14} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
          >
            <TextStrikethrough size={14} />
          </FormatButton>

          <div className="w-px h-4 bg-gray-600 mx-0.5" />

          <FormatButton
            active={editor.isActive("superscript")}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            title="Superscript"
          >
            <TextSuperscript size={14} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("subscript")}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            title="Subscript"
          >
            <TextSubscript size={14} />
          </FormatButton>

          <div className="w-px h-4 bg-gray-600 mx-0.5" />

          <FormatButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            title="Align Left"
          >
            <TextAlignLeft size={14} />
          </FormatButton>
          <FormatButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            title="Align Center"
          >
            <TextAlignCenter size={14} />
          </FormatButton>
          <FormatButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            title="Align Right"
          >
            <TextAlignRight size={14} />
          </FormatButton>

          <div className="w-px h-4 bg-gray-600 mx-0.5" />

          <FormatButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <ListBullets size={14} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
          >
            <ListNumbers size={14} />
          </FormatButton>

          <FormatButton
            active={editor.isActive("highlight")}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            title="Highlight"
          >
            <HighlighterCircle size={14} />
          </FormatButton>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        onBlur={handleBlur}
        className="outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[1em] [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-current [&_.ProseMirror_p.is-editor-empty:first-child::before]:opacity-30 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// EditableBulletsBlock — TipTap editor for bullet/numbered lists
// ---------------------------------------------------------------------------

interface EditableBulletsBlockProps {
  items: string[];
  ordered?: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onUpdate: (items: string[], ordered: boolean) => void;
  onBlur: () => void;
  theme: ThemeConfig;
  className?: string;
}

export function EditableBulletsBlock({
  items,
  ordered = false,
  isEditing,
  onStartEdit,
  onUpdate,
  onBlur,
  theme,
  className,
}: EditableBulletsBlockProps) {
  const updateRef = useRef(onUpdate);
  useEffect(() => {
    updateRef.current = onUpdate;
  }, [onUpdate]);

  // Convert items to HTML list
  const toHTML = (its: string[], isOrdered: boolean) => {
    const tag = isOrdered ? "ol" : "ul";
    const lis = its.map((item) => `<li>${item}</li>`).join("");
    return `<${tag}>${lis}</${tag}>`;
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Superscript,
      Subscript,
      Placeholder.configure({ placeholder: "Add bullet points..." }),
    ],
    content: toHTML(items, ordered),
    editable: isEditing,
    onUpdate: ({ editor: e }) => {
      const html = e.getHTML();
      // Parse list items from HTML
      const isOrd = html.includes("<ol>");
      const matches = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)];
      const newItems = matches.map((m) => m[1].replace(/<\/?p>/g, "").trim());
      updateRef.current(newItems.length > 0 ? newItems : [""], isOrd);
    },
  });

  useEffect(() => {
    if (editor && editor.isEditable !== isEditing) {
      editor.setEditable(isEditing);
      if (isEditing) {
        editor.commands.focus("end");
      }
    }
  }, [editor, isEditing]);

  useEffect(() => {
    if (editor && !isEditing) {
      editor.commands.setContent(toHTML(items, ordered));
    }
  }, [editor, items, ordered, isEditing]);

  if (!editor) return null;

  return (
    <div
      className={className}
      style={{
        fontSize: "0.8em",
        color: theme.textColor,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: 1.6,
      }}
      onClick={(e) => {
        if (!isEditing) {
          e.stopPropagation();
          onStartEdit();
        }
      }}
    >
      {isEditing && editor && (
        <BubbleMenu
          editor={editor}
          options={{ placement: "top" }}
          className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-gray-900 shadow-xl border border-gray-700"
        >
          <FormatButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <TextB size={14} weight={editor.isActive("bold") ? "bold" : "regular"} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <TextItalic size={14} weight={editor.isActive("italic") ? "bold" : "regular"} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullets"
          >
            <ListBullets size={14} />
          </FormatButton>
          <FormatButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbers"
          >
            <ListNumbers size={14} />
          </FormatButton>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        onBlur={onBlur}
        className="outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[1em] [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-[1.2em] [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-[1.2em] [&_.ProseMirror_li]:mb-[0.2em]"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormatButton — tiny toolbar button for BubbleMenu
// ---------------------------------------------------------------------------

function FormatButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1 rounded transition-colors ${
        active
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:text-white hover:bg-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
