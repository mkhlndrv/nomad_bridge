# ADR-004: Store Booking Times as Strings, Not DateTime

**Status:** Accepted
**Date:** 2026-03-25
**Feature:** Campus Facility Access Booking
**Deciders:** Lead developer

## Context

The booking system needs to store time slots for facility reservations (e.g., "09:00 to 11:00 on 2026-04-15"). This requires storing both a date and a start/end time.

SQLite does not have a native `TIME` type. Prisma's `DateTime` type stores a full timestamp (date + time + timezone), which is awkward for representing just a time-of-day like "09:00".

## Decision

Store **`startTime` and `endTime` as `String`** fields in "HH:mm" format (e.g., "09:00", "17:30"). Store the **date** separately as a `DateTime` field.

```prisma
model Booking {
  id        String   @id @default(cuid())
  date      DateTime              // The booking date (date portion only)
  startTime String                // "09:00" format
  endTime   String                // "17:30" format
  status    BookingStatus
  // ...
}
```

## Consequences

### Positive

- **Simple and readable:** "09:00" is immediately understandable in the database, API responses, and UI.
- **No timezone confusion:** Time-of-day strings don't carry timezone information, avoiding conversion bugs (the date field handles UTC/Bangkok conversion).
- **Easy comparison:** String comparison works for "HH:mm" format ("09:00" < "17:30").
- **SQLite compatible:** Strings work in all databases without type adapters.

### Negative

- **Application-level validation:** Must validate format ("HH:mm"), range (00:00-23:59), and that startTime < endTime in application code.
- **No native time math:** Can't use SQL `TIME` functions for duration calculation. Must parse in application code.

### Neutral

- Overlap detection for conflict checks uses string comparison: `startTime < otherEndTime AND endTime > otherStartTime`.
- The "HH:mm" format must be enforced consistently — no "9:00" or "09:00:00" variants.

## Alternatives Considered

- **Prisma DateTime for both:** Rejected — requires storing an arbitrary date component with the time, leading to confusing timestamps like "1970-01-01T09:00:00Z" for "9 AM".
- **Integer minutes since midnight:** Rejected — less readable (540 instead of "09:00"), requires conversion everywhere.
- **ISO 8601 duration strings:** Rejected — overly complex for simple time slots.
