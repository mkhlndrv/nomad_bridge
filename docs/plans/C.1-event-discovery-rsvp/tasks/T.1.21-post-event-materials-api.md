# T.1.21: POST /api/events/[id]/materials — Upload Material

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.1.20
**Spec References:** EVT-MAT-01, EVT-MAT-02

## Description
Build the POST `/api/events/[id]/materials` API route that allows event organizers to upload post-event materials (slides, PDFs, recordings) or submit external links. The endpoint validates that the event exists, the event date has passed (materials can only be added to past events), and the user is the event creator or an ADMIN. For file uploads, store in `public/uploads/materials/{eventId}/`. For links, store the URL directly in the `fileUrl` field. Create an `EventMaterial` record in the database.

## Acceptance Criteria
- [ ] POST `/api/events/[id]/materials` accepts multipart FormData with optional `file` and required `title`, `fileType`
- [ ] If `fileType` is "link", requires a `fileUrl` field in the form data instead of a file
- [ ] If `fileType` is "pdf", "slides", or "video", requires a file upload
- [ ] Validates that the event exists (404 if not)
- [ ] Validates that the event date is in the past (400: "Materials can only be added to past events")
- [ ] Validates that the user is the event creator or has ADMIN role (403: "Only organizers can upload materials")
- [ ] Saves uploaded files to `public/uploads/materials/{eventId}/{uuid}.{ext}`
- [ ] Creates an EventMaterial record with: eventId, uploaderId, title, fileUrl, fileType
- [ ] Returns 201 with the created EventMaterial record
- [ ] Returns 401 if user is not authenticated
- [ ] File size limit: 50MB for video, 10MB for other file types

## Files to Create/Modify
- `app/api/events/[id]/materials/route.ts` — POST handler for material upload

## Implementation Notes
- Reuse the file storage pattern from T.1.19 (photo upload): `fs.promises.writeFile` to `public/uploads/materials/`.
- File type to MIME type mapping for validation: `{ pdf: ['application/pdf'], slides: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'], video: ['video/mp4', 'video/webm'] }`.
- For links, validate that the URL starts with `http://` or `https://`.
- Authorization check: `event.creatorId === userId || user.role === 'ADMIN'`.
- Consider creating a shared `saveUploadedFile(file, directory)` utility to DRY up the file storage logic between this and the photo upload route.
- Add `public/uploads/materials/` to `.gitignore`.
- The notification to attendees (EVT-MAT-02) is a "Could" priority — skip for now and add a TODO comment.

## Commit Message
`feat: add post-event materials upload API with organizer auth`
