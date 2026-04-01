# T.5.02: Create Forum Seed Data

**Component:** C.5 — Community Discussion Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** T.5.01
**Spec References:** FRM-FEED-01, FRM-FEED-02, FRM-FEED-03, FRM-FEED-04

## Description
Create seed data for the forum to populate the development database with realistic content. Add 5 threads spread across different categories (General, Tips, Events, Housing, Coworking), 10 replies distributed among those threads, some upvotes and downvotes on both threads and replies, and mark 1 thread as pinned. Use existing seed users as authors. Set varying `lastActivity` timestamps so the feed ordering is testable. Include at least one reply marked as Best Answer.

## Acceptance Criteria
- [ ] 5 ForumPost records created across all 5 categories (General, Tips, Events, Housing, Coworking)
- [ ] 10 ForumReply records distributed across threads (at least 2 threads have multiple replies)
- [ ] At least 5 ForumVote records exist (mix of UP and DOWN, on both threads and replies)
- [ ] 1 thread is marked as `pinned: true`
- [ ] 1 reply is marked as `isBestAnswer: true`
- [ ] `lastActivity` timestamps vary so feed sorting can be verified
- [ ] Seed script runs without errors via `npx prisma db seed`
- [ ] Content is realistic Bangkok nomad community topics (e.g., coworking recommendations, visa tips)

## Files to Create/Modify
- `prisma/seed.ts` — Add forum seed data (threads, replies, votes, bookmarks) to existing seed script

## Implementation Notes
- Follow the existing seed file patterns for creating related records.
- Use `createMany` where possible for efficiency, but note that SQLite with Prisma requires individual `create` calls for records that need relation connects.
- Ensure thread `lastActivity` matches the most recent reply's `createdAt` for each thread.
- Use realistic Bangkok-related content: visa run tips, best coworking spaces, Chula/Thammasat event mentions, housing in Ari/Silom areas.

## Commit Message
`chore: add forum seed data with threads, replies, and votes`
