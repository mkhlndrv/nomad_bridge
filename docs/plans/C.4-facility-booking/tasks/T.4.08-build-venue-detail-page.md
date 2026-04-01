# T.4.08: Build VenueDetail Page

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.4.07
**Spec References:** FAC-DIR-05, FAC-DIR-06, FAC-REQ-03

## Description
Build the `/facilities/[id]` page as a server component that displays the full venue detail view. The page should show the venue image (hero area), name, university, type badge, description, amenities list (parsed from comma-separated string into pills), capacity, operating hours, rules, price per hour, and the venue manager's name. Include a "Request This Venue" CTA button that links to the booking request form. Below the main info, render an `ActiveRequestsList` section showing current open booking requests for this venue with interest counts, allowing users to join existing proposals instead of creating new ones. If the venue has no manager, show "Contact university directly" instead of the request button.

## Acceptance Criteria
- [ ] `/facilities/[id]` route renders the VenueDetail page
- [ ] Hero section shows venue image with overlay gradient
- [ ] Venue name, university, and type badge displayed prominently
- [ ] Description renders as formatted text
- [ ] Amenities parsed from comma-separated string and shown as individual pills/badges
- [ ] Capacity, operating hours, and price shown with appropriate icons
- [ ] Rules section displayed when rules exist
- [ ] Venue manager name shown with "Managed by" label
- [ ] "Request This Venue" button links to booking form with facilityId pre-filled
- [ ] Active requests section shows existing proposals with interest counts
- [ ] No-manager state shows "Contact university directly" message
- [ ] Page is fully responsive
- [ ] 404 page shown for invalid facility ID

## Files to Create/Modify
- `app/facilities/[id]/page.tsx` — New page component
- `app/components/facilities/ActiveRequestsList.tsx` — New server component showing open requests

## Implementation Notes
- Fetch data using the `/api/facilities/[id]` endpoint or direct Prisma call in the server component.
- Amenities parsing: `facility.amenities?.split(',').map(a => a.trim())`.
- "Request This Venue" links to `/facilities/[id]/request` or opens the BookingRequestForm.
- ActiveRequestsList maps over `facility.activeRequests` and renders condensed request cards.
- Use lucide icons: `Clock` for hours, `Users` for capacity, `DollarSign` for price, `Shield` for rules.
- Use `notFound()` from `next/navigation` for 404 handling.

## Commit Message
`feat: build venue detail page with active requests list`
