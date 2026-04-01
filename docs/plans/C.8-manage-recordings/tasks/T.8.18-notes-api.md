# T.8.18: GET/POST /api/recordings/[id]/notes

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.8.06
**Spec References:** REC-VIEW-05

## Description
Create API endpoints for personal recording notes. GET returns the current user's notes for a specific recording, sorted by timestamp ascending. POST creates a new note with content and timestamp (seconds into the recording). Notes are private — users can only see their own.

## Acceptance Criteria
- [ ] GET returns 200 with array of user's notes for this recording
- [ ] Notes sorted by timestamp ascending
- [ ] Only returns notes belonging to the authenticated user
- [ ] POST creates a note with content and timestamp
- [ ] POST validates: content non-empty (max 500 chars), timestamp >= 0
- [ ] POST returns 201 with created note
- [ ] Returns 404 if recording not found

## Files to Create/Modify
- `app/api/recordings/[id]/notes/route.ts` — GET and POST handlers

## Implementation Notes
- Notes are scoped to userId — use `where: { recordingId, userId }` for GET
- Timestamp is stored as integer seconds
- No access to other users' notes — strict privacy boundary

## Commit Message
`feat: add recording notes API for personal timestamped notes`
