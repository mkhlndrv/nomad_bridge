# T.2.05: Build SkillTags + ActivitySummary Mockups

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** PRF-DISPLAY-03, PRF-DISPLAY-04

## Description
Build two server components for the profile page: `SkillTags` and `ActivitySummary`. The `SkillTags` component renders a horizontal, wrapping list of skill tag badges from a comma-separated skills string. Each tag should be a rounded pill-style badge. If no skills are set, show an encouraging prompt ("Add skills to help others find you"). The `ActivitySummary` component displays 4 stat cards in a responsive grid: events attended (Calendar icon), guest lectures given (GraduationCap icon), bookings made (Building icon), and forum posts written (MessageSquare icon). Each card shows the count prominently with a label and icon. For the mockup phase, both components accept data as props.

## Acceptance Criteria
- [ ] `SkillTags` component renders at `components/profile/SkillTags.tsx`
- [ ] Skills displayed as horizontal, wrapping pill badges
- [ ] Empty skills state shows "Add skills to help others find you" prompt
- [ ] `ActivitySummary` component renders at `components/profile/ActivitySummary.tsx`
- [ ] 4 stat cards: events attended, lectures given, bookings made, forum posts
- [ ] Each card has a lucide icon, count number, and label
- [ ] Grid layout: 2 columns on mobile, 4 columns on desktop
- [ ] Clean card styling with good spacing and consistent sizing

## Files to Create/Modify
- `components/profile/SkillTags.tsx` — Create SkillTags server component
- `components/profile/ActivitySummary.tsx` — Create ActivitySummary server component

## Implementation Notes
- Use `parseTags` from `lib/utils.ts` to convert the comma-separated skills string into an array for rendering.
- Lucide icons to import: `Calendar`, `GraduationCap`, `Building`, `MessageSquare`.
- SkillTags props: `skills: string | null`. ActivitySummary props: `{ eventsAttended: number; lecturesGiven: number; bookingsMade: number; forumPosts: number }`.
- Use Tailwind `flex flex-wrap gap-2` for skill tags, `grid grid-cols-2 md:grid-cols-4 gap-4` for activity cards.
- Both are Server Components (no `"use client"` directive).

## Commit Message
`feat: build SkillTags and ActivitySummary profile components`
