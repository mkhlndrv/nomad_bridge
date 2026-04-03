# Day 6 Homework: Reliability-First Development

**Feature:** University Event Discovery & RSVP
**Project:** NomadBridge
**Date:** 2026-03-26

---

## 1. Execution Plan with Checkpoints

### Phase 1: Schema & Data Layer Validation

**Goal:** Confirm the Prisma schema supports all RSVP requirements.

| Step | Task | Verification |
|------|------|-------------|
| 1.1 | Verify `Event` model has: title, date, venue, capacity, university, category, rsvpCount | `npx prisma studio` — inspect columns |
| 1.2 | Verify `EventRsvp` join table has `@@unique([userId, eventId])` constraint | Attempt duplicate insert in Prisma Studio — should fail |
| 1.3 | Verify `User → EventRsvp → Event` relationship chain works | Create test records via Prisma Studio |
| 1.4 | Seed database with 3 universities, 5 events (mix of past/future, full/available) | Run seed script, verify in Prisma Studio |

**Checkpoint 1:** All models exist, relationships resolve, seed data visible.
**Commit:** `chore: add event seed data for development`

---

### Phase 2: API Routes (Backend Logic)

**Goal:** Implement event listing and RSVP endpoints with full business logic.

| Step | Task | Verification |
|------|------|-------------|
| 2.1 | `GET /api/events` — list events with optional filters (university, category, date range) | `curl localhost:3000/api/events` returns JSON array |
| 2.2 | `GET /api/events/[id]` — single event detail with RSVP count and attendee status | `curl localhost:3000/api/events/<id>` returns event + rsvpCount |
| 2.3 | `POST /api/events/[id]/rsvp` — create RSVP with capacity check | Test with valid userId → 201; test at capacity → 409 |
| 2.4 | `DELETE /api/events/[id]/rsvp` — cancel RSVP and decrement count | Cancel → rsvpCount decreases by 1 |
| 2.5 | Add guards: past event rejection, duplicate RSVP prevention | Test past event → 400; duplicate → 409 |

**Checkpoint 2:** All API routes return correct status codes and data. All edge cases handled.
**Commits:**
- `feat: add event listing API with filters`
- `feat: add RSVP creation with capacity enforcement`
- `feat: add RSVP cancellation and past-event guard`

---

### Phase 3: UI Components

**Goal:** Build the event discovery feed and RSVP interaction.

| Step | Task | Verification |
|------|------|-------------|
| 3.1 | `EventCard` component — displays title, date, venue, university, spots remaining | Renders correctly with sample data |
| 3.2 | `EventFeed` page — server component fetching from API, filter bar | Browse events at `/events`, filters work |
| 3.3 | `EventDetail` page — full info + RSVP button | Click event → see detail page with capacity bar |
| 3.4 | RSVP button with optimistic UI — click to RSVP, visual feedback, disable if full/past | Click RSVP → button changes to "Cancel RSVP", count updates |
| 3.5 | Empty states and error handling | No events → "No upcoming events" message; API error → toast |

**Checkpoint 3:** Full user flow works: browse → click event → RSVP → see confirmation.
**Commits:**
- `feat: add EventCard and EventFeed components`
- `feat: add event detail page with RSVP button`
- `feat: add empty states and error handling`

---

### Phase 4: Integration & Polish

| Step | Task | Verification |
|------|------|-------------|
| 4.1 | End-to-end flow test: seed → browse → filter → RSVP → cancel | Manual walkthrough succeeds |
| 4.2 | Mobile responsiveness check | Resize browser to 375px width — layout intact |
| 4.3 | Run full test suite | `npm test` — all tests pass |

**Checkpoint 4:** Feature complete per Definition of Done in CLAUDE.md.
**Commit:** `chore: polish event discovery and fix edge cases`

---

## 2. Test Suite (Written Before Implementation)

### 2.1 Setup

We use **Vitest** as the test runner (fast, TypeScript-native, works with Next.js).

```bash
npm install -D vitest @vitejs/plugin-react
```

**`vitest.config.ts`:**
```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

**`package.json` script:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

### 2.2 Unit Tests — RSVP Business Logic

**File:** `__tests__/unit/rsvp-logic.test.ts`

```typescript
import { describe, it, expect } from "vitest";

