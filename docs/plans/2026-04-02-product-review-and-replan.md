# NomadBridge — Product Review & Re-Plan

> Last updated: 2026-04-02

## Goal

Provide a product-driven review of the project’s current weaknesses and a revised, execution-ready plan that reduces agent confusion, prevents doc drift, and prioritizes MVP value delivery.

## What I reviewed

- Canonical docs: `CLAUDE.md`, `AGENTS.md`, `docs/specs/_index.md`, `docs/knowledge-base.md`, `docs/target-schema.prisma`, `docs/plans/overview.md`
- A sample spec slice: RSVP + community events + notifications + forum + facility booking
- Teacher branch artifacts (added docs): `docs/C5-community-discussion.md`, `docs/C6-notifications.md`, `docs/C7-non-university-events.md`, `docs/C8-manage-recordings.md`, `general_development_plan.md`

---

## Product weaknesses (highest impact first)

### 1) “Source of truth” drift (agents will implement contradictions)

**Symptom**
- You have a strong canonical set (specs/plans/knowledge base/target schema), but the teacher branch introduces a parallel doc set (`docs/C5–C8.md`, `general_development_plan.md`) that overlaps with your canonical docs and can disagree on details.

**Product impact**
- Agents pick the wrong rule and ship incorrect behavior (enum values, idempotency, status fields). This is the fastest path to “MVP feels buggy/unreliable.”

**Fix**
- Declare doc authority explicitly:
  - **Canonical**: `docs/specs/**`, `docs/plans/**`, `docs/knowledge-base.md`, `docs/target-schema.prisma`, `CLAUDE.md`
  - **Non-canonical summaries (optional)**: any `docs/C*.md` files must state “summary only” and link to canonical docs.

### 2) Contract mismatches that affect user-visible behavior

These are not “internal” — they change what users experience.

- **Community event typing**
  - Canonical: `CommunityEventType` enum separate from `EventCategory` (plus `Event.isCommunity`).
  - Teacher summary: describes `eventType` as a `String` field.
  - Product impact: filtering, UI labels, and validation diverge.

- **Notifications dedup/idempotency**
  - Canonical spec: duplicate detection by `(userId, type, referenceId)`.
  - Teacher summary: dedupe by `(userId, type, linkUrl)` with a time window.
  - Product impact: users can receive duplicated notifications or miss expected ones.

- **RSVP waitlist representation**
  - Canonical target + updated specs: `EventRsvp.status` + `waitlistPosition`.
  - Product impact: capacity enforcement + “you’re #N” UX can’t be implemented consistently if docs disagree.

### 3) Documentation lifecycle policy is unenforced

**Symptom**
- `CLAUDE.md` says every `.md` has a `> Last updated:` line, but most of `docs/plans/**` lacks it (plans, tasks, test maps).

**Product impact**
- Agents can’t tell which instruction is stale; humans can’t audit drift quickly.

**Fix**
- Either enforce it (update plans/tasks with last-updated) or relax the rule in `CLAUDE.md` (“specs/KB must have it; plans optional”).

### 4) “MVP readiness” gaps (not enough guardrails for reliability)

Even if features exist, MVP can still feel fragile without:
- A minimal “release gate” checklist (docs + basic tests + seed sanity)
- A couple of runbooks for high-risk flows (RSVP capacity/waitlist; booking approval/cancellation)

**Product impact**
- Regressions accumulate quickly under agentic development.

### 5) Onboarding clarity still depends on reading many files

README is improved, but an agent/human still has to discover:
- where canonical decisions live (now in knowledge-base),
- which docs are summary vs canonical,
- how to handle teacher branch docs.

**Product impact**
- Higher “activation energy” for new agent sessions; more wrong assumptions.

---

## Revised implementation plan (product-first, agent-safe)

This plan assumes you’ll implement in your existing structure:
`docs/specs/**` → `docs/plans/**` → `docs/plans/C.*` task files.

### Guiding principles for the plan

- **Single source of truth**: canonical docs win; summaries must never introduce new rules.
- **Deliver value early**: user-visible, demoable flows first (profile → events RSVP → notifications basics).
- **Keep agents aligned**: every sprint has a “contract check” step (schema/enums + API contracts + key business rules).
- **Atomic commits**: one logical slice per commit (schema change, one API route, one UI component, one test map slice).

---

## Phase 0 — Doc governance hardening (1–2 hours, documentation only)

### Task 0.1: Declare documentation authority

- [ ] Add a short “Canonical docs” section to `docs/specs/_index.md`:
  - Canonical vs summary docs list
  - Rule: summaries cannot define new behavior; they only point to specs/plans/KB

- [ ] If you keep the teacher’s `docs/C5–C8.md` files, add a standard header:
  - “This is a summary. Source of truth: `docs/specs/<feature>/...` and `docs/plans/C.<N>-...`”

### Task 0.2: Normalize “Last updated” policy

Choose one and apply consistently:

- **Option A (strict)**: add `> Last updated: ...` to:
  - `docs/plans/**/plan.md`
  - `docs/plans/**/test-map.md`
  - new task files going forward

