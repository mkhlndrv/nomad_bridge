# T.4.10: POST /api/booking-requests — Create Booking Request

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.4.01
**Spec References:** FAC-REQ-01, FAC-REQ-02, FAC-REQ-03

## Description
Create a POST API route at `/api/booking-requests` that allows verified users to submit a booking request for a campus facility. Validate that the user is authenticated, the facility exists and is available, the requested date/time is in the future and within operating hours, and the user does not have a trust score below -5. Create the BookingRequest record with status OPEN and interestCount 0. Return the created request with facility and requester details. The request becomes a public proposal visible to all users.

## Acceptance Criteria
- [ ] POST `/api/booking-requests` creates a new booking request
- [ ] Request body validated: facilityId, title, description, desiredDate, startTime, endTime, expectedAttendance, purpose are required
- [ ] Returns 401 if user is not authenticated
- [ ] Returns 403 if user's trust score < -5 with explanatory message
- [ ] Returns 404 if facility does not exist or is not available
- [ ] Returns 400 if desiredDate is in the past
- [ ] Returns 400 if startTime >= endTime
- [ ] Returns 400 if title is empty or exceeds 120 characters
- [ ] Created request has status OPEN and interestCount 0
- [ ] Returns 201 with the created BookingRequest including facility and requester details
- [ ] Stores all dates in UTC

## Files to Create/Modify
- `app/api/booking-requests/route.ts` — New POST handler

## Implementation Notes
- Parse and validate the request body using a validation helper or manual checks.
- Trust gate check: `if (user.trustScore < -5) return 403`.
- Date validation: parse desiredDate as a Date object, compare with `new Date()` in UTC.
- Time validation: compare startTime and endTime as strings ("09:00" < "17:00").
- Use `prisma.bookingRequest.create()` with `include: { facility: true, requester: true }`.
- The requester is automatically the authenticated user (from session/auth context).
- Consider adding a check that the time range falls within the facility's operating hours (if parseable).

## Commit Message
`feat: add POST /api/booking-requests with validation`
