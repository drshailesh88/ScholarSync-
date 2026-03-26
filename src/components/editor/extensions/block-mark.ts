import { Extension, type CommandProps } from "@tiptap/core";

export type BlockMark = null | "important" | "note" | "both";

type ToggleFlag = "important" | "note";

const BLOCK_MARK_NODE_TYPES = [
  "paragraph",
  "heading",
  "blockquote",
  "listItem",
] as const;

const BLOCK_MARK_PRIORITY = [
  "listItem",
  "blockquote",
  "heading",
  "paragraph",
] as const;

function normalizeBlockMark(value: unknown): BlockMark {
  if (
    value === "important" ||
    value === "note" ||
    value === "both"
  ) {
    return value;
  }

  return null;
}

function toggleBlockMarkValue(current: BlockMark, flag: ToggleFlag): BlockMark {
  if (flag === "important") {
    switch (current) {
      case null:
        return "important";
      case "note":
        return "both";
      case "important":
        return null;
      case "both":
        return "note";
    }
  }

  switch (current) {
    case null:
      return "note";
    case "important":
      return "both";
    case "note":
      return null;
    case "both":
      return "important";
  }
}

function getCurrentBlockTarget({ state }: CommandProps) {
  const { $from } = state.selection;

  for (const nodeType of BLOCK_MARK_PRIORITY) {
    for (let depth = $from.depth; depth > 0; depth -= 1) {
      const node = $from.node(depth);

      if (node.type.name !== nodeType) {
        continue;
      }

      return {
        node,
        pos: $from.before(depth),
      };
    }
  }

  return null;
}

function toggleCurrentBlockMark(flag: ToggleFlag, props: CommandProps) {
  const target = getCurrentBlockTarget(props);

  if (!target) {
    return false;
  }

  const nextValue = toggleBlockMarkValue(
    normalizeBlockMark(target.node.attrs.blockMark),
    flag
  );

  if (props.dispatch) {
    props.dispatch(
      props.state.tr.setNodeMarkup(target.pos, target.node.type, {
        ...target.node.attrs,
        blockMark: nextValue,
      })
    );
  }

  return true;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockMark: {
      toggleImportant: () => ReturnType;
      toggleNote: () => ReturnType;
    };
  }
}

export const BlockMarkExtension = Extension.create({
  name: "blockMark",

  addGlobalAttributes() {
    return [
      {
        types: [...BLOCK_MARK_NODE_TYPES],
        attributes: {
          blockMark: {
            default: null,
            parseHTML: (element) =>
              normalizeBlockMark(element.getAttribute("data-block-mark")),
            renderHTML: (attributes) => {
              const value = normalizeBlockMark(attributes.blockMark);

              if (!value) {
                return {};
              }

              return {
                "data-block-mark": value,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleImportant:
        () =>
        (props) =>
          toggleCurrentBlockMark("important", props),
      toggleNote:
        () =>
        (props) =>
          toggleCurrentBlockMark("note", props),
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-i": () => this.editor.commands.toggleImportant(),
      "Mod-Shift-n": () => this.editor.commands.toggleNote(),
    };
  },
});
