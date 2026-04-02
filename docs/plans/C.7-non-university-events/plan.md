# C.7: Non-University Events Organizer — Implementation Plan

**Spec:** `docs/specs/non-university-events/overview.md`
**Prefix:** COM | **Sub-features:** 3 | **Requirements:** 17
**Dependencies:** C.1 (shared event CRUD/RSVP), C.2 (trust gate)
**Sprints:** 3 | **Tasks:** 14

---

## Sprint 1 — Event Creation + Trust Gate [M1+M2: Mockup + Basic]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.7.01](tasks/T.7.01-update-event-schema-community.md) | Update Event schema for community | 20m | — |
| [T.7.02](tasks/T.7.02-build-community-event-form.md) | Build CommunityEventForm | 30m | — |
| [T.7.03](tasks/T.7.03-build-event-type-selector.md) | Build EventTypeSelector | 20m | — |
| [T.7.04](tasks/T.7.04-build-trust-gate-message.md) | Build TrustGateMessage | 15m | — |
| [T.7.05](tasks/T.7.05-enhance-create-event-api.md) | Enhance POST /api/events for community | 25m | T.7.01 |

### M1+M2 DOD
- [ ] Community event creation form works end-to-end
- [ ] Trust gate prevents users with score < 10
- [ ] Active event limit (5) enforced
- [ ] Events saved with isCommunity=true and communityEventType

---

## Sprint 2 — Discovery + Dashboard [towards M3]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.7.06](tasks/T.7.06-build-community-badge.md) | Build CommunityBadge component | 10m | — |
| [T.7.07](tasks/T.7.07-add-community-filter.md) | Add community filter to event API | 15m | T.7.01 |
| [T.7.08](tasks/T.7.08-build-organizer-dashboard.md) | Build OrganizerDashboard page | 25m | — |
| [T.7.09](tasks/T.7.09-build-organizer-event-card.md) | Build OrganizerEventCard | 25m | — |
| [T.7.10](tasks/T.7.10-get-dashboard-api.md) | GET /api/events/dashboard | 25m | T.7.01 |

---

## Sprint 3 — Check-in + Announcements [M3: Full Functionality]

| Task | Title | Est. | Deps |
|------|-------|------|------|
| [T.7.11](tasks/T.7.11-build-attendee-list.md) | Build AttendeeList + ManualCheckinToggle | 25m | — |
| [T.7.12](tasks/T.7.12-post-checkin-api.md) | POST /api/events/[id]/checkin | 20m | T.7.10 |
| [T.7.13](tasks/T.7.13-build-announcement-form.md) | Build SendAnnouncementForm | 20m | — |
| [T.7.14](tasks/T.7.14-post-announce-api.md) | POST /api/events/[id]/announce | 20m | T.7.10 |

### M3 DOD
- [ ] Community events appear in feed with badge
- [ ] Community filter works in event list
- [ ] Organizer dashboard shows events with attendee management
- [ ] Manual check-in awards +5 trust score
- [ ] Announcements sent to all RSVPed attendees
- [ ] All 17 COM-* requirements satisfied

### 🛑 M3 Stop Point (Phase 4-S1)
**Community events are operational and visibly distinct.**

### 📋 M3 Contract Check
- [ ] Community events use `Event.isCommunity === true` plus the `CommunityEventType` enum (avoiding free-text strings).
- [ ] Trust gate is strictly enforced: `trustScore >= 10`.
