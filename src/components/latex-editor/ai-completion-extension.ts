import { EditorView, Decoration, ViewPlugin, WidgetType } from "@codemirror/view";
import { RangeSet } from "@codemirror/state";
import { StateEffect, StateField } from "@codemirror/state";

// Ghost text widget for displaying completions
class GhostTextWidget extends WidgetType {
  constructor(readonly text: string) {
    super();
  }

  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-ghost-text";
    span.textContent = this.text;
    return span;
  }

  ignoreEvent() {
    return false;
  }
}

// State effect for setting ghost text
const setGhostText = StateEffect.define<{ text: string; pos: number } | null>({
  map: (value, mapping) => {
    if (!value) return null;
    return { text: value.text, pos: mapping.mapPos(value.pos) };
  },
});

// State field to track ghost text
const ghostTextField = StateField.define<RangeSet<Decoration>>({
  create() {
    return Decoration.none;
  },
  update(value, tr) {
    for (const effect of tr.effects) {
      if (effect.is(setGhostText)) {
        if (effect.value === null) {
          return Decoration.none;
        }
        const widget = new GhostTextWidget(effect.value.text);
        const decoration = Decoration.widget({
          widget,
          side: 1,
        });
        return Decoration.set([decoration.range(effect.value.pos)]);
      }
    }

    // Clear ghost text on document changes
    if (tr.docChanged) {
      return Decoration.none;
    }

    // Update decoration position if cursor moved
    if (value && value !== Decoration.none && value.size > 0) {
      // Clear ghost text if cursor moved significantly
      // If cursor moved significantly, clear the ghost text
      // We can't easily get the old position from RangeSet, so we just clear on any movement
      return Decoration.none;
    }

    return value;
  },
  provide: (f) => EditorView.decorations.from(f),
});

// Fetch completion from API
async function fetchCompletion(context: string, currentLine: string): Promise<string | null> {
  try {
    const res = await fetch("/api/latex/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context, currentLine }),
    });

    if (!res.ok) return null;

    const reader = res.body?.getReader();
    if (!reader) return null;

    const decoder = new TextDecoder();
    let completion = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      completion += decoder.decode(value, { stream: true });
    }

    return completion.trim();
  } catch {
    return null;
  }
}

// Track typing state
let lastTypingTime = 0;
let completionTimeout: ReturnType<typeof setTimeout> | null = null;
const TYPING_TIMEOUT = 1500; // 1.5 seconds

// Main extension
export const aiCompletionExtension = ViewPlugin.fromClass(
  class {
    constructor(private view: EditorView) {}

    update() {
      // Update last typing time
      lastTypingTime = Date.now();

      // Clear ghost text when user types
      this.view.dispatch({ effects: setGhostText.of(null) });

      // Clear any pending completion
      if (completionTimeout) {
        clearTimeout(completionTimeout);
      }

      // Schedule completion fetch
      completionTimeout = setTimeout(() => {
        this.fetchCompletion(this.view);
      }, TYPING_TIMEOUT);
    }

    destroy() {
      if (completionTimeout) {
        clearTimeout(completionTimeout);
      }
    }

    private async fetchCompletion(view: EditorView) {
      // Check if user typed again
      if (Date.now() - lastTypingTime < TYPING_TIMEOUT) {
        return;
      }

      const cursor = view.state.selection.main.head;
      const line = view.state.doc.lineAt(cursor);

      // Get current line text
      const currentLine = line.text;

      // Get context (10 lines above)
      const contextStart = Math.max(1, line.number - 10);
      const contextLines: string[] = [];

      for (let i = contextStart; i < line.number; i++) {
        contextLines.push(view.state.doc.line(i).text);
      }

      const context = contextLines.join("\n");

      // Only fetch if there's meaningful content
      if (currentLine.trim().length < 2) {
        return;
      }

      // Fetch completion
      const completion = await fetchCompletion(context, currentLine);

      if (completion && completion.length > 0) {
        // Check if user is still at the same position
        const currentCursor = view.state.selection.main.head;
        if (currentCursor === cursor) {
          view.dispatch({ effects: setGhostText.of({ text: completion, pos: cursor }) });
        }
      }
    }
  }
);

// Keymap for accepting/dismissing ghost text
import { keymap } from "@codemirror/view";

export const aiCompletionKeymap = keymap.of([
  {
    key: "Tab",
    run: (view) => {
      const decorations = view.state.field(ghostTextField, false);
      if (decorations && decorations !== Decoration.none) {
        // Iterate through decorations to find our ghost text widget
        let ghostText: string | null = null;
        const iter = decorations.iter();
        while (iter.value) {
          const deco = iter.value;
          if (deco.spec) {
          const spec = deco.spec as { widget?: GhostTextWidget };
          if (spec.widget instanceof GhostTextWidget) {
            ghostText = spec.widget.text;
            break;
          }
        }
          iter.next();
        }
        
        if (ghostText) {
          const cursor = view.state.selection.main.head;
          view.dispatch({
            changes: { from: cursor, to: cursor, insert: ghostText },
            selection: { anchor: cursor + ghostText.length },
          });
          view.dispatch({ effects: setGhostText.of(null) });
          return true;
        }
      }
      return false;
    },
  },
  {
    key: "Escape",
    run: (view) => {
      const decorations = view.state.field(ghostTextField, false);
      if (decorations && decorations !== Decoration.none) {
        view.dispatch({ effects: setGhostText.of(null) });
        return true;
      }
      return false;
    },
  },
]);

// Combined extension
export const aiCompletions = [
  ghostTextField,
  aiCompletionExtension,
  aiCompletionKeymap,
  EditorView.theme({
    ".cm-ghost-text": {
      color: "var(--color-ink-muted)",
      opacity: 0.5,
      pointerEvents: "none",
    },
  }),
];
