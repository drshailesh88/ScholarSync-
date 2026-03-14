# Feeds Pass 2 Verification

**Target doc:** `FEEDS_FEATURES_TESTING.md`
**Section audited:** `## Re-Audit Discoveries (Claude Code Pass 2)`
**Checkboxes reviewed:** 332
**Hallucinations / source mismatches found:** 4

## Hallucinations

### 1. EmptyState icon sizing is wrong
- **Claude checkbox:** `FEEDS_FEATURES_TESTING.md:826`  
  `EmptyState icon rendered in 16×16 container with bg-surface-raised background`
- **Reality:** The shared `EmptyState` renders a `w-16 h-16` container and a `size={32}` icon, not a 16×16 icon container.
- **Source:** `src/components/ui/empty-state.tsx:28-30`

### 2. Magazine favicon onError behavior is not unique to magazine view
- **Claude checkbox:** `FEEDS_FEATURES_TESTING.md:914`  
  `Magazine favicon has onError handler: style.display = "none" (matches sidebar, not card view)`
- **Reality:** Magazine view does hide broken favicons with `style.display = "none"`, but card view does too. The comparative clause `not card view` is false.
- **Source:** `src/components/feeds/article-card-magazine.tsx:80-88`
- **Counter-source:** `src/components/feeds/article-card.tsx:62-70`

### 3. `unsubscribe` is not optimistic
- **Claude checkbox:** `FEEDS_FEATURES_TESTING.md:1121`  
  `unsubscribe DELETEs /api/feeds/${subscriptionId}; locally removes subscription (optimistic)`
- **Reality:** The store waits for the `DELETE` request to succeed before removing the subscription from local state. That is post-success local update, not optimistic update.
- **Source:** `src/stores/feed-store.ts:464-476`

### 4. `/` shortcut note misstates when `preventDefault()` matters
- **Claude checkbox:** `FEEDS_FEATURES_TESTING.md:1163`  
  ``/` calls `e.preventDefault()` to suppress "/" character appearing in focused input`
- **Reality:** The key handler returns immediately when the event target is an `input` or `textarea`, so this branch does not run for a focused text field. `preventDefault()` only applies in non-input contexts before focusing the search box.
- **Source:** `src/app/(app)/feeds/page.tsx:59-60`
- **Source:** `src/app/(app)/feeds/page.tsx:99-101`

## Verdict

Claude Code's pass 2 is mostly source-backed. The main issues are:

- One invented sizing detail in the shared empty state
- One false comparative claim about magazine vs card favicon handling
- One incorrect use of the term `optimistic`
- One keyboard-shortcut explanation that does not match the guard clause
