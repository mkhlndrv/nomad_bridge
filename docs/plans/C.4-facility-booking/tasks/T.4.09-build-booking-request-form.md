# T.4.09: Build BookingRequestForm

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** FAC-REQ-01, FAC-REQ-02

## Description
Build a `BookingRequestForm` client component that allows verified users to create a booking request for a venue. The form should include fields for event title, event description, desired date (date picker), start time, end time, expected attendance (number input), and purpose/category (dropdown). The venue should be pre-selected from the URL param (facilityId). Include client-side validation: title required (max 120 chars), description required (max 2000 chars), date must be in the future, start time must be before end time, and expected attendance must be positive. Show a summary card on the right side (desktop) or below (mobile) with the selected venue info.

## Acceptance Criteria
- [ ] Form renders with all required fields: title, description, date, start time, end time, attendance, purpose
- [ ] Venue is pre-selected from facilityId search param and displayed as read-only
- [ ] Title input limited to 120 characters with character counter
- [ ] Description textarea limited to 2000 characters with character counter
- [ ] Date picker prevents selecting past dates
- [ ] Time inputs validate start < end
- [ ] Expected attendance accepts positive integers only
- [ ] Purpose dropdown includes: Workshop, Seminar, Study Group, Meetup, Other
- [ ] Client-side validation shows inline error messages
- [ ] Submit button disabled while form is invalid or submitting
- [ ] Loading spinner shown during submission
- [ ] Success redirects to the created request's page
- [ ] Form is responsive (side-by-side on desktop, stacked on mobile)

## Files to Create/Modify
- `app/components/facilities/BookingRequestForm.tsx` — New client component
- `app/facilities/[id]/request/page.tsx` — New page wrapping the form with venue context

## Implementation Notes
- Mark as `"use client"` for form interactivity.
- Use controlled inputs with `useState` for each field.
- Date picker: use native `<input type="date">` with `min` set to tomorrow's date in Asia/Bangkok.
- Time inputs: use native `<input type="time">` with 30-minute step.
- On submit, POST to `/api/booking-requests` with the form data.
- Pre-fetch venue details to show in the summary card.
- Purpose categories align with general event categories.

## Commit Message
`feat: build booking request form with validation`
