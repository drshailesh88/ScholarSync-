"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Link } from "@tiptap/extension-link";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Typography } from "@tiptap/extension-typography";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { useRef, useCallback, useEffect } from "react";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Toolbar } from "./toolbar";
import { CitationNode } from "./extensions/citation-node";
import { BibliographyNode } from "./extensions/bibliography-node";
import { createCitationPlugin } from "./extensions/citation-plugin";
import { AcademicKeyboardShortcuts } from "./extensions/keyboard-shortcuts";
import { SelectionToolbar } from "./SelectionToolbar";
import { LinkPopover } from "./LinkPopover";
import { SlashCommandsExtension } from "./extensions/slash-commands";
import { createSlashMenuRenderer } from "./SlashMenu";
import { Footnote } from "./extensions/footnote-node";
import { FootnoteSection } from "./FootnoteSection";
import { OutlinePlugin } from "./extensions/outline-plugin";
import { DocumentOutline } from "./DocumentOutline";
import { Extension } from "@tiptap/core";
import { useEditorStore } from "@/stores/editor-store";
import { getDocumentWordCount } from "@/lib/editor/word-counter";

/**
 * Tiptap extension that wraps the citation numbering ProseMirror plugin.
 */
const CitationNumbering = Extension.create({
  name: "citationNumbering",
  addProseMirrorPlugins() {
    return [createCitationPlugin()];
  },
});

interface TiptapEditorProps {
  className?: string;
  content?: Record<string, unknown> | null;
  onUpdate?: (data: {
    editor_content: Record<string, unknown>;
    plain_text_content: string;
    word_count: number;
  }) => void;
  /** Debounce delay in ms for auto-save (default 2000) */
  debounceMs?: number;
  /**
   * Change this key to force the editor to replace its content.
   * Useful when switching documents/projects: pass `document.id` or similar.
   */
  contentKey?: string | number | null;
  /** Called immediately on every keystroke (before debounce) for live status updates */
  onDirty?: () => void;
  /** Callback to expose the editor instance to parent */
  onEditorReady?: (editor: Editor) => void;
  /** Citation toolbar callbacks */
  onOpenCitationDialog?: () => void;
  onToggleReferenceSidebar?: () => void;
  referenceCount?: number;
}

