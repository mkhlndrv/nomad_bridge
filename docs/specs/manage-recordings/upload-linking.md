# SF1: Recording Upload & Linking

**Feature:** [Manage Recordings (tl;dv)](overview.md)
**Prefix:** REC-UPLOAD
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| REC-UPLOAD-01 | Event organizers and guest lecturers can link or upload recordings to their events | Must |
| REC-UPLOAD-02 | Supported source: tl;dv (primary integration) — paste a tl;dv recording link, platform fetches metadata | Must |
| REC-UPLOAD-03 | Supported source: YouTube/Vimeo links — embed player on the event page | Must |
| REC-UPLOAD-04 | Supported source: Direct upload — MP4/MP3 files up to 500MB | Should |
| REC-UPLOAD-05 | Each event can have multiple recordings (e.g., main talk + Q&A + workshop breakout) | Must |
| REC-UPLOAD-06 | Organizers control visibility: Public, Attendees Only, or Unlisted (link-only) | Must |

## Frontend Components

| Component | Type | Description |
|-----------|------|-------------|
| `RecordingUploadForm` | Client | Three tabs: "tl;dv Link", "YouTube/Vimeo", "Upload File". Visibility selector |
| `TldvLinkInput` | Client | Paste tl;dv URL, fetch metadata preview (title, duration, transcript, thumbnail) |
| `VideoUrlInput` | Client | Paste YouTube/Vimeo URL, validate, show embedded preview |
| `FileUploadInput` | Client | Large file upload with progress bar, cancel, resume. 500MB limit, MP4/MP3 |
| `VisibilitySelector` | Client | Dropdown: Public (Globe icon), Attendees Only (Lock), Unlisted (Link) |
| `EventRecordingsSection` | Server | Section on event detail page listing recordings. "Add Recording" for organizer |
| `RecordingAccessGate` | Server | Shown when user lacks permission. Message + link to event page |

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings` | POST | Create recording linked to event (organizer/lecturer only). Validate source type + URL |
| `app/api/recordings/upload` | POST | Handle direct file upload (multipart). 500MB, MP4/MP3. Store in public/uploads |
| `app/api/recordings/[id]` | DELETE | Delete recording (organizer/admin only) |
