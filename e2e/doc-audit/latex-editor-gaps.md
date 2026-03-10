# LaTeX Editor — Feature Doc Gaps

**Original doc:** `LATEX_EDITOR_FEATURES_TESTING.md`
**Original checkbox count:** 241
**After Codex pass 1:** 386
**After Claude Code pass 2:** 554
**After Codex verification cleanup:** 533
**New checks added in Claude pass 2:** 168
**Claude pass 2 assertions verified:** 168
**Verified correct / inaccurate / partial:** 160 / 2 / 6
**Confirmed hallucinations removed during cleanup:** 30
**Codex verification discoveries added:** 9
**Verification focus:** deep-dive source reads (compile API, CodeMirror wiring, slash commands, inline AI bar, agent panel tabs, file tree, preview pane, mobile behavior, save flow, collaboration, dormant extensions)

## Missing Features

- [ ] `SourceEditor` still does not wire the custom completions module, AI ghost-text completion extension, or track-changes extension despite those files existing on disk
- [ ] `Cmd/Ctrl+S` does not clear the pending autosave timer, so a debounced second save can still fire after a manual save
- [ ] Export PDF is a silent no-op when no compiled PDF exists and is not visually disabled in the dropdown
- [ ] Compiled PDF blob URLs created after successful compile are not revoked on replacement or unmount
- [ ] `createAddToDictionaryAction()` targets `/api/latex/spell-check/add`, but no matching API route exists
- [ ] `/latex`, `/latex/new`, and `/latex/[projectId]` still have no route-level `loading.tsx` or `error.tsx`; recovery remains inline-only
- [ ] Accessibility coverage is still thin for icon-only controls, which mostly rely on `title` rather than explicit `aria-label`

## Features in doc that DON'T EXIST in the app
- The detailed custom autocompletion feature set from `src/components/latex-editor/completions.ts` is not active in the current `SourceEditor`.
- The ghost-text AI completion flow from `src/components/latex-editor/ai-completion-extension.ts` is not active in the current `SourceEditor`.
- The track-changes UI/extension stack exists on disk but is not mounted in the current LaTeX workspace.
- The version-history panel exists on disk but is not mounted in the current LaTeX workspace.
- Remote cursor UI, typing-indicator UI, and selection-awareness UI are not mounted in the current LaTeX workspace.
