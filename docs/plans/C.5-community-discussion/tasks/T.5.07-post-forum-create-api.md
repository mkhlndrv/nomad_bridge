# T.5.07: POST /api/forum — Create Thread API

**Component:** C.5 — Community Discussion Board
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.5.01
**Spec References:** FRM-CREATE-01, FRM-CREATE-02, FRM-CREATE-03, FRM-CREATE-04, FRM-CREATE-05, FRM-CREATE-06

## Description
Create the POST endpoint at `app/api/forum/route.ts` that allows authenticated users to create a new discussion thread. Validate that the title is at most 120 characters, content is at most 5000 characters, and category is a valid ForumCategory value. Implement rate limiting to prevent the same user from posting within 30 seconds of their last thread or reply. On success, create the ForumPost record with `lastActivity` set to the current time and return the created thread.

## Acceptance Criteria
- [ ] POST `/api/forum` creates a new ForumPost and returns it with 201 status
- [ ] Request body requires: `title` (string), `content` (string), `category` (ForumCategory value)
- [ ] Returns 400 if title exceeds 120 characters
- [ ] Returns 400 if content exceeds 5000 characters
- [ ] Returns 400 if category is not a valid ForumCategory enum value
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 429 if user posted a thread or reply within the last 30 seconds
- [ ] Created thread has `lastActivity` set to current timestamp
- [ ] Created thread has `pinned` defaulting to false
- [ ] Thread is immediately queryable via GET /api/forum

## Files to Create/Modify
- `app/api/forum/route.ts` — Add POST handler alongside existing GET handler

## Implementation Notes
- Use the existing auth pattern from other API routes to get the current user.
- For rate limiting, query the most recent ForumPost or ForumReply by the user and check if `createdAt` is within the last 30 seconds.
- Validate the category against the `ForumCategory` enum values: GENERAL, TIPS, EVENTS, HOUSING, COWORKING.
- Set `lastActivity` explicitly to `new Date()` on creation.
- Return the created thread with author info included for immediate display on the client.
- Trim whitespace from title and content before validation.

## Commit Message
`feat: add POST /api/forum endpoint with validation and rate limiting`
