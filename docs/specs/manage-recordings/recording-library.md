# SF3: Recording Library

**Feature:** [Manage Recordings (tl;dv)](overview.md)
**Prefix:** REC-LIB
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| REC-LIB-01 | Dedicated "Recordings" page showing all available recordings across events | Must |
| REC-LIB-02 | Each recording card: event title, speaker name, duration, date, thumbnail, tags | Must |
| REC-LIB-03 | Filter by: university, event category, speaker, date range | Must |
| REC-LIB-04 | Search across recording titles, descriptions, and transcripts | Should |
| REC-LIB-05 | Sort by: most recent (default), most viewed | Should |

## Frontend Components

| Component | Type | Description |
|-----------|------|-------------|
| `RecordingLibrary` | Server | Grid of recording cards with filter bar, search, sort dropdown, pagination |
| `RecordingFilterBar` | Client | Filters: university, event category, speaker, date range. Transcript search toggle |
| `RecordingCard` | Server | Thumbnail, event title, speaker, duration, date, view count, visibility badge, tags |

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings` | GET | List with filters. Respect visibility (PUBLIC=all, ATTENDEES_ONLY=check RSVP, UNLISTED=direct link only). Search includes transcripts. Paginated |

## Precision Clarifications

- **Sort options (REC-LIB-05):** Two sort options only: "Most Recent" (`createdAt` DESC, default) and "Most Viewed" (`viewCount` DESC). There is no rating feature for recordings — "highest rated" was removed
- **View count:** Incremented by 1 each time `GET /api/recordings/[id]` is called (when the recording detail page loads). Simple increment, no per-user deduplication. Handled in the same database query that fetches the recording detail
- **Visibility enforcement:** PUBLIC recordings are visible to all. ATTENDEES_ONLY requires checking if the requesting user has an EventRsvp for the recording's event. UNLISTED recordings are accessible only via direct URL (not shown in library listings)
