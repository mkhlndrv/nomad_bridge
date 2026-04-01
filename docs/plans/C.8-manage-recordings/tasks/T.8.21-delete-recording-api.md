# T.8.21: DELETE /api/recordings/[id]

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 15m
**Dependencies:** T.8.06
**Spec References:** REC-UPLOAD-01

## Description
Create a DELETE endpoint for removing recordings. Only the recording uploader or an admin can delete. Soft-deletes by removing the database record (and associated notes). For UPLOAD type, also deletes the file from disk.

## Acceptance Criteria
- [ ] Only uploader or admin can delete (403 for others)
- [ ] Deletes the Recording record from database
- [ ] Cascade deletes associated RecordingNote records
- [ ] For UPLOAD source type: deletes the file from public/uploads/recordings/
- [ ] Returns 200 on success
- [ ] Returns 404 if recording not found
- [ ] Returns 403 if not authorized

## Files to Create/Modify
- `app/api/recordings/[id]/route.ts` — Add DELETE handler alongside GET

## Implementation Notes
- Use `prisma.recording.delete` with cascade (configure in schema with onDelete: Cascade on RecordingNote)
- For file deletion: use `fs.unlink` on the local file path
- Check role === 'ADMIN' OR recording.uploaderId === userId

## Commit Message
`feat: add recording deletion API with file cleanup`
