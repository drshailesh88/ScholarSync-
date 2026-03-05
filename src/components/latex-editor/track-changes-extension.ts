/**
 * Track Changes CodeMirror Extension - Simplified Version
 *
 * Implements "Suggesting" mode with inline diff visualization
 */

import { EditorState, Compartment, Transaction } from "@codemirror/state";
import { EditorView, Decoration, DecorationSet, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { type TrackChange } from "@/types/track-changes";

// DiffMatchPatch for computing diffs
import DiffMatchPatch from "diff-match-patch";

const dmp = new DiffMatchPatch();

/**
 * Compartment for dynamically enabling/disabling track changes mode
 */
export const trackChangesCompartment = new Compartment();

/**
 * Configuration for track changes extension
 */
export interface TrackChangesConfig {
  enabled: boolean;
  fileId: string;
  author: {
    id: string;
    name: string;
    color: string;
  };
  onChangesDetected?: (changes: TrackChange[]) => void;
}

/**
 * Facet to access track changes configuration
 */
import { Facet } from "@codemirror/state";

const trackChangesConfigFacet = Facet.define<TrackChangesConfig, TrackChangesConfig>({
  combine(configs) {
    return configs[0] ?? {
      enabled: false,
      fileId: "",
      author: { id: "", name: "", color: "#7c3aed" },
    };
  },
});

/**
 * State field to manage pending changes
 */
import { StateField, StateEffect } from "@codemirror/state";

interface TrackChangesState {
  changes: TrackChange[];
  shadowDoc: string;
}

const addTrackChange = StateEffect.define<TrackChange>();
const setTrackChanges = StateEffect.define<TrackChange[]>();
const setShadowDoc = StateEffect.define<string>();

const trackChangesField = StateField.define<TrackChangesState>({
  create() {
    return { changes: [], shadowDoc: "" };
  },
  update(value, tr) {
    for (const effect of tr.effects) {
      if (effect.is(addTrackChange)) {
        value = { ...value, changes: [...value.changes, effect.value] };
      } else if (effect.is(setTrackChanges)) {
        value = { ...value, changes: effect.value };
      } else if (effect.is(setShadowDoc)) {
        value = { ...value, shadowDoc: effect.value };
      }
    }
    return value;
  },
});

/**
 * Create decorations for track changes
 */
function createDecorations(changes: TrackChange[]): DecorationSet {
  const decorations: any[] = [];

  for (const change of changes) {
    if (change.status !== "pending") continue;

    if (change.type === "insert") {
      // Green background for insertions
      decorations.push(
        Decoration.mark({
          class: "cm-track-change-insert",
          tagName: "ins",
        }).range(change.from, change.to)
      );
    } else if (change.type === "delete") {
      // Red strikethrough for deletions
      decorations.push(
        Decoration.mark({
          class: "cm-track-change-delete",
          tagName: "del",
        }).range(change.from, change.to)
      );
    } else if (change.type === "replace") {
      // Amber for replacements
      decorations.push(
        Decoration.mark({
          class: "cm-track-change-replace",
        }).range(change.from, change.to)
      );
    }
  }

  return Decoration.set(decorations);
}

/**
 * View plugin to handle track changes mode
 */
const trackChangesPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      const config = view.state.facet(trackChangesConfigFacet);
      const state = view.state.field(trackChangesField);

      // Initialize shadow doc if not set
      if (!state.shadowDoc) {
        view.dispatch({
          effects: setShadowDoc.of(view.state.doc.toString()),
        });
      }

      this.decorations = config.enabled
        ? createDecorations(view.state.field(trackChangesField).changes)
        : Decoration.none;
    }

    update(update: ViewUpdate) {
      const config = update.state.facet(trackChangesConfigFacet);
      const state = update.state.field(trackChangesField);

      // If track changes is disabled, clear decorations
      if (!config.enabled) {
        this.decorations = Decoration.none;

        // Update shadow doc when not in track changes mode
        if (update.docChanged) {
          const newShadowDoc = update.state.doc.toString();
          if (state.shadowDoc !== newShadowDoc) {
            update.view.dispatch({
              effects: setShadowDoc.of(newShadowDoc),
            });
          }
        }
        return;
      }

      // Track changes is enabled
      if (update.docChanged && state.shadowDoc) {
        const currentDoc = update.state.doc.toString();

        // Only compute diffs if shadow doc is set
        if (state.shadowDoc) {
          // Compute diff between shadow doc and current doc
          const diffs = dmp.diff_main(state.shadowDoc, currentDoc);
          dmp.diff_cleanupSemantic(diffs);

          // Convert diffs to TrackChange objects
          const newChanges: TrackChange[] = [];
          let pos = 0;
          let shadowPos = 0;

          for (const [operation, text] of diffs) {
            const textLen = text.length;

            if (operation === DiffMatchPatch.DIFF_INSERT) {
              // Insertion
              const change: TrackChange = {
                id: crypto.randomUUID(),
                type: "insert",
                from: pos,
                to: pos + textLen,
                insertedText: text,
                author: config.author,
                timestamp: Date.now(),
                status: "pending",
              };
              newChanges.push(change);
              pos += textLen;
            } else if (operation === DiffMatchPatch.DIFF_DELETE) {
              // Deletion
              const change: TrackChange = {
                id: crypto.randomUUID(),
                type: "delete",
                from: pos,
                to: pos, // Deletions don't take up space in new doc
                deletedText: text,
                author: config.author,
                timestamp: Date.now(),
                status: "pending",
              };
              newChanges.push(change);
              shadowPos += textLen;
            } else {
              // Equal - no change
              pos += textLen;
              shadowPos += textLen;
            }
          }

          // Notify parent of new changes
          if (newChanges.length > 0) {
            config.onChangesDetected?.(newChanges);

            // Add changes to state and revert document
            update.view.dispatch({
              effects: [
                setTrackChanges.of([...state.changes, ...newChanges]),
                setShadowDoc.of(state.shadowDoc), // Keep shadow doc
              ],
              // Revert the document to shadow doc
              changes: {
                from: 0,
                to: update.state.doc.length,
                insert: state.shadowDoc,
              },
            });
          }
        }
      }

      // Update decorations
      this.decorations = createDecorations(update.state.field(trackChangesField).changes);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

/**
 * Theme for track changes decorations
 */
export const trackChangesTheme = EditorView.theme({
  ".cm-track-change-insert": {
    backgroundColor: "#d1fae5", // green-100
    color: "#065f46", // green-800
    textDecoration: "none",
    borderBottom: "2px solid #10b981",
  },
  ".cm-track-change-delete": {
    backgroundColor: "#fee2e2", // red-100
    color: "#991b1b", // red-800
    textDecoration: "line-through",
    opacity: 0.7,
  },
  ".cm-track-change-replace": {
    backgroundColor: "#fef3c7", // amber-100
    color: "#92400e", // amber-800
    borderBottom: "2px solid #f59e0b",
  },
});

/**
 * Main track changes extension
 */
export function trackChanges(config: TrackChangesConfig) {
  return [
    trackChangesConfigFacet.of(config),
    trackChangesField,
    trackChangesPlugin,
    trackChangesTheme,
  ];
}

/**
 * Accept a track change - applies it to the document
 */
export function acceptTrackChange(
  view: EditorView,
  change: TrackChange
) {
  const state = view.state.field(trackChangesField);
  const { from, to, insertedText, type } = change;

  if (type === "insert" && insertedText) {
    // Apply insertion
    view.dispatch({
      changes: { from, to, insert: insertedText },
      effects: [setShadowDoc.of(view.state.doc.toString() + insertedText)],
    });
  } else if (type === "delete") {
    // Apply deletion - remove the text
    view.dispatch({
      changes: { from, to, insert: "" },
      effects: [setShadowDoc.of(view.state.doc.toString())],
    });
  } else if (type === "replace" && insertedText) {
    view.dispatch({
      changes: { from, to, insert: insertedText },
      effects: [setShadowDoc.of(view.state.doc.toString())],
    });
  }
}

/**
 * Reject a track change - discards it without applying
 */
export function rejectTrackChange(
  view: EditorView,
  changeId: string
) {
  const state = view.state.field(trackChangesField);
  const updatedChanges = state.changes.filter((c) => c.id !== changeId);

  view.dispatch({
    effects: setTrackChanges.of(updatedChanges),
  });
}

/**
 * Compute diff between two documents and return track changes
 */
export function computeDiff(
  oldContent: string,
  newContent: string,
  author: TrackChange["author"]
): TrackChange[] {
  const diffs = dmp.diff_main(oldContent, newContent);
  dmp.diff_cleanupSemantic(diffs);

  const changes: TrackChange[] = [];
  let pos = 0;
  let oldPos = 0;

  for (const [operation, text] of diffs) {
    const textLen = text.length;

    if (operation === DiffMatchPatch.DIFF_INSERT) {
      changes.push({
        id: crypto.randomUUID(),
        type: "insert",
        from: pos,
        to: pos + textLen,
        insertedText: text,
        author,
        timestamp: Date.now(),
        status: "pending",
      });
      pos += textLen;
    } else if (operation === DiffMatchPatch.DIFF_DELETE) {
      changes.push({
        id: crypto.randomUUID(),
        type: "delete",
        from: oldPos,
        to: oldPos + textLen,
        deletedText: text,
        author,
        timestamp: Date.now(),
        status: "pending",
      });
      oldPos += textLen;
    } else {
      pos += textLen;
      oldPos += textLen;
    }
  }

  return changes;
}
