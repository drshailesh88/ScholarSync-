"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import type { Editor as TiptapEditor } from "@tiptap/core";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  CaretDown,
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
  Link as LinkIcon,
  LinkBreak,
  Rows,
  TextIndent,
  TextOutdent,
} from "@phosphor-icons/react";
import type { ThemeConfig, TextEffects } from "@/types/presentation";
import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  getPrimaryFontFamily,
} from "./text-formatting-options";
import { ColorPicker } from "@/components/slides/shared/color-picker";

// ---------------------------------------------------------------------------
// EditableTextBlock — TipTap editor that activates on click inside a slide
// ---------------------------------------------------------------------------

const TextStyleWithFontSize = TextStyle.extend({
  addAttributes() {
    const parentAttributes = this.parent?.() ?? {};
    return {
      ...parentAttributes,
      fontSize: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontSize || null,
        renderHTML: (attributes: { fontSize?: string | null }) =>
          attributes.fontSize
            ? { style: `font-size: ${attributes.fontSize}` }
            : {},
      },
    };
  },
});

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
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  lineHeight?: number;
  paragraphSpacing?: number;
  onLineHeightChange?: (lineHeight: number) => void;
  textShadow?: TextEffects["textShadow"];
  textOutline?: TextEffects["textOutline"];
  textTransform?: TextEffects["textTransform"];
  letterSpacing?: TextEffects["letterSpacing"];
}

type TextBlockStyle = "title" | "subtitle" | "body" | "caption";

const DEFAULT_LINE_HEIGHT_BY_STYLE: Record<TextBlockStyle, number> = {
  title: 1.2,
  subtitle: 1.4,
  body: 1.6,
  caption: 1.3,
};

const DEFAULT_PARAGRAPH_SPACING = 0;

export const LINE_HEIGHT_OPTIONS = [1.0, 1.15, 1.5, 2.0, 2.5, 3.0] as const;

function formatLineHeightOption(value: number): string {
  return Number.isInteger(value) ? value.toFixed(1) : String(value);
}

export function getDefaultLineHeight(style: TextBlockStyle): number {
  return DEFAULT_LINE_HEIGHT_BY_STYLE[style] ?? DEFAULT_LINE_HEIGHT_BY_STYLE.body;
}

export function getParagraphSpacingCss(
  paragraphSpacing: number = DEFAULT_PARAGRAPH_SPACING,
  selector = ".ProseMirror"
): string {
  return `${selector} p + p { margin-top: ${paragraphSpacing}px; }`;
}

export function buildTextEffectStyles(effects?: TextEffects): React.CSSProperties {
  if (!effects) return {};
  const styles: React.CSSProperties = {};
  if (effects.textShadow) {
    const { offsetX, offsetY, blur, color } = effects.textShadow;
    styles.textShadow = `${offsetX}px ${offsetY}px ${blur}px ${color}`;
  }
  if (effects.textOutline) {
    const { width, color } = effects.textOutline;
    styles.WebkitTextStroke = `${width}px ${color}`;
  }
  if (effects.textTransform) {
    styles.textTransform = effects.textTransform;
  }
  if (effects.letterSpacing !== undefined) {
    styles.letterSpacing = `${effects.letterSpacing}em`;
  }
  return styles;
}

