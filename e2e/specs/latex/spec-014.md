# latex — Spec 014

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/latex
MODULE: latex

---
### Quick Test Workflows
#### Collaboration Cursors & Typing
- [x] PASS: CollaboratorAvatars displays max 4 user avatars; overflow shown as "+{N}" badge
- [x] PASS: CollaboratorAvatars returns `null` only when collaboration is disconnected; once connected it still renders the local current user even if no other collaborators are present
- [x] PASS: Avatar fallback: first character of user name (uppercased) when no avatar URL exists
- [x] PASS: Avatar has a CSS hover tooltip showing the full user name
- [x] PASS: TypingIndicator text for 1 user: "{name} is typing..."
- [x] PASS: TypingIndicator text for 2 users: "{name1} and {name2} are typing..."
- [x] PASS: TypingIndicator slices the displayed name list to at most 2 users before building its status text
- [x] PASS: Because TypingIndicator slices to 2 names first, its intended `"and others"` branch is unreachable in the current implementation
#### Comment Panel — Full Behavior
- [x] PASS: Default comment filter is "unresolved" (not "all")
- [x] PASS: New comment form includes a numeric line number input field (type="number", min=1)
- [x] PASS: Comment header badge shows count of unresolved comments (not total)
- [x] PASS: Reply input placeholder is "Write a reply..."
- [x] PASS: Reply triggered by pressing Enter in the reply input field
- [x] PASS: Reply submit button uses PaperPlaneTilt icon
- [x] PASS: "Reply" link is hidden on resolved comments
- [x] PASS: Thread expansion toggle text: "Show {N} replies" / "Hide {N} replies"
- [x] PASS: Resolved badge shows "Resolved {relative time}" with a Check icon
- [x] PASS: Context menu: "Resolve"/"Unresolve" toggle (Check icon) and "Delete" option (X icon, red text)
- [x] PASS: Relative time format: <60s → "just now", <60m → "{N}m ago", <24h → "{N}h ago", <7d → "{N}d ago", else `toLocaleDateString()`
- [x] PASS: Replies are submitted with `lineNumber: 0` (not the parent's line)
- [x] PASS: Author name falls back to "Anonymous" when `userName` is null or empty string
- [x] PASS: Loading state shows "Loading..." text
- [x] PASS: Empty state shows "No comments yet" with a ChatCircle icon (opacity 30%)
#### Image Browser — Full Behavior
- [x] PASS: Image list loads lazily on first `onFocus` or `onMouseEnter` of the browser container (not on mount)
- [x] PASS: Upload validates file type: `image/png`, `image/jpeg`, `image/jpg`, `application/pdf` only
- [x] PASS: Upload validates size: max 10MB (`10 * 1024 * 1024` bytes)
- [x] PASS: Type validation error: "Invalid file type. Supported: PNG, JPG, PDF"
- [x] PASS: Size validation error: "File too large. Maximum size is 10MB"
- [x] PASS: Upload error message has a dismiss X button
- [x] PASS: Upload button shows Spinner icon (animated) while uploading, Upload icon otherwise
- [x] PASS: Generated LaTeX insert code: `\includegraphics[width=\linewidth]{figures/{baseName}.{ext}}` — NOT wrapped in a figure environment
- [x] PASS: Copy-path copies `figures/{baseName}.{ext}` to clipboard
- [x] PASS: Drag-over state changes container background styling
- [x] PASS: Empty state: "Drag & drop images here" with subtext "PNG, JPG, or PDF (max 10MB)"
- [x] PASS: Footer hint "Click to insert \\includegraphics" appears only when images.length > 0
