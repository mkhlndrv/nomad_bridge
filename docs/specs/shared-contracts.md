# Shared Contracts & Cross-Cutting Concerns

> Last updated: 2026-04-01

This document centralizes all cross-cutting contracts that every feature must follow. Coding agents should reference this alongside individual spec files.

See also:
- `docs/target-schema.prisma` — canonical database schema
- `docs/knowledge-base.md` — business rules, trust score rules
- `CLAUDE.md` — project conventions, commit rules, auth pattern

---

## API Response Formats

All endpoints follow these response shapes (from CLAUDE.md):

### Success — Single Resource (200 or 201)

```json
{
  "data": {
    "id": "clx1abc23def456",
    "title": "AI in Southeast Asia",
    "date": "2026-04-15T09:00:00.000Z",
    "venue": "Chulalongkorn University",
    "capacity": 30,
    "rsvpCount": 12,
    "category": "ACADEMIC",
    "isCommunity": false,
    "creator": {
      "id": "user-carol",
      "name": "Carol",
      "verificationLevel": "EMAIL_VERIFIED",
      "trustScore": 0
    }
  }
}
```

### Success — Paginated List (200)

```json
{
  "data": [
    { "id": "clx1abc23def456", "title": "AI in Southeast Asia", "..." : "..." },
    { "id": "clx2ghi78jkl901", "title": "Web Dev Workshop", "..." : "..." }
  ],
  "total": 47,
  "page": 1,
  "pageSize": 20
}
```

Default `pageSize` is 20. Accept `?page=N&pageSize=N` query params. Max pageSize: 100.

### Error Responses

```json
// 400 — Validation error
{ "error": "Title is required" }
{ "error": "Capacity must be greater than 0" }
{ "error": "Bio must be under 500 characters" }

// 401 — Unauthorized (no or invalid x-user-id header)
{ "error": "Unauthorized" }

// 403 — Forbidden (authenticated but not allowed)
{ "error": "Only the author can edit this" }
{ "error": "Edit window has expired" }
{ "error": "Email verification required" }
{ "error": "Trust score too low to create booking requests (minimum: -5)" }

// 404 — Not found
{ "error": "Event not found" }

// 409 — Conflict
{ "error": "Already RSVPed to this event" }
{ "error": "Already submitted feedback for this collaboration" }

// 429 — Rate limited
{ "error": "Please wait before posting again" }
```

---

## API Endpoint Summary

### Event Discovery & RSVP (EVT)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/events` | Public | List events with pagination, filtering (category, university, search, date) |
| POST | `/api/events` | Auth | Create event. Community events: trust >= 10, active <= 5 |
| GET | `/api/events/[id]` | Public | Event detail with creator, RSVPs, materials, photos |
| PATCH | `/api/events/[id]` | Organizer/Admin | Update event |
| POST | `/api/events/[id]/rsvp` | Auth | RSVP (transaction: capacity check + create + increment) |
| DELETE | `/api/events/[id]/rsvp` | Auth | Cancel RSVP (transaction: delete + decrement + promote waitlist) |
| POST | `/api/events/[id]/photos` | Auth | Upload event photo (5MB, JPEG/PNG) |
| POST | `/api/events/draft` | Admin | Create draft from board photo |
| POST | `/api/events/[id]/materials` | Organizer | Upload post-event material, notify attendees |

### Participant Profile (PRF)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/profile` | Auth | Current user's profile with activity counts |
| GET | `/api/profile/[id]` | Public | Public profile (excludes email) |
| PATCH | `/api/profile` | Auth | Update name, bio, skills, location |
| POST | `/api/profile/avatar` | Auth | Upload photo (2MB, JPEG/PNG) |
| GET | `/api/profile/trust-history` | Auth | Paginated trust score log |

### Collaboration Board (COL)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/collaborations` | Public | List with filters (type, status, university) |
| POST | `/api/collaborations` | Auth | Create posting. Rate limit: 3/week |
| GET | `/api/collaborations/[id]` | Public | Detail with poster profile |
| PATCH | `/api/collaborations/[id]` | Poster/Admin | Update or change status |
| POST | `/api/collaborations/[id]/apply` | Nomad | Apply to opportunity |
| POST | `/api/collaborations/[id]/invite` | University | Invite nomad |
| POST | `/api/collaborations/[id]/respond` | Poster | Accept/reject application |
| POST | `/api/collaborations/[id]/complete` | Auth | Mark completed (+10 trust for nomad) |
| POST | `/api/collaborations/[id]/feedback` | Auth | Submit rating (1-5) and optional comment |

