# T.8.12: Build RecordingPlayer Component

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** REC-VIEW-01, REC-TLDV-02, REC-UPLOAD-02, REC-UPLOAD-03

## Description
Build a client component that renders the appropriate player based on the recording source type. For tl;dv and YouTube/Vimeo: renders an iframe embed. For direct uploads: renders an HTML5 video/audio element. Provides play/pause control callbacks for transcript sync.

## Acceptance Criteria
- [ ] Renders tl;dv embed iframe for TLDV source type
- [ ] Renders YouTube embed iframe for YOUTUBE source
- [ ] Renders Vimeo embed iframe for VIMEO source
- [ ] Renders HTML5 `<video>` or `<audio>` for UPLOAD source
- [ ] Responsive: 16:9 aspect ratio maintained
- [ ] Exposes onTimeUpdate callback for transcript sync
- [ ] Loading state while embed loads
- [ ] Error state if source URL is invalid

## Files to Create/Modify
- `components/recordings/RecordingPlayer.tsx` — Client component with source-based rendering

## Implementation Notes
- Use `"use client"` for player interactivity
- YouTube embed: `https://www.youtube.com/embed/{videoId}`
- Vimeo embed: `https://player.vimeo.com/video/{videoId}`
- tl;dv: iframe with tl;dv embed URL
- HTML5 player: use ref for time tracking
- Use allowFullScreen on iframes

## Commit Message
`feat: add recording player with multi-source support`
