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
