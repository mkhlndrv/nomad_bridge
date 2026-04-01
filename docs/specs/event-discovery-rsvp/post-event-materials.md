# SF4: Post-Event Materials

**Feature:** [University Event Discovery & RSVP](overview.md)
**Prefix:** EVT-MAT
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-MAT-01 | Organizers can upload slides, PDFs, recordings, or links after the event | Should |
| EVT-MAT-02 | Attendees receive a notification when materials are posted | Could |
| EVT-MAT-03 | Materials are listed on the event detail page with file type icons and download links | Should |
| EVT-MAT-04 | Materials are searchable by event title and tags | Could |

## Frontend Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `PostEventMaterials` | Server | File list with type icons and download links. Shown after event date |
| `MaterialUploadForm` | Client | Form for organizers: file upload or URL, title, type selector |

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/[id]/materials` | POST | Upload post-event material (organizer only). Notify attendees |
