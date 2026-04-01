# T.4.04: Build VenueDirectory Page

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.4.03
**Spec References:** FAC-DIR-01, FAC-DIR-03

## Description
Build the main `/facilities` page as a server component that renders a responsive grid of VenueCard components. The page should have a header section with title ("Campus Venues") and a subtitle explaining the request-based booking concept. Initially render with hardcoded mock data (will be connected to API in Sprint 2). The grid should be responsive: 1 column on mobile, 2 on tablet, 3 on desktop. Include a slot for the VenueFilterBar component above the grid. Add basic pagination UI (Previous/Next buttons) at the bottom.

## Acceptance Criteria
- [ ] `/facilities` route renders the VenueDirectory page
- [ ] Page header shows "Campus Venues" title and descriptive subtitle
- [ ] VenueCards render in a responsive grid (1/2/3 columns)
- [ ] Grid uses proper gap spacing (gap-6)
- [ ] VenueFilterBar slot is positioned above the grid
- [ ] Pagination controls appear at the bottom
- [ ] Page handles empty state (no venues message)
- [ ] Layout is fully responsive on mobile and desktop
- [ ] Page metadata (title, description) is set

## Files to Create/Modify
- `app/facilities/page.tsx` — New page component
- `app/facilities/layout.tsx` — Optional layout wrapper

## Implementation Notes
- Use Next.js App Router file-based routing: `app/facilities/page.tsx`.
- For Sprint 1, use hardcoded mock data array matching Facility type.
- Grid classes: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Pagination: simple Previous/Next with page number, disabled states on edges.
- Empty state: friendly message with Building2 icon.

## Commit Message
`feat: build venue directory page with responsive grid`
