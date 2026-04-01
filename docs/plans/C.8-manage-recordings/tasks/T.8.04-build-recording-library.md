# T.8.04: Build RecordingLibrary Page

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** T.8.03
**Spec References:** REC-LIB-01, REC-LIB-03, REC-LIB-05

## Description
Build the recording library page at `app/recordings/page.tsx`. Renders a responsive grid of RecordingCards with a filter bar placeholder, sort dropdown (Most Recent, Most Viewed), and pagination. Initially uses seed data.

## Acceptance Criteria
- [ ] Page renders at `/recordings`
- [ ] Responsive grid: 1 column mobile, 2 tablet, 3 desktop
- [ ] Filter bar placeholder (wired in T.8.10)
- [ ] Sort dropdown: "Most Recent" and "Most Viewed"
- [ ] Pagination with page numbers
- [ ] Page title: "Recording Library"
- [ ] Empty state: "No recordings yet"

## Files to Create/Modify
- `app/recordings/page.tsx` — Server component with grid layout
- `app/recordings/loading.tsx` — Loading skeleton with card placeholders

## Implementation Notes
- Initial render with seed data (API connection in T.8.09)
- Sort dropdown is a client component island within the server page
- Reuse pagination pattern from other list pages

## Commit Message
`feat: add recording library page with grid layout`
