# ADR-001: Use Explicit EventRsvp Join Table Instead of Implicit Many-to-Many

**Status:** Accepted
**Date:** 2026-03-25
**Feature:** Event Discovery & RSVP
**Deciders:** Lead developer

## Context

The Event RSVP feature requires a many-to-many relationship between User and Event. Prisma supports two approaches:

1. **Implicit many-to-many:** Prisma auto-generates a hidden join table. No model definition needed — just `events Event[]` on User and `attendees User[]` on Event.

2. **Explicit join table:** Define an `EventRsvp` model with `userId` and `eventId` fields, plus any extra columns.

We need to track *when* a user RSVPed and prevent duplicate RSVPs at the database level.

## Decision

Use an **explicit `EventRsvp` model** as the join table.

```prisma
model EventRsvp {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])

  @@unique([userId, eventId])
}
```

## Consequences

### Positive

- **`createdAt` tracking:** We know exactly when each RSVP was made, enabling "first-come-first-served" waitlist ordering.
- **`@@unique` constraint:** Database-level prevention of duplicate RSVPs. Even if the application logic has a race condition, the DB rejects the second insert.
- **Extensibility:** Can add `status` (confirmed/waitlisted/cancelled), `checkedIn` (boolean), or `qrCode` fields later without schema migration complexity.
- **Queryability:** Can query RSVPs directly (e.g., "show all RSVPs for this event ordered by createdAt") without going through the User or Event model.
- **Clarity for agents:** An AI coding assistant can see the model definition and understand the relationship structure explicitly.

### Negative

- **More code:** Explicit model requires relation annotations on both User and Event. Prisma's implicit many-to-many would be 2 lines instead of 10.
- **Manual management:** Creating/deleting RSVPs requires explicit `prisma.eventRsvp` operations instead of Prisma's `connect`/`disconnect` sugar.

### Neutral

- SQLite handles the unique constraint as expected. No special handling needed.
- The `rsvpCount` field on Event is denormalized for performance but must be kept in sync via Prisma `$transaction`.

## Alternatives Considered

- **Implicit many-to-many:** Rejected because it doesn't support `createdAt` or the `@@unique` constraint. We'd need application-level duplicate checks, which are vulnerable to race conditions.
- **Single RSVP status field on User:** Rejected because a user can RSVP to multiple events. A single field can't represent this.
