# T.5.12: POST /api/forum/[id]/replies — Create Reply API

**Component:** C.5 — Community Discussion Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.5.01
**Spec References:** FRM-REPLY-01, FRM-REPLY-02, FRM-REPLY-04

## Description
Create the POST endpoint at `app/api/forum/[id]/replies/route.ts` that allows authenticated users to post a reply to a thread. Validate that the content is at most 5000 characters and that the user is not rate-limited (30 seconds since their last post or reply). On success, create the ForumReply record, update the parent thread's `lastActivity` to the current timestamp, and return the created reply. Optionally trigger a notification to the thread author that a new reply has been posted.

## Acceptance Criteria
- [ ] POST `/api/forum/[id]/replies` creates a new ForumReply and returns it with 201 status
- [ ] Request body requires: `content` (string)
- [ ] Returns 400 if content exceeds 5000 characters
- [ ] Returns 400 if content is empty or whitespace-only
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 404 if the thread does not exist
- [ ] Returns 429 if user posted a thread or reply within the last 30 seconds
- [ ] Parent thread's `lastActivity` is updated to the current timestamp
- [ ] Reply is created with `netScore: 0`, `isBestAnswer: false`, `isDeleted: false`
- [ ] Response includes the reply with author info (id, name, trustScore)

## Files to Create/Modify
- `app/api/forum/[id]/replies/route.ts` — New POST handler for creating replies

## Implementation Notes
- Use a Prisma transaction to create the reply and update the thread's `lastActivity` atomically.
- Reuse the same rate limiting logic from T.5.07: check the most recent ForumPost or ForumReply by the user.
- Verify the thread exists and is not deleted before allowing a reply.
- Trim whitespace from content before validation.
- For now, the "notify thread author" can be a TODO comment — actual notification infrastructure can be added later.
- Include the author relation in the returned reply for client-side display.

## Commit Message
`feat: add POST /api/forum/[id]/replies endpoint with rate limiting`
