import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Tiptap extension for inline hashtag nodes.
 *
 * Each hashtag node stores a `tag` attribute (without the `#` prefix)
 * and renders as a styled inline chip. Hashtags are visual markers only
 * — clicking them does NOT trigger search or navigation.
 */
export const HashtagNode = Node.create({
  name: "hashtag",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      tag: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-hashtag") || "",
        renderHTML: (attributes) => ({
          "data-hashtag": attributes.tag,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-hashtag]" }];
  },

  renderHTML({ HTMLAttributes }) {
    const tag = HTMLAttributes["data-hashtag"] || "";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        class: "hashtag-tag",
        "data-hashtag": tag,
        contenteditable: "false",
      }),
      `#${tag}`,
    ];
  },
});
