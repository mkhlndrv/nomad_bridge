# SF2: RSVP System

**Feature:** [University Event Discovery & RSVP](overview.md)
**Prefix:** EVT-RSVP
> Last updated: 2026-04-02

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| EVT-RSVP-01 | One-click RSVP for authenticated users | Must |
| EVT-RSVP-02 | Enforce capacity limits strictly: if space available, register immediately; if full, offer waitlist with position number | Must |
| EVT-RSVP-03 | After successful RSVP, show confirmation and generate a simple QR code as a check-in pass | Must |
| EVT-RSVP-04 | Prevent duplicate RSVPs (database-level unique constraint on userId + eventId) | Must |
| EVT-RSVP-05 | Allow users to cancel their RSVP, which decrements the count and promotes the next waitlisted person | Must |

## Frontend Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| `RsvpButton` | Client | Handles RSVP toggle: "RSVP Now" / "Cancel RSVP" / "Join Waitlist" states. Calls API, optimistic UI. Lives inside EventDetail |
|   `RsvpConfirmation` | Client | Modal after RSVP success: QR code display, event summary, "Add to Calendar" link |
| `WaitlistIndicator` | Server | Shows waitlist position number |

## API Routes

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/events/[id]/rsvp` | POST | RSVP via `$transaction`: check capacity, create EventRsvp, increment count. Waitlist if full. Trigger notification |
| `app/api/events/[id]/rsvp` | DELETE | Cancel RSVP via `$transaction`: delete, decrement count, promote waitlisted. Trigger notification |

## Precision Clarifications

- **Waitlist promotion order:** FIFO based on `EventRsvp.createdAt` — the earliest waitlisted RSVP is promoted first when a spot opens
- **Notification dispatch:** All notifications are dispatched immediately (no batching). On RSVP creation: `sendNotification(userId, 'RSVP_CONFIRMATION', { eventId, eventTitle })`. On waitlist promotion: `sendNotification(userId, 'WAITLIST_PROMOTED', { eventId, eventTitle })`
- **RSVP status:** `EventRsvp.status` is `RsvpStatus` (`CONFIRMED`, `WAITLISTED`, `CANCELLED`). Waitlisted rows use `waitlistPosition` (ordered FIFO by this field, ties broken by `createdAt`). On promotion, set `status = CONFIRMED` and `waitlistPosition = null`
- **rsvpCount semantics:** `Event.rsvpCount` only counts confirmed (non-waitlisted) RSVPs. Waitlisted RSVPs do not increment rsvpCount
- **Transaction scope:** The POST handler wraps capacity-check + create-RSVP + increment-count (or create-waitlisted-RSVP) in a single `prisma.$transaction`. The DELETE handler similarly wraps delete + decrement + promote in one transaction
