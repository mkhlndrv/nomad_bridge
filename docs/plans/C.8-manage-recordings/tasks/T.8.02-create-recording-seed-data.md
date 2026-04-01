# T.8.02: Create Recording Seed Data

**Component:** C.8 — Manage Recordings (tl;dv)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** T.8.01
**Spec References:** REC-LIB-01, REC-LIB-02

## Description
Create seed data for the recording library. Generate 5 recordings linked to seeded events: 2 from tl;dv (with sample transcript and highlights), 2 from YouTube, and 1 direct upload. Include varying visibility levels and view counts. Add a few sample RecordingNote entries.

## Acceptance Criteria
- [ ] 5 recordings created across different source types
- [ ] Each linked to an existing seeded event
- [ ] 2 recordings have sample transcript text
- [ ] 1 recording has highlights JSON (array of {time, label})
- [ ] Mix of visibility: 3 PUBLIC, 1 ATTENDEES_ONLY, 1 UNLISTED
- [ ] 3 sample RecordingNote entries
- [ ] Seed script runs without errors

## Files to Create/Modify
- `prisma/seed.ts` — Add recording and note seed data (or extend existing seed)

## Implementation Notes
- Use realistic-looking tl;dv and YouTube URLs for sourceUrl
- Sample transcript: 2-3 paragraphs with timestamps like "[00:05] Introduction..."
- Highlights JSON: `[{"time": 30, "label": "Key concept"}, ...]`
- View counts: range from 0 to 150

## Commit Message
`chore: add recording seed data with sample transcripts`
