# T.4.03: Build VenueCard Mockup

**Component:** C.4 — Campus Facility Access Booking
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** FAC-DIR-01, FAC-DIR-02, FAC-DIR-06

## Description
Build a reusable `VenueCard` server component that displays a campus venue as a photo card. The card should show the venue image (or a placeholder gradient), venue name, university name, a type badge (Library/Coworking/Gym/Cafe/Lab), location, capacity (using Users icon), price per hour (or "Free" when pricePerHour is 0), and a "Request-based" badge indicating the venue is not instant-book. The card should link to the venue detail page. Use Tailwind CSS for styling with rounded corners, subtle shadow, and hover elevation effect.

## Acceptance Criteria
- [ ] VenueCard renders venue image with fallback placeholder
- [ ] Displays venue name as card title
- [ ] Shows university name with MapPin icon
- [ ] Type badge with appropriate color per type (e.g., blue for Library, green for Coworking)
- [ ] Capacity shown with Users lucide icon
- [ ] Price displays as "Free" when pricePerHour is 0, or "฿X/hr" otherwise
- [ ] "Request-based" badge always visible (small, muted style)
- [ ] Card links to `/facilities/[id]`
- [ ] Responsive: stacks well in grid layouts
- [ ] Component accepts typed props (Facility data)

## Files to Create/Modify
- `app/components/facilities/VenueCard.tsx` — New server component

## Implementation Notes
- Use lucide-react icons: `MapPin`, `Users`, `Clock`, `Building2`.
- Type badge color map: LIBRARY=blue, COWORKING=green, GYM=orange, CAFE=amber, LAB=purple.
- Use `next/image` for venue photo with proper width/height.
- Price formatting: `pricePerHour === 0 ? "Free" : `฿${pricePerHour}/hr``.
- Follow the card pattern from existing EventCard if available.

## Commit Message
`feat: build VenueCard component with type badges`
