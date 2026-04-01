# T.8.20: POST /api/recordings/upload — File Upload

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.8.06
**Spec References:** REC-UPLOAD-04

## Description
Create a POST endpoint for direct file uploads. Accepts multipart form data with video/audio files up to 500MB. Validates file type (MP4, MP3 only) and size. Stores the file in `public/uploads/recordings/` and creates a Recording record with sourceType=UPLOAD and the file path as sourceUrl.

## Acceptance Criteria
- [ ] Accepts multipart form data upload
- [ ] Validates file type: MP4 (video/mp4), MP3 (audio/mpeg) only
- [ ] Validates file size: max 500MB (returns 400 if exceeded)
- [ ] Stores file in `public/uploads/recordings/{id}-{filename}`
- [ ] Creates Recording record with sourceType=UPLOAD
- [ ] Returns 201 with created recording (including file URL)
- [ ] Returns 400 for invalid file type or size
- [ ] Only event organizer can upload (403)

## Files to Create/Modify
- `app/api/recordings/upload/route.ts` — POST handler with multipart parsing

## Implementation Notes
- Use Next.js built-in request.formData() for multipart parsing
- Generate unique filename with cuid or timestamp prefix
- Ensure `public/uploads/recordings/` directory exists
- For MVP, store locally — no cloud storage needed
- Consider streaming for large files to avoid memory issues

## Commit Message
`feat: add recording file upload API with size and type validation`