export function TiptapEditor({
  className,
  content,
  onUpdate,
  debounceMs = 2000,
  contentKey,
  onDirty,
  onEditorReady,
  onOpenCitationDialog,
  onToggleReferenceSidebar,
  referenceCount,
}: TiptapEditorProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onUpdateRef = useRef(onUpdate);
  const onDirtyRef = useRef(onDirty);
  const onEditorReadyRef = useRef(onEditorReady);
  const setOutline = useEditorStore((s) => s.setOutline);
  const setActiveSectionPos = useEditorStore((s) => s.setActiveSectionPos);
  const setWordCount = useEditorStore((s) => s.setWordCount);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    onDirtyRef.current = onDirty;
  }, [onDirty]);

  useEffect(() => {
    onEditorReadyRef.current = onEditorReady;
  }, [onEditorReady]);

  const flushSave = useCallback((doc: ProseMirrorNode) => {
    if (!onUpdateRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    const json = doc.toJSON() as Record<string, unknown>;
    const text = doc.textBetween(0, doc.content.size, "\n");
    const wordCount = getDocumentWordCount(doc);

    onUpdateRef.current({
      editor_content: json,
      plain_text_content: text,
      word_count: wordCount,
    });
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      Superscript,
      Subscript,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      FontFamily,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "academic-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TiptapImage.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: "Start typing or press '/' for AI commands...",
      }),
      CharacterCount,
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      SlashCommandsExtension.configure({
        suggestion: {
          render: createSlashMenuRenderer,
        },
      }),
      OutlinePlugin.configure({
        onOutlineUpdate: (outline) => {
          setOutline(outline);
        },
        debounceMs: 500,
      }),
      Footnote,
      AcademicKeyboardShortcuts,
      CitationNode,
      BibliographyNode,
      CitationNumbering,
    ],
    content: content || undefined,
    editorProps: {
      attributes: {
        class:
          "academic-editor-content max-w-none focus:outline-none min-h-[calc(100vh-12rem)] px-6 py-4",
        spellcheck: "true",
      },
      handleKeyDown: (view, event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
          event.preventDefault();
          flushSave(view.state.doc);
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor: ed }) => {
      // Notify parent that content has changed (before debounce)
      onDirtyRef.current?.();
      setWordCount(getDocumentWordCount(ed.state.doc));

      if (!onUpdateRef.current) return;

      // Clear previous timer
      if (timerRef.current) clearTimeout(timerRef.current);

      // Debounce the save
      timerRef.current = setTimeout(() => {
        const json = ed.getJSON() as Record<string, unknown>;
        const text = ed.getText();
        const wordCount = text
          .split(/\s+/)
          .filter((w) => w.length > 0).length;

        onUpdateRef.current?.({
          editor_content: json,
          plain_text_content: text,
          word_count: wordCount,
        });
      }, debounceMs);
    },
    onSelectionUpdate: ({ editor: ed }) => {
      const { from } = ed.state.selection;
      let closestHeadingPos: number | null = null;
      let closestDist = Infinity;

      ed.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") {
          const dist = from - pos;
          if (dist >= 0 && dist < closestDist) {
            closestDist = dist;
            closestHeadingPos = pos;
          }
        }
      });

      setActiveSectionPos(closestHeadingPos);
    },
  });

  // Notify parent when editor is ready
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      onEditorReadyRef.current?.(editor);
    }
  }, [editor]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Sync content from outside (e.g. loading from DB)
  const setContent = useCallback(
    (newContent: Record<string, unknown>) => {
      if (editor && !editor.isDestroyed) {
        editor.commands.setContent(newContent);
      }
    },
    [editor]
  );

  // When contentKey changes, force-replace editor content (project switch / initial load)
  const prevContentKeyRef = useRef(contentKey);
  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      // On initial load or when contentKey changes, set the content
      if (contentKey !== prevContentKeyRef.current || !prevContentKeyRef.current) {
        prevContentKeyRef.current = contentKey;
        if (content) {
          setContent(content);
        } else {
          // Clear editor for a fresh document
          editor.commands.clearContent();
        }
      }
    }
  }, [editor, content, contentKey, setContent]);

  // Set initial content when editor is ready and content prop is provided
  useEffect(() => {
    if (editor && content && !editor.isDestroyed) {
      const currentText = editor.getText();
      if (!currentText.trim()) {
        setContent(content);
        setWordCount(getDocumentWordCount(editor.state.doc));
      }
    }
  }, [editor, content, setContent, setWordCount]);

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const timer = setTimeout(() => {
        const items: import("@/stores/editor-store").OutlineItem[] = [];
        editor.state.doc.descendants((node, pos) => {
          if (node.type.name === "heading") {
            items.push({
              id: `heading-${pos}`,
              type: "heading",
              level: node.attrs.level as number,
              text: node.textContent,
              pos,
              wordCount: 0,
            });
          }
        });
        if (items.length >= 2) {
          setOutline(items);
        } else {
          setOutline([]);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [editor, setOutline]);

  return (
    <div className={className}>
      <Toolbar
        editor={editor}
        onOpenCitationDialog={onOpenCitationDialog}
        onToggleReferenceSidebar={onToggleReferenceSidebar}
        referenceCount={referenceCount}
      />
      <div className="relative">
        {editor && (
          <>
            <SelectionToolbar editor={editor} />
            <LinkPopover editor={editor} />
            <DocumentOutline editor={editor} />
          </>
        )}
        <EditorContent editor={editor} />
        {editor && <FootnoteSection editor={editor} />}
      </div>
    </div>
  );
}
