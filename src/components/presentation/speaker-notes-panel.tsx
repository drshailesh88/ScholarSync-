"use client";

interface SpeakerNotesPanelProps {
  notes: string;
  onChange: (notes: string) => void;
}

export function SpeakerNotesPanel({ notes, onChange }: SpeakerNotesPanelProps) {
  return (
    <div className="px-4 py-2 border-t border-border-subtle">
      <label className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">
        Speaker Notes
      </label>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add speaker notes for this slide..."
        className="w-full h-16 mt-1 bg-transparent text-xs text-ink-muted placeholder:text-ink-muted/50 resize-none focus:outline-none"
      />
    </div>
  );
}
