# SF2: Discovery Integration

**Feature:** [Non-University Events Organizer](overview.md)
**Prefix:** COM-DISC

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| COM-DISC-01 | Non-university events appear in the main event feed alongside university events | Must |
| COM-DISC-02 | A "Community" filter lets users see only nomad-organized events | Must |
| COM-DISC-03 | Event cards show organizer name and trust score badge (builds accountability) | Must |
| COM-DISC-04 | Sorting: upcoming first, with highly-attended events bubbled up | Should |
| COM-DISC-05 | Same RSVP system as university events: one-click, capacity enforcement, QR code | Must |
| COM-DISC-06 | Organizer can see the attendee list with names (not emails — privacy) | Must |
| COM-DISC-07 | Organizer can check in attendees via a simple toggle (manual check-in for non-university venues) | Should |

## Frontend Components

- `CommunityBadge` (Server) — Purple "Community Event" badge on event cards when `isCommunity` is true

## API Routes

No dedicated routes — uses existing event feed API with `isCommunity` filter. See [event-discovery-rsvp-2026-03-31.md](../event-discovery-rsvp-2026-03-31.md).