export function getTextStyles(
  style: TextBlockStyle,
  theme: ThemeConfig,
  lineHeight?: number,
  effects?: TextEffects,
): React.CSSProperties {
  const resolvedLineHeight = lineHeight ?? getDefaultLineHeight(style);
  const effectStyles = buildTextEffectStyles(effects);

  switch (style) {
    case "title":
      return {
        fontSize: "1.3em",
        fontWeight: 700,
        color: theme.primaryColor,
        fontFamily: theme.headingFontFamily ?? theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: resolvedLineHeight,
        ...effectStyles,
      };
    case "subtitle":
      return {
        fontSize: "0.85em",
        fontWeight: 400,
        color: theme.textColor,
        opacity: 0.7,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: resolvedLineHeight,
        ...effectStyles,
      };
    case "caption":
      return {
        fontSize: "0.65em",
        fontWeight: 400,
        color: theme.textColor,
        opacity: 0.5,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: resolvedLineHeight,
        ...effectStyles,
      };
    case "body":
    default:
      return {
        fontSize: "0.85em",
        fontWeight: 400,
        color: theme.textColor,
        fontFamily: theme.fontFamily ?? "Inter, sans-serif",
        lineHeight: resolvedLineHeight,
        ...effectStyles,
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
  fontFamily,
  fontSize,
  color,
  lineHeight,
  paragraphSpacing,
  onLineHeightChange,
  textShadow,
  textOutline,
  textTransform,
  letterSpacing,
}: EditableTextBlockProps) {
  const updateRef = useRef(onUpdate);
  const [openMenu, setOpenMenu] = useState<"fontFamily" | "fontSize" | "color" | "lineHeight" | null>(null);
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const controlsRef = useRef<HTMLDivElement>(null);
  const linkControlsRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const spacingScopeClass = `editable-text-spacing-${useId().replace(/[:]/g, "")}`;
  const [, setEditorStateVersion] = useState(0);

  useEffect(() => {
    updateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (
        !controlsRef.current?.contains(event.target as Node) &&
        !linkControlsRef.current?.contains(event.target as Node)
      ) {
        setOpenMenu(null);
        setIsLinkPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false, // Handled by block style
      }),
      TextAlign.configure({ types: ["paragraph"] }),
      TextStyleWithFontSize,
      Color,
      FontFamily,
      Underline,
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
      Link.configure({
        openOnClick: !isEditing,
        HTMLAttributes: { class: "text-blue-600 underline cursor-pointer" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: content || "",
    editable: isEditing,
    onUpdate: ({ editor: e }) => {
      updateRef.current(e.getHTML());
    },
  }, [isEditing, placeholder]);

  useEffect(() => {
    if (!editor) return;
    const rerender = () => setEditorStateVersion((v) => v + 1);
    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);
    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
    };
  }, [editor]);

  // Reset menus when editing stops (React-recommended render-time state adjustment)
  const [prevIsEditing, setPrevIsEditing] = useState(isEditing);
  if (isEditing !== prevIsEditing) {
    setPrevIsEditing(isEditing);
    if (!isEditing) {
      setOpenMenu(null);
      setIsLinkPopoverOpen(false);
    }
  }

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

  const openLinkPopover = useCallback(() => {
    if (!editor) return;
    const href = (editor.getAttributes("link") as { href?: string }).href;
    setLinkUrl(href ?? "");
    setIsLinkPopoverOpen(true);
    setOpenMenu(null);
  }, [editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;
    const trimmedUrl = linkUrl.trim();
    if (!trimmedUrl) return;
    editor.chain().focus().setLink({ href: trimmedUrl }).run();
    setIsLinkPopoverOpen(false);
  }, [editor, linkUrl]);

  useEffect(() => {
    if (!editor) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isEditing) return;
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.key.toLowerCase() !== "k") return;
      if (editor.state.selection.empty) return;
      event.preventDefault();
      openLinkPopover();
    };
    const dom = editor.view.dom;
    dom.addEventListener("keydown", handleKeyDown);
    return () => {
      dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor, isEditing, openLinkPopover]);

  useEffect(() => {
    if (!isLinkPopoverOpen) return;
    const timer = window.setTimeout(() => {
      linkInputRef.current?.focus();
      linkInputRef.current?.select();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [isLinkPopoverOpen]);

  const handleBlur = useCallback(() => {
    if (editor) {
      onBlur();
    }
  }, [editor, onBlur]);

  const resolvedParagraphSpacing = paragraphSpacing ?? DEFAULT_PARAGRAPH_SPACING;
  const currentLineHeight = lineHeight ?? getDefaultLineHeight(style);
  const effects: TextEffects | undefined =
    textShadow || textOutline || textTransform || letterSpacing !== undefined
      ? { textShadow, textOutline, textTransform, letterSpacing }
      : undefined;
  const textStyles = {
    ...getTextStyles(style, theme, lineHeight, effects),
    ...(fontFamily ? { fontFamily } : {}),
    ...(fontSize ? { fontSize } : {}),
    ...(color ? { color } : {}),
  };

  if (!editor) return null;

  const textStyleAttributes = editor.getAttributes("textStyle") as {
    fontFamily?: string;
    fontSize?: string;
    color?: string;
  };
  const currentFontFamily =
    getPrimaryFontFamily(textStyleAttributes.fontFamily) ??
    getPrimaryFontFamily(fontFamily) ??
    getPrimaryFontFamily(theme.fontFamily) ??
    FONT_FAMILY_OPTIONS[0];
  const currentFontSize =
    textStyleAttributes.fontSize ?? fontSize ?? null;
  const currentColor =
    textStyleAttributes.color ?? color ?? theme.textColor;
  const themeColors = [
    theme.primaryColor,
    theme.secondaryColor,
    theme.accentColor,
    theme.textColor,
    theme.backgroundColor,
  ];
  const hasTextSelection = !editor.state.selection.empty;
  const isOnLink = editor.isActive("link");

  return (
    <div
      className={[spacingScopeClass, className].filter(Boolean).join(" ")}
      style={textStyles}
      onClick={(e) => {
        if (!isEditing) {
          const target = e.target as HTMLElement;
          if (target.closest("a[href]")) {
            return;
          }
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
          className="relative flex items-center gap-0.5 overflow-visible px-1.5 py-1 rounded-lg bg-gray-900 shadow-xl border border-gray-700"
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

          <div ref={linkControlsRef} className="relative flex items-center gap-0.5">
            {hasTextSelection && !isOnLink && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={openLinkPopover}
                title="Add Link (Ctrl+K)"
                className="flex items-center gap-1 rounded px-1.5 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <LinkIcon size={14} />
                <span>Add Link</span>
              </button>
            )}
            {isOnLink && (
              <>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={openLinkPopover}
                  title="Edit Link"
                  className="flex items-center gap-1 rounded px-1.5 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                >
                  <LinkIcon size={14} />
                  <span>Edit Link</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setIsLinkPopoverOpen(false);
                  }}
                  title="Remove Link"
                  className="flex items-center gap-1 rounded px-1.5 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                >
                  <LinkBreak size={14} />
                  <span>Remove Link</span>
                </button>
              </>
            )}
            {isLinkPopoverOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-md border border-gray-700 bg-gray-900 p-2 shadow-2xl">
                <input aria-label="Text input"
                  ref={linkInputRef}
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      applyLink();
                    }
                    if (e.key === "Escape") {
                      e.preventDefault();
                      setIsLinkPopoverOpen(false);
                    }
                  }}
                  placeholder="https://..."
                  className="mb-2 w-full rounded border border-gray-600 bg-gray-800 px-2 py-1 text-xs text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsLinkPopoverOpen(false)}
                    className="rounded border border-gray-600 px-2 py-1 text-xs text-gray-200 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={applyLink}
                    className="rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-gray-600 mx-0.5" />

          <div ref={controlsRef} className="flex items-center gap-1">
            <div className="relative">
              <ToolbarSelectButton
                label={currentFontFamily}
                isOpen={openMenu === "fontFamily"}
                onClick={() =>
                  setOpenMenu((prev) => (prev === "fontFamily" ? null : "fontFamily"))
                }
              />
              {openMenu === "fontFamily" && (
                <div className="absolute left-0 top-full z-50 mt-1 w-44 rounded-md border border-gray-700 bg-gray-900 p-1 shadow-2xl">
                  {FONT_FAMILY_OPTIONS.map((family) => (
                    <button
                      key={family}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        editor.chain().focus().setFontFamily(family).run();
                        setOpenMenu(null);
                      }}
                      className={`block w-full rounded px-2 py-1 text-left text-xs text-gray-100 hover:bg-gray-700 ${
                        currentFontFamily === family ? "bg-gray-700" : ""
                      }`}
                    >
                      {family}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <ToolbarSelectButton
                label={currentFontSize ?? "Size"}
                isOpen={openMenu === "fontSize"}
                onClick={() =>
                  setOpenMenu((prev) => (prev === "fontSize" ? null : "fontSize"))
                }
              />
              {openMenu === "fontSize" && (
                <div className="absolute left-0 top-full z-50 mt-1 w-24 rounded-md border border-gray-700 bg-gray-900 p-1 shadow-2xl">
                  {FONT_SIZE_OPTIONS.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .setMark("textStyle", { fontSize: `${size}px` })
                          .run();
                        setOpenMenu(null);
                      }}
                      className={`block w-full rounded px-2 py-1 text-left text-xs text-gray-100 hover:bg-gray-700 ${
                        currentFontSize === `${size}px` ? "bg-gray-700" : ""
                      }`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() =>
                  setOpenMenu((prev) => (prev === "lineHeight" ? null : "lineHeight"))
                }
                title="Line Spacing"
                className={`flex items-center gap-1 rounded px-1.5 py-1 text-xs transition-colors ${
                  openMenu === "lineHeight"
                    ? "bg-blue-500 text-white"
                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Rows size={14} />
                <CaretDown size={10} />
              </button>
              {openMenu === "lineHeight" && (
                <div className="absolute left-0 top-full z-50 mt-1 w-28 rounded-md border border-gray-700 bg-gray-900 p-1 shadow-2xl">
                  {LINE_HEIGHT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        onLineHeightChange?.(option);
                        setOpenMenu(null);
                      }}
                      className={`block w-full rounded px-2 py-1 text-left text-xs text-gray-100 hover:bg-gray-700 ${
                        Math.abs(currentLineHeight - option) < 0.001 ? "bg-gray-700" : ""
                      }`}
                    >
                      {formatLineHeightOption(option)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() =>
                  setOpenMenu((prev) => (prev === "color" ? null : "color"))
                }
                title="Text Color"
                className={`flex items-center gap-1 rounded px-1.5 py-1 text-xs transition-colors ${
                  openMenu === "color"
                    ? "bg-blue-500 text-white"
                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="font-semibold">A</span>
                <span
                  className="h-2 w-2 rounded-full border border-white/40"
                  style={{ backgroundColor: currentColor }}
                />
              </button>
              {openMenu === "color" && (
                <div
                  className="absolute right-0 top-full z-50 mt-1 w-[272px] rounded-md border border-gray-700 bg-gray-900 p-2 shadow-2xl"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <button
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(theme.textColor).run();
                      setOpenMenu(null);
                    }}
                    className="mb-2 w-full rounded border border-gray-600 px-2 py-1 text-left text-xs text-gray-100 hover:bg-gray-700"
                  >
                    Theme Color
                  </button>
                  <div className="rounded-lg bg-gray-950/40 p-1">
                    <ColorPicker
                      value={currentColor}
                      onChange={(nextColor) => {
                        editor.chain().focus().setColor(nextColor).run();
                      }}
                      themeColors={themeColors}
                      placement="left"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        onBlur={handleBlur}
        className="outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[1em] [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-current [&_.ProseMirror_p.is-editor-empty:first-child::before]:opacity-30 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
      />
      <style>{getParagraphSpacingCss(resolvedParagraphSpacing, `.${spacingScopeClass} .ProseMirror`)}</style>
    </div>
  );
}

function ToolbarSelectButton({
  label,
  isOpen,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex items-center gap-1 rounded px-1.5 py-1 text-xs transition-colors ${
        isOpen
          ? "bg-blue-500 text-white"
          : "text-gray-200 hover:bg-gray-700 hover:text-white"
      }`}
    >
      <span className="max-w-[90px] truncate">{label}</span>
      <CaretDown size={10} />
    </button>
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

export const MAX_BULLET_NESTING_LEVEL = 3;

export function getCurrentListItemNestingLevel(editor: TiptapEditor): number {
  const { $from } = editor.state.selection;
  let listItemLevel = 0;
  for (let depth = 0; depth <= $from.depth; depth += 1) {
    if ($from.node(depth).type.name === "listItem") {
      listItemLevel += 1;
    }
  }
  return listItemLevel;
}

export function canIndentBulletListItem(editor: TiptapEditor): boolean {
  return (
    getCurrentListItemNestingLevel(editor) < MAX_BULLET_NESTING_LEVEL &&
    editor.can().chain().focus().sinkListItem("listItem").run()
  );
}

export function canOutdentBulletListItem(editor: TiptapEditor): boolean {
  return editor.can().chain().focus().liftListItem("listItem").run();
}

export function indentBulletListItem(editor: TiptapEditor): boolean {
  if (!canIndentBulletListItem(editor)) return false;
  return editor.chain().focus().sinkListItem("listItem").run();
}

export function outdentBulletListItem(editor: TiptapEditor): boolean {
  if (!canOutdentBulletListItem(editor)) return false;
  return editor.chain().focus().liftListItem("listItem").run();
}

export function handleBulletsTabKeyDown(
  event: KeyboardEvent,
  editor: TiptapEditor | null,
  isEditing: boolean
): boolean {
  if (!editor || !isEditing || event.key !== "Tab") return false;
  event.preventDefault();
  event.stopPropagation();
  if (event.shiftKey) {
    outdentBulletListItem(editor);
  } else {
    indentBulletListItem(editor);
  }
  return true;
}

function parseBulletListFromHTML(html: string): { items: string[]; ordered: boolean } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const rootList = doc.body.querySelector("ol, ul");
  if (!(rootList instanceof HTMLOListElement || rootList instanceof HTMLUListElement)) {
    return { items: [""], ordered: false };
  }

  const nextItems = Array.from(rootList.children)
    .filter((node): node is HTMLLIElement => node instanceof HTMLLIElement)
    .map((item) => item.innerHTML.trim());

  return {
    items: nextItems.length > 0 ? nextItems : [""],
    ordered: rootList.tagName === "OL",
  };
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
      TextStyle,
      Color,
      Superscript,
      Subscript,
      Placeholder.configure({ placeholder: "Add bullet points..." }),
    ],
    content: toHTML(items, ordered),
    editable: isEditing,
    onUpdate: ({ editor: e }) => {
      const { items: nextItems, ordered: nextOrdered } = parseBulletListFromHTML(
        e.getHTML()
      );
      updateRef.current(nextItems, nextOrdered);
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

  useEffect(() => {
    if (!editor) return;
    const onKeyDown = (event: KeyboardEvent) => {
      handleBulletsTabKeyDown(event, editor, isEditing);
    };
    const dom = editor.view.dom;
    dom.addEventListener("keydown", onKeyDown, true);
    return () => {
      dom.removeEventListener("keydown", onKeyDown, true);
    };
  }, [editor, isEditing]);

  if (!editor) return null;

  const canIndent = canIndentBulletListItem(editor);
  const canOutdent = canOutdentBulletListItem(editor);

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
          <FormatButton
            disabled={!canIndent}
            onClick={() => {
              indentBulletListItem(editor);
            }}
            title="Indent (Tab)"
          >
            <TextIndent size={14} />
          </FormatButton>
          <FormatButton
            disabled={!canOutdent}
            onClick={() => {
              outdentBulletListItem(editor);
            }}
            title="Outdent (Shift+Tab)"
          >
            <TextOutdent size={14} />
          </FormatButton>
        </BubbleMenu>
      )}

      <EditorContent
        editor={editor}
        onBlur={onBlur}
        className="outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[1em] [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-[1.2em] [&_.ProseMirror_ul_ul]:list-[circle] [&_.ProseMirror_ul_ul_ul]:list-[square] [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-[1.2em] [&_.ProseMirror_ol_ol]:list-[lower-alpha] [&_.ProseMirror_ol_ol_ol]:list-[lower-roman] [&_.ProseMirror_li]:mb-[0.2em]"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// FormatButton — tiny toolbar button for BubbleMenu
// ---------------------------------------------------------------------------

function FormatButton({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1 rounded transition-colors ${
        disabled
          ? "cursor-not-allowed text-gray-500"
          : active
          ? "bg-blue-500 text-white"
          : "text-gray-300 hover:text-white hover:bg-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
