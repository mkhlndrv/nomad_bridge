# T.8.14: Build Recording Detail Page

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.8.11
**Spec References:** REC-VIEW-01, REC-VIEW-02, REC-VIEW-04

## Description
Build the recording detail page at `app/recordings/[id]/page.tsx`. Composes: RecordingPlayer, TranscriptPanel (side-by-side on desktop, stacked on mobile), event context section (link to event, speaker info, date), HighlightTimeline, and PersonalNotes section. Fetches data from the recording detail API.

## Acceptance Criteria
- [ ] Page renders at `/recordings/[id]`
- [ ] Player and transcript displayed (side-by-side desktop, stacked mobile)
- [ ] Event context: event title (linked), date, university, speakers
- [ ] View count displayed
- [ ] Highlight timeline rendered below player (if highlights exist)
- [ ] Personal notes section at bottom
- [ ] Loading skeleton
- [ ] 404 page for missing recordings

## Files to Create/Modify
- `app/recordings/[id]/page.tsx` — Server component composing player and transcript
- `app/recordings/[id]/loading.tsx` — Loading skeleton
- `app/recordings/[id]/not-found.tsx` — 404 state

## Implementation Notes
- Fetch from GET /api/recordings/[id]
- Use CSS grid for side-by-side layout: `grid-cols-1 lg:grid-cols-[2fr_1fr]`
- Event context links to `/events/[eventId]`
- Pass transcript and highlights data to client components

## Commit Message
`feat: add recording detail page with player and transcript`
