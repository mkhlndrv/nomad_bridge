# Specification: Non-University Events Organizer

## Intent / Vibe

Not all valuable events happen inside university walls. Digital nomads organize meetups, workshops, skill-shares, and social gatherings at coworking spaces, cafes, and rooftops across Bangkok. NomadBridge should be the go-to platform for these community-organized events too — giving nomads the same smooth discovery and RSVP experience for grassroots events as for university ones. The vibe should feel empowering: "You have something to share? Host it here."

## Sub-Features

- [SF1: Community Event Creation](event-creation.md)
- [SF2: Discovery Integration](discovery-integration.md)
- [SF3: Organizer Dashboard](organizer-dashboard.md)

## Page Components

### SF1: Community Event Creation

- `CommunityEventForm` (Client) — Full creation form: title, description, date/time, venue (free text), capacity, event type, category, cover image, tags, free/paid. Validates trust >= 10
  - `EventTypeSelector` (Client) — Visual selector for 5 types: Meetup, Workshop, Skill Share, Social, Coworking Session. Each with lucide icon
- `TrustGateMessage` (Server) — Shown when trust score < 10. Current score, requirement explanation, suggestions

### SF2: Discovery Integration

- `CommunityBadge` (Server) — Purple "Community Event" badge on event cards when `isCommunity` is true

### SF3: Organizer Dashboard

- `OrganizerDashboard` (Server) — Summary stats + list of organizer's events with RSVP counts
  - `OrganizerEventCard` (Client) — Extended card: RSVP count, expandable attendee list, quick actions (Edit, Cancel, Announce)
    - `AttendeeList` (Server) — Names (no emails) with check-in status toggle
      - `ManualCheckinToggle` (Client) — Toggle per attendee for manual check-in at non-university venues
    - `SendAnnouncementForm` (Client) — Modal to send message to all RSVPed attendees

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
