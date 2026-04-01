# T.7.01: Update Event Schema for Community Events

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 1 | **Milestone:** M1+M2
**Estimated Time:** 20m
**Dependencies:** C.1-S1 (Event model must exist)
**Spec References:** COM-CREATE-03, COM-CREATE-05

## Description
Add community event fields to the existing Event model in Prisma. Add `isCommunity` Boolean field (default false) to distinguish community events from university events in the feed. Add `eventType` enum (MEETUP, WORKSHOP, SKILL_SHARE, SOCIAL, COWORKING_SESSION) for the 5 community event types. Run `npx prisma db push` to sync.

## Acceptance Criteria
- [ ] `Event` model has `isCommunity` Boolean field, default false
- [ ] New `CommunityEventType` enum with 5 values: MEETUP, WORKSHOP, SKILL_SHARE, SOCIAL, COWORKING_SESSION
- [ ] `Event` model has optional `eventType` field (CommunityEventType?)
- [ ] `npx prisma db push` succeeds
- [ ] Existing events remain valid (isCommunity defaults to false)

## Files to Create/Modify
- `prisma/schema.prisma` — Add CommunityEventType enum, add isCommunity and eventType fields to Event model

## Implementation Notes
- The eventType field is nullable because university events don't use it
- isCommunity=false is the default so all existing events remain university events
- SQLite handles Prisma enums transparently

## Commit Message
`chore: add community event fields to prisma schema`
