# T.8.05: Build RecordingUploadForm Mockup

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** REC-UPLOAD-01, REC-UPLOAD-02, REC-UPLOAD-03, REC-UPLOAD-04, REC-UPLOAD-06

## Description
Build a client component with 3 tabs for adding recordings to events. Tab 1: "tl;dv Link" — paste URL, preview metadata. Tab 2: "YouTube/Vimeo" — paste URL, show embed preview. Tab 3: "Upload File" — file input with drag-and-drop, 500MB limit, MP4/MP3 only. All tabs include a VisibilitySelector dropdown (Public/Attendees Only/Unlisted).

## Acceptance Criteria
- [ ] 3 tab interface: tl;dv Link, YouTube/Vimeo, Upload File
- [ ] tl;dv tab: URL input with "Fetch Metadata" button
- [ ] YouTube/Vimeo tab: URL input with embed preview
- [ ] Upload tab: file input accepting MP4/MP3, shows file size, 500MB limit warning
- [ ] VisibilitySelector dropdown on all tabs: Public, Attendees Only, Unlisted
- [ ] Title input on all tabs (auto-filled from metadata when available)
- [ ] Submit button (non-functional in mockup)
- [ ] Responsive layout

## Files to Create/Modify
- `components/recordings/RecordingUploadForm.tsx` — Client component with tab state
- `components/recordings/VisibilitySelector.tsx` — Dropdown with 3 options and icons

## Implementation Notes
- Use `"use client"` for tab switching and form state
- Tab UI: simple button row with active indicator
- VisibilitySelector icons: Globe (public), Lock (attendees), Link (unlisted)
- File input accepts: `accept="video/mp4,audio/mpeg"`

## Commit Message
`feat: add recording upload form with three source tabs`
