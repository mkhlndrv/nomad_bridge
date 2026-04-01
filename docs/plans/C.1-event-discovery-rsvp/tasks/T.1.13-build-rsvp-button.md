# T.1.13: Build RsvpButton Client Component

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 30m
**Dependencies:** T.1.09
**Spec References:** EVT-RSVP-01, EVT-FEED-08

## Description
Build the `RsvpButton` as a client component that handles the full RSVP toggle flow. The button has three visual states: "RSVP Now" (default, user not registered), "Cancel RSVP" (user is confirmed), and "Join Waitlist" (event is full, user not registered). Clicking "RSVP Now" calls POST `/api/events/[id]/rsvp`, clicking "Cancel RSVP" calls DELETE `/api/events/[id]/rsvp`. Use optimistic UI updates: immediately update the button state and capacity count on click, then revert if the API call fails. Show a loading spinner during the API call. On successful RSVP, trigger the RsvpConfirmation modal (T.1.14).

## Acceptance Criteria
- [ ] Button shows "RSVP Now" when user is not registered and capacity is available
- [ ] Button shows "Join Waitlist (#X)" when event is full and user is not registered
- [ ] Button shows "Cancel RSVP" (with different styling — outline/red) when user is confirmed
- [ ] Button shows "Leave Waitlist" when user is waitlisted
- [ ] Button is disabled and shows "Past Event" for past events
- [ ] Button is disabled and shows "Registration Closed" when capacity is 0
- [ ] Clicking "RSVP Now" calls POST API and shows loading spinner
- [ ] Clicking "Cancel RSVP" shows confirmation dialog before calling DELETE API
- [ ] Optimistic UI: button state and rsvpCount update immediately, revert on error
- [ ] On successful RSVP, calls `onRsvpSuccess` callback (to open confirmation modal)
- [ ] On error, shows a toast/alert with the error message from the API
- [ ] Button is disabled if user is not authenticated (shows "Sign in to RSVP")

## Files to Create/Modify
- `app/components/events/RsvpButton.tsx` — RSVP toggle button client component

## Implementation Notes
- Props: `eventId`, `eventDate`, `capacity`, `rsvpCount`, `isRsvped`, `rsvpStatus`, `waitlistPosition`, `onRsvpSuccess`, `onCountChange`.
- Use `useState` for local button state and `useTransition` or a custom `isLoading` state.
- For optimistic UI: update local state before `await fetch(...)`, then revert in the catch block.
- The `onCountChange` callback lets the parent (EventDetail) update the displayed capacity count.
- For the cancel confirmation, use `window.confirm()` for simplicity, or a small inline dialog.
- Use `fetch('/api/events/${eventId}/rsvp', { method: 'POST' })` and `{ method: 'DELETE' }`.
- Tailwind styling: primary CTA for RSVP (`bg-blue-600 text-white`), outline red for cancel (`border-red-500 text-red-500`), gray for disabled.

## Commit Message
`feat: build RsvpButton with optimistic UI and state management`
