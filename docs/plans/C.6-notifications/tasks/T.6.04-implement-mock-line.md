# T.6.04: Implement Mock LINE Service

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 15m
**Dependencies:** None
**Spec References:** NTF-LINE-01, NTF-LINE-02, NTF-LINE-03, NTF-LINE-04

## Description
Create `lib/mock-line.ts` with a `mockSendLine` function that simulates sending a LINE message by logging to the console. LINE messages must be short and conversational — under 200 characters (NTF-LINE-01), plain text with emojis (NTF-LINE-03, no HTML), and include a deeplink URL to the relevant page (NTF-LINE-02). The function accepts a userId (mock LINE user ID), message text, and optional link URL. It validates the message length, truncating with "..." if over 200 chars, and logs the formatted output with clear `=== MOCK LINE ===` delimiters. The output simulates what the LINE Messaging API push message endpoint would send.

## Acceptance Criteria
- [ ] `mockSendLine(userId, message, linkUrl?)` function is exported
- [ ] Console output shows: recipient userId, message text, and deeplink URL
- [ ] Message is validated to be under 200 characters; truncated with warning if exceeded
- [ ] Message format is plain text with emojis (no HTML tags)
- [ ] Deeplink URL is appended to message when provided
- [ ] Console output is clearly delimited with `=== MOCK LINE ===` markers
- [ ] Function returns `{ success: boolean, channel: 'line', messageId: string }`
- [ ] Function handles errors gracefully and returns success: false on failure

## Files to Create/Modify
- `lib/mock-line.ts` — Create new file with mockSendLine function

## Implementation Notes
- LINE messages are casual and personal — use a friendly tone in the templates.
- Example format: "Hey! Your RSVP for 'AI Workshop' is confirmed. See you there! https://nomadbridge.app/events/abc123"
- The 200 char limit includes the deeplink URL, so keep the message body concise.
- Mock the LINE Messaging API response format: `{ "sentMessages": [{ "id": "..." }] }`.

## Commit Message
`feat: implement mock LINE messaging service`
