# T.6.05: Implement Mock Telegram Service

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** NTF-TG-01, NTF-TG-02, NTF-TG-03, NTF-TG-04

## Description
Create `lib/mock-telegram.ts` with a `mockSendTelegram` function that simulates sending a Telegram Bot API message by logging to the console. Telegram messages must be under 300 characters (NTF-TG-01), use Telegram Markdown formatting with bold text and inline links (NTF-TG-03, no HTML), and include a deeplink URL (NTF-TG-02). The function accepts a chatId (mock Telegram chat ID), message text in Markdown format, and optional link URL. It validates the message length, logs the formatted output with `=== MOCK TELEGRAM ===` delimiters, and simulates the Telegram Bot API `sendMessage` response structure.

## Acceptance Criteria
- [ ] `mockSendTelegram(chatId, message, linkUrl?)` function is exported
- [ ] Console output shows: chat ID, message in Markdown format, and deeplink URL
- [ ] Message is validated to be under 300 characters; truncated with warning if exceeded
- [ ] Message uses Telegram Markdown formatting (e.g., `*bold*`, `[link text](url)`)
- [ ] Deeplink is included as a Markdown inline link when provided
- [ ] Console output is clearly delimited with `=== MOCK TELEGRAM ===` markers
- [ ] Function returns `{ success: boolean, channel: 'telegram', messageId: string }`
- [ ] Function handles errors gracefully and returns success: false on failure

## Files to Create/Modify
- `lib/mock-telegram.ts` — Create new file with mockSendTelegram function

## Implementation Notes
- Telegram Markdown V2 uses `*bold*`, `_italic_`, and `[text](url)` syntax.
- Example: "*Booking Confirmed* Your coworking space at Chula is booked for tomorrow 10:00-12:00. [View Booking](https://nomadbridge.app/bookings/abc123)"
- The 300 char limit is more generous than LINE's 200, so messages can include slightly more detail.
- Mock the Telegram Bot API response: `{ "ok": true, "result": { "message_id": 123 } }`.

## Commit Message
`feat: implement mock Telegram bot messaging service`
