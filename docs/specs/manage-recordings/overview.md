# Specification: Manage Recordings (tl;dv Integration)

> Last updated: 2026-04-01

## Intent / Vibe

Knowledge shared at events and guest lectures shouldn't disappear when the session ends. NomadBridge should make it effortless to capture, organize, and share recordings from live events and webinars — so nomads who couldn't attend can still learn, and organizers can build a library of valuable content. Integration with tl;dv brings automatic transcription and highlights, turning raw recordings into searchable, skimmable knowledge. The experience should feel like having a personal note-taker at every event.

## Sub-Features

- [SF1: Recording Upload & Linking](upload-linking.md)
- [SF2: tl;dv Integration](tldv-integration.md)
- [SF3: Recording Library](recording-library.md)
- [SF4: Viewing Experience](viewing-experience.md)

## Page Components

### SF1: Recording Upload & Linking

- `RecordingUploadForm` (Client) — Three tabs: "tl;dv Link", "YouTube/Vimeo", "Upload File". Visibility selector
  - `TldvLinkInput` (Client) — Paste tl;dv URL, fetch metadata preview (title, duration, transcript, thumbnail)
  - `VideoUrlInput` (Client) — Paste YouTube/Vimeo URL, validate, show embedded preview
  - `FileUploadInput` (Client) — Large file upload with progress bar, cancel, resume. 500MB limit, MP4/MP3
  - `VisibilitySelector` (Client) — Dropdown: Public (Globe icon), Attendees Only (Lock), Unlisted (Link)
- `EventRecordingsSection` (Server) — Section on event detail page listing recordings. "Add Recording" for organizer
  - `RecordingAccessGate` (Server) — Shown when user lacks permission. Message + link to event page

### SF2: tl;dv Integration

No dedicated frontend components — `TldvLinkInput` (SF1) handles input, `RecordingPlayer` (SF4) handles display.

### SF3: Recording Library

- `RecordingLibrary` (Server) — Grid of recording cards with filter bar, search, sort dropdown, pagination
  - `RecordingFilterBar` (Client) — Filters: university, event category, speaker, date range. Transcript search toggle
  - `RecordingCard` (Server) — Thumbnail, event title, speaker, duration, date, view count, visibility badge, tags

### SF4: Viewing Experience

- `RecordingPlayer` (Client) — Renders embed by source type: tl;dv iframe, YouTube iframe, Vimeo iframe, or native HTML5 video
- `TranscriptPanel` (Client) — Side panel (desktop) / below-player (mobile). Searchable transcript. Timestamped segments clickable to seek
- `HighlightTimeline` (Client) — Horizontal bar with clickable key moment markers
- `PersonalNotes` (Client) — Timestamped note-taking while watching. Notes saved per user per recording

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
