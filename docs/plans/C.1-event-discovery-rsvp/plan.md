# C.1: Event Discovery & RSVP — Implementation Plan

**Spec:** `docs/specs/event-discovery-rsvp-2026-03-31.md`
**Prefix:** EVT | **Sub-features:** 4 | **Requirements:** 23
**Dependencies:** C.2 (trust score checks, profile display)
**Sprints:** 4 | **Tasks:** 23

---

## Sprint 1 — Schema + Mockups [M1: Mockup Ready]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.1.01](tasks/T.1.01-update-event-schema.md) | Update Event schema | 25m | C.2-S1 |
| [T.1.02](tasks/T.1.02-create-event-seed-data.md) | Create event seed data | 25m | T.1.01 |
| [T.1.03](tasks/T.1.03-build-event-card.md) | Build EventCard mockup | 25m | — |
| [T.1.04](tasks/T.1.04-build-capacity-bar.md) | Build CapacityBar shared component | 15m | — |
| [T.1.05](tasks/T.1.05-build-event-feed-page.md) | Build EventFeed page layout | 25m | T.1.03, T.1.04 |
| [T.1.06](tasks/T.1.06-build-event-filter-bar.md) | Build EventFilterBar mockup | 20m | — |

### M1 DOD
- [ ] `/events` page renders card grid with seed data
- [ ] EventCard shows title, date (Bangkok TZ), university, venue, tags, capacity bar
- [ ] CapacityBar renders correctly at 0%, 50%, 80%, 100% fill levels
- [ ] Responsive: cards stack on mobile, 2-3 column grid on desktop

---

## Sprint 2 — Core API + Data Connection [M2: Basic Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.1.07](tasks/T.1.07-get-events-list-api.md) | GET /api/events — list with filters | 30m | T.1.01 |
| [T.1.08](tasks/T.1.08-get-event-detail-api.md) | GET /api/events/[id] — event detail | 25m | T.1.07 |
| [T.1.09](tasks/T.1.09-post-rsvp-api.md) | POST /api/events/[id]/rsvp — create RSVP | 30m | T.1.08 |
| [T.1.10](tasks/T.1.10-delete-rsvp-api.md) | DELETE /api/events/[id]/rsvp — cancel | 25m | T.1.09 |
| [T.1.11](tasks/T.1.11-connect-event-feed.md) | Connect EventFeed to API | 20m | T.1.07 |
| [T.1.12](tasks/T.1.12-build-event-detail-page.md) | Build EventDetail page | 25m | T.1.08 |

### M2 DOD
- [ ] Event list API returns filtered, paginated results
- [ ] RSVP create uses $transaction (create EventRsvp + increment rsvpCount)
- [ ] RSVP cancel uses $transaction (delete + decrement + promote waitlisted)
- [ ] Duplicate RSVP returns 409, past event returns 400
- [ ] EventFeed shows real data, EventDetail page renders all info

---

## Sprint 3 — RSVP Interactions [towards M3]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.1.13](tasks/T.1.13-build-rsvp-button.md) | Build RsvpButton client component | 30m | T.1.09 |
| [T.1.14](tasks/T.1.14-build-rsvp-confirmation.md) | Build RsvpConfirmation modal | 25m | T.1.13 |
| [T.1.15](tasks/T.1.15-implement-waitlist.md) | Implement waitlist logic | 25m | T.1.09, T.1.10 |
| [T.1.16](tasks/T.1.16-build-waitlist-indicator.md) | Build WaitlistIndicator | 15m | T.1.15 |
| [T.1.17](tasks/T.1.17-build-filter-bar-interactive.md) | Build EventFilterBar interactivity | 25m | T.1.07 |

---

## Sprint 4 — Photos, Materials, Polish [M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.1.18](tasks/T.1.18-build-event-board-upload.md) | Build EventBoardUpload component | 25m | — |
| [T.1.19](tasks/T.1.19-post-event-photos-api.md) | POST /api/events/[id]/photos | 20m | T.1.18 |
| [T.1.20](tasks/T.1.20-build-post-event-materials.md) | Build PostEventMaterials section | 20m | — |
| [T.1.21](tasks/T.1.21-post-event-materials-api.md) | POST /api/events/[id]/materials | 20m | T.1.20 |
| [T.1.22](tasks/T.1.22-empty-states-errors.md) | Empty states + error handling | 20m | T.1.11 |
| [T.1.23](tasks/T.1.23-post-create-event-api.md) | POST /api/events — create event | 25m | T.1.01 |

### M3 DOD
- [ ] Full RSVP flow: browse → click → RSVP → QR → cancel
- [ ] Waitlist: join when full, auto-promote on cancel
- [ ] Filters: university, category, date range, search
- [ ] Photo upload and display on event detail
- [ ] Materials section visible post-event
- [ ] Empty states for no events / no results
- [ ] All 23 EVT-* requirements satisfied
- [ ] All unit + integration tests passing
