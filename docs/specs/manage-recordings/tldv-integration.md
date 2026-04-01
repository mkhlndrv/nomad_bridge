# SF2: tl;dv Integration

**Feature:** [Manage Recordings (tl;dv)](overview.md)
**Prefix:** REC-TLDV

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| REC-TLDV-01 | When a tl;dv link is pasted, automatically pull: recording title, duration, transcript, AI-generated summary, key highlights, thumbnail image | Must |
| REC-TLDV-02 | Display tl;dv player embed on the event page | Must |
| REC-TLDV-03 | Transcript is searchable within NomadBridge (users can search across all event transcripts) | Should |
| REC-TLDV-04 | Key highlights/moments are shown as a timeline with clickable timestamps | Should |
| REC-TLDV-05 | For MVP: tl;dv integration can be mock/simulated (paste link, display embed + placeholder transcript) | Must |

## Frontend Components

No dedicated frontend components — `TldvLinkInput` (SF1) handles input, `RecordingPlayer` (SF4) handles display.

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/recordings/tldv-metadata` | POST | Fetch metadata from tl;dv link. Mock for MVP: return placeholder data |
