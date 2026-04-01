# T.8.07: POST /api/recordings/tldv-metadata — Mock

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 2 | **Milestone:** M2
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** REC-TLDV-01, REC-TLDV-05

## Description
Create a mock endpoint that accepts a tl;dv URL and returns placeholder metadata as if it fetched from the tl;dv API. Returns: title, duration, transcript snippet, thumbnail URL, and highlights array. This is explicitly a mock for MVP — the spec states this is acceptable (REC-TLDV-05).

## Acceptance Criteria
- [ ] Accepts POST with `{ url: string }`
- [ ] Validates URL contains "tldv.io"
- [ ] Returns 200 with mock metadata: title, duration (seconds), thumbnailUrl, transcript (sample text), highlights (array of {time, label}), summary
- [ ] Returns 400 for invalid URLs
- [ ] Response shape matches what the real tl;dv API would return

## Files to Create/Modify
- `app/api/recordings/tldv-metadata/route.ts` — POST handler returning mock data

## Implementation Notes
- Generate deterministic mock data based on the URL (e.g., hash the URL for consistent results)
- Sample transcript: 3-4 paragraphs with timestamps
- Sample highlights: 3-5 key moments
- Duration: random between 1800-7200 seconds (30min-2hr)
- This endpoint is explicitly marked as mock — add a comment noting it

## Commit Message
`feat: add mock tl;dv metadata endpoint for MVP`
