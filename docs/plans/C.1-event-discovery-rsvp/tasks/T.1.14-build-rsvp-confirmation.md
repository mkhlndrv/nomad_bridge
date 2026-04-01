# T.1.14: Build RsvpConfirmation Modal

**Component:** C.1 — Event Discovery & RSVP
**Sprint:** 3 | **Milestone:** M3
**Estimated Time:** 25m
**Dependencies:** T.1.13
**Spec References:** EVT-RSVP-03

## Description
Build the `RsvpConfirmation` client component that appears as a modal dialog after a successful RSVP. The modal displays a success message, the event summary (title, date, venue), a QR code as a check-in pass, and an "Add to Calendar" link. The QR code is generated client-side using a lightweight library (e.g., `qrcode` or `qrcode.react`) and encodes a simple string: `nomadbridge:event:{eventId}:user:{userId}`. The modal can be dismissed by clicking outside, pressing Escape, or clicking a "Done" button.

## Acceptance Criteria
- [ ] Modal opens when triggered by RsvpButton's `onRsvpSuccess` callback
- [ ] Displays success checkmark icon and "You're registered!" heading
- [ ] Shows event summary: title, date (Bangkok TZ), venue
- [ ] Renders a QR code encoding `nomadbridge:event:{eventId}:user:{userId}`
- [ ] QR code is at least 200x200px and clearly scannable
- [ ] Includes an "Add to Calendar" link that generates an `.ics` download or Google Calendar URL
- [ ] Modal has a "Done" button that closes it
- [ ] Modal closes on Escape key press
- [ ] Modal closes when clicking the backdrop overlay
- [ ] Modal uses a semi-transparent backdrop (`bg-black/50`)
- [ ] Modal is centered and responsive (full-width on mobile, fixed-width on desktop)

## Files to Create/Modify
- `app/components/events/RsvpConfirmation.tsx` — Confirmation modal client component
- `app/lib/calendar-utils.ts` — Helper to generate Google Calendar URL from event data

## Implementation Notes
- For QR generation, use `qrcode.react` package (`<QRCodeSVG>` component) — lightweight and SSR-safe.
- If the package is not yet installed, add it: `npm install qrcode.react`.
- For the calendar link, generate a Google Calendar URL: `https://calendar.google.com/calendar/render?action=TEMPLATE&text={title}&dates={startUTC}/{endUTC}&location={venue}&details={description}`.
- The modal should use a React portal (`createPortal`) or simply be positioned with `fixed inset-0 z-50`.
- Use `useEffect` for Escape key listener: `document.addEventListener('keydown', ...)`.
- Props: `isOpen`, `onClose`, `eventId`, `userId`, `eventTitle`, `eventDate`, `eventVenue`.
- Animation: use Tailwind transitions for fade-in effect.
- The QR code string format is intentionally simple — it can be enhanced later for verification.

## Commit Message
`feat: build RSVP confirmation modal with QR code and calendar link`
