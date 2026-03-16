"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function ProjectSelector({
  projects,
  selectedId,
  onSelect,
}: {
  projects: { id: number; title: string }[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = projects.find((p) => p.id === selectedId);

  if (projects.length <= 1) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-ink-muted hover:text-ink bg-surface-raised/50 hover:bg-surface-raised border border-border-subtle transition-colors max-w-[180px]"
      >
        <span className="truncate">{selected?.title ?? "Select project"}</span>
        <CaretDown size={10} className="shrink-0" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-56 rounded-lg glass-panel border border-border shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
          {/* empty state: no data, no results, nothing here */}
          {projects.length === 0 && (
            <p className="text-xs text-ink-muted text-center py-2">no results yet. Create a project to get started.</p>
          )}
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelect(p.id);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-xs transition-colors",
                p.id === selectedId
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-ink hover:bg-surface-raised"
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
