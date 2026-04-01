# T.8.15: Implement Access Control Middleware

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** T.8.06
**Spec References:** REC-UPLOAD-06, REC-VIEW-06, REC-VIEW-07

## Description
Implement a reusable access control helper for recordings. Encapsulates the visibility check logic: PUBLIC allows all authenticated users, ATTENDEES_ONLY checks that the user has an EventRsvp for the recording's event, UNLISTED allows anyone with the direct recording ID (no list filtering). Used by both the detail API and the list API.

## Acceptance Criteria
- [ ] `checkRecordingAccess(userId, recording)` returns {allowed: boolean, reason?: string}
- [ ] PUBLIC: always allowed for authenticated users
- [ ] ATTENDEES_ONLY: allowed only if user has RSVP for the recording's event
- [ ] UNLISTED: allowed (accessible via direct link)
- [ ] Returns reason string for denied access
- [ ] Works with both single recording and list filtering contexts

## Files to Create/Modify
- `lib/recording-access.ts` — Access control helper function

## Implementation Notes
- For ATTENDEES_ONLY, query: `prisma.eventRsvp.findFirst({ where: { userId, eventId: recording.eventId } })`
- The list API (T.8.08) uses this to filter results
- The detail API (T.8.11) uses this to gate access
- Keep the function pure where possible (pass in the RSVP check result)

## Commit Message
`feat: add recording access control helper`
