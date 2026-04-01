# explore — Spec 009

STATUS: PENDING
TESTED: 0/12
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Pagination & Toasts

#### Pagination
- [ ] **Pagination visible when >10 results** — verify Previous/Next buttons and page counter appear `[CODE]`
- [ ] **Pagination hidden when <=10 results** — on a tab with few results, no pagination shown `[CODE]`
- [ ] **Next page loads results** — click Next, verify page 2 results display `[CODE]`
- [ ] **Previous page returns** — on page 2, click Previous, verify page 1 results display `[CODE]`
- [ ] **Page counter updates** — shows "Page 1 of N", updates on navigation `[CODE]`
- [ ] **Previous disabled on page 1** — first page, Previous button is disabled and styled muted `[CODE]`
- [ ] **Next disabled on last page** — last page, Next button is disabled and styled muted `[CODE]`
- [ ] **Page caching** — navigate to page 2, back to page 1, verify no re-fetch (cached) `[CODE]`
- [ ] **Buttons disabled during load** — while paginating, both buttons are disabled `[CODE]`

#### Toast Notifications
- [ ] **Success toast** — after saving, green check toast appears at bottom center `[CODE]`
- [ ] **Info toast** — "Already in Library" shows info icon toast `[CODE]`
- [ ] **Auto-dismiss** — toast fades out automatically after ~2 seconds `[CODE]`
