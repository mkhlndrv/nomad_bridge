# Specification: Notifications (LINE & Email)

## Intent / Vibe

Keep users informed without overwhelming them. Notifications should feel helpful and timely — like a friend tapping your shoulder to say "Hey, that workshop you wanted is tomorrow" or "Your booking is confirmed, here's your QR code." The system should support both email (reliable, always works) and LINE (popular in Thailand, feels instant and personal). Users should feel in control of what they receive and how.

## Core Requirements

### Notification Events
The following actions trigger notifications:

| Event | Email | LINE | Recipient |
|-------|-------|------|-----------|
| RSVP confirmation | ✅ | ✅ | User who RSVPed |
| Event reminder (24h before) | ✅ | ✅ | All RSVPed users |
| Event cancelled | ✅ | ✅ | All RSVPed users |
| Waitlist promoted to confirmed | ✅ | ✅ | Promoted user |
| Post-event materials available | ✅ | — | All attendees |
| Booking confirmation + QR code | ✅ | ✅ | User who booked |
| Booking reminder (2h before) | — | ✅ | User who booked |
| Booking cancelled | ✅ | — | User who booked |
| Guest lecture invite received | ✅ | ✅ | Invited nomad |
| Guest lecture application received | ✅ | ✅ | University admin |
| Lecture feedback received | ✅ | — | Both parties |
| Trust score change (significant) | ✅ | — | Affected user |
| Forum reply to your thread | — | ✅ | Thread author |

### Email Notifications
- Use a clean, branded HTML template with NomadBridge logo.
- Include relevant action links (e.g., "View Event," "See Your Booking").
- QR codes embedded as inline images where applicable.
- Sender: noreply@nomadbridge.app (mock for MVP).
- For MVP: log emails to console with full content (mock implementation, no actual SMTP).

### LINE Notifications
- Short, conversational messages (under 200 characters).
- Include deeplinks to the relevant page in the app.
- Use LINE-appropriate formatting (no HTML, plain text with emojis).
- For MVP: log LINE messages to console (mock LINE Messaging API).
- Format: "✅ You're in! 'AI Workshop at Chula' — Tomorrow at 2pm. Show your QR at the door."

### Notification Preferences
- Users can manage their notification preferences in profile settings.
- Toggle each channel independently: Email ON/OFF, LINE ON/OFF.
- Toggle by category: Events, Bookings, Lectures, Community, Trust Score.
- Default: all notifications ON for both channels.
- Preferences are respected — never send a notification the user has turned off.

### Notification Center (In-App)
- Bell icon in the header shows unread count badge.
- Dropdown/page shows recent notifications in chronological order.
- Each notification: icon, short message, timestamp, read/unread status.
- Click a notification to navigate to the relevant page.
- "Mark all as read" action.

## Edge Cases & Constraints
- Never send duplicate notifications for the same event (idempotency).
- If both email and LINE fail, log the failure but don't retry indefinitely (max 2 retries).
- Rate limit: no more than 10 notifications per user per hour (prevent spam from bulk actions).
- Notification content should never contain sensitive data (no full email addresses of other users).
- Handle users who haven't set up LINE — gracefully skip LINE delivery, don't error.
- Notification preferences should persist across sessions.
- Old notifications (> 30 days) can be archived/hidden from the notification center.

## Acceptance Criteria
- All notification events from the table above trigger correctly.
- Email and LINE mock implementations log realistic output to console.
- Users can toggle notification preferences and they are respected.
- In-app notification center shows unread count and notification list.
- Clicking a notification navigates to the correct page.
- No duplicate notifications sent for the same trigger.
- Responsive design for the notification center on mobile and desktop.

## Definition of Done
- Notification trigger system covers all events in the table
- Mock email and LINE implementations produce realistic console output
- Notification preferences UI works and persists settings
- In-app notification center with unread count
- No duplicate notifications
- Responsive design
- Atomic commits per notification type or subsystem
