# SF3: LINE Notifications

**Feature:** [Notifications (Email, LINE & Telegram)](overview.md)
**Prefix:** NTF-LINE

## Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| NTF-LINE-01 | Short, conversational messages (under 200 characters) | Must |
| NTF-LINE-02 | Include deeplinks to the relevant page in the app | Should |
| NTF-LINE-03 | Use LINE-appropriate formatting (no HTML, plain text with emojis) | Must |
| NTF-LINE-04 | For MVP: log LINE messages to console (mock LINE Messaging API) | Must |

## Frontend Components

No frontend components — mock implementation logs to console.

## API Routes

No dedicated API routes — LINE sending is handled internally by `lib/mock-line.ts`.
