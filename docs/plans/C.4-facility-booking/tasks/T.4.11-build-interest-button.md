# T.4.11: Build InterestButton Shared Component

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 3 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** FAC-REQ-04, FAC-REQ-05

## Description
Build a reusable client component `InterestButton` that allows community members to express interest ("I'd attend") on any open booking request. The button should toggle between interested/not-interested states, display a heart icon (filled when active, outline when inactive) using lucide-react, and show the current interest count next to the icon. Implement optimistic UI updates — the count and icon state should change immediately on click, then reconcile with the server response. If the server request fails, revert the optimistic state and show a brief error toast.

## Acceptance Criteria
- [ ] `InterestButton` is a `"use client"` component accepting `bookingRequestId`, `initialCount`, and `initialIsInterested` props
- [ ] Displays a heart icon (lucide-react `Heart`) — filled/red when interested, outline when not
- [ ] Shows current interest count next to the icon
- [ ] Clicking toggles the interest state and updates the count optimistically (+1 or -1)
- [ ] Calls `POST /api/booking-requests/[id]/interest` on toggle
- [ ] Reverts optimistic update if the API call fails
- [ ] Button is disabled while the API call is in-flight (prevents double-click)
- [ ] Accessible: has `aria-label` indicating "Express interest" or "Remove interest"
- [ ] Works correctly when embedded in both `RequestCard` and `ManagerRequestCard`

## Files to Create/Modify
- `app/components/InterestButton.tsx` — Client component with heart icon toggle, optimistic count update, and API call

## Implementation Notes
- Use `useState` for local interest state and count, `useTransition` or a loading flag for in-flight state.
- The API endpoint (T.4.13) returns the updated count — use this to reconcile the optimistic value.
- Keep the component generic so it can be reused anywhere a booking request interest toggle is needed.
- Style: small rounded button with subtle hover effect. Count displayed as text next to the icon.

## Commit Message
`feat: add InterestButton component with optimistic toggle`
