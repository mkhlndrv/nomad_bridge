# T.7.06: Build CommunityBadge Component

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 2 | **Milestone:** M3
**Estimated Time:** 10m
**Dependencies:** None
**Spec References:** COM-CREATE-03, COM-DISC-01

## Description
Build a small badge component that displays "Community Event" in purple on event cards when the event has `isCommunity=true`. This visually distinguishes community-organized events from university events in the shared event feed.

## Acceptance Criteria
- [ ] Renders a purple pill badge with text "Community Event"
- [ ] Only renders when `isCommunity` prop is true
- [ ] Fits naturally alongside existing category badges on EventCard
- [ ] Consistent styling with other badges in the app

## Files to Create/Modify
- `components/community/CommunityBadge.tsx` — Server component, small purple badge
- `components/events/EventCard.tsx` — Add CommunityBadge rendering when isCommunity=true

## Implementation Notes
- Use Tailwind: `bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full`
- Keep it minimal — just a visual indicator

## Commit Message
`feat: add community event badge for event cards`
