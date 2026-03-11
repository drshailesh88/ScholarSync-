# latex — Spec 014

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Collaboration Cursors & Typing
- [ ] CollaboratorAvatars displays max 4 user avatars; overflow shown as "+{N}" badge
- [ ] CollaboratorAvatars returns `null` only when collaboration is disconnected; once connected it still renders the local current user even if no other collaborators are present
- [ ] Avatar fallback: first character of user name (uppercased) when no avatar URL exists
- [ ] Avatar has a CSS hover tooltip showing the full user name
- [ ] TypingIndicator text for 1 user: "{name} is typing..."
- [ ] TypingIndicator text for 2 users: "{name1} and {name2} are typing..."
- [ ] TypingIndicator slices the displayed name list to at most 2 users before building its status text
- [ ] Because TypingIndicator slices to 2 names first, its intended `"and others"` branch is unreachable in the current implementation
#### Comment Panel — Full Behavior
- [ ] Default comment filter is "unresolved" (not "all")
- [ ] New comment form includes a numeric line number input field (type="number", min=1)
- [ ] Comment header badge shows count of unresolved comments (not total)
- [ ] Reply input placeholder is "Write a reply..."
- [ ] Reply triggered by pressing Enter in the reply input field
- [ ] Reply submit button uses PaperPlaneTilt icon
- [ ] "Reply" link is hidden on resolved comments
- [ ] Thread expansion toggle text: "Show {N} replies" / "Hide {N} replies"
- [ ] Resolved badge shows "Resolved {relative time}" with a Check icon
- [ ] Context menu: "Resolve"/"Unresolve" toggle (Check icon) and "Delete" option (X icon, red text)
- [ ] Relative time format: <60s → "just now", <60m → "{N}m ago", <24h → "{N}h ago", <7d → "{N}d ago", else `toLocaleDateString()`
- [ ] Replies are submitted with `lineNumber: 0` (not the parent's line)
- [ ] Author name falls back to "Anonymous" when `userName` is null or empty string
- [ ] Loading state shows "Loading..." text
- [ ] Empty state shows "No comments yet" with a ChatCircle icon (opacity 30%)
#### Image Browser — Full Behavior
- [ ] Image list loads lazily on first `onFocus` or `onMouseEnter` of the browser container (not on mount)
- [ ] Upload validates file type: `image/png`, `image/jpeg`, `image/jpg`, `application/pdf` only
- [ ] Upload validates size: max 10MB (`10 * 1024 * 1024` bytes)
- [ ] Type validation error: "Invalid file type. Supported: PNG, JPG, PDF"
- [ ] Size validation error: "File too large. Maximum size is 10MB"
- [ ] Upload error message has a dismiss X button
- [ ] Upload button shows Spinner icon (animated) while uploading, Upload icon otherwise
- [ ] Generated LaTeX insert code: `\includegraphics[width=\linewidth]{figures/{baseName}.{ext}}` — NOT wrapped in a figure environment
- [ ] Copy-path copies `figures/{baseName}.{ext}` to clipboard
- [ ] Drag-over state changes container background styling
- [ ] Empty state: "Drag & drop images here" with subtext "PNG, JPG, or PDF (max 10MB)"
- [ ] Footer hint "Click to insert \\includegraphics" appears only when images.length > 0
