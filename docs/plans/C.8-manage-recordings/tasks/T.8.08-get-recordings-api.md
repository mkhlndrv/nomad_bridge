# T.8.08: GET /api/recordings — List with Filters

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 25m
**Dependencies:** T.8.01
**Spec References:** REC-LIB-01, REC-LIB-03, REC-LIB-04, REC-LIB-05

## Description
Create a GET endpoint for listing recordings with filtering, search, sorting, and pagination. Respects visibility: PUBLIC recordings visible to all, ATTENDEES_ONLY only visible to users who RSVPed the linked event, UNLISTED accessible via direct link only (excluded from list). Search includes titles and transcripts.

## Acceptance Criteria
- [ ] Paginated (20 per page) with total count
- [ ] Filter by: university (via event), category (via event), speaker (uploader name), date range
- [ ] Search across recording titles and transcript text
- [ ] Sort by: createdAt DESC (default), viewCount DESC
- [ ] Visibility enforcement: PUBLIC shown to all, ATTENDEES_ONLY filtered by RSVP, UNLISTED excluded
- [ ] Returns recording with event title, uploader name
- [ ] Returns 200 with array and pagination metadata

## Files to Create/Modify
- `app/api/recordings/route.ts` — Add GET handler alongside existing POST

## Implementation Notes
- Transcript search: use Prisma `contains` on transcript field (basic text search)
- Visibility check for ATTENDEES_ONLY: join through Event→EventRsvp to check current user
- Include event: `{ select: { title, university, category } }` and uploader: `{ select: { name } }`
- UNLISTED recordings only accessible via GET /api/recordings/[id] with direct ID

## Commit Message
`feat: add recording list API with filters and visibility control`
