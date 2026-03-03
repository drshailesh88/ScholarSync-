"use client";

import { useEffect, useRef } from "react";
import { EditorView, keymap, drawSelection, Decoration, DecorationSet, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view";
import { EditorState, Compartment, RangeSetBuilder } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, indentOnInput } from "@codemirror/language";
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { latex } from "codemirror-lang-latex";

// ---------------------------------------------------------------------------
// WYSIWYM Decoration Widgets
// ---------------------------------------------------------------------------

class BoldWidget extends WidgetType {
  toDOM() {
    const el = document.createElement("span");
    el.className = "cm-visual-bold";
    return el;
  }
  ignoreEvent() { return false; }
}

class ItalicWidget extends WidgetType {
  toDOM() {
    const el = document.createElement("span");
    el.className = "cm-visual-italic";
    return el;
  }
  ignoreEvent() { return false; }
}

// ---------------------------------------------------------------------------
// Visual Decorations Plugin
// ---------------------------------------------------------------------------

/**
 * Find the matching closing brace for a command, handling nested braces.
 * Returns the index of the closing brace, or -1 if not found.
 */
function findMatchingBrace(text: string, openIdx: number): number {
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Decorations that render LaTeX commands visually while keeping them editable */
function buildVisualDecorations(view: EditorView): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  const doc = view.state.doc;

  for (let i = 1; i <= doc.lines; i++) {
    const line = doc.line(i);
    const text = line.text;

    // Section headings — make them visually larger
    const sectionMatch = text.match(/^\\(section|subsection|subsubsection)\*?\{(.+)\}$/);
    if (sectionMatch) {
      const level = sectionMatch[1] === "section" ? 0 : sectionMatch[1] === "subsection" ? 1 : 2;
      const sizes = ["cm-visual-h1", "cm-visual-h2", "cm-visual-h3"];
      builder.add(line.from, line.from, Decoration.line({ class: sizes[level] }));
    }

    // Process formatting commands with proper brace matching
    const formatCommands: { cmd: string; cmdLen: number; cls: string; widget: WidgetType | null }[] = [
      { cmd: "\\textbf{", cmdLen: 8, cls: "font-bold", widget: new BoldWidget() },
      { cmd: "\\textit{", cmdLen: 8, cls: "italic", widget: new ItalicWidget() },
      { cmd: "\\emph{", cmdLen: 6, cls: "italic", widget: null },
      { cmd: "\\underline{", cmdLen: 11, cls: "underline", widget: null },
      { cmd: "\\texttt{", cmdLen: 8, cls: "font-mono text-sm", widget: null },
    ];

    for (const fmt of formatCommands) {
      let searchFrom = 0;
      while (true) {
        const cmdIdx = text.indexOf(fmt.cmd, searchFrom);
        if (cmdIdx === -1) break;

        const braceOpen = cmdIdx + fmt.cmdLen - 1;
        const braceClose = findMatchingBrace(text, braceOpen);
        if (braceClose === -1) {
          searchFrom = cmdIdx + fmt.cmdLen;
          continue;
        }

        const absStart = line.from + cmdIdx;
        const absContentStart = line.from + braceOpen + 1;
        const absContentEnd = line.from + braceClose;
        const absEnd = absContentEnd + 1;

        try {
          if (fmt.widget) {
            builder.add(absStart, absContentStart, Decoration.replace({ widget: fmt.widget }));
          } else {
            builder.add(absStart, absContentStart, Decoration.replace({}));
          }
          if (absContentStart < absContentEnd) {
            builder.add(absContentStart, absContentEnd, Decoration.mark({ class: fmt.cls }));
          }
          builder.add(absContentEnd, absEnd, Decoration.replace({}));
        } catch {
          // Overlapping decorations — skip
        }

        searchFrom = braceClose + 1;
      }
    }

    // List items — visual indicator
    if (text.match(/^\s*\\item\s/)) {
      builder.add(line.from, line.from, Decoration.line({ class: "cm-visual-list-item" }));
    }

    // Citation preview — subtle styling for \cite{key}
    if (text.includes("\\cite")) {
      const citeRegex = /\\cite[tp]?\{[^}]*\}/g;
      let citeMatch;
      while ((citeMatch = citeRegex.exec(text)) !== null) {
        const absStart = line.from + citeMatch.index;
        const absEnd = absStart + citeMatch[0].length;
        builder.add(absStart, absEnd, Decoration.mark({ class: "cm-visual-cite" }));
      }
    }

    // Environment highlights (expanded list)
    if (text.match(/^\\begin\{(equation|align|figure|table|itemize|enumerate)\*?\}/)) {
      builder.add(line.from, line.from, Decoration.line({ class: "cm-visual-env-start" }));
    }
    if (text.match(/^\\end\{(equation|align|figure|table|itemize|enumerate)\*?\}/)) {
      builder.add(line.from, line.from, Decoration.line({ class: "cm-visual-env-end" }));
    }
  }

  return builder.finish();
}

const visualPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = buildVisualDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = buildVisualDecorations(update.view);
      }
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

// ---------------------------------------------------------------------------
// Visual Theme
// ---------------------------------------------------------------------------

const visualTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent",
    color: "var(--color-ink)",
    fontSize: "14px",
    fontFamily: "'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif",
    lineHeight: "1.7",
  },
  ".cm-content": {
    caretColor: "var(--color-brand)",
    padding: "24px 32px",
    maxWidth: "680px",
    margin: "0 auto",
  },
  ".cm-cursor": {
    borderLeftColor: "var(--color-brand)",
    borderLeftWidth: "2px",
  },
  ".cm-gutters": {
    display: "none",
  },
  ".cm-activeLine": {
    backgroundColor: "transparent",
  },
  ".cm-selectionBackground": {
    backgroundColor: "var(--color-brand)20 !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    backgroundColor: "var(--color-brand)30 !important",
  },
  // Visual heading styles
  ".cm-visual-h1": {
    fontSize: "1.5em",
    fontWeight: "700",
    lineHeight: "1.3",
    paddingTop: "16px",
    paddingBottom: "4px",
  },
  ".cm-visual-h2": {
    fontSize: "1.25em",
    fontWeight: "600",
    lineHeight: "1.3",
    paddingTop: "12px",
    paddingBottom: "2px",
  },
  ".cm-visual-h3": {
    fontSize: "1.1em",
    fontWeight: "600",
    lineHeight: "1.3",
    paddingTop: "8px",
  },
  // Environment highlighting
  ".cm-visual-env-start": {
    borderLeft: "2px solid var(--color-brand)",
    paddingLeft: "8px",
    opacity: "0.6",
    fontSize: "0.85em",
  },
  ".cm-visual-env-end": {
    borderLeft: "2px solid var(--color-brand)",
    paddingLeft: "8px",
    opacity: "0.6",
    fontSize: "0.85em",
  },
  // List item styling
  ".cm-visual-list-item": {
    paddingLeft: "24px",
    position: "relative",
  },
  // Citation styling
  ".cm-visual-cite": {
    color: "var(--color-brand)",
    fontWeight: "500",
    backgroundColor: "var(--color-brand)08",
    borderRadius: "3px",
    padding: "0 2px",
  },
  // Tooltip/autocomplete styles
  ".cm-tooltip": {
    backgroundColor: "var(--color-surface-raised)",
    border: "1px solid var(--color-border)",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  },
  ".cm-panels": {
    backgroundColor: "var(--color-surface-raised)",
    color: "var(--color-ink)",
  },
});

const themeCompartment = new Compartment();

// ---------------------------------------------------------------------------
// Visual Editor Component
// ---------------------------------------------------------------------------

interface VisualEditorProps {
  initialContent: string;
  onChange?: (content: string) => void;
  className?: string;
}

export function VisualEditor({ initialContent, onChange, className }: VisualEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current?.(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: initialContent,
      extensions: [
        // Visual decorations
        visualPlugin,

        // History (undo/redo)
        history(),

        // Selection and drawing
        drawSelection(),
        highlightSelectionMatches(),

        // Input handling
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),

        // Autocompletion
        autocompletion(),

        // LaTeX language support (still needed for parsing)
        latex(),

        // Visual theme
        themeCompartment.of(visualTheme),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),

        // Keymaps
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          ...completionKeymap,
          ...closeBracketsKeymap,
          ...searchKeymap,
          indentWithTab,
        ]),

        // Change listener
        updateListener,

        // Line wrapping
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-full overflow-auto bg-white dark:bg-slate-950/30 [&_.cm-editor]:h-full [&_.cm-editor]:outline-none ${className ?? ""}`}
    />
  );
}
