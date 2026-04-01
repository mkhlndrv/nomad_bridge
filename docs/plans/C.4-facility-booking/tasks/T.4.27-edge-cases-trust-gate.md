# T.4.27: Edge Cases and Trust Gate Implementation

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 5 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.4.10
**Spec References:** FAC-REQ-01, FAC-MYBK-04, FAC-MYBK-05, FAC-MYBK-06

## Description
Implement edge case handling and trust score gating across the facility booking feature. This task hardens the existing API routes and UI components with validation rules that prevent abuse and enforce business constraints. Key rules: users with trust score below -5 cannot create booking requests, past time slots cannot be requested, booking requests must fall within venue operating hours, and no-show detection applies a -3 trust score penalty. This task also adds appropriate error messages to the UI for each blocked action.

## Acceptance Criteria

### Trust Gate
- [ ] `POST /api/booking-requests` checks the requester's trust score — returns 403 with message "Your trust score is too low to create booking requests" if score < -5
- [ ] `BookingRequestForm` shows an informative banner when the user's trust score is below -5, explaining why they cannot submit requests and how to improve their score
- [ ] Trust gate check is also applied in the interest toggle (trust < -5 cannot express interest)

### Past Time Validation
- [ ] `POST /api/booking-requests` rejects requests where `desiredDate` + `startTime` is in the past — returns 400 with "Cannot request a time slot in the past"
- [ ] `BookingRequestForm` disables past dates in the date picker
- [ ] Date/time validation uses Asia/Bangkok timezone for determining "past"

### Operating Hours Validation
- [ ] `POST /api/booking-requests` validates that the requested time range falls within the venue's `operatingHours` — returns 400 with "Requested time is outside venue operating hours (X - Y)"
- [ ] `BookingRequestForm` displays the venue's operating hours and validates client-side before submission

### No-Show Trust Penalty
- [ ] A mechanism to detect no-shows: if an approved booking's event time passes without a check-in, apply -3 trust score penalty to the requester
- [ ] No-show detection can be a scheduled check or triggered on the next user action (pragmatic approach for MVP)
- [ ] No-show penalty is logged/tracked so the user can see why their trust score changed

### Overlapping Requests
- [ ] When creating a request, show a warning if overlapping requests already exist for the same venue/time — but allow submission (venue manager decides)
- [ ] Venue manager dashboard highlights overlapping requests visually

### General Edge Cases
- [ ] Venues with no manager assigned show "Contact university directly" instead of the request form
- [ ] Temporarily unavailable venues show a clear "Unavailable" badge and disable the request button
- [ ] All error messages are user-friendly and actionable

## Files to Create/Modify
- `app/api/booking-requests/route.ts` — Add trust gate, past time, and operating hours validation to POST handler
- `app/api/booking-requests/[id]/interest/route.ts` — Add trust gate check
- `app/components/BookingRequestForm.tsx` — Add trust banner, operating hours display, past date prevention, overlap warning
- `app/components/VenueDetail.tsx` (or equivalent) — Show "Contact university directly" for managerless venues, "Unavailable" badge
- `lib/trust.ts` (or equivalent) — Helper function for trust score checks and no-show penalty logic

## Implementation Notes
- Trust gate threshold (-5) should be a constant, not hardcoded in multiple places — define it in a shared constants file.
- Operating hours parsing: the `operatingHours` field is a string like "Mon-Fri 08:00-20:00". Write a simple parser that checks if a given day+time falls within the range. Keep it simple for MVP — exact parsing of complex schedules can be improved later.
- No-show detection for MVP: run a check when the user visits their bookings page — if any approved booking's event time has passed and no check-in exists, apply the -3 penalty and mark the booking as "no-show". A cron job or scheduled function is the ideal solution but out of scope for initial implementation.
- All trust score changes should be done atomically with the related status changes using Prisma transactions.
- Past time validation should account for Asia/Bangkok timezone since users see dates in that timezone.

## Commit Message
`feat: add trust gate, time validation, and edge case handling`