### Facility Booking (FAC)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/facilities` | Public | List with filters (type, university, price) |
| GET | `/api/facilities/[id]` | Public | Detail with active requests and manager info |
| POST | `/api/booking-requests` | Verified + trust >= -5 | Create booking request |
| GET | `/api/booking-requests` | Public | List open requests |
| GET | `/api/booking-requests/[id]` | Public | Request detail with interest count |
| POST | `/api/booking-requests/[id]/interest` | Auth | Toggle interest. Threshold check |
| POST | `/api/booking-requests/[id]/submit-review` | Requester | Manually submit for manager review |
| GET | `/api/booking-requests/mine` | Auth | Current user's requests |
| GET | `/api/booking-requests/managed` | Venue Manager | Requests for managed venues |
| POST | `/api/booking-requests/[id]/approve` | Venue Manager | Approve, generate QR, create booking |
| POST | `/api/booking-requests/[id]/reject` | Venue Manager | Reject with reason |
| POST | `/api/booking-requests/[id]/cancel` | Requester | Cancel request |
| GET | `/api/bookings` | Auth | User's confirmed bookings |
| GET | `/api/bookings/[id]` | Auth | Booking detail with QR (ownership check) |
| POST | `/api/bookings/[id]/checkin` | Auth | QR check-in |

### Community Discussion (FRM)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/forum` | Public | Thread list, filters (category, search), pinned first |
| POST | `/api/forum` | Auth | Create thread. Rate limit: 30s |
| GET | `/api/forum/[id]` | Public | Thread with paginated replies (20/page) |
| PATCH | `/api/forum/[id]` | Author | Edit (within 15 min of creation) |
| DELETE | `/api/forum/[id]` | Author/Admin | Soft-delete (content → "[removed]") |
| POST | `/api/forum/[id]/replies` | Auth | Create reply. Rate limit: 30s |
| POST | `/api/forum/[id]/vote` | Auth | Vote on thread (up/down/none) |
| POST | `/api/forum/[id]/bookmark` | Auth | Toggle bookmark |
| POST | `/api/forum/replies/[id]/vote` | Auth | Vote on reply (up/down/none) |
| POST | `/api/forum/replies/[id]/best-answer` | Thread Author | Mark reply as best answer |

### Notifications (NTF)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/notifications` | Auth | Paginated notification list |
| GET | `/api/notifications/unread-count` | Auth | Unread count (polled every 30s) |
| POST | `/api/notifications/mark-read` | Auth | Mark specific IDs or all as read |
| GET | `/api/notifications/preferences` | Auth | Preference matrix (5 categories x 3 channels) |
| PUT | `/api/notifications/preferences` | Auth | Update preferences |

### Non-University Events (COM)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/events/dashboard` | Organizer | Organizer's events with attendee names (no emails) |
| POST | `/api/events/[id]/checkin` | Organizer | Manual check-in (+5 trust to attendee) |
| POST | `/api/events/[id]/announce` | Organizer | Send announcement to RSVPed users |

### Manage Recordings (REC)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/recordings` | Organizer/Lecturer | Create recording linked to event |
| POST | `/api/recordings/upload` | Organizer/Lecturer | Direct file upload (500MB, MP4/MP3) |
| GET | `/api/recordings` | Public (visibility-aware) | List with filters, transcript search |
| GET | `/api/recordings/[id]` | Public (visibility-aware) | Detail with access control, increment viewCount |
| PATCH | `/api/recordings/[id]` | Organizer | Update metadata, visibility, sort order |
| DELETE | `/api/recordings/[id]` | Organizer/Admin | Delete recording |
| GET | `/api/recordings/[id]/notes` | Auth | Get user's notes for recording |
| POST | `/api/recordings/[id]/notes` | Auth | Add timestamped note |
| PATCH | `/api/recordings/[id]/transcript` | Organizer | Edit transcript |
| POST | `/api/recordings/tldv-metadata` | Auth | Fetch tl;dv metadata (mock for MVP) |

**Total: 56 endpoints** (17 public, 39 authenticated)

---

## Shared Component Interfaces

These components are used by multiple features. All agents must use these exact prop shapes.

