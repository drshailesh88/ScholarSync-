# Pending Work

Items that need backend/database changes or additional frontend wiring before they can be fully functional.

---

## 1. Add/Remove Tools — Customizable Sidebar

**Type:** Backend + Frontend

**What:** Users should be able to add and remove tools from their sidebar. Draft is the only non-removable tool. Category headers auto-show/hide based on which tools are present.

**Backend needed:**
- New database table: `user_sidebar_preferences` with columns: `userId`, `toolId`, `visible` (boolean), `order` (integer)
- API route: `GET /api/user/sidebar` — returns the user's visible tools
- API route: `POST /api/user/sidebar` — updates which tools are visible (add/remove)
- Seed with defaults: all tools visible for existing users
- During onboarding: set initial tools based on user type selection

**Frontend ready:** The prototype has the + Add tool panel and × remove buttons with animations. The React sidebar component needs to read from this API instead of the hardcoded `navSections` array.

**Reference:** See `decisions.md` → "Sidebar Customization — Workspace-First Architecture" for full design spec.

---

## 2. Buddy Panel — Editor Context Passing

**Type:** Frontend wiring (no backend changes)

**What:** When Buddy is opened from within the Draft editor, it should receive document context (document type, current section, target journal, project title) so Draft mode can give context-aware responses. When Buddy is opened from any other page, it works without this context — the backend already handles missing context gracefully.

**What exists:**
- `/api/chat` already accepts optional `draftContext` (intensity, documentType, currentSection, targetJournal, projectTitle) and `guideContext` (documentType, stage, targetJournal)
- The Studio page currently sends this context when calling the chat API
- The backend uses defaults when context is not provided

**What needs wiring:**
- BuddyPanel component needs to accept optional `editorContext` prop
- When mounted inside the editor page, pass the editor's current state (doc type, section, title)
- When mounted globally (from app-shell), no context is passed — that's fine
- This is a prop-drilling or context-provider task, not a backend task

**Priority:** Low — Buddy works without context, just gives less specific answers. Wire this when the editor reskin is done.

---

## 3. Mark System — Backend Persistence

**Type:** Backend

**What:** The Important and Notes marks on projects need to persist in the database so they survive page reloads and work across devices.

**Backend needed:**
- New columns on the projects/documents table: `marked_important` (boolean, default false), `marked_notes` (boolean, default false)
- Or a separate `document_marks` table if marks should support more types in the future
- API route: `PATCH /api/projects/[id]/mark` — toggle important/notes marks
- API route: `GET /api/projects` should include mark data in the response
- Dashboard page needs to filter by marks server-side (or client-side from the response)

**Frontend ready:** The prototype has the Mark button in the editor toolbar, filter chips on the dashboard, and visual indicators in both list and grid views. The React components need to call the API instead of using local state.

**Reference:** See `decisions.md` → "Mark System — Cross-Module Tagging"

---

## 4. Sign Out — Clerk Integration

**Type:** Frontend wiring

**What:** The "Sign out" option in the sidebar user dropdown needs to call Clerk's sign-out method instead of redirecting to home.

**What exists:**
- Clerk's `useClerk()` hook provides `signOut()` method
- `ClerkUserButton` already handles sign-out but it's a separate UI element
- We need to call `signOut()` from our custom dropdown item

**What needs wiring:**
- Import `useClerk` from `@clerk/nextjs`
- Call `clerk.signOut()` when the "Sign out" dropdown item is clicked
- Handle the redirect after sign-out

**Priority:** Medium — currently redirects to "/" which isn't a proper sign-out.

---

## 5. Text Size Preference — Persistence

**Type:** Frontend (localStorage) or Backend (user preferences)

**What:** The A-/A+ text size toggle in the sidebar user dropdown should persist the user's choice across sessions.

**Options:**
- **localStorage** (simplest): Store `sidebar-text-size: "normal" | "large"` in localStorage. Read on mount. No backend needed.
- **Backend** (if user preferences table exists): Store as a user preference alongside theme preference.

**Priority:** Low — currently resets on page reload.

---

## 6. Buddy Icon (FAB Image)

**Type:** Asset

**What:** The Buddy floating action button needs the `buddy-icon.png` image. It exists in the prototype repo but needs to be copied to ScholarSync's `public/` directory.

**File:** Copy from `Ui-for-scholarsync/buddy-icon.png` to `ScholarSync/public/buddy-icon.png`

**Priority:** Do this before building the BuddyPanel component.

---
