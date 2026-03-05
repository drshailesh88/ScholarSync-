import { Extension } from "@tiptap/core";
import type { Editor, Range } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import type { SuggestionOptions } from "@tiptap/suggestion";

export interface SlashCommandItem {
  title: string;
  description: string;
  icon: string;
  category: "basic" | "academic" | "ai" | "tools";
  shortcut?: string;
  command: (editor: Editor) => void;
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
  {
    title: "Abstract",
    description: "Structured abstract (Background, Methods, Results, Conclusion)",
    icon: "academic",
    category: "academic",
    command: (editor) => {
      editor.chain().focus().insertContent({
        type: "doc",
        content: [
          { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Abstract" }] },
          { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Background: " }] },
          { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Methods: " }] },
          { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Results: " }] },
          { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Conclusion: " }] },
        ],
      }).run();
    },
  },
  {
    title: "Figure Caption",
    description: "Insert a figure caption with numbering",
    icon: "image",
    category: "academic",
    command: (editor) => {
      // Count existing figure captions to auto-number
      let figCount = 0;
      editor.state.doc.descendants((node) => {
        if (node.type.name === "paragraph") {
          const text = node.textContent;
          if (text.startsWith("Figure ") && /^Figure \d+/.test(text)) {
            figCount++;
          }
        }
      });

      editor.chain().focus().insertContent({
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: `Figure ${figCount + 1}. ` },
          { type: "text", text: "Caption text here" },
        ],
      }).run();
    },
  },
  {
    title: "Table Caption",
    description: "Insert a table caption with numbering",
    icon: "table",
    category: "academic",
    command: (editor) => {
      let tableCount = 0;
      editor.state.doc.descendants((node) => {
        if (node.type.name === "paragraph") {
          const text = node.textContent;
          if (text.startsWith("Table ") && /^Table \d+/.test(text)) {
            tableCount++;
          }
        }
      });

      editor.chain().focus().insertContent({
        type: "paragraph",
        content: [
          { type: "text", marks: [{ type: "bold" }], text: `Table ${tableCount + 1}. ` },
          { type: "text", text: "Caption text here" },
        ],
      }).run();
    },
  },
  {
    title: "Footnote",
    description: "Add a footnote reference",
    icon: "footnote",
    category: "academic",
    shortcut: "Cmd+Shift+F",
    command: (editor) => {
      const text = prompt("Enter footnote text:");
      if (text) {
        editor.commands.insertFootnote(text);
      }
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
    command: (_editor) => {
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
        allow: ({ state, range }: { state: unknown; range: unknown }) => {
          const s = state as { doc: { resolve: (pos: number) => { parentOffset: number; parent: { textBetween: (from: number, to: number) => string } } } };
          const r = range as { from: number };
          const $from = s.doc.resolve(r.from);
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
          editor: Editor;
          range: Range;
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
