# SF1: Notification Triggers

**Feature:** [Notifications (Email, LINE & Telegram)](overview.md)
**Prefix:** NTF-TRIGGER
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-TRIGGER-01 | RSVP confirmation triggers Email + LINE + Telegram to user who RSVPed | Must |
| NTF-TRIGGER-02 | Event reminder (24h before) triggers Email + LINE + Telegram to all RSVPed users | Must |
| NTF-TRIGGER-03 | Event cancelled triggers Email + LINE + Telegram to all RSVPed users | Must |
| NTF-TRIGGER-04 | Waitlist promoted to confirmed triggers Email + LINE + Telegram to promoted user | Must |
| NTF-TRIGGER-05 | Post-event materials available triggers Email to all attendees | Should |
| NTF-TRIGGER-06 | Booking confirmation + QR code triggers Email + LINE + Telegram to user who booked | Must |
| NTF-TRIGGER-07 | Booking reminder (2h before) triggers LINE + Telegram to user who booked | Should |
| NTF-TRIGGER-08 | Booking cancelled triggers Email to user who booked | Must |
| NTF-TRIGGER-09 | Guest lecture invite received triggers Email + LINE + Telegram to invited nomad | Must |
| NTF-TRIGGER-10 | Guest lecture application received triggers Email + LINE + Telegram to university admin | Must |
| NTF-TRIGGER-11 | Lecture feedback received triggers Email to both parties | Should |
| NTF-TRIGGER-12 | Trust score change (significant) triggers Email to affected user | Could |
| NTF-TRIGGER-13 | Forum reply to your thread triggers LINE + Telegram to thread author | Should |

## Frontend Components

No frontend components — triggers are backend-only (internal library calls).

## API Routes

No dedicated API routes — triggers are invoked internally by other features.

## Precision Clarifications

- **Dispatch timing:** All notifications are dispatched immediately when the triggering action occurs. No batching or delay queue
- **Scheduled reminders:** Event reminders (NTF-TRIGGER-02, 24h before) and booking reminders (NTF-TRIGGER-07, 2h before) are exceptions. These require a scheduled cron job that runs hourly, finds upcoming events/bookings within the reminder window where reminders haven't been sent yet, and dispatches notifications. Each reminder is marked as sent to prevent duplicates
- **Delivery strategy:** Fire-and-forget per channel. If a channel's mock service throws, retry up to 2 times with 1-second delay. If still failing, log the error and continue with other channels. Never block the triggering action (e.g., RSVP creation succeeds even if notification fails)
- **Preference check:** Before dispatching, check the user's `NotificationPreference` for the relevant category + channel. If the user has disabled that channel for that category, skip it silently
- **Duplicate prevention:** Before creating a Notification record, check for existing notification with the same `(userId, type, referenceId)` tuple. If found, skip. This prevents duplicate notifications on retries or repeated actions
