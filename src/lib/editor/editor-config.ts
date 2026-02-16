/**
 * Editor configuration constants and shortcut mappings.
 */

export const EDITOR_SHORTCUTS = {
  // Text formatting
  bold: "Mod-b",
  italic: "Mod-i",
  underline: "Mod-u",
  strikethrough: "Mod-Shift-x",
  inlineCode: "Mod-e",
  superscript: "Mod-.",
  subscript: "Mod-,",
  clearFormatting: "Mod-\\",

  // Headings
  normalText: "Mod-Alt-0",
  heading1: "Mod-Alt-1",
  heading2: "Mod-Alt-2",
  heading3: "Mod-Alt-3",
  heading4: "Mod-Alt-4",

  // Lists
  bulletList: "Mod-Shift-8",
  orderedList: "Mod-Shift-7",
  taskList: "Mod-Shift-9",
  blockquote: "Mod-Shift-b",

  // Navigation
  documentOutline: "Mod-Shift-o",
  find: "Mod-f",
  findReplace: "Mod-Shift-h",

  // Collaboration
  insertComment: "Mod-Shift-m",
  insertCitation: "Mod-Shift-c",
  suggestingMode: "Mod-Shift-s",
  versionHistory: "Mod-Shift-h",
  referenceSidebar: "Mod-Shift-r",

  // AI
  commandBar: "Mod-k",

  // General
  undo: "Mod-z",
  redo: "Mod-Shift-z",
  save: "Mod-s",
} as const;

/**
 * Fonts available for the editor.
 */
export const EDITOR_FONTS = {
  serif: {
    label: "Serif",
    family: "var(--font-merriweather), Georgia, serif",
    description: "Best for manuscript drafting",
  },
  sans: {
    label: "Sans-serif",
    family: "var(--font-inter), system-ui, sans-serif",
    description: "Clean and modern",
  },
  mono: {
    label: "Monospace",
    family: "'JetBrains Mono', 'Fira Code', monospace",
    description: "For code-heavy manuscripts",
  },
} as const;

/**
 * Typography settings.
 */
export const TYPOGRAPHY = {
  bodySize: "16px",
  lineHeight: "1.75",
  headingLineHeight: "1.3",
  contentMaxWidth: "720px",
  wideMaxWidth: "960px",
  h1Size: "28px",
  h2Size: "22px",
  h3Size: "18px",
  h4Size: "16px",
} as const;
