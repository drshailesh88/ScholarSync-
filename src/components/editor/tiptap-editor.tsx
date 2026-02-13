"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useCallback, useEffect } from "react";
import { Toolbar } from "./toolbar";
import { SlashCommands } from "./slash-commands";

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
}

export function TiptapEditor({
  className,
  content,
  onUpdate,
  debounceMs = 2000,
}: TiptapEditorProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Start typing or press '/' for AI commands...",
      }),
      SlashCommands,
    ],
    content: content || undefined,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none font-serif text-ink focus:outline-none min-h-[400px] px-6 py-4",
      },
    },
    onUpdate: ({ editor: ed }) => {
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

  // Set initial content when editor is ready and content prop changes
  useEffect(() => {
    if (editor && content && !editor.isDestroyed) {
      // Only set if editor is empty (initial load)
      const currentText = editor.getText();
      if (!currentText.trim()) {
        setContent(content);
      }
    }
  }, [editor, content, setContent]);

  return (
    <div className={className}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
