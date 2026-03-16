Read program.md and annealing-log.jsonl. Run quality-score.mjs.

This is the UNIT TEST session. All E2E spec grinding should be mostly done.
Now we fill the unit test gaps.

UNTESTED lib/ MODULES (write tests for these):

Priority HIGH:
- src/lib/billing/ — subscription logic, plan tiers, payment verification
- src/lib/db/ — schema validation, query helpers
- src/lib/storage/ — R2 upload/download, signed URLs, file type validation

Priority MEDIUM:
- src/lib/pdf/ — PDF extraction, parsing
- src/lib/references/ — BibTeX/RIS import/export, reference parsing
- src/lib/analytics/ — event tracking, property sanitization
- src/lib/liveblocks/ — room creation, auth, permissions

Priority LOW:
- src/lib/tts/ — text-to-speech generation
- src/lib/recording/ — audio upload handling
- src/lib/crypto/ — encryption/decryption
- src/lib/config/ — feature flags
- src/lib/slides/ — slide state helpers

FOR EACH MODULE:
1. Read the module source files
2. Identify exported functions and their expected behaviors
3. Write tests in src/lib/<module>/__tests__/<module>.test.ts
4. Run: npx vitest run src/lib/<module>
5. Fix any failures
6. Run quality-score.mjs and commit if improved

Use Vitest (already installed). Follow existing test patterns in src/lib/search/__tests__/ or src/lib/rag/__tests__/.

Branch: hardening/session-11
