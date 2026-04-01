# T.3.04: Build CollaborationBoard Page

**Component:** C.3 — Collaboration Organize Board
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.3.03
**Spec References:** COL-BOARD-01, COL-BOARD-02, COL-BOARD-03

## Description
Build the main `/collaborations` page as a server component that serves as the collaboration board. The page layout includes: a page header ("Collaboration Board"), the `CollaborationTabBar` (from T.3.05) for switching between "Requests from Universities", "Offers from Nomads", and "All Opportunities", the `CollaborationFilterBar` (from T.3.05), and a responsive grid of `CollaborationCard` components. Initially populate with mockup data (or seed data if T.3.02 is complete). The grid should be 1 column on mobile, 2 on tablet, 3 on desktop. Include an empty state message when no collaborations match filters.

## Acceptance Criteria
- [ ] `/collaborations` route renders the collaboration board page
- [ ] Page header with title "Collaboration Board" and brief description
- [ ] Tab bar integrated with three tabs: Requests, Offers, All
- [ ] Filter bar placeholder integrated below tabs
- [ ] Cards render in responsive grid (1 col mobile, 2 col md, 3 col lg)
- [ ] Empty state shown when no collaborations available
- [ ] Page uses Next.js 15 App Router conventions (page.tsx in app/collaborations/)
- [ ] Layout is clean, modern, and consistent with project design patterns

## Files to Create/Modify
- `app/collaborations/page.tsx` — Main board page with layout, tab bar, filter bar, card grid
- `app/collaborations/layout.tsx` — Optional layout wrapper if needed for nested routes

## Implementation Notes
- Use `searchParams` from the page props to read the active tab and filter values from the URL.
- Tab state via URL search params (e.g., `?tab=requests`) keeps the page server-renderable and shareable.
- For the mockup phase, filter the hardcoded data array based on the tab: requests = poster role is UNIVERSITY, offers = poster role is NOMAD.
- Wrap cards in a `div` with `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Add a "Post Collaboration" button in the header that links to `/collaborations/new` (form built in T.3.10).

## Commit Message
`feat: build CollaborationBoard page with tabs and card grid`