### EventCard

```typescript
interface EventCardProps {
  id: string
  title: string
  date: string          // ISO date string
  venue: string
  university: string
  description?: string
  tags?: string         // comma-separated
  rsvpCount: number
  capacity: number      // 0 = unlimited
  imageUrl?: string
  category: EventCategory
  isCommunity: boolean
  communityEventType?: CommunityEventType
  status: EventStatus
  creator: {
    id: string
    name: string
    trustScore: number
    verificationLevel: VerificationLevel
  }
}
```

### TrustScoreBadge

```typescript
interface TrustScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"  // default: "md"
}
// Color logic:
//   score >= 30 → green (Community Verified territory)
//   score >= 0  → yellow (neutral/building)
//   score < 0   → red (negative)
```

### CapacityBar

```typescript
interface CapacityBarProps {
  current: number       // rsvpCount (confirmed only, not waitlisted)
  max: number           // capacity (0 = unlimited → hide bar, show "Unlimited")
  showLabel?: boolean   // default: true — shows "12/30 spots"
}
```

### VoteButtons

```typescript
interface VoteButtonsProps {
  targetId: string
  targetType: "POST" | "REPLY"
  netScore: number
  userVote: "up" | "down" | null
  onVote: (direction: "up" | "down" | "none") => void
}
// Clicking the active vote direction sends "none" (toggle off)
// Display: ▲ [netScore] ▼ with active state highlighted
```

### InterestButton

```typescript
interface InterestButtonProps {
  bookingRequestId: string
  interestCount: number
  isInterested: boolean
  onToggle: () => void
}
// Display: "I'd attend (12)" with filled/outline heart icon
```

### QrCodeDisplay

```typescript
interface QrCodeDisplayProps {
  value: string         // the data URL string from Booking.qrCode
  size?: number         // pixel size, default: 200
  label?: string        // text below QR, e.g., "Show this at check-in"
}
// Renders the QR data URL as an <img> tag. No external service.
```

### VerificationBadge

```typescript
interface VerificationBadgeProps {
  level: VerificationLevel
  size?: "sm" | "md"    // default: "sm"
}
// Display:
//   NONE → no badge shown
//   EMAIL_VERIFIED → blue checkmark
//   COMMUNITY_VERIFIED → gold checkmark
```

---

## File Upload Strategy

All uploads stored locally in `public/uploads/` for MVP. Validation happens both client-side (UX) and server-side (enforcement).

| Context | Max Size | Formats | Storage Path | Validation Error |
|---------|----------|---------|--------------|------------------|
| Profile photo | 2 MB | JPEG, PNG | `public/uploads/avatars/` | "File too large (max 2MB)" / "Only JPEG and PNG files are accepted" |
| Event photo | 5 MB | JPEG, PNG | `public/uploads/events/` | "File too large (max 5MB)" / "Only JPEG and PNG files are accepted" |
| Cover image (community) | 5 MB | JPEG, PNG | `public/uploads/events/` | Same as event photo |
| Post-event materials | 10 MB | PDF, PPTX, DOCX, ZIP | `public/uploads/materials/` | "File too large (max 10MB)" / "Unsupported file format" |
| Recording (direct) | 500 MB | MP4, MP3 | `public/uploads/recordings/` | "File too large (max 500MB)" / "Only MP4 and MP3 files are accepted" |

File naming: `{uuid}-{original-filename}` to prevent collisions.

---

## QR Code Content Format

Generated using a QR code library (e.g., `qrcode` npm package). Stored as a data URL string in the database.

### Booking QR (generated on approval)

```json
{
  "bookingId": "clx1abc23def456",
  "eventTitle": "ML Study Group",
  "date": "2026-04-20",
  "venueName": "Digital Learning Hub"
}
```

### RSVP QR (generated on RSVP confirmation)

```json
{
  "rsvpId": "clx2ghi78jkl901",
  "eventId": "clx3mno45pqr678",
  "eventTitle": "AI in Southeast Asia",
  "userId": "user-alice"
}
```

QR generation: `QRCode.toDataURL(JSON.stringify(payload))` → stored in `Booking.qrCode` or returned in RSVP response.

---

## Notification Category-to-Trigger Mapping

User notification preferences are grouped into 5 categories. When a user disables a category+channel combo, ALL triggers in that category are suppressed for that channel.

