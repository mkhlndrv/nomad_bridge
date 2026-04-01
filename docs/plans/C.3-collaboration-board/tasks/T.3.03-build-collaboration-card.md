# T.3.03: Build CollaborationCard Mockup

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** COL-BOARD-02, COL-POST-08

## Description
Build a reusable `CollaborationCard` server component that displays a collaboration opportunity at a glance. The card shows: title, poster name, collaboration type badge (from T.3.06), status badge (from T.3.06), format indicator (in-person/online/hybrid), compensation type, preferred date range, and up to 3 topic tags. The card should link to the collaboration detail page (`/collaborations/[id]`). Initially, use hardcoded mockup data to develop the layout independently of the API. The design should follow the project's card pattern — clean, modern cards with good spacing and Tailwind CSS styling.

## Acceptance Criteria
- [ ] `CollaborationCard` renders title, poster name, type badge, status badge
- [ ] Format shown with appropriate icon (MapPin for in-person, Monitor for online, Laptop for hybrid)
- [ ] Compensation type displayed (Paid / Free / Facility Access)
- [ ] Preferred date range shown in Asia/Bangkok timezone
- [ ] Up to 3 tags rendered as small pills; "+N more" if additional
- [ ] Card is a clickable link to `/collaborations/[id]`
- [ ] Responsive: full width on mobile, card grid on desktop
- [ ] Uses TypeScript interface for props (not `any`)

## Files to Create/Modify
- `app/collaborations/components/CollaborationCard.tsx` — New server component with card layout
- `app/collaborations/components/types.ts` — TypeScript interfaces for CollaborationOpportunity and related types

## Implementation Notes
- Use `lucide-react` icons: MapPin, Monitor, Laptop for format; Calendar for date range.
- Date display: use `toLocaleDateString` with `timeZone: 'Asia/Bangkok'` option.
- Tags are stored as comma-separated strings; split and slice to first 3 for display.
- Accept props typed to the Prisma-generated `CollaborationOpportunity` type (or a subset DTO).
- Start with hardcoded data in the component file — this will be replaced by API data in Sprint 2.
- Keep the card height consistent regardless of content length — use `line-clamp-2` on description.

## Commit Message
`feat: build CollaborationCard component with type and status badges`
