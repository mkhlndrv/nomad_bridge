# T.4.20: POST /api/booking-requests/[id]/approve API

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 30m
**Dependencies:** T.4.10
**Spec References:** FAC-MGR-03, FAC-MGR-05

## Description
Create an API route handler for `POST /api/booking-requests/[id]/approve` that allows a venue manager to approve a booking request. This is the most critical transition in the booking lifecycle. On approval: update the request status to `APPROVED`, generate a unique QR code string for the booking, create a `Booking` record linking the confirmed date/time and QR code, and trigger notifications to the requester and all users who expressed interest. Only the venue manager of the associated facility can approve requests.

## Acceptance Criteria
- [ ] Route handler exists at `app/api/booking-requests/[id]/approve/route.ts`
- [ ] Accepts POST with body: `{ confirmedDate: string, startTime: string, endTime: string, message?: string }`
- [ ] Validates that the authenticated user is the venue manager of the request's facility — returns 403 if not
- [ ] Returns 400 if the request status is not `OPEN` or `UNDER_REVIEW`
- [ ] Returns 404 if the booking request does not exist
- [ ] Within a Prisma transaction:
  - Updates `BookingRequest` status to `APPROVED`
  - Stores the optional manager message on the request
  - Generates a unique QR code string (format: `NB-FAC-{requestId}-{random6chars}`)
  - Updates the `qrCode` field on the `BookingRequest`
  - Creates a `Booking` record with the confirmed date/time, QR code, facility, and user references
- [ ] Returns the updated booking request with QR code and new booking ID
- [ ] Notification placeholders: notify requester (approval + QR), notify all interested users (event confirmed)
- [ ] Returns 401 if user is not authenticated

## Files to Create/Modify
- `app/api/booking-requests/[id]/approve/route.ts` — POST handler with approval logic, QR generation, booking creation, and notification triggers

## Implementation Notes
- QR code string generation: use `crypto.randomBytes(3).toString('hex')` for the random portion, combined with the request ID for uniqueness.
- The `Booking` model should already exist in the schema (from T.4.01) — if not, this task depends on it being present.
- Use `prisma.$transaction()` to ensure atomicity: if booking creation fails, the status should not be updated.
- Notification integration is a C.6 dependency — add TODO comments with clear descriptions of what notifications to send.
- The confirmed date/time may differ from the originally requested date/time (manager can adjust).
- Store dates in UTC in the database.

## Commit Message
`feat: add booking request approve API with QR generation`
