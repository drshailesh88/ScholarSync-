Read program.md and annealing-log.jsonl. Run: node quality-score.mjs

This session covers FORM TESTING + SECURITY TESTING.

=== FORM EXHAUSTIVE TESTING ===
Find all forms: grep -rn "onSubmit\|handleSubmit\|<form" --include="*.tsx" src/

Create: e2e/forms/ directory

For EACH form, test the Form Testing Matrix from program.md:
- Valid submission -> success
- Double-click submit -> only 1 request
- Server 400 -> field errors shown
- Server 500 -> generic error
- Empty required fields -> validation errors
- Min/max length boundaries
- Special chars: <script>, ', ", \
- Unicode: emoji, RTL, CJK
- Tab order, Enter submits, focus on error

Priority: sign-up, sign-in, settings, project creation, search forms, SR protocol.

=== SECURITY TESTING ===
Create: e2e/security/ directory

1. Auth bypass (e2e/security/auth-bypass.spec.ts):
   For EVERY protected page: unauthenticated -> redirects to /sign-in
   For EVERY API route: no auth -> 401

2. Injection (e2e/security/injection.spec.ts):
   For EVERY POST/PUT API: SQL injection, XSS, NoSQL injection, path traversal, oversized payload

3. IDOR (e2e/security/idor.spec.ts):
   For resource endpoints: User A token -> User B resource -> 403/404

4. Data exposure:
   grep for passwords/secrets in .tsx files
   Check process.env without NEXT_PUBLIC_ in client code
   Run: npm audit

Branch: hardening/session-N
