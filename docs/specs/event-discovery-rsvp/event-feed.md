# SF1: Event Feed & Discovery

**Feature:** [University Event Discovery & RSVP](overview.md)
**Prefix:** EVT-FEED
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-FEED-01 | Show a clean, scrollable feed of upcoming events sorted by date | Must |
| EVT-FEED-02 | Each event card displays: title, date & time (Bangkok timezone), university name, venue, short description, topic tags, RSVP count vs capacity, and a thumbnail image | Must |
| EVT-FEED-03 | Support filtering by: university, date range, event category (workshop, seminar, social, sports, cultural), and topic tags | Must |
| EVT-FEED-04 | Search by keyword across titles, descriptions, and tags | Should |
| EVT-FEED-05 | Events from all universities appear in one unified feed | Must |
| EVT-FEED-06 | Full event information: description, schedule, speakers (if any), location with map placeholder, university branding | Must |
| EVT-FEED-07 | Clear capacity indicator ("12/50 spots remaining") with visual progress bar | Must |
| EVT-FEED-08 | Prominent "RSVP Now" button — changes to "Cancel RSVP" if already registered | Must |
| EVT-FEED-09 | Photo gallery section showing event images or uploaded board photos | Should |
| EVT-FEED-10 | Post-event materials section (visible after event date passes) | Should |

## Frontend Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `EventFeed` | Server | Fetches and renders paginated event list with filters |
|   `EventFilterBar` | Client | University dropdown, category pills, date range, search. Updates URL params |
|   `EventCard` | Server | Event summary card: thumbnail, title, date, university, venue, tags, capacity bar. Links to detail |
|     `CapacityBar` | Server | Visual progress bar: RSVP count vs capacity (shared UI component) |
|   `EventBoardUpload` | Client | Camera/upload button on the event feed for onsite event board photos |

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events` | GET | List events with pagination, filtering (category, university, search, date), sort by date |
| `app/api/events` | POST | Create event. Validate capacity > 0, future date. Community events: check trust >= 10, active <= 5 |
| `app/api/events/[id]` | GET | Single event with creator, RSVPs, materials, photos. Compute `isRsvped` for current user |
| `app/api/events/[id]` | PATCH | Update event (organizer/admin only) |
