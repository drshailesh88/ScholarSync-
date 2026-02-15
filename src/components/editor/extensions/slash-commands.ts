import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import type { SuggestionOptions } from "@tiptap/suggestion";

export interface SlashCommandItem {
  title: string;
  description: string;
  icon: string;
  category: "basic" | "academic" | "ai" | "tools";
  shortcut?: string;
  command: (editor: any) => void;
}

const structuralCommands: SlashCommandItem[] = [
  // Basic blocks
  {
    title: "Text",
    description: "Plain paragraph text",
    icon: "paragraph",
    category: "basic",
    command: (editor) => {
      editor.chain().focus().setParagraph().run();
    },
  },
  {
    title: "Heading 1",
    description: "Manuscript title",
    icon: "h1",
    category: "basic",
    shortcut: "Cmd+Opt+1",
    command: (editor) => {
      editor.chain().focus().setHeading({ level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "IMRAD sections",
    icon: "h2",
    category: "basic",
    shortcut: "Cmd+Opt+2",
    command: (editor) => {
      editor.chain().focus().setHeading({ level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Subsections",
    icon: "h3",
    category: "basic",
    shortcut: "Cmd+Opt+3",
    command: (editor) => {
      editor.chain().focus().setHeading({ level: 3 }).run();
    },
  },
  {
    title: "Heading 4",
    description: "Sub-subsections",
    icon: "h4",
    category: "basic",
    shortcut: "Cmd+Opt+4",
    command: (editor) => {
      editor.chain().focus().setHeading({ level: 4 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Unordered list",
    icon: "bullet",
    category: "basic",
    shortcut: "Cmd+Shift+8",
    command: (editor) => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Ordered list",
    icon: "numbered",
    category: "basic",
    shortcut: "Cmd+Shift+7",
    command: (editor) => {
      editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    title: "Checklist",
    description: "Task checklist",
    icon: "checklist",
    category: "basic",
    shortcut: "Cmd+Shift+9",
    command: (editor) => {
      editor.chain().focus().toggleTaskList().run();
    },
  },
  {
    title: "Block Quote",
    description: "Quote text",
    icon: "quote",
    category: "basic",
    command: (editor) => {
      editor.chain().focus().toggleBlockquote().run();
    },
  },
  {
    title: "Divider",
    description: "Horizontal rule",
    icon: "divider",
    category: "basic",
    command: (editor) => {
      editor.chain().focus().setHorizontalRule().run();
    },
  },
  {
    title: "Code Block",
    description: "For statistical code",
    icon: "code",
    category: "basic",
    command: (editor) => {
      editor.chain().focus().toggleCodeBlock().run();
    },
  },

  // Academic content
  {
    title: "Table",
    description: "Insert data table",
    icon: "table",
    category: "academic",
    command: (editor) => {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
  {
    title: "Image",
    description: "Insert an image",
    icon: "image",
    category: "academic",
    command: (editor) => {
      // Trigger file input for image upload
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = () => {
        const file = input.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const src = e.target?.result as string;
            editor.chain().focus().setImage({ src }).run();
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    },
  },

  // AI Actions (integration points — dispatch events, don't implement)
  {
    title: "Continue Writing",
    description: "AI continues from cursor",
    icon: "ai",
    category: "ai",
    command: (editor) => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:ai-action", {
          detail: { action: "continue", context: editor.getText() },
        })
      );
    },
  },
  {
    title: "Outline Section",
    description: "AI generates bullet outline",
    icon: "ai",
    category: "ai",
    command: (editor) => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:ai-action", {
          detail: { action: "outline-section", context: editor.getText() },
        })
      );
    },
  },
  {
    title: "Check Guidelines",
    description: "Run reporting guideline check",
    icon: "ai",
    category: "ai",
    command: (editor) => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:ai-action", {
          detail: { action: "check-guidelines", context: editor.getText() },
        })
      );
    },
  },
  {
    title: "Ask AI",
    description: "Ask a question (no edits)",
    icon: "ai",
    category: "ai",
    command: (editor) => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:ai-action", {
          detail: { action: "ask" },
        })
      );
    },
  },

  // Document tools
  {
    title: "Word Count",
    description: "Show section word counts",
    icon: "tools",
    category: "tools",
    command: () => {
      window.dispatchEvent(
        new CustomEvent("scholarsync:editor-action", {
          detail: { action: "show-word-count" },
        })
      );
    },
  },
];

/**
 * Fuzzy filter commands by query string.
 */
function filterCommands(query: string): SlashCommandItem[] {
  if (!query) return structuralCommands;

  const lower = query.toLowerCase();
  return structuralCommands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(lower) ||
      cmd.description.toLowerCase().includes(lower) ||
      cmd.category.toLowerCase().includes(lower)
  );
}

export interface SlashCommandsOptions {
  suggestion: Partial<SuggestionOptions>;
}

export const SlashCommandsExtension = Extension.create<SlashCommandsOptions>({
  name: "slashCommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        allow: ({ state, range }: any) => {
          const $from = state.doc.resolve(range.from);
          const isAtStart = $from.parentOffset === 0;
          if (isAtStart) return true;
          const textBefore = $from.parent.textBetween(
            Math.max(0, $from.parentOffset - 1),
            $from.parentOffset
          );
          return textBefore === " " || textBefore === "\n";
        },
        items: ({ query }: { query: string }) => filterCommands(query),
        command: ({
          editor,
          range,
          props,
        }: {
          editor: any;
          range: any;
          props: SlashCommandItem;
        }) => {
          editor.chain().focus().deleteRange(range).run();
          props.command(editor);
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export { structuralCommands };
