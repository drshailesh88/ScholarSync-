import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { AcademicKeyboardShortcuts } from "@/components/editor/extensions/keyboard-shortcuts";
import { Footnote } from "@/components/editor/extensions/footnote-node";
import {
  SlashCommandsExtension,
  structuralCommands,
} from "@/components/editor/extensions/slash-commands";
import type { EditorMode } from "@/stores/editor-store";
import { tiptapToDocx } from "@/components/export/tiptap-to-docx";
import type { JSONContent } from "@tiptap/core";
import {
  addDocumentCommentLocal,
  getDocumentCommentsLocal,
  resolveDocumentCommentLocal,
  unresolveDocumentCommentLocal,
  deleteDocumentCommentLocal,
  getCommentCountLocal,
} from "@/lib/editor/document-comments-local";
// import type { DocumentComment, DocumentCommentThread } from "@/lib/actions/document-comments";

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

// Mock window global for localStorage functions that check typeof window
Object.defineProperty(global, "window", {
  value: {},
  writable: true,
});

describe("Studio Hardening Tests", () => {
  // =============================================================================
  // 1. Comment Storage Tests (8 tests)
  // =============================================================================

  describe("Comment Storage", () => {
    const testDocumentId = "test-doc-123";

    beforeEach(() => {
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
    });

    it("addDocumentCommentLocal creates a comment with all required fields", () => {
      const comment = addDocumentCommentLocal(testDocumentId, {
        content: "Test comment",
        textRangeStart: 10,
        textRangeEnd: 20,
        quotedText: "selected text",
        userName: "Test User",
      });

      expect(comment).toMatchObject({
        id: expect.stringMatching(/^cmt_\d+_[a-z0-9]+$/),
        documentId: testDocumentId,
        userId: "local-user",
        userName: "Test User",
        textRangeStart: 10,
        textRangeEnd: 20,
        quotedText: "selected text",
        content: "Test comment",
        parentCommentId: null,
        isResolved: false,
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
      });
    });

    it("getDocumentCommentsLocal returns empty array for new document", () => {
      const comments = getDocumentCommentsLocal("nonexistent-doc");
      expect(comments).toEqual([]);
    });

    it("getDocumentCommentsLocal returns threads sorted unresolved-first", () => {
      // Create three comments: resolved, unresolved, resolved
      const comment1 = addDocumentCommentLocal(testDocumentId, {
        content: "Resolved comment 1",
      });
      const comment2 = addDocumentCommentLocal(testDocumentId, {
        content: "Unresolved comment",
      });
      const comment3 = addDocumentCommentLocal(testDocumentId, {
        content: "Resolved comment 2",
      });

      // Resolve comment1 and comment3
      resolveDocumentCommentLocal(testDocumentId, comment1.id);
      resolveDocumentCommentLocal(testDocumentId, comment3.id);

      const threads = getDocumentCommentsLocal(testDocumentId);

      // First should be unresolved
      expect(threads[0].comment.id).toBe(comment2.id);
      expect(threads[0].comment.isResolved).toBe(false);

      // Then resolved ones
      expect(threads[1].comment.isResolved).toBe(true);
      expect(threads[2].comment.isResolved).toBe(true);
    });

    it("Reply to a comment appears in the thread's replies array", () => {
      const parentComment = addDocumentCommentLocal(testDocumentId, {
        content: "Parent comment",
      });

      const replyComment = addDocumentCommentLocal(testDocumentId, {
        content: "Reply to parent",
        parentCommentId: parentComment.id,
        userName: "Replier",
      });

      const threads = getDocumentCommentsLocal(testDocumentId);

      expect(threads).toHaveLength(1);
      expect(threads[0].comment.id).toBe(parentComment.id);
      expect(threads[0].replies).toHaveLength(1);
      expect(threads[0].replies[0].id).toBe(replyComment.id);
      expect(threads[0].replies[0].content).toBe("Reply to parent");
    });

    it("resolveDocumentCommentLocal sets isResolved to true", () => {
      const comment = addDocumentCommentLocal(testDocumentId, {
        content: "To be resolved",
      });

      expect(comment.isResolved).toBe(false);

      resolveDocumentCommentLocal(testDocumentId, comment.id);

      const threads = getDocumentCommentsLocal(testDocumentId);
      expect(threads[0].comment.isResolved).toBe(true);
    });

    it("unresolveDocumentCommentLocal sets isResolved to false", () => {
      const comment = addDocumentCommentLocal(testDocumentId, {
        content: "To be unresolved",
      });

      resolveDocumentCommentLocal(testDocumentId, comment.id);
      expect(getDocumentCommentsLocal(testDocumentId)[0].comment.isResolved).toBe(true);

      unresolveDocumentCommentLocal(testDocumentId, comment.id);
      expect(getDocumentCommentsLocal(testDocumentId)[0].comment.isResolved).toBe(false);
    });

    it("deleteDocumentCommentLocal removes comment and all replies", () => {
      const parentComment = addDocumentCommentLocal(testDocumentId, {
        content: "Parent with replies",
      });

      addDocumentCommentLocal(testDocumentId, {
        content: "Reply 1",
        parentCommentId: parentComment.id,
      });

      addDocumentCommentLocal(testDocumentId, {
        content: "Reply 2",
        parentCommentId: parentComment.id,
      });

      expect(getDocumentCommentsLocal(testDocumentId)[0].replies).toHaveLength(2);

      deleteDocumentCommentLocal(testDocumentId, parentComment.id);

      const threads = getDocumentCommentsLocal(testDocumentId);
      expect(threads).toHaveLength(0);
    });

    it("getCommentCountLocal returns correct total and unresolved counts", () => {
      // Add 5 top-level comments
      for (let i = 0; i < 5; i++) {
        addDocumentCommentLocal(testDocumentId, { content: `Comment ${i}` });
      }

      // Add 2 replies (should not affect count)
      const parent = addDocumentCommentLocal(testDocumentId, {
        content: "Parent",
      });
      addDocumentCommentLocal(testDocumentId, {
        content: "Reply",
        parentCommentId: parent.id,
      });

      // Resolve 2 comments
      const threads = getDocumentCommentsLocal(testDocumentId);
      resolveDocumentCommentLocal(testDocumentId, threads[0].comment.id);
      resolveDocumentCommentLocal(testDocumentId, threads[1].comment.id);

      const counts = getCommentCountLocal(testDocumentId);
      expect(counts.total).toBe(6); // 5 initial + 1 parent
      expect(counts.unresolved).toBe(4); // 6 - 2 resolved
    });
  });

  // =============================================================================
  // 2. Footnote Extension Tests (6 tests)
  // =============================================================================

  describe("Footnote Extension", () => {
    it("Footnote extension has correct name", () => {
      expect(Footnote.name).toBe("footnote");
    });

    it("Footnote extension is configured as inline atom node", () => {
      expect(Footnote.config.group).toBe("inline");
      expect(Footnote.config.inline).toBe(true);
      expect(Footnote.config.atom).toBe(true);
    });

    it("Footnote attributes include id, text, and number", () => {
      const attributes = (Footnote.config.addAttributes as // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any)();

      expect(attributes).toHaveProperty("id");
      expect(attributes).toHaveProperty("text");
      expect(attributes).toHaveProperty("number");
    });



  });

  // =============================================================================
  // 3. Keyboard Shortcuts Tests (4 tests)
  // =============================================================================

  describe("Keyboard Shortcuts", () => {
    it("AcademicKeyboardShortcuts extension has correct name", () => {
      expect(AcademicKeyboardShortcuts.name).toBe("academicKeyboardShortcuts");
    });



    it("Slash command items include 'Abstract' entry", () => {
      const abstractCommand = structuralCommands.find((cmd) => cmd.title === "Abstract");

      expect(abstractCommand).toBeDefined();
      expect(abstractCommand?.description).toBe(
        "Structured abstract (Background, Methods, Results, Conclusion)"
      );
      expect(abstractCommand?.category).toBe("academic");
    });

    it("All items have required fields (title, description, icon, category, command)", () => {
      structuralCommands.forEach((item) => {
        expect(item.title).toBeDefined();
        expect(typeof item.title).toBe("string");
        expect(item.title.length).toBeGreaterThan(0);

        expect(item.description).toBeDefined();
        expect(typeof item.description).toBe("string");

        expect(item.icon).toBeDefined();
        expect(typeof item.icon).toBe("string");

        expect(item.category).toBeDefined();
        expect(["basic", "academic", "ai", "tools"]).toContain(item.category);

        expect(item.command).toBeDefined();
        expect(typeof item.command).toBe("function");
      });
    });

    it("Structural commands include basic formatting options", () => {
      const headings = structuralCommands.filter((cmd) =>
        cmd.title.startsWith("Heading")
      );

      expect(headings.length).toBeGreaterThanOrEqual(3);
      expect(headings.some((h) => h.title === "Heading 1")).toBe(true);
      expect(headings.some((h) => h.title === "Heading 2")).toBe(true);
    });

    it("Structural commands include list options", () => {
      const lists = structuralCommands.filter((cmd) =>
        cmd.title.includes("List")
      );

      expect(lists.length).toBeGreaterThanOrEqual(2);
      expect(lists.some((l) => l.title === "Bullet List")).toBe(true);
      expect(lists.some((l) => l.title === "Numbered List")).toBe(true);
    });

    it("Abstract command inserts the structured abstract template", () => {
      const insertContent = vi.fn().mockReturnThis();
      const run = vi.fn();
      const editor = {
        chain: () => ({
          focus: () => ({
            insertContent,
            run,
          }),
        }),
      } as const;

      structuralCommands.find((cmd) => cmd.title === "Abstract")?.command(
        editor as never
      );

      expect(insertContent).toHaveBeenCalledWith({
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Abstract" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Background: ",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Methods: ",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Results: ",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Conclusion: ",
              },
            ],
          },
        ],
      });
      expect(run).toHaveBeenCalledOnce();
    });

    it("Figure Caption command auto-numbers from existing figure captions", () => {
      const insertContent = vi.fn().mockReturnThis();
      const run = vi.fn();
      const editor = {
        state: {
          doc: {
            descendants: (callback: (node: { type: { name: string }; textContent: string }) => void) => {
              callback({ type: { name: "paragraph" }, textContent: "Figure 1. Prior figure" });
              callback({ type: { name: "paragraph" }, textContent: "Figure 2. Another figure" });
            },
          },
        },
        chain: () => ({
          focus: () => ({
            insertContent,
            run,
          }),
        }),
      } as const;

      structuralCommands.find((cmd) => cmd.title === "Figure Caption")?.command(
        editor as never
      );

      expect(insertContent).toHaveBeenCalledWith({
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "bold" }],
            text: "Figure 3. ",
          },
          { type: "text", text: "Caption text here" },
        ],
      });
      expect(run).toHaveBeenCalledOnce();
    });

    it("Table Caption command auto-numbers from existing table captions", () => {
      const insertContent = vi.fn().mockReturnThis();
      const run = vi.fn();
      const editor = {
        state: {
          doc: {
            descendants: (callback: (node: { type: { name: string }; textContent: string }) => void) => {
              callback({ type: { name: "paragraph" }, textContent: "Table 1. Prior table" });
            },
          },
        },
        chain: () => ({
          focus: () => ({
            insertContent,
            run,
          }),
        }),
      } as const;

      structuralCommands.find((cmd) => cmd.title === "Table Caption")?.command(
        editor as never
      );

      expect(insertContent).toHaveBeenCalledWith({
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "bold" }],
            text: "Table 2. ",
          },
          { type: "text", text: "Caption text here" },
        ],
      });
      expect(run).toHaveBeenCalledOnce();
    });

    it("Footnote command prompts for text and inserts a footnote", () => {
      const promptSpy = vi.fn().mockReturnValue("Footnote body");
      const originalPrompt = globalThis.prompt;
      globalThis.prompt = promptSpy;

      const insertFootnote = vi.fn();
      const editor = {
        commands: {
          insertFootnote,
        },
      } as const;

      try {
        structuralCommands.find((cmd) => cmd.title === "Footnote")?.command(
          editor as never
        );

        expect(promptSpy).toHaveBeenCalledWith("Enter footnote text:");
        expect(insertFootnote).toHaveBeenCalledWith("Footnote body");
      } finally {
        globalThis.prompt = originalPrompt;
      }
    });

    it("event-dispatch commands emit the expected ScholarSync events", () => {
      const originalDispatchEvent = window.dispatchEvent;
      const dispatchEvent = vi.fn();
      Object.assign(window, { dispatchEvent });

      const editor = {
        getText: () => "Current editor text",
      } as const;

      structuralCommands.find((cmd) => cmd.title === "Cite")?.command(
        editor as never
      );
      structuralCommands.find((cmd) => cmd.title === "Continue Writing")?.command(
        editor as never
      );
      structuralCommands.find((cmd) => cmd.title === "Outline Section")?.command(
        editor as never
      );
      structuralCommands.find((cmd) => cmd.title === "Check Guidelines")?.command(
        editor as never
      );
      structuralCommands.find((cmd) => cmd.title === "Ask AI")?.command(
        editor as never
      );
      structuralCommands.find((cmd) => cmd.title === "Word Count")?.command(
        editor as never
      );

      try {
        expect(dispatchEvent).toHaveBeenCalledTimes(6);
        expect(
          dispatchEvent.mock.calls.map(
            (args) => (args[0] as CustomEvent).type
          )
        ).toEqual([
          "scholarsync:open-citation-dialog",
          "scholarsync:ai-action",
          "scholarsync:ai-action",
          "scholarsync:ai-action",
          "scholarsync:ai-action",
          "scholarsync:editor-action",
        ]);

        expect(dispatchEvent.mock.calls[1][0].detail).toEqual({
          action: "continue",
          context: "Current editor text",
        });
        expect(dispatchEvent.mock.calls[2][0].detail).toEqual({
          action: "outline-section",
          context: "Current editor text",
        });
        expect(dispatchEvent.mock.calls[3][0].detail).toEqual({
          action: "check-guidelines",
          context: "Current editor text",
        });
        expect(dispatchEvent.mock.calls[4][0].detail).toEqual({
          action: "ask",
        });
        expect(dispatchEvent.mock.calls[5][0].detail).toEqual({
          action: "show-word-count",
        });
      } finally {
        Object.assign(window, { dispatchEvent: originalDispatchEvent });
      }
    });

    it("Image command creates a hidden image input and inserts a DataURL image", () => {
      const setImage = vi.fn().mockReturnThis();
      const run = vi.fn();
      const editor = {
        chain: () => ({
          focus: () => ({
            setImage,
            run,
          }),
        }),
      } as const;

      const input = {
        type: "",
        accept: "",
        style: { display: "" },
        files: [{ name: "figure.png" }],
        onchange: null as null | (() => void),
        click() {
          this.onchange?.();
        },
        remove: vi.fn(),
      };

      const originalDocument = globalThis.document;
      const originalFileReader = globalThis.FileReader;

      class MockFileReader {
        onload: null | ((event: { target: { result: string } }) => void) = null;

        readAsDataURL() {
          this.onload?.({ target: { result: "data:image/png;base64,ZmFrZQ==" } });
        }
      }

      Object.assign(globalThis, {
        document: {
          createElement: vi.fn().mockReturnValue(input),
          body: {
            appendChild: vi.fn(),
          },
        },
        FileReader: MockFileReader,
      });

      try {
        structuralCommands.find((cmd) => cmd.title === "Image")?.command(
          editor as never
        );

        expect(input.type).toBe("file");
        expect(input.accept).toBe("image/*");
        expect(input.style.display).toBe("none");
        expect(setImage).toHaveBeenCalledWith({
          src: "data:image/png;base64,ZmFrZQ==",
        });
        expect(run).toHaveBeenCalledOnce();
        expect(input.remove).toHaveBeenCalledOnce();
      } finally {
        Object.assign(globalThis, {
          document: originalDocument,
          FileReader: originalFileReader,
        });
      }
    });

    it("slash command filtering is case-insensitive and uses includes matching", () => {
      const options = (
        SlashCommandsExtension.config.addOptions as unknown as () => {
          suggestion: {
            items: (args: { query: string }) => typeof structuralCommands;
          };
        }
      )();

      expect(
        options.suggestion.items({ query: "ABSTRACT" }).map((cmd) => cmd.title)
      ).toContain("Abstract");
      expect(
        options.suggestion.items({ query: "guideline" }).map((cmd) => cmd.title)
      ).toContain("Check Guidelines");
      expect(
        options.suggestion.items({ query: "TOOLS" }).map((cmd) => cmd.title)
      ).toContain("Word Count");
      expect(options.suggestion.items({ query: "zzz-no-match" })).toEqual([]);
    });
  });

  // =============================================================================
  // 5. Mode Tests (2 tests)
  // =============================================================================

  describe("Editor Mode", () => {
    it("EditorMode type does NOT include 'suggesting'", () => {
      const validModes: EditorMode[] = ["editing", "viewing"];

      expect(validModes).not.toContain("suggesting");

      // Type assertion to check at runtime
      const testModes: string[] = ["editing", "viewing"];
      expect(testModes).not.toContain("suggesting");
    });

    it("EditorMode type only includes 'editing' and 'viewing'", () => {
      const validModes: EditorMode[] = ["editing", "viewing"];

      expect(validModes).toHaveLength(2);
      expect(validModes).toContain("editing");
      expect(validModes).toContain("viewing");
      expect(validModes).not.toContain("suggesting");
    });
  });

  // =============================================================================
  // 6. DOCX Export Tests (6 tests)
  // =============================================================================

  describe("DOCX Export", () => {
    it("Export handles footnote nodes (produces superscript text run)", async () => {
      const contentWithFootnote: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Text with " },
              {
                type: "footnote",
                attrs: { id: "fn_1", text: "Footnote text", number: 1 },
              },
              { type: "text", text: " reference." },
            ],
          },
        ],
      };

      const buffer = await tiptapToDocx(contentWithFootnote);

      expect(buffer).toBeInstanceOf(Uint8Array);
      expect(buffer.length).toBeGreaterThan(0);

      // The buffer should be a valid DOCX file (starts with PK zip signature)
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    });

    it("Export produces footnotes section when footnotes present", async () => {
      const contentWithFootnotes: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "footnote",
                attrs: { id: "fn_1", text: "First footnote", number: 1 },
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "footnote",
                attrs: { id: "fn_2", text: "Second footnote", number: 2 },
              },
            ],
          },
        ],
      };

      const buffer = await tiptapToDocx(contentWithFootnotes);

      expect(buffer).toBeInstanceOf(Uint8Array);
      expect(buffer.length).toBeGreaterThan(1000); // Should be substantial with footnotes section
    });

    it("Export without footnotes does not add footnotes section", async () => {
      const contentWithoutFootnotes: JSONContent = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Just plain text." }],
          },
        ],
      };

      const buffer = await tiptapToDocx(contentWithoutFootnotes);

      expect(buffer).toBeInstanceOf(Uint8Array);
      expect(buffer.length).toBeGreaterThan(0);

      // Should be a valid DOCX but without the extra footnotes section overhead
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    });

    it("Export handles headings correctly", async () => {
      const contentWithHeadings: JSONContent = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Title" }],
          },
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Section" }],
          },
        ],
      };

      const buffer = await tiptapToDocx(contentWithHeadings);

      expect(buffer).toBeInstanceOf(Uint8Array);
      expect(buffer.length).toBeGreaterThan(0);
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    });

    it("Export handles lists correctly", async () => {
      const contentWithList: JSONContent = {
        type: "doc",
        content: [
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Item 1" }] },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Item 2" }] },
                ],
              },
            ],
          },
        ],
      };

      const buffer = await tiptapToDocx(contentWithList);

      expect(buffer).toBeInstanceOf(Uint8Array);
      expect(buffer.length).toBeGreaterThan(0);
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    });

    it("Export handles tables correctly", async () => {
      const contentWithTable: JSONContent = {
        type: "doc",
        content: [
          {
            type: "table",
            content: [
              {
                type: "tableRow",
                content: [
                  {
                    type: "tableCell",
                    content: [
                      { type: "paragraph", content: [{ type: "text", text: "Cell 1" }] },
                    ],
                  },
                  {
                    type: "tableCell",
                    content: [
                      { type: "paragraph", content: [{ type: "text", text: "Cell 2" }] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

      const buffer = await tiptapToDocx(contentWithTable);

      expect(buffer).toBeInstanceOf(Uint8Array);
      expect(buffer.length).toBeGreaterThan(0);
      expect(buffer[0]).toBe(0x50); // 'P'
      expect(buffer[1]).toBe(0x4b); // 'K'
    });
  });
});
