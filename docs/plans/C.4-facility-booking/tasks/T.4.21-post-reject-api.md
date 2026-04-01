# T.4.21: POST /api/booking-requests/[id]/reject API

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.4.10
**Spec References:** FAC-MGR-04, FAC-MGR-06, FAC-MGR-07

## Description
Create an API route handler for `POST /api/booking-requests/[id]/reject` that allows a venue manager to reject a booking request with a reason. Update the request status to `REJECTED`, store the rejection reason and optional alternative date suggestion, and notify the requester with the reason. Only the venue manager of the associated facility can reject requests.

## Acceptance Criteria
- [ ] Route handler exists at `app/api/booking-requests/[id]/reject/route.ts`
- [ ] Accepts POST with body: `{ reason: string, suggestedDate?: string }`
- [ ] Validates `reason` is present and at least 10 characters — returns 400 if not
- [ ] Validates that the authenticated user is the venue manager of the request's facility — returns 403 if not
- [ ] Returns 400 if the request status is not `OPEN` or `UNDER_REVIEW`
- [ ] Returns 404 if the booking request does not exist
- [ ] Updates `BookingRequest` status to `REJECTED`
- [ ] Stores the rejection reason on the request (e.g., `rejectionReason` field)
- [ ] Stores optional `suggestedDate` on the request for the requester to reference
- [ ] Returns the updated booking request with reason and suggested date
- [ ] Notification placeholder: notify requester with rejection reason and suggested alternative (if provided)
- [ ] Returns 401 if user is not authenticated

## Files to Create/Modify
- `app/api/booking-requests/[id]/reject/route.ts` — POST handler with rejection logic, reason storage, and notification trigger

## Implementation Notes
- Simpler than the approve endpoint — no booking creation or QR generation needed.
- The `rejectionReason` and `suggestedDate` fields may need to be added to the `BookingRequest` model if not already present in T.4.01 — check the schema and add if needed.
- Notification integration is a C.6 dependency — add a TODO comment for sending the rejection notification with the reason.
- No trust score penalty for the requester on rejection — this is a venue manager decision, not the requester's fault.
- The suggested alternative date is informational only — the requester can create a new request if they wish.

## Commit Message
`feat: add booking request reject API with reason`
