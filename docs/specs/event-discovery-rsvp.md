# Specification: University Event Discovery & RSVP

## Intent / Vibe
Create a welcoming and easy-to-use experience where digital nomads can quickly discover interesting academic events happening at universities in Bangkok, understand the details, and RSVP with confidence. The flow should feel smooth, informative, and trustworthy.

## Core Requirements

### Event Listing Feed
- Show a clean, scrollable feed of upcoming events.
- Each event card displays: title, date & time (Bangkok timezone), university name, venue, short description, topic tags, and current RSVP count vs capacity.
- Support filtering and searching by: university, date range, topic tags, and language.

### Event Detail Page
- Full event information including detailed description, schedule, speakers (if any), and location map placeholder.
- Clear display of remaining capacity.
- Prominent "RSVP Now" button.

### RSVP System
- One-click RSVP for authenticated users.
- Enforce capacity limits: if space is available, register the user; if full, add them to a waitlist with a clear message.
- After successful RSVP, show confirmation and generate a simple QR code as a check-in pass.
- Prevent users from RSVPing multiple times to the same event.

### Post-Event Materials
- Organizers can upload slides or recordings after the event.
- Attendees get notified when materials become available.
- Materials are shown on the event page and are searchable.

## Edge Cases & Constraints
- Events in the past should not allow RSVP.
- Events with zero capacity should be clearly marked.
- Handle users who are already registered.
- Show appropriate empty states (no upcoming events, no results after filtering).
- Gracefully handle network or server errors.

## Acceptance Criteria
- Users can browse and filter events without being logged in.
- Logged-in users can successfully RSVP with proper visual feedback.
- Capacity is strictly enforced.
- RSVP data is correctly saved in the database.
- The interface is fully responsive on mobile and desktop.
- All error messages are clear and helpful.

## Definition of Done
- Feature works end-to-end in development
- Fully responsive design
- Basic error handling and user feedback
- RSVP logic correctly updates the database
- At least one atomic commit per major part
- Specification reviewed and refined if needed

This specification focuses on clear intent and detailed requirements so an agent can implement it effectively.