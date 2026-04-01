# T.7.08: Build OrganizerDashboard Page

**Component:** C.7 — Non-University Events Organizer
**Sprint:** 2 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** COM-DASH-01, COM-DASH-02

## Description
Build the organizer dashboard page at `app/events/dashboard/page.tsx`. Shows summary stats (total events organized, total RSVPs received, upcoming events count) at the top, followed by a list of the organizer's events with RSVP counts. Events are grouped into "Upcoming" and "Past" sections.

## Acceptance Criteria
- [ ] Page renders at `/events/dashboard`
- [ ] Summary stats: total events, total RSVPs, upcoming count
- [ ] Events listed with OrganizerEventCard components
- [ ] Grouped into "Upcoming" and "Past" sections
- [ ] Empty state: "No events yet. Create your first community event!"
- [ ] Only shows events where current user is the creator
- [ ] Responsive layout

## Files to Create/Modify
- `app/events/dashboard/page.tsx` — Server component, fetches organizer's events
- `app/events/dashboard/loading.tsx` — Loading skeleton

## Implementation Notes
- Fetch data from GET /api/events/dashboard
- Stats can be computed from the returned events on the server
- Use OrganizerEventCard (T.7.09) for each event

## Commit Message
`feat: add organizer dashboard page with event stats`
