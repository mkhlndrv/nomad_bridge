# T.8.16: Build HighlightTimeline Component

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 4 | **Milestone:** M3
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** REC-TLDV-04, REC-VIEW-03

## Description
Build a client component that renders a horizontal timeline bar with clickable key moment markers. Each marker represents a highlight from the recording (extracted from tl;dv or manually set). Clicking a marker seeks the player to that timestamp. Shows marker labels on hover.

## Acceptance Criteria
- [ ] Horizontal bar representing the full recording duration
- [ ] Clickable markers at highlight timestamps
- [ ] Hover shows label tooltip for each marker
- [ ] Clicking seeks player to timestamp (via onSeek callback)
- [ ] Current playback position indicator
- [ ] Graceful handling: no highlights = don't render the component
- [ ] Responsive width

## Files to Create/Modify
- `components/recordings/HighlightTimeline.tsx` — Client component with positioned markers

## Implementation Notes
- Position markers as percentage: `(highlight.time / totalDuration) * 100`
- Use absolute positioning within a relative container
- Tooltip on hover using title attribute or custom tooltip
- Accept highlights as `Array<{time: number, label: string}>`

## Commit Message
`feat: add highlight timeline with clickable key moments`
