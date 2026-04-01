# T.2.07: GET /api/profile — Current User Profile

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.2.01
**Spec References:** PRF-DISPLAY-01, PRF-DISPLAY-02, PRF-DISPLAY-03, PRF-DISPLAY-04, PRF-DISPLAY-05, PRF-DISPLAY-06, PRF-DISPLAY-09, PRF-TRUST-10

## Description
Create the GET `/api/profile` API route that returns the current authenticated user's full profile data. The response should include all user fields (name, email, bio, role, trustScore, avatarUrl, skills, location, emailVerified, createdAt) plus computed activity counts: events attended (count of EventRsvp records), guest lectures given (count of LectureOpportunity with status COMPLETED), bookings made (count of Booking records), and forum posts written (count of ForumPost records). Since auth is not yet implemented, temporarily use a hardcoded user ID or accept a user ID from a header/query parameter. Return the data in a consistent JSON shape with proper error handling.

## Acceptance Criteria
- [ ] Route handler at `app/api/profile/route.ts` responds to GET
- [ ] Returns full user profile including all model fields
- [ ] Includes computed activity counts: `eventsAttended`, `lecturesGiven`, `bookingsMade`, `forumPosts`
- [ ] Returns 401 if no user identified (placeholder for auth)
- [ ] Returns 404 if user not found in database
- [ ] Response shape is consistent and typed
- [ ] Activity counts match actual database record counts

## Files to Create/Modify
- `app/api/profile/route.ts` — Create GET route handler

## Implementation Notes
- Use `lib/prisma.ts` for database access.
- Use Prisma `include: { _count: { select: { rsvps: true, lectures: true, bookings: true, forumPosts: true } } }` to get counts efficiently in a single query.
- For lectures given, filter count where `status: "COMPLETED"` (may need a separate count query or raw filter).
- Temporary auth: use `X-User-Id` header or first seed user. Add a `// TODO: Replace with real auth` comment.
- Return `NextResponse.json()` with appropriate status codes.
- Follow Next.js App Router API route conventions: export `async function GET(request: Request)`.

## Commit Message
`feat: add GET /api/profile endpoint with activity counts`
