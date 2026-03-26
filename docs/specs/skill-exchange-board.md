# Specification: Skill Exchange Board (Guest Lectures)

## Intent / Vibe
Create a simple, two-sided marketplace where universities can request guest speakers and digital nomads can offer their expertise. The board should feel collaborative, professional, and easy to navigate — encouraging meaningful knowledge exchange between nomads and academic institutions.

## Core Requirements

### Two-Sided Board
- Two clear tabs/sections:
  - "Requests from Universities" — universities post what kind of speaker they need.
  - "Offers from Nomads" — nomads post sessions they can deliver.

### University Request Post
- Fields: Topic/title, preferred date range, expected audience size, format (talk, workshop, panel), compensation type (paid, free, or facility access in exchange), contact details.
- University admins can create and manage their requests.

### Nomad Offer Post
- Fields: Session title, short description, topics covered, preferred format, duration, compensation expectations.
- Nomads can create and manage their offers.

### Matching & Application Flow
- Users can browse both requests and offers.
- Universities can "Invite" a nomad offer.
- Nomads can "Apply" to a university request.
- When someone applies or invites, both parties get a notification and can start a conversation through the platform.

### Feedback System
- After a guest lecture session is completed, both sides can leave a simple 1-5 star rating + optional comment.
- Ratings contribute to the nomad’s trust score.

## Edge Cases & Constraints
- Requests and offers should only show future availability.
- Prevent spam by limiting how many posts a user can create per week (basic rate limiting).
- Clear status for each post (Open, In Discussion, Completed, Cancelled).
- Handle cases where compensation is "facility access" instead of money.

## Acceptance Criteria
- Universities and nomads can easily post and browse opportunities.
- Application/Invitation flow works smoothly with notifications.
- Feedback system updates the nomad’s trust score correctly.
- The interface is clean, responsive, and intuitive on both mobile and desktop.
- All data is properly saved in the database.

## Definition of Done
- End-to-end flow works (post → browse → apply/invite → feedback)
- Responsive design
- Basic validation and error handling
- Trust score logic is correctly updated after feedback
- Atomic commits used during implementation
- Specification reviewed and refined if needed

This specification focuses on clear intent, user experience, and business rules so that Claude Code can implement a functional and user-friendly skill exchange board.