- **Option B (pragmatic)**: update `CLAUDE.md` to specify:
  - Specs + knowledge base must have last-updated
  - Plans/tasks are allowed to omit it

### Task 0.3: Add a lightweight release gate checklist

- [ ] Create `docs/plans/release-gate.md` (or similar) with a checklist:
  - schema pushed + seed
  - vitest run
  - API response contract check
  - docs updated when contracts change

---

## Phase 1 — MVP Core Loop (Profile → Events → RSVP) (target: demoable)

Use your existing build order but add product “stop points”:

### Sprint P1-S1: Profile foundations (C.2)

- Execute `docs/plans/C.2-participant-profile/plan.md` Sprint 1 tasks.
- Add one “contract check” step at end:
  - `Role` values and verification level rules match `docs/target-schema.prisma` and `docs/knowledge-base.md`.

### Sprint P1-S2: Events discovery foundations (C.1 Sprint 1–2)

- Execute C.1 Sprint 1 (mockups) then Sprint 2 (list/detail APIs).
- Stop point: A user can browse events and open a detail page with correct capacity display.

### Sprint P1-S3: RSVP with waitlist (C.1 Sprint 3)

- Execute RSVP interactions + waitlist logic.
- Stop point: RSVP full → waitlist position is stable and understandable.

---

## Phase 2 — Notifications “Minimum Useful” (reduce user uncertainty)

### Sprint P2-S1: Notification infrastructure (C.6 Sprint 1)

- Execute `docs/plans/C.6-notifications/plan.md` Sprint 1 tasks.
- **Contract check**:
  - Notification types and categories match `docs/knowledge-base.md`
  - Duplicate detection uses `(userId, type, referenceId)` as documented in `docs/specs/notifications/overview.md`

### Sprint P2-S2: In-app notification center + unread badge (C.6 Sprint 2)

- Execute C.6 Sprint 2 tasks.
- Stop point: Users can see unread count and a list of notifications in-app.

### Sprint P2-S3: Preferences (C.6 Sprint 3)

- Execute C.6 Sprint 3 tasks.
- Stop point: User toggles actually affect delivery (Email/LINE/Telegram mocks + in-app creation).

---

## Phase 3 — Marketplace & Coordination (Facilities + Collaboration + Forum)

This phase focuses on “community utility” and coordination value after the core RSVP loop exists.

### Track A: Facility booking (C.4)

- Execute `docs/plans/C.4-facility-booking/plan.md` in order.
- **Product guardrails to add while implementing** (verify they’re reflected in specs/KB):
  - Trust gate: users with trustScore < -5 cannot create booking requests (spec: facility-booking overview)
  - Interest threshold transitions and venue manager notification behavior
  - Cancellation window and trust penalties (must be clearly messaged in UI)

### Track B: Collaboration board (C.3)

- Execute `docs/plans/C.3-collaboration-board/plan.md`.
- Stop point: A nomad can post an offer/request and another user can apply/invite/respond.

### Track C: Community forum (C.5)

- Execute `docs/plans/C.5-community-discussion/plan.md`.
- Stop point: Browse → create → reply → vote/bookmark/best answer works, and rate limiting is user-visible (“wait 30s”).

---

## Phase 4 — Extensions (Community events + Recordings)

### Sprint P4-S1: Community events (C.7)

- Execute `docs/plans/C.7-non-university-events/plan.md`.
- **Contract check**:
  - Community events use `Event.isCommunity === true` plus `CommunityEventType` enum (not a free-text string)
  - Trust gate for creation is consistent: trustScore >= 10

### Sprint P4-S2: Recordings (C.8)

- Execute `docs/plans/C.8-manage-recordings/plan.md`.
- Stop point: A user can browse recordings and open a detail page; access control rules match specs (PUBLIC vs attendees-only vs unlisted).

---

## How to incorporate the teacher branch (docs-only recommendation)

### Option A (recommended): Keep teacher docs as summaries

- Keep `docs/C5-community-discussion.md`, `docs/C6-notifications.md`, `docs/C7-non-university-events.md`, `docs/C8-manage-recordings.md`, `general_development_plan.md`
- Add a standard header to each file:
  - “Summary only; canonical docs are `docs/specs/**`, `docs/plans/**`, `docs/knowledge-base.md`, `docs/target-schema.prisma`.”
- Remove any rules that contradict canonical behavior (especially enums, dedupe keys, and field names).

### Option B: Remove them to avoid drift

- Delete the summary docs and rely on your canonical structure only.
- Add one “quick map” section to `README.md` or `docs/specs/_index.md` if you still want a short entry point.

---

## Self-review checklist (before starting implementation)

- [ ] **No contradictions**: search for conflicting statements about:
  - `EventCategory` values
  - `CommunityEventType` vs `eventType`
  - notification dedupe key
  - RSVP waitlist representation
- [ ] **Doc authority** is stated in one place (recommended: `docs/specs/_index.md`).
- [ ] **Plan links work** (task links in every `docs/plans/C.*/*` point to real files).

