# Specification: Skill Exchange Board (Guest Lectures)

## Intent / Vibe

Create a two-sided marketplace that feels collaborative and professional — a place where universities can find the perfect guest speaker and nomads can share their expertise with eager students. The board should feel like a curated opportunity board, not a job listing site. Every interaction should feel purposeful: universities post what they need, nomads offer what they know, and the matching happens naturally through browse, invite, and apply flows.

## Core Requirements

### Two-Sided Board
- Two clear tabs at the top:
  - **"Requests from Universities"** — universities post what kind of speaker or workshop leader they need.
  - **"Offers from Nomads"** — nomads post sessions they can deliver.
- Both tabs show cards with key info at a glance.
- Combined "All Opportunities" view available as a third option.

### University Request Post
- Fields: topic/title, detailed description, preferred date range, expected audience size, format (talk, workshop, panel, Q&A), compensation type (paid, free, or facility access in exchange), university name, department, contact person.
- University admins can create, edit, and close their requests.
- Status indicator on each request: Open, In Discussion, Matched, Completed, Cancelled.

### Nomad Offer Post
- Fields: session title, short description, detailed topics covered, preferred format, estimated duration, compensation expectations, availability dates, relevant links (portfolio, LinkedIn, previous talks).
- Nomads can create, edit, and withdraw their offers.
- Skills tags from their profile auto-suggested when creating an offer.

### Matching & Application Flow
- Universities can **"Invite"** a nomad who has posted an offer — sends notification to the nomad.
- Nomads can **"Apply"** to a university request — sends notification to the university.
- When either action happens, both parties see the match in a "My Connections" section.
- Simple messaging: the invitation/application includes a short message from the sender.
- Status updates as the match progresses: Applied → In Discussion → Confirmed → Completed.

### Feedback System
- After a session is marked Completed, both sides can leave feedback.
- Rating: 1-5 stars + optional written comment.
- Nomad ratings contribute to their trust score (+3 per 4-5 star, -2 per 1-2 star rating).
- Feedback is visible on the nomad's profile (aggregated average + recent comments).

## Edge Cases & Constraints
- Requests and offers should only show future availability by default; past ones move to an archive.
- Prevent spam: limit to 3 new posts per user per week.
- Clear status lifecycle for each post: Open → In Discussion → Matched → Completed → Archived.
- Handle "facility access" compensation type — display it clearly, don't show a dollar amount.
- A nomad cannot apply to their own university's request (if they have a university role).
- Closed/cancelled posts should be clearly marked and non-interactive.

## Acceptance Criteria
- Universities and nomads can post and browse opportunities easily.
- Invite and Apply flows work with proper notifications.
- Feedback system updates trust scores correctly.
- Status transitions are enforced (can't skip from Open to Completed).
- Posts are filterable by topic, format, compensation type, and university.
- The interface is clean, responsive, and intuitive on mobile and desktop.
- All data is correctly persisted in the database.

## Definition of Done
- End-to-end flow works: post → browse → apply/invite → confirm → complete → feedback
- Responsive design on all devices
- Basic validation and error handling
- Trust score updates after feedback
- Post status lifecycle enforced
- Atomic commits used throughout implementation
