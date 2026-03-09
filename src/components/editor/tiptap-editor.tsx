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
import { useRef, useCallback, useEffect } from "react";
import { Toolbar } from "./toolbar";
import { SlashCommands } from "./slash-commands";
import { CitationNode } from "./extensions/citation-node";
import { BibliographyNode } from "./extensions/bibliography-node";
import { createCitationPlugin } from "./extensions/citation-plugin";
import { AcademicKeyboardShortcuts } from "./extensions/keyboard-shortcuts";
import { SelectionToolbar } from "./SelectionToolbar";
import { LinkPopover } from "./LinkPopover";
import { Extension } from "@tiptap/core";

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

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    onDirtyRef.current = onDirty;
  }, [onDirty]);

  useEffect(() => {
    onEditorReadyRef.current = onEditorReady;
  }, [onEditorReady]);

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
      Placeholder.configure({
        placeholder: "Start typing or press '/' for AI commands...",
      }),
      CharacterCount,
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      SlashCommands,
      AcademicKeyboardShortcuts,
      CitationNode,
      BibliographyNode,
      CitationNumbering,
    ],
    content: content || undefined,
    editorProps: {
      attributes: {
        class:
          "academic-editor-content max-w-none focus:outline-none min-h-[400px] px-6 py-4",
        spellcheck: "true",
      },
    },
    onUpdate: ({ editor: ed }) => {
      // Notify parent that content has changed (before debounce)
      onDirtyRef.current?.();

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
      }
    }
  }, [editor, content, setContent]);

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
          </>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
