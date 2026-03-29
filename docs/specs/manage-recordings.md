# Specification: Manage Recordings (tl;dv Integration)

## Intent / Vibe

Knowledge shared at events and guest lectures shouldn't disappear when the session ends. NomadBridge should make it effortless to capture, organize, and share recordings from live events and webinars — so nomads who couldn't attend can still learn, and organizers can build a library of valuable content. Integration with tl;dv brings automatic transcription and highlights, turning raw recordings into searchable, skimmable knowledge. The experience should feel like having a personal note-taker at every event.

## Core Requirements

### Recording Management
- Event organizers and guest lecturers can link or upload recordings to their events.
- Supported sources:
  - **tl;dv** (primary integration): paste a tl;dv recording link → platform fetches metadata (title, duration, thumbnail, transcript).
  - **YouTube/Vimeo links**: embed player on the event page.
  - **Direct upload**: MP4/MP3 files up to 500MB (for sessions without a streaming platform).
- Each event can have multiple recordings (e.g., main talk + Q&A + workshop breakout).

### tl;dv Integration
- When a tl;dv link is pasted, automatically pull:
  - Recording title and duration.
  - Transcript (full text).
  - AI-generated summary and key highlights.
  - Thumbnail image.
- Display tl;dv player embed on the event page.
- Transcript is searchable within NomadBridge (users can search across all event transcripts).
- Key highlights/moments are shown as a timeline with clickable timestamps.

### Recording Library
- Dedicated "Recordings" page showing all available recordings across events.
- Each recording card: event title, speaker name, duration, date, thumbnail, tags.
- Filter by: university, event category, speaker, date range.
- Search across recording titles, descriptions, and transcripts.
- Sort by: most recent, most viewed, highest rated.

### Viewing Experience
- Clean, focused player page with:
  - Video/audio player (embedded tl;dv, YouTube, or native player).
  - Transcript panel alongside the player (synced scrolling if tl;dv).
  - Key highlights/chapters for quick navigation.
  - Event context: link back to the event page, speaker info, related materials.
- Note-taking: users can add personal timestamped notes while watching.

### Access Control
- Recordings from public events are visible to all users.
- Recordings from restricted events are only visible to attendees (RSVPed users).
- Organizers control visibility: Public, Attendees Only, or Unlisted (link-only).
- University-affiliated recordings may require being logged in.

## Component Breakdown

### Frontend UI Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `RecordingLibrary` | Server | Grid of recording cards with filter bar, search, sort dropdown, pagination |
| `RecordingFilterBar` | Client | Filters: university, event category, speaker, date range. Transcript search toggle |
| `RecordingCard` | Server | Thumbnail, event title, speaker, duration, date, view count, visibility badge, tags |
| `RecordingPlayer` | Client | Renders embed by source type: tl;dv iframe, YouTube iframe, Vimeo iframe, or native HTML5 video |
| `TranscriptPanel` | Client | Side panel (desktop) / below-player (mobile). Searchable transcript. Timestamped segments clickable to seek |
| `HighlightTimeline` | Client | Horizontal bar with clickable key moment markers |
| `RecordingUploadForm` | Client | Three tabs: "tl;dv Link", "YouTube/Vimeo", "Upload File". Visibility selector |
| `TldvLinkInput` | Client | Paste tl;dv URL → fetch metadata preview (title, duration, transcript, thumbnail) |
| `VideoUrlInput` | Client | Paste YouTube/Vimeo URL → validate → show embedded preview |
| `FileUploadInput` | Client | Large file upload with progress bar, cancel, resume. 500MB limit, MP4/MP3 |
| `VisibilitySelector` | Client | Dropdown: Public (Globe icon), Attendees Only (Lock), Unlisted (Link) |
| `EventRecordingsSection` | Server | Section on event detail page listing recordings. "Add Recording" for organizer. Access control |
| `PersonalNotes` | Client | Timestamped note-taking while watching. Notes saved per user per recording |
| `RecordingAccessGate` | Server | Shown when user lacks permission. Message + link to event page |

### Backend Logic Components / API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings` | GET | List with filters. Respect visibility (PUBLIC=all, ATTENDEES_ONLY=check RSVP, UNLISTED=direct link only). Search includes transcripts. Paginated |
| `app/api/recordings` | POST | Create recording linked to event (organizer/lecturer only). Validate source type + URL |
| `app/api/recordings/[id]` | GET | Single recording with event context. Increment view count. Access control check |
| `app/api/recordings/[id]` | PATCH | Update metadata/visibility/sort order (organizer only) |
| `app/api/recordings/[id]` | DELETE | Delete recording (organizer/admin only) |
| `app/api/recordings/tldv-metadata` | POST | Fetch metadata from tl;dv link. Mock for MVP: return placeholder data |
| `app/api/recordings/upload` | POST | Handle direct file upload (multipart). 500MB, MP4/MP3. Store in public/uploads |
| `app/api/recordings/[id]/notes` | GET/POST | User's personal timestamped notes for a recording |
| `app/api/recordings/[id]/transcript` | PATCH | Edit/correct transcript (organizer only) |

## Edge Cases & Constraints
- tl;dv API may be unavailable — gracefully fall back to displaying just the link.
- Large video uploads need progress indication and resume-on-failure support.
- Transcripts may contain errors — allow organizers to edit/correct transcripts.
- Handle recordings for events that were cancelled (keep recording if already uploaded, hide event context).
- If a recording source link becomes invalid (deleted video), show a "Recording unavailable" message.
- Multiple recordings per event should be ordered by the organizer (drag-and-drop ordering).
- For MVP: tl;dv integration can be mock/simulated (paste link → display embed + placeholder transcript).

## Acceptance Criteria
- Organizers can add recordings to events via link or upload.
- tl;dv links display embedded player with transcript and highlights (or mock equivalent).
- Recording library page shows all recordings with filtering and search.
- Transcript search works across all event recordings.
- Access control respects visibility settings.
- Player page provides a clean viewing experience with event context.
- The interface is responsive on mobile (player stacks above transcript) and desktop (side-by-side).

## Definition of Done
- Recording upload/link flow works for tl;dv, YouTube, and direct upload
- Recording library page with filtering, search, and sorting
- tl;dv integration fetches metadata and displays transcript (mock OK for MVP)
- Access control enforced per recording
- Player page with transcript and navigation
- Responsive design on all devices
- Atomic commits per major subsystem (upload, library, player, tl;dv)
