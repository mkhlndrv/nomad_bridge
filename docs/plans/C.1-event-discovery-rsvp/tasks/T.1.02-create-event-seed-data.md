# T.1.02: Create Event Seed Data

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.1.01
**Spec References:** EVT-FEED-01, EVT-FEED-02, EVT-FEED-05, EVT-FEED-07

## Description
Create a Prisma seed script that populates the database with realistic Bangkok university event data. The seed should create at least 2 users (one UNIVERSITY role, one NOMAD role), 3 universities, and 8-10 events spanning multiple categories (WORKSHOP, SEMINAR, SOCIAL, SPORTS, CULTURAL). Include a mix of future events with varying capacity fill levels (empty, half-full, nearly full, completely full) and at least one past event. This data enables mockup development in T.1.03-T.1.06 without needing real API calls.

## Acceptance Criteria
- [ ] Seed script creates at least 2 users with different roles
- [ ] Seed script creates 8-10 events across at least 3 different universities (e.g., Chulalongkorn, Thammasat, Mahidol)
- [ ] Events cover all EventCategory values: WORKSHOP, SEMINAR, SOCIAL, SPORTS, CULTURAL
- [ ] Events have varying rsvpCount/capacity ratios: 0%, ~50%, ~80%, 100%
- [ ] At least one event is in the past (for testing past event states)
- [ ] At least one event is at full capacity (rsvpCount === capacity)
- [ ] All dates are stored in UTC
- [ ] Tags field contains realistic comma-separated values (e.g., "AI,Machine Learning,Python")
- [ ] `npx prisma db seed` runs without errors
- [ ] Seed is idempotent (uses upsert or deleteMany before insert)

## Files to Create/Modify
- `prisma/seed.ts` — Create or extend the seed script with event data
- `package.json` — Add/verify `prisma.seed` configuration pointing to `ts-node prisma/seed.ts`

## Implementation Notes
- Use `prisma.event.upsert()` with a stable ID or use `prisma.event.deleteMany()` at the start for idempotency.
- Bangkok universities to use: "Chulalongkorn University", "Thammasat University", "Mahidol University".
- Store dates in UTC. For a Bangkok event at 14:00 local (UTC+7), store as 07:00 UTC.
- Example events: "AI Workshop at Chula", "Thai Cooking Social at Mahidol", "Startup Pitch Seminar at Thammasat".
- Include imageUrl as placeholder strings (e.g., "/images/events/placeholder.jpg") — actual images are not required for mockups.
- Create at least 2 EventRsvp records to test the rsvpCount display.

## Commit Message
`feat: add event seed data for bangkok university events`
