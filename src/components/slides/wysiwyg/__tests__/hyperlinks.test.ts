// @vitest-environment jsdom

import { afterEach, describe, expect, it } from "vitest";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

const LINK_CLASS = "text-blue-600 underline cursor-pointer";

let editor: Editor | null = null;

function createEditor(content = "<p>Hello world</p>") {
  editor = new Editor({
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: LINK_CLASS },
      }),
    ],
    content,
  });

  return editor;
}

afterEach(() => {
  editor?.destroy();
  editor = null;
});

describe("TipTap hyperlink extension", () => {
  it("loads the Link extension", () => {
    const currentEditor = createEditor();

    expect(
      currentEditor.extensionManager.extensions.some((extension) => extension.name === "link")
    ).toBe(true);
  });

  it("setLink applies href correctly", () => {
    const currentEditor = createEditor();

    currentEditor.commands.setTextSelection({ from: 1, to: 6 });
    currentEditor.chain().setLink({ href: "https://example.com" }).run();

    expect(currentEditor.getHTML()).toContain('href="https://example.com"');
  });

  it("unsetLink removes the link mark", () => {
    const currentEditor = createEditor();

    currentEditor.commands.setTextSelection({ from: 1, to: 6 });
    currentEditor.chain().setLink({ href: "https://example.com" }).run();
    currentEditor.commands.setTextSelection(3);
    currentEditor.chain().unsetLink().run();

    expect(currentEditor.getHTML()).not.toContain("<a ");
  });

  it("renders configured link classes in HTML", () => {
    const currentEditor = createEditor();

    currentEditor.commands.setTextSelection({ from: 1, to: 6 });
    currentEditor.chain().setLink({ href: "https://example.com" }).run();

    expect(currentEditor.getHTML()).toContain(`class="${LINK_CLASS}"`);
  });
});
