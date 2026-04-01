# T.8.01: Create Recording Schema

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** REC-UPLOAD-01, REC-UPLOAD-05, REC-UPLOAD-06, REC-VIEW-05

## Description
Create the Recording and RecordingNote models in Prisma. Recording stores metadata about event recordings from any source (tl;dv, YouTube, Vimeo, direct upload). RecordingNote stores personal timestamped notes users take while watching. Add enums for source type and visibility level.

## Acceptance Criteria
- [ ] New `RecordingSourceType` enum: TLDV, YOUTUBE, VIMEO, UPLOAD
- [ ] New `RecordingVisibility` enum: PUBLIC, ATTENDEES_ONLY, UNLISTED
- [ ] `Recording` model: id, eventId, title, sourceType, sourceUrl, thumbnailUrl?, duration (Int, seconds), transcript (String?), highlights (String?, JSON as text), visibility, viewCount (default 0), sortOrder (Int, default 0), uploaderId, createdAt
- [ ] `RecordingNote` model: id, recordingId, userId, content, timestamp (Int, seconds into recording), createdAt
- [ ] Relations: Recording→Event, Recording→User (uploader), RecordingNote→Recording, RecordingNote→User
- [ ] `npx prisma db push` succeeds

## Files to Create/Modify
- `prisma/schema.prisma` — Add enums and models, add relations to Event and User

## Implementation Notes
- highlights stored as JSON string since SQLite has no native JSON type
- transcript is a large text field — SQLite handles this fine
- duration in seconds (integer) for simplicity
- Add `recordings Recording[]` relation to Event and User models

## Commit Message
`chore: add recording and recording note models to prisma schema`
