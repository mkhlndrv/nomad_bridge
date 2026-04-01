# T.1.19: POST /api/events/[id]/photos — Upload Event Photo

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.1.18
**Spec References:** EVT-PHOTO-01, EVT-PHOTO-02, EVT-PHOTO-03

## Description
Build the POST `/api/events/[id]/photos` API route that handles event photo uploads. The endpoint accepts multipart form data with an image file, validates the file size (max 5MB) and type (JPEG/PNG only), stores the file to the local `public/uploads/events/` directory (simple file storage for now — can be migrated to cloud storage later), and creates an `EventPhoto` record in the database linking the photo to the event and uploader. Also build a POST `/api/events/draft` endpoint that creates a DRAFT event from a board photo upload.

## Acceptance Criteria
- [ ] POST `/api/events/[id]/photos` accepts multipart FormData with a `photo` field
- [ ] Validates file size: rejects files > 5MB with 400 error
- [ ] Validates file type: rejects non-JPEG/PNG with 400 error
- [ ] Saves file to `public/uploads/events/{eventId}/{filename}` with a unique filename (UUID)
- [ ] Creates an EventPhoto record with: eventId, uploaderId, imageUrl (relative path), caption (optional from form data)
- [ ] Returns 201 with the created EventPhoto record
- [ ] Returns 404 if event ID doesn't exist
- [ ] Returns 401 if user is not authenticated
- [ ] POST `/api/events/draft` creates a DRAFT event with the uploaded photo and university tag
- [ ] Draft event has status DRAFT and does not appear in the public feed
- [ ] Creates the upload directory if it doesn't exist

## Files to Create/Modify
- `app/api/events/[id]/photos/route.ts` — POST handler for event photo upload
- `app/api/events/draft/route.ts` — POST handler for draft event from board photo
- `public/uploads/events/.gitkeep` — Ensure the uploads directory exists in git

## Implementation Notes
- Use Next.js built-in `request.formData()` to parse the multipart upload.
- Generate a unique filename: `${crypto.randomUUID()}.${extension}` to avoid collisions.
- Use `fs.promises.writeFile()` to save the file to disk.
- Create the directory with `fs.promises.mkdir(dir, { recursive: true })`.
- The `imageUrl` stored in the DB should be a relative path: `/uploads/events/{eventId}/{filename}`.
- Add `public/uploads/` to `.gitignore` to avoid committing uploaded files.
- For the draft endpoint: create an Event with `status: 'DRAFT'`, minimal info (university from form, title as "Board Photo - {university}"), and link the photo.
- Consider a `MAX_FILE_SIZE` constant in a config file for reuse.

## Commit Message
`feat: add event photo upload API with file validation and storage`
