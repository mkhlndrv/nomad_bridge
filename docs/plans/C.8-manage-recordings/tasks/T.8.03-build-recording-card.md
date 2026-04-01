# T.8.03: Build RecordingCard Mockup

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** REC-LIB-01, REC-LIB-02

## Description
Build a server component for displaying recording entries in the library grid. Shows a thumbnail (or placeholder), event title, speaker name, duration formatted as MM:SS, recording date, view count, visibility badge, and source type indicator. Links to the recording detail page.

## Acceptance Criteria
- [ ] Displays thumbnail image or default placeholder (Play icon overlay)
- [ ] Shows event title, speaker/uploader name
- [ ] Duration formatted as MM:SS or HH:MM:SS
- [ ] Recording date in Bangkok timezone
- [ ] View count with Eye icon
- [ ] Visibility badge: "Public" (green), "Attendees Only" (yellow), "Unlisted" (gray)
- [ ] Source type indicator: tl;dv logo placeholder, YouTube icon, etc.
- [ ] Links to `/recordings/[id]`
- [ ] Responsive card layout

## Files to Create/Modify
- `components/recordings/RecordingCard.tsx` — Server component for library grid

## Implementation Notes
- Use lucide icons: Play, Eye, Globe (public), Lock (attendees), Link (unlisted)
- Duration formatting: `Math.floor(seconds/60):${seconds%60}`
- Use formatDateBangkok from lib/utils.ts for date display

## Commit Message
`feat: add recording card component for library grid`
