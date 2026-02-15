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
function buildNumberMap(doc: any): Map<string, number> {
  const numberMap = new Map<string, number>();
  let counter = 1;

  doc.descendants((node: any) => {
    if (node.type.name === "citation") {
      const referenceIds: string[] = node.attrs.referenceIds || [];
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
