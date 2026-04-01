# T.4.14: Build RequestCard Component

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 3 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.4.11, T.4.12
**Spec References:** FAC-REQ-03, FAC-REQ-04, FAC-REQ-05

## Description
Build a `RequestCard` component that displays a public booking request proposal. This card is used in the venue detail page's active requests list, the general booking requests feed, and anywhere open proposals are shown. It should present the event title, requester name with trust badge, venue name, desired date/time (displayed in Asia/Bangkok timezone), interest count with the `InterestBar`, status badge, and an `InterestButton` for toggling interest. The card should be clean, modern, and visually distinct by status.

## Acceptance Criteria
- [ ] `RequestCard` renders event title as the card heading
- [ ] Shows requester name and trust score badge (color-coded: green for high, yellow for medium, red for low)
- [ ] Displays venue name and type badge
- [ ] Shows desired date and time range formatted in Asia/Bangkok timezone
- [ ] Includes `InterestBar` component showing current interest vs threshold
- [ ] Includes `InterestButton` component for toggling interest
- [ ] Displays a status badge: "Open" (blue), "Under Review" (yellow), "Approved" (green), "Rejected" (red), "Cancelled" (gray)
- [ ] Shows expected attendance and purpose/category as secondary info
- [ ] Card has a clean border, rounded corners, and consistent spacing with other cards in the app
- [ ] Responsive: stacks content vertically on mobile, uses horizontal layout on desktop
- [ ] Interest button is hidden if status is not `OPEN` or `UNDER_REVIEW`

## Files to Create/Modify
- `app/components/RequestCard.tsx` — Card component composing InterestButton and InterestBar with request details

## Implementation Notes
- Accept the full booking request object as a prop (including nested facility and requester data).
- Use lucide-react icons: `Calendar` for date, `MapPin` for venue, `Users` for attendance, `Tag` for category.
- All dates are stored in UTC — convert to Asia/Bangkok for display using `toLocaleString` with `timeZone: 'Asia/Bangkok'`.
- The trust badge can be a small colored pill showing the numeric score.
- Keep the card server-renderable where possible, with `InterestButton` as the only client island.

## Commit Message
`feat: add RequestCard with interest display and status badge`
