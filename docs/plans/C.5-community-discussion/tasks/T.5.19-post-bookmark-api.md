# T.5.19: POST /api/forum/[id]/bookmark — Toggle Bookmark API

**Component:** C.5 — Community Discussion Board
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** T.5.01
**Spec References:** FRM-INTERACT-03

## Description
Create the POST endpoint at `app/api/forum/[id]/bookmark/route.ts` that toggles a bookmark for the authenticated user on the specified thread. If a ForumBookmark record exists for this user-thread pair, delete it (unbookmark). If it does not exist, create it (bookmark). Return the new bookmark state so the client can confirm the toggle.

## Acceptance Criteria
- [ ] POST `/api/forum/[id]/bookmark` toggles the bookmark for the current user
- [ ] If not bookmarked, creates a ForumBookmark record and returns `{ bookmarked: true }`
- [ ] If already bookmarked, deletes the ForumBookmark record and returns `{ bookmarked: false }`
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 404 if the thread does not exist
- [ ] Idempotent: rapid double-clicks produce consistent state
- [ ] No request body needed — the toggle is determined by current state

## Files to Create/Modify
- `app/api/forum/[id]/bookmark/route.ts` — New POST handler for bookmark toggle

## Implementation Notes
- Use Prisma `findUnique` on ForumBookmark with the unique constraint `[userId, threadId]` to check current state.
- Use `delete` if the record exists, `create` if it doesn't.
- Alternatively, use a try/catch with `create` and handle the unique constraint violation to `delete` — but the findUnique approach is clearer.
- Verify the thread exists before toggling to return a proper 404.
- This is a simple toggle with no side effects (no trust score changes, no notifications).

## Commit Message
`feat: add POST /api/forum/[id]/bookmark toggle endpoint`
