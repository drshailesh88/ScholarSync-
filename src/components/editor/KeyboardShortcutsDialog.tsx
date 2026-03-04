"use client";

import {
  X,
  Keyboard,
  CaretRight,
  TextB,
  TextH,
  ListBullets,
  ListNumbers,
  Quotes,
  Minus,
  Code,
  TextSuperscript,
  FloppyDisk,
  ArrowUUpLeft,
  Question,
} from "@phosphor-icons/react";

interface KeyboardShortcutsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const shortcuts: {
  category: string;
  items: ShortcutItem[];
}[] = [
  {
    category: "Formatting",
    items: [
      { keys: ["Cmd", "B"], description: "Bold", icon: TextB },
      { keys: ["Cmd", "I"], description: "Italic", icon: TextH },
      { keys: ["Cmd", "U"], description: "Underline" },
      { keys: ["Cmd", "Shift", "X"], description: "Strikethrough" },
      { keys: ["Cmd", "Shift", "H"], description: "Highlight" },
      { keys: ["Cmd", "Shift", "."], description: "Superscript", icon: TextSuperscript },
      { keys: ["Cmd", "Shift", ","], description: "Subscript", icon: TextSuperscript },
      { keys: ["Cmd", "E"], description: "Inline Code", icon: Code },
    ],
  },
  {
    category: "Structure",
    items: [
      { keys: ["Cmd", "Shift", "1"], description: "Heading 1", icon: TextH },
      { keys: ["Cmd", "Shift", "2"], description: "Heading 2", icon: TextH },
      { keys: ["Cmd", "Shift", "3"], description: "Heading 3", icon: TextH },
      { keys: ["Cmd", "Shift", "4"], description: "Heading 4", icon: TextH },
      { keys: ["Cmd", "Shift", "8"], description: "Bullet List", icon: ListBullets },
      { keys: ["Cmd", "Shift", "7"], description: "Ordered List", icon: ListNumbers },
      { keys: ["Cmd", "Shift", "B"], description: "Blockquote", icon: Quotes },
      { keys: ["Cmd", "Shift", "Enter"], description: "Horizontal Rule", icon: Minus },
    ],
  },
  {
    category: "Academic",
    items: [
      { keys: ["Cmd", "Shift", "C"], description: "Insert Citation" },
      { keys: ["Cmd", "Shift", "F"], description: "Insert Footnote" },
      { keys: ["Cmd", "Shift", "K"], description: "Insert Link" },
    ],
  },
  {
    category: "Tools",
    items: [
      { keys: ["Cmd", "Z"], description: "Undo", icon: ArrowUUpLeft },
      { keys: ["Cmd", "Shift", "Z"], description: "Redo", icon: CaretRight },
      { keys: ["Cmd", "S"], description: "Save", icon: FloppyDisk },
      { keys: ["Cmd", "/"], description: "Toggle Comments" },
      { keys: ["/"], description: "Slash Commands", icon: Question },
    ],
  },
];

export function KeyboardShortcutsDialog({
  isOpen,
  onClose,
}: KeyboardShortcutsDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Keyboard size={20} className="text-brand" />
            <h2 className="text-lg font-semibold text-ink">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-raised text-ink-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {shortcuts.map((section) => (
            <div key={section.category} className="mb-6 last:mb-0">
              <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                {section.category}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-raised border border-border/50"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && (
                        <item.icon size={16} className="text-ink-muted" />
                      )}
                      <span className="text-sm text-ink">{item.description}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {item.keys.map((key, k) => (
                        <span key={k} className="px-1.5 py-0.5 text-xs font-medium text-ink-muted bg-surface border border-border rounded">
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
