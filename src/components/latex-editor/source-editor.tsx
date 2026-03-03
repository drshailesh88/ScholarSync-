"use client";

import { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from "react";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection, rectangularSelection, highlightActiveLineGutter } from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { syntaxHighlighting, indentOnInput, bracketMatching, foldGutter, foldKeymap, defaultHighlightStyle, HighlightStyle } from "@codemirror/language";
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { lintKeymap } from "@codemirror/lint";
import { latex } from "codemirror-lang-latex";
import { tags } from "@lezer/highlight";
import {
  latexCommandCompletion,
  latexEnvironmentCompletion,
  createCitationCompletion,
  createRefCompletion,
} from "./completions";

// Custom LaTeX-friendly highlight style
const latexHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#7c3aed" },           // Commands: \section, \begin, etc.
  { tag: tags.string, color: "#059669" },             // Strings
  { tag: tags.comment, color: "#94a3b8", fontStyle: "italic" },  // % comments
  { tag: tags.bracket, color: "#d97706" },            // Brackets
  { tag: tags.number, color: "#2563eb" },             // Numbers
  { tag: tags.operator, color: "#dc2626" },           // Operators
  { tag: tags.variableName, color: "#0891b2" },       // Variable names
  { tag: tags.typeName, color: "#7c3aed" },           // Type names
  { tag: tags.heading, color: "#7c3aed", fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
]);

// Dark theme highlight style
const latexDarkHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#a78bfa" },
  { tag: tags.string, color: "#34d399" },
  { tag: tags.comment, color: "#64748b", fontStyle: "italic" },
  { tag: tags.bracket, color: "#fbbf24" },
  { tag: tags.number, color: "#60a5fa" },
  { tag: tags.operator, color: "#f87171" },
  { tag: tags.variableName, color: "#22d3ee" },
  { tag: tags.typeName, color: "#a78bfa" },
  { tag: tags.heading, color: "#a78bfa", fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
]);

// Light theme for CodeMirror
const lightTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent",
    color: "var(--color-ink)",
    fontSize: "13.5px",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
  },
  ".cm-content": {
    caretColor: "var(--color-brand)",
    padding: "16px 0",
  },
  ".cm-cursor": {
    borderLeftColor: "var(--color-brand)",
    borderLeftWidth: "2px",
  },
  ".cm-activeLine": {
    backgroundColor: "var(--color-brand)08",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "var(--color-brand)08",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "1px solid var(--color-border-subtle)",
    color: "var(--color-ink-muted)",
    fontSize: "11px",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 8px 0 16px",
    minWidth: "40px",
  },
  ".cm-foldGutter .cm-gutterElement": {
    padding: "0 4px",
  },
  ".cm-selectionBackground": {
    backgroundColor: "var(--color-brand)20 !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    backgroundColor: "var(--color-brand)30 !important",
  },
  ".cm-searchMatch": {
    backgroundColor: "#fbbf2440",
    outline: "1px solid #fbbf2480",
  },
  ".cm-tooltip": {
    backgroundColor: "var(--color-surface-raised)",
    border: "1px solid var(--color-border)",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  ".cm-tooltip-autocomplete": {
    "& > ul": {
      maxHeight: "220px",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
      fontSize: "12px",
    },
    "& > ul > li": {
      padding: "4px 8px",
      fontSize: "12px",
    },
    "& > ul > li[aria-selected]": {
      backgroundColor: "var(--color-brand)15",
      color: "var(--color-ink)",
    },
  },
  ".cm-completionLabel": {
    fontSize: "12px",
  },
  ".cm-completionDetail": {
    fontSize: "10px",
    fontStyle: "normal",
    opacity: "0.6",
    marginLeft: "8px",
  },
  ".cm-panels": {
    backgroundColor: "var(--color-surface-raised)",
    color: "var(--color-ink)",
  },
});

const themeCompartment = new Compartment();
const highlightCompartment = new Compartment();

/** Handle exposed by SourceEditor via forwardRef */
export interface SourceEditorHandle {
  /** Get the underlying CodeMirror EditorView */
  getView: () => EditorView | null;
  /** Replace text at a specific range */
  replaceRange: (from: number, to: number, text: string) => void;
  /** Scroll to a specific line number (1-based) */
  scrollToLine: (line: number) => void;
  /** Get current selection range */
  getSelection: () => { from: number; to: number; text: string } | null;
  /** Set content (for file switching) */
  setContent: (content: string) => void;
}

