# Specification: Manage Recordings (tl;dv Integration)

## Intent / Vibe

Knowledge shared at events and guest lectures shouldn't disappear when the session ends. NomadBridge should make it effortless to capture, organize, and share recordings from live events and webinars — so nomads who couldn't attend can still learn, and organizers can build a library of valuable content. Integration with tl;dv brings automatic transcription and highlights, turning raw recordings into searchable, skimmable knowledge. The experience should feel like having a personal note-taker at every event.

## Core Requirements

### SF1: Recording Upload & Linking

| ID | Requirement | Priority |
|----|------------|----------|
| REC-UPLOAD-01 | Event organizers and guest lecturers can link or upload recordings to their events | Must |
| REC-UPLOAD-02 | Supported source: tl;dv (primary integration) — paste a tl;dv recording link, platform fetches metadata | Must |
| REC-UPLOAD-03 | Supported source: YouTube/Vimeo links — embed player on the event page | Must |
| REC-UPLOAD-04 | Supported source: Direct upload — MP4/MP3 files up to 500MB | Should |
| REC-UPLOAD-05 | Each event can have multiple recordings (e.g., main talk + Q&A + workshop breakout) | Must |
| REC-UPLOAD-06 | Organizers control visibility: Public, Attendees Only, or Unlisted (link-only) | Must |

### SF2: tl;dv Integration

| ID | Requirement | Priority |
|----|------------|----------|
| REC-TLDV-01 | When a tl;dv link is pasted, automatically pull: recording title, duration, transcript, AI-generated summary, key highlights, thumbnail image | Must |
| REC-TLDV-02 | Display tl;dv player embed on the event page | Must |
| REC-TLDV-03 | Transcript is searchable within NomadBridge (users can search across all event transcripts) | Should |
| REC-TLDV-04 | Key highlights/moments are shown as a timeline with clickable timestamps | Should |
| REC-TLDV-05 | For MVP: tl;dv integration can be mock/simulated (paste link, display embed + placeholder transcript) | Must |

### SF3: Recording Library

| ID | Requirement | Priority |
|----|------------|----------|
| REC-LIB-01 | Dedicated "Recordings" page showing all available recordings across events | Must |
| REC-LIB-02 | Each recording card: event title, speaker name, duration, date, thumbnail, tags | Must |
| REC-LIB-03 | Filter by: university, event category, speaker, date range | Must |
| REC-LIB-04 | Search across recording titles, descriptions, and transcripts | Should |
| REC-LIB-05 | Sort by: most recent, most viewed, highest rated | Should |

### SF4: Viewing Experience

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

## Component Breakdown

### SF1: Recording Upload & Linking

- `RecordingUploadForm` (Client) — Three tabs: "tl;dv Link", "YouTube/Vimeo", "Upload File". Visibility selector
  - `TldvLinkInput` (Client) — Paste tl;dv URL, fetch metadata preview (title, duration, transcript, thumbnail)
  - `VideoUrlInput` (Client) — Paste YouTube/Vimeo URL, validate, show embedded preview
  - `FileUploadInput` (Client) — Large file upload with progress bar, cancel, resume. 500MB limit, MP4/MP3
  - `VisibilitySelector` (Client) — Dropdown: Public (Globe icon), Attendees Only (Lock), Unlisted (Link)
- `EventRecordingsSection` (Server) — Section on event detail page listing recordings. "Add Recording" for organizer
  - `RecordingAccessGate` (Server) — Shown when user lacks permission. Message + link to event page

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings` | POST | Create recording linked to event (organizer/lecturer only). Validate source type + URL |
| `app/api/recordings/upload` | POST | Handle direct file upload (multipart). 500MB, MP4/MP3. Store in public/uploads |
| `app/api/recordings/[id]` | DELETE | Delete recording (organizer/admin only) |

### SF2: tl;dv Integration

No dedicated frontend components — `TldvLinkInput` (SF1) handles input, `RecordingPlayer` (SF4) handles display.

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings/tldv-metadata` | POST | Fetch metadata from tl;dv link. Mock for MVP: return placeholder data |

### SF3: Recording Library

- `RecordingLibrary` (Server) — Grid of recording cards with filter bar, search, sort dropdown, pagination
  - `RecordingFilterBar` (Client) — Filters: university, event category, speaker, date range. Transcript search toggle
  - `RecordingCard` (Server) — Thumbnail, event title, speaker, duration, date, view count, visibility badge, tags

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings` | GET | List with filters. Respect visibility (PUBLIC=all, ATTENDEES_ONLY=check RSVP, UNLISTED=direct link only). Search includes transcripts. Paginated |

### SF4: Viewing Experience

- `RecordingPlayer` (Client) — Renders embed by source type: tl;dv iframe, YouTube iframe, Vimeo iframe, or native HTML5 video
- `TranscriptPanel` (Client) — Side panel (desktop) / below-player (mobile). Searchable transcript. Timestamped segments clickable to seek
- `HighlightTimeline` (Client) — Horizontal bar with clickable key moment markers
- `PersonalNotes` (Client) — Timestamped note-taking while watching. Notes saved per user per recording

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings/[id]` | GET | Single recording with event context. Increment view count. Access control check |
| `app/api/recordings/[id]` | PATCH | Update metadata/visibility/sort order (organizer only) |
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
- Organizers can add recordings to events via link or upload [REC-UPLOAD-01, REC-UPLOAD-02, REC-UPLOAD-03]
- tl;dv links display embedded player with transcript and highlights (or mock equivalent) [REC-TLDV-01, REC-TLDV-02, REC-TLDV-05]
- Recording library page shows all recordings with filtering and search [REC-LIB-01, REC-LIB-03]
- Transcript search works across all event recordings [REC-TLDV-03]
- Access control respects visibility settings [REC-UPLOAD-06, REC-VIEW-06, REC-VIEW-07]
- Player page provides a clean viewing experience with event context [REC-VIEW-01, REC-VIEW-04]
- The interface is responsive on mobile (player stacks above transcript) and desktop (side-by-side)

## Definition of Done
- Recording upload/link flow works for tl;dv, YouTube, and direct upload
- Recording library page with filtering, search, and sorting
- tl;dv integration fetches metadata and displays transcript (mock OK for MVP)
- Access control enforced per recording
- Player page with transcript and navigation
- Responsive design on all devices
- Atomic commits per major subsystem (upload, library, player, tl;dv)
