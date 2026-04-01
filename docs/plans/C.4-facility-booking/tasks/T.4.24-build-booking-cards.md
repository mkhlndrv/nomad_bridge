# T.4.24: Build BookingCard and MyRequestCard Components

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 5 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.4.22
**Spec References:** FAC-MYBK-01, FAC-MYBK-02, FAC-MYBK-03, FAC-MYBK-04, FAC-MYBK-05

## Description
Build two client components for the "My Bookings" page: `BookingCard` for confirmed bookings and `MyRequestCard` for active booking requests. `BookingCard` displays the venue, confirmed date/time, status badge, a "Show QR" button that reveals the `QrCodeDisplay` component, and a cancel button with trust penalty warning. `MyRequestCard` shows the event title, venue, desired date, current status badge, interest count, and a cancel button (no penalty for requests not yet approved).

## Acceptance Criteria

### BookingCard
- [ ] Displays venue name, type badge, and location
- [ ] Shows confirmed date and time range in Asia/Bangkok timezone
- [ ] Status badge: "Confirmed" (green), "Completed" (gray), "Cancelled" (red)
- [ ] "Show QR" button toggles the `QrCodeDisplay` component inline
- [ ] Cancel button is visible for upcoming bookings only (not past or already cancelled)
- [ ] Cancel button shows a warning: "Cancelling an approved booking will result in -2 trust score penalty"
- [ ] Cancel button calls `POST /api/booking-requests/[id]/cancel`
- [ ] After successful cancellation, card updates to show "Cancelled" status

### MyRequestCard
- [ ] Displays event title, venue name, and desired date in Asia/Bangkok timezone
- [ ] Status badge: "Open" (blue), "Under Review" (yellow), "Approved" (green), "Rejected" (red), "Cancelled" (gray)
- [ ] Shows interest count (e.g., "12 interested")
- [ ] If rejected, shows the rejection reason from the venue manager
- [ ] Cancel button is visible for OPEN and UNDER_REVIEW requests
- [ ] Cancel button has no penalty warning (cancelling before approval has no penalty)
- [ ] Cancel button calls `POST /api/booking-requests/[id]/cancel`

### Shared
- [ ] Both cards have consistent styling with other cards in the app
- [ ] Both are responsive: full-width on mobile with stacked content
- [ ] Both use lucide-react icons for visual elements

## Files to Create/Modify
- `app/components/BookingCard.tsx` — Client component for confirmed bookings with QR display and cancel
- `app/components/MyRequestCard.tsx` — Client component for booking requests with status and cancel

## Implementation Notes
- `BookingCard` uses `useState` to toggle QR code visibility — QR should slide/fade in for a polished feel.
- Cancel confirmation: use `window.confirm()` for simplicity, or a small inline confirmation with "Are you sure?" text.
- The trust penalty warning on `BookingCard` cancel should be visually prominent (red text or warning icon).
- All dates in Asia/Bangkok timezone for display.
- `MyRequestCard` can show the `InterestBar` component if the request is still OPEN or UNDER_REVIEW.

## Commit Message
`feat: add BookingCard and MyRequestCard components`
