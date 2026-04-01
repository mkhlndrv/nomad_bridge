# T.1.12: Build EventDetail Page

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.1.08
**Spec References:** EVT-FEED-06, EVT-FEED-07, EVT-FEED-08, EVT-FEED-09, EVT-FEED-10

## Description
Build the `/events/[id]` page as a server component that renders the full event detail view. The page fetches data from the GET `/api/events/[id]` endpoint and displays: a hero image section, event title, full description, date/time in Bangkok timezone, venue with a location detail section (map placeholder), university branding, speakers list, schedule, capacity bar (large variant), tags, a photo gallery section, and a post-event materials section (visible only for past events). Include a prominent area for the RsvpButton (placeholder until T.1.13). Use a single-column layout with clear section separation.

## Acceptance Criteria
- [ ] Page is accessible at `/events/[id]`
- [ ] Fetches event data from GET `/api/events/[id]` API route
- [ ] Displays hero image (or gradient placeholder if no imageUrl)
- [ ] Shows event title, full description (no truncation), date/time in Bangkok timezone
- [ ] Displays venue, location detail, and a "Map coming soon" placeholder
- [ ] Shows university name with GraduationCap icon
- [ ] Renders speakers list (parsed from comma-separated string) if present
- [ ] Renders schedule text if present
- [ ] Includes CapacityBar in "lg" size
- [ ] Tags render as pills
- [ ] Photo gallery section renders EventPhoto images in a grid (or "No photos yet" placeholder)
- [ ] Materials section shows only if event date is in the past
- [ ] Shows "Past Event" banner for past events
- [ ] Returns Next.js `notFound()` if event doesn't exist (404 from API)
- [ ] Placeholder div for RsvpButton with text "RSVP button coming in Sprint 3"

## Files to Create/Modify
- `app/events/[id]/page.tsx` — Event detail server component page
- `app/events/[id]/loading.tsx` — Loading skeleton for event detail

## Implementation Notes
- Use `params.id` from the dynamic route to fetch the event.
- Parse `speakers` and `tags` from comma-separated strings: `event.speakers?.split(',').map(s => s.trim())`.
- For the photo gallery, use a simple CSS grid: `grid grid-cols-2 md:grid-cols-3 gap-2`.
- Materials section: list each material with an icon based on `fileType` (lucide-react: `FileText` for pdf, `Presentation` for slides, `Video` for video, `Link` for link).
- Use `next/image` for the hero image with `priority` to optimize LCP.
- Add `generateMetadata` for SEO: set title and description from event data.
- Layout: max-width container (`max-w-4xl mx-auto`) with clear spacing between sections.

## Commit Message
`feat: build event detail page with full event information`
