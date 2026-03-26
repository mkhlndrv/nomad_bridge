# Day 8 Homework: Documentation Systems for Agents

**Project:** NomadBridge
**Date:** 2026-03-26

---

## 1. Repository Document Map

### Current vs. Proposed Structure

```
nomad_bridge/
│
├── CLAUDE.md                          ◄── AGENT-FACING (always loaded)
├── AGENTS.md                          ◄── AGENT-FACING (framework warnings)
├── README.md                          ◄── HUMAN-FACING (onboarding)
│
├── docs/
│   │
│   │── ── Agent-Facing (Operational) ─────────────────────
│   │
│   ├── manifest.json                  ◄── NEW: retrieval index
│   ├── knowledge-base.md              ◄── AGENT: project context
│   │
│   ├── specs/                         ◄── AGENT: feature contracts
│   │   ├── event-discovery-rsvp.md
│   │   ├── facility-booking.md
│   │   └── skill-exchange-board.md
│   │
│   ├── adrs/                          ◄── AGENT: decision records
│   │   ├── index.md                   ◄── NEW: ADR index
│   │   └── 001-explicit-rsvp-join.md  ◄── NEW: example ADR
│   │
│   ├── runbooks/                      ◄── NEW: operational procedures
│   │   └── booking-conflicts.md       ◄── NEW: example runbook
│   │
│   │── ── Human-Facing (Narrative) ───────────────────────
│   │
│   ├── agentic-development-playbook.md   ◄── HUMAN: workflow choices
│   ├── day6-reliability-homework.md      ◄── HUMAN: course homework
│   ├── day7-orchestration-homework.md    ◄── HUMAN: course homework
│   └── day8-documentation-homework.md    ◄── HUMAN: course homework
│
├── prisma/
│   └── schema.prisma                  ◄── AGENT: source of truth for data
│
└── lib/
    ├── prisma.ts                      ◄── AGENT: shared infrastructure
    └── utils.ts                       ◄── AGENT: reusable helpers
```

### Document Classification

