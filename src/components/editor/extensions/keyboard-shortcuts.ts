import { Extension } from "@tiptap/core";

function dispatchEditorAction(action: string) {
  window.dispatchEvent(
    new CustomEvent("scholarsync:editor-action", {
      detail: { action },
    })
  );
  return true;
}

/**
 * Additional keyboard shortcuts for academic writing.
 *
 * StarterKit already provides:
 * - Cmd+B (bold), Cmd+I (italic), Cmd+Z (undo), Cmd+Shift+Z (redo)
 * - Cmd+Shift+7 (ordered list), Cmd+Shift+8 (bullet list)
 * - Cmd+E (code), Cmd+Shift+B (blockquote)
 *
 * We add:
 * - Cmd+Shift+X (strikethrough)
 * - Cmd+U (underline — already handled by Underline extension)
 * - Cmd+Shift+H (highlight)
 * - Cmd+Shift+K (insert link)
 * - Cmd+Shift+. (superscript)
 * - Cmd+Shift+, (subscript)
 * - Cmd+Shift+F (footnote)
 * - Cmd+/ (toggle comment sidebar)
 * - Cmd+Shift+C (insert citation — dispatch event)
 * - Cmd+Shift+R (toggle reference sidebar)
 * - Mod+Shift+1 through Mod+Shift+4 (heading levels)
 * - Cmd+Shift+Enter (horizontal rule)
 */
export const AcademicKeyboardShortcuts = Extension.create({
  name: "academicKeyboardShortcuts",

  addKeyboardShortcuts() {
    return {
      // Strikethrough
      "Mod-Shift-x": () => this.editor.chain().focus().toggleStrike().run(),

      // Clear formatting
      "Mod-\\": () => this.editor.chain().focus().unsetAllMarks().clearNodes().run(),

      // Highlight
      "Mod-Shift-h": () => this.editor.chain().focus().toggleHighlight().run(),

      // Insert link
      "Mod-Shift-k": () => {
        const url = window.prompt("Enter URL:");
        if (url) {
          this.editor.chain().focus().setLink({ href: url }).run();
        }
        return true;
      },

      // Superscript
      "Mod-Shift-.": () => this.editor.chain().focus().toggleSuperscript().run(),

      // Subscript
      "Mod-Shift-,": () => this.editor.chain().focus().toggleSubscript().run(),

      // Footnote
      "Mod-Shift-f": () => {
        const text = window.prompt("Footnote text:");
        if (text) {
          this.editor.commands.insertFootnote(text);
        }
        return true;
      },

      // Toggle comment sidebar
      "Mod-/": () => dispatchEditorAction("toggle-comment-sidebar"),

      // Insert citation
      "Mod-Shift-c": () => dispatchEditorAction("insert-citation"),

      // Toggle reference sidebar
      "Mod-Shift-r": () => dispatchEditorAction("toggle-reference-sidebar"),

      // Horizontal rule
      "Mod-Shift-Enter": () => this.editor.chain().focus().setHorizontalRule().run(),

      // Heading shortcuts (Mod+Shift+1 through 4)
      "Mod-Shift-1": () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
      "Mod-Shift-2": () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
      "Mod-Shift-3": () => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
      "Mod-Shift-4": () => this.editor.chain().focus().toggleHeading({ level: 4 }).run(),
    };
  },
});
