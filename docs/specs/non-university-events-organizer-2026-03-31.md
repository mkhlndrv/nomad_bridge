# Specification: Non-University Events Organizer

## Intent / Vibe

Not all valuable events happen inside university walls. Digital nomads organize meetups, workshops, skill-shares, and social gatherings at coworking spaces, cafes, and rooftops across Bangkok. NomadBridge should be the go-to platform for these community-organized events too — giving nomads the same smooth discovery and RSVP experience for grassroots events as for university ones. The vibe should feel empowering: "You have something to share? Host it here."

## Core Requirements

### SF1: Community Event Creation

| ID | Requirement | Priority |
|----|------------|----------|
| COM-CREATE-01 | Any verified nomad (email verified, trust score >= 10) can create a non-university event | Must |
| COM-CREATE-02 | Creation form: title, description, date & time, venue (free text), capacity (optional — 0 means unlimited), category, cover image, topic tags, whether it's free or paid | Must |
| COM-CREATE-03 | Events are tagged as "Community Event" to distinguish from university events in the feed | Must |
| COM-CREATE-04 | Creator becomes the organizer and can edit or cancel the event | Must |
| COM-CREATE-05 | Support 5 event types: Meetup, Workshop, Skill Share, Social, Coworking Session | Must |
| COM-CREATE-06 | Maximum 5 active (upcoming) events per organizer at a time to prevent spam | Must |

### SF2: Discovery Integration

| ID | Requirement | Priority |
|----|------------|----------|
| COM-DISC-01 | Non-university events appear in the main event feed alongside university events | Must |
| COM-DISC-02 | A "Community" filter lets users see only nomad-organized events | Must |
| COM-DISC-03 | Event cards show organizer name and trust score badge (builds accountability) | Must |
| COM-DISC-04 | Sorting: upcoming first, with highly-attended events bubbled up | Should |
| COM-DISC-05 | Same RSVP system as university events: one-click, capacity enforcement, QR code | Must |
| COM-DISC-06 | Organizer can see the attendee list with names (not emails — privacy) | Must |
| COM-DISC-07 | Organizer can check in attendees via a simple toggle (manual check-in for non-university venues) | Should |

### SF3: Organizer Dashboard

| ID | Requirement | Priority |
|----|------------|----------|
| COM-DASH-01 | Simple dashboard showing organizer's events with RSVP counts | Must |
| COM-DASH-02 | Attendee list per event with names and check-in status | Must |
| COM-DASH-03 | Quick actions: edit event, cancel event, send announcement to attendees | Must |
| COM-DASH-04 | Post-event: organizer can upload photos and materials (same as university events) | Should |

## Component Breakdown

### SF1: Community Event Creation

- `CommunityEventForm` (Client) — Full creation form: title, description, date/time, venue (free text), capacity, event type, category, cover image, tags, free/paid. Validates trust >= 10
  - `EventTypeSelector` (Client) — Visual selector for 5 types: Meetup, Workshop, Skill Share, Social, Coworking Session. Each with lucide icon
- `TrustGateMessage` (Server) — Shown when trust score < 10. Current score, requirement explanation, suggestions

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events` | POST (enhanced) | Community event creation: validate trust >= 10, active events <= 5, auto-set organizer attending |

### SF2: Discovery Integration

- `CommunityBadge` (Server) — Purple "Community Event" badge on event cards when `isCommunity` is true

**Backend routes:**

No dedicated routes — uses existing event feed API with `isCommunity` filter. See [event-discovery-rsvp-2026-03-31.md](event-discovery-rsvp-2026-03-31.md).

### SF3: Organizer Dashboard

- `OrganizerDashboard` (Server) — Summary stats + list of organizer's events with RSVP counts
  - `OrganizerEventCard` (Client) — Extended card: RSVP count, expandable attendee list, quick actions (Edit, Cancel, Announce)
    - `AttendeeList` (Server) — Names (no emails) with check-in status toggle
      - `ManualCheckinToggle` (Client) — Toggle per attendee for manual check-in at non-university venues
    - `SendAnnouncementForm` (Client) — Modal to send message to all RSVPed attendees

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/dashboard` | GET | Organizer's events with attendee data (names, not emails) |
| `app/api/events/[id]/checkin` | POST | Manual check-in toggle (organizer only). Awards +5 trust to attendee |
| `app/api/events/[id]/announce` | POST | Send announcement to all RSVPed users (organizer only) |

*Note: Most event CRUD is shared with the Event Discovery & RSVP feature (see [event-discovery-rsvp-2026-03-31.md](event-discovery-rsvp-2026-03-31.md)).*

## Edge Cases & Constraints
- Minimum trust score to create events prevents spam/abuse from brand-new accounts.
- Events with inappropriate content: admin can flag and hide events (moderation).
- Cancelled events notify all RSVPed attendees automatically.
- No-show tracking for community events: optional (organizer can mark check-ins, but it's not required).
- Organizer cannot RSVP to their own event (they're automatically counted as attending).
- Maximum 5 active (upcoming) events per organizer at a time to prevent spam.
- Past community events remain browsable in an archive.

## Acceptance Criteria
- Verified nomads can create community events through a simple form [COM-CREATE-01, COM-CREATE-02]
- Community events appear in the main feed with "Community Event" badge [COM-DISC-01, COM-CREATE-03]
- RSVP flow works identically to university events [COM-DISC-05]
- Organizer dashboard shows event management tools [COM-DASH-01, COM-DASH-02]
- Community filter works correctly in the event feed [COM-DISC-02]
- Events have proper type categorization (Meetup, Workshop, etc.) [COM-CREATE-05]
- Cancellation notifies all attendees
- Responsive design on mobile and desktop

## Definition of Done
- Event creation form works end-to-end
- Community events integrated into main feed with proper badges
- Organizer dashboard functional with attendee management
- RSVP and QR code generation works for community events
- Trust score gate prevents unverified users from creating events
- Responsive design on all devices
- Atomic commits used throughout implementation
