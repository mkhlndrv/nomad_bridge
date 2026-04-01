# T.8.11: GET /api/recordings/[id] — Detail

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.8.06
**Spec References:** REC-VIEW-01, REC-VIEW-04, REC-VIEW-06, REC-VIEW-07

## Description
Create a GET endpoint for a single recording with full detail. Includes event context (title, date, speakers), uploader info, transcript, highlights, and notes count. Increments view count on each access. Enforces access control based on visibility setting.

## Acceptance Criteria
- [ ] Returns 200 with full recording data + event context
- [ ] Increments viewCount atomically on each request
- [ ] Access control: PUBLIC accessible to all, ATTENDEES_ONLY requires RSVP check, UNLISTED accessible with direct link
- [ ] Returns 403 for unauthorized access (ATTENDEES_ONLY, not RSVPed)
- [ ] Returns 404 for missing recording
- [ ] Includes event: title, date, university, speakers
- [ ] Includes uploader: name, trust score

## Files to Create/Modify
- `app/api/recordings/[id]/route.ts` — GET handler with access control

## Implementation Notes
- Use `prisma.recording.update` with `data: { viewCount: { increment: 1 } }` for atomic increment
- For ATTENDEES_ONLY: check EventRsvp exists for current user + recording's eventId
- Include related data with Prisma select/include

## Commit Message
`feat: add recording detail API with access control and view tracking`
