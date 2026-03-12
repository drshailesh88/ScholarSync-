# Studio Blockers

## 2026-03-11

### Spec-001 data blockers

- Project-selector checks remain blocked in the local fallback session because no multi-project dataset is available without a configured database.
- Populated reference-summary checks remain blocked because the fallback document starts with zero citations and no seeded library references.

These are not browser-launch blockers. Browser automation is working against this workspace on `http://127.0.0.1:3002`.

### Spec-005 plan blockers

- Free-tier lock-state checks for plagiarism and citation audit remain blocked in this local session because the new dev fallback intentionally exercises the paid/basic integrity path so the report can render end-to-end without AI or DB configuration.

### Spec-006 local-dev blockers

- The library-tab loading spinner is implemented, but the local fallback resolves too quickly to reliably freeze that transient state in browser automation.
- The empty-library message is not active in this local session because the no-database fallback intentionally seeds library papers instead of presenting an empty dataset.
