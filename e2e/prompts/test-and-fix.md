You are testing ONE spec file for ScholarSync.

SETUP:
1. Dev server should be running at http://localhost:3001
2. Open agent-browser and navigate to the page in the spec header
3. Set auth: agent-browser cookies set __playwright true

FOR EACH UNCOMPLETED ITEM (no RESULT yet):

1. Read the test description
2. Perform the action in the browser
3. Observe what happens
4. Write RESULT: one of:
   PASS — [what you observed]
   FAIL — expected [X], got [Y]
   BLOCKED — [reason]
   NOT_ON_PAGE — element not found after 3 attempts

FOR FAILURES (RALPH LOOP):
- Is this a real bug (crash, error, missing element)? → Fix if < 5 lines, re-test
- Is this a spec inaccuracy (app works, spec is wrong)? → Correct the spec, mark PASS

RULES:
- Never change app code to match the spec without investigating
- Never add/import components that aren't already rendered
- Commit every 10 items
- When done, update the header counts and set STATUS: COMPLETE
