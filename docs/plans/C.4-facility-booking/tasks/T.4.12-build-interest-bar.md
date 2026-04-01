# T.4.12: Build InterestBar Component

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 3 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FAC-REQ-05, FAC-REQ-06, FAC-REQ-07

## Description
Build a client component `InterestBar` that visually represents how close a booking request is to reaching its venue's interest threshold. Display a horizontal progress bar with the current interest count and the threshold target (e.g., "8 / 15 interested"). When the threshold is met or exceeded, the bar should fill completely and change color to indicate the request is ready for review. Include a subtle label below the bar: "N more needed" when below threshold, or "Threshold reached!" when met.

## Acceptance Criteria
- [ ] `InterestBar` is a `"use client"` component accepting `currentCount`, `threshold`, and optional `status` props
- [ ] Renders a horizontal progress bar where width = `min(currentCount / threshold, 1) * 100%`
- [ ] Displays "X / Y interested" text above or beside the bar
- [ ] Bar color is blue/indigo when below threshold, green when threshold is met or exceeded
- [ ] Shows "N more needed" label below the bar when count < threshold
- [ ] Shows "Threshold reached!" label when count >= threshold
- [ ] If `status` is `UNDER_REVIEW` or `APPROVED`, shows appropriate status text instead
- [ ] Animates smoothly when the count changes (CSS transition on width)
- [ ] Renders gracefully when threshold is 0 or undefined (show count only, no bar)

## Files to Create/Modify
- `app/components/InterestBar.tsx` — Client component with progress bar, count display, and threshold status

## Implementation Notes
- Use Tailwind CSS for the progress bar: a container div with a colored inner div at the calculated width percentage.
- Add `transition-all duration-300` for smooth width animation.
- Keep the component self-contained with no API calls — it receives all data via props.
- Consider adding a small icon (lucide-react `Users`) next to the count for visual clarity.

## Commit Message
`feat: add InterestBar progress component`
