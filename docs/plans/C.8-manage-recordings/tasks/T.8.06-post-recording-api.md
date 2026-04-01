# T.8.06: POST /api/recordings — Create Recording

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.8.01
**Spec References:** REC-UPLOAD-01, REC-UPLOAD-02, REC-UPLOAD-03, REC-UPLOAD-05, REC-UPLOAD-06

## Description
Create a POST endpoint for adding recordings to events. Only event organizers or guest lecturers (event creator) can add recordings. Validates source type, URL format, and event existence. Links the recording to the event and sets visibility.

## Acceptance Criteria
- [ ] Only event creator can add recordings (403 for others)
- [ ] Validates required fields: eventId, title, sourceType, sourceUrl
- [ ] Validates sourceType is one of: TLDV, YOUTUBE, VIMEO, UPLOAD
- [ ] Validates sourceUrl format based on type
- [ ] Sets visibility (defaults to PUBLIC if not specified)
- [ ] Returns 201 with created recording
- [ ] Returns 404 if event not found
- [ ] Multiple recordings per event allowed

## Files to Create/Modify
- `app/api/recordings/route.ts` — POST handler with organizer validation

## Implementation Notes
- URL validation: tl;dv URLs contain "tldv.io", YouTube contains "youtube.com" or "youtu.be", Vimeo contains "vimeo.com"
- For UPLOAD type, sourceUrl will be set after file upload (T.8.20)
- Auto-set uploaderId from auth context
- sortOrder: count existing recordings for this event + 1

## Commit Message
`feat: add recording creation API with organizer validation`
