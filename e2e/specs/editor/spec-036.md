# editor — Spec 036

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Studio Toolbar Component (`src/components/editor/toolbar.tsx`)
- [x] PASS: Studio `Toolbar` reference count badge uses `bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-medium rounded-full px-1.5 py-0.5 leading-none`
- [x] PASS: Studio `Toolbar` returns `null` (renders nothing) when `editor` prop is null
- [x] PASS: Studio `Toolbar` container uses `glass-panel` CSS class with `border-b border-border`
- [x] PASS: Studio `Toolbar` has a `w-px h-5 bg-border mx-1` separator div between formatting buttons and citation buttons
- [x] PASS: All Studio `Toolbar` buttons use `onMouseDown` with `event.preventDefault()` to preserve text selection
- [x] PASS: Active Studio `Toolbar` buttons use `bg-brand/10 text-brand` styling; inactive use `text-ink-muted hover:text-ink hover:bg-surface-raised`
#### TiptapEditor Renders Floating Overlays on Studio
- [x] PASS: `TiptapEditor` mounts `SelectionToolbar`, `LinkPopover`, `DocumentOutline`, and `FootnoteSection` as sibling components alongside `EditorContent` — making all four available on `/studio`
- [x] PASS: `TiptapEditor` floating overlays (`SelectionToolbar`, `LinkPopover`, `DocumentOutline`) are conditionally rendered only when `editor` is non-null
- [x] PASS: `FootnoteSection` is rendered outside the overlay conditional, after the `EditorContent` container
#### TiptapEditor Save Behavior Details
- [x] PASS: `TiptapEditor` `flushSave` (Cmd+S path) extracts plain text via `doc.textBetween(0, doc.content.size, "\n")` using newline as block separator
- [x] PASS: `TiptapEditor` debounced save extracts plain text via `ed.getText()` with no block separator argument — producing different plain text output from `flushSave`
- [x] PASS: `TiptapEditor` debounced save computes word count inline with `text.split(/\s+/).filter((w) => w.length > 0).length` rather than using `getDocumentWordCount()` helper
- [x] PASS: `TiptapEditor` `flushSave` computes word count via `getDocumentWordCount(doc)` (ProseMirror-level), while debounced save uses string-level splitting — potentially producing different counts
- [x] PASS: `TiptapEditor` content key change with null `content` calls `editor.commands.clearContent()` to reset the editor for a fresh document
#### Editor Page vs Studio Loading State Icons
- [x] PASS: Editor page loading spinner uses `Spinner` icon (from `@phosphor-icons/react`) with size 32, `animate-spin text-brand` class, and `mb-3` margin below
- [x] PASS: Studio loading spinner uses `CircleNotch` icon with size 28 and `animate-spin text-brand` class — a different icon from the editor page
#### SelectionToolbar Rendering Details
- [x] PASS: `SelectionToolbar` icon weight changes dynamically: `weight={active ? "bold" : "regular"}` for each `ToolbarButton` icon
- [x] PASS: `SelectionToolbar` icon size is `16` for all formatting buttons
- [x] PASS: `SelectionToolbar` Y position is calculated as `start.top - 8` (8px gap above selection)
- [x] PASS: `SelectionToolbar` container uses `fixed z-50` positioning with CSS `transform: translate(-50%, -100%)`
- [x] PASS: `SelectionToolbar` style dropdown popup width is `w-44` (176px)
- [x] PASS: Highlight color circle buttons are `w-5 h-5 rounded-full` (20px diameter) with `hover:scale-110` animation
- [x] PASS: `SelectionToolbar` inner container classes: `bg-surface border border-border rounded-lg shadow-lg px-1 py-0.5`
- [x] PASS: `SelectionToolbar` `Separator` component renders `w-px h-5 bg-border mx-0.5`
#### Studio KeyboardShortcutsDialog Availability
- [x] PASS: Studio page renders its own `KeyboardShortcutsDialog` component, triggered by a `Question` icon button in the center toolbar — keyboard shortcuts help is available on both `/editor/[id]` and `/studio`
- [x] PASS: Studio keyboard shortcuts button `title` is `"Keyboard shortcuts"` — without the `"(Cmd+/)"` suffix used by the Editor page TopBar
#### Studio AI Panel Mutual Exclusion
- [x] PASS: Studio right panel shows `ReferenceSidebar` when `sidebarOpen` is true, `CommentSidebar` when reference sidebar is closed but `commentSidebarOpen` is true, or the AI chat panel as fallback — only one of these three renders at a time
- [x] PASS: Studio `CommentSidebar` requires both `studioDoc?.id` AND `editorRef.current` to be truthy before rendering (in addition to `commentSidebarOpen`)
- [x] PASS: Studio `ResearchSidebar` renders as a direct child of the main flex container, between the center editor column and the right panel — it is NOT inside the AI panel
#### Studio Chat UI Specifics
- [x] PASS: Studio chat send button icon is `PaperPlaneRight` (size 16) with `bg-brand text-white hover:bg-brand-hover` styling
- [x] PASS: Chat message text uses `whitespace-pre-wrap text-xs leading-relaxed` class for multiline rendering
- [x] PASS: Chat message container max width is `max-w-[85%]` of the panel width
- [x] PASS: User message bubble style: `bg-surface-raised text-ink`; assistant message bubble style: `bg-brand/5 text-ink`
- [x] PASS: Loading animation sparkle avatar uses `animate-spin` class (spinning sparkle icon) — distinct from the bouncing dots below it
- [x] PASS: Loading animation bouncing dots are `w-1.5 h-1.5 rounded-full bg-brand/40` with animation delays `0ms`, `150ms`, and `300ms`

<!-- Notes:
  - Audit completed on 2026-03-12.
  - Source verification covered `src/components/editor/toolbar.tsx`, `src/components/editor/tiptap-editor.tsx`, `src/components/editor/SelectionToolbar.tsx`, `src/app/(app)/studio/page.tsx`, `src/app/(app)/editor/[id]/page.tsx`, and `src/components/editor/KeyboardShortcutsDialog.tsx`.
  - No product-code fix was required in this pass; the implementation already matched the spec checkpoints.
  - Focused tests passed in `src/components/editor/__tests__/toolbar.test.tsx`, `src/components/editor/__tests__/tiptap-editor.test.tsx`, `src/components/editor/__tests__/SelectionToolbar.test.tsx`, `src/lib/editor/__tests__/studio-hardening.test.ts`, and `src/components/studio/__tests__/studio-shell-controls.test.tsx` (41 tests total).
-->
