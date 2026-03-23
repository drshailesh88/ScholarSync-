"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X } from "@phosphor-icons/react";

interface Shortcut {
  action: string;
  keys: string[];
}

interface ShortcutGroup {
  label: string;
  shortcuts: Shortcut[];
}

const draftShortcuts: ShortcutGroup[] = [
  {
    label: "Formatting",
    shortcuts: [
      { action: "Bold", keys: ["⌘", "B"] },
      { action: "Italic", keys: ["⌘", "I"] },
      { action: "Underline", keys: ["⌘", "U"] },
      { action: "Strikethrough", keys: ["⌘", "⇧", "X"] },
      { action: "Highlight", keys: ["⌘", "⇧", "H"] },
      { action: "Superscript", keys: ["⌘", "⇧", "."] },
      { action: "Subscript", keys: ["⌘", "⇧", ","] },
      { action: "Inline Code", keys: ["⌘", "E"] },
      { action: "Clear Formatting", keys: ["⌘", "\\"] },
    ],
  },
  {
    label: "Structure",
    shortcuts: [
      { action: "Heading 1", keys: ["⌘", "⇧", "1"] },
      { action: "Heading 2", keys: ["⌘", "⇧", "2"] },
      { action: "Heading 3", keys: ["⌘", "⇧", "3"] },
      { action: "Heading 4", keys: ["⌘", "⇧", "4"] },
      { action: "Bullet List", keys: ["⌘", "⇧", "8"] },
      { action: "Ordered List", keys: ["⌘", "⇧", "7"] },
      { action: "Checklist", keys: ["⌘", "⇧", "9"] },
      { action: "Blockquote", keys: ["⌘", "⇧", "B"] },
      { action: "Horizontal Rule", keys: ["⌘", "⇧", "⏎"] },
      { action: "Code Block", keys: ["⌘", "⌥", "C"] },
    ],
  },
  {
    label: "Academic",
    shortcuts: [
      { action: "Insert Citation", keys: ["⌘", "⇧", "C"] },
      { action: "Insert Footnote", keys: ["⌘", "⇧", "F"] },
      { action: "Insert Link", keys: ["⌘", "⇧", "K"] },
      { action: "Slash Commands", keys: ["/"] },
    ],
  },
  {
    label: "Navigation",
    shortcuts: [
      { action: "Save", keys: ["⌘", "S"] },
      { action: "Undo", keys: ["⌘", "Z"] },
      { action: "Redo", keys: ["⌘", "⇧", "Z"] },
      { action: "Toggle Comments", keys: ["⌘", "/"] },
      { action: "Toggle References", keys: ["⌘", "⇧", "R"] },
    ],
  },
];

const latexShortcuts: ShortcutGroup[] = [
  {
    label: "Editor",
    shortcuts: [
      { action: "Save", keys: ["⌘", "S"] },
      { action: "Preview PDF", keys: ["⌘", "⏎"] },
      { action: "Inline AI Edit", keys: ["⌘", "K"] },
      { action: "Toggle Files", keys: ["⌘", "B"] },
      { action: "Toggle Buddy", keys: ["⌘", "J"] },
      { action: "Slash Commands", keys: ["/"] },
    ],
  },
  {
    label: "Slash Commands",
    shortcuts: [
      { action: "Generate Table", keys: ["/table"] },
      { action: "Insert Figure", keys: ["/figure"] },
      { action: "Generate Equation", keys: ["/equation"] },
      { action: "Generate TikZ", keys: ["/tikz"] },
      { action: "Insert Citation", keys: ["/cite"] },
      { action: "Generate BibTeX", keys: ["/bib"] },
      { action: "Fix Error", keys: ["/fix"] },
      { action: "Section Template", keys: ["/template"] },
    ],
  },
  {
    label: "Standard",
    shortcuts: [
      { action: "Undo", keys: ["⌘", "Z"] },
      { action: "Redo", keys: ["⌘", "⇧", "Z"] },
      { action: "Find", keys: ["⌘", "F"] },
      { action: "Find Next", keys: ["⌘", "G"] },
      { action: "Accept Autocomplete", keys: ["Tab"] },
      { action: "Dismiss", keys: ["Esc"] },
    ],
  },
];

const globalShortcuts: ShortcutGroup[] = [
  {
    label: "Global",
    shortcuts: [
      { action: "Command Palette", keys: ["⌘", "K"] },
    ],
  },
];

function getModuleFromPath(pathname: string): { name: string; shortcuts: ShortcutGroup[] } {
  if (pathname.startsWith("/studio") || pathname.startsWith("/editor")) {
    return { name: "Draft", shortcuts: [...draftShortcuts, ...globalShortcuts] };
  }
  if (pathname.startsWith("/latex")) {
    return { name: "LaTeX", shortcuts: [...latexShortcuts, ...globalShortcuts] };
  }
  // Default to Draft shortcuts for all other pages
  return { name: "Draft", shortcuts: [...draftShortcuts, ...globalShortcuts] };
}

interface ShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsPanel({ isOpen, onClose }: ShortcutsPanelProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const initialX = typeof window !== "undefined" ? window.innerWidth - 360 : 400;
  const [position, setPosition] = useState({ x: initialX, y: 100 });
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });

  const currentModule = getModuleFromPath(pathname);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".ss-shortcuts-close")) return;
    dragRef.current = {
      isDragging: true,
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    };
    document.body.style.userSelect = "none";
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging) return;
      setPosition({
        x: e.clientX - dragRef.current.offsetX,
        y: e.clientY - dragRef.current.offsetY,
      });
    };
    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isOpen) return null;

  const filteredGroups = currentModule.shortcuts
    .map((group) => ({
      ...group,
      shortcuts: group.shortcuts.filter((s) =>
        s.action.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.shortcuts.length > 0);

  return (
    <div
      ref={panelRef}
      className="fixed z-[500] flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-[10px] shadow-xl overflow-hidden"
      style={{
        top: position.y,
        left: position.x,
        width: 320,
        minWidth: 240,
        minHeight: 200,
        maxHeight: "70vh",
        resize: "both",
      }}
    >
      {/* Title bar — draggable */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-white/10 cursor-grab active:cursor-grabbing select-none shrink-0"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-900 dark:text-white">
            Keyboard Shortcuts
          </span>
          <span className="text-[10px] font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-1.5 py-0.5 rounded">
            {currentModule.name}
          </span>
        </div>
        <button
          onClick={onClose}
          className="ss-shortcuts-close w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          <X size={12} />
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search shortcuts..."
        className="mx-3 mt-2 mb-1 px-2.5 py-1.5 border border-gray-200 dark:border-white/10 rounded-md text-xs bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:border-violet-500 placeholder:text-gray-400"
      />

      {/* Body */}
      <div
        className="flex-1 overflow-y-auto px-3 pb-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}
      >
        {filteredGroups.map((group) => (
          <div key={group.label} className="mb-3">
            <div className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider py-1">
              {group.label}
            </div>
            {group.shortcuts.map((shortcut) => (
              <div
                key={shortcut.action}
                className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-white/5 last:border-b-0"
              >
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {shortcut.action}
                </span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, i) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/10 min-w-[20px] text-center"
                    >
                      {key}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
