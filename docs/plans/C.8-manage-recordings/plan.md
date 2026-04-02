# C.8: Manage Recordings (tl;dv) — Implementation Plan

**Spec:** `docs/specs/manage-recordings/overview.md`
**Prefix:** REC | **Sub-features:** 4 | **Requirements:** 24
**Dependencies:** C.1 (event context, attendee lists for access control)
**Sprints:** 4 | **Tasks:** 22

---

## Sprint 1 — Schema + Library Mockup [M1: Mockup Ready]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.8.01](tasks/T.8.01-create-recording-schema.md) | Create Recording schema | 25m | — |
| [T.8.02](tasks/T.8.02-create-recording-seed-data.md) | Create recording seed data | 20m | T.8.01 |
| [T.8.03](tasks/T.8.03-build-recording-card.md) | Build RecordingCard mockup | 20m | — |
| [T.8.04](tasks/T.8.04-build-recording-library.md) | Build RecordingLibrary page | 25m | T.8.03 |
| [T.8.05](tasks/T.8.05-build-upload-form.md) | Build RecordingUploadForm mockup | 25m | — |

### M1 DOD
- [ ] Recording and RecordingNote models in Prisma
- [ ] `/recordings` page renders card grid with seed data
- [ ] Upload form shows 3 tabs (tl;dv, YouTube/Vimeo, Upload)
- [ ] Responsive layout

---

## Sprint 2 — Upload + Library API [M2: Basic Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.8.06](tasks/T.8.06-post-recording-api.md) | POST /api/recordings — create | 25m | T.8.01 |
| [T.8.07](tasks/T.8.07-tldv-metadata-mock.md) | POST /api/recordings/tldv-metadata | 20m | — |
| [T.8.08](tasks/T.8.08-get-recordings-api.md) | GET /api/recordings — list with filters | 25m | T.8.01 |
| [T.8.09](tasks/T.8.09-connect-library-api.md) | Connect RecordingLibrary to API | 20m | T.8.08 |
| [T.8.10](tasks/T.8.10-build-filter-bar.md) | Build RecordingFilterBar | 20m | — |

### M2 DOD
- [ ] Recordings can be created (linked to events)
- [ ] tl;dv metadata mock returns placeholder data
- [ ] Library shows filtered, paginated results
- [ ] Access control: attendees-only check works

---

## Sprint 3 — Player + Transcript [towards M3]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.8.11](tasks/T.8.11-get-recording-detail-api.md) | GET /api/recordings/[id] — detail | 20m | T.8.06 |
| [T.8.12](tasks/T.8.12-build-recording-player.md) | Build RecordingPlayer component | 25m | — |
| [T.8.13](tasks/T.8.13-build-transcript-panel.md) | Build TranscriptPanel component | 25m | — |
| [T.8.14](tasks/T.8.14-build-recording-detail-page.md) | Build recording detail page | 25m | T.8.11 |
| [T.8.15](tasks/T.8.15-access-control-middleware.md) | Implement access control middleware | 20m | T.8.06 |

---

## Sprint 4 — Notes + Polish [M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.8.16](tasks/T.8.16-build-highlight-timeline.md) | Build HighlightTimeline component | 20m | — |
| [T.8.17](tasks/T.8.17-build-personal-notes.md) | Build PersonalNotes component | 25m | — |
| [T.8.18](tasks/T.8.18-notes-api.md) | GET/POST /api/recordings/[id]/notes | 20m | T.8.06 |
| [T.8.19](tasks/T.8.19-build-visibility-selector.md) | Build VisibilitySelector + EventRecordingsSection | 20m | — |
| [T.8.20](tasks/T.8.20-post-upload-api.md) | POST /api/recordings/upload — file upload | 25m | T.8.06 |
| [T.8.21](tasks/T.8.21-delete-recording-api.md) | DELETE /api/recordings/[id] | 15m | T.8.06 |
| [T.8.22](tasks/T.8.22-build-access-gate.md) | Build RecordingAccessGate component | 15m | — |

### M3 DOD
- [ ] Upload flow works for tl;dv, YouTube, and direct upload
- [ ] Library with filtering, search (including transcripts), sorting
- [ ] Player page with transcript and highlight navigation
- [ ] Access control enforced per recording visibility
- [ ] Personal notes functional with timestamps
- [ ] All 24 REC-* requirements satisfied

### 🛑 M3 Stop Point (Phase 4-S2)
**A user can browse recordings and open a detail page.**

### 📋 M3 Contract Check
- [ ] Access control rules perfectly match the specs (PUBLIC vs ATTENDEES_ONLY vs UNLISTED) securely enforcing view blocks.
