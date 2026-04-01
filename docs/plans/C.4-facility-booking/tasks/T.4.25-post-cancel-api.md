# T.4.25: POST /api/booking-requests/[id]/cancel API

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 5 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.4.10
**Spec References:** FAC-MYBK-04, FAC-MYBK-05

## Description
Create an API route handler for `POST /api/booking-requests/[id]/cancel` that allows a requester to cancel their booking request. The cancellation policy depends on the request's current status: cancelling before approval (OPEN or UNDER_REVIEW) incurs no trust score penalty, while cancelling after approval (APPROVED) applies a -2 trust score penalty. Only the original requester can cancel their own request. If the request was approved and a `Booking` record exists, mark it as cancelled as well.

## Acceptance Criteria
- [ ] Route handler exists at `app/api/booking-requests/[id]/cancel/route.ts`
- [ ] Accepts POST with no body required
- [ ] Validates that the authenticated user is the requester of the booking request — returns 403 if not
- [ ] Returns 400 if the request status is already `CANCELLED` or `REJECTED`
- [ ] Returns 404 if the booking request does not exist
- [ ] If status is `OPEN` or `UNDER_REVIEW`: sets status to `CANCELLED`, no trust score change
- [ ] If status is `APPROVED`: sets status to `CANCELLED`, applies -2 trust score penalty to the requester
- [ ] If an associated `Booking` record exists (for approved requests): marks it as cancelled
- [ ] Uses a Prisma transaction to ensure status update and trust score change are atomic
- [ ] Returns `{ status: "CANCELLED", trustPenalty: number }` in the response (penalty is 0 or -2)
- [ ] Returns 401 if user is not authenticated

## Files to Create/Modify
- `app/api/booking-requests/[id]/cancel/route.ts` — POST handler with cancellation logic and conditional trust penalty

## Implementation Notes
- Trust score update: `prisma.user.update({ where: { id }, data: { trustScore: { decrement: 2 } } })` — only for APPROVED cancellations.
- The -2 penalty applies regardless of timing after approval (the spec mentions "24h+ before event" but for simplicity, apply it to any post-approval cancellation).
- If a `Booking` record exists, update its status field as well within the same transaction.
- Notification placeholder: notify the venue manager that a confirmed booking was cancelled (C.6 dependency).
- Consider also notifying interested users that the event has been cancelled.

## Commit Message
`feat: add booking request cancel API with trust penalty`
