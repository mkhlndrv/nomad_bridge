# NomadBridge Specification Index

> Last updated: 2026-04-02

## Feature Overview

| # | Feature | Folder | Sub-features | Req Count |
|---|---------|--------|-------------|-----------|
| 1 | Event Discovery & RSVP | [event-discovery-rsvp/](event-discovery-rsvp/overview.md) | 4 | 23 |
| 2 | Participant Profile & Verification | [participant-profile/](participant-profile/overview.md) | 4 | 26 |
| 3 | Collaboration Organize Board | [collaboration-board/](collaboration-board/overview.md) | 4 | 24 |
| 4 | Campus Facility Access Booking | [facility-booking/](facility-booking/overview.md) | 4 | 26 |
| 5 | Community Discussion Board | [community-discussion/](community-discussion/overview.md) | 4 | 21 |
| 6 | Notifications (Email, LINE & Telegram) | [notifications/](notifications/overview.md) | 5 | 35 |
| 7 | Non-University Events Organizer | [non-university-events/](non-university-events/overview.md) | 3 | 17 |
| 8 | Manage Recordings (tl;dv) | [manage-recordings/](manage-recordings/overview.md) | 4 | 24 |
| | **Total** | | **32** | **196** |

## Sub-feature Map

### 1. Event Discovery & RSVP
- [SF1: Event Feed & Discovery](event-discovery-rsvp/event-feed.md) — browsing, filtering, searching events
- [SF2: RSVP System](event-discovery-rsvp/rsvp-system.md) — RSVP, capacity, waitlist, QR code confirmation
- [SF3: Event Photo Upload](event-discovery-rsvp/event-photos.md) — onsite board photo capture, draft event creation
- [SF4: Post-Event Materials](event-discovery-rsvp/post-event-materials.md) — file/link uploads after event, attendee access

### 2. Participant Profile & Verification
- [SF1: Profile Display](participant-profile/profile-display.md) — public profile page, avatar, bio, skills, activity summary
- [SF2: Profile Editing](participant-profile/profile-editing.md) — edit name, bio, skills, photo upload
- [SF3: Trust Score System](participant-profile/trust-score.md) — scoring rules, history, adjustments, floor of -10
- [SF4: Verification Levels](participant-profile/verification-levels.md) — email verified, community verified, badge display

### 3. Collaboration Organize Board
- [SF1: Collaboration Board & Discovery](collaboration-board/board-discovery.md) — two-sided board, tabs, type filter, search
- [SF2: Posting (Requests & Offers)](collaboration-board/posting.md) — 5 collaboration types, type-specific fields, creation form
- [SF3: Matching & Application Flow](collaboration-board/matching.md) — apply, invite, accept/reject, status lifecycle
- [SF4: Feedback System](collaboration-board/feedback.md) — post-completion ratings, trust score impact

### 4. Campus Facility Access Booking
- [SF1: Venue Directory](facility-booking/venue-directory.md) — browsable catalog, filtering, search, venue manager info
- [SF2: Booking Request & Interest](facility-booking/booking-request.md) — create request, community interest, social proof threshold
- [SF3: Venue Manager Dashboard](facility-booking/venue-manager.md) — review requests, approve/reject, interest-based decisions
- [SF4: My Bookings & Status](facility-booking/my-bookings.md) — request lifecycle, confirmed bookings, cancellation policy

### 5. Community Discussion Board
- [SF1: Forum Feed](community-discussion/forum-feed.md) — thread listing, category filtering, search, pinned threads
- [SF2: Thread Creation](community-discussion/thread-creation.md) — create form, rich text, category selection, rate limiting
- [SF3: Replies & Discussion](community-discussion/replies.md) — threaded replies, chronological, formatting
- [SF4: Thread Interactions](community-discussion/thread-interactions.md) — upvotes, downvotes, bookmarks, best answer marking

### 6. Notifications (Email, LINE & Telegram)
- [SF1: Notification Triggers](notifications/triggers.md) — 13 event types mapped to channels (Email/LINE/Telegram)
- [SF2: Email Notifications](notifications/email.md) — HTML templates, mock SMTP, QR inline images
- [SF3: LINE Notifications](notifications/line.md) — short messages, deeplinks, mock LINE API
- [SF4: Telegram Notifications](notifications/telegram.md) — Markdown messages, deeplinks, mock Telegram Bot API
- [SF5: In-App Notification Center](notifications/notification-center.md) — bell icon, dropdown, full page, 3-channel preferences

### 7. Non-University Events Organizer
- [SF1: Community Event Creation](non-university-events/event-creation.md) — form, event types, trust gate (>=10), validation
- [SF2: Discovery Integration](non-university-events/discovery-integration.md) — community badge, feed integration, community filter
- [SF3: Organizer Dashboard](non-university-events/organizer-dashboard.md) — event management, attendee list, check-in, announcements

