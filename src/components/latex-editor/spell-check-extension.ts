/**
 * CodeMirror Spell Check Extension
 *
 * Provides real-time spell checking for LaTeX documents with:
 * - Blue squiggly underlines for unknown words
 * - Right-click suggestions
 * - Medical/scientific dictionary support
 */

import { linter, type Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";

export interface SpellError {
  word: string;
  line: number;
  column: number;
  suggestions: string[];
}

/**
 * Create a spell check linter for CodeMirror.
 * Calls the server-side spell checker API.
 */
export function createSpellCheckLinter() {
  return linter(
    async (view: EditorView): Promise<Diagnostic[]> => {
      const content = view.state.doc.toString();

      // Skip if content is too short
      if (content.length < 10) return [];

      try {
        const res = await fetch("/api/latex/spell-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });

        if (!res.ok) return [];

        const { errors } = (await res.json()) as { errors: SpellError[] };

        // Map spell errors to CodeMirror diagnostics
        return errors.map((err): Diagnostic => {
          const line = view.state.doc.line(err.line);
          const from = line.from + err.column - 1; // Convert 1-based to 0-based
          const to = from + err.word.length;

          return {
            from,
            to,
            severity: "info", // Blue squiggles instead of red
            message: `Unknown word: "${err.word}"`,
            actions: err.suggestions.slice(0, 3).map((suggestion) => ({
              name: `→ ${suggestion}`,
              apply(view: EditorView, from: number, to: number) {
                view.dispatch({
                  changes: { from, to, insert: suggestion },
                });
              },
            })),
          };
        });
      } catch {
        // Silent failure - don't block editing
        return [];
      }
    },
    { delay: 2000 } // 2 second debounce
  );
}

/**
 * Create a "Add to dictionary" action for spell check diagnostics.
 * This is a placeholder - actual implementation would need server-side persistence.
 */
export function createAddToDictionaryAction(word: string) {
  return {
    name: `Add "${word}" to dictionary`,
    apply(_view: EditorView, _from: number, _to: number) {
      // Send to server to add to personal dictionary
      fetch("/api/latex/spell-check/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      }).catch(() => {
        // Silent failure
      });
    },
  };
}
