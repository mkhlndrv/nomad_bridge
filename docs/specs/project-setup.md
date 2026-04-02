# Project Setup & Infrastructure

> Last updated: 2026-04-01

## Intent

Define the seed data, test configuration, and test infrastructure required to support development and automated testing across all NomadBridge features. This spec ensures every developer starts with a consistent, realistic dataset and a working test harness from day one.

---

## Seed Data

All seed data is managed in `prisma/seed.ts` and loaded via `npx prisma db seed`. IDs use descriptive cuid-like strings for readability in tests and logs.

### Seed Users (5 users)

| Name | ID | Email | Role | Trust Score | Email Verified | Verification Level | Skills | Location |
|------|----|-------|------|-------------|----------------|-------------------|--------|----------|
| Alice | `user-alice` | alice@nomad.dev | NOMAD | 25 | true | EMAIL_VERIFIED | "Machine Learning, UX Design, Public Speaking" | Bangkok |
| Bob | `user-bob` | bob@nomad.dev | NOMAD | 5 | true | EMAIL_VERIFIED | "Photography, Travel Writing" | Chiang Mai |
| Carol | `user-carol` | carol@chula.edu | UNIVERSITY | 0 | true | EMAIL_VERIFIED | null | null |
| Dave | `user-dave` | dave@admin.nomadbridge.io | ADMIN | 0 | true | EMAIL_VERIFIED | null | null |
| Eve | `user-eve` | eve@kmutt.ac.th | VENUE_MANAGER | 0 | true | EMAIL_VERIFIED | null | null |

**Notes:**
- Alice has trustScore 25, close to the Community Verified threshold at 30.
- Bob is a newer nomad with trustScore 5.
- All users are email-verified for testing convenience.

### Seed Events (4 events)

| # | Title | Date | Creator | University | Category | Capacity | RSVP Count | Is Community | Status |
|---|-------|------|---------|------------|----------|----------|------------|--------------|--------|
| 1 | "AI in Southeast Asia" | Upcoming | Carol | Chulalongkorn | ACADEMIC | 30 | 12 | false | PUBLISHED |
| 2 | "Bangkok Coworking Tour" | 2026-03-15 (past) | Alice | N/A | SOCIAL | 20 | 20 | true | PAST |
| 3 | "Web Dev Workshop" | Upcoming | Carol | KMUTT | WORKSHOP | 50 | 3 | false | PUBLISHED |
| 4 | "Networking Night" | Upcoming | Alice | N/A | NETWORKING | 15 | 15 | true | PUBLISHED |

**Notes:**
- Event 2 is in the past and fully booked — useful for testing post-event flows (materials, recordings).
- Event 4 is at capacity — useful for waitlist testing.

### Seed EventRsvps

| User | Event | Status |
|------|-------|--------|
| Alice | Event 1 — "AI in Southeast Asia" | CONFIRMED |
| Bob | Event 1 — "AI in Southeast Asia" | CONFIRMED |
| Alice | Event 4 — "Networking Night" | CONFIRMED |
| Bob | Event 4 — "Networking Night" | WAITLISTED |

**Notes:**
- Bob's WAITLISTED RSVP on Event 4 supports testing waitlist promotion (FIFO).

### Seed Facilities (3 facilities)

| # | Name | University | Type | Manager | Price Per Hour | Capacity | Interest Threshold | Operating Hours |
|---|------|------------|------|---------|----------------|----------|--------------------|-----------------|
| 1 | "Digital Learning Hub" | Chulalongkorn | COWORKING | Eve | 0 (free) | 30 | 5 | 08:00-20:00 Mon-Fri |
| 2 | "Innovation Lab" | KMUTT | LAB | Eve | 200 | 15 | 3 | 09:00-18:00 Mon-Sat |
| 3 | "Campus Library Study Room" | Thammasat | LIBRARY | Eve | 0 (free) | 10 | 5 | 08:00-21:00 Mon-Sun |

### Seed BookingRequests (2 requests)

| # | Requester | Facility | Purpose | Status | Interest Count | Date | Notes |
|---|-----------|----------|---------|--------|----------------|------|-------|
| 1 | Alice | "Digital Learning Hub" | "ML Study Group" | OPEN | 3 | Upcoming | Awaiting interest threshold |
| 2 | Bob | "Innovation Lab" | "Photography Workshop Space" | APPROVED | — | Upcoming | Has a corresponding Booking record (status CONFIRMED, qrCode generated) |

### Seed BookingInterests

| User | Booking Request | Notes |
|------|-----------------|-------|
| Bob | Request 1 — Alice's "ML Study Group" | Contributing toward interest threshold |

### Seed CollaborationOpportunities (2)

| # | Creator | Role | Type | Title | Status |
|---|---------|------|------|-------|--------|
| 1 | Carol | UNIVERSITY | GUEST_LECTURE | "AI Ethics" | OPEN |
| 2 | Alice | NOMAD | WORKSHOP | "Intro to Machine Learning" | OPEN |

### Seed ForumPosts (3 threads)

