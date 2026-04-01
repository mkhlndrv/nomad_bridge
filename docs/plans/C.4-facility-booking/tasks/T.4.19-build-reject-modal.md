# T.4.19: Build RejectRequestModal Component

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** FAC-MGR-04, FAC-MGR-06, FAC-MGR-07

## Description
Build a `RejectRequestModal` client component that venue managers use to reject a booking request with a required reason. The modal shows the request summary and provides a textarea for the rejection reason (required) and an optional alternative date suggestion. On submit, it calls the reject API endpoint. The requester will be notified with the reason, so the messaging should encourage constructive feedback.

## Acceptance Criteria
- [ ] `RejectRequestModal` is a `"use client"` component accepting `bookingRequest`, `isOpen`, and `onClose` props
- [ ] Displays request summary: event title, venue name, requester name, requested date
- [ ] Includes a required reason textarea with placeholder: "Explain why this request cannot be approved..."
- [ ] Reason textarea has a minimum length of 10 characters — show validation error if too short
- [ ] Includes optional "Suggest alternative date" date input field
- [ ] "Confirm Rejection" button is disabled until reason meets minimum length
- [ ] Calls `POST /api/booking-requests/[id]/reject` with reason and optional alternative date
- [ ] Shows loading state on confirm button during API call
- [ ] On success: closes the modal (parent refreshes data)
- [ ] On error: displays error message within the modal
- [ ] "Cancel" button closes the modal without side effects
- [ ] Modal has proper backdrop, centered layout, Escape key to close
- [ ] Visual styling uses a red/warning color scheme to differentiate from the approve modal

## Files to Create/Modify
- `app/components/RejectRequestModal.tsx` — Client component: rejection modal with reason textarea, alternative date suggestion, and API submission

## Implementation Notes
- Simpler than the approve modal — fewer fields, no time adjustment needed.
- The alternative date suggestion is just a date input — the requester can use it to create a new request if they want.
- Use `useState` for form state and validation.
- The rejection reason is stored in the `BookingRequest` model and included in the notification to the requester.
- Same modal pattern as `ApproveRequestModal` for consistency.

## Commit Message
`feat: add RejectRequestModal with reason and alternative date`
