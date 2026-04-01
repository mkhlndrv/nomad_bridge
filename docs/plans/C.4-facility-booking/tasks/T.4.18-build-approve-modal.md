# T.4.18: Build ApproveRequestModal Component

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FAC-MGR-03, FAC-MGR-05

## Description
Build an `ApproveRequestModal` client component that venue managers use to confirm approval of a booking request. The modal displays a summary of the request (event title, venue, requested date/time) and allows the manager to confirm or adjust the date/time, add an optional message to the requester, and submit approval. On confirm, the modal calls the approve API endpoint which creates the booking and generates a QR code. The modal should show a loading state during submission and a success state with the generated QR code preview after approval.

## Acceptance Criteria
- [ ] `ApproveRequestModal` is a `"use client"` component accepting `bookingRequest`, `isOpen`, and `onClose` props
- [ ] Displays request summary: event title, venue name, requester name
- [ ] Shows the requested date/time pre-filled in editable date and time inputs
- [ ] Manager can adjust the confirmed date/time (within venue operating hours)
- [ ] Includes an optional message textarea (placeholder: "Add a message for the requester...")
- [ ] "Confirm Approval" button calls `POST /api/booking-requests/[id]/approve` with confirmed date/time and message
- [ ] Shows loading spinner on the confirm button while API call is in-flight
- [ ] On success: displays a brief success message and closes the modal (parent refreshes data)
- [ ] On error: displays error message within the modal without closing it
- [ ] "Cancel" button closes the modal without side effects
- [ ] Modal has proper backdrop, is centered, and supports closing via Escape key or backdrop click
- [ ] Dates displayed and input in Asia/Bangkok timezone

## Files to Create/Modify
- `app/components/ApproveRequestModal.tsx` — Client component: confirmation modal with date/time adjustment, message, and API submission

## Implementation Notes
- Use a simple modal pattern: fixed overlay with centered content div. No external modal library needed.
- Date/time inputs use standard HTML `<input type="date">` and `<input type="time">` — ensure values are converted to/from UTC for the API call.
- The API response from T.4.20 will include the generated QR code value — the parent component can use this to update the UI.
- Add `useEffect` to handle Escape key press for closing the modal.
- Trap focus within the modal for accessibility.

## Commit Message
`feat: add ApproveRequestModal with date confirmation`
