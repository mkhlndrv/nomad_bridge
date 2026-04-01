# SF1: Community Event Creation

**Feature:** [Non-University Events Organizer](overview.md)
**Prefix:** COM-CREATE

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| COM-CREATE-01 | Any verified nomad (email verified, trust score >= 10) can create a non-university event | Must |
| COM-CREATE-02 | Creation form: title, description, date & time, venue (free text), capacity (optional — 0 means unlimited), category, cover image, topic tags, whether it's free or paid | Must |
| COM-CREATE-03 | Events are tagged as "Community Event" to distinguish from university events in the feed | Must |
| COM-CREATE-04 | Creator becomes the organizer and can edit or cancel the event | Must |
| COM-CREATE-05 | Support 5 event types: Meetup, Workshop, Skill Share, Social, Coworking Session | Must |
| COM-CREATE-06 | Maximum 5 active (upcoming) events per organizer at a time to prevent spam | Must |

## Frontend Components

- `CommunityEventForm` (Client) — Full creation form: title, description, date/time, venue (free text), capacity, event type, category, cover image, tags, free/paid. Validates trust >= 10
  - `EventTypeSelector` (Client) — Visual selector for 5 types: Meetup, Workshop, Skill Share, Social, Coworking Session. Each with lucide icon
- `TrustGateMessage` (Server) — Shown when trust score < 10. Current score, requirement explanation, suggestions

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events` | POST (enhanced) | Community event creation: validate trust >= 10, active events <= 5, auto-set organizer attending |
