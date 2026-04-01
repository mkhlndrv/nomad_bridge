# SF2: Email Notifications

**Feature:** [Notifications (Email, LINE & Telegram)](overview.md)
**Prefix:** NTF-EMAIL
> Last updated: 2026-04-01

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-EMAIL-01 | Use a clean, branded HTML template with NomadBridge logo | Must |
| NTF-EMAIL-02 | Include relevant action links (e.g., "View Event," "See Your Booking") | Must |
| NTF-EMAIL-03 | QR codes embedded as inline images where applicable | Should |
| NTF-EMAIL-04 | Sender: noreply@nomadbridge.app (mock for MVP) | Must |
| NTF-EMAIL-05 | For MVP: log emails to console with full content (mock implementation, no actual SMTP) | Must |

## Frontend Components

No frontend components — mock implementation logs to console.

## API Routes

No dedicated API routes — email sending is handled internally by `lib/mock-email.ts`.
