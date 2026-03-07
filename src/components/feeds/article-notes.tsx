"use client";

import { useEffect, useRef, useState } from "react";
import { Check, NoteBlank } from "@phosphor-icons/react";
import { useFeedStore } from "@/stores/feed-store";

interface ArticleNotesProps {
  articleId: number;
}

export function ArticleNotes({ articleId }: ArticleNotesProps) {
  const notes = useFeedStore((s) => s.articleNotes[articleId] || "");
  const saveArticleNote = useFeedStore((s) => s.saveArticleNote);

  const [localValue, setLocalValue] = useState(notes);
  const [saved, setSaved] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedIndicatorRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(notes);
  }, [notes]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
      if (savedIndicatorRef.current) {
        clearTimeout(savedIndicatorRef.current);
      }
    };
  }, []);

  const showSavedState = () => {
    setSaved(true);
    if (savedIndicatorRef.current) {
      clearTimeout(savedIndicatorRef.current);
    }
    savedIndicatorRef.current = setTimeout(() => setSaved(false), 2000);
  };

  const persist = (value: string) => {
    void saveArticleNote(articleId, value);
    showSavedState();
  };

  const handleChange = (value: string) => {
    setLocalValue(value);

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      persist(value);
    }, 1000);
  };

  const handleBlur = () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    if (localValue !== notes) {
      persist(localValue);
    }
  };

  return (
    <div className="mt-3">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
          <NoteBlank size={14} />
          <span>Notes</span>
        </div>
        {saved && (
          <div className="flex items-center gap-1 text-xs text-emerald-500">
            <Check size={12} />
            <span>Saved</span>
          </div>
        )}
      </div>

      <textarea
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="Add your notes about this article..."
        rows={3}
        className="w-full resize-none rounded-xl border border-border bg-surface-raised px-3 py-2 text-xs leading-relaxed text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
    </div>
  );
}
