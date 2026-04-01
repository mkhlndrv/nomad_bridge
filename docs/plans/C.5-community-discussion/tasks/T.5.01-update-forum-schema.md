# T.5.01: Update Prisma Schema for Forum

**Component:** C.5 — Community Discussion Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 30m
**Dependencies:** None
**Spec References:** FRM-FEED-02, FRM-FEED-03, FRM-REPLY-01, FRM-INTERACT-01, FRM-INTERACT-02, FRM-INTERACT-03, FRM-INTERACT-04

## Description
Update the existing `ForumPost` model to add `pinned` (Boolean, default false), `lastActivity` (DateTime, default now), and `isDeleted` (Boolean, default false) fields. Create a new `ForumReply` model with fields: content (String), authorId (relation to User), threadId (relation to ForumPost), netScore (Int, default 0), isBestAnswer (Boolean, default false), isDeleted (Boolean, default false), createdAt, and updatedAt. Create a `ForumVote` model with userId, targetId, targetType (String: "THREAD" or "REPLY"), and direction (String: "UP" or "DOWN"), with a unique constraint on [userId, targetId, targetType]. Create a `ForumBookmark` model with userId and threadId, with a unique constraint on [userId, threadId]. Add all necessary relation fields on User and ForumPost. Run `npx prisma db push` to apply.

## Acceptance Criteria
- [ ] `ForumPost` model has new fields: `pinned` (Boolean, default false), `lastActivity` (DateTime), `isDeleted` (Boolean, default false)
- [ ] `ForumReply` model exists with content, authorId, threadId, netScore, isBestAnswer, isDeleted, createdAt, updatedAt
- [ ] `ForumVote` model exists with userId, targetId, targetType, direction and `@@unique([userId, targetId, targetType])`
- [ ] `ForumBookmark` model exists with userId, threadId and `@@unique([userId, threadId])`
- [ ] User model has relation fields for forumReplies, forumVotes, forumBookmarks
- [ ] ForumPost model has relation fields for replies, votes, bookmarks
- [ ] `npx prisma db push` succeeds without errors
- [ ] Prisma Client regenerated successfully

## Files to Create/Modify
- `prisma/schema.prisma` — Add fields to ForumPost, create ForumReply, ForumVote, ForumBookmark models, add User relation fields

## Implementation Notes
- SQLite does not support native enums; use String type for `targetType` ("THREAD" or "REPLY") and `direction` ("UP" or "DOWN") with validation at the API layer.
- `lastActivity` on ForumPost should default to `now()` and be updated whenever a reply is created.
- Keep the existing ForumPost fields (title, content, category, createdAt, updatedAt, userId) intact.
- The `netScore` field on ForumReply is a denormalized count (upvotes minus downvotes) for efficient sorting and display.
- Consider adding a `netScore` field to ForumPost as well for thread voting.

## Commit Message
`chore: update forum schema with replies, votes, and bookmarks models`
