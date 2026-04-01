# explore — Spec 009

STATUS: PARTIAL
TESTED: 12/12
PASS: 3
FAIL: 9
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Pagination & Toasts

#### Pagination
- [ ] FAIL: **Pagination visible when >10 results** — verify Previous/Next buttons and page counter appear `[CODE]`
- [x] PASS: **Pagination hidden when <=10 results** — on a tab with few results, no pagination shown `[CODE]`
- [ ] FAIL: **Next page loads results** — click Next, verify page 2 results display `[CODE]`
- [ ] FAIL: **Previous page returns** — on page 2, click Previous, verify page 1 results display `[CODE]`
- [ ] FAIL: **Page counter updates** — shows "Page 1 of N", updates on navigation `[CODE]`
- [x] PASS: **Previous disabled on page 1** — first page, Previous button is disabled and styled muted `[CODE]`
- [ ] FAIL: **Next disabled on last page** — last page, Next button is disabled and styled muted `[CODE]`
- [ ] FAIL: **Page caching** — navigate to page 2, back to page 1, verify no re-fetch (cached) `[CODE]`
- [ ] FAIL: **Buttons disabled during load** — while paginating, both buttons are disabled `[CODE]`

#### Toast Notifications
- [x] PASS: **Success toast** — after saving, green check toast appears at bottom center `[CODE]`
- [ ] FAIL: **Info toast** — "Already in Library" shows info icon toast `[CODE]`
- [ ] FAIL: **Auto-dismiss** — toast fades out automatically after ~2 seconds `[CODE]`