### 8. Manage Recordings (tl;dv)
- [SF1: Recording Upload & Linking](manage-recordings/upload-linking.md) — tl;dv links, YouTube/Vimeo, direct file upload
- [SF2: tl;dv Integration](manage-recordings/tldv-integration.md) — metadata fetch, transcript, highlights, embed (mock MVP)
- [SF3: Recording Library](manage-recordings/recording-library.md) — browsable catalog, filtering, search (incl. transcripts)
- [SF4: Viewing Experience](manage-recordings/viewing-experience.md) — player page, transcript panel, notes, access control

## Infrastructure Documents

| Document | Description |
|----------|-------------|
| [Target Schema](../target-schema.prisma) | Complete target Prisma schema — 21 models, 19 enums. Canonical reference for all agents |
| [Project Setup](project-setup.md) | Seed data definitions (5 users, 4 events, etc.), Vitest configuration, test directory structure, test helpers |

## Cross-Feature Dependencies

| Feature | Depends On | Depended On By |
|---------|-----------|----------------|
| Event Discovery & RSVP | Profile (trust checks), Notifications (RSVP/materials) | Non-Univ Events (shared CRUD), Recordings (event context) |
| Participant Profile | — (foundational) | ALL features (trust score, badges) |
| Collaboration Board | Profile (trust, feedback), Notifications (invite/apply) | — |
| Facility Booking | Profile (trust checks), Notifications (request/approval/rejection) | — |
| Community Discussion Board | Profile (TrustScoreBadge), Notifications (reply alerts) | — |
| Notifications | — (infrastructure) | ALL features (trigger notifications) |
| Non-University Events | Event Discovery (shared event CRUD/RSVP), Profile (trust gate), Notifications | — |
| Manage Recordings | Event Discovery (event context, attendee lists for access control) | — |

## Shared Resources

| Resource | Type | Owner | Used By |
|----------|------|-------|---------|
| `lib/trust-score.ts` | Library | participant-profile | event-discovery, facility-booking, collaboration-board, non-univ-events, community-discussion |
| `lib/notifications.ts` | Library | notifications | event-discovery, facility-booking, collaboration-board, non-univ-events, community-discussion |
| `lib/mock-email.ts` | Library | notifications | (internal to notifications) |
| `lib/mock-line.ts` | Library | notifications | (internal to notifications) |
| `lib/mock-telegram.ts` | Library | notifications | (internal to notifications) |
| `lib/notification-types.ts` | Library | notifications | (internal to notifications) |
| `CapacityBar` | Component | event-discovery-rsvp | EventCard, EventDetail |
| `TrustScoreBadge` | Component | participant-profile | ThreadCard, ThreadPost, OrganizerEventCard, CollaborationCard, ManagerRequestCard |
| `QrCodeDisplay` | Component | facility-booking | BookingConfirmation, BookingCard, RsvpConfirmation |
| `VoteButtons` | Component | community-discussion | ThreadPost, Reply |
| `InterestButton` | Component | facility-booking | RequestCard |

## Prisma Model Ownership

| Model | Primary Owner | Related Specs |
|-------|--------------|---------------|
| User | participant-profile | ALL |
| Event | event-discovery-rsvp | non-university-events, manage-recordings |
| EventRsvp | event-discovery-rsvp | non-university-events, manage-recordings (access control) |
| EventPhoto | event-discovery-rsvp | — |
| EventMaterial | event-discovery-rsvp | — |
| Facility | facility-booking | — |
| BookingRequest | facility-booking | — |
| BookingInterest | facility-booking | — |
| Booking | facility-booking | — |
| CollaborationOpportunity | collaboration-board | — |
| CollaborationApplication | collaboration-board | — |
| CollaborationFeedback | collaboration-board | participant-profile (trust score) |
| ForumPost | community-discussion | — |
| ForumReply | community-discussion | — |
| ForumVote | community-discussion | — |
| ForumBookmark | community-discussion | — |
| TrustScoreLog | participant-profile | — |
| Notification | notifications | ALL |
| NotificationPreference | notifications | — |
| Recording | manage-recordings | event-discovery-rsvp |
| RecordingNote | manage-recordings | — |

## Suggested Build Order

1. **Participant Profile** — foundational; trust score used everywhere
2. **Event Discovery & RSVP** — core feature; depends on profile
3. **Notifications** — infrastructure; needed by most features (Email + LINE + Telegram)
4. **Facility Booking** — depends on profile + notifications; venue manager role
5. **Non-University Events** — extends event-discovery
6. **Collaboration Board** — depends on profile + notifications
7. **Community Discussion Board** — depends on profile + notifications
8. **Manage Recordings** — depends on events

## Requirement ID Prefixes

| Feature | Prefix |
|---------|--------|
| Event Discovery & RSVP | `EVT` |
| Participant Profile | `PRF` |
| Collaboration Organize Board | `COL` |
| Facility Booking | `FAC` |
| Community Discussion Board | `FRM` |
| Notifications | `NTF` |
| Non-University Events | `COM` |
| Manage Recordings | `REC` |
