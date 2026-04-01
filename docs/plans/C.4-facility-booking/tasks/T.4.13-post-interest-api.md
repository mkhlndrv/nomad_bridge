# T.4.13: POST /api/booking-requests/[id]/interest API

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 3 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.4.10
**Spec References:** FAC-REQ-04, FAC-REQ-05, FAC-REQ-06, FAC-REQ-07

## Description
Create an API route handler for `POST /api/booking-requests/[id]/interest` that toggles a user's interest on a booking request. If the user has not expressed interest, create a `BookingInterest` record and increment the request's `interestCount`. If the user has already expressed interest, delete the record and decrement the count. After toggling, check whether the updated count meets or exceeds the venue's `interestThreshold` — if so, and the request status is still `OPEN`, automatically transition it to `UNDER_REVIEW` and trigger a notification to the venue manager.

## Acceptance Criteria
- [ ] Route handler exists at `app/api/booking-requests/[id]/interest/route.ts`
- [ ] Accepts POST requests with no body (user identity from session/auth)
- [ ] If user has no existing `BookingInterest` for this request: creates one, increments `interestCount`
- [ ] If user already has a `BookingInterest`: deletes it, decrements `interestCount`
- [ ] Returns `{ interested: boolean, interestCount: number, status: string }` in the response
- [ ] After incrementing, if `interestCount >= facility.interestThreshold` and status is `OPEN`: updates status to `UNDER_REVIEW`
- [ ] Uses a Prisma transaction to ensure count and interest record are atomically consistent
- [ ] Returns 404 if booking request does not exist
- [ ] Returns 400 if booking request status is `APPROVED`, `REJECTED`, or `CANCELLED`
- [ ] Returns 401 if user is not authenticated

## Files to Create/Modify
- `app/api/booking-requests/[id]/interest/route.ts` — POST handler with toggle logic, threshold check, and status transition

## Implementation Notes
- Use `prisma.$transaction()` to wrap the create/delete + count update to avoid race conditions.
- The unique constraint on `[userId, bookingRequestId]` in `BookingInterest` prevents duplicates — use `findUnique` to check existing interest.
- When transitioning to `UNDER_REVIEW`, include the venue manager notification as a placeholder comment (C.6 dependency).
- The requester themselves can also express interest (counts as +1).
- `interestCount` on `BookingRequest` is a denormalized counter for fast reads — keep it in sync.

## Commit Message
`feat: add interest toggle API with threshold check`
