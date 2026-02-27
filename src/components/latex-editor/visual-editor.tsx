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

/** Decorations that render LaTeX commands visually while keeping them editable */
function buildVisualDecorations(view: EditorView): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  const doc = view.state.doc;

  for (let i = 1; i <= doc.lines; i++) {
    const line = doc.line(i);
    const text = line.text;

    // Section headings - make them visually larger
    const sectionMatch = text.match(/^\\(section|subsection|subsubsection)\*?\{(.+)\}$/);
    if (sectionMatch) {
      const level = sectionMatch[1] === "section" ? 0 : sectionMatch[1] === "subsection" ? 1 : 2;
      const sizes = ["cm-visual-h1", "cm-visual-h2", "cm-visual-h3"];
      builder.add(line.from, line.from, Decoration.line({ class: sizes[level] }));
    }

    // Bold text styling
    let boldMatch;
    const boldRegex = /\\textbf\{([^}]*)\}/g;
    while ((boldMatch = boldRegex.exec(text)) !== null) {
      const start = line.from + boldMatch.index;
      // Hide the \textbf{ part
      builder.add(start, start + 8, Decoration.replace({ widget: new BoldWidget() }));
      // Mark the content as bold
      const contentEnd = start + boldMatch[0].length - 1;
      builder.add(start + 8, contentEnd, Decoration.mark({ class: "font-bold" }));
      // Hide the closing }
      builder.add(contentEnd, contentEnd + 1, Decoration.replace({}));
    }

    // Italic text styling
    let italicMatch;
    const italicRegex = /\\textit\{([^}]*)\}/g;
    while ((italicMatch = italicRegex.exec(text)) !== null) {
      const start = line.from + italicMatch.index;
      builder.add(start, start + 8, Decoration.replace({ widget: new ItalicWidget() }));
      const contentEnd = start + italicMatch[0].length - 1;
      builder.add(start + 8, contentEnd, Decoration.mark({ class: "italic" }));
      builder.add(contentEnd, contentEnd + 1, Decoration.replace({}));
    }

    // Emph styling
    let emphMatch;
    const emphRegex = /\\emph\{([^}]*)\}/g;
    while ((emphMatch = emphRegex.exec(text)) !== null) {
      const start = line.from + emphMatch.index;
      builder.add(start, start + 6, Decoration.replace({}));
      const contentEnd = start + emphMatch[0].length - 1;
      builder.add(start + 6, contentEnd, Decoration.mark({ class: "italic" }));
      builder.add(contentEnd, contentEnd + 1, Decoration.replace({}));
    }

    // Environment highlights
    if (text.match(/^\\begin\{(equation|align|figure|table)\*?\}/)) {
      builder.add(line.from, line.from, Decoration.line({ class: "cm-visual-env-start" }));
    }
    if (text.match(/^\\end\{(equation|align|figure|table)\*?\}/)) {
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
