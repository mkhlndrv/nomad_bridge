# T.1.04: Build CapacityBar Shared Component

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** EVT-FEED-07, EVT-RSVP-02

## Description
Build a reusable `CapacityBar` server component that visually represents event capacity with a progress bar and text label. The component shows "X/Y spots remaining" text and a horizontal bar that fills proportionally. The bar color transitions from green (low fill) to yellow (medium) to red (nearly full or full). When capacity is 100% full, the text changes to "Event Full" and the bar turns red. This component is used inside EventCard and EventDetail.

## Acceptance Criteria
- [ ] Component accepts props: `rsvpCount` (number), `capacity` (number)
- [ ] Displays text: "{remaining}/{ capacity} spots remaining" (e.g., "12/50 spots remaining")
- [ ] When full (rsvpCount >= capacity): displays "Event Full" in red text
- [ ] Progress bar width = `(rsvpCount / capacity) * 100`%
- [ ] Bar color: green (`bg-green-500`) at 0-59%, yellow (`bg-yellow-500`) at 60-84%, red (`bg-red-500`) at 85-100%
- [ ] Handles edge case: capacity of 0 shows "Registration Closed"
- [ ] Bar has rounded corners and a light gray track background
- [ ] Renders correctly at all fill levels: 0%, 50%, 80%, 100%
- [ ] Component has an optional `size` prop: "sm" (for cards) and "lg" (for detail page)

## Files to Create/Modify
- `app/components/shared/CapacityBar.tsx` — Reusable capacity bar component

## Implementation Notes
- Keep this component simple and dependency-free — pure CSS/Tailwind, no animation libraries.
- The "sm" size uses smaller text (`text-xs`) and thinner bar (`h-1.5`); "lg" uses `text-sm` and `h-2.5`.
- Use `Math.min(100, Math.round((rsvpCount / capacity) * 100))` to prevent overflow.
- Guard against division by zero when capacity is 0.
- Export a `CapacityBarProps` interface for type safety.

## Commit Message
`feat: build CapacityBar component with color-coded fill levels`
