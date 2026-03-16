# studio — Spec 011

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Research tab primary CTA reads `Open Literature Research Panel`
- [x] PASS: Research tab keyboard shortcut hint shows `Cmd+Shift+L`
- [x] PASS: Research quick-search input placeholder reads `Quick search PubMed...`
- [x] PASS: Clicking `Search` in the Research tab only acts when the trimmed query is non-empty
- [x] PASS: Research quick search sets store query, opens the external Research Sidebar, and activates its `search` tab
- [x] PASS: Checks tab mounts `IntegrityPanel` with `getEditorText={() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: "\n\n" }) || ""}`
- [x] PASS: IntegrityPanel idle state heading reads `Integrity Check`
- [x] PASS: IntegrityPanel idle CTA reads `Run Integrity Check`
- [x] PASS: IntegrityPanel idle helper text promises AI detection, plagiarism, and citation verification
- [x] PASS: IntegrityPanel running state heading reads `Analyzing Document...`
- [x] PASS: IntegrityPanel error state shows a `Retry` button that reruns the same check
- [x] PASS: IntegrityPanel rejects editor text shorter than 50 characters with `Document must have at least 50 characters to check.`
- [x] PASS: IntegrityPanel trims editor text to 50,000 characters before sending it to `/api/integrity-check`
- [x] PASS: IntegrityPanel receives `sources={integritySources}` assembled from `referenceNumberMap` and stored references
- [x] PASS: IntegrityPanel free-tier warning reads `Free tier — AI detection only. Upgrade for plagiarism scanning and citation verification.`
- [x] PASS: IntegrityPanel sections default to expanded for `ai`, `plagiarism`, `citations`, and `quality`
- [x] PASS: Locked IntegrityPanel sections show `Available on paid plans` and `Upgrade to unlock →`
- [x] PASS: IntegrityPanel `Re-run` action is available from the results header and does not reset expanded-section state
- [x] PASS: Route-level `loading.tsx` renders header, action-button, top-bar, and main-content skeletons
- [x] PASS: Route-level error boundary title reads `Studio unavailable`
- [x] PASS: Route-level error boundary message reads `We couldn't load the editor. Your work is safe — please try again.`
#### Actual Current Behavior Corrections
- [x] PASS: The title field does not show a placeholder when empty in the current implementation.
- [x] PASS: Write/Learn mode does not persist across refreshes unless the URL includes `?mode=learn`.
- [x] PASS: Export dropdown does not currently close when clicking outside it.
- [x] PASS: The right-panel `Research` tab does not render inline search results; it only launches the external Research Sidebar.
- [x] PASS: The right-panel `Checks` tab renders the compact `IntegrityPanel`, not the full `/compliance` page UI.
- [x] PASS: PDF export does not directly download a PDF file from the Studio page; it opens returned HTML in a new window.
- [x] PASS: Word export currently downloads a `.doc` file, not a `.docx` file.
- [x] PASS: Chat history is not restored on refresh in the current Studio route.
#### Page Architecture (`src/app/(app)/studio/page.tsx`)
- [x] PASS: `StudioPage` default export wraps `StudioContent` in `<Suspense>` with no fallback prop — renders empty fragment during SSR hydration
- [x] PASS: Left sidebar actual width is `w-64` (Tailwind 16rem = 256px), not 264px as stated in section 1
- [x] PASS: Editor center column constrained to `max-w-[720px] mx-auto` on the `TiptapEditor` wrapper
- [x] PASS: `ResearchSidebar` component is rendered between `<main>` and the right-panel conditional — it is not inside the right column
- [x] PASS: Citation notice renders in the status bar area (between save indicator and export) as `text-[10px] font-medium text-emerald-500`
- [x] PASS: `requestAnimationFrame` wraps the entire citation insertion logic to ensure modal overlay is removed from DOM before focusing the editor
