# Specification: Notifications (LINE & Email)

## Intent / Vibe

Keep users informed without overwhelming them. Notifications should feel helpful and timely — like a friend tapping your shoulder to say "Hey, that workshop you wanted is tomorrow" or "Your booking is confirmed, here's your QR code." The system should support both email (reliable, always works) and LINE (popular in Thailand, feels instant and personal). Users should feel in control of what they receive and how.

## Core Requirements

### SF1: Notification Triggers

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-TRIGGER-01 | RSVP confirmation triggers Email + LINE to user who RSVPed | Must |
| NTF-TRIGGER-02 | Event reminder (24h before) triggers Email + LINE to all RSVPed users | Must |
| NTF-TRIGGER-03 | Event cancelled triggers Email + LINE to all RSVPed users | Must |
| NTF-TRIGGER-04 | Waitlist promoted to confirmed triggers Email + LINE to promoted user | Must |
| NTF-TRIGGER-05 | Post-event materials available triggers Email to all attendees | Should |
| NTF-TRIGGER-06 | Booking confirmation + QR code triggers Email + LINE to user who booked | Must |
| NTF-TRIGGER-07 | Booking reminder (2h before) triggers LINE to user who booked | Should |
| NTF-TRIGGER-08 | Booking cancelled triggers Email to user who booked | Must |
| NTF-TRIGGER-09 | Guest lecture invite received triggers Email + LINE to invited nomad | Must |
| NTF-TRIGGER-10 | Guest lecture application received triggers Email + LINE to university admin | Must |
| NTF-TRIGGER-11 | Lecture feedback received triggers Email to both parties | Should |
| NTF-TRIGGER-12 | Trust score change (significant) triggers Email to affected user | Could |
| NTF-TRIGGER-13 | Forum reply to your thread triggers LINE to thread author | Should |

### SF2: Email Notifications

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-EMAIL-01 | Use a clean, branded HTML template with NomadBridge logo | Must |
| NTF-EMAIL-02 | Include relevant action links (e.g., "View Event," "See Your Booking") | Must |
| NTF-EMAIL-03 | QR codes embedded as inline images where applicable | Should |
| NTF-EMAIL-04 | Sender: noreply@nomadbridge.app (mock for MVP) | Must |
| NTF-EMAIL-05 | For MVP: log emails to console with full content (mock implementation, no actual SMTP) | Must |

### SF3: LINE Notifications

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-LINE-01 | Short, conversational messages (under 200 characters) | Must |
| NTF-LINE-02 | Include deeplinks to the relevant page in the app | Should |
| NTF-LINE-03 | Use LINE-appropriate formatting (no HTML, plain text with emojis) | Must |
| NTF-LINE-04 | For MVP: log LINE messages to console (mock LINE Messaging API) | Must |

### SF4: In-App Notification Center

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-CENTER-01 | Bell icon in the header shows unread count badge | Must |
| NTF-CENTER-02 | Dropdown/page shows recent notifications in chronological order | Must |
| NTF-CENTER-03 | Each notification: icon, short message, timestamp, read/unread status | Must |
| NTF-CENTER-04 | Click a notification to navigate to the relevant page | Must |
| NTF-CENTER-05 | "Mark all as read" action | Should |
| NTF-CENTER-06 | Users can toggle each channel independently: Email ON/OFF, LINE ON/OFF | Must |
| NTF-CENTER-07 | Toggle by category: Events, Bookings, Lectures, Community, Trust Score | Should |
| NTF-CENTER-08 | Default: all notifications ON for both channels | Must |
| NTF-CENTER-09 | Preferences are respected — never send a notification the user has turned off | Must |

## Component Breakdown

### SF1: Notification Triggers

No frontend components — triggers are backend-only (internal library calls).

### SF2: Email Notifications

No frontend components — mock implementation logs to console.

### SF3: LINE Notifications

No frontend components — mock implementation logs to console.

### SF4: In-App Notification Center

- `NotificationBell` (Client) — Bell icon in navbar with unread count badge. Click opens dropdown. Polls for updates
  - `NotificationDropdown` (Client) — Last 10 notifications, "Mark all read" button, "View all" link
    - `NotificationItem` (Client) — Icon by type, short message, relative timestamp, read/unread styling. Click navigates + marks read
- `NotificationCenter` (Server) — Full page: paginated notification list. Filter: All/Unread. Grouped by date
  - `NotificationItem` (Client) — Reused from dropdown
- `NotificationPreferences` (Client) — Settings grid: rows = categories (Events/Bookings/Lectures/Community/Trust), cols = channels (Email/LINE). Toggle switches
  - `NotificationToggle` (Client) — Single toggle switch component

**Backend routes:**

| Route | Method | Logic |
|-------|--------|-------|
| `app/api/notifications` | GET | Current user's notifications. Paginated. Optional `unread=true` filter |
| `app/api/notifications/unread-count` | GET | Unread count for bell badge polling |
| `app/api/notifications/mark-read` | POST | Mark specific IDs or all as read |
| `app/api/notifications/preferences` | GET | Current user's preference matrix |
| `app/api/notifications/preferences` | PUT | Update preferences |

### Shared Logic

**`lib/notifications.ts`:**
- `sendNotification(userId, type, payload)` — check preferences, create in-app record, mock email, mock LINE

**`lib/mock-email.ts`:**
- `mockSendEmail()` — log formatted HTML template to console

**`lib/mock-line.ts`:**
- `mockSendLine()` — log short conversational message (<200 chars) to console

**`lib/notification-types.ts`:**
- Maps 13 notification types to 5 categories (Events, Bookings, Lectures, Community, Trust)

## Edge Cases & Constraints
- Never send duplicate notifications for the same event (idempotency).
- If both email and LINE fail, log the failure but don't retry indefinitely (max 2 retries).
- Rate limit: no more than 10 notifications per user per hour (prevent spam from bulk actions).
- Notification content should never contain sensitive data (no full email addresses of other users).
- Handle users who haven't set up LINE — gracefully skip LINE delivery, don't error.
- Notification preferences should persist across sessions.
- Old notifications (> 30 days) can be archived/hidden from the notification center.

## Acceptance Criteria
- All notification events from the trigger list fire correctly [NTF-TRIGGER-01 through NTF-TRIGGER-13]
- Email and LINE mock implementations log realistic output to console [NTF-EMAIL-05, NTF-LINE-04]
- Users can toggle notification preferences and they are respected [NTF-CENTER-06, NTF-CENTER-09]
- In-app notification center shows unread count and notification list [NTF-CENTER-01, NTF-CENTER-02]
- Clicking a notification navigates to the correct page [NTF-CENTER-04]
- No duplicate notifications sent for the same trigger
- Responsive design for the notification center on mobile and desktop

## Definition of Done
- Notification trigger system covers all events in the table
- Mock email and LINE implementations produce realistic console output
- Notification preferences UI works and persists settings
- In-app notification center with unread count
- No duplicate notifications
- Responsive design
- Atomic commits per notification type or subsystem
