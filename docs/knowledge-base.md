# NomadBridge Knowledge Base

> Last updated: 2026-04-02

## Project Goal

A platform that connects digital nomads in Bangkok with local universities (Chulalongkorn, Thammasat, KMUTT, etc.) for academic events, campus facility access, guest lectures, and community.

## Core Users

- Digital Nomads (main users)
- University Admins / Staff
- Event Organizers (nomads who host community events)
- Venue Managers (manage campus facilities)
- Platform Admin (for demo purposes)

## Main Features (MVP)

1. University Event Discovery & RSVP (with capacity, waitlist, photo upload of onsite event boards, and post-event materials)
2. Participant Profile & Verification (with Basic Trust Score)
3. Collaboration Organize Board (two-sided guest lecture / skill exchange marketplace)
4. Campus Facility Access Booking (with QR code pass and cancellation policy)
5. Community Discussion Board (threaded forum with categories)
6. Notifications (Email + LINE + Telegram with in-app notification center)
7. Non-University Events Organizer (nomad-hosted meetups, workshops, skill shares)
8. Manage Recordings (tl;dv integration for live event and webinar recordings)

## Tech Stack

- Next.js 16.2 (App Router) + TypeScript + React 19.2
- Tailwind CSS 4 + lucide-react icons
- Prisma 7.5 + SQLite
- Vitest for testing

## Key Entities

- User (name, email, bio, role, trustScore, verification level, skills, avatarUrl, location)
- Event (title, date, venue, description, capacity, university, category, isCommunity, eventType)
- EventRsvp (userId + eventId unique pair, status RsvpStatus, waitlistPosition?, check-in fields)
- Facility (name, university, type, location, hours, price, availability)
- Booking (user, facility, time slot, status, qrCode)
- BookingRequest (user, facility, proposed date/time, interest count, status)
- CollaborationOpportunity (topic, type, format, compensation, status)
- CollaborationApplication (opportunityId, userId, message, status)
- ForumPost (title, content, category, pinned, lastActivity, isDeleted, netScore)
- ForumReply (postId, userId, content, netScore, isBestAnswer)
- ForumVote (userId, targetId, targetType, direction)
- ForumBookmark (userId, postId)
- Notification (userId, type, channel, message, read status)
- NotificationPreference (userId, category, email, line, telegram)
- Recording (eventId, source, url, transcript, visibility)
- TrustScoreLog (userId, delta, reason, createdAt)

## Non-functional Requirements

- Fully responsive design (mobile-first: 375px, desktop: 1280px)
- Simple and fast event feed
- Clean, modern UI with consistent card-based layouts
- All dates stored in UTC, displayed in Asia/Bangkok timezone

## Authentication (MVP)

- No auth library. Mock auth via `x-user-id` request header.
- Every protected API route reads: `request.headers.get('x-user-id')`
- If no userId provided → 401 Unauthorized
- Look up user via `prisma.user.findUnique({ where: { id: userId } })`
- If user not found → 401
- Role checks: `user.role === 'ADMIN'` / `'VENUE_MANAGER'` / `'UNIVERSITY'`

## Locked architecture decisions

Cross-cutting choices that should not be “simplified away” without updating this section and `docs/target-schema.prisma`. (Former standalone ADR files under `docs/adrs/` were folded here.)

1. **Explicit `EventRsvp` model (not implicit many-to-many):** The User ↔ Event RSVP relation uses a real `EventRsvp` table so we can enforce `@@unique([userId, eventId])`, store `createdAt`, `status`, waitlist data, and check-in fields.

2. **Mock auth for MVP:** No auth library. Protected APIs read `x-user-id`; missing or unknown user → 401.

3. **SQLite in development:** Use `prisma db push` (no migration files). Local DB file is gitignored; reset by deleting DB and re-push + seed.

4. **Booking times as strings:** On `Booking` (and related models), store `startTime` / `endTime` as `"HH:mm"` strings; store the calendar date as `DateTime` (date portion). SQLite has no native `TIME` type; full `DateTime` for time-of-day alone is awkward.

5. **Event categories vs community types:** `EventCategory` values are ACADEMIC, NETWORKING, WORKSHOP, SOCIAL, CAREER (broad classification for all events). When `Event.isCommunity === true`, also set `CommunityEventType` (MEETUP, WORKSHOP, SKILL_SHARE, SOCIAL, COWORKING_SESSION). Canonical enums live in `docs/target-schema.prisma`.

## Trust Score Rules

| Action | Delta | Priority |
|--------|-------|----------|
| Event attendance (QR check-in) | +5 | Must |
| Complete a guest lecture | +10 | Must |
| Positive rating (4-5 stars) | +3 per rating | Should |
| Consistent booking (5 no no-shows) | +5 bonus | Could |
| No-show at event (RSVP, no check-in) | -3 | Must |
| Late booking cancellation (<24h) | -2 | Should |
| Negative rating (1-2 stars) | -2 per rating | Should |

- Starting score: 0
- Floor: -10 (score cannot go below this)
- Downvotes on forum posts do NOT affect trust score

## Notification Triggers (13 Types)

