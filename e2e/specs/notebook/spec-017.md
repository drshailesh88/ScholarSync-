# notebook — Spec 017

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Quick Test Workflows
#### Share Dialog Details
- [ ] Share-link input is read-only and rendered only when sharing is enabled and a URL exists
- [ ] Copy-link success swaps button content from `Copy` to `Copied` for 2 seconds
- [ ] Password field placeholder is `Leave empty for no password`
- [ ] Expiration date input minimum is today’s date based on `new Date().toISOString().split("T")[0]`
- [ ] Save Settings persists only password and expiration date; it does not re-enable sharing if sharing is currently off
- [ ] Share-dialog failures are console-only and do not display inline error banners in the dialog UI
#### Shared Notebook and Password Gate Details
- [ ] Shared notebook metadata title is `${notebook.title} - ScholarSync` when the share token resolves successfully
- [ ] Missing share tokens fall through `notFound()`
- [ ] Share route renders the password gate only when `notebook.hasPassword` is true
- [ ] Password gate disables submission while loading or when the password input is empty
- [ ] Password gate error for incorrect credentials is `Incorrect password. Please try again.`
- [ ] Password gate generic failure message is `Something went wrong. Please try again.`
- [ ] Successful password verification swaps the gate directly to `SharedNotebookViewer` without route navigation
- [ ] Shared viewer header text is `Shared by {ownerName}` plus a long-form date and optional `· Learn Mode`
- [ ] Shared viewer empty state text is `This notebook has no messages yet.`
- [ ] Shared viewer citation references are rendered as non-clickable pills rather than interactive buttons
- [ ] Shared viewer footer text is `Shared from ScholarSync · AI-assisted research analysis`
#### Actual Current Behavior Corrections
- [ ] The live notebook route preloads library papers from `getUserPapers()`; it does not start from an always-empty source list
- [ ] The upload area is clickable and wired to a hidden file input, but there is no implemented drag-and-drop event handling in the page component
- [ ] Source-row remove actions currently delete rows from local state only; they do not call a server-side delete action from this page
- [ ] Notebook mode switching changes UI copy and API mode, but does not itself persist to the conversation until a conversation is created or a message/audio action updates it
- [ ] Sharing is unavailable until a conversation exists because the share button is disabled when `conversationIdRef.current` is null
- [ ] Shared notebook citations are read-only visual labels; there is no PDF jump-to-source interaction in the shared viewer
#### Upload and URL Ingestion Internals
- [ ] Upload temp ids use the exact format `upload_${Date.now()}_${Math.random()}`
- [ ] Each optimistic upload row is appended with `name: file.name`, `size: formatFileSize(file.size)`, `selected: true`, and `status: "processing"` before any network request starts
- [ ] `/api/extract-pdf` failure changes only the affected upload row to `status: "error"` and preserves the original byte-size subtitle
- [ ] Successful metadata extraction plus `savePaper()` swaps the upload subtitle from formatted bytes to ``${extractData.pages} pages``
- [ ] Uploaded-title fallback strips a trailing `.pdf` case-insensitively via `file.name.replace(/\\.pdf$/i, "")`
- [ ] Uploaded-author fallback is an empty array when `extractData.info?.author` is missing
- [ ] Raw PDF storage runs in a fire-and-forget `fetch(/api/papers/${paperId}/pdf)` branch whose `.catch(...)` only logs `PDF storage failed:`
- [ ] A Docling result with `chunksCreated === 0` logs `Docling extraction produced zero chunks`, marks the row `embed_failed`, and skips the `/api/embed` request via `continue`
- [ ] `/api/embed` non-OK responses are logged with `await embedRes.text()` before the row is marked `embed_failed`
- [ ] Exceptions inside the Docling or embed block log `PDF extraction/embedding failed:` and end with `status: "embed_failed"`
- [ ] Outer upload-pipeline failures mark the row `status: "error"` rather than `embed_failed`
- [ ] File-input reset happens once after the upload loop with `fileInputRef.current.value = ""`; there is no per-file `finally` reset
