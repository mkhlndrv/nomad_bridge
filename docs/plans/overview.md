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

## Parallel Wave Schedule

| Wave | Sprints | Focus |
|------|---------|-------|
| W1 | C.2-S1, C.6-S1 | Foundation: User schema + Notification infra |
| W2 | C.2-S2, C.1-S1, C.6-S2 | Profile API + Event mockups + Notification UI |
| W3 | C.2-S3, C.1-S2, C.5-S1, C.3-S1 | Profile full + Events basic + Forum/Collab mockups |
| W4 | C.1-S3, C.4-S1, C.5-S2, C.3-S2 | Events RSVP + Facility mockup + Forum/Collab basic |
| W5 | C.1-S4, C.4-S2, C.5-S3, C.3-S3, C.7-S1 | Events polish + Facility basic + Votes + Matching + Community |
| W6 | C.4-S3, C.5-S4, C.3-S4, C.7-S2, C.8-S1 | Interest + Forum full + Feedback + Community full + Recordings |
| W7 | C.4-S4, C.6-S3, C.7-S3, C.8-S2 | Approve/reject + Notifications full + Community polish + Recordings basic |
| W8 | C.4-S5, C.8-S3 | Facility polish + Recordings player |
| W9 | C.8-S4 | Recordings full |

## Component Summary

| ID | Component | Sprints | Tasks | Spec File |
|----|-----------|---------|-------|-----------|
| C.2 | Participant Profile & Verification | 3 | 17 | participant-profile-2026-03-31.md |
| C.1 | Event Discovery & RSVP | 4 | 23 | event-discovery-rsvp-2026-03-31.md |
| C.6 | Notifications (Email, LINE, Telegram) | 3 | 18 | notifications-2026-03-31.md |
| C.4 | Campus Facility Access Booking | 5 | 27 | facility-booking-2026-03-31.md |
| C.7 | Non-University Events Organizer | 3 | 14 | non-university-events-organizer-2026-03-31.md |
| C.3 | Collaboration Organize Board | 4 | 23 | collaboration-board-2026-03-31.md |
| C.5 | Community Discussion Board | 4 | 24 | community-discussion-board-2026-03-31.md |
| C.8 | Manage Recordings (tl;dv) | 4 | 22 | manage-recordings-2026-03-31.md |

## Milestone Definitions

- **M1 Mockup Ready**: UI components render with static/seed data, responsive layout, no API calls
- **M2 Basic Functionality**: API routes work, UI connected to real data, happy-path flows complete
- **M3 Full Functionality**: All Must+Should requirements, edge cases, business rules, tests passing
