# T.5.17: POST /api/forum/replies/[id]/vote — Reply Vote API

**Component:** C.5 — Community Discussion Board
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.5.16
**Spec References:** FRM-INTERACT-01, FRM-INTERACT-04

## Description
Create the POST endpoint at `app/api/forum/replies/[id]/vote/route.ts` that allows authenticated users to vote on a reply. The behavior mirrors the thread vote endpoint: accept a `direction` of "up", "down", or "none"; create, update, or remove the vote accordingly; recompute the reply's net score; and enforce no self-voting. Votes do not affect the reply author's trust score.

## Acceptance Criteria
- [ ] POST `/api/forum/replies/[id]/vote` with `{ direction: "up" }` creates or updates an upvote
- [ ] POST with `{ direction: "down" }` creates or updates a downvote
- [ ] POST with `{ direction: "none" }` removes any existing vote
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 404 if the reply does not exist
- [ ] Returns 403 if user is trying to vote on their own reply
- [ ] Returns 400 if direction is not a valid value
- [ ] Reply's `netScore` is correctly recomputed after the vote
- [ ] Response includes the updated `netScore` and the user's current `direction`
- [ ] No changes to the reply author's `trustScore`

## Files to Create/Modify
- `app/api/forum/replies/[id]/vote/route.ts` — New POST handler for reply voting

## Implementation Notes
- This follows the same pattern as the thread vote endpoint (T.5.16) but targets ForumReply instead of ForumPost.
- Use `targetType: "REPLY"` in the ForumVote record to distinguish from thread votes.
- Use Prisma `upsert` with the `[userId, targetId, targetType]` unique constraint.
- Recompute `netScore` on ForumReply: `count(direction: "UP") - count(direction: "DOWN")` where `targetId` matches and `targetType` is "REPLY".
- Consider extracting shared voting logic into a helper function used by both thread and reply vote endpoints to avoid code duplication.
- Use a transaction for atomicity of vote change + netScore update.

## Commit Message
`feat: add POST /api/forum/replies/[id]/vote endpoint for reply voting`
