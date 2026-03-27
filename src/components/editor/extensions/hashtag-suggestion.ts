import { Extension } from "@tiptap/core";
import type { Editor, Range } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import type { SuggestionOptions } from "@tiptap/suggestion";
import { PluginKey } from "@tiptap/pm/state";

export interface HashtagSuggestionItem {
  tag: string;
  count: number;
  isNew?: boolean;
}

export interface HashtagSuggestionOptions {
  suggestion: Partial<SuggestionOptions>;
}

export const HashtagSuggestionExtension =
  Extension.create<HashtagSuggestionOptions>({
    name: "hashtagSuggestion",

    addOptions() {
      return {
        suggestion: {
          char: "#",
          allowSpaces: false,
          allow: ({ state, range }: { state: unknown; range: unknown }) => {
            const s = state as {
              doc: {
                resolve: (pos: number) => { parentOffset: number };
              };
            };
            const r = range as { from: number };
            const $from = s.doc.resolve(r.from);
            // Don't trigger hashtag at the start of a paragraph — let heading input rules handle # at pos 0
            return $from.parentOffset > 0;
          },
          items: async ({ query }: { query: string }) => {
            if (!query) return [];

            try {
              const res = await fetch(
                `/api/hashtags?q=${encodeURIComponent(query)}`
              );
              if (!res.ok) return [{ tag: query, count: 0, isNew: true }];
              const data = (await res.json()) as {
                hashtags: { tag: string; count: number }[];
              };
              const items: HashtagSuggestionItem[] = data.hashtags.map((h) => ({
                tag: h.tag,
                count: h.count,
              }));

              // If typed text doesn't match any existing tag exactly, prepend a "Create" option
              const exactMatch = items.some(
                (i) => i.tag.toLowerCase() === query.toLowerCase()
              );
              if (!exactMatch && query.trim()) {
                items.unshift({ tag: query, count: 0, isNew: true });
              }

              return items.slice(0, 6);
            } catch {
              return [{ tag: query, count: 0, isNew: true }];
            }
          },
          command: ({
            editor,
            range,
            props,
          }: {
            editor: Editor;
            range: Range;
            props: HashtagSuggestionItem;
          }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertContent([
                {
                  type: "hashtag",
                  attrs: { tag: props.tag },
                },
                { type: "text", text: " " },
              ])
              .run();
          },
        },
      };
    },

    addProseMirrorPlugins() {
      return [
        Suggestion({
          pluginKey: new PluginKey("hashtagSuggestion"),
          editor: this.editor,
          ...this.options.suggestion,
        }),
      ];
    },
  });
