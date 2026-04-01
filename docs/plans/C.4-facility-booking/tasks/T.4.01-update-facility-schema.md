# T.4.01: Update Prisma Schema for Facility Booking

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 30m
**Dependencies:** None
**Spec References:** FAC-DIR-02, FAC-DIR-05, FAC-DIR-06, FAC-REQ-01, FAC-REQ-06, FAC-MGR-01

## Description
Extend the existing Prisma schema to support the full facility booking workflow. Add a `VENUE_MANAGER` value to the `Role` enum so users can be assigned as venue managers. Add `capacity`, `operatingHours`, `amenities`, `rules`, and `interestThreshold` fields to the `Facility` model. Add a `managerId` foreign key to link each facility to its venue manager. Create a new `BookingRequest` model with fields for event title, description, desired date/time range, expected attendance, purpose/category, status (OPEN, UNDER_REVIEW, APPROVED, REJECTED, CANCELLED), and a `qrCode` field generated on approval. Create a `BookingInterest` model to track which users expressed interest in a booking request. Add a `BookingRequestStatus` enum with the five lifecycle states.

## Acceptance Criteria
- [ ] `Role` enum includes `VENUE_MANAGER`
- [ ] `Facility` model has `capacity` (Int), `operatingHours` (String), `amenities` (String, comma-separated), `rules` (String?), `interestThreshold` (Int, default 5), `managerId` (String?)
- [ ] `Facility` has a relation to `User` via `managerId`
- [ ] `BookingRequestStatus` enum exists with OPEN, UNDER_REVIEW, APPROVED, REJECTED, CANCELLED
- [ ] `BookingRequest` model exists with: id, title, description, desiredDate, startTime, endTime, expectedAttendance, purpose, status, qrCode, interestCount, createdAt, facilityId, requesterId
- [ ] `BookingInterest` model exists with: id, createdAt, userId, bookingRequestId, unique constraint on [userId, bookingRequestId]
- [ ] Relations are properly defined between BookingRequest <-> Facility, BookingRequest <-> User, BookingInterest <-> User, BookingInterest <-> BookingRequest
- [ ] `npx prisma generate` succeeds without errors
- [ ] `npx prisma db push` applies the schema changes

## Files to Create/Modify
- `prisma/schema.prisma` — Add VENUE_MANAGER role, extend Facility model, add BookingRequestStatus enum, BookingRequest model, BookingInterest model

## Implementation Notes
- The existing `Booking` model is separate from `BookingRequest` — `BookingRequest` is the proposal lifecycle, while `Booking` is the confirmed reservation (generated on approval).
- Use `String` for `operatingHours` (e.g., "Mon-Fri 08:00-20:00") since SQLite has no JSON type.
- Use `String` for `amenities` as comma-separated values (e.g., "WiFi,Projector,Whiteboard").
- The `interestThreshold` default of 5 means 5 users must express interest before auto-triggering UNDER_REVIEW status.
- Add `BookingRequest[]` and `BookingInterest[]` relations to the `User` model.

## Commit Message
`chore: update prisma schema with facility booking models`
