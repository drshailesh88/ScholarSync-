# editor — Spec 015

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Actual Current Behavior Corrections
- [ ] Version-history preview shows raw JSON rather than a rendered rich-text preview of the historical document
- [ ] The keyboard-shortcuts dialog documents `Cmd + /` for comments, while comment sidebar toggling in the editor route is actually driven by the custom `scholarsync:editor-action` event wiring
#### Route Shell, Errors, and Store Defaults
- [ ] `/editor/[id]/error.tsx` renders `ErrorDisplay` with title `Editor unavailable`
- [ ] `/editor/[id]/error.tsx` message reads `We couldn't load the editor. Your work is safe — please try again.`
- [ ] `/editor/[id]/error.tsx` passes the route `reset` function to `ErrorDisplay.onRetry`
- [ ] `/editor/[id]` does not have a route-level `loading.tsx` file in the current app tree
- [ ] `/studio/loading.tsx` renders a route-level skeleton shell before the Studio workspace hydrates
- [ ] `/studio/loading.tsx` includes one square icon skeleton, one title skeleton, and two button-width skeletons in the top row
- [ ] `/studio/loading.tsx` includes a full-width horizontal skeleton below the header row
- [ ] `/studio/loading.tsx` includes one large rounded body skeleton beneath the top chrome
- [ ] `/studio/error.tsx` renders `ErrorDisplay` with title `Studio unavailable`
- [ ] `/studio/error.tsx` uses the same safe-work message as the editor route error
- [ ] Editor store default `mode` is `editing`
- [ ] Editor store default `outline` is an empty array
- [ ] Editor store default `outlineVisible` is `false`
- [ ] Editor store default `wordCount` is `0`
- [ ] Editor store default `saveStatus.state` is `saved`
- [ ] Editor store default `activeSectionPos` is `null`
- [ ] Editor store default `referenceSidebarOpen` is `false`
- [ ] Editor store default `commentSidebarOpen` is `false`
- [ ] Editor store default `documentTitle` is `Untitled Manuscript`
- [ ] Editor store default `documentType` is `original-article`
- [ ] Editor store default `referenceCount` is `0`
- [ ] Editor store default `commentCount` is `0`
- [ ] Reference store default `references` collection is an empty `Map`
- [ ] Reference store default citation style is `vancouver`
- [ ] Reference store default `referenceNumberMap` is an empty `Map`
- [ ] Reference store default `bibliographyEntries` is an empty array
- [ ] Reference store default `citationDisplayMap` is an empty `Map`
- [ ] Reference store default `sidebarOpen` is `false`
- [ ] Reference store default `citationDialogOpen` is `false`
#### Editor Route Persistence, Offline Queue, and Retry Logic
- [ ] `useEditorDocument` treats `urlDocumentId === "new"` as a create/load flow via `loadStudioDocument(...)`
- [ ] When the editor route creates a new document, it writes the returned document title into the editor store
- [ ] When the loaded document has sections, the editor route binds persistence to the first section only
- [ ] When the loaded first section has no `editor_content`, the hook returns `content = null` so the editor falls back to template behavior
