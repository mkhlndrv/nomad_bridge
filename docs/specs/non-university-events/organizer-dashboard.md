# SF3: Organizer Dashboard

**Feature:** [Non-University Events Organizer](overview.md)
**Prefix:** COM-DASH
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| COM-DASH-01 | Simple dashboard showing organizer's events with RSVP counts | Must |
| COM-DASH-02 | Attendee list per event with names and check-in status | Must |
| COM-DASH-03 | Quick actions: edit event, cancel event, send announcement to attendees | Must |
| COM-DASH-04 | Post-event: organizer can upload photos and materials (same as university events) | Should |

## Frontend Components

- `OrganizerDashboard` (Server) — Summary stats + list of organizer's events with RSVP counts
  - `OrganizerEventCard` (Client) — Extended card: RSVP count, expandable attendee list, quick actions (Edit, Cancel, Announce)
    - `AttendeeList` (Server) — Names (no emails) with check-in status toggle
      - `ManualCheckinToggle` (Client) — Toggle per attendee for manual check-in at non-university venues
    - `SendAnnouncementForm` (Client) — Modal to send message to all RSVPed attendees

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/dashboard` | GET | Organizer's events with attendee data (names, not emails) |
| `app/api/events/[id]/checkin` | POST | Manual check-in toggle (organizer only). Awards +5 trust to attendee |
| `app/api/events/[id]/announce` | POST | Send announcement to all RSVPed users (organizer only) |

*Note: Most event CRUD is shared with the Event Discovery & RSVP feature (see [event-discovery-rsvp-2026-03-31.md](../event-discovery-rsvp-2026-03-31.md)).*
