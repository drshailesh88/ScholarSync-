"use client";

import { Lightbulb } from "@phosphor-icons/react";

interface PDFSuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export function PDFSuggestedQuestions({
  questions,
  onSelect,
}: PDFSuggestedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="px-3 py-2">
      <div className="flex items-center gap-1.5 mb-2">
        <Lightbulb size={14} className="text-ink-muted" />
        <span className="text-xs text-ink-muted font-medium">
          Suggested questions
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="px-2.5 py-1 rounded-full text-xs text-ink-muted bg-surface-raised border border-border hover:text-ink hover:border-ink-muted/30 transition-colors text-left"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
