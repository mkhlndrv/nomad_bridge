# T.2.06: Build Profile Page Layout

**Component:** C.2 — Participant Profile & Verification
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.2.03, T.2.04, T.2.05
**Spec References:** PRF-DISPLAY-01, PRF-DISPLAY-04, PRF-DISPLAY-05, PRF-DISPLAY-07

## Description
Create the profile page layout that composes all mockup components from Sprint 1 into a complete page. Set up two routes: `/profile` for the current user's own profile and `/profile/[id]` for viewing another user's public profile. For the mockup phase, both routes will use seed data fetched directly from Prisma (server-side). The layout should stack components vertically: ProfileHeader at the top, then SkillTags, then ActivitySummary, with consistent spacing between sections. Include a section heading for each block. On the own-profile page, include an "Edit Profile" button placeholder. Fetch the user from the database using Prisma and compute activity counts by counting related records.

## Acceptance Criteria
- [ ] Page renders at `app/profile/page.tsx` (own profile)
- [ ] Page renders at `app/profile/[id]/page.tsx` (public profile)
- [ ] ProfileHeader, TrustScoreBadge, SkillTags, and ActivitySummary all render correctly
- [ ] Activity counts computed from actual database relations (EventRsvp count, LectureOpportunity count, Booking count, ForumPost count)
- [ ] "Edit Profile" button visible on own profile page
- [ ] Public profile does not show "Edit Profile" button
- [ ] Responsive layout at 375px and 1280px breakpoints
- [ ] 404 handling when profile ID not found
- [ ] Consistent spacing and section headings

## Files to Create/Modify
- `app/profile/page.tsx` — Own profile page (uses first seed user for mockup)
- `app/profile/[id]/page.tsx` — Public profile page
- `app/profile/layout.tsx` — Shared layout wrapper (optional, for consistent padding)

## Implementation Notes
- Use `lib/prisma.ts` for database access. Fetch with `prisma.user.findUnique` including `_count` for relations.
- For the mockup phase on `/profile`, hardcode fetching the first seed user (or a specific user ID). This will be replaced with auth in T.2.10.
- Use `notFound()` from `next/navigation` for missing profiles on `/profile/[id]`.
- Activity counts: use Prisma's `_count` select on `rsvps`, `lectures`, `bookings`, `forumPosts`.
- Use `Pencil` icon from lucide-react for the Edit button.
- All pages are Server Components using async data fetching.

## Commit Message
`feat: build profile page layout with all mockup components`