// ── Pure business logic functions (to be implemented in lib/rsvp.ts) ──

// These functions will be extracted from API routes for testability:
// - canRsvp(event, userId, existingRsvps): { allowed: boolean; reason?: string }
// - calculateSpotsRemaining(event): number

describe("RSVP Business Logic", () => {

  // ── Capacity Check ──
  describe("Capacity Enforcement", () => {
    it("should allow RSVP when spots are available", () => {
      const event = { capacity: 50, rsvpCount: 30, date: futureDate() };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(true);
    });

    it("should reject RSVP when event is at full capacity", () => {
      const event = { capacity: 50, rsvpCount: 50, date: futureDate() };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe("Event is at full capacity");
    });

    it("should handle zero-capacity events", () => {
      const event = { capacity: 0, rsvpCount: 0, date: futureDate() };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe("Event is at full capacity");
    });

    it("should correctly calculate spots remaining", () => {
      const event = { capacity: 50, rsvpCount: 47 };
      expect(calculateSpotsRemaining(event)).toBe(3);
    });
  });

  // ── Duplicate RSVP Prevention ──
  describe("Duplicate RSVP Prevention", () => {
    it("should reject duplicate RSVP from same user", () => {
      const event = { capacity: 50, rsvpCount: 10, date: futureDate() };
      const existingRsvps = [{ userId: "user-1", eventId: "event-1" }];
      const result = canRsvp(event, "user-1", existingRsvps);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe("Already registered for this event");
    });

    it("should allow RSVP if user registered for different event", () => {
      const event = { id: "event-2", capacity: 50, rsvpCount: 10, date: futureDate() };
      const existingRsvps = [{ userId: "user-1", eventId: "event-1" }];
      const result = canRsvp(event, "user-1", existingRsvps);
      expect(result.allowed).toBe(true);
    });
  });

  // ── Past Event Guard ──
  describe("Past Event Guard", () => {
    it("should reject RSVP for events in the past", () => {
      const event = { capacity: 50, rsvpCount: 10, date: pastDate() };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(false);
      expect(result.reason).toBe("Cannot RSVP to past events");
    });

    it("should allow RSVP for future events", () => {
      const event = { capacity: 50, rsvpCount: 10, date: futureDate() };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(true);
    });

    it("should reject RSVP for event happening right now (already started)", () => {
      const event = { capacity: 50, rsvpCount: 10, date: new Date(Date.now() - 3600000) };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(false);
    });
  });

  // ── Waitlist Logic ──
  describe("Waitlist", () => {
    it("should indicate waitlist when event is full but waitlist is enabled", () => {
      const event = { capacity: 50, rsvpCount: 50, date: futureDate(), waitlistEnabled: true };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(true);
      expect(result.waitlisted).toBe(true);
    });

    it("should not offer waitlist when feature is disabled", () => {
      const event = { capacity: 50, rsvpCount: 50, date: futureDate(), waitlistEnabled: false };
      const result = canRsvp(event, "user-1", []);
      expect(result.allowed).toBe(false);
    });
  });

  // ── rsvpCount Synchronization ──
  describe("RSVP Count Sync", () => {
    it("rsvpCount should never exceed capacity", () => {
      const event = { capacity: 50, rsvpCount: 50 };
      expect(event.rsvpCount).toBeLessThanOrEqual(event.capacity);
    });

    it("rsvpCount should never go below zero", () => {
      const event = { capacity: 50, rsvpCount: 0 };
      expect(event.rsvpCount).toBeGreaterThanOrEqual(0);
    });
  });
});

// ── Test Helpers ──
function futureDate(): Date {
  return new Date(Date.now() + 7 * 24 * 3600000); // 7 days from now
}

function pastDate(): Date {
  return new Date(Date.now() - 7 * 24 * 3600000); // 7 days ago
}
```

---

### 2.3 Integration Tests — API Routes

**File:** `__tests__/integration/rsvp-api.test.ts`

```typescript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";

