# NomadBridge — General Development Plan (C.1–C.8)

## Components to Implement

### C.2: Participant Profile & Verification (3 sprints, 17 tasks) — FOUNDATIONAL
- Sprint 1: Schema updates, seed data, ProfileHeader, TrustScoreBadge, SkillTags, ActivitySummary, profile page
- Sprint 2: GET/PATCH profile APIs, connect page to API, edit form
- Sprint 3: Trust score lib, trust history API, verification badges, avatar upload

### C.1: Event Discovery & RSVP (4 sprints, 23 tasks)
- Sprint 1: Event schema updates, seed data, EventCard, CapacityBar, EventFeed page, EventFilterBar
- Sprint 2: Event list/detail APIs, RSVP create/cancel APIs, connect feed, event detail page
- Sprint 3: RsvpButton, confirmation modal, waitlist logic, waitlist indicator, filter interactivity
- Sprint 4: Photo upload, materials, empty states, create event API

### C.3: Collaboration Board (4 sprints, 23 tasks)
- Sprint 1: Collaboration schema, seed data, CollaborationCard, board page, tabs/filters, badges
- Sprint 2: List/create/detail APIs, creation form, type selector
- Sprint 3: Detail page, apply/invite/respond APIs, MyConnections, ConnectionCard
- Sprint 4: Complete/feedback APIs, feedback form/display, status patch, filter wiring

### C.4: Facility Booking (5 sprints, 27 tasks)
- Sprint 1: Facility schema, seed data, VenueCard, directory page, filter bar
- Sprint 2: Facility list/detail APIs, venue detail page, booking request form/API
- Sprint 3: InterestButton, InterestBar, interest API, RequestCard, booking requests list API
- Sprint 4: Manager dashboard, manager request card, approve/reject modals/APIs
- Sprint 5: QR code, MyBookings page, booking cards, cancel API, managed requests API, edge cases

## Execution Order (sprint-by-sprint, commit after each)
1. **C.2-S1** — Schema + Profile mockups → commit+push
2. **C.2-S2** — Profile APIs + data connection → commit+push
3. **C.2-S3** — Trust score + verification → commit+push
4. **C.1-S1** — Event schema + mockups → commit+push
5. **C.1-S2** — Event APIs + data connection → commit+push
6. **C.1-S3** — RSVP interactions → commit+push
7. **C.1-S4** — Photos, materials, polish → commit+push
8. **C.3-S1** — Collaboration schema + mockups → commit+push
9. **C.3-S2** — Collaboration APIs + form → commit+push
10. **C.3-S3** — Matching & application → commit+push
11. **C.3-S4** — Feedback + completion → commit+push
12. **C.4-S1** — Facility schema + mockups → commit+push
13. **C.4-S2** — Venue detail + booking requests → commit+push
14. **C.4-S3** — Interest system → commit+push
15. **C.4-S4** — Manager dashboard → commit+push
16. **C.4-S5** — My bookings + polish → commit+push

### C.5: Community Discussion Board (4 sprints) — ✅ COMPLETE
- Sprint 1: Forum schema, seed data, ThreadCard, ForumFilterBar, ForumFeed page
- Sprint 2: GET/POST forum APIs, thread detail API, CreateThreadForm, thread view page
- Sprint 3: Reply API, vote APIs (thread + reply), VoteButtons component
- Sprint 4: Bookmark API, best answer API, ReplyItem, ThreadPost

### C.6: Notifications (3 sprints) — ✅ COMPLETE
- Sprint 1: Notification/Preference models, type definitions, mock email/LINE/Telegram, sendNotification orchestrator
- Sprint 2: Notification APIs (list, unread-count, mark-read), NotificationBell, NotificationDropdown
- Sprint 3: Preferences API, PreferencesForm, full notifications page, wired into layout

### C.7: Non-University Events (3 sprints) — ✅ COMPLETE
- Sprint 1: Event schema updates (isCommunity, eventType, checkedIn), community event API with trust gate
- Sprint 2: Events discovery page with tabs, CreateEventForm, RSVP API
- Sprint 3: Organizer dashboard, check-in API, attendee management

### C.8: Manage Recordings (4 sprints) — ✅ COMPLETE
- Sprint 1: Recording/RecordingNote models, recording API
- Sprint 2: Recording library page with grid layout
- Sprint 3: Recording detail page with YouTube embed, transcript, highlights
- Sprint 4: RecordingNotes component with timestamped personal notes

## Status
- [x] Plan created
- [ ] C.2 Sprint 1 complete
- [ ] C.2 Sprint 2 complete
- [ ] C.2 Sprint 3 complete
- [ ] C.1 Sprint 1 complete
- [ ] C.1 Sprint 2 complete
- [ ] C.1 Sprint 3 complete
- [ ] C.1 Sprint 4 complete
- [ ] C.3 Sprint 1 complete
- [ ] C.3 Sprint 2 complete
- [ ] C.3 Sprint 3 complete
- [ ] C.3 Sprint 4 complete
- [ ] C.4 Sprint 1 complete
- [ ] C.4 Sprint 2 complete
- [ ] C.4 Sprint 3 complete
- [ ] C.4 Sprint 4 complete
- [ ] C.4 Sprint 5 complete
- [x] C.5 Complete (all 4 sprints)
- [x] C.6 Complete (all 3 sprints)
- [x] C.7 Complete (all 3 sprints)
- [x] C.8 Complete (all 4 sprints)
