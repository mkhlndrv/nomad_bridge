# Specification: University Event Discovery & RSVP

## Intent / Vibe

Create a welcoming, effortless experience where digital nomads can discover academic events at Bangkok universities, RSVP with one click, and stay connected after the event through materials and recordings. The discovery flow should feel like scrolling a curated feed — relevant, visual, and fast. Nomads should also be able to snap a photo of a physical event board on campus and have the platform extract event details automatically — bridging the gap between offline bulletin boards and digital discovery.

## Core Requirements

### Event Listing Feed
- Show a clean, scrollable feed of upcoming events sorted by date.
- Each event card displays: title, date & time (Bangkok timezone), university name, venue, short description, topic tags, RSVP count vs capacity, and a thumbnail image.
- Support filtering by: university, date range, event category (workshop, seminar, social, sports, cultural), and topic tags.
- Search by keyword across titles, descriptions, and tags.
- Events from all universities appear in one unified feed.

### Event Detail Page
- Full event information: description, schedule, speakers (if any), location with map placeholder, university branding.
- Clear capacity indicator ("12/50 spots remaining") with visual progress bar.
- Prominent "RSVP Now" button — changes to "Cancel RSVP" if already registered.
- Photo gallery section showing event images or uploaded board photos.
- Post-event materials section (visible after event date passes).

### RSVP System
- One-click RSVP for authenticated users.
- Enforce capacity limits strictly: if space available, register immediately; if full, offer waitlist with position number.
- After successful RSVP, show confirmation and generate a simple QR code as a check-in pass.
- Prevent duplicate RSVPs (database-level unique constraint on userId + eventId).
- Allow users to cancel their RSVP, which decrements the count and promotes the next waitlisted person.

### Photo Upload of Onsite Event Boards
- Nomads can take a photo of a physical university event board/poster and upload it.
- The platform stores the image and creates a draft event from it (manually filled in by the uploader or admin).
- Photos are displayed on the event detail page as a reference for the original announcement.
- Simple upload flow: camera button on the event feed → snap/upload → tag with university → submit.

### Post-Event Materials
- Organizers can upload slides, PDFs, recordings, or links after the event.
- Attendees receive a notification when materials are posted.
- Materials are listed on the event detail page with file type icons and download links.
- Materials are searchable by event title and tags.

## Edge Cases & Constraints
- Events in the past should not allow RSVP but should remain browsable with a "Past Event" badge.
- Events with zero capacity should display "Registration Closed."
- Handle users who are already registered — show "You're registered" state.
- Show appropriate empty states: "No upcoming events," "No results for your filters."
- Gracefully handle network or server errors with retry suggestions.
- Photo uploads should be limited in size (max 5MB) and format (JPEG, PNG).
- Draft events from photo uploads require admin approval before appearing in the feed.

## Acceptance Criteria
- Users can browse and filter events without being logged in.
- Logged-in users can RSVP with immediate visual feedback (button state change, count update).
- Capacity is strictly enforced — no over-registration.
- RSVP data is correctly saved and rsvpCount stays in sync.
- Photo upload flow works end-to-end: capture → upload → display on event.
- Post-event materials are uploadable by organizers and visible to attendees.
- The interface is fully responsive on mobile and desktop.
- All error messages are clear and actionable.

## Definition of Done
- Feature works end-to-end in development
- Fully responsive design (mobile-first)
- Basic error handling and user feedback
- RSVP logic uses Prisma $transaction to keep counts in sync
- Photo upload stores images and associates them with events
- Post-event materials are uploadable and downloadable
- At least one atomic commit per major part
