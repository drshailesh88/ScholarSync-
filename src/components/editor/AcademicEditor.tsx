"use client";

import { useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import { StarterKit } from "@tiptap/starter-kit";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Typography } from "@tiptap/extension-typography";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";

import { SlashCommandsExtension } from "./extensions/slash-commands";
import { OutlinePlugin } from "./extensions/outline-plugin";
import { createSlashMenuRenderer } from "./SlashMenu";
import { SelectionToolbar } from "./SelectionToolbar";
import { TopBar } from "./TopBar";
import { DocumentOutline } from "./DocumentOutline";
import { LinkPopover } from "./LinkPopover";
import { useEditorStore } from "@/stores/editor-store";
import { getDocumentWordCount } from "@/lib/editor/word-counter";

interface AcademicEditorProps {
  /** Initial content (Tiptap JSON format) */
  content?: JSONContent | null;
  /** Document type for placeholder context */
  documentType?: string;
  /** Called on content changes (debounced) */
  onUpdate?: (data: {
    editor_content: JSONContent;
    plain_text_content: string;
    word_count: number;
  }) => void;
  /** Debounce delay for onUpdate in ms */
  debounceMs?: number;
  /** Whether the editor is read-only */
  readOnly?: boolean;
}

export function AcademicEditor({
  content,
  documentType = "original-article",
  onUpdate,
  debounceMs = 2000,
  readOnly = false,
}: AcademicEditorProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  const {
    setWordCount,
    setOutline,
    setSaveStatus,
    setActiveSectionPos,
    mode,
  } = useEditorStore();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        // Disable link/underline from StarterKit — we configure them separately
        link: false,
        underline: false,
      }),
      // Underline configured separately
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
      // Link configured separately for custom behavior
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
        showOnlyCurrent: true,
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            if (node.attrs.level === 1) return "Manuscript title...";
            return "Section heading...";
          }
          if (node.type.name === "paragraph") {
            return "Start writing, or type / for commands...";
          }
          return "";
        },
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
    ],
    content: content || undefined,
    editable: !readOnly && mode !== "viewing",
    editorProps: {
      attributes: {
        class:
          "academic-editor-content prose prose-lg max-w-none focus:outline-none min-h-[calc(100vh-12rem)]",
        spellcheck: "true",
      },
      handleKeyDown: (_view, event) => {
        // Cmd+S: Prevent default browser save, trigger manual save
        if ((event.metaKey || event.ctrlKey) && event.key === "s") {
          event.preventDefault();
          flushSave();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor: ed }) => {
      // Update word count immediately
      const wc = getDocumentWordCount(ed.state.doc);
      setWordCount(wc);

      // Mark as unsaved
      setSaveStatus({ state: "saving" });

      // Debounce the save callback
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const json = ed.getJSON();
        const text = ed.getText();
        const wordCount = getDocumentWordCount(ed.state.doc);

        onUpdateRef.current?.({
          editor_content: json,
          plain_text_content: text,
          word_count: wordCount,
        });

        setSaveStatus({ state: "saved", lastSavedAt: new Date() });
      }, debounceMs);
    },
    onSelectionUpdate: ({ editor: ed }) => {
      // Update active section in outline
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

  // Flush save immediately (for Cmd+S)
  const flushSave = useCallback(() => {
    if (!editor) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    const json = editor.getJSON();
    const text = editor.getText();
    const wc = getDocumentWordCount(editor.state.doc);

    onUpdateRef.current?.({
      editor_content: json,
      plain_text_content: text,
      word_count: wc,
    });

    setSaveStatus({ state: "saved", lastSavedAt: new Date() });
  }, [editor, setSaveStatus]);

  // Update editable state when mode changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly && mode !== "viewing");
    }
  }, [editor, mode, readOnly]);

  // Set initial content when editor is ready
  useEffect(() => {
    if (editor && content && !editor.isDestroyed) {
      const currentText = editor.getText();
      if (!currentText.trim()) {
        editor.commands.setContent(content);
        // Initial word count and outline
        const wc = getDocumentWordCount(editor.state.doc);
        setWordCount(wc);
      }
    }
  }, [editor, content, setWordCount]);

  // Initial outline build
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
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [editor, setOutline]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Fixed top bar */}
      <TopBar editor={editor} />

      {/* Editor area */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="academic-editor-wrapper max-w-[720px] mx-auto px-6 py-8">
          {/* Selection toolbar (floating) */}
          <SelectionToolbar editor={editor} />

          {/* Link popover */}
          <LinkPopover editor={editor} />

          {/* Editor content */}
          <EditorContent editor={editor} />
        </div>

        {/* Document outline (floating right) */}
        <DocumentOutline editor={editor} />
      </div>
    </div>
  );
}
