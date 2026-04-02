# NomadBridge Implementation Overview

> 8 components | 168 tasks | 30 sprints | 9 parallel waves

## Build Order & Dependencies

```
C.2 Profile ──────────┬──► C.1 Events ──────► C.7 Community Events
(foundational)         │                   └──► C.8 Recordings
                       ├──► C.4 Facility Booking
                       ├──► C.3 Collaboration Board
                       └──► C.5 Discussion Board

C.6 Notifications ────┬──► C.4 Facility Booking
(infrastructure)       ├──► C.3 Collaboration Board
                       └──► (integrated into C.1, C.5, C.7)
```

## Phased Implementation Plan (Product-First)

This plan prioritizes user-visible value and creates explicit "stop points" to ensure reliability and contract integrity before proceeding. Each sprint must pass the `docs/plans/release-gate.md` checklist.

### Phase 1 — MVP Core Loop (Profile → Events → RSVP) 
*Target: A demoable networking app where users can set up profiles and register for events.*
- **Sprint P1-S1**: Profile foundations (C.2-S1). *Stop point: roles and verification matched to target schema.*
- **Sprint P1-S2**: Events discovery (C.1-S1 & C.1-S2). *Stop point: users can browse events and view capacities.*
- **Sprint P1-S3**: RSVP with waitlist (C.1-S3). *Stop point: full RSVP flow and waitlist placement operates flawlessly.*

### Phase 2 — Notifications "Minimum Useful"
*Target: Reduce user uncertainty by keeping them informed using multiple channels.*
- **Sprint P2-S1**: Notification infrastructure (C.6-S1). *Stop point: types map to KB, dedup uses canonical key.*
- **Sprint P2-S2**: In-app notification center (C.6-S2). *Stop point: users have bell icon / unread counts.*
- **Sprint P2-S3**: Preferences (C.6-S3). *Stop point: users can toggle Email/LINE/Telegram delivery configs.*

### Phase 3 — Marketplace & Coordination
*Target: Expand utility for universities and nomads (Facilities, Collabing, Forum).*
- **Track A (Booking)**: Facility booking (C.4, all sprints). *Stop point: trust gate controls request creation, threshold tracks interests, cancel penalties applied.*
- **Track B (Collab)**: Collaboration board (C.3, all sprints). *Stop point: posting an offer/request and matching workflow complete.*
- **Track C (Forum)**: Community forum (C.5, all sprints). *Stop point: full reddit-style thread creation, replies, voting, pacing.*

### Phase 4 — Extensions (Community + Recordings)
*Target: Community-run events and post-event recorded materials.*
- **Sprint P4-S1**: Community events (C.7, all sprints). *Stop point: Trust-score>=10 filtering enforced, `CommunityEventType` enum operational.*
- **Sprint P4-S2**: Manage Recordings (C.8, all sprints). *Stop point: Access control rules matched to specs (PUBLIC vs ATTENDEES_ONLY vs UNLISTED).*

## Component Summary

| ID | Component | Sprints | Tasks | Spec Folder |
|----|-----------|---------|-------|-------------|
| C.2 | Participant Profile & Verification | 3 | 17 | participant-profile/overview.md |
| C.1 | Event Discovery & RSVP | 4 | 23 | event-discovery-rsvp/overview.md |
| C.6 | Notifications (Email, LINE, Telegram) | 3 | 18 | notifications/overview.md |
| C.4 | Campus Facility Access Booking | 5 | 27 | facility-booking/overview.md |
| C.7 | Non-University Events Organizer | 3 | 14 | non-university-events/overview.md |
| C.3 | Collaboration Organize Board | 4 | 23 | collaboration-board/overview.md |
| C.5 | Community Discussion Board | 4 | 24 | community-discussion/overview.md |
| C.8 | Manage Recordings (tl;dv) | 4 | 22 | manage-recordings/overview.md |

## Milestone Definitions

- **M1 Mockup Ready**: UI components render with static/seed data, responsive layout, no API calls
- **M2 Basic Functionality**: API routes work, UI connected to real data, happy-path flows complete
- **M3 Full Functionality**: All Must+Should requirements, edge cases, business rules, tests passing
