# T.6.03: Implement Mock Email Service

**Component:** C.6 — Notifications (Email, LINE & Telegram)
**Sprint:** 1 | **Milestone:** M1
**Estimated Time:** 20m
**Dependencies:** None
**Spec References:** NTF-EMAIL-01, NTF-EMAIL-02, NTF-EMAIL-03, NTF-EMAIL-04, NTF-EMAIL-05

## Description
Create `lib/mock-email.ts` with a `mockSendEmail` function that simulates sending a branded HTML email by logging the full content to the console. The function accepts parameters for recipient email, subject, and a body object containing the notification message, action link text, action URL, and optional QR code data. It constructs an HTML template string with NomadBridge branding (logo placeholder, brand colors), the message content, a styled action button/link (NTF-EMAIL-02), and an optional inline QR code image placeholder (NTF-EMAIL-03). The sender is hardcoded as `noreply@nomadbridge.app` (NTF-EMAIL-04). The function logs the complete email to console with clear delimiters (e.g., `=== MOCK EMAIL ===`) and returns a success/failure result object.

## Acceptance Criteria
- [ ] `mockSendEmail(to, subject, body)` function is exported
- [ ] Console output shows: sender (`noreply@nomadbridge.app`), recipient, subject, and full HTML body
- [ ] HTML template includes NomadBridge branding placeholder
- [ ] HTML includes a clickable action link/button when actionUrl is provided
- [ ] HTML includes a QR code image placeholder when qrCode data is provided
- [ ] Console output is clearly delimited with `=== MOCK EMAIL ===` markers
- [ ] Function returns `{ success: boolean, channel: 'email', messageId: string }`
- [ ] Function handles errors gracefully (try/catch, returns success: false on failure)

## Files to Create/Modify
- `lib/mock-email.ts` — Create new file with mockSendEmail function

## Implementation Notes
- Keep the HTML template simple but realistic — it should look like a real transactional email if someone copy-pasted it into an HTML viewer.
- Use a UUID or timestamp-based mock messageId for tracking.
- The QR code placeholder can be `[QR Code: {data}]` in the HTML since actual image generation is not needed for the mock.
- Log with `console.log` using color-coded output if possible (e.g., chalk or ANSI codes), but don't add extra dependencies — use plain console.log.

## Commit Message
`feat: implement mock email service with HTML template`
