# T.5.16: POST /api/forum/[id]/vote — Thread Vote API

**Component:** C.5 — Community Discussion Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.5.01
**Spec References:** FRM-INTERACT-01, FRM-INTERACT-04

## Description
Create the POST endpoint at `app/api/forum/[id]/vote/route.ts` that allows authenticated users to vote on a thread. The request body contains a `direction` field with values "up", "down", or "none" (to remove a vote). If the user already has a vote on the thread, update or delete it accordingly. Recompute the thread's net score after each vote change. Enforce that users cannot vote on their own threads. Votes do not affect the author's trust score — they only affect the thread's net score for display and ranking.

## Acceptance Criteria
- [ ] POST `/api/forum/[id]/vote` with `{ direction: "up" }` creates or updates an upvote
- [ ] POST with `{ direction: "down" }` creates or updates a downvote
- [ ] POST with `{ direction: "none" }` removes any existing vote
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 404 if the thread does not exist
- [ ] Returns 403 if user is trying to vote on their own thread
- [ ] Returns 400 if direction is not a valid value
- [ ] Thread's `netScore` is correctly recomputed after the vote (count UP minus count DOWN)
- [ ] Response includes the updated `netScore` and the user's current `direction`
- [ ] No changes to the thread author's `trustScore`

## Files to Create/Modify
- `app/api/forum/[id]/vote/route.ts` — New POST handler for thread voting

## Implementation Notes
- Use Prisma `upsert` on ForumVote with the unique constraint `[userId, targetId, targetType]`.
- For "none" direction, delete the existing vote record if it exists.
- Recompute `netScore` by counting ForumVote records: `count(direction: "UP") - count(direction: "DOWN")` where `targetId` matches and `targetType` is "THREAD".
- Use a Prisma transaction to ensure the vote upsert/delete and netScore update are atomic.
- Verify the thread exists and get the author ID to check for self-voting.
- Return `{ netScore: number, userVote: "UP" | "DOWN" | null }` in the response.

## Commit Message
`feat: add POST /api/forum/[id]/vote endpoint for thread voting`
