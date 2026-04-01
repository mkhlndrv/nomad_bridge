# T.1.03: Build EventCard Mockup

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** EVT-FEED-02, EVT-FEED-07

## Description
Build the `EventCard` server component that displays a summary of a single event. The card renders a thumbnail image (or placeholder), event title, date/time formatted in Asia/Bangkok timezone, university name, venue, a short description (truncated to 2 lines), topic tags as small pills, and a CapacityBar showing RSVP count vs capacity. The entire card is wrapped in a Next.js `Link` pointing to `/events/[id]`. Use Tailwind CSS for styling with a clean card design: rounded corners, subtle shadow, hover elevation effect.

## Acceptance Criteria
- [ ] Component accepts props: `id`, `title`, `description`, `date` (ISO string), `venue`, `university`, `category`, `imageUrl`, `tags` (string), `rsvpCount`, `capacity`
- [ ] Date displays in Bangkok timezone (Asia/Bangkok) using `toLocaleDateString` / `toLocaleTimeString` or a helper function
- [ ] Description is truncated to 2 lines with CSS `line-clamp-2`
- [ ] Tags render as small pill badges (parsed from comma-separated string)
- [ ] Card includes the CapacityBar sub-component (or a placeholder div until T.1.04)
- [ ] Card links to `/events/${id}` via Next.js Link
- [ ] Card has responsive width: full-width on mobile, fixed in grid on desktop
- [ ] Uses lucide-react icons: `Calendar` for date, `MapPin` for venue, `GraduationCap` for university
- [ ] Past events show a "Past Event" badge overlay

## Files to Create/Modify
- `app/components/events/EventCard.tsx` — Main EventCard server component
- `app/lib/date-utils.ts` — Helper for formatting dates in Bangkok timezone (reusable)

## Implementation Notes
- For the date helper, use `Intl.DateTimeFormat` with `timeZone: 'Asia/Bangkok'` — no external date libraries needed.
- Use TypeScript interface for the props, exported as `EventCardProps` for reuse.
- Keep the component purely presentational with no data fetching — data comes via props.
- Tailwind classes for card: `rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden`.
- Image section: use `next/image` with a fallback gradient if `imageUrl` is null.
- Category badge: small colored pill in the top-right of the image area.

## Commit Message
`feat: build EventCard component with bangkok timezone display`
