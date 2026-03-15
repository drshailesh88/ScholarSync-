# studio — Spec 011

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/studio
MODULE: studio

---
### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Research tab primary CTA reads `Open Literature Research Panel`
- [ ] Research tab keyboard shortcut hint shows `Cmd+Shift+L`
- [ ] Research quick-search input placeholder reads `Quick search PubMed...`
- [ ] Clicking `Search` in the Research tab only acts when the trimmed query is non-empty
- [ ] Research quick search sets store query, opens the external Research Sidebar, and activates its `search` tab
- [ ] Checks tab mounts `IntegrityPanel` with `getEditorText={() => editorRef.current?.view.dom.innerText?.trim() || editorRef.current?.getText({ blockSeparator: "\n\n" }) || ""}`
- [ ] IntegrityPanel idle state heading reads `Integrity Check`
- [ ] IntegrityPanel idle CTA reads `Run Integrity Check`
- [ ] IntegrityPanel idle helper text promises AI detection, plagiarism, and citation verification
- [ ] IntegrityPanel running state heading reads `Analyzing Document...`
- [ ] IntegrityPanel error state shows a `Retry` button that reruns the same check
- [ ] IntegrityPanel rejects editor text shorter than 50 characters with `Document must have at least 50 characters to check.`
- [ ] IntegrityPanel trims editor text to 50,000 characters before sending it to `/api/integrity-check`
- [ ] IntegrityPanel receives `sources={integritySources}` assembled from `referenceNumberMap` and stored references
- [ ] IntegrityPanel free-tier warning reads `Free tier — AI detection only. Upgrade for plagiarism scanning and citation verification.`
- [ ] IntegrityPanel sections default to expanded for `ai`, `plagiarism`, `citations`, and `quality`
- [ ] Locked IntegrityPanel sections show `Available on paid plans` and `Upgrade to unlock →`
- [ ] IntegrityPanel `Re-run` action is available from the results header and does not reset expanded-section state
- [ ] Route-level `loading.tsx` renders header, action-button, top-bar, and main-content skeletons
- [ ] Route-level error boundary title reads `Studio unavailable`
- [ ] Route-level error boundary message reads `We couldn't load the editor. Your work is safe — please try again.`
#### Actual Current Behavior Corrections
- [ ] The title field does not show a placeholder when empty in the current implementation.
- [ ] Write/Learn mode does not persist across refreshes unless the URL includes `?mode=learn`.
- [ ] Export dropdown does not currently close when clicking outside it.
- [ ] The right-panel `Research` tab does not render inline search results; it only launches the external Research Sidebar.
- [ ] The right-panel `Checks` tab renders the compact `IntegrityPanel`, not the full `/compliance` page UI.
- [ ] PDF export does not directly download a PDF file from the Studio page; it opens returned HTML in a new window.
- [ ] Word export currently downloads a `.doc` file, not a `.docx` file.
- [ ] Chat history is not restored on refresh in the current Studio route.
#### Page Architecture (`src/app/(app)/studio/page.tsx`)
- [ ] `StudioPage` default export wraps `StudioContent` in `<Suspense>` with no fallback prop — renders empty fragment during SSR hydration
- [ ] Left sidebar actual width is `w-64` (Tailwind 16rem = 256px), not 264px as stated in section 1
- [ ] Editor center column constrained to `max-w-[720px] mx-auto` on the `TiptapEditor` wrapper
- [ ] `ResearchSidebar` component is rendered between `<main>` and the right-panel conditional — it is not inside the right column
- [ ] Citation notice renders in the status bar area (between save indicator and export) as `text-[10px] font-medium text-emerald-500`
- [ ] `requestAnimationFrame` wraps the entire citation insertion logic to ensure modal overlay is removed from DOM before focusing the editor
