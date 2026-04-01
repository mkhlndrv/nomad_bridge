# T.3.02: Create Collaboration Seed Data

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** T.3.01
**Spec References:** COL-BOARD-01, COL-BOARD-02, COL-POST-01

## Description
Create seed data for the collaboration board that covers all 5 collaboration types and both posting directions (university requests and nomad offers). Add at least 8-10 collaboration opportunities: 2 university requests (LECTURE, RESEARCH), 2 nomad offers (WORKSHOP, MENTORSHIP), and 1-2 of each remaining type. Include a variety of statuses (OPEN, IN_DISCUSSION, MATCHED, COMPLETED) to test badge rendering. Seed at least 2 CollaborationApplication records (one APPLY, one INVITE) and 1 CollaborationFeedback record on a COMPLETED collaboration. Use existing seeded users or create 2-3 additional users (1 UNIVERSITY, 2 NOMAD) if needed.

## Acceptance Criteria
- [ ] At least 8 CollaborationOpportunity records seeded across all 5 types
- [ ] Both university requests and nomad offers represented
- [ ] At least one record per status: OPEN, IN_DISCUSSION, MATCHED, COMPLETED
- [ ] At least 2 CollaborationApplication records (1 APPLY, 1 INVITE)
- [ ] At least 1 CollaborationFeedback record with rating and comment
- [ ] Lecture-specific fields populated on LECTURE type records
- [ ] Research-specific fields populated on RESEARCH type records
- [ ] Mentorship-specific fields populated on MENTORSHIP type records
- [ ] `npx prisma db seed` runs without errors

## Files to Create/Modify
- `prisma/seed.ts` — Add collaboration seed data section with CollaborationOpportunity, CollaborationApplication, and CollaborationFeedback records

## Implementation Notes
- Follow the existing seed.ts pattern: use `prisma.collaborationOpportunity.upsert()` with deterministic IDs for idempotency.
- Store dates in UTC. Use future dates for OPEN/IN_DISCUSSION items and past dates for COMPLETED items.
- Tags should be comma-separated strings (e.g., "typescript,react,nextjs") consistent with Event.tags pattern.
- Include realistic Bangkok-relevant topics: Thai language teaching, digital marketing workshops, AI research, startup mentorship.
- Ensure seeded users have appropriate roles (UNIVERSITY for requests, NOMAD for offers).

## Commit Message
`chore: add collaboration seed data for all 5 types`
