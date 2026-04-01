# University Event Discovery & RSVP

## Intent / Vibe

Create a welcoming, effortless experience where digital nomads can discover academic events at Bangkok universities, RSVP with one click, and stay connected after the event through materials and recordings. The discovery flow should feel like scrolling a curated feed — relevant, visual, and fast. Nomads should also be able to snap a photo of a physical event board on campus and have the platform extract event details automatically — bridging the gap between offline bulletin boards and digital discovery.

## Sub-Features

- [SF1: Event Feed & Discovery](event-feed.md)
- [SF2: RSVP System](rsvp-system.md)
- [SF3: Event Photo Upload](event-photos.md)
- [SF4: Post-Event Materials](post-event-materials.md)

## Page Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `EventDetail` | Server | Full event layout: hero image, description, schedule, speakers, capacity bar, RSVP button, photos, materials. Composes SF2-SF4 components |

## Edge Cases & Constraints

- Events in the past should not allow RSVP but should remain browsable with a "Past Event" badge.
- Events with zero capacity should display "Registration Closed."
- Handle users who are already registered — show "You're registered" state.
- Show appropriate empty states: "No upcoming events," "No results for your filters."
- Gracefully handle network or server errors with retry suggestions.
- Photo uploads should be limited in size (max 5MB) and format (JPEG, PNG).
- Draft events from photo uploads require admin approval before appearing in the feed.

## Acceptance Criteria

- Users can browse and filter events without being logged in [EVT-FEED-01, EVT-FEED-03]
- Logged-in users can RSVP with immediate visual feedback (button state change, count update) [EVT-RSVP-01, EVT-RSVP-03]
- Capacity is strictly enforced — no over-registration [EVT-RSVP-02, EVT-RSVP-04]
- RSVP data is correctly saved and rsvpCount stays in sync [EVT-RSVP-02, EVT-RSVP-05]
- Photo upload flow works end-to-end: capture, upload, display on event [EVT-PHOTO-01, EVT-PHOTO-03]
- Post-event materials are uploadable by organizers and visible to attendees [EVT-MAT-01, EVT-MAT-03]
- The interface is fully responsive on mobile and desktop
- All error messages are clear and actionable

## Definition of Done

- Feature works end-to-end in development
- Fully responsive design (mobile-first)
- Basic error handling and user feedback
- RSVP logic uses Prisma $transaction to keep counts in sync
- Photo upload stores images and associates them with events
- Post-event materials are uploadable and downloadable
- At least one atomic commit per major part
