# editor — Spec 015

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Error Handling & Edge Cases
#### Actual Current Behavior Corrections
- [x] Version-history preview shows raw JSON rather than a rendered rich-text preview of the historical document
- [x] The keyboard-shortcuts dialog documents `Cmd + /` for comments, while comment sidebar toggling in the editor route is actually driven by the custom `scholarsync:editor-action` event wiring
#### Route Shell, Errors, and Store Defaults
- [x] `/editor/[id]/error.tsx` renders `ErrorDisplay` with title `Editor unavailable`
- [x] `/editor/[id]/error.tsx` message reads `We couldn't load the editor. Your work is safe — please try again.`
- [x] `/editor/[id]/error.tsx` passes the route `reset` function to `ErrorDisplay.onRetry`
- [x] `/editor/[id]` does not have a route-level `loading.tsx` file in the current app tree
- [x] `/studio/loading.tsx` renders a route-level skeleton shell before the Studio workspace hydrates
- [x] `/studio/loading.tsx` includes one square icon skeleton, one title skeleton, and two button-width skeletons in the top row
- [x] `/studio/loading.tsx` includes a full-width horizontal skeleton below the header row
- [x] `/studio/loading.tsx` includes one large rounded body skeleton beneath the top chrome
- [x] `/studio/error.tsx` renders `ErrorDisplay` with title `Studio unavailable`
- [x] `/studio/error.tsx` uses the same safe-work message as the editor route error
- [x] Editor store default `mode` is `editing`
- [x] Editor store default `outline` is an empty array
- [x] Editor store default `outlineVisible` is `false`
- [x] Editor store default `wordCount` is `0`
- [x] Editor store default `saveStatus.state` is `saved`
- [x] Editor store default `activeSectionPos` is `null`
- [x] Editor store default `referenceSidebarOpen` is `false`
- [x] Editor store default `commentSidebarOpen` is `false`
- [x] Editor store default `documentTitle` is `Untitled Manuscript`
- [x] Editor store default `documentType` is `original-article`
- [x] Editor store default `referenceCount` is `0`
- [x] Editor store default `commentCount` is `0`
- [x] Reference store default `references` collection is an empty `Map`
- [x] Reference store default citation style is `vancouver`
- [x] Reference store default `referenceNumberMap` is an empty `Map`
- [x] Reference store default `bibliographyEntries` is an empty array
- [x] Reference store default `citationDisplayMap` is an empty `Map`
- [x] Reference store default `sidebarOpen` is `false`
- [x] Reference store default `citationDialogOpen` is `false`
#### Editor Route Persistence, Offline Queue, and Retry Logic
- [x] `useEditorDocument` treats `urlDocumentId === "new"` as a create/load flow via `loadStudioDocument(...)`
- [x] When the editor route creates a new document, it writes the returned document title into the editor store
- [x] When the loaded document has sections, the editor route binds persistence to the first section only
- [x] When the loaded first section has no `editor_content`, the hook returns `content = null` so the editor falls back to template behavior
