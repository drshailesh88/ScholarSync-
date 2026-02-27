"use client";

import { useState, useEffect, useRef } from "react";
import {
  Table,
  Image,
  MathOperations,
  TreeStructure,
  Wrench,
  BookOpen,
  BookmarkSimple,
  FileText,
} from "@phosphor-icons/react";

interface SlashCommand {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  aiModel: "claude" | "nano" | "none";
}

const SLASH_COMMANDS: SlashCommand[] = [
  { id: "table", label: "/table", description: "Generate a table from description", icon: Table, aiModel: "claude" },
  { id: "figure", label: "/figure", description: "Insert figure environment", icon: Image, aiModel: "claude" },
  { id: "equation", label: "/equation", description: "Generate equation from description", icon: MathOperations, aiModel: "nano" },
  { id: "tikz", label: "/tikz", description: "Generate TikZ diagram", icon: TreeStructure, aiModel: "claude" },
  { id: "cite", label: "/cite", description: "Search and insert citation", icon: BookmarkSimple, aiModel: "none" },
  { id: "bib", label: "/bib", description: "Generate BibTeX from DOI/title", icon: BookOpen, aiModel: "none" },
  { id: "fix", label: "/fix", description: "Fix nearest compilation error", icon: Wrench, aiModel: "nano" },
  { id: "template", label: "/template", description: "Insert section template", icon: FileText, aiModel: "none" },
];

interface SlashCommandMenuProps {
  position: { top: number; left: number };
  filter: string;
  onSelect: (command: SlashCommand) => void;
  onDismiss: () => void;
}

export function SlashCommandMenu({ position, filter, onSelect, onDismiss }: SlashCommandMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const filtered = SLASH_COMMANDS.filter(
    (cmd) =>
      cmd.id.includes(filter.toLowerCase()) ||
      cmd.label.includes(filter.toLowerCase()) ||
      cmd.description.toLowerCase().includes(filter.toLowerCase())
  );

  // selectedIndex always starts at 0 — the menu is freshly mounted each time
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          onSelect(filtered[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        onDismiss();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [filtered, selectedIndex, onSelect, onDismiss]);

  // Dismiss on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onDismiss();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onDismiss]);

  if (filtered.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-64 rounded-xl glass-panel border border-border shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150"
      style={{ top: position.top, left: position.left }}
    >
      {filtered.map((cmd, i) => {
        const Icon = cmd.icon;
        return (
          <button
            key={cmd.id}
            onClick={() => onSelect(cmd)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
              i === selectedIndex
                ? "bg-brand/10 text-ink"
                : "text-ink-muted hover:bg-surface-raised hover:text-ink"
            }`}
          >
            <Icon size={16} className={i === selectedIndex ? "text-brand" : ""} />
            <div className="min-w-0">
              <p className="text-xs font-medium">{cmd.label}</p>
              <p className="text-[10px] text-ink-muted truncate">{cmd.description}</p>
            </div>
            {cmd.aiModel !== "none" && (
              <span className={`ml-auto text-[8px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${
                cmd.aiModel === "claude"
                  ? "bg-brand/10 text-brand"
                  : "bg-emerald-500/10 text-emerald-500"
              }`}>
                {cmd.aiModel === "claude" ? "Claude" : "Nano"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export type { SlashCommand };
export { SLASH_COMMANDS };
