# T.2.08: GET /api/profile/[id] — Public Profile

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** T.2.07
**Spec References:** PRF-DISPLAY-07, PRF-DISPLAY-08, PRF-EDIT-02

## Description
Create the GET `/api/profile/[id]` API route that returns another user's public profile. This endpoint is used when logged-in users view someone else's profile, and by university staff when reviewing RSVP lists or lecture applications. The response must exclude the user's email address for privacy (PRF-EDIT-02 / PRF-DISPLAY-07). It should include the same activity counts as the own-profile endpoint. Return 404 with a clear message if the user ID does not exist. The route should accept the user ID as a dynamic path parameter.

## Acceptance Criteria
- [ ] Route handler at `app/api/profile/[id]/route.ts` responds to GET
- [ ] Returns public profile data with activity counts
- [ ] Email field is excluded from the response
- [ ] Returns 404 with `{ error: "User not found" }` for non-existent IDs
- [ ] Includes `trustScore`, `role`, `bio`, `skills`, `location`, `avatarUrl`, `createdAt`
- [ ] Activity counts included: `eventsAttended`, `lecturesGiven`, `bookingsMade`, `forumPosts`
- [ ] Response shape matches own-profile endpoint (minus email)

## Files to Create/Modify
- `app/api/profile/[id]/route.ts` — Create GET route handler for public profiles

## Implementation Notes
- Use `lib/prisma.ts` for database access.
- Extract the `id` from the route params: `{ params }: { params: { id: string } }`.
- Use Prisma `findUnique` with the same `_count` include pattern from T.2.07.
- Explicitly destructure the user object to omit `email` before returning, or use a select query that excludes it.
- Prefer the destructure approach: `const { email, ...publicProfile } = user` for clarity.
- No auth check needed for this endpoint (profiles are viewable by any logged-in user), but add a `// TODO: Require authentication` comment.

## Commit Message
`feat: add GET /api/profile/[id] public profile endpoint`
