# analysis — Spec 010

STATUS: PENDING
TESTED: 0/8
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/analysis
MODULE: analysis

---
### Quick Test Workflows
#### `src/app/(app)/analysis/page.tsx` — Additional UI Details
- [ ] `IssueBadge` helper renders count as `text-lg font-semibold` and label as `text-[10px]` with four color options: yellow → `text-yellow-600`, orange → `text-orange-600`, blue → `text-blue-600`, red → `text-red-600` (~lines 798-811)
- [ ] `MetricBar` bar track is `h-1.5 rounded-full bg-surface-raised`; fill bar is `h-full rounded-full bg-brand transition-all` (~lines 774-779)
- [ ] `MetricBar` value label format is `{value}{suffix}` with no space before the suffix string (~line 772)
#### `src/hooks/useRealtimeIntegrity.ts` — Hook Internals
- [ ] Hook cancels in-flight requests via `AbortController` before starting a new check (~line 35-37)
- [ ] Hook sends `mode: "ai_detection"` in the request body, not `"full"` (~line 49)
- [ ] Hook extracts `result.aiDetection?.humanScore` from the API response (~line 59)
- [ ] Hook ignores `AbortError` exceptions (cancelled requests are not treated as errors) (~line 62-65)
- [ ] Hook cleanup on unmount aborts any pending request and clears the debounce timer (~line 107-116)
