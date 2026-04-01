# T.8.09: Connect RecordingLibrary to API

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** T.8.08
**Spec References:** REC-LIB-01

## Description
Connect the RecordingLibrary page to the real API, replacing seed data with fetched data. Add loading skeleton, error handling, and empty state. Wire the sort dropdown to update the API query.

## Acceptance Criteria
- [ ] Page fetches recordings from GET /api/recordings
- [ ] Sort dropdown changes API sort parameter
- [ ] Loading skeleton shows while fetching
- [ ] Error state with retry button
- [ ] Empty state: "No recordings available yet"
- [ ] Pagination works with API page parameter

## Files to Create/Modify
- `app/recordings/page.tsx` — Update to fetch from API with search params

## Implementation Notes
- Server component reads searchParams for page, sort, filters
- Pass search params to API call
- Reuse loading.tsx skeleton from T.8.04

## Commit Message
`feat: connect recording library to API with live data`