| Document | Audience | Type | Freshness Policy | Owner |
|----------|----------|------|-------------------|-------|
| `CLAUDE.md` | Agent (primary) | Operational rules | Update every sprint / when patterns change | Lead developer |
| `AGENTS.md` | Agent | Framework warnings | Update on Next.js upgrade | Lead developer |
| `README.md` | Human | Onboarding | Update on major architecture change | Lead developer |
| `docs/knowledge-base.md` | Agent + Human | Context | Update when features added/removed | Lead developer |
| `docs/specs/*.md` | Agent (primary) | Feature contracts | Update before implementation begins | Feature owner |
| `docs/adrs/*.md` | Agent + Human | Decision records | Immutable once accepted (supersede, don't edit) | Decision maker |
| `docs/runbooks/*.md` | Agent (primary) | Operational | Update after every incident | On-call / feature owner |
| `docs/manifest.json` | Agent (retrieval) | Index | Auto-update on every doc change | CI / lead developer |
| `prisma/schema.prisma` | Agent | Data contract | Update via migrations only | Lead developer |
| `docs/day*-homework.md` | Human | Course work | Snapshot (no updates) | Student |

### Key Design Principle: Separation of Concerns

**Agent-facing documents** are structured for machine consumption:
- Predictable headings and sections
- Explicit metadata (frontmatter or structured fields)
- Small, self-contained chunks
- Cross-references use file paths, not prose

**Human-facing documents** are written for readability:
- Narrative flow with context and rationale
- Longer-form explanations
- Diagrams and examples for understanding
- May reference agent-facing docs but don't duplicate them

**Why separate?** An agent retrieving "how to handle RSVP capacity" should get the spec and runbook — not a homework essay about why planning matters. Mixing audiences creates noise that degrades retrieval quality.

---

## 2. CLAUDE.md / AGENTS.md Outline

### Current State Assessment

The existing `CLAUDE.md` is solid but organized as a flat list of rules. For better agent consumption, it should be restructured into **sections that match how an agent queries it**:

- "What tech stack am I using?" → Quick Facts
- "How should I build this feature?" → Operational Rules
- "What entities exist?" → Entity Reference
- "What patterns should I follow for API routes?" → API Contracts
- "What do I do when something fails?" → Error Handling

### Proposed CLAUDE.md Structure

```markdown
# CLAUDE.md — NomadBridge Agent Instructions

## Quick Facts (Always in Context)
<!-- Agent reads this section on every interaction -->
- **Stack:** Next.js 15 App Router + TypeScript + Tailwind CSS 4
- **Database:** Prisma 7.5 + SQLite (dates in UTC, display in Asia/Bangkok)
- **Icons:** lucide-react
- **Auth:** Mock auth via userId (no auth library for MVP)
- **Path alias:** `@/` maps to project root

## Git Rules
<!-- Agent reads this before any commit -->
- Atomic commits: one logical change per commit
- Format: `<type>: <short description>`
- Types: feat, fix, chore, docs, refactor, test
- Never mix unrelated changes

## Project Structure
<!-- Agent reads this when creating new files -->
app/api/[resource]/route.ts    → API route handlers
app/[feature]/page.tsx         → Page components
components/[Feature]Card.tsx   → Reusable UI (PascalCase)
lib/[utility].ts               → Shared helpers (camelCase)
prisma/schema.prisma           → Data models
docs/specs/                    → Feature specifications
docs/adrs/                     → Architecture decisions
docs/runbooks/                 → Operational procedures

## Entity Reference
<!-- Agent reads this when working with data -->
- **User** → id, name, email, bio, role (NOMAD|UNIVERSITY|ADMIN), trustScore
- **Event** → title, date, venue, capacity, rsvpCount, university, category, creatorId
- **EventRsvp** → userId + eventId (unique pair), join table
- **Facility** → name, university, type, available, pricePerHour
- **Booking** → userId, facilityId, date, startTime, endTime, status, qrCode
- **LectureOpportunity** → title, topic, type (OFFER|REQUEST), status
- **ForumPost** → title, content, category, userId

## API Route Conventions
<!-- Agent reads this when building endpoints -->
- Return `NextResponse.json({ data })` on success
- Return `NextResponse.json({ error: "message" }, { status: code })` on failure
- Validate required fields first, then business rules
- Wrap DB operations in try/catch
- Use Prisma $transaction for multi-step writes

## Error Handling Patterns
<!-- Agent reads this when implementing error cases -->
- 400: Bad request (missing fields, past event, invalid input)
- 404: Resource not found
- 409: Conflict (duplicate RSVP, double booking, capacity full)
- 503: Transient error (retry-safe)
- Always return `{ error: "human-readable message" }`

## Component Conventions
<!-- Agent reads this when building UI -->
- Server Components by default
- "use client" only for interactivity (useState, onClick)
- Tailwind classes directly (no CSS modules)
- Mobile-first responsive (sm → md → lg breakpoints)
- Props interface defined above component in same file

## Definition of Done
- [ ] Feature works end-to-end
- [ ] Responsive on mobile + desktop
- [ ] Error handling added
- [ ] Atomic commit(s) with clear messages
- [ ] Spec exists in docs/specs/ (if new feature)
- [ ] CLAUDE.md updated (if new pattern)

## References
- Specs: `docs/specs/*.md`
- Knowledge base: `docs/knowledge-base.md`
- Schema: `prisma/schema.prisma`
- Runbooks: `docs/runbooks/*.md`
```

### AGENTS.md Role

`AGENTS.md` stays minimal and framework-specific. Its only job is to warn agents about breaking changes in dependencies:

```markdown
# AGENTS.md — Framework-Specific Warnings

## Next.js 16
This project uses Next.js 16.2.1 which has breaking changes from Next.js 15.
Read `node_modules/next/dist/docs/` before writing routing or data-fetching code.

## Prisma 7.5
Datasource URL is in `prisma.config.ts`, NOT in `schema.prisma`.
The `url` field in the datasource block is no longer supported.
```

**Why separate files?** `CLAUDE.md` is project-specific and stable. `AGENTS.md` is framework-specific and changes on upgrades. Keeping them separate means an agent doesn't re-read framework warnings when it just needs project conventions.

---

## 3. ADR Index + Example

### ADR Index (`docs/adrs/index.md`)

```markdown
# Architecture Decision Records

| ID | Title | Status | Date | Feature |
|----|-------|--------|------|---------|
| [001](001-explicit-rsvp-join.md) | Use explicit EventRsvp join table | Accepted | 2026-03-25 | Event RSVP |
| 002 | Store booking times as strings not DateTime | Accepted | 2026-03-25 | Facility Booking |
| 003 | Mock auth via userId for MVP | Accepted | 2026-03-25 | All |
| 004 | SQLite for development, no migrations | Accepted | 2026-03-25 | Infrastructure |

## How to Add an ADR
1. Copy the template below
2. Number sequentially (next: 005)
3. Status: Proposed → Accepted / Rejected / Superseded
4. Never edit an accepted ADR — create a new one that supersedes it
```

### ADR Template

```markdown
# ADR-NNN: [Title]

**Status:** Proposed | Accepted | Rejected | Superseded by ADR-NNN
**Date:** YYYY-MM-DD
**Feature:** [Feature name]
**Deciders:** [Who made this decision]

## Context
[What is the problem or situation that requires a decision?]

## Decision
[What was decided and why?]

## Consequences
### Positive
- [Benefit 1]

### Negative
- [Trade-off 1]

### Neutral
- [Observation 1]

## Alternatives Considered
- **[Alternative A]:** [Why rejected]
```

### Example: ADR-001

```markdown
# ADR-001: Use Explicit EventRsvp Join Table Instead of Implicit Many-to-Many

**Status:** Accepted
**Date:** 2026-03-25
**Feature:** Event Discovery & RSVP
**Deciders:** Lead developer

## Context

The Event RSVP feature requires a many-to-many relationship between User and Event.
Prisma supports two approaches:

1. **Implicit many-to-many:** Prisma auto-generates a hidden join table. No model
   definition needed — just `events Event[]` on User and `attendees User[]` on Event.

2. **Explicit join table:** Define an `EventRsvp` model with `userId` and `eventId`
   fields, plus any extra columns.

We need to track *when* a user RSVPed and prevent duplicate RSVPs at the database level.

## Decision

Use an **explicit `EventRsvp` model** as the join table.

```prisma
model EventRsvp {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])

  @@unique([userId, eventId])
}
```

## Consequences

### Positive
- **`createdAt` tracking:** We know exactly when each RSVP was made, enabling
  "first-come-first-served" waitlist ordering.
- **`@@unique` constraint:** Database-level prevention of duplicate RSVPs. Even if
  the application logic has a race condition, the DB rejects the second insert.
- **Extensibility:** Can add `status` (confirmed/waitlisted/cancelled), `checkedIn`
  (boolean), or `qrCode` fields later without schema migration complexity.
- **Queryability:** Can query RSVPs directly (e.g., "show all RSVPs for this event
  ordered by createdAt") without going through the User or Event model.
- **Clarity for agents:** An AI coding assistant can see the model definition and
  understand the relationship structure explicitly.

### Negative
- **More code:** Explicit model requires relation annotations on both User and Event.
  Prisma's implicit many-to-many would be 2 lines instead of 10.
- **Manual management:** Creating/deleting RSVPs requires explicit `prisma.eventRsvp`
  operations instead of Prisma's `connect`/`disconnect` sugar.

### Neutral
- SQLite handles the unique constraint as expected. No special handling needed.
- The `rsvpCount` field on Event is denormalized for performance but must be kept
  in sync via Prisma `$transaction`.

## Alternatives Considered

- **Implicit many-to-many:** Rejected because it doesn't support `createdAt` or
  the `@@unique` constraint. We'd need application-level duplicate checks, which
  are vulnerable to race conditions.
- **Single RSVP status field on User:** Rejected because a user can RSVP to
  multiple events. A single field can't represent this.
```

### Why ADRs Matter for Agents

When an agent encounters the `EventRsvp` model and considers refactoring it to an implicit relation (simpler code), ADR-001 explains *why* the explicit approach was chosen. Without this record, an agent might "simplify" the schema and break duplicate prevention.

ADRs are **immutable context** — they persist the reasoning behind decisions that code alone cannot convey.

---

## 4. Runbook: Handling Booking Conflicts

```markdown
# Runbook: Handling Booking Conflicts

**Feature:** Campus Facility Access Booking
**Severity:** High (data integrity)
**Owner:** Feature lead / on-call developer
**Last updated:** 2026-03-26

---

## Trigger Conditions

This runbook applies when:
- A user reports they cannot book an available-looking time slot
- Two bookings exist for the same facility + time slot (double-booking)
- A booking shows status CONFIRMED but facility calendar shows conflict
- The Validation Agent in the orchestration pipeline returns `time_slot: failed`
  but no visible conflict exists in the UI

---

## Diagnostic Steps

### Step 1: Identify the conflict

```sql
-- Find all active bookings for the facility on the given date
SELECT id, userId, date, startTime, endTime, status, createdAt
FROM Booking
WHERE facilityId = '<facility-id>'
  AND date = '<date>'
  AND status != 'CANCELLED'
ORDER BY startTime;
```

**What to look for:**
- Overlapping `startTime`/`endTime` ranges
- Multiple CONFIRMED bookings in the same slot
- PENDING bookings that were never resolved

### Step 2: Check for race condition

```sql
-- Compare creation timestamps of conflicting bookings
SELECT id, userId, startTime, endTime, createdAt
FROM Booking
WHERE facilityId = '<facility-id>'
  AND date = '<date>'
  AND startTime < '<end-time>'
  AND endTime > '<start-time>'
  AND status != 'CANCELLED'
ORDER BY createdAt;
```

**If two bookings were created within 1 second of each other:**
This is a race condition. The time slot conflict check and booking creation
are not wrapped in a transaction. See Resolution Option B.

### Step 3: Verify facility availability

```sql
SELECT id, name, available, pricePerHour
FROM Facility
WHERE id = '<facility-id>';
```

**If `available = false`:** The facility was marked unavailable after bookings
were created. This is not a conflict — it's a status change.

---

## Resolution Procedures

### Option A: Cancel the later booking (most common)

If two bookings overlap and one was created later:

1. Identify the later booking by `createdAt`
2. Update its status to CANCELLED
3. Notify the affected user with an apology and suggestion to rebook
4. Log the incident for trust score review (do NOT penalize the user)

```typescript
await prisma.booking.update({
  where: { id: laterBooking.id },
  data: { status: "CANCELLED" },
});
```

### Option B: Add transaction guard (root cause fix)

If the conflict was caused by a race condition, wrap the validation + creation
in a serialized transaction:

```typescript
await prisma.$transaction(async (tx) => {
  // Check for conflicts inside the transaction
  const conflict = await tx.booking.findFirst({
    where: {
      facilityId,
      date: bookingDate,
      startTime: { lte: endTime },
      endTime: { gte: startTime },
      status: { not: "CANCELLED" },
    },
  });

  if (conflict) throw new Error("Time slot conflict");

  // Create booking only if no conflict
  return tx.booking.create({ data: { ... } });
});
```

### Option C: Escalate to admin

If the conflict cannot be resolved automatically:

1. Flag both bookings in admin dashboard
2. Contact both users
3. Offer the earlier booker priority
4. Offer the later booker an alternative slot or facility

---

## Escalation Path

| Level | Who | When |
|-------|-----|------|
| L1 | Automated (Validation Agent) | Conflict detected during booking flow |
| L2 | Feature developer | Conflict found in production data |
| L3 | Project lead / admin | User dispute or repeated conflicts |

---

## Prevention Checklist

- [ ] Booking creation uses Prisma `$transaction` with conflict check inside
- [ ] API route returns 409 with clear message on conflict
- [ ] UI disables already-booked time slots before user can select
- [ ] Integration test covers concurrent booking scenario
```

### Why This Format Matters for Agents

Each section has a **predictable heading** (`Trigger Conditions`, `Diagnostic Steps`, `Resolution Procedures`, `Escalation Path`). An agent searching for "how to resolve a booking conflict" can jump directly to `Resolution Procedures` without reading the entire document.

The SQL queries and code blocks are **copy-paste ready** — an agent can extract them and execute them directly, substituting the placeholder values.

---

## 5. Retrieval-Ready Manifest Schema

### Purpose

`docs/manifest.json` is a machine-readable index of all project documentation. When an agent needs to find relevant context for a task, it queries the manifest instead of scanning every file.

### Schema Definition

```typescript
// Type definition for docs/manifest.json
interface DocumentManifest {
  version: string;                    // Schema version ("1.0")
  project: string;                    // "NomadBridge"
  generated_at: string;               // ISO 8601 timestamp
  documents: DocumentEntry[];
}

interface DocumentEntry {
  path: string;                       // Relative path from project root
  title: string;                      // Human-readable title
  type: DocType;                      // Document category
  audience: Audience;                 // Who consumes this
  features: string[];                 // Related features
  entities: string[];                 // Prisma models referenced
  owner: string;                      // Responsible person/role
  freshness: FreshnessPolicy;         // How often should this be updated
  last_updated: string;               // ISO 8601 date
  chunk_hint: ChunkHint;             // How to split for retrieval
  summary: string;                    // One-line description for search
  depends_on: string[];               // Other docs this references
}

type DocType =
  | "spec"            // Feature specification
  | "adr"             // Architecture decision record
  | "runbook"         // Operational procedure
  | "config"          // Project configuration / rules
  | "reference"       // Knowledge base / entity reference
  | "schema"          // Database schema
  | "utility"         // Shared code
  | "narrative";      // Human-oriented explanation

type Audience =
  | "agent"           // Primarily for AI consumption
  | "human"           // Primarily for human reading
  | "both";           // Useful for both

type FreshnessPolicy =
  | "on_change"       // Update whenever the referenced code changes
  | "on_sprint"       // Review every sprint / iteration
  | "on_incident"     // Update after operational incidents
  | "immutable"       // Never edit (ADRs, homework snapshots)
  | "on_upgrade";     // Update when dependencies change

interface ChunkHint {
  strategy: "by_heading" | "by_section" | "whole_file" | "by_function";
  max_tokens?: number;                // Suggested max chunk size
  split_at?: string;                  // Heading level or delimiter to split at
}
```

### Example Manifest

```json
{
  "version": "1.0",
  "project": "NomadBridge",
  "generated_at": "2026-03-26T12:00:00Z",
  "documents": [
    {
      "path": "CLAUDE.md",
      "title": "Agent Instructions — NomadBridge",
      "type": "config",
      "audience": "agent",
      "features": ["all"],
      "entities": ["User", "Event", "Facility", "Booking", "LectureOpportunity", "ForumPost"],
      "owner": "lead-developer",
      "freshness": "on_sprint",
      "last_updated": "2026-03-26",
      "chunk_hint": {
        "strategy": "by_heading",
        "max_tokens": 500,
        "split_at": "##"
      },
      "summary": "Project conventions, stack, git rules, API patterns, and definition of done",
      "depends_on": ["prisma/schema.prisma", "docs/knowledge-base.md"]
    },
    {
      "path": "docs/specs/event-discovery-rsvp.md",
      "title": "Spec: Event Discovery & RSVP",
      "type": "spec",
      "audience": "agent",
      "features": ["event-rsvp"],
      "entities": ["Event", "EventRsvp", "User"],
      "owner": "feature-lead",
      "freshness": "on_change",
      "last_updated": "2026-03-25",
      "chunk_hint": {
        "strategy": "by_heading",
        "max_tokens": 800,
        "split_at": "##"
      },
      "summary": "Event listing feed, RSVP with capacity enforcement, waitlist, QR codes, edge cases",
      "depends_on": ["prisma/schema.prisma"]
    },
    {
      "path": "docs/runbooks/booking-conflicts.md",
      "title": "Runbook: Handling Booking Conflicts",
      "type": "runbook",
      "audience": "agent",
      "features": ["facility-booking"],
      "entities": ["Booking", "Facility"],
      "owner": "on-call",
      "freshness": "on_incident",
      "last_updated": "2026-03-26",
      "chunk_hint": {
        "strategy": "by_section",
        "max_tokens": 600,
        "split_at": "## "
      },
      "summary": "Diagnose and resolve double-booking conflicts: SQL queries, resolution steps, escalation",
      "depends_on": ["docs/specs/facility-booking.md", "prisma/schema.prisma"]
    },
    {
      "path": "docs/adrs/001-explicit-rsvp-join.md",
      "title": "ADR-001: Explicit EventRsvp Join Table",
      "type": "adr",
      "audience": "both",
      "features": ["event-rsvp"],
      "entities": ["EventRsvp", "Event", "User"],
      "owner": "lead-developer",
      "freshness": "immutable",
      "last_updated": "2026-03-25",
      "chunk_hint": {
        "strategy": "whole_file",
        "max_tokens": 1200
      },
      "summary": "Why we use explicit EventRsvp model instead of Prisma implicit many-to-many",
      "depends_on": ["prisma/schema.prisma"]
    },
    {
      "path": "prisma/schema.prisma",
      "title": "Database Schema",
      "type": "schema",
      "audience": "agent",
      "features": ["all"],
      "entities": ["User", "Event", "EventRsvp", "Facility", "Booking", "LectureOpportunity", "ForumPost"],
      "owner": "lead-developer",
      "freshness": "on_change",
      "last_updated": "2026-03-25",
      "chunk_hint": {
        "strategy": "by_section",
        "max_tokens": 400,
        "split_at": "model "
      },
      "summary": "All Prisma models, enums, and relationships for NomadBridge",
      "depends_on": []
    }
  ]
}
```

### How an Agent Uses the Manifest

**Query:** "I need to implement RSVP cancellation"

1. Agent reads `manifest.json`
2. Filters by `features` containing `"event-rsvp"`
3. Ranks by `type`: spec first, then runbook, then ADR
4. Retrieves chunks from the top-ranked documents using `chunk_hint`
5. Has full context without reading every file in the project

**Query:** "There's a booking conflict in production"

1. Agent filters by `type: "runbook"` and `features: ["facility-booking"]`
2. Gets `docs/runbooks/booking-conflicts.md`
3. Jumps to `Diagnostic Steps` section (chunked by heading)
4. Executes the SQL queries directly

---

## 6. Documentation Release-Gate Checklist

This checklist must pass before any feature PR is merged. It ensures documentation stays in sync with code.

### Pre-Merge Documentation Checklist

```markdown
## Documentation Release Gate

### Required for ALL PRs
- [ ] **Commit messages follow format:** `<type>: <short description>`
- [ ] **No secrets in committed files:** .env values not hardcoded

### Required for FEATURE PRs
- [ ] **Spec exists:** `docs/specs/<feature>.md` with acceptance criteria and edge cases
- [ ] **CLAUDE.md updated:** If new patterns, conventions, or entities were introduced
- [ ] **Manifest entry added:** `docs/manifest.json` has an entry for any new document
- [ ] **Entity reference current:** If Prisma schema changed, CLAUDE.md Entity Reference
      section reflects the change

### Required for NON-OBVIOUS DECISIONS
- [ ] **ADR written:** `docs/adrs/NNN-<title>.md` explaining context, decision,
      and consequences
- [ ] **ADR index updated:** `docs/adrs/index.md` has a row for the new ADR

### Required for OPERATIONAL CHANGES
- [ ] **Runbook exists or updated:** If the change affects how the system is operated,
      diagnosed, or recovered, `docs/runbooks/<topic>.md` must reflect it
- [ ] **Failure scenario documented:** At minimum, "what happens if this fails and
      how do we recover?"

### Required for SCHEMA CHANGES
- [ ] **Migration tested:** `npx prisma db push` succeeds
- [ ] **Seed data updated:** If new models need test data
- [ ] **Entity Reference updated:** CLAUDE.md reflects new/changed models

### Ownership
- [ ] **Owner assigned:** Every new document has an `owner` field in the manifest
- [ ] **Freshness policy set:** Every new document has a `freshness` policy
```

### Why a Release Gate?

Documentation debt compounds faster than technical debt in agentic projects. When an agent works from stale docs:

1. **Stale spec → wrong implementation.** The agent builds what the spec says, not what the code needs. Without a gate ensuring specs are updated, the spec and code drift apart silently.

2. **Missing ADR → reverted decisions.** An agent sees "simpler" code and refactors it, undoing a deliberate design choice. The ADR would have prevented this — but only if it exists.

3. **No runbook → longer incidents.** When something breaks at 2 AM, the developer (or agent) troubleshooting has no diagnostic steps. They reverse-engineer the fix from code, taking 10x longer.

4. **Stale manifest → retrieval misses.** The agent queries the manifest for relevant docs, but the new runbook isn't listed. It never finds it. The information exists but is invisible.

The release gate makes documentation a **first-class deliverable** — not an afterthought. In agentic development, where AI assistants depend on docs for context, this is the difference between a productive agent and one that hallucinates.

---

## Summary

| Deliverable | Section | Key Concept Demonstrated |
|-------------|---------|------------------------|
| Repository Document Map | §1 | Agent vs. human audience separation, freshness policies, ownership |
| CLAUDE.md Outline | §2 | Agent consumption patterns, structured sections, query-oriented layout |
| ADR Index + Example | §3 | Immutable decision records, preventing agent-driven regressions |
| Runbook Outline | §4 | Predictable headings, copy-paste SQL/code, escalation paths |
| Retrieval Manifest | §5 | Machine-readable index, chunk hints, feature tagging, dependency graph |
| Release-Gate Checklist | §6 | Documentation as first-class deliverable, preventing drift |

### Core Insight

> **Documentation is infrastructure, not decoration.** In traditional development, docs help humans understand code. In agentic development, docs are the **primary interface** between the AI assistant and the project. An agent with bad docs is like a developer with no IDE, no search, and no colleagues to ask — it can still write code, but it will write the *wrong* code confidently. Investing in agent-readable documentation is investing in the quality of every future AI-assisted contribution.