interface SourceEditorProps {
  initialContent: string;
  onChange?: (content: string) => void;
  className?: string;
  /** Callback to get .bib file content for citation autocompletion */
  getBibContent?: () => string;
}

export const SourceEditor = forwardRef<SourceEditorHandle, SourceEditorProps>(
  function SourceEditor({ initialContent, onChange, className, getBibContent }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    // Stable ref for bib content getter
    const getBibContentRef = useRef(getBibContent);
    getBibContentRef.current = getBibContent;

    // Expose imperative handle to parent
    useImperativeHandle(ref, () => ({
      getView: () => viewRef.current,
      replaceRange: (from: number, to: number, text: string) => {
        viewRef.current?.dispatch({
          changes: { from, to, insert: text },
          selection: { anchor: from + text.length },
        });
      },
      scrollToLine: (line: number) => {
        const view = viewRef.current;
        if (!view) return;
        const lineCount = view.state.doc.lines;
        const clampedLine = Math.max(1, Math.min(line, lineCount));
        const lineInfo = view.state.doc.line(clampedLine);
        view.dispatch({
          selection: { anchor: lineInfo.from },
          scrollIntoView: true,
        });
        view.focus();
      },
      getSelection: () => {
        const view = viewRef.current;
        if (!view) return null;
        const { from, to } = view.state.selection.main;
        return { from, to, text: view.state.sliceDoc(from, to) };
      },
      setContent: (content: string) => {
        const view = viewRef.current;
        if (!view) return;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: content },
          selection: { anchor: 0 },
        });
      },
    }));

    // Detect dark mode
    const isDark = useCallback(() => {
      if (typeof document === "undefined") return false;
      return document.documentElement.classList.contains("dark");
    }, []);

    useEffect(() => {
      if (!containerRef.current) return;

      const updateListener = EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current?.(update.state.doc.toString());
        }
      });

      // Build LaTeX-specific completion sources
      const citationSource = createCitationCompletion(
        () => getBibContentRef.current?.() ?? ""
      );
      const refSource = createRefCompletion(
        () => viewRef.current?.state.doc.toString() ?? ""
      );

      const state = EditorState.create({
        doc: initialContent,
        extensions: [
          // Line numbers and gutters
          lineNumbers(),
          highlightActiveLineGutter(),
          foldGutter(),

          // History (undo/redo)
          history(),

          // Selection and drawing
          drawSelection(),
          rectangularSelection(),
          highlightActiveLine(),
          highlightSelectionMatches(),

          // Input handling
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),

          // LaTeX autocompletion with custom sources
          autocompletion({
            override: [
              latexEnvironmentCompletion,  // Must be before command (more specific match)
              latexCommandCompletion,
              citationSource,
              refSource,
            ],
            defaultKeymap: true,
            activateOnTyping: true,
            maxRenderedOptions: 12,
          }),

          // LaTeX language support
          latex(),

          // Theme
          themeCompartment.of(lightTheme),
          highlightCompartment.of(
            syntaxHighlighting(isDark() ? latexDarkHighlightStyle : latexHighlightStyle)
          ),
          syntaxHighlighting(defaultHighlightStyle, { fallback: true }),

          // Keymaps
          keymap.of([
            ...defaultKeymap,
            ...historyKeymap,
            ...completionKeymap,
            ...closeBracketsKeymap,
            ...searchKeymap,
            ...foldKeymap,
            ...lintKeymap,
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

      // Watch for theme changes
      const observer = new MutationObserver(() => {
        const dark = isDark();
        view.dispatch({
          effects: highlightCompartment.reconfigure(
            syntaxHighlighting(dark ? latexDarkHighlightStyle : latexHighlightStyle)
          ),
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => {
        observer.disconnect();
        view.destroy();
        viewRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={containerRef}
        className={`h-full overflow-auto [&_.cm-editor]:h-full [&_.cm-editor]:outline-none ${className ?? ""}`}
      />
    );
  }
);
