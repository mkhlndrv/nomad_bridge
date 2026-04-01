# T.8.13: Build TranscriptPanel Component

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** None
**Spec References:** REC-TLDV-01, REC-TLDV-03, REC-VIEW-02

## Description
Build a client component that displays the recording transcript in a scrollable panel. Transcript segments are timestamped and clickable to seek the player to that time. Includes a search input to highlight matching text. On desktop, renders as a side panel; on mobile, renders below the player.

## Acceptance Criteria
- [ ] Displays transcript text with timestamps
- [ ] Clicking a timestamp seeks player to that time (via callback)
- [ ] Search input highlights matching text in yellow
- [ ] Auto-scrolls to current segment during playback (when synced)
- [ ] Desktop: side panel layout
- [ ] Mobile: stacked below player
- [ ] Shows "No transcript available" when transcript is null
- [ ] Keyboard accessible

## Files to Create/Modify
- `components/recordings/TranscriptPanel.tsx` — Client component with search and scroll sync

## Implementation Notes
- Parse transcript text into segments by timestamp markers like "[MM:SS]"
- Use a ref to track the active segment for auto-scroll
- Search uses simple text highlighting (wrap matches in `<mark>`)
- Accept onSeek callback prop to communicate with RecordingPlayer

## Commit Message
`feat: add transcript panel with search and timestamp navigation`
