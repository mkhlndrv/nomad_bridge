# Specification: Non-University Events Organizer

## Intent / Vibe

Not all valuable events happen inside university walls. Digital nomads organize meetups, workshops, skill-shares, and social gatherings at coworking spaces, cafes, and rooftops across Bangkok. NomadBridge should be the go-to platform for these community-organized events too — giving nomads the same smooth discovery and RSVP experience for grassroots events as for university ones. The vibe should feel empowering: "You have something to share? Host it here."

## Core Requirements

### Event Creation by Nomads
- Any verified nomad (email verified, trust score ≥ 10) can create a non-university event.
- Creation form: title, description, date & time, venue (free text — could be a cafe, park, coworking space), capacity (optional — 0 means unlimited), category, cover image, topic tags, whether it's free or paid.
- Events are tagged as "Community Event" to distinguish them from university events in the feed.
- Creator becomes the organizer and can edit or cancel the event.

### Event Types
- **Meetup** — casual social gathering ("Bangkok Nomad Coffee Morning").
- **Workshop** — hands-on learning session ("Intro to Thai Cooking for Nomads").
- **Skill Share** — informal knowledge exchange ("30-min Lightning Talks").
- **Social** — parties, dinners, sports ("Friday Rooftop Volleyball").
- **Coworking Session** — scheduled group work ("Silent Focus Session at Hubba").

### Discovery Integration
- Non-university events appear in the main event feed alongside university events.
- A "Community" filter lets users see only nomad-organized events.
- Event cards show organizer name and trust score badge (builds accountability).
- Sorting: upcoming first, with highly-attended events bubbled up.

### RSVP & Attendance
- Same RSVP system as university events: one-click, capacity enforcement, QR code.
- Organizer can see the attendee list with names (not emails — privacy).
- Organizer can check in attendees via a simple toggle (manual check-in for non-university venues that don't have QR scanners).

### Organizer Dashboard
- Simple dashboard for event creators showing:
  - Their events with RSVP counts.
  - Attendee list per event.
  - Quick actions: edit event, cancel event, send announcement to attendees.
- Post-event: organizer can upload photos and materials (same as university events).

## Edge Cases & Constraints
- Minimum trust score to create events prevents spam/abuse from brand-new accounts.
- Events with inappropriate content: admin can flag and hide events (moderation).
- Cancelled events notify all RSVPed attendees automatically.
- No-show tracking for community events: optional (organizer can mark check-ins, but it's not required).
- Organizer cannot RSVP to their own event (they're automatically counted as attending).
- Maximum 5 active (upcoming) events per organizer at a time to prevent spam.
- Past community events remain browsable in an archive.

## Acceptance Criteria
- Verified nomads can create community events through a simple form.
- Community events appear in the main feed with "Community Event" badge.
- RSVP flow works identically to university events.
- Organizer dashboard shows event management tools.
- Community filter works correctly in the event feed.
- Events have proper type categorization (Meetup, Workshop, etc.).
- Cancellation notifies all attendees.
- Responsive design on mobile and desktop.

## Definition of Done
- Event creation form works end-to-end
- Community events integrated into main feed with proper badges
- Organizer dashboard functional with attendee management
- RSVP and QR code generation works for community events
- Trust score gate prevents unverified users from creating events
- Responsive design on all devices
- Atomic commits used throughout implementation
