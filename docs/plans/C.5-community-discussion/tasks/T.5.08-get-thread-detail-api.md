# T.5.08: GET /api/forum/[id] — Thread Detail API

**Component:** C.5 — Community Discussion Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.5.06
**Spec References:** FRM-REPLY-01, FRM-REPLY-03, FRM-REPLY-05, FRM-INTERACT-04

## Description
Create the GET endpoint at `app/api/forum/[id]/route.ts` that returns a single thread with its paginated replies. The response includes the full thread data (title, content, category, author with trust score, net score, pinned status, timestamps) and a paginated list of replies (20 per page) sorted chronologically. If the requesting user is authenticated, include their vote direction and bookmark status for the thread and their vote direction for each reply. Best Answer replies should be included with their `isBestAnswer` flag.

## Acceptance Criteria
- [ ] GET `/api/forum/[id]` returns the thread with full details
- [ ] Thread includes: id, title, content, category, pinned, netScore, lastActivity, createdAt, isDeleted, author (id, name, trustScore)
- [ ] Replies are included as a paginated array (20 per page) sorted by `createdAt` asc
- [ ] Each reply includes: id, content, netScore, isBestAnswer, isDeleted, createdAt, author (id, name, trustScore)
- [ ] `?page=2` returns the second page of replies
- [ ] Response includes reply pagination metadata: totalReplies, page, pageSize, totalPages
- [ ] If authenticated, thread includes `userVote` ("UP", "DOWN", or null) and `isBookmarked` (boolean)
- [ ] If authenticated, each reply includes `userVote` ("UP", "DOWN", or null)
- [ ] Returns 404 if thread does not exist
- [ ] Deleted replies show content as "[removed]" but are still included in the list

## Files to Create/Modify
- `app/api/forum/[id]/route.ts` — New GET handler for thread detail with paginated replies

## Implementation Notes
- Use Prisma `findUnique` for the thread with `include` for author.
- Query replies separately with `findMany` using `where: { threadId: id }`, `orderBy: { createdAt: 'asc' }`, and pagination.
- For user vote/bookmark status, conditionally query ForumVote and ForumBookmark if a user session exists.
- For deleted replies, return the reply record but replace `content` with "[removed]" in the response.
- Use a separate `count` query for total reply count to calculate pagination metadata.

## Commit Message
`feat: add GET /api/forum/[id] endpoint with paginated replies`