| Category | Triggers | Default Channels |
|----------|----------|-----------------|
| **Events** | RSVP_CONFIRMATION, EVENT_REMINDER, EVENT_CANCELLED, WAITLIST_PROMOTED, MATERIALS_AVAILABLE | Email + LINE + Telegram (except MATERIALS_AVAILABLE: Email only) |
| **Bookings** | BOOKING_CONFIRMATION, BOOKING_REMINDER, BOOKING_CANCELLED | Email + LINE + Telegram (except BOOKING_REMINDER: LINE + Telegram only; BOOKING_CANCELLED: Email only) |
| **Lectures** | LECTURE_INVITE, LECTURE_APPLICATION, LECTURE_FEEDBACK | Email + LINE + Telegram (except LECTURE_FEEDBACK: Email only) |
| **Community** | FORUM_REPLY | LINE + Telegram |
| **Trust** | TRUST_SCORE_CHANGE | Email |

### Trigger-to-Channel Matrix

| # | Trigger | Email | LINE | Telegram | Payload Fields |
|---|---------|-------|------|----------|----------------|
| 1 | RSVP_CONFIRMATION | Y | Y | Y | eventId, eventTitle, date, venue |
| 2 | EVENT_REMINDER | Y | Y | Y | eventId, eventTitle, date, venue, timeUntil |
| 3 | EVENT_CANCELLED | Y | Y | Y | eventId, eventTitle, date, reason? |
| 4 | WAITLIST_PROMOTED | Y | Y | Y | eventId, eventTitle, date, position |
| 5 | MATERIALS_AVAILABLE | Y | N | N | eventId, eventTitle, materialCount |
| 6 | BOOKING_CONFIRMATION | Y | Y | Y | bookingId, facilityName, date, startTime, endTime |
| 7 | BOOKING_REMINDER | N | Y | Y | bookingId, facilityName, date, startTime, timeUntil |
| 8 | BOOKING_CANCELLED | Y | N | N | bookingId, facilityName, date, reason? |
| 9 | LECTURE_INVITE | Y | Y | Y | collaborationId, title, inviterName |
| 10 | LECTURE_APPLICATION | Y | Y | Y | collaborationId, title, applicantName |
| 11 | LECTURE_FEEDBACK | Y | N | N | collaborationId, title, rating |
| 12 | TRUST_SCORE_CHANGE | Y | N | N | delta, newScore, reason |
| 13 | FORUM_REPLY | N | Y | Y | postId, postTitle, replierName |

---

## Constants & Limits

Consolidated from all specs and knowledge-base. Canonical reference for all validation rules.

### Character Limits

| Field | Max Length | Required |
|-------|-----------|----------|
| User name | 100 chars | Yes |
| User bio | 500 chars | No |
| User location | 100 chars | No |
| Skill tag (each) | 30 chars | — |
| Skills count | 10 tags | — |
| Event title | No explicit limit | Yes |
| Forum thread title | 120 chars | Yes |
| Forum post/reply content | 5,000 chars | Yes |
| Collaboration app message | 500 chars | No |
| Collaboration feedback comment | 1,000 chars | No |

### Rate Limits

| Action | Limit |
|--------|-------|
| Forum post/reply | 30 seconds between posts |
| Collaboration posting | 3 per week per user |
| Notifications per user | 10 per hour |

### Trust Score Thresholds

| Gate | Requirement |
|------|-------------|
| Community event creation | trustScore >= 10 AND emailVerified |
| Booking request creation | trustScore >= -5 AND emailVerified |
| Community Verified badge | trustScore >= 30 |
| Trust score floor | -10 (cannot go below) |
| Post collapse threshold | netScore < -5 |

### Other Constants

| Constant | Value |
|----------|-------|
| Max active community events per organizer | 5 |
| Max event photos per event | 5 |
| Forum reply pagination | 20 per page |
| Default page size (all lists) | 20 |
| Max page size | 100 |
| Forum edit window | 15 minutes from createdAt (UTC) |
| Notification polling frequency | 30 seconds |
| Notification archive age | 30 days (auto soft-delete) |
| Notification duplicate key | (userId, type, referenceId) |
| Booking cancellation penalty window | < 24 hours before event |
| Interest threshold default | 5 per venue (configurable by manager) |
| Event reminder timing | 24 hours before event (cron) |
| Booking reminder timing | 2 hours before booking (cron) |