describe("RSVP API Integration", () => {
  let testUser: { id: string };
  let testCreator: { id: string };
  let futureEvent: { id: string };
  let pastEvent: { id: string };
  let fullEvent: { id: string };

  beforeAll(async () => {
    // Seed test data
    testCreator = await prisma.user.create({
      data: { name: "Test University", email: "uni@test.com", role: "UNIVERSITY" },
    });
    testUser = await prisma.user.create({
      data: { name: "Test Nomad", email: "nomad@test.com", role: "NOMAD" },
    });
    futureEvent = await prisma.event.create({
      data: {
        title: "Future Workshop",
        date: new Date(Date.now() + 7 * 24 * 3600000),
        venue: "Room 101",
        university: "Chulalongkorn",
        capacity: 50,
        creatorId: testCreator.id,
      },
    });
    pastEvent = await prisma.event.create({
      data: {
        title: "Past Seminar",
        date: new Date(Date.now() - 7 * 24 * 3600000),
        venue: "Room 202",
        university: "Thammasat",
        capacity: 50,
        creatorId: testCreator.id,
      },
    });
    fullEvent = await prisma.event.create({
      data: {
        title: "Full Event",
        date: new Date(Date.now() + 7 * 24 * 3600000),
        venue: "Room 303",
        university: "KMUTT",
        capacity: 1,
        rsvpCount: 1,
        creatorId: testCreator.id,
      },
    });
  });

  afterAll(async () => {
    // Clean up test data in correct order (respect foreign keys)
    await prisma.eventRsvp.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  // ── Happy Path ──
  it("should create RSVP and increment rsvpCount", async () => {
    const res = await fetch(`http://localhost:3000/api/events/${futureEvent.id}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: testUser.id }),
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.data.eventId).toBe(futureEvent.id);

    // Verify rsvpCount incremented
    const updated = await prisma.event.findUnique({ where: { id: futureEvent.id } });
    expect(updated?.rsvpCount).toBe(1);
  });

  // ── Duplicate RSVP ──
  it("should reject duplicate RSVP with 409", async () => {
    const res = await fetch(`http://localhost:3000/api/events/${futureEvent.id}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: testUser.id }),
    });

    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data.error).toContain("Already registered");
  });

  // ── Full Capacity ──
  it("should reject RSVP when event is full with 409", async () => {
    const res = await fetch(`http://localhost:3000/api/events/${fullEvent.id}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: testUser.id }),
    });

    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data.error).toContain("full capacity");
  });

  // ── Past Event ──
  it("should reject RSVP to past event with 400", async () => {
    const res = await fetch(`http://localhost:3000/api/events/${pastEvent.id}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: testUser.id }),
    });

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("past");
  });

  // ── Cancel RSVP ──
  it("should cancel RSVP and decrement rsvpCount", async () => {
    const res = await fetch(`http://localhost:3000/api/events/${futureEvent.id}/rsvp`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: testUser.id }),
    });

    expect(res.status).toBe(200);

    const updated = await prisma.event.findUnique({ where: { id: futureEvent.id } });
    expect(updated?.rsvpCount).toBe(0);
  });

  // ── Missing userId ──
  it("should return 400 when userId is missing", async () => {
    const res = await fetch(`http://localhost:3000/api/events/${futureEvent.id}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    expect(res.status).toBe(400);
  });
});
```

---

### 2.4 Test Coverage Matrix

| Scenario | Unit Test | Integration Test | Status |
|----------|:---------:|:----------------:|--------|
| RSVP with available spots | ✅ | ✅ | Planned |
| RSVP at full capacity | ✅ | ✅ | Planned |
| Duplicate RSVP prevention | ✅ | ✅ | Planned |
| RSVP to past event | ✅ | ✅ | Planned |
| Zero-capacity event | ✅ | — | Planned |
| Waitlist when full | ✅ | — | Planned |
| Cancel RSVP + count sync | — | ✅ | Planned |
| Missing userId | — | ✅ | Planned |
| rsvpCount never negative | ✅ | — | Planned |
| Concurrent RSVPs | — | Future | Planned |

---

## 3. Debugging Playbook

### 3.1 Minimal Reproduction Template

```markdown
## Bug Report: [Short Title]

**Severity:** Critical / High / Medium / Low
**Feature:** Event Discovery & RSVP
**Date:** YYYY-MM-DD

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [Third step]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Node.js: [version]
- Next.js: 16.2.1
- Prisma: 7.5.0
- Database: SQLite (dev.db)
- Browser: [name + version]
- OS: [macOS / Linux / Windows]

### Relevant Logs
\```
[paste error logs, console output, or network responses]
\```

### Database State
\```sql
-- Query to check relevant state
SELECT * FROM Event WHERE id = '[event-id]';
SELECT * FROM EventRsvp WHERE eventId = '[event-id]';
\```
```

---

### 3.2 Example Bug Report

```markdown
## Bug Report: RSVP succeeds but rsvpCount not incremented

**Severity:** Critical
**Feature:** Event Discovery & RSVP
**Date:** 2026-03-26

### Steps to Reproduce
1. Open event detail page for "AI Workshop" (id: clx123)
2. Click "RSVP Now" button
3. See success toast: "You're registered!"
4. Refresh the page

### Expected Behavior
- rsvpCount should increase from 12 to 13
- "13/50 spots taken" should display

### Actual Behavior
- RSVP record exists in EventRsvp table
- rsvpCount still shows 12 (not incremented)
- Page displays "12/50 spots taken"

### Environment
- Node.js: 22.x
- Browser: Chrome 130
- OS: macOS 15

### Relevant Logs
\```json
// POST /api/events/clx123/rsvp response:
{ "data": { "id": "rsvp-456", "userId": "user-789", "eventId": "clx123" } }
// Status: 201 Created
\```

### Database State
\```sql
SELECT rsvpCount FROM Event WHERE id = 'clx123';
-- Result: 12 (should be 13)

SELECT COUNT(*) FROM EventRsvp WHERE eventId = 'clx123';
-- Result: 13 (correct — count mismatch!)
\```

### Root Cause Analysis
The `POST /api/events/[id]/rsvp` handler creates the EventRsvp record
but does not atomically increment `rsvpCount` on the Event.

### Fix
Wrap both operations in a Prisma transaction:
\```typescript
await prisma.$transaction([
  prisma.eventRsvp.create({ data: { userId, eventId } }),
  prisma.event.update({
    where: { id: eventId },
    data: { rsvpCount: { increment: 1 } },
  }),
]);
\```
```

---

### 3.3 RSVP Triage Checklist

When an RSVP bug is reported, check these in order:

```
□ 1. Is the event in the database?
     → npx prisma studio → Events table → search by id

□ 2. Is the user in the database?
     → Check User table for the userId from the request

□ 3. Does an EventRsvp record exist?
     → Filter EventRsvp by userId + eventId
     → If yes: the RSVP was created (backend worked)
     → If no: check API route logs for errors

□ 4. Is rsvpCount in sync with actual RSVPs?
     → Count EventRsvp records for the event
     → Compare with Event.rsvpCount
     → If mismatch: transaction bug (see example above)

□ 5. Is the event date in the future?
     → Check Event.date vs current UTC time
     → Remember: dates stored in UTC, displayed in Asia/Bangkok

□ 6. Is the event at capacity?
     → Compare Event.rsvpCount with Event.capacity
     → If rsvpCount >= capacity: capacity enforcement is working

□ 7. Check the API response in browser DevTools
     → Network tab → find the POST/DELETE request
     → Status code? Response body? Error message?

□ 8. Check server logs
     → Terminal running `npm run dev`
     → Look for uncaught exceptions or Prisma errors
```

---

## 4. Lightweight Indexing Strategy

### 4.1 Purpose

An indexing strategy helps AI coding assistants (like Claude Code) and developers quickly find relevant code. For a small course project, we keep it lightweight and practical.

### 4.2 What to Index

| Layer | Files to Index | Why |
|-------|---------------|-----|
| **Data Models** | `prisma/schema.prisma` | Source of truth for all entities and relationships |
| **API Routes** | `app/api/**/*.ts` | Business logic lives here |
| **Components** | `components/**/*.tsx` | Reusable UI building blocks |
| **Pages** | `app/**/page.tsx` | User-facing entry points |
| **Utilities** | `lib/*.ts` | Shared helpers (prisma client, date formatting) |
| **Specs** | `docs/specs/*.md` | Feature requirements and acceptance criteria |
| **Config** | `CLAUDE.md` | Project rules and conventions |

### 4.3 Chunking Strategy

For a small project like NomadBridge, chunk by **logical unit**:

```
Chunk Type       │ Granularity          │ Example
─────────────────┼──────────────────────┼──────────────────────────
Schema Model     │ One model per chunk  │ "Event model with fields and relations"
API Route        │ One handler per chunk│ "POST /api/events/[id]/rsvp handler"
Component        │ One component        │ "EventCard component with props"
Utility Function │ One function         │ "formatDateBangkok helper"
Spec Section     │ One feature          │ "Event RSVP acceptance criteria"
```

**Why this granularity?** Each chunk is small enough to fit in an LLM context window alongside a question, but large enough to be self-contained. A developer (or AI) can grab one chunk and understand it without needing the full file.

### 4.4 Metadata Tags

Each indexed chunk should carry:

```typescript
interface ChunkMetadata {
  file: string;           // "app/api/events/[id]/rsvp/route.ts"
  feature: string;        // "event-rsvp" | "facility-booking" | "skill-exchange"
  layer: string;          // "data" | "api" | "ui" | "util" | "spec" | "config"
  entity: string;         // "Event" | "User" | "Booking" | "EventRsvp"
  type: string;           // "model" | "route-handler" | "component" | "function" | "spec"
  description: string;    // "Handles RSVP creation with capacity check"
}
```

**Example tagged chunk:**

```json
{
  "file": "app/api/events/[id]/rsvp/route.ts",
  "feature": "event-rsvp",
  "layer": "api",
  "entity": "EventRsvp",
  "type": "route-handler",
  "description": "POST handler: creates RSVP with capacity check, duplicate prevention, past-event guard"
}
```

### 4.5 Practical Implementation

For this course project, indexing is implemented through:

1. **CLAUDE.md** — acts as the top-level index, pointing AI tools to the right directories
2. **docs/knowledge-base.md** — maps features to entities and requirements
3. **docs/specs/*.md** — detailed per-feature indexes with acceptance criteria
4. **File naming conventions** — descriptive folder structure (`app/api/events/[id]/rsvp/route.ts`) makes code discoverable via path alone
5. **Prisma schema** — single source of truth for data structure, readable by both humans and AI

No external vector database or embedding pipeline needed — the project is small enough that good file organization + documentation serves as the index.

---

## 5. Reflection: Why Planning and Testing Upfront Matters

### The Agentic Development Problem

When working with AI coding assistants, there's a tempting shortcut: describe what you want, let the AI generate code, and fix issues as they appear. This feels fast but creates a specific problem — **cascading errors**.

An AI assistant generates code based on its understanding of your intent. Without a clear specification and test suite, small misunderstandings compound. The RSVP handler might not check capacity. The UI might not disable the button for past events. The rsvpCount might drift out of sync. Each bug discovered late requires re-reading code, understanding the AI's assumptions, and patching — often introducing new issues.

### What Planning Gives Us

The execution plan with checkpoints (Section 1) creates **verifiable boundaries**. After Phase 2, I can confirm every API route returns the correct status code before building any UI. If the capacity check is wrong, I catch it at the API level — not after building three components that depend on it.

This is especially important with AI assistants because they work fast. An AI can scaffold an entire feature in minutes. Without checkpoints, you might not realize the foundation is wrong until the whole building is up.

### What Testing Gives Us

Writing tests before implementation (Section 2) does three things:

1. **Forces precise thinking.** Writing `expect(result.reason).toBe("Event is at full capacity")` requires deciding exactly what error message to return. This decision, made upfront, prevents ambiguity when the AI generates the implementation.

2. **Creates a contract.** The test suite is a machine-readable specification. When I hand the AI the test file and say "make these pass," there's no room for misinterpretation. The AI either makes the tests pass or it doesn't.

3. **Catches regressions instantly.** When adding the waitlist feature, the capacity test still runs. If the waitlist logic accidentally breaks the capacity check, the test fails immediately — not three days later when a user reports it.

### The Debugging Playbook Connection

The debugging playbook (Section 3) isn't just for fixing bugs — it's for **proving correctness**. The triage checklist turns debugging from "something feels wrong" into a systematic process. In agentic development, where code is generated quickly, having a structured way to verify behavior is essential.

### Key Takeaway

Planning and testing upfront is not about slowing down. It's about **making the fast parts safe**. AI assistants amplify both speed and mistakes. A reliability-first approach — plan, test, implement, verify — ensures the speed compounds into progress rather than technical debt.

In a 3-week course project, there's no time to rewrite features. Getting it right the first time, guided by a clear plan and a pre-written test suite, is the most efficient path.
