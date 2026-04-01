# SF4: Viewing Experience

**Feature:** [Manage Recordings (tl;dv)](overview.md)
**Prefix:** REC-VIEW

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| REC-VIEW-01 | Clean, focused player page with video/audio player (embedded tl;dv, YouTube, or native player) | Must |
| REC-VIEW-02 | Transcript panel alongside the player (synced scrolling if tl;dv) | Should |
| REC-VIEW-03 | Key highlights/chapters for quick navigation | Should |
| REC-VIEW-04 | Event context: link back to the event page, speaker info, related materials | Must |
| REC-VIEW-05 | Note-taking: users can add personal timestamped notes while watching | Could |
| REC-VIEW-06 | Recordings from public events are visible to all users | Must |
| REC-VIEW-07 | Recordings from restricted events are only visible to attendees (RSVPed users) | Must |
| REC-VIEW-08 | University-affiliated recordings may require being logged in | Should |

## Frontend Components

| Component | Type | Description |
|-----------|------|-------------|
| `RecordingPlayer` | Client | Renders embed by source type: tl;dv iframe, YouTube iframe, Vimeo iframe, or native HTML5 video |
| `TranscriptPanel` | Client | Side panel (desktop) / below-player (mobile). Searchable transcript. Timestamped segments clickable to seek |
| `HighlightTimeline` | Client | Horizontal bar with clickable key moment markers |
| `PersonalNotes` | Client | Timestamped note-taking while watching. Notes saved per user per recording |

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings/[id]` | GET | Single recording with event context. Increment view count. Access control check |
| `app/api/recordings/[id]` | PATCH | Update metadata/visibility/sort order (organizer only) |
| `app/api/recordings/[id]/notes` | GET/POST | User's personal timestamped notes for a recording |
| `app/api/recordings/[id]/transcript` | PATCH | Edit/correct transcript (organizer only) |