| # | Title | Category | Author | Upvotes | Downvotes | Net Score | Replies | Pinned |
|---|-------|----------|--------|---------|-----------|-----------|---------|--------|
| 1 | "Best coworking spaces near Chula?" | COWORKING | Alice | 5 | 1 | 4 | 2 | false |
| 2 | "Tips for getting around Bangkok" | TIPS | Bob | 3 | 0 | 3 | 1 | false |
| 3 | "Welcome to NomadBridge!" | GENERAL | Dave | 10 | 0 | 10 | 0 | true |

### Seed ForumReplies

| Thread | Author | Content | Upvotes | Is Best Answer |
|--------|--------|---------|---------|----------------|
| Thread 1 | Bob | "I recommend Homework BKK, great wifi" | 2 | false |
| Thread 1 | Carol | "The Chula library coworking area is free for registered users" | 3 | true |
| Thread 2 | Alice | "BTS is your best friend, get a Rabbit card" | 1 | false |

### Seed Notifications (3)

| # | User | Type | Related Event | Read |
|---|------|------|---------------|------|
| 1 | Alice | RSVP_CONFIRMATION | Event 1 — "AI in Southeast Asia" | true |
| 2 | Alice | EVENT_REMINDER | Event 1 — "AI in Southeast Asia" | false |
| 3 | Bob | RSVP_CONFIRMATION | Event 1 — "AI in Southeast Asia" | false |

### Seed NotificationPreferences (5 -- one per user)

All users receive default preferences across all 5 notification categories:

| Setting | Default Value |
|---------|---------------|
| email | true |
| line | true |
| telegram | true |

### Seed Recordings (2)

| # | Title | Event | Source | Visibility | View Count |
|---|-------|-------|--------|------------|------------|
| 1 | "AI in Southeast Asia -- Full Recording" | Event 2 (past) | TLDV | PUBLIC | 42 |
| 2 | "Coworking Tour Highlights" | Event 2 (past) | YOUTUBE | ATTENDEES_ONLY | 8 |

### Seed TrustScoreLogs (sample)

**Alice** (current score: 25):

| Delta | Reason | Score Change |
|-------|--------|--------------|
| +5 | "Event attendance: AI in Southeast Asia" | 5 → 10 |
| +10 | "Completed guest lecture" | 10 → 20 |
| +5 | "Event attendance: Web Dev Workshop" | 20 → 25 |

**Bob** (current score: 5):

| Delta | Reason | Score Change |
|-------|--------|--------------|
| +5 | "Event attendance: AI in Southeast Asia" | 0 → 5 |

---

## Vitest Configuration

### Required devDependencies

```
vitest (latest)
@testing-library/react (for component tests, if needed later)
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['lib/**', 'app/api/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

### package.json scripts to add

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

### Prisma seed configuration

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "npx tsx prisma/seed.ts"
  }
}
```

---

## Test Directory Structure

```
__tests__/
├── unit/
│   ├── trust-score.test.ts       — adjustTrustScore, calculateVerificationLevel
│   ├── utils.test.ts             — formatDateBangkok, formatTimeBangkok, parseTags
│   ├── rsvp-logic.test.ts        — capacity checks, waitlist promotion (FIFO)
│   └── forum-logic.test.ts       — net score, collapse threshold, edit window
├── integration/
│   ├── events-api.test.ts        — GET/POST /api/events, GET/PATCH /api/events/[id]
│   ├── rsvp-api.test.ts          — POST/DELETE /api/events/[id]/rsvp
│   ├── profile-api.test.ts       — GET/PATCH /api/profile, POST /api/profile/avatar
│   ├── forum-api.test.ts         — CRUD /api/forum, /api/forum/[id]/vote, /replies
│   ├── booking-api.test.ts       — /api/booking-requests, /api/facilities
│   ├── collaboration-api.test.ts — /api/collaborations CRUD + apply/respond
│   ├── notifications-api.test.ts — /api/notifications, preferences, mark-read
│   └── recordings-api.test.ts    — /api/recordings CRUD
└── helpers/
    ├── prisma.ts                 — test Prisma client (uses same SQLite, reset between tests)
    ├── request.ts                — createMockRequest(path, options) with x-user-id header
    └── seed.ts                   — seedTestData() — inserts seed users + minimal test data
```

---

## Test Helpers

### `__tests__/helpers/prisma.ts`

- Import the same Prisma client from `@/lib/prisma`.
- Export a `resetDatabase()` function that deletes all records from all tables in reverse dependency order.
- Call `resetDatabase()` in `beforeEach` for integration tests.

### `__tests__/helpers/request.ts`

- Export `createMockRequest(path: string, options: { method?, body?, userId?, headers? })`.
- Returns a standard `Request` object with the `x-user-id` header set.
- Default userId: `'user-alice'` (so tests run as Alice by default).

### `__tests__/helpers/seed.ts`

- Export `seedTestData()` that creates the 5 seed users with their IDs.
- Export `seedFullData()` that creates users + events + facilities + forum posts (for integration tests that need more data).
- Use the `upsert` pattern to be idempotent.

---

## Definition of Done

- Seed script runs without errors via `npx prisma db seed`.
- All 5 seed users, 4 events, 3 facilities, and related data are created.
- `npx vitest run` executes with the configured test directory.
- Test helpers (`resetDatabase`, `createMockRequest`, `seedTestData`) work correctly in both unit and integration tests.
- Coverage report includes `lib/**` and `app/api/**`.