| # | Trigger | Channels |
|---|---------|----------|
| 1 | RSVP confirmation | Email + LINE + Telegram |
| 2 | Event reminder (24h before) | Email + LINE + Telegram |
| 3 | Event cancelled | Email + LINE + Telegram |
| 4 | Waitlist promoted | Email + LINE + Telegram |
| 5 | Post-event materials available | Email |
| 6 | Booking confirmation + QR | Email + LINE + Telegram |
| 7 | Booking reminder (2h before) | LINE + Telegram |
| 8 | Booking cancelled | Email |
| 9 | Guest lecture invite | Email + LINE + Telegram |
| 10 | Lecture application received | Email + LINE + Telegram |
| 11 | Lecture feedback received | Email |
| 12 | Trust score change (significant) | Email |
| 13 | Forum reply to your thread | LINE + Telegram |

Triggers are backend-only — invoked internally by feature implementations, no dedicated API routes.

### Notification Categories

User preferences are grouped into 5 categories. Each category controls one or more triggers:

| Category | Trigger Numbers | Triggers |
|----------|----------------|----------|
| Events | #1, #2, #3, #4, #5 | RSVP confirmation, Event reminder, Event cancelled, Waitlist promoted, Materials available |
| Bookings | #6, #7, #8 | Booking confirmation + QR, Booking reminder, Booking cancelled |
| Lectures | #9, #10, #11 | Guest lecture invite, Lecture application, Lecture feedback |
| Community | #13 | Forum reply to your thread |
| Trust | #12 | Trust score change (significant) |

All notifications are dispatched immediately when the triggering action occurs (no batching). Exceptions: Event reminders (#2) and Booking reminders (#7) are dispatched by a scheduled cron job that runs hourly.

## Rate Limits & Constants

| Constant | Value |
|----------|-------|
| Post/reply rate limit | 30 seconds between posts |
| Thread title max length | 120 characters |
| Post/reply content max length | 5,000 characters |
| Forum reply pagination | 20 per page |
| Event photos per event | max 5 |
| Booking cancellation penalty window | < 24 hours |
| Community event trust gate | trustScore >= 10 |
| Thread edit window | 15 minutes after posting |
| Collapsed post threshold | net score < -5 |
| Profile name max length | 100 characters |
| Profile bio max length | 500 characters |
| Skills max count | 10 tags per user |
| Skill tag max length | 30 characters each |
| Location max length | 100 characters |
| Collaboration application message max | 500 characters |
| Collaboration feedback comment max | 1,000 characters |
| Collaboration post rate limit | 3 per week per user |
| File upload: profile photo | 2 MB, JPEG/PNG only |
| File upload: event photo | 5 MB, JPEG/PNG only |
| File upload: cover image | 5 MB, JPEG/PNG only |
| File upload: post-event materials | 10 MB, PDF/PPTX/DOCX/ZIP |
| File upload: recording (direct) | 500 MB, MP4/MP3 |
| QR code format (booking) | JSON: {bookingId, eventTitle, date, venueName} |
| QR code format (RSVP) | JSON: {rsvpId, eventId, eventTitle, userId} |
| Notification polling frequency | 30 seconds |
| Notification archive age | 30 days (auto soft-delete) |
| Notification duplicate key | (userId, type, referenceId) tuple |
| Interest threshold default | 5 per venue (configurable) |
| Booking eligibility: trust minimum | trustScore >= -5 |
| Booking eligibility: verification | Email verified required |
| Community verification threshold | trustScore >= 30 |
| Trust score floor | -10 |
| Max active community events | 5 per organizer |
| Max event photos | 5 per event |

### Enums

- **Forum categories:** General, Tips, Events, Housing, Coworking
- **Event categories:** ACADEMIC, NETWORKING, WORKSHOP, SOCIAL, CAREER
- **Community event types:** MEETUP, WORKSHOP, SKILL_SHARE, SOCIAL, COWORKING_SESSION
- **Event status:** DRAFT, PUBLISHED, CANCELLED, PAST
- **RSVP status:** CONFIRMED, WAITLISTED, CANCELLED (`Event.rsvpCount` counts only CONFIRMED)
- **Booking request status:** OPEN, UNDER_REVIEW, APPROVED, REJECTED, CANCELLED
- **Application status:** PENDING, ACCEPTED, REJECTED
- **Notification types:** RSVP_CONFIRMATION, EVENT_REMINDER, EVENT_CANCELLED, WAITLIST_PROMOTED, MATERIALS_AVAILABLE, BOOKING_CONFIRMATION, BOOKING_REMINDER, BOOKING_CANCELLED, LECTURE_INVITE, LECTURE_APPLICATION, LECTURE_FEEDBACK, TRUST_SCORE_CHANGE, FORUM_REPLY
- **Recording sources:** TLDV, YOUTUBE, VIMEO, UPLOAD
- **Recording visibility:** PUBLIC, ATTENDEES_ONLY, UNLISTED

> Note: The current `prisma/schema.prisma` may differ from the target (e.g. legacy EventCategory values). The canonical target is `docs/target-schema.prisma`. Event categories and `CommunityEventType` are defined under **Locked architecture decisions** below.
- **Collaboration types:** GUEST_LECTURE, WORKSHOP, MENTORSHIP, PROJECT, SKILL_EXCHANGE
- **User roles:** NOMAD, UNIVERSITY, ADMIN, VENUE_MANAGER
- **Verification levels:** NONE, EMAIL_VERIFIED, COMMUNITY_VERIFIED
- **Booking status:** PENDING, CONFIRMED, CANCELLED, COMPLETED
