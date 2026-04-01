# T.1.16: Build WaitlistIndicator

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** T.1.15
**Spec References:** EVT-RSVP-02

## Description
Build the `WaitlistIndicator` server component that displays the user's waitlist position when they are waitlisted for an event. The component shows a clear message like "You're #3 on the waitlist" with a visual indicator. It also shows the total number of people on the waitlist. The component is displayed on the EventDetail page below the RsvpButton when the user's RSVP status is WAITLISTED. Include a brief explanation of how the waitlist works ("You'll be automatically promoted when a spot opens up").

## Acceptance Criteria
- [ ] Displays user's waitlist position: "You're #X on the waitlist"
- [ ] Shows total waitlisted count: "X people waiting"
- [ ] Includes explanatory text: "You'll be automatically promoted when a spot opens up"
- [ ] Uses a distinct visual style: info blue background with `Clock` icon from lucide-react
- [ ] Only renders when user has a WAITLISTED RSVP (component returns null otherwise)
- [ ] Position number is the user's rank, not the raw DB waitlistPosition value
- [ ] Component accepts props: `position` (number), `totalWaitlisted` (number)
- [ ] Responsive: text wraps cleanly on mobile

## Files to Create/Modify
- `app/components/events/WaitlistIndicator.tsx` — Waitlist position display component

## Implementation Notes
- This is a simple presentational component — no data fetching.
- Styling: `bg-blue-50 border border-blue-200 rounded-lg p-4` with `text-blue-800`.
- Use lucide-react `Clock` icon for the waitlist visual.
- The position and totalWaitlisted are computed by the parent (EventDetail page) from the API response.
- Keep the component small — it's essentially a styled info banner.
- If `position` is 1, show "You're next on the waitlist!" instead of "You're #1".

## Commit Message
`feat: build WaitlistIndicator component with position display`
