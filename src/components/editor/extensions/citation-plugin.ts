import { Plugin, PluginKey } from "@tiptap/pm/state";
import { useReferenceStore } from "@/stores/reference-store";

/**
 * ProseMirror plugin key for citation numbering.
 */
export const citationPluginKey = new PluginKey("citationNumbering");

/**
 * ProseMirror plugin that scans the document after every transaction
 * and builds a referenceId → citation number map based on document order.
 *
 * Numbers are assigned in order of first appearance (Vancouver style).
 * The map is written to the Zustand reference store so that citation
 * NodeViews can read their display number reactively.
 */
export function createCitationPlugin() {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  return new Plugin({
    key: citationPluginKey,

    appendTransaction(_transactions, _oldState, newState) {
      const tr = newState.tr;
      let changed = false;
      const citationsToDelete: Array<{ from: number; to: number }> = [];

      newState.doc.descendants((node, pos) => {
        if (node.type.name !== "citation") return;

        const rawReferenceIds = Array.isArray(node.attrs.referenceIds)
          ? (node.attrs.referenceIds as unknown[])
          : [];
        const referenceIds = rawReferenceIds.filter(
          (referenceId): referenceId is string =>
            typeof referenceId === "string" && referenceId.trim().length > 0
        );

        if (referenceIds.length === 0) {
          citationsToDelete.push({ from: pos, to: pos + node.nodeSize });
          return;
        }

        const rawSnapshots = Array.isArray(node.attrs.referenceSnapshots)
          ? (node.attrs.referenceSnapshots as Array<{ id?: unknown }>)
          : [];
        const referenceSnapshots = rawSnapshots.filter(
          (snapshot) =>
            typeof snapshot?.id === "string" &&
            referenceIds.includes(snapshot.id)
        );

        if (
          referenceIds.length !== rawReferenceIds.length ||
          referenceSnapshots.length !== rawSnapshots.length
        ) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            referenceIds,
            referenceSnapshots,
          });
          changed = true;
        }
      });

      for (let i = citationsToDelete.length - 1; i >= 0; i--) {
        const citation = citationsToDelete[i];
        tr.delete(citation.from, citation.to);
        changed = true;
      }

      return changed ? tr : null;
    },

    view() {
      return {
        update(view) {
          // Debounce to avoid excessive processing on rapid edits
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            const numberMap = buildNumberMap(view.state.doc);
            const store = useReferenceStore.getState();

            // Only update if the map actually changed
            if (!mapsEqual(store.referenceNumberMap, numberMap)) {
              store.setReferenceNumberMap(numberMap);
            }
          }, 100);
        },
        destroy() {
          if (debounceTimer) clearTimeout(debounceTimer);
        },
      };
    },
  });
}

/**
 * Scan the document for all citation nodes and build a
 * referenceId → number map based on order of first appearance.
 */
function buildNumberMap(doc: { descendants: (callback: (node: { type: { name: string }; attrs: Record<string, unknown> }) => void) => void }): Map<string, number> {
  const numberMap = new Map<string, number>();
  let counter = 1;

  doc.descendants((node: { type: { name: string }; attrs: Record<string, unknown> }) => {
    if (node.type.name === "citation") {
      const referenceIds: string[] = (node.attrs.referenceIds as string[]) || [];
      for (const refId of referenceIds) {
        if (!numberMap.has(refId)) {
          numberMap.set(refId, counter++);
        }
      }
    }
  });

  return numberMap;
}

/**
 * Compare two Maps for equality (shallow value comparison).
 */
function mapsEqual(
  a: Map<string, number>,
  b: Map<string, number>
): boolean {
  if (a.size !== b.size) return false;
  for (const [key, val] of a) {
    if (b.get(key) !== val) return false;
  }
  return true;
}
