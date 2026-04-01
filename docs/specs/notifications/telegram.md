# SF4: Telegram Notifications

**Feature:** [Notifications (Email, LINE & Telegram)](overview.md)
**Prefix:** NTF-TG

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-TG-01 | Messages under 300 characters (Telegram allows more than LINE) | Must |
| NTF-TG-02 | Include deeplinks to the relevant page in the app | Should |
| NTF-TG-03 | Use Telegram Markdown formatting (bold, links, no HTML) | Must |
| NTF-TG-04 | For MVP: mock Telegram Bot API, log messages to console | Must |

## Frontend Components

No frontend components — mock implementation logs to console.

## API Routes

No dedicated API routes — Telegram sending is handled internally by `lib/mock-telegram.ts`.
